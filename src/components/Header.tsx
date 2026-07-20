import React, { useState } from 'react';
import { Sun, Moon, Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenEstimator: () => void;
  currentSection: string;
  setCurrentSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenEstimator, 
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl font-sans transition-all duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-slate-900/10">
            A
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-850 dark:text-white">
            Syay<span className="text-indigo-600 dark:text-indigo-400">Labs</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative text-xs font-semibold tracking-wide transition-colors ${
                currentSection === item.id
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-550 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <span className="relative inline-flex items-center">
                {item.label}
                {currentSection === item.id && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                )}
              </span>
            </button>
          ))}
        </nav>

        {/* Global Controls & Action CTAs */}
        <div className="hidden lg:flex items-center space-x-3.5">
          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="theme-transition p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold uppercase">
              <Globe size={16} />
              <span>{language}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-24 glass-card rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.16)] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-opacity transition-transform duration-200 ease-out">
              <button 
                onClick={() => setLanguage('en')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-205 hover:bg-slate-50 dark:hover:bg-slate-800 first:rounded-t-xl"
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('es')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-205 hover:bg-slate-50 dark:hover:bg-slate-800 last:rounded-b-xl"
              >
                Español
              </button>
            </div>
          </div>



          {/* Get Quote Trigger */}
          <button 
            onClick={onOpenEstimator}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <span>{t('nav.getQuote')}</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile controls toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Dark Mode toggle for mobile */}
          <button 
            onClick={toggleTheme}
            className="theme-transition p-2 rounded-xl text-slate-500 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Hamburger trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="theme-transition p-2 text-slate-550 dark:text-slate-350 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 border-t border-white/10 glass-card shadow-[0_18px_40px_rgba(0,0,0,0.18)] space-y-4 rounded-b-2xl">
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm font-semibold py-1.5 border-b border-slate-50 dark:border-slate-850 ${
                  currentSection === item.id 
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex flex-wrap gap-2.5 pt-2">
            {/* Lang Swaps for mobile */}
            <button 
              onClick={() => { setLanguage(language === 'en' ? 'es' : 'en'); }}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-650 dark:text-slate-350"
            >
              <Globe size={14} />
              <span className="uppercase">{language === 'en' ? 'Español' : 'English'}</span>
            </button>



            {/* Quote Estimator switch */}
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenEstimator(); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full text-center py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200"
            >
              {t('nav.getQuote')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
