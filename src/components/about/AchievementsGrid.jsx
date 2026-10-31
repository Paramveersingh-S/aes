import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aboutData from '../../data/about.json';
import { HiLightningBolt, HiAcademicCap, HiBriefcase } from 'react-icons/hi';

const AchievementsGrid = () => {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    {
      id: 'experience',
      label: 'Experience',
      icon: HiBriefcase,
      count: aboutData.experience.length
    },
    {
      id: 'competitions',
      label: 'Achievements',
      icon: HiLightningBolt,
      count: aboutData.competitions.length
    },
    {
      id: 'publications',
      label: 'Publications',
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
      {/* Interactive Tab Switcher */}
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
                    ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_24px_rgba(37,99,235,0.5)]'
                    : 'bg-[#040b1d] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] ${
                    active ? 'bg-black/25 text-white' : 'bg-blue-500/15 text-blue-300'
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
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono font-bold text-[11px]">
                      {exp.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    {exp.role}
                  </h4>
                  <p className="font-mono text-xs text-sky-300 uppercase tracking-wider mb-3">
                    {exp.organization}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                </div>

                {exp.metrics && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-blue-400/15">
                    {exp.metrics.map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-[#030816] border border-blue-400/15 text-[11px] font-mono text-slate-300"
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
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono font-bold text-[11px]">
                    {comp.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {comp.organization} • {comp.date}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">
                  {comp.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
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
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono font-bold text-[11px]">
                    {pub.badge}
                  </span>
                  <span className="font-mono text-xs text-sky-300">
                    {pub.status}
                  </span>
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-1">
                  {pub.title}
                </h4>
                <p className="font-mono text-xs text-blue-400 mb-3">
                  {pub.venue}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
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
