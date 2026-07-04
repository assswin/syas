import React, { useState } from 'react';
import { ArrowRight, Code, Laptop, Smartphone, Eye, Brain, Settings, Check } from 'lucide-react';
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
      case 'web-dev': return <Laptop className="text-indigo-650 dark:text-indigo-400" size={24} />;
      case 'web-apps': return <Code className="text-indigo-650 dark:text-indigo-400" size={24} />;
      case 'mobile-apps': return <Smartphone className="text-indigo-650 dark:text-indigo-400" size={24} />;
      case 'ui-ux': return <Eye className="text-indigo-650 dark:text-indigo-400" size={24} />;
      case 'ai-solutions': return <Brain className="text-indigo-650 dark:text-indigo-400" size={24} />;
      case 'automation': return <Settings className="text-indigo-650 dark:text-indigo-400" size={24} />;
      default: return <Code className="text-indigo-650 dark:text-indigo-400" size={24} />;
    }
  };

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors font-sans relative">
      <div className="gradient-divider"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <div
                key={service.id}
                className={`p-6 glass-card rounded-3xl premium-card text-left transition-all duration-300 ${
                  isExpanded ? 'ring-2 ring-indigo-600 dark:ring-indigo-500 scale-[1.01]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center neu-raised">
                    {getIcon(service.id)}
                  </div>
                  {service.startingPrice && (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-450 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 px-3 py-1 rounded-full flex items-center">
                      {t('services.startingFrom')} {service.startingPrice}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-850 dark:text-white">
                  {service.title}
                </h3>
                
                <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mt-2.5">
                  {service.description}
                </p>

                {/* Toggle details action */}
                <button
                  onClick={() => handleToggle(service.id)}
                  className="mt-4 flex items-center gap-1.5 text-xs font-bold text-indigo-650 dark:text-indigo-400 hover:text-indigo-750 transition-colors"
                >
                  <span>{isExpanded ? "Hide details" : t('services.learnMore')}</span>
                  <ArrowRight size={13} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {/* Expanded Sections: features, benefits, tech, pricing */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
                    
                    {/* Features */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-450 mb-2">
                        {t('services.featuresTitle')}
                      </h4>
                      <ul className="space-y-1.5">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-xs text-slate-650 dark:text-slate-300 gap-2">
                            <Check size={14} className="text-emerald-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-450 mb-2">
                        {t('services.benefitsTitle')}
                      </h4>
                      <ul className="space-y-1.5">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-xs text-slate-650 dark:text-slate-300 gap-2">
                            <Check size={14} className="text-indigo-500 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech used */}
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-450 mb-2">
                        {t('services.techTitle')}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {service.techUsed.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => onInquire(service.id)}
                      className="w-full bg-indigo-650 hover:bg-indigo-700 text-white py-3.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                    >
                      <span>{t('services.ctaButton')}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
