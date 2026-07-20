import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ResumeViewer = () => {
  const { t } = useLanguage();

  return (
    <div id="resume" className="mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-orange)]">
          {t('nav_resume')}
        </h3>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a 
            href="/resume/Paramveer_Singh_Resume.pdf" 
            download
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
          >
            {t('resume_download')}
          </a>
          <a 
            href="/resume/Paramveer_Singh_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-[var(--color-border)] text-[var(--text-primary)] px-5 py-2 rounded-md font-medium hover:bg-[var(--color-off-white)] transition-colors"
          >
            Open in new tab
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm h-[70vh] min-h-[500px]">
        <iframe 
          src="/resume/Paramveer_Singh_Resume.pdf" 
          title="Paramveer Singh Resume"
          className="w-full h-full"
          loading="lazy"
        >
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <p className="text-lg opacity-80 mb-4">Your browser doesn't support inline PDFs.</p>
            <a 
              href="/resume/Paramveer_Singh_Resume.pdf" 
              className="text-[var(--accent)] underline"
            >
              Click here to download it instead.
            </a>
          </div>
        </iframe>
      </div>
    </div>
  );
};

export default ResumeViewer;
