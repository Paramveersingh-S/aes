import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { HiExternalLink, HiStar, HiChip } from 'react-icons/hi';

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

const ProjectCard = ({ repo, index = 0, onInspect }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const rotateY = ((x / rect.width) - 0.5) * 9;
    const rotateX = ((y / rect.height) - 0.5) * -9;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const langColor = LANG_COLORS[repo.language] || '#60a5fa';

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

        {/* Animated SVG Data-Flow Pipeline Pulse */}
        <div className="mb-4 px-3 py-2 rounded-xl bg-[#020611]/90 border border-blue-400/15">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>INGEST</span>
            <span className="text-blue-400">{repo.language || 'CORE'} ENGINE</span>
            <span>TELEMETRY</span>
          </div>
          <svg viewBox="0 0 240 10" className="w-full h-2.5 overflow-visible">
            <line
              x1="4"
              y1="5"
              x2="236"
              y2="5"
              stroke="rgba(59, 130, 246, 0.25)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle cx="4" cy="5" r="3" fill="#3b82f6" />
            <circle cx="120" cy="5" r="3" fill="#60a5fa" />
            <circle cx="236" cy="5" r="3" fill="#93c5fd" />
            <circle r="3.5" cy="5" fill="#ffffff">
              <animate
                attributeName="cx"
                values="4;236;4"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

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
      <div className="pt-4 border-t border-blue-400/15 flex items-center gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="katana-btn flex-1 py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-[#2563eb] border border-blue-400/25 hover:border-blue-400 text-slate-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          <FaGithub className="w-3.5 h-3.5" />
          <span>Code</span>
        </a>

        {onInspect && (
          <button
            type="button"
            onClick={() => onInspect(repo)}
            className="katana-btn py-2 px-3 rounded-xl bg-[#040c20] hover:bg-blue-500/25 border border-blue-400/25 hover:border-blue-400 text-blue-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HiChip className="w-3.5 h-3.5" />
            <span>Specs</span>
          </button>
        )}

        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="katana-btn py-2 px-3 rounded-xl bg-blue-500/20 border border-blue-400/35 text-blue-300 hover:bg-[#2563eb] hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1"
          >
            <span>Live</span>
            <HiExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
