"use client";

import { motion } from "motion/react";
import Image from "next/image";

const SUPPORTED_LANGUAGES = [
  { name: "JavaScript", logo: "/images/javascript.png" },
  { name: "TypeScript", logo: "/images/typescript.png" },
  { name: "Python", logo: "/images/python.png" },
  { name: "Java", logo: "/images/java.png" },
  { name: "C++", logo: "/images/cpp.png" },
  { name: "Go", logo: "/images/go.png" },
  { name: "Rust", logo: "/images/rust.png" },
  { name: "C#", logo: "/images/csharp.png" },
];

const LanguagesSection = () => {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            Supported Languages
          </h2>
          <p className="text-lg text-light/70 max-w-2xl mx-auto">
            Write and execute code in your favorite programming language
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-4 md:grid-cols-8 gap-6"
        >
          {SUPPORTED_LANGUAGES.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-dark/40 border border-border/50 hover:border-primary/50 hover:bg-dark/60 transition-all cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src={lang.logo}
                  alt={lang.name}
                  width={40}
                  height={40}
                  className="relative z-10 object-contain"
                />
              </div>
              <span className="text-xs font-medium text-light/60 group-hover:text-light transition-colors">
                {lang.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LanguagesSection;
