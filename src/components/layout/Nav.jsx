import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'resume', 'projects', 'articles'];
      let current = '';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 150)) {
          current = section;
        }
      }
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_home'), href: '#home', id: 'home' },
    { name: t('nav_about'), href: '#about', id: 'about' },
    { name: t('nav_resume'), href: '#resume', id: 'resume' },
    { name: t('nav_projects'), href: '#projects', id: 'projects' },
    { name: t('nav_articles'), href: '#articles', id: 'articles' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[var(--bg-inverted)] shadow-md py-4 border-b border-[var(--color-border)]' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 outline-none">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain rounded-md" />
        </a>
        
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-[var(--accent)]' 
                    : 'text-[var(--text-inverted)] hover:opacity-70'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          
          <div className="flex items-center space-x-4 ml-4 border-l border-[var(--color-border)] pl-4">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[var(--text-inverted)] text-sm font-medium outline-none cursor-pointer"
            >
              <option value="en" className="text-[var(--text-primary)]">EN</option>
              <option value="de" className="text-[var(--text-primary)]">DE</option>
              <option value="fr" className="text-[var(--text-primary)]">FR</option>
            </select>
            
            <button 
              onClick={toggleTheme} 
              className="text-[var(--text-inverted)] hover:text-[var(--accent)] transition-colors p-1"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="text-[var(--text-inverted)] hover:text-[var(--accent)] transition-colors p-1"
          >
            {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          <button 
            className="text-[var(--text-inverted)] hover:text-[var(--accent)] transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-inverted)] border-b border-[var(--color-border)] absolute top-full left-0 w-full shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <a 
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-[var(--accent)]' 
                      : 'text-[var(--text-inverted)] hover:opacity-70'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-2 border-t border-[var(--color-border)]">
              <select 
                value={lang} 
                onChange={(e) => {
                  setLang(e.target.value);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-transparent text-[var(--text-inverted)] text-base font-medium outline-none cursor-pointer w-full"
              >
                <option value="en" className="text-[var(--text-primary)]">English (EN)</option>
                <option value="de" className="text-[var(--text-primary)]">Deutsch (DE)</option>
                <option value="fr" className="text-[var(--text-primary)]">Français (FR)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
