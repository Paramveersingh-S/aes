import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_resume: "Resume",
    nav_projects: "Projects",
    nav_articles: "Articles",
    hero_view_work: "View Work",
    hero_read_articles: "Read Articles",
    hero_greeting: "Hi, I'm",
    hero_role: "Machine Learning & Backend Engineer.",
    about_title: "About Me",
    about_public_repos: "Public Repos",
    about_stars: "Stars Received",
    about_currently: "Currently focused on:",
    about_tech_stack: "Tech Stack",
    about_achievements: "Achievements & Publications",
    about_competitions: "Competitions & Recognition",
    about_research: "Research & Academia",
    about_internships: "Internships",
    oss_title: "Open Source Contributions",
    oss_merged: "Merged PRs",
    oss_heatmap: "Activity Heatmap",
    projects_title: "Projects & Repositories",
    projects_desc: "A selection of my open-source work, featured repositories, and personal projects.",
    articles_title: "Latest Articles",
    resume_download: "Download Resume",
    footer_built_with: "Built with React & Vite."
  },
  fr: {
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_resume: "CV",
    nav_projects: "Projets",
    nav_articles: "Articles",
    hero_view_work: "Voir le travail",
    hero_read_articles: "Lire les articles",
    hero_greeting: "Salut, je suis",
    hero_role: "Ingénieur Backend & Machine Learning.",
    about_title: "À propos de moi",
    about_public_repos: "Dépôts publics",
    about_stars: "Étoiles reçues",
    about_currently: "Actuellement concentré sur:",
    about_tech_stack: "Pile technologique",
    about_achievements: "Réalisations et publications",
    about_competitions: "Compétitions et reconnaissances",
    about_research: "Recherche et monde universitaire",
    about_internships: "Stages",
    oss_title: "Contributions Open Source",
    oss_merged: "PR fusionnées",
    oss_heatmap: "Carte d'activité",
    projects_title: "Projets et dépôts",
    projects_desc: "Une sélection de mes travaux open source, dépôts en vedette et projets personnels.",
    articles_title: "Derniers articles",
    resume_download: "Télécharger le CV",
    footer_built_with: "Créé avec React et Vite."
  },
  de: {
    nav_home: "Startseite",
    nav_about: "Über mich",
    nav_resume: "Lebenslauf",
    nav_projects: "Projekte",
    nav_articles: "Artikel",
    hero_view_work: "Arbeit ansehen",
    hero_read_articles: "Artikel lesen",
    hero_greeting: "Hallo, ich bin",
    hero_role: "Machine Learning & Backend Engineer.",
    about_title: "Über mich",
    about_public_repos: "Öffentliche Repos",
    about_stars: "Sterne erhalten",
    about_currently: "Derzeit konzentriert auf:",
    about_tech_stack: "Technologie-Stack",
    about_achievements: "Leistungen und Veröffentlichungen",
    about_competitions: "Wettbewerbe und Anerkennungen",
    about_research: "Forschung & Wissenschaft",
    about_internships: "Praktika",
    oss_title: "Open-Source-Beiträge",
    oss_merged: "Zusammengeführte PRs",
    oss_heatmap: "Aktivitäts-Heatmap",
    projects_title: "Projekte & Repositories",
    projects_desc: "Eine Auswahl meiner Open-Source-Arbeit, vorgestellte Repositories und persönliche Projekte.",
    articles_title: "Neueste Artikel",
    resume_download: "Lebenslauf herunterladen",
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
