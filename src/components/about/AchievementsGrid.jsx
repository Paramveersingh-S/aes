import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aboutData from '../../data/about.json';
import { useLanguage } from '../../contexts/LanguageContext';
import { HiLightningBolt, HiAcademicCap, HiBriefcase } from 'react-icons/hi';

const AchievementsGrid = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    {
      id: 'experience',
      label: t('about.expTitle'),
      kanji: '実戦',
      icon: HiBriefcase,
      count: aboutData.experience.length
    },
    {
      id: 'competitions',
      label: t('about.compTitle'),
      kanji: '武勲',
      icon: HiLightningBolt,
      count: aboutData.competitions.length
    },
    {
      id: 'publications',
      label: t('about.pubTitle'),
      kanji: '論文',
      icon: HiAcademicCap,
      count: aboutData.publications.length
    }
  ];

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="my-16">
      {/* Interactive Breathing-Form Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`katana-btn px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 cursor-pointer ${
                  active
                    ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_24px_var(--accent-glow)]'
                    : 'bg-[#090912] text-gray-300 border border-white/10 hover:border-[var(--accent-border)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-jp font-bold">{tab.kanji}</span>
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] ${
                    active ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {aboutData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onMouseMove={handleCardMouseMove}
                className="nichirin-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-mono font-bold text-[11px]">
                      {exp.badge}
                    </span>
                    <span className="font-mono text-xs text-gray-400">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {exp.role}
                  </h4>
                  <p className="font-mono text-xs text-[var(--accent-secondary)] uppercase tracking-wider mb-3">
                    {exp.organization}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                </div>

                {exp.metrics && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {exp.metrics.map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-gray-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'competitions' && (
          <motion.div
            key="competitions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {aboutData.competitions.map((comp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onMouseMove={handleCardMouseMove}
                className="nichirin-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-mono font-bold text-[11px]">
                    {comp.badge}
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    {comp.organization} • {comp.date}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">
                  {comp.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {comp.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'publications' && (
          <motion.div
            key="publications"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {aboutData.publications.map((pub, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onMouseMove={handleCardMouseMove}
                className="nichirin-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-mono font-bold text-[11px]">
                    {pub.badge}
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    {pub.status}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-1">
                  {pub.title}
                </h4>
                <p className="font-mono text-xs text-[var(--accent-secondary)] mb-3">
                  {pub.venue}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {pub.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsGrid;
