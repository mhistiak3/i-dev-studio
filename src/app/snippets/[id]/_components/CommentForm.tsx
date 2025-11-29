import { useState } from "react";
import { LuCode, LuSend } from "react-icons/lu";
import CommentContent from "./CommentContent";

const CommentForm = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting: boolean;
}) => {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // handlers
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    await onSubmit(comment);
    setComment("");
    setIsPreview(false);
  };
  const handleKeyDown = () => {};
  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-dark rounded-xl border border-border/10 overflow-hidden">
        {/* Comment form header */}
        <div className="flex justify-end gap-2 px-4 py-2 border-b border-border">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`text-sm px-3 py-1 rounded-md transition-colors ${
              isPreview
                ? "bg-primary/10 text-primary"
                : "hover:bg-light/5 text-light/60"
            }`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Comment form body */}
        {isPreview ? (
          <div className="min-h-[120px] p-4 text-light">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add to the discussion..."
            className="w-full bg-transparent border-0 text-light placeholder:text-light/40 outline-none 
            resize-none min-h-[120px] p-4 font-mono text-sm"
          />
        )}

        {/* Comment Form Footer */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-body/10 border-t border-border/10">
          <div className="hidden sm:block text-xs text-light/50 space-y-1">
            <div className="flex items-center gap-2">
              <LuCode className="w-3.5 h-3.5" />
              <span>Format code with ```language</span>
            </div>
            <div className="text-light/30 pl-5">
              Tab key inserts spaces • Preview your comment before posting
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-light rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-light/30 
                border-t-light rounded-full animate-spin"
                />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <LuSend className="w-4 h-4" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
