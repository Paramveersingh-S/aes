import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiDownload } from 'react-icons/hi';

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#tech' },
  { name: 'Projects', href: '#projects' },
  { name: 'Articles', href: '#writing' },
  { name: 'Resume', href: '#resume' }
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#02050d]/90 backdrop-blur-xl border-b border-blue-400/15 shadow-[0_8px_32px_rgba(0,0,0,0.9)] py-3'
          : 'bg-gradient-to-b from-[#010308]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <a
          href="#home"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <span className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-400/40 text-blue-400 font-mono font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-transform duration-300 group-hover:scale-105">
            PS
          </span>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              Paramveer Singh
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-slate-400 uppercase">
              Systems • Cloud • AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="katana-btn px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white border border-transparent hover:border-blue-400/35 bg-blue-500/[0.03] hover:bg-blue-500/[0.12]"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5">
          <a
            href="/resume/Paramveer_Singh_Resume.pdf"
            download="Paramveer_Singh_CV.pdf"
            className="hidden sm:inline-flex katana-btn px-4 py-2 rounded-lg bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-semibold text-xs uppercase tracking-wider items-center gap-1.5 shadow-[0_0_20px_rgba(37,99,235,0.45)]"
          >
            <HiDownload className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden katana-btn p-2 rounded-lg bg-[#050c1d] border border-blue-400/25 text-white"
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
            className="md:hidden bg-[#020611]/98 backdrop-blur-2xl border-b border-blue-400/15 px-6 py-5 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="katana-btn px-3 py-2.5 rounded-lg bg-blue-500/[0.06] border border-blue-400/15 text-xs font-mono uppercase tracking-wider text-slate-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
