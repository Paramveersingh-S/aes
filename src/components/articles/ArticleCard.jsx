import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiBookOpen, HiExternalLink } from 'react-icons/hi';

const ArticleCard = ({ article, onSelect, index = 0 }) => {
  const { t } = useLanguage();

  const formattedDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(article)}
      className="nichirin-card group rounded-2xl overflow-hidden flex flex-col justify-between h-full cursor-pointer"
    >
      <div>
        {article.coverImage ? (
          <div className="relative h-48 w-full overflow-hidden bg-[#06060b] border-b border-white/10">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060b] via-transparent to-transparent opacity-80" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              巻物 零{index + 1}
            </span>
          </div>
        ) : (
          <div className="relative h-32 w-full bg-gradient-to-br from-[#0e0e1a] to-[#050508] border-b border-white/10 flex items-center justify-between px-6">
            <span className="px-2.5 py-1 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              巻物 零{index + 1}
            </span>
            <span className="font-jp text-4xl font-black text-white/5">論考</span>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
            <span className="text-[var(--accent-secondary)] uppercase">ML BLUEPRINTS // SUBSTACK</span>
            <span>{formattedDate}</span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>

          {article.subtitle && (
            <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
              {article.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(article);
          }}
          className="katana-btn flex-1 py-2 px-3 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <HiBookOpen className="w-4 h-4" />
          <span>{t('writing.readMore')}</span>
        </button>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="Open on Substack"
          className="katana-btn p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[var(--accent)] text-gray-300 hover:text-white"
        >
          <HiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
