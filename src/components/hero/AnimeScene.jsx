import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { HiArrowDown, HiSparkles, HiDocumentText, HiCode } from 'react-icons/hi';

const HERO_BADGES = [
  { kanji: '首席', text: '#1 / 2,000 @ U-Tokyo Matsuo Lab' },
  { kanji: '貢献', text: '55+ Merged PRs (vLLM, CERN, Unikraft, DeepMind)' },
  { kanji: '極限', text: 'Go • Rust • C++ • CUDA • AWS • Terraform' }
];

const AnimeScene = () => {
  const { scrollY } = useScroll();
  const { t } = useLanguage();
  const { currentStyleObj, cycleBreathingStyle } = useTheme();

  const videoY = useTransform(scrollY, [0, 900], [0, 180]);
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#020204] flex items-center justify-center pt-20 pb-14"
    >
      {/* Background Torii Shrine Video with Night-Black Obsidian Grading */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 scale-105 filter contrast-125 saturate-150"
        >
          <source src="/torii-shrine-water-moewalls-com.mp4" type="video/mp4" />
        </video>
        {/* Multi-stage Night-Black Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/95 via-[#030306]/65 to-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#020204_90%)]" />
      </motion.div>

      {/* Left & Right Vertical Demon Slayer Kanji Pillars */}
      <div
        aria-hidden="true"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 pointer-events-none opacity-35"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[var(--accent)]" />
        <span className="writing-vertical-jp font-jp text-sm font-bold tracking-[0.4em] text-[var(--accent)]">
          全集中・常中
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-[var(--accent)]" />
      </div>

      {/* Centerpiece Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center"
      >
        {/* Active Breathing Form Pill Button */}
        <motion.button
          onClick={cycleBreathingStyle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="katana-btn mb-6 px-4 py-1.5 rounded-full bg-[#090912]/90 border border-[var(--accent-border)] text-xs font-mono tracking-widest uppercase text-gray-200 flex items-center gap-2.5 shadow-[0_0_24px_var(--accent-soft)] cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="font-jp font-bold text-[var(--accent)]">{currentStyleObj.kanji}</span>
          <span className="text-white/40">//</span>
          <span>{currentStyleObj.name}</span>
          <HiSparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
        </motion.button>

        {/* Japanese Furigana / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-jp text-xs sm:text-sm tracking-[0.35em] text-gray-400 uppercase mb-2"
        >
          鬼殺隊・システム柱 // パラムヴィール・シン
        </motion.p>

        {/* Main Display Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.02] mb-4"
        >
          <span className="text-gradient-breathing">{t('hero.greeting')}</span>
        </motion.h1>

        {/* Katana Blade Glowing Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-56 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mb-6 shadow-[0_0_16px_var(--accent)]"
        />

        {/* Concise Role Headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-lg sm:text-2xl font-medium text-gray-200 max-w-2xl mb-8 leading-relaxed"
        >
          {t('hero.subtitle')}
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
              className="nichirin-card px-4 py-2 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-mono text-gray-200"
            >
              <span className="px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-jp font-bold text-xs border border-[var(--accent-border)]">
                {badge.kanji}
              </span>
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons with Full Katana Slash Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="katana-btn px-7 py-3.5 rounded-xl bg-[var(--accent)] text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_28px_var(--accent-glow)]"
          >
            <HiCode className="w-4 h-4" />
            <span>{t('hero.exploreWorks')}</span>
            <span className="font-jp text-xs opacity-80">肆ノ型</span>
          </a>

          <a
            href="#resume"
            className="katana-btn px-7 py-3.5 rounded-xl bg-[#0a0a12]/90 border border-white/15 hover:border-[var(--accent)] text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2.5"
          >
            <HiDocumentText className="w-4 h-4 text-[var(--accent)]" />
            <span>{t('hero.viewDossier')}</span>
            <span className="font-jp text-xs text-[var(--accent)]">履歴書</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator at Bottom */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-400 hover:text-[var(--accent)] transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="p-2 rounded-full border border-white/15 bg-[#090910]"
        >
          <HiArrowDown className="w-4 h-4 text-[var(--accent)]" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default AnimeScene;
