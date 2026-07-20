import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AboutMe = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    import('../../data/about.json')
      .then((data) => setAbout(data.default))
      .catch((err) => console.error("Failed to load about.json", err));
  }, []);

  if (!about) return <div className="h-40 flex items-center justify-center">Loading...</div>;

  return (
    <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-[var(--color-orange)]">
          About Me
        </h2>
        <p className="text-lg leading-relaxed mb-4 text-[var(--text-primary)]">
          {about.tagline}
        </p>
        <p className="text-lg leading-relaxed mb-4 font-semibold">
          Currently building: <span className="text-[var(--accent)]">{about.currentlyBuilding}</span>
        </p>
        <ul className="space-y-2 mt-4 text-md">
          {about.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-[var(--accent)] mr-2 mt-1">•</span>
              <span className="opacity-90">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center bg-[var(--color-off-white)] rounded-xl p-8 shadow-sm border border-[var(--color-border)]">
         <img 
            src="https://avatars.githubusercontent.com/u/155875516?v=4" 
            alt="Paramveer Singh" 
            className="w-32 h-32 rounded-full mb-6 border-4 border-white shadow-md"
         />
         <div className="w-full grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
              <p className="text-2xl font-bold text-[var(--accent)]">63+</p>
              <p className="text-sm font-medium opacity-80">Public Repos</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-[var(--color-border)]">
              <p className="text-2xl font-bold text-[var(--accent)]">50+</p>
              <p className="text-sm font-medium opacity-80">Stars Received</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutMe;
