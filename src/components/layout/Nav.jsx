import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { breathingStyle, setBreathingStyle, currentStyleObj, breathingStyles } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), kanji: '壱', href: '#home' },
    { name: t('nav.about'), kanji: '弐', href: '#about' },
    { name: t('nav.tech'), kanji: '参', href: '#tech' },
    { name: t('nav.projects'), kanji: '肆', href: '#projects' },
    { name: t('nav.writing'), kanji: '伍', href: '#writing' },
    { name: t('nav.resume'), kanji: '陸', href: '#resume' }
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日本語' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' }
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030306]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.85)] py-3'
          : 'bg-gradient-to-b from-[#020204]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Identity + Japanese Hanko Seal */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <span className="hanko-seal w-9 h-9 rounded-md text-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            滅
          </span>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-[var(--accent)] transition-colors">
              PARAMVEER SINGH
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-gray-400 uppercase">
              全集中 // SYSTEMS HASHIRA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="katana-btn px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white border border-transparent hover:border-[var(--accent-border)] bg-white/[0.02] hover:bg-white/[0.06] flex items-center gap-1.5"
            >
              <span className="text-[var(--accent)] font-jp font-bold text-xs">{item.kanji}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Controls: Breathing Style Selector + Language Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Breathing Style Pills */}
          <div className="hidden sm:flex items-center bg-[#090910] border border-white/10 rounded-full p-1 gap-1">
            {breathingStyles.map((style) => {
              const active = breathingStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setBreathingStyle(style.id)}
                  title={`${style.name} (${style.kanji})`}
                  className={`katana-btn px-2.5 py-1 rounded-full text-[11px] font-jp font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-[var(--accent)] text-black shadow-[0_0_14px_var(--accent-glow)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: active ? '#000' : style.color }}
                  />
                  <span>{style.kanji}</span>
                </button>
              );
            })}
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-[#090910] border border-white/10 rounded-lg p-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`katana-btn px-2 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
                  language === lang.code
                    ? 'bg-[var(--accent)] text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden katana-btn p-2 rounded-lg bg-[#090910] border border-white/15 text-white"
          >
            {mobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050509]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-5 space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="katana-btn px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-200 flex items-center gap-2"
                >
                  <span className="text-[var(--accent)] font-jp font-bold">{item.kanji}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-gray-400 uppercase">Breathing Form:</span>
              <div className="flex flex-wrap gap-1.5">
                {breathingStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setBreathingStyle(style.id)}
                    className={`katana-btn px-2.5 py-1 rounded-full text-xs font-jp font-bold ${
                      breathingStyle === style.id
                        ? 'bg-[var(--accent)] text-black'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    {style.kanji}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
