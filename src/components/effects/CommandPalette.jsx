import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reposData from '../../data/repos.json';
import ossData from '../../data/oss-contributions.json';
import {
  HiSearch,
  HiX,
  HiCode,
  HiExternalLink,
  HiDownload,
  HiLightningBolt,
  HiArrowRight
} from 'react-icons/hi';

const QUICK_ACTIONS = [
  {
    title: 'Jump to Featured Projects',
    category: 'Navigation',
    action: () => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: 'Jump to Open Source Contributions (42 Merged PRs)',
    category: 'Navigation',
    action: () => {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: 'Jump to Live Benchmark Terminal',
    category: 'Navigation',
    action: () => {
      document.querySelector('#tech')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    title: 'Download Resume PDF',
    category: 'Action',
    href: '/resume/Paramveer_Singh_Resume.pdf',
    download: true
  },
  {
    title: 'Open GitHub Profile (Paramveersingh-S)',
    category: 'External',
    href: 'https://github.com/Paramveersingh-S'
  },
  {
    title: 'Open Substack (ML Blueprints)',
    category: 'External',
    href: 'https://mlblueprints.substack.com/'
  }
];

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-palette'));
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = useMemo(() => {
    const repoItems = reposData.slice(0, 16).map((r) => ({
      title: r.name,
      subtitle: r.excerpt || r.description,
      category: `Project • ${r.language || 'Code'}`,
      href: r.html_url
    }));

    const prItems = [];
    (ossData.organizations || []).forEach((org) => {
      org.pullRequests.slice(0, 3).forEach((pr) => {
        prItems.push({
          title: pr.title,
          subtitle: pr.repo,
          category: `Merged PR • ${org.org}`,
          href: pr.url
        });
      });
    });

    const all = [...QUICK_ACTIONS, ...repoItems, ...prItems];
    if (!query.trim()) return all.slice(0, 10);

    const q = query.toLowerCase();
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md pt-20 px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-[#03091a] border border-blue-400/35 shadow-[0_0_60px_rgba(37,99,235,0.35)] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-400/15 bg-[#02050e]">
              <HiSearch className="w-5 h-5 text-blue-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, merged PRs, or jump to section..."
                className="w-full bg-transparent text-white placeholder-slate-400 font-mono text-sm focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-blue-500/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1.5">
              {items.length === 0 ? (
                <div className="py-10 text-center font-mono text-xs text-slate-400">
                  No matching projects or commands found.
                </div>
              ) : (
                items.map((item, idx) => {
                  const content = (
                    <div className="w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-[#040d24]/60 hover:bg-[#2563eb]/25 border border-transparent hover:border-blue-400/40 transition-all text-left group">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-400/25 text-blue-300 font-mono text-[10px]">
                            {item.category}
                          </span>
                          <span className="font-display font-bold text-sm text-white group-hover:text-blue-300 truncate">
                            {item.title}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs text-slate-400 truncate mt-1">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-blue-400 group-hover:translate-x-1 transition-transform">
                        {item.download ? (
                          <HiDownload className="w-4 h-4" />
                        ) : item.href ? (
                          <HiExternalLink className="w-4 h-4" />
                        ) : (
                          <HiArrowRight className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        download={item.download}
                        target={item.download ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="block"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        item.action?.();
                        onClose();
                      }}
                      className="w-full cursor-pointer"
                    >
                      {content}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 border-t border-blue-400/15 bg-[#010308] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <HiLightningBolt className="w-3.5 h-3.5 text-blue-400" />
                <span>Quick Navigation & Repository Search</span>
              </span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
