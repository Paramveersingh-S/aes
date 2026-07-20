import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const SocialLinks = ({ className = '' }) => {
  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      <a 
        href="https://github.com/Paramveersingh-S" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
      >
        <FaGithub className="w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a 
        href="https://www.linkedin.com/in/paramveer-singh-454b54270" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
      >
        <FaLinkedin className="w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a 
        href="https://x.com/ParamveerS15896" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="X (Twitter) Profile"
        className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
      >
        <FaXTwitter className="w-6 h-6 md:w-7 md:h-7" />
      </a>
    </div>
  );
};

export default SocialLinks;
