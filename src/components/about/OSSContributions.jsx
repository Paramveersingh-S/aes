import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ossData from '../../data/oss-contributions.json';
import { HiExternalLink, HiChevronDown, HiChevronUp, HiCode } from 'react-icons/hi';

const OSSContributions = () => {
  const [selectedOrg, setSelectedOrg] = useState('ALL');
  const [expandedOrgs, setExpandedOrgs] = useState({ CERN: true, 'vllm-project': true });

  if (!ossData || ossData.totalMergedPRs === 0) return null;

  const toggleExpand = (orgName) => {
    setExpandedOrgs((prev) => ({
      ...prev,
      [orgName]: !prev[orgName]
    }));
  };

  const filteredOrgs =
    selectedOrg === 'ALL'
      ? ossData.organizations
      : ossData.organizations.filter((o) => o.org === selectedOrg);

  return (
    <div className="my-16">
      {/* Header + Total Merged PR Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-400/35 text-blue-400 font-mono font-bold text-xs">
              OPEN SOURCE
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-400">
              MERGED PULL REQUESTS
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Open Source Contributions
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-blue-500/15 border border-blue-400/35 text-blue-300 font-mono text-xs sm:text-sm font-bold flex items-center gap-2">
            <HiCode className="w-4 h-4" />
            <span>{ossData.totalMergedPRs} Merged PRs Across Global Orgs</span>
          </div>
          <a
            href="https://github.com/pulls?q=is%3Apr+author%3AParamveersingh-S+is%3Amerged"
            target="_blank"
            rel="noopener noreferrer"
            className="katana-btn px-4 py-2 rounded-xl bg-[#040b1d] border border-blue-400/25 hover:border-blue-400 text-xs font-mono text-white flex items-center gap-1.5"
          >
            <span>View All on GitHub</span>
            <HiExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>
        </div>
      </div>

      {/* Organization Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedOrg('ALL')}
          className={`katana-btn px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider cursor-pointer ${
            selectedOrg === 'ALL'
              ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_16px_rgba(37,99,235,0.45)]'
              : 'bg-[#040b1d] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
          }`}
        >
          All Orgs ({ossData.organizations.length})
        </button>
        {ossData.organizations.map((org) => (
          <button
            key={org.org}
            onClick={() => setSelectedOrg(org.org)}
            className={`katana-btn px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 cursor-pointer ${
              selectedOrg === org.org
                ? 'bg-[#2563eb] text-white font-bold shadow-[0_0_16px_rgba(37,99,235,0.45)]'
                : 'bg-[#040b1d] text-slate-300 border border-blue-400/15 hover:border-blue-400/45'
            }`}
          >
            <img src={org.avatarUrl} alt={org.org} className="w-4 h-4 rounded-sm" />
            <span>{org.org}</span>
            <span className="opacity-75">({org.pullRequests.length})</span>
          </button>
        ))}
      </div>

      {/* Organization PR Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOrgs.map((org) => {
          const isExpanded = !!expandedOrgs[org.org] || selectedOrg !== 'ALL';
          const visiblePRs = isExpanded ? org.pullRequests : org.pullRequests.slice(0, 3);

          return (
            <motion.div
              key={org.org}
              layout
              className="nichirin-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Org Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-blue-400/15">
                  <a
                    href={org.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <img
                      src={org.avatarUrl}
                      alt={org.org}
                      className="w-10 h-10 rounded-xl border border-blue-400/25 bg-white/5 p-0.5 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span>{org.org}</span>
                        <HiExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </h4>
                      <span className="font-mono text-[11px] text-slate-400">
                        Upstream Maintainer Merges
                      </span>
                    </div>
                  </a>

                  <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/35 text-blue-300 font-mono text-xs font-bold">
                    {org.pullRequests.length} {org.pullRequests.length === 1 ? 'PR' : 'PRs'}
                  </span>
                </div>

                {/* PR List */}
                <ul className="space-y-2.5">
                  <AnimatePresence initial={false}>
                    {visiblePRs.map((pr, idx) => (
                      <motion.li
                        key={pr.url || idx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="group"
                      >
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2.5 rounded-xl bg-[#030816]/80 hover:bg-blue-500/[0.1] border border-blue-400/10 hover:border-blue-400/40 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white line-clamp-1">
                              {pr.title}
                            </span>
                            <span className="shrink-0 font-mono text-[10px] text-sky-300 bg-blue-500/15 px-1.5 py-0.5 rounded border border-blue-400/25">
                              MERGED
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-slate-400">
                            <span className="text-blue-400">{pr.repo}</span>
                            <span>
                              {new Date(pr.mergedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </a>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>

              {/* Expand / Collapse Button if > 3 PRs */}
              {org.pullRequests.length > 3 && selectedOrg === 'ALL' && (
                <button
                  onClick={() => toggleExpand(org.org)}
                  className="katana-btn mt-4 w-full py-2 rounded-xl bg-blue-500/[0.06] hover:bg-blue-500/[0.14] border border-blue-400/15 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span>
                      <HiChevronUp className="w-4 h-4 text-blue-400" />
                    </>
                  ) : (
                    <>
                      <span>Show All {org.pullRequests.length} Merged PRs</span>
                      <HiChevronDown className="w-4 h-4 text-blue-400" />
                    </>
                  )}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OSSContributions;
