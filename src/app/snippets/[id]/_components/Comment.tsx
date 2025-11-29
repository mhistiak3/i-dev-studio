import { LuTrash2, LuUser } from "react-icons/lu";
import { Id } from "../../../../../convex/_generated/dataModel";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    userId: string;
    userName: string;
    content: string;
    _creationTime: number;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  deleting: boolean;
  currentUserId?: string;
}

const Comment = ({
  comment,
  onDelete,
  deleting,
  currentUserId,
}: CommentProps) => {
  return (
    <div className="group">
      <div className="bg-dark rounded-xl p-6 border border-border/10 hover:border-border/20 transition-all">
        <div className="flex items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-light/5 flex items-center justify-center shrink-0">
              <LuUser className="w-4 h-4 text-light/50" />
            </div>
            <div className="min-w-0">
              <span className="block text-light font-medium truncate">
                {comment.userName}
              </span>
              <span className="block text-sm text-light/50">
                {new Date(comment._creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>

          {comment.userId === currentUserId && (
            <button
              onClick={() => onDelete(comment._id)}
              disabled={deleting}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"
              title="Delete comment"
            >
              <LuTrash2 className="w-4 h-4 text-red-400" />
            </button>
          )}
        </div>

        {comment.content}
        {/* <CommentContent content={comment.content} /> */}
      </div>
    </div>
  );
};

export default Comment;
