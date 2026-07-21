import React, { useState } from 'react';
import { ArrowRight, Code, Laptop, Smartphone, Eye, Brain, Settings, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ServiceItem } from '../data/contentData';

interface ServicesProps {
  onInquire: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onInquire }) => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const servicesData: ServiceItem[] = t('services.items') as any || [];
  
  const getIcon = (id: string) => {
    switch (id) {
      case 'web-dev': return <Laptop className="text-indigo-600 dark:text-indigo-400" size={26} />;
      case 'web-apps': return <Code className="text-indigo-600 dark:text-indigo-400" size={26} />;
      case 'mobile-apps': return <Smartphone className="text-indigo-600 dark:text-indigo-400" size={26} />;
      case 'ui-ux': return <Eye className="text-indigo-600 dark:text-indigo-400" size={26} />;
      case 'ai-solutions': return <Brain className="text-indigo-600 dark:text-indigo-400" size={26} />;
      case 'automation': return <Settings className="text-indigo-600 dark:text-indigo-400" size={26} />;
      default: return <Code className="text-indigo-600 dark:text-indigo-400" size={26} />;
    }
  };

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="pt-6 pb-24 transition-colors font-sans relative sm:pt-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="max-w-2xl mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div
                key={service.id}
                className={`p-7 glass-card rounded-3xl text-left transition-all duration-300 flex flex-col justify-between group ${
                  isExpanded ? 'border-indigo-500/60 shadow-glow-indigo' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(service.id)}
                    </div>

                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mt-3">
                    {service.description}
                  </p>
                </div>

                {/* Toggle details action */}
                <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/60">
                  <button
                    onClick={() => handleToggle(service.id)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <span>{isExpanded ? "Hide Details" : t('services.learnMore')}</span>
                    <ArrowRight size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Expanded Sections: features, benefits, tech */}
                  {isExpanded && (
                    <div className="mt-5 space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/60 animate-fade-in">
                      
                      {/* Features */}
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                          <Sparkles size={11} className="text-indigo-500" />
                          {t('services.featuresTitle')}
                        </h4>
                        <ul className="space-y-1.5">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-xs text-slate-700 dark:text-slate-300 gap-2">
                              <Check size={14} className="text-emerald-500 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                          {t('services.benefitsTitle')}
                        </h4>
                        <ul className="space-y-1.5">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center text-xs text-slate-700 dark:text-slate-300 gap-2">
                              <Check size={14} className="text-indigo-500 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech used */}
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                          {t('services.techTitle')}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {service.techUsed.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action button */}
                      <button
                        onClick={() => onInquire(service.id)}
                        className="glow-btn w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <span>{t('services.ctaButton')}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

