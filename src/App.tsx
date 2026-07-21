import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { useDevToolsGuard } from './hooks/useDevToolsGuard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Modals & Chat
import { CostEstimator } from './components/CostEstimator';
import { BookMeetingModal } from './components/BookMeetingModal';
import { ClientDashboard } from './components/ClientDashboard';
import { LiveChat } from './components/LiveChat';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

const getSectionFromPath = (pathname: string) => {
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
};

const MainApp: React.FC = () => {
  useDevToolsGuard();
  const location = useLocation();
  const navigate = useNavigate();

  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(getSectionFromPath(location.pathname));

  const handleInquireService = (_serviceId: string) => {
    setIsEstimatorOpen(true);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const route = section === 'home' ? '/home' : `/${section}`;
    navigate(route);
  };

  useEffect(() => {
    setCurrentSection(getSectionFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-transparent font-sans text-slate-900 transition-colors duration-300 dark:text-slate-100">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[140px] animate-float dark:bg-indigo-600/20"></div>
        <div className="absolute top-2/3 right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-500/15 blur-[150px] animate-float-delayed dark:bg-purple-600/20"></div>
        <div className="absolute bottom-10 left-1/3 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[130px] dark:bg-cyan-500/15"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col pb-24 sm:pb-28">
        <Header
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <HomePage
                  onOpenEstimator={() => setIsEstimatorOpen(true)}
                  onOpenMeeting={() => setIsMeetingOpen(true)}
                />
              }
            />
            <Route path="/services" element={<ServicesPage onInquire={handleInquireService} />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage onOpenMeeting={() => setIsMeetingOpen(true)} />} />
          </Routes>
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>

      <CostEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
      <BookMeetingModal isOpen={isMeetingOpen} onClose={() => setIsMeetingOpen(false)} />
      <ClientDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />
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

