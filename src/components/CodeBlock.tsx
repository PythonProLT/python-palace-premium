
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  return (
    <div className="code-block">
      <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
        <span>{language}</span>
        <span>example.py</span>
      </div>
      <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
