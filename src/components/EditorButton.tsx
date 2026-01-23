import { motion } from "motion/react";
import { LuArrowRight, LuRocket } from "react-icons/lu";

const EditorButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative px-8 py-4 bg-linear-to-r from-primary to-primary/80 rounded-xl text-light font-semibold overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
    >
      <span className="relative z-10 flex items-center gap-2">
        <LuRocket className="w-5 h-5" />
        {children}
        <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-light/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.button>
  );
};

export default EditorButton;
