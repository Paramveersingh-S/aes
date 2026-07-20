import React, { useEffect, useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilterBar from './ProjectFilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const ALLOWED_REPOS = [
  'Flash-Atten2-MMA', 
  'Triton-MLOps', 
  'Custom-HGEMM', 
  'GateKeeper', 
  'microgpt', 
  'Semantic-search-RAG'
];

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    import('../../data/repos.json')
      .then((data) => {
        const filtered = data.default.filter(repo => ALLOWED_REPOS.includes(repo.name));
        setProjects(filtered);
      })
      .catch((err) => console.error("Failed to load repos.json", err));
  }, []);

  const filters = useMemo(() => {
    const allFilters = new Set();
    projects.forEach(p => {
      if (p.language) allFilters.add(p.language);
      if (p.topics) p.topics.forEach(t => allFilters.add(t));
    });
    // keep only top filters or just first few to not clutter
    return Array.from(allFilters).slice(0, 15);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects;
    
    return projects.filter(p => {
      const matchLang = activeFilters.includes(p.language);
      const matchTopic = p.topics?.some(t => activeFilters.includes(t));
      return matchLang || matchTopic;
    });
  }, [projects, activeFilters]);

  const toggleFilter = (filter) => {
    if (filter === 'All') {
      setActiveFilters([]);
      return;
    }
    
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  if (projects.length === 0) return null;

  return (
    <div id="projects" className="mt-20">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-orange)] mb-4">
          {t('projects_title')}
        </h3>
        <p className="opacity-80 text-lg max-w-2xl mx-auto">
          {t('projects_desc')}
        </p>
      </div>

      <ProjectFilterBar 
        filters={filters} 
        activeFilters={activeFilters} 
        onToggleFilter={toggleFilter} 
      />

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-[var(--color-border)]">
          <p className="text-lg opacity-70">No projects match the selected filters.</p>
          <button 
            onClick={() => setActiveFilters([])}
            className="mt-4 text-[var(--accent)] hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
