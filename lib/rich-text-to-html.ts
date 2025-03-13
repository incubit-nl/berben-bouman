import { Faq } from '../payload-types';

// Define our own RichTextType to match the structure in Payload
export type RichTextType = Faq['answer'];

// Define types for Lexical nodes
interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  [key: string]: any;
}

interface LexicalListNode extends LexicalNode {
  type: 'list';
  listType: 'number' | 'bullet';
  start?: number;
  children?: LexicalListItemNode[];
}

interface LexicalListItemNode extends LexicalNode {
  type: 'listitem';
  value?: number;
}

interface LexicalTextNode extends LexicalNode {
  type: 'text';
  text: string;
  format?: number;
}

interface LexicalHeadingNode extends LexicalNode {
  type: 'heading';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Simple function to convert Lexical JSON to text
 */
function extractTextFromLexical(node: LexicalNode): string {
  if (!node) return '';
  
  // If it's a text node with content
  if ('text' in node) {
    const textNode = node as LexicalTextNode;
    let text = textNode.text;
    
    // In Lexical, format is a bitmask:
    // 1 = BOLD
    // 2 = ITALIC
    // 4 = STRIKETHROUGH
    // 8 = UNDERLINE
    // 16 = CODE
    // 32 = SUBSCRIPT
    // 64 = SUPERSCRIPT
    
    // Apply text formatting based on format value
    const format = textNode.format || 0;
    
    // Apply formatting in the correct order
    if (format & 1) { // BOLD
      text = `<strong>${text}</strong>`;
    }
    if (format & 2) { // ITALIC
      text = `<em>${text}</em>`;
    }
    if (format & 8) { // UNDERLINE
      text = `<u>${text}</u>`;
    }
    if (format & 4) { // STRIKETHROUGH
      text = `<s>${text}</s>`;
    }
    if (format & 16) { // CODE
      text = `<code>${text}</code>`;
    }
    
    return text;
  }
  
  // If it has children, process them
  if (node.children && Array.isArray(node.children)) {
    const childrenText = node.children.map((child: LexicalNode) => extractTextFromLexical(child)).join('');
    
    // Apply appropriate HTML tags based on node type
    if (node.type === 'paragraph') {
      return `<p${node.format ? ` class="text-${node.format}"` : ''}>${childrenText}</p>`;
    } else if (node.type === 'heading') {
      const headingNode = node as LexicalHeadingNode;
      const tag = headingNode.tag || 'h2';
      // Add custom classes to reduce heading sizes
      let headingClass = '';
      if (tag === 'h1') {
        headingClass = ' class="text-3xl md:text-4xl font-bold"';
      } else if (tag === 'h2') {
        headingClass = ' class="text-2xl md:text-3xl font-semibold"';
      } else if (tag === 'h3') {
        headingClass = ' class="text-xl md:text-2xl font-semibold"';
      } else if (tag === 'h4') {
        headingClass = ' class="text-lg md:text-xl font-medium"';
      }
      return `<${tag}${headingClass}>${childrenText}</${tag}>`;
    } else if (node.type === 'list') {
      const listNode = node as LexicalListNode;
      const listType = listNode.listType === 'number' ? 'ol' : 'ul';
      
      // Add start attribute if it's a numbered list with a start value
      let startAttr = '';
      if (listNode.listType === 'number' && listNode.start && listNode.start > 1) {
        startAttr = ` start="${listNode.start}"`;
      }
      
      return `<${listType}${startAttr} class="list-${listNode.listType === 'number' ? 'decimal' : 'disc'}">${childrenText}</${listType}>`;
    } else if (node.type === 'listitem') {
      const listItemNode = node as LexicalListItemNode;
      
      // Add value attribute if it exists and is greater than 1
      let valueAttr = '';
      if (listItemNode.value && listItemNode.value > 1) {
        valueAttr = ` value="${listItemNode.value}"`;
      }
      
      return `<li${valueAttr}>${childrenText}</li>`;
    } else if (node.type === 'link') {
      const href = node.url || '#';
      const target = node.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${target}>${childrenText}</a>`;
    } else if (node.type === 'quote') {
      return `<blockquote>${childrenText}</blockquote>`;
    } else if (node.type === 'code') {
      return `<pre><code>${childrenText}</code></pre>`;
    }
    
    return childrenText;
  }
  
  return '';
}

/**
 * Serialize Payload CMS rich text content to HTML string
 * 
 * @param content The rich text content from Payload CMS
 * @returns HTML string representation of the rich text content
 */
export async function serialize(content: RichTextType | undefined | null): Promise<string> {
  try {
    // Handle empty content
    if (!content) return '';
    
    // Handle string content
    if (typeof content === 'string') return content;
    
    // Handle Lexical content
    if (content && typeof content === 'object') {
      // Check if the object has a root property with children
      if ('root' in content && content.root && content.root.children) {
        // Process each child node
        let html = '';
        const children = content.root.children as LexicalNode[];
        
        // Create a single ordered list for consecutive numbered lists
        let currentOrderedList: LexicalListNode | null = null;
        let orderedListItems: LexicalListItemNode[] = [];
        
        for (let i = 0; i < children.length; i++) {
          const node = children[i];
          
          // Check if this is a numbered list
          if (node.type === 'list' && (node as LexicalListNode).listType === 'number') {
            const listNode = node as LexicalListNode;
            // If we don't have an active ordered list, start one
            if (!currentOrderedList) {
              currentOrderedList = listNode;
              orderedListItems = [...(listNode.children || [])];
            } else {
              // Add this list's items to our collection
              orderedListItems = [...orderedListItems, ...(listNode.children || [])];
            }
          } else {
            // Not a numbered list
            
            // If we have an active ordered list, render it first
            if (currentOrderedList) {
              // Create a copy of the list with all collected items
              const combinedList: LexicalListNode = {
                ...currentOrderedList,
                children: orderedListItems
              };
              
              html += extractTextFromLexical(combinedList);
              
              // Reset for next list
              currentOrderedList = null;
              orderedListItems = [];
            }
            
            // Add the current non-list node
            html += extractTextFromLexical(node);
          }
        }
        
        // If we have a pending ordered list at the end, render it
        if (currentOrderedList) {
          const combinedList: LexicalListNode = {
            ...currentOrderedList,
            children: orderedListItems
          };
          
          html += extractTextFromLexical(combinedList);
        }
        
        return html || '<p>Content could not be displayed properly.</p>';
      }
      
      // If it doesn't match the expected structure, try serializing it
      return `<p>${JSON.stringify(content)}</p>`;
    }
    
    return '<p>No content available.</p>';
  } catch (error) {
    console.error('Error serializing rich text:', error);
    return '<p>Error displaying content.</p>';
  }
} 