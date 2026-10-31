import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ id, children, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full py-20 md:py-28 bg-night-sky text-[var(--text-primary)] overflow-hidden ${className}`}
    >
      <div className="katana-divider absolute top-0 left-0 right-0 opacity-60" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
