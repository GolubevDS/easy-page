import React, { useMemo } from 'react';

interface MarkdownViewerProps {
  content: string;
  className: string;
}

export const MarkdownViewer = ({ content, className }: MarkdownViewerProps) => {
  const markdown = useMemo(() => {
    return content.split('\n').map((line, i) => {
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
      line = line.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );
      return (
        <p
          key={i}
          className='text-base'
          dangerouslySetInnerHTML={{ __html: line }}
        />
      );
    });
  }, [content]);

  return <div className={className}>{markdown}</div>;
};
