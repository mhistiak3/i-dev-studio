import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuMessageSquareReply } from "react-icons/lu";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
  const { user } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // get all comment
  const comments = useQuery(api.snippets.getCommentsBySnippetId, { snippetId });
  // add comment mutation
  const addComment = useMutation(api.snippets.addComment);
  // delete comment mutation
  const deleteComment = useMutation(api.snippets.deleteComment);

  // handlers
  const handleAddComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await addComment({ snippetId, content });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeleting(commentId);
    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    } finally {
      setDeleting(null);
    }
  };
  return (
    <div className="bg-primary/5 border border-border rounded-2xl overflow-hidden ">
      <div className="px-6 sm:px-8 py-6 border-b border-border">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <LuMessageSquareReply className="w-5 h-5" />
          Discussion ({comments?.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {user ? (
          <CommentForm
            onSubmit={handleAddComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="bg-transparent rounded-xl p-6 text-center mb-8 ">
            <p className="text-light mb-4">Sign in to join the discussion</p>
            <SignInButton mode="modal">
              <button className="btn-primary">Sign In</button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onDelete={handleDeleteComment}
                deleting={deleting === comment._id}
                currentUserId={user?.id}
              />
            ))
          ) : (
            <p className="text-light/60 text-center">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
