import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple markdown parser for tables, headers, bold, lists
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentTable: string[][] = [];
    let inTable = false;
    let listItems: string[] = [];
    let inList = false;
    let key = 0;

    const flushTable = () => {
      if (currentTable.length > 0) {
        elements.push(
          <div key={`table-${key++}`} className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-stone-700">
              <thead>
                <tr className="bg-stone-800">
                  {currentTable[0].map((cell, i) => (
                    <th key={i} className="border border-stone-700 px-3 py-2 text-left text-white font-semibold text-sm">
                      {cell.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTable.slice(2).map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-stone-900">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-stone-700 px-3 py-2 text-stone-300 text-sm">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        currentTable = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="list-disc list-inside space-y-1 my-3 text-stone-300">
            {listItems.map((item, i) => (
              <li key={i} className="ml-4">{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const parseInlineMarkdown = (text: string) => {
      // Bold text
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
      // Code/monospace
      text = text.replace(/`(.*?)`/g, '<code class="bg-stone-800 px-1 py-0.5 rounded text-orange-400">$1</code>');
      
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    };

    lines.forEach((line, index) => {
      // Check for table
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
          flushList();
          inTable = true;
        }
        const cells = line.split('|').slice(1, -1);
        // Skip separator rows (---|---)
        if (!cells.every(c => c.trim().match(/^-+$/))) {
          currentTable.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
        inTable = false;
      }

      // Check for list items
      if (line.trim().match(/^[-*]\s+/)) {
        if (!inList) {
          inList = true;
        }
        listItems.push(line.trim().replace(/^[-*]\s+/, ''));
        return;
      } else if (inList) {
        flushList();
        inList = false;
      }

      // Headers
      if (line.startsWith('###')) {
        elements.push(
          <h3 key={`h3-${key++}`} className="text-lg font-semibold text-white mt-4 mb-2">
            {line.replace(/^###\s+/, '')}
          </h3>
        );
      } else if (line.startsWith('##')) {
        elements.push(
          <h2 key={`h2-${key++}`} className="text-xl font-semibold text-white mt-6 mb-3">
            {line.replace(/^##\s+/, '')}
          </h2>
        );
      } else if (line.startsWith('#')) {
        elements.push(
          <h1 key={`h1-${key++}`} className="text-2xl font-bold text-white mt-6 mb-4">
            {line.replace(/^#\s+/, '')}
          </h1>
        );
      } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        // Standalone bold line
        elements.push(
          <p key={`bold-${key++}`} className="font-semibold text-white my-2">
            {line.trim().replace(/^\*\*/, '').replace(/\*\*$/, '')}
          </p>
        );
      } else if (line.trim() === '') {
        // Empty line
        elements.push(<div key={`space-${key++}`} className="h-2" />);
      } else {
        // Regular paragraph
        elements.push(
          <p key={`p-${key++}`} className="text-stone-300 my-2 leading-relaxed">
            {parseInlineMarkdown(line)}
          </p>
        );
      }
    });

    // Flush any remaining content
    flushTable();
    flushList();

    return elements;
  };

  return (
    <div className="markdown-content text-sm">
      {parseMarkdown(content)}
    </div>
  );
};
