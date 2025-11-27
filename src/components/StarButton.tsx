"use client";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { LuStar } from "react-icons/lu";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const StarButton = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
  const { isSignedIn } = useAuth();
  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const toggleStar = useMutation(api.snippets.starSnippet);

  const handleToggleStar = async () => {
    if (!isSignedIn) return;

    try {
      await toggleStar({ snippetId });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className={`group/star flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
    transition-all duration-200 ${
      isStarred
        ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
        : "bg-light/10 text-light/50 hover:bg-light/20"
    }`}
      onClick={handleToggleStar}
    >
      <LuStar
        className={`w-4 h-4 ${
          isStarred
            ? "fill-yellow-500"
            : "fill-none group-hover/star:fill-light/50"
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isStarred ? "text-yellow-500" : "text-light/50"
        }`}
      >
        {starCount}
      </span>
    </button>
  );
};

export default StarButton;
