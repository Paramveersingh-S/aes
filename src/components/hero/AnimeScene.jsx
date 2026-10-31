import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiArrowDown, HiDocumentText, HiCode } from 'react-icons/hi';

const HERO_BADGES = [
  { tag: 'RANK #1', text: '#1 / 2,000 @ U-Tokyo Matsuo Lab' },
  { tag: 'OPEN SOURCE', text: '55+ Merged PRs (vLLM, CERN, Unikraft, DeepMind)' },
  { tag: 'STACK', text: 'Go • Rust • C++ • CUDA • AWS • Terraform' }
];

const AnimeScene = () => {
  const { scrollY } = useScroll();

  const videoY = useTransform(scrollY, [0, 900], [0, 160]);
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#010308] flex items-center justify-center pt-20 pb-20"
    >
      {/* Original Torii Shrine Background Video in Full Original Color */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/torii-shrine-water-moewalls-com.mp4" type="video/mp4" />
        </video>
        {/* Subtle readability gradient at top/bottom while preserving full original video colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010308]/55 via-[#02050d]/25 to-[#010308]" />
      </motion.div>

      {/* Centerpiece Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center"
      >
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 px-4 py-1.5 rounded-full bg-[#020611]/80 backdrop-blur-md border border-blue-400/40 text-xs font-mono tracking-widest uppercase text-blue-200 flex items-center gap-2.5 shadow-[0_0_24px_rgba(59,130,246,0.3)]"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>SYSTEMS • CLOUD • AI INFRASTRUCTURE</span>
        </motion.div>

        {/* Main Display Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.03] mb-4 drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)]"
        >
          <span className="text-gradient-night">Paramveer Singh</span>
        </motion.h1>

        {/* Glowing Blue Horizon Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-56 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 shadow-[0_0_16px_rgba(96,165,250,0.9)]"
        />

        {/* Concise Role Headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-lg sm:text-2xl font-medium text-white max-w-2xl mb-8 leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
        >
          Architecting sub-10ms distributed backends, cloud-native DevSecOps, and bare-metal GPU kernels.
        </motion.p>

        {/* High-Impact Telemetry Badges */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {HERO_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="nichirin-card px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-100"
            >
              <span className="px-2 py-0.5 rounded bg-blue-500/25 text-blue-300 font-mono font-bold text-[11px] border border-blue-400/35">
                {badge.tag}
              </span>
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="katana-btn px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_28px_rgba(37,99,235,0.6)]"
          >
            <HiCode className="w-4 h-4" />
            <span>Explore Projects</span>
          </a>

          <a
            href="#resume"
            className="katana-btn px-7 py-3.5 rounded-xl bg-[#040a18]/85 backdrop-blur-md border border-blue-400/35 hover:border-blue-400 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5"
          >
            <HiDocumentText className="w-4 h-4 text-blue-400" />
            <span>View Resume</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator at Bottom */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-200 hover:text-blue-400 transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase drop-shadow">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="p-2 rounded-full border border-blue-400/35 bg-[#040a18]/85"
        >
          <HiArrowDown className="w-4 h-4 text-blue-400" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default AnimeScene;
