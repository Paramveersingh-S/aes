import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimeScene = () => {
  const { scrollY } = useScroll();
  
  // Parallax effect for the background image
  const backgroundY = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-black)] pointer-events-none -z-10">
      <motion.img
        src="/anime_hero.gif"
        alt="Anime Scenery Background"
        className="w-full h-full object-cover"
        style={{ y: backgroundY, scale: 1.1 }}
      />
      {/* Dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)]"></div>
    </div>
  );
};

export default AnimeScene;
