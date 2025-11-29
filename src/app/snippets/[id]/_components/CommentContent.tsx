import CodeBlock from "./CodeBlock";

const CommentContent = ({ content }: { content: string }) => {
  // regex for check is content is code block or normal text
  const parts = content.split(/(```[\s\S]*?```)/g);

  // render parts
  return (
    <div className="max-w-none text-white">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const codeContent = part.slice(3, -3).trim();
          const firstLineEnd = codeContent.indexOf("\n");
          let language = "";
          let code = codeContent;

          if (firstLineEnd !== -1) {
            language = codeContent.slice(0, firstLineEnd).trim();
            code = codeContent.slice(firstLineEnd + 1);
          }

          return (
            <pre key={index}>
              <CodeBlock language={language} code={code} />
            </pre>
          );
        } else {
          return (
            <p
              key={index}
              className="mb-2 whitespace-pre-wrap text-light/80 last:mb-0"
            >
              {part}
            </p>
          );
        }
      })}
    </div>
  );
};

export default CommentContent;
