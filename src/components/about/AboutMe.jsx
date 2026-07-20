import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-[var(--color-orange)]">
          About Me
        </h2>
        <p className="text-lg leading-relaxed mb-4 text-[var(--text-primary)]">
          Hi, I'm Paramveer Singh. I'm a Machine Learning and Backend Engineer with a deep passion for building high-performance architectures. My expertise spans GPU-accelerated infrastructure, custom PyTorch and CUDA extensions, and stateful multi-agent systems.
        </p>
        <p className="text-lg leading-relaxed mb-4 text-[var(--text-primary)]">
          I strive to bridge the gap between frontier AI research and highly scalable, production-grade engineering. Whether I'm implementing FlashAttention from scratch or engineering microservices for enterprise search, I love pushing hardware and software to their absolute limits.
        </p>
        <p className="text-lg leading-relaxed mb-4 font-semibold">
          Currently focused on: <span className="text-[var(--accent)]">Scalable Full-Stack Architectures & Deep Tech Solutions</span>
        </p>
        <ul className="space-y-2 mt-4 text-md">
          <li className="flex items-start">
            <span className="text-[var(--accent)] mr-2 mt-1">•</span>
            <span className="opacity-90">Interested in Machine Learning, Embedded Systems, Cyber Security, and Kernel Programming.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--accent)] mr-2 mt-1">•</span>
            <span className="opacity-90">Open to collaboration, open-source development, and research analysis.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center bg-[var(--color-off-white)] rounded-xl p-8 shadow-sm border border-[var(--color-border)]">
         <img 
            src="https://avatars.githubusercontent.com/u/155875516?v=4" 
            alt="Paramveer Singh" 
            className="w-32 h-32 rounded-full mb-6 border-4 border-[var(--color-orange)] shadow-md object-cover"
         />
         <div className="w-full grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
              <p className="text-2xl font-bold text-[var(--accent)]">63+</p>
              <p className="text-sm font-medium opacity-80">Public Repos</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
              <p className="text-2xl font-bold text-[var(--accent)]">50+</p>
              <p className="text-sm font-medium opacity-80">Stars Received</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;
