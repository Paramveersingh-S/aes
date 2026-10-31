import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      tech: 'Tech Stack',
      projects: 'Projects',
      writing: 'Articles',
      resume: 'Resume'
    },
    hero: {
      scroll: 'Scroll to Explore',
      greeting: 'Paramveer Singh',
      subtitle: 'Systems, Cloud & AI Infrastructure Engineer',
      exploreWorks: 'Explore Projects',
      viewDossier: 'View Resume'
    },
    about: {
      title: 'About Me',
      ossTitle: 'Open Source Contributions',
      prsMerged: 'Merged PRs across Global Organizations',
      viewAllGh: 'View All on GitHub',
      heatmapTitle: 'GitHub Activity & Daily Streak',
      heatmapSub: 'Daily commit streak, automated contribution snake, and yearly activity calendar.',
      compTitle: 'Achievements',
      expTitle: 'Experience',
      pubTitle: 'Publications'
    },
    tech: {
      title: 'Tech Stack',
      subtitle: 'Languages, GPU kernels, and cloud infrastructure used in production.'
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'High-throughput distributed systems, AWS Terraform architectures, and custom CUDA kernels.',
      viewAll: 'View All',
      ReposOnGh: 'Repositories on GitHub'
    },
    writing: {
      title: 'Technical Articles',
      subtitle: 'Deep technical breakdowns on multi-agent orchestration, GPU kernels, and AI systems.',
      readMore: 'Read Article',
      readAllSubstack: 'Read All on Substack'
    },
    resume: {
      title: 'Resume',
      download: 'Download PDF',
      openTab: 'Open in New Tab'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;
    for (const k of keys) {
      value = value ? value[k] : key;
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
