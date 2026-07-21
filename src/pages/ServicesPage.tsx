import React from 'react';
import { Services } from '../components/Services';
import { Process } from '../components/Process';

interface ServicesPageProps {
  onInquire: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onInquire }) => {
  return (
    <div className="flex flex-col">
      <Services onInquire={onInquire} />
      <Process />
    </div>
  );
};
