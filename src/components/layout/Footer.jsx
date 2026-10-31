import React from 'react';
import SocialLinks from '../about/SocialLinks';
import BrandLogo from './BrandLogo';
import { HiArrowUp } from 'react-icons/hi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-14 bg-[#010308] border-t border-blue-400/15 overflow-hidden">
      <div className="katana-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Custom Logo + Identity */}
        <div className="flex items-center gap-4">
          <BrandLogo className="w-11 h-11" />
          <div>
            <p className="font-display text-white font-bold tracking-tight text-base">
              Paramveer Singh
            </p>
            <p className="font-mono text-xs text-slate-400">
              Systems, Cloud & AI Infrastructure Engineer
            </p>
          </div>
        </div>

        {/* Center: Social Links */}
        <SocialLinks />

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="katana-btn px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-400/25 hover:border-blue-400 text-xs font-mono uppercase tracking-widest text-slate-200 flex items-center gap-2 cursor-pointer"
        >
          <span>Back to Top</span>
          <HiArrowUp className="w-4 h-4 text-blue-400" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
