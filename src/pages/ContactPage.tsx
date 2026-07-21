import React from 'react';
import { Contact } from '../components/Contact';

interface ContactPageProps {
  onOpenMeeting: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenMeeting }) => {
  return <Contact onOpenMeeting={onOpenMeeting} />;
};
