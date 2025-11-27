"use client";
import useMounted from "@/hooks/useMounted";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  LuAlbum,
  LuChevronDown,
  LuCircleOff,
  LuCloud,
  LuGithub,
  LuLaptop,
  LuMoon,
  LuPalette,
  LuSun,
} from "react-icons/lu";
import { THEMES } from "../_constants";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <LuMoon className="size-4" />,
  "vs-light": <LuSun className="size-4" />,
  "github-dark": <LuGithub className="size-4" />,
  monokai: <LuLaptop className="size-4" />,
  "solarized-dark": <LuCloud className="size-4" />,
  dracula: <LuAlbum className="size-4" />,
};

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);
  const mounted = useMounted();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-dark/80 
      rounded-lg transition-all 
       duration-200 border border-body/50 hover:border-border/70
      `}
      >
        <div
          className="absolute inset-0 bg-linear-to-r from-primary/10 to-dark/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        <LuPalette className="size-4 text-light/60 group-hover:text-light transition-colors duration-200 hidden lg:inline-block" />
        <span className="text-light/60 min-w-20 text-left group-hover:text-light transition-colors duration-200 hidden lg:inline-block">
          {currentTheme?.label}
        </span>
        {/* indicator */}
        <div
          className="relative size-4 rounded-full border border-border group-hover:border-border/80 transition-colors duration-200"
          style={{ backgroundColor: currentTheme?.color }}
        />
        <LuChevronDown
          className={`size-4 text-light/60 group-hover:text-light transition-all duration-300
            ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 bg-dark/95 backdrop-blur-xl
           rounded-xl border border-border shadow-2xl py-2 z-50"
          >
            <div className="px-3 pb-2 mb-2 border-b border-border/50">
              <p className="text-xs font-medium text-light/60">Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-dark transition-all duration-200
                ${theme === t.id ? "bg-primary/10 text-primary" : "text-light"}
              `}
                onClick={() => setTheme(t.id)}
              >
                {/* bg gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-dark/5 opacity-0 
              group-hover:opacity-100 transition-opacity"
                />

                {/* icon */}
                <div
                  className={`
                flex items-center justify-center size-8 rounded-lg
                ${
                  theme === t.id
                    ? "bg-primary/10 text-primary"
                    : "bg-dark/50 text-gray-400"
                }
                group-hover:scale-110 transition-all duration-200
              `}
                >
                  {THEME_ICONS[t.id] || <LuCircleOff className="w-4 h-4" />}
                </div>
                {/* label */}
                <span className="flex-1 text-left group-hover:text-white transition-colors">
                  {t.label}
                </span>

                {/* color indicator */}
                <div
                  className="relative size-4 rounded-full border border-border/60 
                group-hover:border-border/10 transition-colors"
                  style={{ background: t.color }}
                />

                {/* active theme border */}
                {theme === t.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
