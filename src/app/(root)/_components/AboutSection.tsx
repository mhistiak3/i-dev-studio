"use client";

import { motion } from "motion/react";
import { LuCode } from "react-icons/lu";

const BENEFITS = [
  "No installation required - start coding instantly",
  "Real-time code execution with instant feedback",
  "Beautiful, customizable editor themes",
  "Save and share your code snippets publicly",
  "Built with modern technologies for best performance",
];

const AboutSection = () => {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-linear-to-br from-dark to-dark/80 rounded-3xl p-8 sm:p-12 border border-border/50 overflow-hidden relative"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-light mb-6">
                  Why Choose iDevStudio?
                </h2>
                <p className="text-lg text-light/70 mb-6 leading-relaxed">
                  iDevStudio is a modern online code editor designed for
                  developers who value speed, simplicity, and power. Whether
                  you're learning to code, prototyping ideas, or sharing
                  solutions with your team, we've got you covered.
                </p>
                <ul className="space-y-4">
                  {BENEFITS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-light/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <LuCode className="w-24 h-24 text-primary mx-auto mb-4" />
                  <p className="text-light/60 text-sm">
                    Powered by Monaco Editor
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
