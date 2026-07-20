import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { motion, AnimatePresence } from 'framer-motion';

const ArticleGrid = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    import('../../data/articles.json')
      .then((data) => setArticles(data.default))
      .catch((err) => console.error("Failed to load articles.json", err));
  }, []);

  return (
    <div id="articles" className="mt-20">
      <div className="flex flex-col items-center text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-orange)] mb-4">
          Latest Writings
        </h3>
        <p className="opacity-80 text-lg max-w-2xl mb-6">
          Essays and technical deep dives cross-posted from my Substack.
        </p>
        <a 
          href="https://mlblueprints.substack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[var(--accent)] text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
        >
          Subscribe on Substack
        </a>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[var(--color-border)] text-center shadow-sm">
          <p className="text-xl font-display mb-4">New essays are on the way.</p>
          <p className="opacity-70 mb-6">Subscribe to get them delivered straight to your inbox.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
