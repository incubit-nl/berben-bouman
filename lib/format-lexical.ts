/**
 * Formats a Lexical JSON string or object into properly formatted HTML
 * 
 * @param input The lexical JSON string or object to format
 * @returns A properly formatted HTML string
 */
export function formatLexicalContent(input: string | any): string {
  // If it's a string, try to parse it as JSON
  let content;
  if (typeof input === 'string') {
    try {
      content = JSON.parse(input);
    } catch (e) {
      // If it's not valid JSON, return it as-is
      return input;
    }
  } else {
    // If it's already an object, use it directly
    content = input;
  }
  
  // Ensure we have a valid Lexical structure
  if (!content?.root?.children) {
    return '';
  }
  
  // Process each node in the Lexical structure
  return content.root.children.map((node: any) => {
    // Handle paragraphs
    if (node.type === 'paragraph') {
      // Process children (text nodes)
      const textContent = node.children.map((child: any) => {
        if (child.type !== 'text') return '';
        
        let text = child.text;
        
        // Apply formatting
        // In Lexical, format is a bitmask: 1 = BOLD, 2 = ITALIC, etc.
        const format = child.format || 0;
        
        if (format & 1) { // BOLD
          text = `<strong>${text}</strong>`;
        }
        if (format & 2) { // ITALIC
          text = `<em>${text}</em>`;
        }
        if (format & 4) { // STRIKETHROUGH
          text = `<s>${text}</s>`;
        }
        if (format & 8) { // UNDERLINE
          text = `<u>${text}</u>`;
        }
        
        return text;
      }).join('');
      
      return `<p>${textContent}</p>`;
    }
    
    // Handle headings
    if (node.type === 'heading') {
      const level = node.tag || 'h2';
      const textContent = node.children.map((child: any) => {
        if (child.type !== 'text') return '';
        return child.text;
      }).join('');
      
      return `<${level}>${textContent}</${level}>`;
    }
    
    // Handle lists
    if (node.type === 'list') {
      const listType = node.listType === 'bullet' ? 'ul' : 'ol';
      const listItems = node.children.map((item: any) => {
        if (item.type !== 'listitem') return '';
        
        const textContent = item.children?.map((child: any) => {
          if (child.type === 'text') {
            return child.text;
          }
          return '';
        }).join('') || '';
        
        return `<li>${textContent}</li>`;
      }).join('');
      
      return `<${listType}>${listItems}</${listType}>`;
    }
    
    return '';
  }).join('');
} 