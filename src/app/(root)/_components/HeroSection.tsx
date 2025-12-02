"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import Link from "next/link";
import {
  LuArrowRight,
  LuCode,
  LuFileCode,
  LuPalette,
  LuRocket,
  LuSparkles,
  LuZap,
} from "react-icons/lu";

const STATS = [
  { label: "Languages Supported", value: "10+", icon: LuCode },
  { label: "Code Executions", value: "∞", icon: LuZap },
  { label: "Editor Themes", value: "6", icon: LuPalette },
  { label: "Community Snippets", value: "Growing", icon: LuFileCode },
];

const HeroSection = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
          >
            <LuSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-light">
              Professional Online Code Editor
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-light mb-6 tracking-tight"
          >
            Write, Execute & Share
            <br />
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Code Instantly
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-light/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A powerful online code editor supporting 10+ programming languages.
            Write, run, and share your code with beautiful themes and real-time
            execution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isSignedIn ? (
              <Link href="/editor">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-linear-to-r from-primary to-primary/80 rounded-xl text-light font-semibold overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <LuRocket className="w-5 h-5" />
                    Start Coding Now
                    <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-light/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-linear-to-r from-primary to-primary/80 rounded-xl text-light font-semibold overflow-hidden shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <LuRocket className="w-5 h-5" />
                    Get Started Free
                    <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-light/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.button>
              </SignInButton>
            )}

            <Link href="/snippets">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-dark border border-border rounded-xl text-light font-semibold hover:bg-dark/80 hover:border-primary/50 transition-all"
              >
                <span className="flex items-center gap-2">
                  <LuFileCode className="w-5 h-5" />
                  Explore Snippets
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-dark/40 border border-border/50"
              >
                <stat.icon className="w-6 h-6 text-primary" />
                <div className="text-2xl font-bold text-light">
                  {stat.value}
                </div>
                <div className="text-sm text-light/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
