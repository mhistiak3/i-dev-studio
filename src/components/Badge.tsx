import { motion } from "motion/react";

const Badge = ({
  content,
  Icon,
}: {
  content: string;
  Icon: React.ElementType;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
    >
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-light">{content}</span>
    </motion.div>
  );
};

export default Badge;
