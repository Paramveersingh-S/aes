import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reposData from '../../data/repos.json';
import ProjectCard from './ProjectCard';
import ProjectFilterBar from './ProjectFilterBar';
import { HiExternalLink, HiPlus, HiMinus, HiX, HiChip } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa6';

const ProjectGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [inspectedRepo, setInspectedRepo] = useState(null);

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
              <ProjectCard repo={repo} index={idx} onInspect={setInspectedRepo} />
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

      {/* System Architecture & Specs Inspector Modal */}
      <AnimatePresence>
        {inspectedRepo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectedRepo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl bg-[#03091a] border border-blue-400/35 shadow-[0_0_50px_rgba(37,99,235,0.4)] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-blue-400/15">
                <div className="flex items-center gap-2">
                  <HiChip className="w-5 h-5 text-blue-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
                    SYSTEM ARCHITECTURE SPECS
                  </span>
                </div>
                <button
                  onClick={() => setInspectedRepo(null)}
                  className="p-1.5 rounded-lg bg-blue-500/10 text-slate-300 hover:text-white cursor-pointer"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-3">
                <span className="px-2.5 py-1 rounded bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono text-xs font-bold">
                  {inspectedRepo.badge || inspectedRepo.category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {inspectedRepo.name.replace(/-/g, ' ')}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {inspectedRepo.excerpt || inspectedRepo.description}
              </p>

              {/* Key Telemetry Metrics */}
              {inspectedRepo.metrics && (
                <div className="mb-6">
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                    Key Telemetry & Architecture Highlights
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {inspectedRepo.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#020611] border border-blue-400/20 font-mono text-xs text-blue-200 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-blue-400/15">
                <a
                  href={inspectedRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="katana-btn flex-1 py-3 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Inspect Repository on GitHub</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;
