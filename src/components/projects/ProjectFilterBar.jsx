import React from 'react';

const ProjectFilterBar = ({ filters, activeFilters, onToggleFilter }) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onToggleFilter('All')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeFilters.length === 0 
            ? 'bg-[var(--accent)] text-white' 
            : 'bg-white text-[var(--text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-off-white)]'
        }`}
      >
        All
      </button>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onToggleFilter(filter)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeFilters.includes(filter)
              ? 'bg-[var(--accent)] text-white'
              : 'bg-white text-[var(--text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-off-white)]'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilterBar;
