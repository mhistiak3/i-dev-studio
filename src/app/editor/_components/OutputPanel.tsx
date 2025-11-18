"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState } from "react";
import {
  LuCheckCheck,
  LuClock,
  LuCopy,
  LuTerminal,
  LuTriangleAlert,
} from "react-icons/lu";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

const OutputPanel = () => {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  // handler
  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-dark/90 backdrop-blur rounded-xl border border-border/5 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-dark ring-1 ring-light/5">
            <LuTerminal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-light">Output</span>
        </div>

        {hasContent && (
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
        )}
      </div>

      {/* Output Area */}
      <div className="relative">
        <div
          className="relative bg-dark/50 backdrop-blur-sm border border-border 
        rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm"
        >
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <LuTriangleAlert className="w-5 h-5 shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <LuCheckCheck className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-light">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-light/50">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-dark ring-1 ring-light/5 mb-4">
                <LuClock className="w-6 h-6" />
              </div>
              <p className="text-center">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
