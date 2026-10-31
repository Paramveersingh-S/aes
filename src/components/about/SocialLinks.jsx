import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SiSubstack } from 'react-icons/si';

const LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/Paramveersingh-S',
    icon: FaGithub
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/paramveer-singh-454b54270',
    icon: FaLinkedin
  },
  {
    name: 'Substack',
    href: 'https://mlblueprints.substack.com/',
    icon: SiSubstack
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/ParamveerS15896',
    icon: FaXTwitter
  }
];

const SocialLinks = ({ className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {LINKS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="katana-btn group px-3.5 py-2 rounded-xl bg-[#040b1d] border border-blue-400/20 hover:border-blue-400 text-slate-300 hover:text-white flex items-center gap-2 text-xs font-mono tracking-wider"
          >
            <Icon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>{item.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
