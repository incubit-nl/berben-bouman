import escapeHTML from 'escape-html';
import { Fragment, createElement } from 'react';

type Node = {
  type: string;
  children?: Node[];
  text?: string;
  url?: string;
  tag?: number;
  listType?: 'ordered' | 'unordered';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  newTab?: boolean;
};

interface RichTextProps {
  content: {
    root: {
      children: Node[];
    };
  };
  className?: string;
}

const serializeNode = (node: Node): React.ReactNode => {
  if (node.type === 'text') {
    let text = escapeHTML(node.text || '');
    
    if (node.bold) {
      text = `<strong>${text}</strong>`;
    }
    if (node.italic) {
      text = `<em>${text}</em>`;
    }
    if (node.underline) {
      text = `<u>${text}</u>`;
    }
    if (node.strikethrough) {
      text = `<s>${text}</s>`;
    }
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  }

  if (node.type === 'paragraph') {
    return (
      <p>
        {node.children?.map((child, i) => (
          <Fragment key={i}>{serializeNode(child)}</Fragment>
        ))}
      </p>
    );
  }

  if (node.type === 'heading' && node.tag) {
    return createElement(
      `h${node.tag}`,
      null,
      node.children?.map((child, i) => (
        <Fragment key={i}>{serializeNode(child)}</Fragment>
      ))
    );
  }

  if (node.type === 'list') {
    const Tag = node.listType === 'ordered' ? 'ol' : 'ul';
    return createElement(
      Tag,
      null,
      node.children?.map((child, i) => (
        <Fragment key={i}>{serializeNode(child)}</Fragment>
      ))
    );
  }

  if (node.type === 'listitem') {
    return (
      <li>
        {node.children?.map((child, i) => (
          <Fragment key={i}>{serializeNode(child)}</Fragment>
        ))}
      </li>
    );
  }

  if (node.type === 'link') {
    return (
      <a href={node.url} target={node.newTab ? '_blank' : undefined} rel="noopener noreferrer">
        {node.children?.map((child, i) => (
          <Fragment key={i}>{serializeNode(child)}</Fragment>
        ))}
      </a>
    );
  }

  return null;
};

export function RichText({ content, className }: RichTextProps) {
  if (!content?.root?.children) {
    return null;
  }

  return (
    <div className={className}>
      {content.root.children.map((node, i) => (
        <Fragment key={i}>{serializeNode(node)}</Fragment>
      ))}
    </div>
  );
} 