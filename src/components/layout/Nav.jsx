import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Resume', href: '#resume' },
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[var(--color-black)] shadow-md py-4 border-b border-[#2a2a2a]' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt="Paramveer Singh Logo" className="h-10 w-10 object-contain rounded-md" />
        </a>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a 
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-[var(--accent)]' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white hover:text-[var(--accent)] transition-colors p-2"
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

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-black)] border-b border-[#2a2a2a] absolute top-full left-0 w-full shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map(link => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-[var(--accent)]' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
