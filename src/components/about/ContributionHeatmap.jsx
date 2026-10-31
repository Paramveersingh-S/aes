import React, { useEffect, useState, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { HiFire, HiLightningBolt } from 'react-icons/hi';

const NIGHT_BLUE_THEME = {
  dark: ['#050d20', '#0d2554', '#1d4ed8', '#3b82f6', '#7dd3fc']
};

const COLS = 28;
const ROWS = 7;

// Live Interactive Contribution Snake Canvas/SVG that never 404s
const LiveContributionSnake = () => {
  // Generate a deterministic serpentine path across the 28x7 grid
  const path = useMemo(() => {
    const pts = [];
    for (let c = 0; c < COLS; c++) {
      if (c % 2 === 0) {
        for (let r = 0; r < ROWS; r++) pts.push({ c, r });
      } else {
        for (let r = ROWS - 1; r >= 0; r--) pts.push({ c, r });
      }
    }
    return pts;
  }, []);

  // Deterministic contribution intensity per cell
  const initialGrid = useMemo(() => {
    return Array.from({ length: COLS * ROWS }, (_, idx) => {
      const hash = (idx * 37 + 13) % 100;
      if (hash > 78) return 4;
      if (hash > 55) return 3;
      if (hash > 32) return 2;
      if (hash > 15) return 1;
      return 0;
    });
  }, []);

  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % path.length);
    }, 65);
    return () => clearInterval(interval);
  }, [path.length]);

  const snakeLength = 14;
  const snakeCells = new Map();
  for (let i = 0; i < snakeLength; i++) {
    const idx = (step - i + path.length) % path.length;
    const pt = path[idx];
    snakeCells.set(`${pt.c},${pt.r}`, i); // 0 = head
  }

  // Cells already visited in the current cycle look eaten/dimmed until reset
  const visitedSet = new Set();
  for (let i = snakeLength; i <= step; i++) {
    const pt = path[i];
    visitedSet.add(`${pt.c},${pt.r}`);
  }

  const levelColors = ['#061024', '#0d2554', '#1d4ed8', '#3b82f6', '#7dd3fc'];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg
        viewBox={`0 0 ${COLS * 14 + 8} ${ROWS * 14 + 8}`}
        className="w-full h-auto max-h-[155px]"
        role="img"
        aria-label="Animated GitHub Contribution Snake"
      >
        {Array.from({ length: COLS }).map((_, c) =>
          Array.from({ length: ROWS }).map((__, r) => {
            const key = `${c},${r}`;
            const snakePos = snakeCells.get(key);
            const isSnake = snakePos !== undefined;
            const isVisited = visitedSet.has(key);
            const cellLevel = initialGrid[c * ROWS + r];

            let fill = isVisited ? '#050d20' : levelColors[cellLevel];
            let rx = 2.5;

            if (isSnake) {
              if (snakePos === 0) {
                fill = '#ffffff'; // Glowing white-blue head
              } else if (snakePos < 4) {
                fill = '#7dd3fc';
              } else if (snakePos < 9) {
                fill = '#3b82f6';
              } else {
                fill = '#1d4ed8';
              }
            }

            return (
              <rect
                key={key}
                x={c * 14 + 4}
                y={r * 14 + 4}
                width={11}
                height={11}
                rx={rx}
                fill={fill}
                style={
                  isSnake && snakePos === 0
                    ? { filter: 'drop-shadow(0 0 6px #60a5fa)' }
                    : undefined
                }
              />
            );
          })
        )}
      </svg>
      <div className="w-full flex items-center justify-between px-2 mt-2 text-[11px] font-mono text-slate-400">
        <span>Paramveersingh-S • Contribution Grid</span>
        <span className="text-blue-400">Active Snake Simulation</span>
      </div>
    </div>
  );
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

      {/* Row 1: GitHub Daily Streak Widget + Live Contribution Snake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="nichirin-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <HiFire className="w-4 h-4 text-blue-400" />
              <span>GitHub Daily Streak</span>
            </span>
            <span className="font-mono text-[10px] text-blue-400">LIVE STATS</span>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#020611] border border-blue-400/15 p-2 min-h-[175px]">
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
            <span className="font-mono text-[10px] text-sky-400">LIVE ANIMATION</span>
          </div>
          <div className="w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#020611] border border-blue-400/15 p-4 min-h-[175px]">
            <LiveContributionSnake />
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
