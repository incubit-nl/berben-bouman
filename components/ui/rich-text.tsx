import React from 'react';

interface RichTextProps {
  content: any;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) {
    return null;
  }

  // Handle string content
  if (typeof content === 'string') {
    return <div className="prose prose-gray max-w-none">{content}</div>;
  }

  // Handle Lexical content structure
  const nodes = content.root?.children || [];
  
  return (
    <div className="prose prose-gray max-w-none">
      {nodes.map((node: any, index: number) => {
        const children = node.children?.map((child: any, childIndex: number) => {
          if (child.bold) {
            return <strong key={childIndex}>{child.text}</strong>;
          }
          if (child.italic) {
            return <em key={childIndex}>{child.text}</em>;
          }
          if (child.underline) {
            return <u key={childIndex}>{child.text}</u>;
          }
          return child.text;
        });

        if (node.type === 'heading' && node.version === 1) {
          const level = (node.tag?.toLowerCase() || 'p') as HeadingTag;
          const Tag = level;
          return <Tag key={index}>{children}</Tag>;
        }
        if (node.type === 'list' && node.version === 1) {
          const Tag = node.listType === 'bullet' ? 'ul' : 'ol';
          return <Tag key={index}>{children}</Tag>;
        }
        if (node.type === 'listitem' && node.version === 1) {
          return <li key={index}>{children}</li>;
        }
        
        // Default to paragraph
        return <p key={index}>{children}</p>;
      })}
    </div>
  );
}; 