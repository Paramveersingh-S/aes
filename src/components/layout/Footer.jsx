import React from 'react';
import SocialLinks from '../about/SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-black)] text-white py-12 border-t border-[#2a2a2a]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <h2 className="font-display font-bold text-2xl mb-2">Paramveer Singh</h2>
        <p className="opacity-70 text-sm mb-8 font-sans">
          Machine Learning | Embedded Software | Cyber Security | Kernel Programming
        </p>
        
        <SocialLinks className="mb-8" />
        
        <div className="border-t border-[#2a2a2a] w-full pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50">
          <p>© {currentYear} Paramveer Singh. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built by Paramveer Singh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
