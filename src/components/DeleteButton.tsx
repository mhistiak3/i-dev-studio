import { LuTrash2 } from "react-icons/lu";

const DeleteButton = ({
  handleDelete,
  isDeleting,
}: {
  handleDelete: () => void;
  isDeleting: boolean;
}) => {
  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
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
  );
};

export default DeleteButton;
