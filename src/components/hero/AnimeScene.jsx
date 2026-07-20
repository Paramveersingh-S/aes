import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimeScene = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef(null);
  
  // Parallax effect for the background video
  const backgroundY = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    // Force muted and autoplay to bypass strict browser policies
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Video autoplay prevented by browser", e));
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-black)] pointer-events-none z-0">
      <motion.div style={{ y: backgroundY, scale: 1.1 }} className="w-full h-full">
        <video
          ref={videoRef}
          src="/torii-shrine-water-moewalls-com.mp4"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 25%' }}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>
      {/* Dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)]"></div>
    </div>
  );
};

export default AnimeScene;
