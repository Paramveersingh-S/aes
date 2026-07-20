import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimeScene = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const moonY = useTransform(scrollY, [0, 500], [0, 100]);
  const mountainsMidY = useTransform(scrollY, [0, 500], [0, 50]);
  const foregroundY = useTransform(scrollY, [0, 500], [0, -20]);

  // Generate stars
  const stars = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        id: i,
        cx: Math.random() * 100,
        cy: Math.random() * 60, // Top 60% of the screen
        r: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 5
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-black)] pointer-events-none -z-10">
      <svg
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-black)" />
            <stop offset="100%" stopColor="#3A1C0A" />
          </linearGradient>
          
          <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-white)" />
            <stop offset="50%" stopColor="var(--color-orange)" />
            <stop offset="100%" stopColor="var(--color-orange)" stopOpacity="0" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 1. Sky */}
        <rect width="100%" height="100%" fill="url(#skyGradient)" />

        {/* 3. Stars */}
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.cx}%`}
            cy={`${star.cy}%`}
            r={star.r}
            fill="#FFF"
            opacity="0.8"
            style={{
              animation: `twinkle 4s infinite alternate ease-in-out ${star.delay}s`
            }}
          />
        ))}

        {/* 2. Moon (Parallax Slow) */}
        <motion.g style={{ y: moonY }}>
          <circle cx="80%" cy="30%" r="120" fill="url(#moonGradient)" filter="url(#glow)" opacity="0.9" />
          <circle cx="80%" cy="30%" r="60" fill="#FFE4D2" filter="url(#glow)" opacity="0.8" />
        </motion.g>

        {/* 4. Mountains Back (Parallax Mid) */}
        <motion.g style={{ y: mountainsMidY }}>
          <path d="M0,900 L0,550 Q200,450 400,600 T800,500 T1440,650 L1440,900 Z" fill="#24140C" />
          <path d="M0,900 L0,650 Q250,550 500,700 T1000,550 T1440,750 L1440,900 Z" fill="#1C0F08" />
        </motion.g>

        {/* 5. Foreground (Parallax Fast) */}
        <motion.g style={{ y: foregroundY }}>
          <path d="M0,900 L0,750 Q400,650 800,800 T1440,700 L1440,900 Z" fill="var(--color-black)" />
          {/* Simple Torii Gate Silhouette */}
          <g transform="translate(150, 680) scale(0.6)">
            <rect x="50" y="20" width="100" height="150" fill="var(--color-black)" />
            <rect x="150" y="20" width="100" height="150" fill="var(--color-black)" />
            <rect x="10" y="0" width="280" height="25" rx="5" fill="var(--color-black)" />
            <rect x="30" y="40" width="240" height="15" fill="var(--color-black)" />
          </g>
        </motion.g>
      </svg>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default AnimeScene;
