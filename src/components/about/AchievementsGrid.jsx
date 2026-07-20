import React, { useEffect, useState } from 'react';

const AchievementsGrid = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    import('../../data/about.json')
      .then((data) => setAbout(data.default))
      .catch((err) => console.error("Failed to load about.json", err));
  }, []);

  if (!about) return null;

  return (
    <div className="mt-20">
      <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-[var(--color-orange)] text-center">
        Achievements & Publications
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Competitions & Recognition */}
        <div className="bg-white rounded-xl p-8 border border-[var(--color-border)] shadow-sm">
          <h4 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-[var(--accent)] mr-2">🏆</span> Competitions & Recognition
          </h4>
          <ul className="space-y-3">
            {about.achievements.map((item, idx) => (
              <li key={idx} className="text-[var(--text-primary)] text-sm md:text-base opacity-90 leading-relaxed border-b border-[var(--color-border)] pb-2 last:border-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Research & Academia */}
        <div className="bg-white rounded-xl p-8 border border-[var(--color-border)] shadow-sm">
          <h4 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-[var(--accent)] mr-2">📚</span> Research & Academia
          </h4>
          <ul className="space-y-4 mb-6">
            {about.publications.map((item, idx) => (
              <li key={idx} className="text-[var(--text-primary)] text-sm md:text-base opacity-90 leading-relaxed bg-[var(--color-off-white)] p-3 rounded-lg border border-[var(--color-border)]">
                {item}
              </li>
            ))}
          </ul>
          
          <h4 className="text-lg font-bold mb-3 flex items-center">
            <span className="text-[var(--accent)] mr-2">💼</span> Internships
          </h4>
          <ul className="space-y-2">
            {about.internships.map((item, idx) => (
              <li key={idx} className="text-[var(--text-primary)] text-sm md:text-base opacity-90 flex items-start">
                <span className="text-[var(--accent)] mr-2 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AchievementsGrid;
