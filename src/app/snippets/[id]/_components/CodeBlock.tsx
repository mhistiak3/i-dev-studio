import CopiedButton from "@/components/CopiedButton";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split("\n") // split into lines
    .map((line) => line.trimEnd()) // remove trailing spaces from each line
    .join("\n"); // join back into a single string

  return (
    <div className="my-4 bg-dark rounded-lg overflow-hidden border border-border/10">
      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-light/5">
        {/* language indicator with icon */}
        <div className="flex items-center gap-2">
          <img
            src={`/images/${language}.png`}
            alt={language}
            className="size-4 object-contain"
          />
          <span className="text-sm text-light/70">
            {language || "plaintext"}
          </span>
        </div>
        {/* button to copy code to clipboard */}
        <CopiedButton content={trimmedCode} />
      </div>

      {/* code block with syntax highlighting */}
      <div className="relative bg-body/30">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDark} // dark theme for the code
          customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
            color: undefined,
          }}
          showLineNumbers={true}
          wrapLines={true} // wrap long lines
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
