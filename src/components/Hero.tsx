import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, CheckCircle2, Activity, Terminal, Layers, Cpu, Server, Zap } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'pipeline' | 'logs' | 'health'>('pipeline');

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
    <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center pt-8 pb-16 overflow-hidden font-sans">
      
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.08] tracking-tight">
              We Engineer <span className="gradient-text">Custom Digital Solutions</span> for Growing Businesses
            </h1>

            <p className=" text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {t('hero.tagline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onOpenEstimator}
                className="glow-btn px-8 py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>{t('hero.getQuote')}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenMeeting}
                className="px-8 py-4 glass-card rounded-2xl text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-2 hover:border-indigo-500/40"
              >
                <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span>{t('hero.bookMeeting')}</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/80 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-bold">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={16} />
                <span>100% IP Ownership</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-bold">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={16} />
                <span>Client Progress Tracker</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-bold">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={16} />
                <span>Zero Surprise Invoices</span>
              </div>
            </div>
          </div>

          {/* Right Column High-Tech CSS Interactive Dashboard Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="w-full max-w-lg glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 shadow-2xl shadow-indigo-500/10">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-[11px] text-slate-500 font-mono font-bold flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-900/80 rounded-lg">
                  <Terminal size={12} className="text-indigo-500" />
                  <span>syay_engine.v3.2</span>
                </div>
                <div className="w-6"></div>
              </div>

              {/* Interactive Tabs bar */}
              <div className="flex items-center gap-1 mb-4 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-2xl text-[10px] font-bold">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'pipeline'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Layers size={12} />
                  <span>Pipeline</span>
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'logs'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Cpu size={12} />
                  <span>Logs</span>
                </button>
                <button
                  onClick={() => setActiveTab('health')}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'health'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Activity size={12} />
                  <span>Health</span>
                </button>
              </div>

              {/* Interactive Content View */}
              {activeTab === 'pipeline' && (
                <div className="space-y-3 text-left font-mono animate-fade-in">
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white border border-indigo-500/20 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-sans font-bold uppercase text-slate-400">Active Build Sprint</span>
                      <span className="text-[10px] font-sans font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        ● Live Production
                      </span>
                    </div>
                    <p className="text-xs font-bold font-sans text-indigo-300">Enterprise SaaS Platform</p>
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full w-[88%] animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                      <span>Sprint 4 / 5</span>
                      <span className="font-bold text-white">88% Finished</span>
                    </div>
                  </div>

                  <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/90 text-white border border-white/10">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-300 flex items-center gap-2"><Zap size={12} className="text-indigo-400" /> Web Front-end</span>
                      <span className="text-emerald-400 font-bold">100%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-300 flex items-center gap-2"><Server size={12} className="text-cyan-400" /> Node Microservices</span>
                      <span className="text-cyan-400 font-bold">92%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 flex items-center gap-2"><Cpu size={12} className="text-purple-400" /> AI LLM Endpoint</span>
                      <span className="text-purple-400 font-bold">75%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] space-y-2 text-left animate-fade-in h-[180px] overflow-y-auto">
                  <p className="text-slate-500">&gt; npm run deploy:cloud</p>
                  <p className="text-indigo-400">✓ Compiling TypeScript 5.4 modules...</p>
                  <p className="text-indigo-400">✓ Optimizing Webpack chunks (gzip: 42kb)</p>
                  <p className="text-cyan-400">✓ Connecting MongoDB Enterprise Replica Set</p>
                  <p className="text-emerald-400">✓ Lighthouse Performance: 99 / 100</p>
                  <p className="text-emerald-400">✓ Accessibility Audit: 100 / 100</p>
                  <p className="text-slate-400">&gt; Deployment Successful [HTTP 200 OK]</p>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="p-3.5 rounded-2xl bg-slate-950 text-white font-mono space-y-3 text-left animate-fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/20">
                      <span className="text-[9px] text-slate-400 block font-sans uppercase">API Latency</span>
                      <span className="text-sm font-bold text-emerald-400">12 ms</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-indigo-500/20">
                      <span className="text-[9px] text-slate-400 block font-sans uppercase">Server Uptime</span>
                      <span className="text-sm font-bold text-indigo-400">99.99%</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/20 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-sans uppercase">SSL Encryption</span>
                      <span className="text-xs font-bold text-white">TLS 1.3 Active</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Statistics Counter Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-12">
          <div className="glass-card rounded-3xl p-6 text-center md:text-left group hover:border-indigo-500/40">
            <p ref={stat1.ref} className="text-4xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{stat1.display}</p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              {t('hero.stats.projects')}
            </p>
          </div>
          <div className="glass-card rounded-3xl p-6 text-center md:text-left group hover:border-indigo-500/40">
            <p ref={stat2.ref} className="text-4xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{stat2.display}</p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              {t('hero.stats.uptime')}
            </p>
          </div>
          <div className="glass-card rounded-3xl p-6 text-center md:text-left group hover:border-indigo-500/40">
            <p ref={stat3.ref} className="text-4xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{stat3.display}</p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              {t('hero.stats.satisfaction')}
            </p>
          </div>
          <div className="glass-card rounded-3xl p-6 text-center md:text-left group hover:border-indigo-500/40">
            <p ref={stat4.ref} className="text-4xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{stat4.display}</p>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
              {t('hero.stats.delivery')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

