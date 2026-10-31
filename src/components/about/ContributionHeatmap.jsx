import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { HiFire, HiLightningBolt } from 'react-icons/hi';

const COLOR_SCHEMES = {
  hinokami: ['#0d0d14', '#4c1122', '#881337', '#e11d48', '#ff2a54'],
  water: ['#0d0d14', '#0c4a6e', '#0284c7', '#38bdf8', '#00f0ff'],
  thunder: ['#0d0d14', '#422006', '#a16207', '#eab308', '#facc15'],
  moon: ['#0d0d14', '#3b0764', '#6b21a8', '#9333ea', '#c084fc']
};

const ContributionHeatmap = () => {
  const { t } = useLanguage();
  const { breathingStyle } = useTheme();

  const customTheme = {
    dark: COLOR_SCHEMES[breathingStyle] || COLOR_SCHEMES.hinokami
  };

  return (
    <div className="my-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              鍛錬
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
              DAILY STREAK & COMMIT TELEMETRY
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
            {t('about.heatmapTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {t('about.heatmapSub')}
          </p>
        </div>
      </div>

      {/* Row 1: GitHub Daily Streak Widget + GitHub Stats Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="nichirin-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
              <HiFire className="w-4 h-4 text-[var(--accent)]" />
              <span>DAILY STREAK // 連続記録</span>
            </span>
            <span className="font-mono text-[10px] text-[var(--accent)]">LIVE GITHUB TELEMETRY</span>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#06060b] border border-white/5 p-2">
            <img
              src="https://streak-stats.demolab.com?user=Paramveersingh-S&theme=dark&hide_border=true&background=06060B&ring=FF2A54&fire=F59E0B&currStreakLabel=FF2A54&sideLabels=9CA3AF&currStreakNum=FFFFFF&sideNums=FFFFFF&dates=64748B"
              alt="Paramveer Singh GitHub Daily Streak"
              className="w-full max-w-[495px] h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="nichirin-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
              <HiLightningBolt className="w-4 h-4 text-[var(--accent-secondary)]" />
              <span>CONTRIBUTION SNAKE // 昇龍</span>
            </span>
            <span className="font-mono text-[10px] text-[var(--accent-secondary)]">AUTOMATED ACTION</span>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#06060b] border border-white/5 p-3 min-h-[165px]">
            <img
              src="https://raw.githubusercontent.com/Paramveersingh-S/Paramveersingh-S/output/github-contribution-grid-snake.svg"
              alt="GitHub Contribution Snake"
              className="w-full h-auto object-contain filter invert hue-rotate-180 contrast-125"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Row 2: Interactive GitHub Calendar Heatmap */}
      <div className="nichirin-card rounded-2xl p-6 overflow-x-auto">
        <div className="min-w-[720px] flex justify-center">
          <GitHubCalendar
            username="Paramveersingh-S"
            colorScheme="dark"
            theme={customTheme}
            fontSize={12}
            blockSize={13}
            blockMargin={4}
            blockRadius={3}
          />
        </div>
      </div>
    </div>
  );
};

export default ContributionHeatmap;
