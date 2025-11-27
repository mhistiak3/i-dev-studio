"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { useQuery } from "convex/react";
import { motion } from "motion/react";
import { useState } from "react";
import { LuBookOpen } from "react-icons/lu";
import { api } from "../../../convex/_generated/api";
import SnippetsPageSkeleton from "./_components/SnippetPageSkeleton";

const SnippetsPage = () => {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  // loading state
  if (snippets === undefined) {
    return (
      <>
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </>
    );
  }
  return (
    <div className="min-h-screen bg-dark/20">
      <NavigationHeader />
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r
             from-primary/10 to-primary/20 text-sm text-light/70 mb-6"
          >
            <LuBookOpen className="w-4 h-4" />
            Code Snippets Gallery
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-linear-to-r from-light via-light/90 to-light/70 text-transparent bg-clip-text mb-6"
          >
            Browse, Learn & Share Code
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-light/60 mb-8"
          >
            Discover powerful code snippets crafted by developers worldwide
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default SnippetsPage;
