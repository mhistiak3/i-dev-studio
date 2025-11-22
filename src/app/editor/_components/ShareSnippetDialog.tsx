import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../convex/_generated/api";

const ShareSnippetDialog = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);

  //   handler
  const handleShare = async (event: React.FormEvent) => {
    event?.preventDefault();
    setIsSharing(true);
    try {
      await createSnippet({ title, code: getCode(), language });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully!");
    } catch (error) {
      console.error("Error sharing snippet:", error);
      toast.error("Failed to share snippet. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-dark/90 backdrop-blur rounded-xl border border-border/5 p-6 w-full max-w-md">
          <h2 className="text-lg font-medium text-light mb-4">Share Snippet</h2>
          <input
            type="text"
            placeholder="Snippet Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-dark/50 border border-border text-light placeholder-light/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-light/70 hover:text-light bg-dark rounded-lg ring-1 ring-light/5 hover:ring-light/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              disabled={isSharing || !title.trim()}
              className="px-4 py-2 text-sm text-light bg-primary/20 rounded-lg hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSharing ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSnippetDialog;
