import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock(props: CodeBlockProps) {
  const { language, value } = props;

  return (
    <SyntaxHighlighter
      language={language}
      style={Object.assign(coy, {
        'pre[class*="language-"]': {
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
        },
      })}
    >
      {value}
    </SyntaxHighlighter>
  );
}
