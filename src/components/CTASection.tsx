"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import Link from "next/link";
import EditorButton from "./EditorButton";

const CTASection = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="section">
      <div className="sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-linear-to-br from-primary/10 to-primary/5 rounded-3xl p-6 sm:p-12 text-center border border-primary/20 overflow-hidden"
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
                <EditorButton>Start Coding Now</EditorButton>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <EditorButton>Get Started Free </EditorButton>
              </SignInButton>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
