import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookMeetingModal: React.FC<BookMeetingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const sanitize = (val: string) => val.trim().replace(/<[^>]*>/g, '');

  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 8; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      if (nextDate.getDay() !== 0) {
        const formatted = nextDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const iso = nextDate.toISOString().split('T')[0];
        dates.push({ label: formatted, value: iso });
      }
      
      if (dates.length >= 5) break;
    }
    return dates;
  };

  const timeSlots = [
    "09:30 AM",
    "11:00 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    if (!selectedDate || !selectedTime || !cleanName || !cleanEmail || isSubmitting) return;

    setIsSubmitting(true);

    const inquiry = {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone || 'None',
      service: 'Strategy Call Booking',
      budget: 'N/A',
      message: `Strategy call scheduled for ${sanitize(selectedTime)} on ${sanitize(selectedDate)}`,
      fileAttached: 'None',
      date: new Date().toISOString()
    };
    
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    }).then(res => {
      if (res.ok) setIsSuccess(true);
    }).catch(() => {
      // Suppress raw console errors to prevent DevTools data leaks
    }).finally(() => {
      setIsSubmitting(false);
    });
    
    const BOOKING_WEBHOOK_URL = import.meta.env.VITE_BOOKING_WEBHOOK_URL || "";
    if (BOOKING_WEBHOOK_URL && BOOKING_WEBHOOK_URL !== '/api/bookings') {
      if (window.location.protocol === 'https:' && BOOKING_WEBHOOK_URL.startsWith('http://')) {
        return;
      }
      fetch(BOOKING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      }).catch(() => {});
    }

    setTimeout(() => {
      setIsSuccess(false);
      setSelectedDate('');
      setSelectedTime('');
      setName('');
      setEmail('');
      setPhone('');
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-lg glass-modal border border-white/80 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/60 z-10"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-2 border border-emerald-500/20">
              <CheckCircle size={44} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              We'll Connect Shortly
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your strategy call has been reserved for <span className="font-extrabold text-indigo-500">{selectedTime}</span> on <span className="font-extrabold text-indigo-500">{selectedDate}</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Calendar size={18} />
                </div>
                {t('meeting.title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('meeting.subtitle')}
              </p>
            </div>

            {/* Date selection */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                {t('meeting.selectDate')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {getNextDates().map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setSelectedDate(date.value)}
                    className={`py-2.5 px-1 text-xs font-bold rounded-2xl border transition-all text-center ${
                      selectedDate === date.value
                        ? 'glow-btn shadow-md'
                        : 'glass-card text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            {selectedDate && (
              <div className="animate-fade-in">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                  {t('meeting.selectTime')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3.5 text-xs font-bold rounded-2xl border transition-all flex items-center gap-1.5 ${
                        selectedTime === time
                          ? 'glow-btn shadow-md'
                          : 'glass-card text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
                      }`}
                    >
                      <Clock size={13} />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form details */}
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  {t('contact.form.name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-indigo-500" size={16} />
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-3 text-xs glass-input rounded-2xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  {t('contact.form.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-indigo-500" size={16} />
                  <input
                    type="email"
                    required
                    maxLength={150}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full pl-10 pr-4 py-3 text-xs glass-input rounded-2xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Client Phone No
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 text-indigo-500" size={16} />
                  <input
                    type="tel"
                    required
                    maxLength={30}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99999 99999"
                    className="w-full pl-10 pr-4 py-3 text-xs glass-input rounded-2xl font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !name || !email || !phone || isSubmitting}
              className="glow-btn w-full text-xs font-bold py-4 rounded-2xl cursor-pointer disabled:opacity-50"
            >
              {t('meeting.confirm')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

