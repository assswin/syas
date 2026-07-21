import React from 'react';
import { Sun, Moon, Globe, ArrowUpRight, Shield, Home, LayoutGrid, Image, Info, BookOpen, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenEstimator: () => void;
  onOpenDashboard?: () => void;
  currentSection: string;
  onNavigate: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEstimator,
  onOpenDashboard,
  currentSection,
  onNavigate
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'services', label: t('nav.services'), icon: LayoutGrid },
    { id: 'portfolio', label: t('nav.portfolio'), icon: Image },
    { id: 'about', label: t('nav.about'), icon: Info },
    { id: 'blog', label: t('nav.blog'), icon: BookOpen },
    { id: 'contact', label: t('nav.contact'), icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav font-sans transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-xl font-black text-white shadow-lg shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-105">
              S
            </div>
            <span className="text-base font-black tracking-tight text-slate-850 dark:text-white">
              Syay<span className="gradient-text">Tech</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="theme-transition rounded-2xl p-2.5 text-slate-600 transition-colors hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800/60"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold uppercase text-slate-600 transition-colors hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800/60"
              aria-label="Switch language"
            >
              <Globe size={16} className="text-indigo-500" />
              <span className="hidden sm:inline">{language}</span>
            </button>

            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="hidden items-center gap-1.5 rounded-2xl border border-slate-200/60 bg-white/40 px-3.5 py-2 text-xs font-bold text-slate-700 transition-all hover:border-indigo-500/40 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:text-indigo-400 md:flex"
              >
                <Shield size={14} className="text-indigo-500" />
                <span>Portal</span>
              </button>
            )}

            <button
              onClick={onOpenEstimator}
              className="glow-btn flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold"
            >
              <span className="hidden sm:inline">{t('nav.getQuote')}</span>
              <span className="sm:hidden">Quote</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </header>

      <nav className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,760px)] -translate-x-1/2">
        <div className="flex items-center justify-between rounded-full border border-white/60 bg-white/80 px-2 py-2 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-900/80">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-center rounded-full px-2.5 py-2 transition-all duration-200 sm:px-3 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-600 hover:bg-indigo-50 dark:text-slate-300 dark:hover:bg-slate-800/70'
                }`}
                aria-label={item.label}
              >
                <Icon size={18} />
                <span className="ml-2 hidden text-[11px] font-semibold sm:inline">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

