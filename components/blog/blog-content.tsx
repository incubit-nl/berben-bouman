"use client";

import React from 'react';

interface BlogContentProps {
  content: {
    root: {
      children: Array<{
        type: string;
        children?: any[];
        text?: string;
        format?: number;
        tag?: string;
        url?: string;
        newTab?: boolean;
      }>;
    };
  };
}

export function BlogContent({ content }: BlogContentProps) {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  const renderNode = (node: any): React.ReactNode => {
    if (typeof node === 'string') {
      return node;
    }

    if (!node) {
      return null;
    }

    if (node.type === 'text') {
      let text = node.text || '';
      let element = <>{text}</>;

      if (node.format & 1) element = <strong>{element}</strong>;
      if (node.format & 2) element = <em>{element}</em>;
      if (node.format & 4) element = <u>{element}</u>;
      if (node.format & 8) element = <code>{element}</code>;

      return element;
    }

    const children = node.children?.map((child: any, index: number) => (
      <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
    ));

    switch (node.type) {
      case 'root':
        return <>{children}</>;
      case 'paragraph':
        return <p className="my-4 text-olive">{children}</p>;
      case 'heading':
        const level = node.tag?.replace('h', '') || '3';
        const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
        const headingClasses: Record<string, string> = {
          h1: "text-3xl font-heading text-primary-600 font-bold mt-6 mb-4",
          h2: "text-2xl font-heading text-primary-600 font-bold mt-6 mb-3",
          h3: "text-xl font-heading text-primary-600 font-bold mt-5 mb-3",
          h4: "text-lg font-heading text-primary-600 font-bold mt-4 mb-2",
          h5: "text-base font-heading text-primary-600 font-bold mt-4 mb-2",
          h6: "text-sm font-heading text-primary-600 font-bold mt-4 mb-2",
        };
        return <HeadingTag className={headingClasses[HeadingTag] || headingClasses.h3}>{children}</HeadingTag>;
      case 'quote':
        return <blockquote className="border-l-4 border-accent-200 pl-4 italic my-4 text-primary-600/80">{children}</blockquote>;
      case 'ul':
        return <ul className="list-disc list-inside my-4 text-olive">{children}</ul>;
      case 'ol':
        return <ol className="list-decimal list-inside my-4 text-olive">{children}</ol>;
      case 'li':
        return <li className="my-1">{children}</li>;
      case 'link':
        return (
          <a
            href={node.url}
            className="text-coral hover:text-coral/80 underline"
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        );
      default:
        return <>{children}</>;
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderNode(content.root)}
    </div>
  );
} 