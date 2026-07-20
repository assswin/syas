import React, { useState } from 'react';
import { ChevronDown, Heart, Award, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TeamFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqItems = (t('faq.items') as unknown as any[]) || [];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const values = [
    { icon: <Star className="text-indigo-600 dark:text-indigo-400" size={20} />, title: "Absolute Transparency", desc: "We provide line-item quotes and continuous build reviews so you always know what you are paying for." },
    { icon: <Heart className="text-indigo-600 dark:text-indigo-400" size={20} />, title: "Trust Over Speed", desc: "We build systems correctly the first time. We write clean, linted code and provide comprehensive manual checks." },
    { icon: <Award className="text-indigo-600 dark:text-indigo-400" size={20} />, title: "Intellectual Integrity", desc: "You own 100% of your repository. We do not engage in licensing locks or host codes hostage." }
  ];

  const timelineEvents = [
    { year: "2024", title: "Studio Founded", desc: "A group of senior engineers launched Syay to replace traditional agency opacity with clear development tracking." },
    { year: "2025", title: "50+ Successful Launches", desc: "Migrated over 40 traditional businesses onto modern serverless, React, and cloud structures." },
    { year: "2026", title: "Automated Workspaces", desc: "Integrated automated customer support engines and real-time client trackers directly into our delivery portals." }
  ];

  return (
    <section id="about" className="py-24 transition-colors font-sans text-left relative">
      <div className="gradient-divider"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* About & Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Who we are & Mission */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
              Who We Are
            </span>
            <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white leading-tight">
              An Engineering-First Studio Dedicated to Your Long-Term Success
            </h2>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
              We started Syay Labs because we were tired of seeing digital agencies charge astronomical retainers while keeping clients in the dark. We believe software engineering should be collaborative, predictable, and fully visible.
            </p>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
              Our mission is to help growing enterprises automate operations, scale client interactions, and engineer proprietary digital assets. We act as your technology partner, translating business goals into clean code.
            </p>

            {/* Timeline */}
            <div className="pt-6 border-t border-slate-150 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Company Timeline</h3>
              <div className="relative pl-4 border-l border-slate-200 dark:border-slate-800 space-y-4">
                {timelineEvents.map((ev, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 border border-white dark:border-slate-900"></div>
                    <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 block">{ev.year}</span>
                    <span className="text-xs font-bold text-slate-850 dark:text-white block mt-0.5">{ev.title}</span>
                    <span className="text-[10px] text-slate-450 dark:text-slate-450 leading-normal block mt-0.5">{ev.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
              Our Values
            </span>
            <h2 className="text-2xl font-extrabold text-slate-850 dark:text-white leading-tight">
              The Principles That Guide Every Single Line of Code We Write
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, idx) => (
                <div 
                  key={idx} 
                  className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-150/70 dark:border-slate-800/80 rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shadow-slate-700/10 mb-4">
                    {val.icon}
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-850 dark:text-white">
                    {val.title}
                  </h3>
                  <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed mt-2">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div id="faq" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 border-t border-slate-150 dark:border-slate-800">
          {/* FAQ title */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white leading-tight">
              {t('faq.title')}
            </h2>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Accordion log */}
          <div className="lg:col-span-8 space-y-3">
            {faqItems.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full p-4 text-left flex items-center justify-between text-slate-850 dark:text-white transition-colors ${isOpen ? 'bg-slate-50/50 dark:bg-slate-800/50' : 'hover:bg-slate-50/30 dark:hover:bg-slate-800/30'}`}
                  >
                    <span className="text-xs font-bold">{faq.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-slate-400 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-550 dark:text-slate-350 leading-relaxed border-t border-slate-200/30 dark:border-slate-700/30 bg-white/20 dark:bg-slate-900/20">
                      <p className="mt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
