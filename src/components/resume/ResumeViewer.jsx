import React from 'react';
import { HiDownload, HiExternalLink } from 'react-icons/hi';

const ResumeViewer = () => {
  const resumeUrl = '/resume/Paramveer_Singh_Resume.pdf';

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              05
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              CURRICULUM VITAE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Resume
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            download="Paramveer_Singh_CV.pdf"
            className="katana-btn px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_24px_rgba(37,99,235,0.5)]"
          >
            <HiDownload className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="katana-btn px-6 py-3 rounded-xl bg-[#040b1d] border border-blue-400/25 hover:border-blue-400 text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span>Open in New Tab</span>
            <HiExternalLink className="w-4 h-4 text-blue-400" />
          </a>
        </div>
      </div>

      <div className="nichirin-card w-full h-[780px] rounded-2xl p-2 sm:p-3 overflow-hidden shadow-2xl">
        <iframe
          src={`${resumeUrl}#toolbar=0`}
          title="Paramveer Singh Resume"
          className="w-full h-full rounded-xl border border-blue-400/15 bg-[#020611]"
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
