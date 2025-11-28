import { useState } from "react";
import { LuCheckCheck, LuCopy } from "react-icons/lu";

const CopiedButton = ({ content }: { content: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    content && (
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-light/70 hover:text-light bg-dark 
               rounded-lg ring-1 ring-light/5 hover:ring-light/10 transition-all"
      >
        {isCopied ? (
          <>
            <LuCheckCheck className="w-3.5 h-3.5" />
            Copied!
          </>
        ) : (
          <>
            <LuCopy className="w-3.5 h-3.5" />
            Copy
          </>
        )}
      </button>
    )
  );
};

export default CopiedButton;
