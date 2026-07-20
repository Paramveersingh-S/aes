import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_resume: "Resume",
    nav_projects: "Projects",
    nav_articles: "Articles",
    nav_contact: "Contact",
    hero_view_work: "View Work",
    hero_read_articles: "Read Articles",
    about_title: "About Me",
    about_public_repos: "Public Repos",
    about_stars: "Stars Received",
    resume_download: "Download Resume",
    projects_title: "Projects & Repositories",
    articles_title: "Latest Articles",
    oss_title: "Open Source Contributions",
    footer_built_with: "Built with React & Vite."
  },
  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_resume: "CV",
    nav_projects: "Projets",
    nav_articles: "Articles",
    nav_contact: "Contact",
    hero_view_work: "Voir le travail",
    hero_read_articles: "Lire les articles",
    about_title: "À propos de moi",
    about_public_repos: "Dépôts publics",
    about_stars: "Étoiles reçues",
    resume_download: "Télécharger le CV",
    projects_title: "Projets et dépôts",
    articles_title: "Derniers articles",
    oss_title: "Contributions Open Source",
    footer_built_with: "Créé avec React et Vite."
  },
  de: {
    nav_home: "Startseite",
    nav_about: "Über mich",
    nav_resume: "Lebenslauf",
    nav_projects: "Projekte",
    nav_articles: "Artikel",
    nav_contact: "Kontakt",
    hero_view_work: "Arbeit ansehen",
    hero_read_articles: "Artikel lesen",
    about_title: "Über mich",
    about_public_repos: "Öffentliche Repos",
    about_stars: "Sterne erhalten",
    resume_download: "Lebenslauf herunterladen",
    projects_title: "Projekte & Repositories",
    articles_title: "Neueste Artikel",
    oss_title: "Open-Source-Beiträge",
    footer_built_with: "Erstellt mit React & Vite."
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
