import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutMe = () => {
  const { t } = useLanguage();

  return (
    <div id="about" className="relative -mt-16 md:-mt-32 z-10 flex flex-col md:flex-row gap-8">
      {/* Left Column: Avatar & Profile Info */}
      <div className="w-full md:w-1/3">
        <div className="bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--color-border)] shadow-sm text-center relative">
          <img 
            src="https://avatars.githubusercontent.com/u/155875516?v=4" 
            alt="Paramveer Singh" 
            className="w-32 h-32 md:w-36 md:h-36 rounded-2xl mx-auto -mt-16 md:-mt-20 border-4 border-[var(--bg-primary)] shadow-md object-cover bg-[var(--bg-primary)]"
          />
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-4">Paramveer Singh</h1>
          <p className="opacity-70 text-sm mt-1 mb-6">{t('hero_role')}</p>
          
          <div className="w-full grid grid-cols-2 gap-4 text-center mb-6">
            <div className="bg-[var(--color-off-white)] p-3 rounded-lg border border-[var(--color-border)]">
              <p className="text-xl font-bold text-[var(--accent)]">63+</p>
              <p className="text-xs font-medium opacity-80">{t('about_public_repos')}</p>
            </div>
            <div className="bg-[var(--color-off-white)] p-3 rounded-lg border border-[var(--color-border)]">
              <p className="text-xl font-bold text-[var(--accent)]">50+</p>
              <p className="text-xs font-medium opacity-80">{t('about_stars')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Bio */}
      <div className="w-full md:w-2/3 flex flex-col justify-center pt-4 md:pt-0">
        <h2 className="text-lg md:text-xl font-bold mb-6 text-white bg-[var(--accent)] px-4 py-2 inline-block w-max rounded-md shadow-sm">
          Engineer / AI Researcher. I love building and scaling things.
        </h2>
        
        <ul className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--text-primary)]">
          <li className="flex items-start">
            <span className="text-[var(--accent)] mr-3 mt-1.5">•</span>
            <span>{t('hero_greeting')} Paramveer. I have a deep passion for building high-performance architectures, focusing on GPU-accelerated infrastructure and stateful multi-agent systems.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--accent)] mr-3 mt-1.5">•</span>
            <span>I strive to bridge the gap between frontier AI research and highly scalable, production-grade engineering.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[var(--accent)] mr-3 mt-1.5">•</span>
            <span>{t('about_currently')} <strong className="font-semibold text-[var(--color-orange)]">Scalable Full-Stack Architectures & Deep Tech Solutions</strong>.</span>
          </li>
        </ul>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <a 
            href="/resume/Paramveer_Singh_Resume.pdf" 
            target="_blank"
            className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-2.5 rounded-md font-medium hover:opacity-80 transition-opacity flex items-center shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {t('resume_download')}
          </a>
          <a 
            href="https://github.com/Paramveersingh-S" 
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--color-border)] bg-[var(--color-off-white)] text-[var(--text-primary)] px-6 py-2.5 rounded-md font-medium hover:bg-[var(--color-border)] transition-colors flex items-center shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
