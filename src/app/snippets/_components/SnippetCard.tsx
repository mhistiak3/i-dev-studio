"use client";
import StarButton from "@/components/StarButton";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuClock, LuTrash2, LuUser } from "react-icons/lu";
import { api } from "../../../../convex/_generated/api";

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  // handlers
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSnippet({ snippetId: snippet._id });
    } catch (error) {
      console.error("Error deleting snippet:", error);
      toast.error("Failed to delete snippet. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Link href={`/snippets/${snippet._id}`}>
        <div
          className="relative h-full bg-dark/80 backdrop-blur-sm rounded-xl 
          border border-border/50 hover:border-border 
          transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 rounded-lg blur opacity-20 
                  group-hover:opacity-30 transition-all duration-500"
                    area-hidden="true"
                  />
                  <div
                    className="relative p-2 rounded-lg bg-linear-to-br from-primary/10 to-primary/20 group-hover:from-primary/20
                   group-hover:to-primary/30 transition-all duration-500"
                  >
                    <Image
                      src={`/images/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-6 h-6 object-contain relative z-10"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium inline-block">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-light/50 mt-1">
                    <LuClock className="size-3" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="absolute top-5 right-5 z-10 flex gap-4 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />

                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
                        ${
                          isDeleting
                            ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                            : "bg-light/10 text-light/50 hover:bg-red-500/10 hover:text-red-400"
                        }
                    `}
                    >
                      {isDeleting ? (
                        <div className="size-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <LuTrash2 className="size-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-light mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-light/60">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-dark/50">
                      <LuUser className="size-3" />
                    </div>
                    <span className="truncate max-w-[150px]">
                      {snippet.userName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative group/code">
                <div className="absolute inset-0 bg-linear-to-br from-primary/15 to-primary/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                <pre className="relative bg-body/30 rounded-lg p-4 overflow-hidden text-sm text-light/70 font-mono line-clamp-6">
                  {snippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default SnippetCard;
