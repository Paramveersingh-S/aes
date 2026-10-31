import React, { useState } from 'react';
import { motion } from 'framer-motion';
import techData from '../../data/techstack.json';
import { useLanguage } from '../../contexts/LanguageContext';
import * as SimpleIcons from 'react-icons/si';

const TechStackGrid = () => {
  const { t } = useLanguage();
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
            <span className="px-2.5 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              参ノ型
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
              NICHIRIN FORGE // 日輪の武器庫
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('tech.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            {t('tech.subtitle')}
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
                  ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_20px_var(--accent-glow)]'
                  : 'bg-[#090912] text-gray-300 border border-white/10 hover:border-[var(--accent-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Tech Blade Grid */}
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
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[var(--accent)] flex items-center justify-center text-gray-200 group-hover:text-[var(--accent)] transition-all shadow-inner">
                {IconComponent ? (
                  <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-115" />
                ) : (
                  <span className="font-display font-bold text-lg">{tech.name[0]}</span>
                )}
              </div>

              <div className="w-full">
                <div className="font-bold text-xs sm:text-sm text-white group-hover:text-[var(--accent)] transition-colors">
                  {tech.name}
                </div>
                <div className="font-mono text-[10px] text-gray-400 truncate mt-0.5">
                  {tech.category}
                </div>
              </div>

              {/* Subtle Mastery Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full"
                  style={{ width: tech.level || '90%' }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechStackGrid;
