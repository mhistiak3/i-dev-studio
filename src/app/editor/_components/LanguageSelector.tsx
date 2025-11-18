"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { LANGUAGE_CONFIG } from "../_constants";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  const currentLanguage = LANGUAGE_CONFIG[language];
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
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;

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
        {/* HOVER */}
        <div
          className="absolute inset-0 bg-linear-to-r from-primary/10 to-dark/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        {/* Language Icon */}
        <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <Image
            src={"/images" + currentLanguage.logoPath}
            alt="programming language logo"
            width={24}
            height={24}
            className="w-full h-full object-contain relative z-10"
          />
        </div>
        {/* Language Name */}
        <span className="text-light/60 min-w-20 text-left group-hover:text-light transition-colors duration-200">
          {currentLanguage?.label}
        </span>
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
              <p className="text-xs font-medium text-light/60">
                Select Language
              </p>
            </div>

            <div className="max-h-[200px] overflow-y-auto overflow-x-hidden">
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => (
                <motion.button
                  key={lang.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-dark transition-all duration-200
                   ${
                     language === lang.id
                       ? "bg-primary/10 text-primary"
                       : "text-light"
                   }
                              `}
                  onClick={() => setLanguage(lang.id)}
                >
                  {/* bg gradient */}
                  <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-dark/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* icon */}
                  <div
                    className={`flex items-center justify-center size-8 rounded-lg
                    ${
                      language === lang.id
                        ? "bg-primary/10 text-primary"
                        : "bg-dark/50 text-light/60"
                    }
                     group-hover:scale-110 transition-all duration-200`}
                  >
                    <Image
                      src={"/images" + lang.logoPath}
                      alt={lang.label + " logo"}
                      width={24}
                      height={24}
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  {/* label */}
                  <span className="flex-1 text-left group-hover:text-white transition-colors">
                    {lang.label}
                  </span>

                  {/* active language border */}
                  {language === lang.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-primary/30 rounded-lg"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
