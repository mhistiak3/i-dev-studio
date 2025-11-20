"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import { LuLoader, LuPlay } from "react-icons/lu";

const RunButton = () => {
  const user = useUser();
  const { runCode, language, isRunning, executionResult } =
    useCodeEditorStore();
  const handleRun = async () => {
    await runCode();
    if (user && executionResult) {
      // save to convex database
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleRun}
      className="px-4 py-2 rounded-lg overflow-hidden bg-linear-to-r from-primary to-primary/60 opacity-90 hover:opacity-100 transition-opacity"
    >
      {isRunning ? (
        <div className="relative flex items-center gap-2 animate-pulse">
          <LuLoader className="size-4 text-light/70 animate-spin" />
          <div className="absolute size-full inset-0 animate-pulse blur-sm" />
          <span className="text-sm font-medium text-light/90">
            Executing...
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 cursor-pointer">
          <LuPlay className="size-4 text-light" />
          <span className="text-sm font-medium text-light">Run Code</span>
        </div>
      )}
    </motion.button>
  );
};

export default RunButton;
