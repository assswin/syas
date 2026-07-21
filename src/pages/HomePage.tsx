import React from 'react';
import { ShieldCheck, Cloud, Cpu, Lock, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Hero } from '../components/Hero';

interface HomePageProps {
  onOpenEstimator: () => void;
  onOpenMeeting: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEstimator, onOpenMeeting }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <Hero onOpenEstimator={onOpenEstimator} onOpenMeeting={onOpenMeeting} />

      

    </div>
  );
};
