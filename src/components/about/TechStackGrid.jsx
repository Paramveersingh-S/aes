import React, { useState } from 'react';
import { motion } from 'framer-motion';
import techData from '../../data/techstack.json';
import BenchmarkTerminal from './BenchmarkTerminal';
import * as SimpleIcons from 'react-icons/si';

const TechStackGrid = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(techData.map((item) => item.category)))];

  const filteredTech =
    activeCategory === 'ALL'
      ? techData
      : techData.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              02
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              TOOLS & INFRASTRUCTURE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Languages, bare-metal GPU kernels, and cloud infrastructure used in production.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`katana-btn px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.45)]'
                  : 'bg-[#040b1d] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Tech Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {filteredTech.map((tech) => {
          const IconComponent = SimpleIcons[tech.icon];
          return (
            <motion.div
              key={tech.name}
              layout
              whileHover={{ y: -6, scale: 1.03 }}
              className="nichirin-card group rounded-2xl p-4 flex flex-col items-center text-center justify-between gap-3 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/[0.08] border border-blue-400/20 group-hover:border-blue-400 flex items-center justify-center text-slate-200 group-hover:text-blue-400 transition-all shadow-inner">
                {IconComponent ? (
                  <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />
                ) : (
                  <span className="font-display font-bold text-lg">{tech.name[0]}</span>
                )}
              </div>

              <div className="w-full">
                <div className="font-bold text-xs sm:text-sm text-white group-hover:text-blue-300 transition-colors">
                  {tech.name}
                </div>
                <div className="font-mono text-[10px] text-slate-400 truncate mt-0.5">
                  {tech.category}
                </div>
              </div>

              {/* Mastery Bar */}
              <div className="w-full h-1 bg-blue-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
                  style={{ width: tech.level || '90%' }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Interactive Live Benchmark Terminal */}
      <BenchmarkTerminal />
    </div>
  );
};

export default TechStackGrid;
