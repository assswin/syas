import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, CheckCircle2, Activity, Terminal, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenMeeting: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenEstimator, 
  onOpenMeeting
}) => {
  const { t } = useLanguage();

  // Counter animation hook
  const useCounter = (target: number, suffix: string = '', decimals: number = 0) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLParagraphElement>(null);
    const started = useRef(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const stepTime = 16;
          const steps = duration / stepTime;
          const increment = target / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) { start = target; clearInterval(timer); }
            setCount(start);
          }, stepTime);
        }
      }, { threshold: 0.3 });
      observer.observe(el);
      return () => observer.disconnect();
    }, [target]);

    const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();
    return { ref, display: display + suffix };
  };

  const stat1 = useCounter(50, '+');
  const stat2 = useCounter(99.9, '%', 1);
  const stat3 = useCounter(4.9, '/5', 1);
  const stat4 = useCounter(100, '%');

  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pt-8 pb-16 overflow-hidden gradient-overlay font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.05),transparent_35%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-150 dark:border-indigo-900/40 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
              {t('hero.badge')}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-850 dark:text-white leading-[1.08] tracking-tight">
              {t('hero.title')}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed max-w-xl">
              {t('hero.tagline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={onOpenEstimator}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <span>{t('hero.getQuote')}</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onOpenMeeting}
                className="border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-205 hover:bg-slate-100 dark:hover:bg-slate-850 font-semibold text-xs px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Calendar size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span>{t('hero.bookMeeting')}</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-150 dark:border-slate-800 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={15} />
                <span>100% IP Ownership</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={15} />
                <span>Client Progress Tracker</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={15} />
                <span>Zero Surprise Invoices</span>
              </div>
            </div>
          </div>

          {/* Right Column visual illustration panel (CSS Mockup dashboard) */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            {/* Visual element frame */}
            <div className="w-full max-w-md glass-card rounded-3xl p-4">
              
              {/* Window controls */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-850">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Terminal size={10} />
                  <span>syay_tracker.sh</span>
                </div>
                <div className="w-6"></div>
              </div>

              {/* Mock Dashboard body */}
              <div className="space-y-3.5 text-left text-xs font-mono">
                {/* Active pipeline tracker header */}
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold font-sans">Active Project</span>
                    <span className="text-slate-200 text-xs font-bold font-sans truncate block max-w-[160px]">E-Commerce Backend</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-emerald-450 block uppercase font-bold font-sans">Build Pass</span>
                    <span className="text-slate-400 text-[10px]">84% complete</span>
                  </div>
                </div>

                {/* Simulated build logs */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-slate-950 border border-slate-900 text-[10px] text-slate-350">
                  <p className="text-slate-500">&gt; npm run build:production</p>
                  <p className="text-indigo-400">✓ bundling chunks: client-views, state-provider</p>
                  <p className="text-indigo-400">✓ verifying lighthouse core web vitals...</p>
                  <p className="text-emerald-400">✓ Page Speed: 97/100 | Accessibility: 100/100</p>
                  <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                    <Activity size={10} className="text-red-400" />
                    <span>Server Status: Online - latency: 14ms</span>
                  </div>
                </div>

                {/* Dashboard milestones visual */}
                <div className="p-3 rounded-2xl bg-slate-850 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase font-sans">Sprint Tasks</span>
                    <span 
                      className="text-[9px] font-bold text-indigo-400 font-sans flex items-center"
                    >
                      Sprint #3 Progress
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-300 flex items-center gap-1.5"><Layers size={10} className="text-indigo-400" /> UI Figma Mockups</span>
                      <span className="text-emerald-400 font-bold">100%</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-300 flex items-center gap-1.5"><Layers size={10} className="text-indigo-400" /> Core API Integration</span>
                      <span className="text-indigo-400 font-bold">78%</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-500 flex items-center gap-1.5"><Layers size={10} /> Integration QA tests</span>
                      <span className="text-slate-600 font-bold">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Statistics Counter Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-16">
          <div className="glass-pill rounded-2xl px-5 py-4 text-center md:text-left">
            <p ref={stat1.ref} className="text-3xl font-black text-slate-800 dark:text-white">{stat1.display}</p>
            <p className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-450 mt-1">
              {t('hero.stats.projects')}
            </p>
          </div>
          <div className="glass-pill rounded-2xl px-5 py-4 text-center md:text-left">
            <p ref={stat2.ref} className="text-3xl font-black text-slate-800 dark:text-white">{stat2.display}</p>
            <p className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-450 mt-1">
              {t('hero.stats.uptime')}
            </p>
          </div>
          <div className="glass-pill rounded-2xl px-5 py-4 text-center md:text-left">
            <p ref={stat3.ref} className="text-3xl font-black text-slate-800 dark:text-white">{stat3.display}</p>
            <p className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-450 mt-1">
              {t('hero.stats.satisfaction')}
            </p>
          </div>
          <div className="glass-pill rounded-2xl px-5 py-4 text-center md:text-left">
            <p ref={stat4.ref} className="text-3xl font-black text-slate-800 dark:text-white">{stat4.display}</p>
            <p className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-450 mt-1">
              {t('hero.stats.delivery')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
