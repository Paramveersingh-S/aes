import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reposData from '../../data/repos.json';
import ProjectCard from './ProjectCard';
import ProjectFilterBar from './ProjectFilterBar';
import { HiExternalLink, HiPlus, HiMinus } from 'react-icons/hi';

const ProjectGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

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
            <span className="px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              03
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              ENGINEERING PORTFOLIO
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            High-throughput distributed systems, AWS Terraform architectures, and custom CUDA kernels.
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

      {/* Bottom Controls */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {reposData.length > 12 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="katana-btn px-6 py-3.5 rounded-xl bg-[#040b1d] border border-blue-400/25 hover:border-blue-400 text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer"
          >
            {showAll ? (
              <>
                <HiMinus className="w-4 h-4 text-blue-400" />
                <span>Show Top 12 Projects</span>
              </>
            ) : (
              <>
                <HiPlus className="w-4 h-4 text-blue-400" />
                <span>Show All {reposData.length} Repositories</span>
              </>
            )}
          </button>
        )}

        <a
          href="https://github.com/Paramveersingh-S?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="katana-btn px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_24px_rgba(37,99,235,0.5)]"
        >
          <span>View All {reposData.length} Repositories on GitHub</span>
          <HiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProjectGrid;
