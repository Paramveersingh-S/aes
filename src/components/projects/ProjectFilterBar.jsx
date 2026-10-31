import React from 'react';

const ProjectFilterBar = ({ filters, activeFilter, onSelectFilter }) => {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelectFilter('All')}
        className={`katana-btn px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer ${
          activeFilter === 'All'
            ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_20px_var(--accent-glow)]'
            : 'bg-[#090912] text-gray-300 border border-white/10 hover:border-[var(--accent-border)]'
        }`}
      >
        ALL TECHNIQUES // 全て
      </button>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelectFilter(filter)}
          className={`katana-btn px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer ${
            activeFilter === filter
              ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_20px_var(--accent-glow)]'
              : 'bg-[#090912] text-gray-300 border border-white/10 hover:border-[var(--accent-border)]'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilterBar;
