"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import Link from "next/link";
import { LuArrowRight, LuRocket } from "react-icons/lu";

const CTASection = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-linear-to-br from-primary/10 to-primary/5 rounded-3xl p-12 text-center border border-primary/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[32px]" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-light mb-4">
              Ready to Start Coding?
            </h2>
            <p className="text-lg text-light/70 mb-8 max-w-2xl mx-auto">
              Join thousands of developers using iDevStudio to write, execute,
              and share code online.
            </p>

            {isSignedIn ? (
              <Link href="/editor">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-primary/80 rounded-xl text-light font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  <LuRocket className="w-5 h-5" />
                  Start Coding Now
                  <LuArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-primary/80 rounded-xl text-light font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  <LuRocket className="w-5 h-5" />
                  Get Started Free
                  <LuArrowRight className="w-5 h-5" />
                </motion.button>
              </SignInButton>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
