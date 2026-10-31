import React from 'react';

const BrandLogo = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center group select-none ${className}`}>
      {/* Subtle Ambient Blue Halo */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-blue-600/40 to-sky-400/30 blur-md opacity-60 group-hover:opacity-100 transition duration-500" />

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full transition-transform duration-500 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="navBgGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#051029" />
            <stop offset="100%" stopColor="#010308" />
          </linearGradient>
          <linearGradient id="navBladeGrad" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="navAccentGlow" x1="20" y1="85" x2="95" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Night Shield */}
        <polygon
          points="60,6 108,33 108,87 60,114 12,87 12,33"
          fill="url(#navBgGrad)"
          stroke="url(#navBladeGrad)"
          strokeWidth="4"
        />

        {/* Inner Dashed Starlight Crest */}
        <polygon
          points="60,15 99,37 99,83 60,105 21,83 21,37"
          fill="none"
          stroke="#60a5fa"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          className="origin-center transition-transform duration-700 group-hover:rotate-12"
        />

        {/* Interlocking 'P' & 'S' Geometric Monogram */}
        <path
          d="M36 86 V34 H66 C76 34 82 40 82 48.5 C82 57 76 63 66 63 H48"
          stroke="url(#navBladeGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M78 49 H56 C49 49 45 53 45 58.5 C45 64 49 67.5 57 68.5 L69 70 C78 71 83 75.5 83 82 C83 89.5 76 94 64 94 H36"
          stroke="url(#navAccentGlow)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* North Star Apex Dot */}
        <circle cx="60" cy="22" r="3.2" fill="#e0f2fe" />
      </svg>
    </div>
  );
};

export default BrandLogo;

