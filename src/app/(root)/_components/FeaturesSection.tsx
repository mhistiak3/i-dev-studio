"use client";

import { motion } from "motion/react";
import {
  LuCode,
  LuGlobe,
  LuLayers,
  LuPalette,
  LuPlay,
  LuShare2,
} from "react-icons/lu";

export const FEATURES = [
  {
    icon: LuCode,
    title: "Multi-Language Support",
    description:
      "Write and execute code in 10+ programming languages including JavaScript, Python, Java, C++, and more.",
    gradient: "from-primary/20 to-primary/60",
  },
  {
    icon: LuPlay,
    title: "Instant Code Execution",
    description:
      "Run your code in real-time with our powerful execution engine powered by Piston API.",
    gradient: "from-primary/20 to-primary/60",
  },
  {
    icon: LuPalette,
    title: "Beautiful Themes",
    description:
      "Choose from 6 professionally designed editor themes including VS Dark, Monokai, and Dracula.",
    gradient: "from-primary/20 to-primary/60",
  },
  {
    icon: LuShare2,
    title: "Share Code Snippets",
    description:
      "Save, organize, and share your code snippets with the community. Star your favorites for quick access.",
    gradient: "from-primary/20 to-primary/60",
  },
  {
    icon: LuLayers,
    title: "Smart Code Editor",
    description:
      "Monaco editor with IntelliSense, syntax highlighting, code folding, and customizable font sizes.",
    gradient: "from-primary/20 to-primary/60",
  },
  {
    icon: LuGlobe,
    title: "Community Driven",
    description:
      "Explore code snippets from developers worldwide, comment on snippets, and learn from others.",
    gradient: "from-primary/20 to-primary/60",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-light/70 max-w-2xl mx-auto">
            Everything you need for a professional coding experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-dark/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all overflow-hidden"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative">
                <div
                  className={`inline-flex p-3 rounded-xl bg-linear-to-br ${feature.gradient} bg-opacity-10 mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-light mb-3">
                  {feature.title}
                </h3>

                <p className="text-light/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
