import React from 'react';
import { motion } from 'framer-motion';
import { HiBookOpen, HiExternalLink } from 'react-icons/hi';

const ArticleCard = ({ article, onSelect, index = 0 }) => {
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
          <div className="relative h-48 w-full overflow-hidden bg-[#020611] border-b border-blue-400/15">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-transparent to-transparent opacity-80" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#020611]/85 backdrop-blur-md border border-blue-400/35 text-blue-300 font-mono font-bold text-xs">
              ARTICLE #{String(index + 1).padStart(2, '0')}
            </span>
          </div>
        ) : (
          <div className="relative h-32 w-full bg-gradient-to-br from-[#0a1d42] to-[#020611] border-b border-blue-400/15 flex items-center justify-between px-6">
            <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/35 text-blue-300 font-mono font-bold text-xs">
              ARTICLE #{String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <span className="text-blue-400 uppercase">ML BLUEPRINTS • SUBSTACK</span>
            <span>{formattedDate}</span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>

          {article.subtitle && (
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
              {article.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-blue-400/15 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(article);
          }}
          className="katana-btn flex-1 py-2 px-3 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-300 group-hover:bg-[#2563eb] group-hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <HiBookOpen className="w-4 h-4" />
          <span>Read Article</span>
        </button>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="Open on Substack"
          className="katana-btn p-2 rounded-xl bg-blue-500/10 border border-blue-400/20 hover:border-blue-400 text-slate-300 hover:text-white"
        >
          <HiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
