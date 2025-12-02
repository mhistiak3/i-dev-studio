import CodeBlock from "@/app/snippets/[id]/_components/CodeBlock";
import DeleteButton from "@/components/DeleteButton";
import { useMutation } from "convex/react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface ExecutionProps {
  execution: {
    _id: Id<"codeExecutions">;
    _creationTime: number;
    output?: string;
    error?: string;
    userId: string;
    code: string;
    language: string;
  };
}
const ExecutionCard = ({ execution }: ExecutionProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteExecution = useMutation(
    api.codeExecutions.deleteCodeExecutionById
  );

  //   handler
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteExecution({ executionId: execution._id });
    } catch (error) {
      console.error("Error deleting execution:", error);
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
      <div className="group rounded-xl overflow-hidden transition-all duration-300 border border-border hover:border-primary/50">
        <div className="flex items-center justify-between p-4 bg-dark/30 rounded-t-xl border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <Image
                src={"/images/" + execution.language + ".png"}
                alt={execution.language + " logo"}
                className="rounded-lg relative z-10 object-cover"
                width={40}
                height={40}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-light">
                  {execution.language.toUpperCase()}
                </span>
                <span className="text-xs text-light/50">•</span>
                <span className="text-xs text-light/50">
                  {new Date(execution._creationTime).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    execution.error
                      ? "bg-red-500/10 text-red-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {execution.error ? "Error" : "Success"}
                </span>
              </div>
            </div>
          </div>
          <DeleteButton handleDelete={handleDelete} isDeleting={isDeleting} />
        </div>

        <div className="p-4 bg-dark/20">
          <CodeBlock code={execution.code} language={execution.language} />

          {(execution.output || execution.error) && (
            <div className="mt-4 p-4 rounded-lg bg-body/40">
              <h4 className="text-lg font-medium text-light/70 mb-2 border-b border-primary/50 inline-block pb-1">
                Output
              </h4>
              <pre
                className={`text-sm ${
                  execution.error ? "text-red-400" : "text-green-600"
                }`}
              >
                {execution.error || execution.output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ExecutionCard;
