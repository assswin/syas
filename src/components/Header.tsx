import React, { useState } from 'react';
import { Sun, Moon, Globe, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenEstimator: () => void;
  onOpenDashboard?: () => void;
  currentSection: string;
  setCurrentSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenEstimator,
  onOpenDashboard, 
  currentSection,
  setCurrentSection 
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'about', label: t('nav.about') },
    { id: 'blog', label: t('nav.blog') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleNavClick = (id: string) => {
    setCurrentSection(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll if element exists
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            S
          </div>
          <span className="font-black text-base tracking-tight text-slate-850 dark:text-white">
            Syay<span className="gradient-text">Labs</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 bg-white/40 dark:bg-slate-900/40 px-6 py-2 rounded-full border border-white/60 dark:border-white/10 backdrop-blur-md">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative text-xs font-bold tracking-wide transition-colors ${
                currentSection === item.id
                  ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                  : 'text-slate-600 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <span className="relative inline-flex items-center py-1">
                {item.label}
                {currentSection === item.id && (
                  <span className="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-glow-indigo" />
                )}
              </span>
            </button>
          ))}
        </nav>

        {/* Global Controls & Action CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="theme-transition p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-300/40 dark:hover:border-slate-700/40"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors text-xs font-bold uppercase border border-transparent hover:border-slate-300/40 dark:hover:border-slate-700/40">
              <Globe size={16} className="text-indigo-500" />
              <span>{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-28 glass-modal rounded-2xl p-1.5 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
              <button 
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800'
                }`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('es')}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  language === 'es' ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800'
                }`}
              >
                Español
              </button>
            </div>
          </div>

          {/* Client Portal Launcher */}
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-500/40 transition-all"
            >
              <Shield size={14} className="text-indigo-500" />
              <span>Portal</span>
            </button>
          )}

          {/* Get Quote Trigger */}
          <button 
            onClick={onOpenEstimator}
            className="glow-btn px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5"
          >
            <span>{t('nav.getQuote')}</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* Mobile controls toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Dark Mode toggle for mobile */}
          <button 
            onClick={toggleTheme}
            className="theme-transition p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Hamburger trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="theme-transition p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-5 glass-modal border-t border-white/20 dark:border-slate-800 shadow-2xl space-y-4 rounded-b-3xl animate-fade-in-up">
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm font-bold py-2 border-b border-slate-100 dark:border-slate-800/50 ${
                  currentSection === item.id 
                    ? 'text-indigo-600 dark:text-indigo-400 font-black' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              {/* Lang Swaps for mobile */}
              <button 
                onClick={() => { setLanguage(language === 'en' ? 'es' : 'en'); }}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                <Globe size={14} className="text-indigo-500" />
                <span className="uppercase">{language === 'en' ? 'Español' : 'English'}</span>
              </button>

              {onOpenDashboard && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenDashboard(); }}
                  className="flex items-center gap-1.5 px-4 py-2 border border-indigo-500/30 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400"
                >
                  <Shield size={14} />
                  <span>Client Portal</span>
                </button>
              )}
            </div>

            {/* Quote Estimator switch */}
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenEstimator(); }}
              className="glow-btn w-full text-center py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>{t('nav.getQuote')}</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

