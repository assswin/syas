import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useDevToolsGuard } from './hooks/useDevToolsGuard';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { TeamFAQ } from './components/TeamFAQ';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Modals & Chat
import { CostEstimator } from './components/CostEstimator';
import { BookMeetingModal } from './components/BookMeetingModal';
import { ClientDashboard } from './components/ClientDashboard';
import { LiveChat } from './components/LiveChat';

// Icons for Trust banner
import { ShieldCheck, Cloud, Cpu, Lock, Globe } from 'lucide-react';

const MainApp: React.FC = () => {
  useDevToolsGuard();
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  
  // Modal states
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  
  const [currentSection, setCurrentSection] = useState('home');

  // Estimator inquiring with specific service pre-selection
  const handleInquireService = (_serviceId: string) => {
    setIsEstimatorOpen(true);
  };

  // Scrollspy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'about', 'blog', 'contact'];
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
    <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 relative overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Background Glowing Ambient Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[140px] animate-float"></div>
        <div className="absolute top-2/3 right-[-10%] w-[600px] h-[600px] bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-[150px] animate-float-delayed"></div>
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[130px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <Header 
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />

        {/* Hero section */}
        <Hero 
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenMeeting={() => setIsMeetingOpen(true)}
        />

        {/* Trusted By logo banner */}
        <div className="max-w-7xl mx-auto px-4 w-full my-8">
          <div className="glass-pill rounded-3xl py-6 px-8 transition-all hover:border-indigo-500/30">
            <div className="text-center space-y-4">
              <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t('hero.trustedBy')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-90">
                <span className="font-black text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-400" /> SECURE GUARD
                </span>
                <span className="font-black text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Cloud size={16} className="text-indigo-600 dark:text-indigo-400" /> NEBULA SYSTEM
                </span>
                <span className="font-black text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Cpu size={16} className="text-indigo-600 dark:text-indigo-400" /> KERNEL MATRIX
                </span>
                <span className="font-black text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Lock size={16} className="text-indigo-600 dark:text-indigo-400" /> INTEGRITY DATA
                </span>
                <span className="font-black text-xs tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Globe size={16} className="text-indigo-600 dark:text-indigo-400" /> GLOBAL APEX
                </span>
              </div>
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
                Core Advantages
              </span>
              <h2 className="text-3xl font-black text-slate-850 dark:text-white tracking-tight">
                {t('whyChooseUs.title')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('whyChooseUs.subtitle')}
              </p>
            </div>

            <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {whyChooseUsCards.map((card, idx) => (
                <div 
                  key={idx} 
                  className={`reveal stagger-${idx + 1} p-6 glass-card rounded-3xl group hover:border-indigo-500/40`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-sm mb-4 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-850 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
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

        {/* About & FAQs */}
        <TeamFAQ />

        {/* Blog News Feed */}
        <Blog />

        {/* Contact Form */}
        <Contact 
          onOpenMeeting={() => setIsMeetingOpen(true)}
        />

        {/* Footer layout */}
        <Footer 
          setCurrentSection={setCurrentSection}
        />
      </div>

      {/* Global Interactive Overlays & Modals */}
      <CostEstimator 
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

      <BookMeetingModal 
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
      />

      <ClientDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
      />

      {/* Floating Live Support Chat */}
      <LiveChat />
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

