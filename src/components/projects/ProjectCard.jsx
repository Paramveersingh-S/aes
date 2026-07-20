import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaStar, FaCodeBranch } from 'react-icons/fa6';

const getLanguageColor = (lang) => {
  const map = {
    'C++': '#f34b7d',
    'JavaScript': '#f1e05a',
    'Jupyter Notebook': '#DA5B0B',
    'C': '#555555',
    'Python': '#3572A5',
    'HTML': '#e34c26',
  };
  return map[lang] || '#8b949e';
};

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full relative">
      {project.isPinned && (
        <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          Featured
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="text-xl font-bold mb-2 pr-16 leading-tight">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
            {project.name}
          </a>
        </h4>
        
        {project.description && (
          <p className="text-sm opacity-80 mb-4 line-clamp-2">
            {project.description}
          </p>
        )}
        
        <div className="text-sm opacity-90 prose prose-sm prose-orange mb-6 flex-grow">
          {project.excerpt ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.excerpt}
            </ReactMarkdown>
          ) : (
            <p className="italic opacity-50">No README excerpt available.</p>
          )}
        </div>
        
        <div className="mt-auto">
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.topics.slice(0, 4).map(topic => (
                <span key={topic} className="text-xs bg-[var(--color-off-white)] border border-[var(--color-border)] px-2 py-1 rounded-md">
                  {topic}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-2">
            <div className="flex items-center space-x-4 text-sm opacity-80">
              {project.language && (
                <span className="flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-1.5" 
                    style={{ backgroundColor: getLanguageColor(project.language) }}
                  ></span>
                  {project.language}
                </span>
              )}
              <span className="flex items-center">
                <FaStar className="mr-1 text-gray-500" />
                {project.stargazers_count}
              </span>
              <span className="flex items-center">
                <FaCodeBranch className="mr-1 text-gray-500" />
                {project.forks_count}
              </span>
            </div>
            
            <a 
              href={project.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent)] font-medium text-sm hover:underline"
            >
              View →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
