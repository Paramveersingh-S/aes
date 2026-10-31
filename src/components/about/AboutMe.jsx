import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import aboutData from '../../data/about.json';
import featuredOrgs from '../../data/featuredOrgs.json';
import SocialLinks from './SocialLinks';
import { HiExternalLink } from 'react-icons/hi';

const CHARS = '0123456789.#+KX';

const ScrambleValue = ({ target }) => {
  const [display, setDisplay] = useState(target);

  const triggerScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        target
          .split('')
          .map((ch, idx) => {
            if (idx < iteration) return target[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iteration += 0.35;
      if (iteration >= target.length) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, 35);
  };

  useEffect(() => {
    triggerScramble();
  }, [target]);

  return (
    <span onMouseEnter={triggerScramble} className="cursor-default">
      {display}
    </span>
  );
};

const AboutMe = () => {
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              01
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              OVERVIEW & METRICS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
        </div>
        <SocialLinks />
      </div>

      {/* Top Bento Grid: Profile Card + 4 Key Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Left: Profile Card */}
        <div
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="nichirin-card lg:col-span-7 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 opacity-55 blur-md group-hover:opacity-95 transition duration-500" />
            <img
              src="/github_avatar.png"
              alt={aboutData.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://github.com/Paramveersingh-S.png';
              }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-blue-400/35 bg-[#020611]"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[11px] font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>AVAILABLE FOR GLOBAL ROLES</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-1">
              {aboutData.name}
            </h3>

            <p className="font-mono text-xs text-blue-400 uppercase tracking-wider mb-3">
              {aboutData.roleTitle}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {aboutData.bio}
            </p>
          </div>
        </div>

        {/* Right: 2x2 High-Impact Telemetry Stats with Cyber-Scramble & 3D Tilt */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {(aboutData.stats || []).map((stat, idx) => (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="nichirin-card rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  {stat.label}
                </span>
                <span className="font-mono text-[10px] font-bold text-blue-300 px-2 py-0.5 rounded bg-blue-500/15 border border-blue-400/25">
                  {stat.tag}
                </span>
              </div>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight my-1">
                <ScrambleValue target={stat.value} />
              </div>
              <div className="font-mono text-[11px] text-sky-300">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Open-Source Organizations Strip */}
      <div className="nichirin-card rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            OPEN SOURCE ORGANIZATIONS CONTRIBUTED TO
          </span>
          <span className="font-mono text-xs text-blue-400 font-semibold">
            55+ MERGED PRs
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {featuredOrgs.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="katana-btn group p-3 rounded-xl bg-[#030816] border border-blue-400/15 hover:border-blue-400 flex flex-col items-center text-center gap-2"
            >
              <img
                src={org.logo}
                alt={org.name}
                className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1 group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-white truncate max-w-[110px]">
                  {org.name}
                </div>
                <div className="font-mono text-[10px] text-blue-400 flex items-center justify-center gap-0.5">
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
