import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, ClipboardList, Code, CheckSquare, CloudLightning, LifeBuoy, CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);

  const steps = (t('process.steps') as unknown as any[]) || [];

  const getStepIcon = (num: string) => {
    switch (num) {
      case '01': return <ClipboardList size={22} />;
      case '02': return <Award size={22} />;
      case '03': return (
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
          <path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z"/>
          <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 1 1 5 18.5z"/>
          <path d="M5 12a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12z"/>
        </svg>
      );
      case '04': return <Code size={22} />;
      case '05': return <CheckSquare size={22} />;
      case '06': return <CloudLightning size={22} />;
      case '07': return <LifeBuoy size={22} />;
      default: return <ClipboardList size={22} />;
    }
  };

  const phaseImages = [
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80"
  ];

  const deliverables = [
    ["1-on-1 discovery scoping meeting", "Detailed feature checklists", "System architecture recommendations"],
    ["Itemized cost estimates", "Phased milestone delivery dates", "Formal contract and SLAs"],
    ["High-fidelity Figma wireframes", "Clickable responsive layouts", "Brand style guides and design tokens"],
    ["Clean modular codebase scaling", "Weekly development logs updates", "Continuous integrations builds"],
    ["Browser compatibility audits", "Mobile responsiveness checks", "Performance optimizations (Score >90)"],
    ["Cloud servers configuration", "Production DNS migrations", "Analytics code integrations"],
    ["Scheduled security patches", "Complimentary bug resolution", "Post-launch expansion consulting"]
  ];

  return (
    <section id="process" className="py-24 transition-colors font-sans relative">
      <div className="gradient-divider"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
            Development Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('process.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Process layout (Visual stepper grid) */}
        <div ref={revealRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch reveal">
          
          {/* Stepper buttons (Col Span 5) */}
          <div className="lg:col-span-5 space-y-3 text-left flex flex-col justify-between">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-2xl transition-all duration-300 text-left flex items-center space-x-4 ${
                    isActive 
                      ? 'glass-card border-indigo-500/60 shadow-glow-indigo bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 ring-1 ring-indigo-500/30 scale-[1.02]'
                      : 'glass-card hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold transition-colors ${
                    isActive 
                      ? 'bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {getStepIcon(step.num)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                      Phase {step.num}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Detail Explanations (Col Span 7) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-8 text-left flex flex-col justify-between relative overflow-hidden border border-white/80 dark:border-white/10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[90px] -z-10 pointer-events-none"></div>
            
            {steps[activeStep] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full items-center">
                {/* Left contents */}
                <div className="flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-5xl font-black gradient-text opacity-30">
                        {steps[activeStep].num}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/20">
                        Milestone Deliverables
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {steps[activeStep].title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                      {steps[activeStep].desc}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
                    {deliverables[activeStep].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right image */}
                <div className="relative rounded-2xl overflow-hidden h-64 md:h-full min-h-[250px] border border-slate-200/60 dark:border-slate-800 shadow-lg group">
                  <img 
                    src={phaseImages[activeStep]} 
                    alt={steps[activeStep].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-mono font-bold text-indigo-300">Phase {steps[activeStep].num} Overview</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

