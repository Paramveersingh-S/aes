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

  const skyY = useTransform(scrollY, [0, 900], [0, 160]);
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#010308] flex items-center justify-center pt-20 pb-20"
    >
      {/* Starry Night Blue Sky + Pitch-Black Horizon Palette from Reference Image */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        {/* Deep Cobalt & Sapphire Starry Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 75% at 55% 18%, #153b82 0%, #0b2252 42%, #051029 72%, #010308 100%)'
          }}
        />
        {/* Diagonal Luminous Blue Wisps (matching the cloud streaks in the night sky image) */}
        <div
          className="absolute inset-0 opacity-65"
          style={{
            background:
              'radial-gradient(ellipse 55% 22% at 62% 68%, rgba(96, 165, 250, 0.32) 0%, transparent 70%), radial-gradient(ellipse 45% 15% at 45% 52%, rgba(59, 130, 246, 0.24) 0%, transparent 75%)'
          }}
        />
        {/* Bottom Pitch-Black Mountain/Horizon Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#010308] via-[#010308]/95 to-transparent" />
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
          className="mb-6 px-4 py-1.5 rounded-full bg-[#040d21]/90 border border-blue-400/35 text-xs font-mono tracking-widest uppercase text-blue-200 flex items-center gap-2.5 shadow-[0_0_24px_rgba(59,130,246,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>SYSTEMS • CLOUD • AI INFRASTRUCTURE</span>
        </motion.div>

        {/* Main Display Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.03] mb-4"
        >
          <span className="text-gradient-night">Paramveer Singh</span>
        </motion.h1>

        {/* Glowing Blue Horizon Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-56 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 shadow-[0_0_16px_rgba(96,165,250,0.8)]"
        />

        {/* Concise Role Headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-lg sm:text-2xl font-medium text-blue-100/90 max-w-2xl mb-8 leading-relaxed"
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
              className="nichirin-card px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-mono text-slate-200"
            >
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-[11px] border border-blue-400/30">
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
            className="katana-btn px-7 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#3b82f6] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_28px_rgba(37,99,235,0.55)]"
          >
            <HiCode className="w-4 h-4" />
            <span>Explore Projects</span>
          </a>

          <a
            href="#resume"
            className="katana-btn px-7 py-3.5 rounded-xl bg-[#040a18]/90 border border-blue-400/30 hover:border-blue-400 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5"
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="p-2 rounded-full border border-blue-400/25 bg-[#040a18]"
        >
          <HiArrowDown className="w-4 h-4 text-blue-400" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default AnimeScene;
