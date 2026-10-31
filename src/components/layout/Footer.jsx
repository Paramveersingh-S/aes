import React from 'react';
import SocialLinks from '../about/SocialLinks';
import { HiArrowUp } from 'react-icons/hi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-14 bg-[#020204] border-t border-white/10 overflow-hidden">
      <div className="katana-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Seal + Signature */}
        <div className="flex items-center gap-4">
          <div className="hanko-seal w-11 h-11 rounded-lg text-lg">
            鬼滅
          </div>
          <div>
            <p className="font-display text-white font-bold tracking-wider text-base">
              PARAMVEER SINGH // パラムヴィール
            </p>
            <p className="font-mono text-xs text-gray-400">
              Forged in Night Obsidian • Total Concentration Constant (全集中・常中)
            </p>
          </div>
        </div>

        {/* Center: Social Links */}
        <SocialLinks />

        {/* Right: Back to Top Katana Button */}
        <button
          onClick={scrollToTop}
          className="katana-btn px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 hover:border-[var(--accent)] text-xs font-mono uppercase tracking-widest text-gray-200 flex items-center gap-2 cursor-pointer"
        >
          <span>ASCEND // 昇</span>
          <HiArrowUp className="w-4 h-4 text-[var(--accent)]" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
