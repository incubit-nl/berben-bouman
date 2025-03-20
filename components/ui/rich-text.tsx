import React from 'react';

interface RichTextProps {
  content: any;
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) {
    return null;
  }

  // For now, a simple implementation that works with the default richText structure
  // This can be expanded based on the actual richText structure and requirements
  return (
    <div className="prose prose-gray max-w-none">
      {content.map((node: any, index: number) => {
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

        if (node.type === 'h1') {
          return <h1 key={index}>{children}</h1>;
        }
        if (node.type === 'h2') {
          return <h2 key={index}>{children}</h2>;
        }
        if (node.type === 'h3') {
          return <h3 key={index}>{children}</h3>;
        }
        if (node.type === 'h4') {
          return <h4 key={index}>{children}</h4>;
        }
        if (node.type === 'h5') {
          return <h5 key={index}>{children}</h5>;
        }
        if (node.type === 'h6') {
          return <h6 key={index}>{children}</h6>;
        }
        if (node.type === 'ul') {
          return <ul key={index}>{children}</ul>;
        }
        if (node.type === 'ol') {
          return <ol key={index}>{children}</ol>;
        }
        if (node.type === 'li') {
          return <li key={index}>{children}</li>;
        }
        
        // Default to paragraph
        return <p key={index}>{children}</p>;
      })}
    </div>
  );
}; 