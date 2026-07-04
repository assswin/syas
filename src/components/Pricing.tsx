import React from 'react';
import { Check, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
  onOpenEstimator: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onOpenEstimator }) => {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const plans = (t('pricing.plans') as unknown as any[]) || [];

  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950/20 transition-colors font-sans relative">
      <div className="gradient-divider"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => {
            const isCustom = plan.price === 'Custom' || plan.price === 'Personalizado';
            
            return (
              <div
                key={idx}
                className={`reveal stagger-${idx + 1} flex flex-col justify-between p-6 glass-card rounded-3xl premium-card text-left relative ${
                  plan.popular 
                    ? 'border-indigo-650 dark:border-indigo-500 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-600/25 lg:-translate-y-2' 
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="shimmer absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t('pricing.popular')}
                  </span>
                )}

                {/* Glow orb behind popular card */}
                {plan.popular && (
                  <div className="absolute -inset-4 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-[2rem] blur-2xl -z-10 pointer-events-none"></div>
                )}

                {/* Top Section */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-850 dark:text-white uppercase tracking-wider">
                      {plan.name}
                    </h3>
                    <p className="text-[10px] text-slate-405 dark:text-slate-450 mt-1 leading-relaxed min-h-[40px]">
                      {plan.desc}
                    </p>
                  </div>

                  <div className="py-2 border-y border-slate-100 dark:border-slate-800">
                    <span className="text-2xl font-black text-slate-850 dark:text-white">
                      {plan.price}
                    </span>
                    {!isCustom && (
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">One-time investment</span>
                    )}
                  </div>

                  {/* Plan features check list */}
                  <ul className="space-y-2.5 pt-2">
                    {plan.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-655 dark:text-slate-300">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action button */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  {isCustom ? (
                    <button
                      onClick={onOpenEstimator}
                      className="w-full border border-indigo-600 dark:border-indigo-500 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 py-3 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer"
                    >
                      {t('pricing.customCta')}
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectPlan(plan.name)}
                      className={`w-full py-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer ${
                        plan.popular
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {t('pricing.cta')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing notice disclaimer */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-450 bg-white dark:bg-slate-850 p-4 border border-slate-150 dark:border-slate-800/80 rounded-2xl max-w-xl mx-auto">
          <Info size={16} className="text-indigo-605 dark:text-indigo-400 shrink-0" />
          <p className="text-left leading-normal text-[11px]">
            Need a hybrid arrangement or custom terms? We operate strictly with itemized milestones, meaning payments are only released after you inspect and sign off on active builds.
          </p>
        </div>

      </div>
    </section>
  );
};
