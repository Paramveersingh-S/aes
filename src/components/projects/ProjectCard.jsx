import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import { HiExternalLink, HiStar } from 'react-icons/hi';

const LANG_COLORS = {
  Python: '#38bdf8',
  CUDA: '#60a5fa',
  'C++': '#93c5fd',
  C: '#3b82f6',
  HCL: '#7dd3fc',
  TypeScript: '#2563eb',
  JavaScript: '#60a5fa',
  Go: '#38bdf8'
};

const ProjectCard = ({ repo, index = 0 }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const langColor = LANG_COLORS[repo.language] || '#60a5fa';

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      className="nichirin-card group rounded-2xl p-6 flex flex-col justify-between h-full"
    >
      <div>
        {/* Top Row: Highlight Metric Badge + Language */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono font-bold text-[10px] uppercase tracking-wider">
            {repo.badge || repo.category || 'SYSTEMS'}
          </span>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            {repo.language && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#030816] border border-blue-400/20 text-slate-200 text-[11px]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-0.5 text-sky-300">
                <HiStar className="w-3.5 h-3.5" />
                {repo.stargazers_count}
              </span>
            )}
          </div>
        </div>

        {/* Project Name */}
        <h3 className="font-display text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2 flex items-center justify-between">
          <span className="truncate">{repo.name.replace(/-/g, ' ')}</span>
          <span className="font-mono text-xs text-blue-400/30 group-hover:text-blue-400 transition-colors">
            #{String(index + 1).padStart(2, '0')}
          </span>
        </h3>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
          {repo.excerpt || repo.description}
        </p>

        {/* Telemetry Metric Pills */}
        {repo.metrics && repo.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {repo.metrics.map((metric, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-[#030816] border border-blue-400/15 text-[11px] font-mono text-slate-300"
              >
                {metric}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-blue-400/15 flex items-center gap-2.5">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="katana-btn flex-1 py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-[#2563eb] border border-blue-400/25 hover:border-blue-400 text-slate-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <FaGithub className="w-3.5 h-3.5" />
          <span>View Code</span>
        </a>

        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="katana-btn py-2 px-3.5 rounded-xl bg-blue-500/20 border border-blue-400/35 text-blue-300 hover:bg-[#2563eb] hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <span>Live Demo</span>
            <HiExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
