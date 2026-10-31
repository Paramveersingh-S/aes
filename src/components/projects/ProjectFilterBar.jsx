import React from 'react';

const ProjectFilterBar = ({ filters, activeFilter, onSelectFilter }) => {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelectFilter('All')}
        className={`katana-btn px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer ${
          activeFilter === 'All'
            ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.45)]'
            : 'bg-[#040b1d] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
        }`}
      >
        All Projects
      </button>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelectFilter(filter)}
          className={`katana-btn px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer ${
            activeFilter === filter
              ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.45)]'
              : 'bg-[#040b1d] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilterBar;
