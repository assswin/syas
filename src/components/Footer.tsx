import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="glass-nav text-slate-400 py-16 font-sans text-left transition-colors relative border-t border-white/20 dark:border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-slate-200/60 dark:border-slate-800 pb-12">
          
          {/* Col 1 Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                S
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                Syay<span className="gradient-text">Tech</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              We engineer custom software, scalable web portals, and intelligent automations built on trust, transparency, and clean source code.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('services')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('portfolio')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.portfolio')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('blog')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {t('nav.blog')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Services */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Website Development</a></li>
              <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Web Applications</a></li>
              <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mobile iOS/Android</a></li>
              <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI & Machine Learning</a></li>
              <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Process Automation</a></li>
            </ul>
          </div>

          {/* Col 4 Contacts */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Node.js", "Python", "Vite", "AWS", "MongoDB"].map((tech, idx) => (
                <span 
                  key={idx} 
                  className="glass-pill text-slate-700 dark:text-slate-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
              <span className="text-[9px] text-slate-400 block uppercase font-bold">Main Office</span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block leading-normal">{t('contact.info.location')}</span>
            </div>
          </div>

        </div>

        {/* Footer Base copyright and links */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Syay Labs. All rights reserved. 100% Client Owned.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

