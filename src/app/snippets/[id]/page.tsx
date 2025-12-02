"use client";

import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/editor/_constants";
import CopiedButton from "@/components/CopiedButton";
import NavigationHeader from "@/components/NavigationHeader";
import StarButton from "@/components/StarButton";
import { useUser } from "@clerk/nextjs";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { LuClock, LuCode, LuMessageSquare, LuUser } from "react-icons/lu";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Comments from "./_components/Comments";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";

const SnippetDetails = () => {
  const { id } = useParams();
  const { user } = useUser();

  const snippet = useQuery(api.snippets.getSnippetById, {
    snippetId: id as Id<"snippets">,
  });
  const comments = useQuery(api.snippets.getCommentsBySnippetId, {
    snippetId: id as Id<"snippets">,
  });

  if (snippet === undefined) {
    return <SnippetLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="container">
        <NavigationHeader />
        <main className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="bg-primary/5 border border-border/10 rounded-2xl p-6  mb-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-14 rounded-xl bg-light/5 p-2.5">
                    <img
                      src={`/images/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-light mb-2">
                      {snippet.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 text-light/60">
                        <LuUser className="w-4 h-4" />
                        <span>{snippet.userName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-light/60">
                        <LuClock className="w-4 h-4" />
                        <span>
                          {new Date(snippet._creationTime).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-light/60">
                        <LuMessageSquare className="w-4 h-4" />
                        <span>{comments?.length} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center px-3 py-1.5 bg-primary/60 text-light rounded-lg text-sm font-medium">
                  {snippet.language}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="mb-8 rounded-2xl overflow-hidden border border-border/10 bg-primary/5">
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border/10">
                <div className="flex items-center gap-2 text-light/60">
                  <LuCode className="w-4 h-4" />
                  <span className="text-sm font-medium">Source Code</span>
                </div>
                <div className="flex gap-x-3">
                  <CopiedButton content={snippet.code} />
                  {user && <StarButton snippetId={snippet._id} />}
                </div>
              </div>
              <Editor
                height="600px"
                language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
                value={snippet.code}
                theme="vs-dark"
                beforeMount={defineMonacoThemes}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                  renderWhitespace: "selection",
                  fontFamily:
                    '"Fira Code", "Cascadia Code", Consolas, monospace',
                  fontLigatures: true,
                }}
              />
            </div>

            <Comments snippetId={snippet._id} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SnippetDetails;
