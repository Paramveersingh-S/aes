import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reposData from '../../data/repos.json';
import ProjectCard from './ProjectCard';
import ProjectFilterBar from './ProjectFilterBar';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiExternalLink, HiPlus, HiMinus } from 'react-icons/hi';

const ProjectGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();

  const filters = useMemo(() => {
    const cats = new Set();
    reposData.forEach((repo) => {
      if (repo.category) cats.add(repo.category);
    });
    return Array.from(cats);
  }, []);

  const filteredRepos = useMemo(() => {
    const matching =
      activeFilter === 'All'
        ? reposData
        : reposData.filter((repo) => repo.category === activeFilter || repo.language === activeFilter);

    return showAll ? matching : matching.slice(0, 12);
  }, [activeFilter, showAll]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              肆ノ型
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
              BLOOD & STEEL ARCHITECTURE // 主要システム
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            {t('projects.subtitle')}
          </p>
        </div>
      </div>

      {/* Category Filter Bar */}
      <ProjectFilterBar
        filters={filters}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* Project Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard repo={repo} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Controls: Expand All Vault + GitHub Profile CTA */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {reposData.length > 12 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="katana-btn px-6 py-3.5 rounded-xl bg-[#0a0a12] border border-white/15 hover:border-[var(--accent)] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer"
          >
            {showAll ? (
              <>
                <HiMinus className="w-4 h-4 text-[var(--accent)]" />
                <span>SHOW TOP 12 FLAGSHIP SYSTEMS</span>
              </>
            ) : (
              <>
                <HiPlus className="w-4 h-4 text-[var(--accent)]" />
                <span>UNSEAL ALL {reposData.length} REPOSITORIES</span>
              </>
            )}
          </button>
        )}

        <a
          href="https://github.com/Paramveersingh-S?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="katana-btn px-7 py-3.5 rounded-xl bg-[var(--accent)] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_24px_var(--accent-glow)]"
        >
          <span>
            {t('projects.viewAll')} {reposData.length} {t('projects.ReposOnGh')}
          </span>
          <HiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProjectGrid;
