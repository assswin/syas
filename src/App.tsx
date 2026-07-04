import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { ParallaxBackground } from './components/ParallaxBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { TeamFAQ } from './components/TeamFAQ';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Modals & Chat
import { CostEstimator } from './components/CostEstimator';
import { BookMeetingModal } from './components/BookMeetingModal';

// Icons for Trust banner
import { ShieldCheck, Cloud, Cpu, Lock, Globe } from 'lucide-react';

const MainApp: React.FC = () => {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  
  // Modal states
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  
  // Lead routing states
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [currentSection, setCurrentSection] = useState('home');

  // Plan selection action
  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Estimator inquiring with specific service pre-selection
  const handleInquireService = (_serviceId: string) => {
    setIsEstimatorOpen(true);
  };

  // Simple scrollspy to track active header section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'about', 'pricing', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whyChooseUsCards = (t('whyChooseUs.cards') as unknown as any[]) || [];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-100 relative">
      <ParallaxBackground />
      
      {/* Navigation Header */}
      <Header 
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* Hero section */}
      <Hero 
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenMeeting={() => setIsMeetingOpen(true)}
      />

      {/* Trusted By logo banner */}
      <div className="glass-pill py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
            {t('hero.trustedBy')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-90">
            <span className="font-extrabold text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5"><ShieldCheck size={14} className="text-indigo-600 dark:text-indigo-400" /> SECURE GUARD</span>
            <span className="font-extrabold text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5"><Cloud size={14} className="text-indigo-600 dark:text-indigo-400" /> NEBULA SYSTEM</span>
            <span className="font-extrabold text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5"><Cpu size={14} className="text-indigo-600 dark:text-indigo-400" /> KERNEL MATRIX</span>
            <span className="font-extrabold text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5"><Lock size={14} className="text-indigo-600 dark:text-indigo-400" /> INTEGRITY DATA</span>
            <span className="font-extrabold text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5"><Globe size={14} className="text-indigo-600 dark:text-indigo-400" /> GLOBAL APEX</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <Services onInquire={handleInquireService} />

      {/* Why Choose Us */}
      <section className="py-24 transition-colors relative">
        <div className="gradient-divider"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
              {t('whyChooseUs.title')}
            </h2>
            <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
              {t('whyChooseUs.subtitle')}
            </p>
          </div>

          <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {whyChooseUsCards.map((card, idx) => (
              <div 
                key={idx} 
                className={`reveal stagger-${idx + 1} p-6 glass-card rounded-3xl premium-card`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs mb-4 neu-raised">
                  {idx + 1}
                </div>
                <h3 className="text-xs font-bold text-slate-850 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-2.5 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Stepper */}
      <Process />

      {/* Portfolio Projects Grid */}
      <Portfolio />

      {/* Pricing Cards */}
      <Pricing 
        onSelectPlan={handleSelectPlan}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />

      {/* About & FAQs */}
      <TeamFAQ />

      {/* Blog News Feed */}
      <Blog />

      {/* Contact Form */}
      <Contact 
        selectedPlanName={selectedPlan}
        onOpenMeeting={() => setIsMeetingOpen(true)}
      />

      {/* Footer layout */}
      <Footer 
        setCurrentSection={setCurrentSection}
      />

      {/* Global Interactive overlays */}
      <CostEstimator 
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />



      <BookMeetingModal 
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
      />

    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
