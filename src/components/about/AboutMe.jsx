import React from 'react';
import { motion } from 'framer-motion';
import aboutData from '../../data/about.json';
import featuredOrgs from '../../data/featuredOrgs.json';
import SocialLinks from './SocialLinks';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiExternalLink } from 'react-icons/hi';

const AboutMe = () => {
  const { t } = useLanguage();

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-jp font-bold text-xs">
              弐ノ型
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
              HASHIRA IDENTITY // 柱の記録
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('about.title')}
          </h2>
        </div>
        <SocialLinks />
      </div>

      {/* Top Bento Grid: Profile Card + 4 Key Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Left: Hashira Profile Card */}
        <div
          onMouseMove={handleCardMouseMove}
          className="nichirin-card lg:col-span-7 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-secondary)] opacity-60 blur-md group-hover:opacity-100 transition duration-500" />
            <img
              src="/anime_hero.gif"
              alt={aboutData.name}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-white/20"
            />
            <span className="hanko-seal absolute -bottom-2 -right-2 w-8 h-8 rounded-md text-xs bg-[#050508]">
              柱
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE // TOKYO & GLOBAL REMOTE</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-1">
              {aboutData.name}{' '}
              <span className="text-sm font-jp text-[var(--accent)] font-normal ml-1">
                {aboutData.kanjiName}
              </span>
            </h3>

            <p className="font-mono text-xs text-[var(--accent-secondary)] uppercase tracking-wider mb-3">
              {aboutData.rankTitle}
            </p>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {aboutData.bio}
            </p>
          </div>
        </div>

        {/* Right: 2x2 High-Impact Telemetry Stats */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {(aboutData.stats || []).map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              onMouseMove={handleCardMouseMove}
              className="nichirin-card rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
                  {stat.label}
                </span>
                <span className="font-jp text-xs font-bold text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent-soft)]">
                  {stat.kanji}
                </span>
              </div>
              <div className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight my-1">
                {stat.value}
              </div>
              <div className="font-mono text-[11px] text-[var(--accent-secondary)]">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Open-Source Alliances Strip */}
      <div className="nichirin-card rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
            ALLIED CORPS // CONTRIBUTED ORGANIZATIONS
          </span>
          <span className="font-jp text-xs text-[var(--accent)] font-bold">
            世界規模の貢献
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {featuredOrgs.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="katana-btn group p-3 rounded-xl bg-[#07070d] border border-white/10 hover:border-[var(--accent)] flex flex-col items-center text-center gap-2"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1 group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              <div>
                <div className="text-xs font-bold text-gray-200 group-hover:text-white truncate max-w-[110px]">
                  {org.name}
                </div>
                <div className="font-mono text-[10px] text-[var(--accent)] flex items-center justify-center gap-0.5">
                  <span>{org.prs}</span>
                  <HiExternalLink className="w-2.5 h-2.5 opacity-70" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
