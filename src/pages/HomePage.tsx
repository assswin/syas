import React from 'react';
import { Hero } from '../components/Hero';

interface HomePageProps {
  onOpenEstimator: () => void;
  onOpenMeeting: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEstimator, onOpenMeeting }) => {
  

  return (
    <div className="flex flex-col">
      <Hero onOpenEstimator={onOpenEstimator} onOpenMeeting={onOpenMeeting} />
    </div>
  );
};
