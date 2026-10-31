import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import articlesData from '../../data/articles.json';
import ArticleCard from './ArticleCard';
import { HiX, HiExternalLink } from 'react-icons/hi';
import { SiSubstack } from 'react-icons/si';

const ArticleGrid = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

  const displayArticles = articlesData.filter(
    (a) => a.title && (!a.title.includes('Audio format') || a.coverImage)
  );

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              04
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              SUBSTACK PUBLICATIONS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical Articles
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Deep technical breakdowns on multi-agent orchestration, GPU kernels, and AI systems.
          </p>
        </div>

        <a
          href="https://mlblueprints.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="katana-btn px-5 py-3 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start md:self-auto shadow-[0_0_24px_rgba(37,99,235,0.5)]"
        >
          <SiSubstack className="w-4 h-4" />
          <span>Read All on Substack</span>
          <HiExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article, index) => (
          <ArticleCard
            key={index}
            index={index}
            article={article}
            onSelect={setSelectedArticle}
          />
        ))}
      </div>

      {/* Night-Sky Modal Reader */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#030919] border border-blue-400/25 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-blue-400/15 bg-[#02050d]">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-300 font-mono font-bold text-xs">
                    ARTICLE READER
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {new Date(selectedArticle.pubDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="katana-btn px-3 py-1.5 rounded-lg bg-[#2563eb] text-white font-mono font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Open on Substack</span>
                    <HiExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="katana-btn p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 text-slate-300 hover:text-white cursor-pointer"
                    aria-label="Close modal"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-10 overflow-y-auto">
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
                  {selectedArticle.title}
                </h2>
                {selectedArticle.subtitle && (
                  <p className="text-base sm:text-lg text-slate-300 mb-8 pb-6 border-b border-blue-400/15">
                    {selectedArticle.subtitle}
                  </p>
                )}

                <div
                  className="substack-dark-prose"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.contentHtml }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleGrid;
