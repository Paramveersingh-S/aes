import React from 'react';
import { motion } from 'framer-motion';

const HeroText = ({ about }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[clamp(2.5rem,6vw,4.5rem)] text-[var(--text-inverted)] font-display font-bold leading-tight mb-4"
      >
        Paramveer Singh
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg md:text-xl text-[var(--text-inverted)] font-body max-w-2xl opacity-90"
      >
        {about?.tagline || "Machine Learning | Embedded Software | Cyber Security | Kernel Programming"}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10"
      >
        <motion.a
          href="#about"
          aria-label="Scroll Down"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-[var(--accent)] hover:text-white transition-colors block p-2"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default HeroText;
