import React from 'react';
import Link from 'next/link';

// Define types for Lexical editor nodes
type TextNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

type LinkNode = {
  children: Node[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  fields: {
    linkType: string;
    newTab: boolean;
    url: string;
  };
  id: string;
};

type ParagraphNode = {
  children: Node[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  textFormat: number;
  textStyle: string;
};

type RootNode = {
  children: Node[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
};

type Node = TextNode | LinkNode | ParagraphNode | RootNode;

type LexicalContent = {
  root: RootNode;
};

// The main RichText component that accepts Lexical JSON
export function RichText({ content }: { content: LexicalContent | string }) {
  if (!content) return null;
  
  // Handle string input (convert from JSON string if needed)
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content);
    } catch (e) {
      return <div className="prose max-w-none">{content}</div>;
    }
  }
  
  if (!content.root?.children) {
    return null;
  }

  // Recursively render the nodes
  const renderNode = (node: Node, index: number): React.ReactNode => {
    if ('text' in node) {
      // Text node
      return <span key={index}>{node.text}</span>;
    }
    
    if (node.type === 'paragraph') {
      // Paragraph node
      return (
        <p key={index} className="mb-4">
          {node.children?.map(renderNode)}
        </p>
      );
    }
    
    if (node.type === 'link' && 'fields' in node) {
      // Link node
      return (
        <Link 
          key={index}
          href={node.fields.url} 
          target={node.fields.newTab ? '_blank' : undefined}
          className="text-accent-600 hover:text-accent-700 underline"
        >
          {node.children?.map(renderNode)}
        </Link>
      );
    }
    
    if (node.type === 'heading') {
      // Handle headings based on format/level
      const level = node.format;
      switch (level) {
        case 'h1':
          return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{node.children?.map(renderNode)}</h1>;
        case 'h2':
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{node.children?.map(renderNode)}</h2>;
        case 'h3':
          return <h3 key={index} className="text-xl font-semibold mt-5 mb-3">{node.children?.map(renderNode)}</h3>;
        default:
          return <h4 key={index} className="text-lg font-semibold mt-4 mb-2">{node.children?.map(renderNode)}</h4>;
      }
    }
    
    if (node.type === 'list') {
      // Handle lists
      const isOrdered = node.format === 'ordered';
      const ListTag = isOrdered ? 'ol' : 'ul';
      return (
        <ListTag key={index} className={`mb-4 ${isOrdered ? 'list-decimal' : 'list-disc'} pl-5`}>
          {node.children?.map(renderNode)}
        </ListTag>
      );
    }
    
    if (node.type === 'listitem') {
      return <li key={index}>{node.children?.map(renderNode)}</li>;
    }
    
    // Handle any other container nodes with children
    if ('children' in node) {
      return <React.Fragment key={index}>{node.children?.map(renderNode)}</React.Fragment>;
    }
    
    return null;
  };

  return (
    <div className="prose max-w-none">
      {content.root.children.map(renderNode)}
    </div>
  );
} 