import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OSSContributions = () => {
  const [data, setData] = useState(null);
  const [expandedOrg, setExpandedOrg] = useState(null);

  useEffect(() => {
    import('../../data/oss-contributions.json')
      .then((res) => setData(res.default))
      .catch((err) => console.error("Failed to load oss-contributions.json", err));
  }, []);

  if (!data) return null;

  return (
    <div className="mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-orange)]">
          Open Source Contributions
          <span className="ml-3 text-lg bg-[var(--color-orange-soft)] text-[var(--accent)] px-3 py-1 rounded-full font-sans">
            {data.totalMergedPRs} Merged PRs
          </span>
        </h3>
        <a 
          href="https://github.com/search?q=is%3Apr+is%3Amerged+author%3AParamveersingh-S+-user%3AParamveersingh-S&type=pullrequests" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline text-sm font-medium mt-2 md:mt-0"
        >
          See live search on GitHub →
        </a>
      </div>

      {data.organizations.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-[var(--color-border)] text-center">
          <p className="text-lg opacity-80 mb-4">No open-source contributions pulled yet.</p>
          <a 
            href="https://github.com/search?q=is%3Apr+is%3Amerged+author%3AParamveersingh-S+-user%3AParamveersingh-S&type=pullrequests" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[var(--accent)] text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
          >
            Check GitHub directly
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.organizations.map((orgData, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
              <div 
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-[var(--color-off-white)] transition-colors"
                onClick={() => setExpandedOrg(expandedOrg === orgData.org ? null : orgData.org)}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={orgData.avatarUrl} 
                    alt={orgData.org} 
                    className="w-12 h-12 rounded-full border border-[var(--color-border)]"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{orgData.org}</h4>
                    <p className="text-sm opacity-70">{orgData.pullRequests.length} pull requests</p>
                  </div>
                </div>
                <div className={`transform transition-transform ${expandedOrg === orgData.org ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedOrg === orgData.org && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[var(--color-border)] bg-[var(--color-off-white)]"
                  >
                    <ul className="p-4 space-y-3">
                      {orgData.pullRequests.map((pr, pIdx) => (
                        <li key={pIdx} className="text-sm">
                          <a 
                            href={pr.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start group"
                          >
                            <span className="text-green-600 mr-2 mt-0.5">
                              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
                              </svg>
                            </span>
                            <div>
                              <span className="group-hover:text-[var(--accent)] group-hover:underline transition-colors block leading-tight mb-1">
                                {pr.title}
                              </span>
                              <span className="text-xs opacity-60 font-mono bg-white px-1.5 py-0.5 rounded border border-[var(--color-border)]">
                                {pr.repo}
                              </span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Snake Animation */}
      <div className="mt-16 overflow-x-auto">
        <h4 className="text-xl font-bold text-center mb-6 text-[var(--color-orange)]">Activity Heatmap</h4>
        <div className="bg-[var(--color-off-white)] rounded-xl border border-[var(--color-border)] p-4 max-w-4xl mx-auto shadow-sm">
          <img 
            src="https://raw.githubusercontent.com/Paramveersingh-S/Paramveersingh-S/output/github-contribution-grid-snake.svg" 
            alt="GitHub Contribution Snake" 
            className="mx-auto w-full"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OSSContributions;
