"use client";

import Badge from "@/components/Badge";
import CTASection from "@/components/CTASection";
import NavigationHeader from "@/components/NavigationHeader";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  LuBookOpen,
  LuCode,
  LuLayers,
  LuSearch,
  LuTag,
  LuX,
} from "react-icons/lu";
import { TbLayoutGrid } from "react-icons/tb";
import { api } from "../../../convex/_generated/api";
import SnippetCard from "./_components/SnippetCard";
import SnippetsPageSkeleton from "./_components/SnippetPageSkeleton";

const SnippetsPage = () => {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  // loading state
  if (snippets === undefined) {
    return (
      <div className="container">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  // get popular languages based on snippet count
  const languageCounts = snippets.reduce((acc, snippet) => {
    acc[snippet.language] = (acc[snippet.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularLanguages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  // filter snippets
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage = selectedLanguage
      ? snippet.language === selectedLanguage
      : true;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-body/20">
      <div className="container">
        <NavigationHeader />
        {/* Hero */}

        <main className="section">
          <div className="relative max-w-7xl mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-1">
              <Badge content="Code Snippets Gallery" Icon={LuBookOpen} />
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

          {/* Filters Section */}
          <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative flex items-center">
                <LuSearch className="absolute left-4 w-5 h-5 text-light/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search snippets by title, language, or author..."
                  className="w-full pl-12 pr-4 py-4 bg-dark/80 hover:bg-dark text-light
                  rounded-xl border border-border hover:border-border/80 transition-all duration-200
                  placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            {/* Language Filters & View Toggle */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-dark rounded-lg ring-1 ring-light/10">
                <LuTag className="w-4 h-4 text-light/50" />
                <span className="text-sm text-light/70">Languages:</span>
              </div>

              {popularLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() =>
                    setSelectedLanguage(lang === selectedLanguage ? null : lang)
                  }
                  className={`
                    group relative px-3 py-1.5 rounded-lg transition-all duration-200
                    ${
                      selectedLanguage === lang
                        ? "text-primary bg-primary/10 ring-2 ring-primary/50"
                        : "text-light/70 hover:text-light bg-dark hover:bg-dark/80 ring-1 ring-light/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`/images/${lang}.png`}
                      alt={lang}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-sm">{lang}</span>
                  </div>
                </button>
              ))}

              {selectedLanguage && (
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-light/60 hover:text-light transition-colors"
                >
                  <LuX className="w-3 h-3" />
                  Clear
                </button>
              )}

              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm text-light/50">
                  {snippets.length} snippets found
                </span>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-dark rounded-lg ring-1 ring-light/10">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-md transition-all ${
                      view === "grid"
                        ? "bg-primary/20 text-primary"
                        : "text-light/60 hover:text-light hover:bg-dark/80"
                    }`}
                  >
                    <TbLayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-md transition-all ${
                      view === "list"
                        ? "bg-primary/20 text-primary"
                        : "text-light/60 hover:text-light hover:bg-dark/80"
                    }`}
                  >
                    <LuLayers className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Snippets */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              className={`grid gap-6 ${
                view === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-3xl mx-auto"
              }`}
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredSnippets.map((snippet) => (
                  <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Handle Empty State */}

            {filteredSnippets.length === 0 && (
              <motion.div className="text-center py-12">
                <LuCode className="w-12 h-12 text-light/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-light/70 mb-2">
                  No snippets found
                </h3>
                <p className="text-light/50 mb-4">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                {(searchQuery || selectedLanguage) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedLanguage(null);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-200 ring-1 ring-primary/30"
                  >
                    <LuX className="w-4 h-4" />
                    Clear All Filters
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </main>

        <CTASection />
      </div>
    </div>
  );
};

export default SnippetsPage;
