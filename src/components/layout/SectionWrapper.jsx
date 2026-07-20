import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ id, children, className = '', dark = false }) => {
  const bgColor = dark ? 'bg-[var(--bg-inverted)]' : 'bg-[var(--bg-primary)]';
  const textColor = dark ? 'text-[var(--text-inverted)]' : 'text-[var(--text-primary)]';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id={id} className={`w-full py-20 ${bgColor} ${textColor} ${className}`}>
      <motion.div
        className="max-w-5xl mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
