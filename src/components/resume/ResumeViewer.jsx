import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiDownload, HiExternalLink } from 'react-icons/hi';

const ResumeViewer = () => {
  const resumeUrl = '/resume/Paramveer_Singh_Resume.pdf';
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              陸ノ型
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
              OFFICIAL CORPS DOSSIER // 履歴書
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('resume.title')}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            download="Paramveer_Singh_CV.pdf"
            className="katana-btn px-6 py-3 rounded-xl bg-[var(--accent)] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_24px_var(--accent-glow)]"
          >
            <HiDownload className="w-4 h-4" />
            <span>{t('resume.download')}</span>
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="katana-btn px-6 py-3 rounded-xl bg-[#090912] border border-white/15 hover:border-[var(--accent)] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span>{t('resume.openTab')}</span>
            <HiExternalLink className="w-4 h-4 text-[var(--accent)]" />
          </a>
        </div>
      </div>

      <div className="nichirin-card w-full h-[780px] rounded-2xl p-2 sm:p-3 overflow-hidden shadow-2xl">
        <iframe
          src={`${resumeUrl}#toolbar=0`}
          title="Paramveer Singh Resume"
          className="w-full h-full rounded-xl border border-white/10 bg-[#0a0a10]"
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
