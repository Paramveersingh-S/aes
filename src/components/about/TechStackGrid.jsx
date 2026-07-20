import React, { useEffect, useState } from 'react';
import * as SiIcons from 'react-icons/si';
import * as DiIcons from 'react-icons/di';
import { motion } from 'framer-motion';

const getIcon = (slug) => {
  // Try Simple Icons first, fallback to Devicons
  const formattedSlug = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  
  // Custom mapping for edge cases
  if (slug === 'cplusplus') return SiIcons['SiCplusplus'] || DiIcons['DiCplusplus'];
  if (slug === 'espressif') return SiIcons['SiEspressif'] || SiIcons['SiArduino'];
  if (slug === 'googlecolab') return SiIcons['SiGooglecolab'];
  if (slug === 'googlecloud') return SiIcons['SiGooglecloud'];

  return SiIcons[`Si${formattedSlug}`] || DiIcons[`Di${formattedSlug}`] || SiIcons['SiCodeigniter'];
};

const TechStackGrid = () => {
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    import('../../data/techstack.json')
      .then((data) => setTechStack(data.default))
      .catch((err) => console.error("Failed to load techstack.json", err));
  }, []);

  if (!techStack || techStack.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-[var(--color-orange)] text-center">
        Tech Stack
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6">
        {techStack.map((tech, idx) => {
          const Icon = getIcon(tech.slug);
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {Icon && <Icon />}
              </div>
              <span className="text-xs font-medium text-center">{tech.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStackGrid;
