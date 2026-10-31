import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { HiFire, HiLightningBolt } from 'react-icons/hi';

const NIGHT_BLUE_THEME = {
  dark: ['#050d20', '#0d2554', '#1d4ed8', '#3b82f6', '#7dd3fc']
};

const ContributionHeatmap = () => {
  return (
    <div className="my-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              ACTIVITY
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              DAILY STREAK & COMMIT TELEMETRY
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            GitHub Activity & Daily Streak
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Daily commit streak, contribution snake, and yearly activity calendar.
          </p>
        </div>
      </div>

      {/* Row 1: GitHub Daily Streak Widget + Contribution Snake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="nichirin-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <HiFire className="w-4 h-4 text-blue-400" />
              <span>GitHub Daily Streak</span>
            </span>
            <span className="font-mono text-[10px] text-blue-400">LIVE STATS</span>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#020611] border border-blue-400/15 p-2">
            <img
              src="https://streak-stats.demolab.com?user=Paramveersingh-S&theme=dark&hide_border=true&background=020611&ring=3B82F6&fire=60A5FA&currStreakLabel=60A5FA&sideLabels=94A3B8&currStreakNum=FFFFFF&sideNums=FFFFFF&dates=64748B"
              alt="Paramveer Singh GitHub Daily Streak"
              className="w-full max-w-[495px] h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="nichirin-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <HiLightningBolt className="w-4 h-4 text-sky-400" />
              <span>Contribution Snake</span>
            </span>
            <span className="font-mono text-[10px] text-sky-400">AUTOMATED WORKFLOW</span>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#020611] border border-blue-400/15 p-3 min-h-[165px]">
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
            theme={NIGHT_BLUE_THEME}
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
