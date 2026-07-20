import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { motion, AnimatePresence } from 'framer-motion';

const ArticleCard = ({ article }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const readTime = Math.ceil((article.contentHtml?.length || 1000) / 1000); // Rough estimation

  const formattedDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <div className="bg-white border border-[var(--color-border)] rounded-sm overflow-hidden flex flex-col group h-full">
        {article.coverImage && (
          <div className="h-48 overflow-hidden bg-[var(--color-off-white)]">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center text-xs opacity-60 font-sans mb-3 space-x-2">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
          
          <h4 className="font-display font-bold text-xl md:text-2xl mb-2 leading-tight">
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              {article.title}
            </a>
          </h4>
          
          <p className="text-sm md:text-base opacity-80 mb-6 font-sans leading-relaxed flex-grow">
            {article.subtitle}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
            >
              Read here
            </button>
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Read on Substack ↗
            </a>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="sticky top-0 right-0 float-right m-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-off-white)] hover:bg-[var(--color-border)] transition-colors z-10"
              >
                ✕
              </button>
              
              <div className="p-8 md:p-12">
                <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">{article.title}</h2>
                <div className="flex items-center text-sm opacity-60 mb-8 pb-8 border-b border-[var(--color-border)]">
                  <span>{formattedDate}</span>
                </div>
                
                <div 
                  className="prose prose-lg prose-orange max-w-none font-body"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.contentHtml) }}
                />
                
                <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-center">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[var(--accent)] text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
                  >
                    Read & Subscribe on Substack
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArticleCard;
