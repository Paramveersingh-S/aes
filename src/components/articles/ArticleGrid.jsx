import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import articlesData from '../../data/articles.json';
import ArticleCard from './ArticleCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiX, HiExternalLink } from 'react-icons/hi';
import { SiSubstack } from 'react-icons/si';

const ArticleGrid = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { t } = useLanguage();

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

  // Filter out empty audio-only stub posts if they lack excerpt/coverImage, or keep all valid articles
  const displayArticles = articlesData.filter(
    (a) => a.title && (!a.title.includes('Audio format') || a.coverImage)
  );

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              伍ノ型
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
              SACRED SCROLLS // 技術論考
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('writing.title')}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            {t('writing.subtitle')}
          </p>
        </div>

        <a
          href="https://mlblueprints.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="katana-btn px-5 py-3 rounded-xl bg-[var(--accent)] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start md:self-auto shadow-[0_0_24px_var(--accent-glow)]"
        >
          <SiSubstack className="w-4 h-4" />
          <span>{t('writing.readAllSubstack')}</span>
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

      {/* Night-Black Obsidian Modal Reader */}
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
              className="bg-[#07070d] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#040408]">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
                    巻物閲覧
                  </span>
                  <span className="font-mono text-xs text-gray-400">
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
                    className="katana-btn px-3 py-1.5 rounded-lg bg-[var(--accent)] text-black font-mono font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>Substack</span>
                    <HiExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="katana-btn p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
                    aria-label="Close modal"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-10 overflow-y-auto">
                <h2 className="font-display text-2xl sm:text-4xl font-black text-white mb-3 leading-tight">
                  {selectedArticle.title}
                </h2>
                {selectedArticle.subtitle && (
                  <p className="text-base sm:text-lg text-gray-400 mb-8 pb-6 border-b border-white/10">
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
