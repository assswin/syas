import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Award, ClipboardList, Code, CheckSquare, CloudLightning, LifeBuoy } from 'lucide-react';

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

  // Add detailed bullet points/deliverables for each step to make it feel extremely professional
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
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
            {t('process.title')}
          </h2>
          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Process layout (Visual stepper grid) */}
        <div ref={revealRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start reveal">
          
          {/* Stepper buttons (Col Span 5) */}
          <div className="lg:col-span-5 space-y-3 text-left">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-2xl transition-all text-left flex items-center space-x-4 ${
                    isActive 
                      ? 'glass-card border-indigo-400/50 bg-indigo-50/60 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md ring-1 ring-indigo-500/20 pulse-glow'
                      : 'border border-slate-200/50 bg-white/40 hover:bg-white/70 dark:border-slate-700/30 dark:bg-slate-800/40 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-350'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    isActive 
                      ? 'bg-indigo-650 text-white' 
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
                  }`}>
                    {getStepIcon(step.num)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                      Phase {step.num}
                    </span>
                    <span className="text-xs font-extrabold text-slate-850 dark:text-slate-205">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Detail Explanations (Col Span 7) */}
          <div className="lg:col-span-7 glass-card premium-card rounded-3xl p-6 md:p-8 text-left h-full min-h-[380px] flex flex-col justify-between animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            {steps[activeStep] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Left contents */}
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-5xl font-black text-indigo-600/10 dark:text-indigo-400/15">
                        {steps[activeStep].num}
                      </span>
                      <span className="text-[10px] font-bold uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-655 dark:text-indigo-400 px-3 py-1 rounded-full border border-indigo-100/50">
                        Deliverables Checklist
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-850 dark:text-white">
                      {steps[activeStep].title}
                    </h3>
                    
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                      {steps[activeStep].desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                    {deliverables[activeStep].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-705 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right image */}
                <div className="relative rounded-2xl overflow-hidden h-48 md:h-full min-h-[220px] border border-slate-200/50 dark:border-slate-800/80 shadow-sm">
                  <img 
                    src={phaseImages[activeStep]} 
                    alt={steps[activeStep].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
