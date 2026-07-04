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

  if (!isOpen) return null;

  // Generate next 6 weekdays (excluding Sunday for professionalism)
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 8; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      // Skip Sundays (0)
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
    if (!selectedDate || !selectedTime || !name || !email) return;
    
    // Save to cumulative scoping inquiries list
    const inquiry = {
      name,
      email,
      phone: phone || 'None',
      service: 'Strategy Call Booking',
      budget: 'N/A',
      message: `Strategy call scheduled for ${selectedTime} on ${selectedDate}`,
      fileAttached: 'None',
      date: new Date().toLocaleString()
    };
    
    // Post data to Node.js / MySQL backend
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    }).then(res => {
      if(res.ok) setIsSuccess(true);
    }).catch(err => console.error("Error sending to database:", err));
    
    // Post data to Microsoft Excel / Google Sheets Webhook pipeline (if configured)
    const BOOKING_WEBHOOK_URL = import.meta.env.VITE_BOOKING_WEBHOOK_URL || "";
    if (BOOKING_WEBHOOK_URL) {
      fetch(BOOKING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      }).catch(err => console.error("Error sending to database:", err));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-modal border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto font-sans">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-8 py-16 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-850 dark:text-white">
              We connect Shortly
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-indigo-600 dark:text-indigo-400" size={22} />
                {t('meeting.title')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('meeting.subtitle')}
              </p>
            </div>

            {/* Date selection */}
            <div>
              <label className="text-xs font-semibold text-slate-400 dark:text-slate-450 uppercase tracking-wider block mb-2">
                {t('meeting.selectDate')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {getNextDates().map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setSelectedDate(date.value)}
                    className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all text-center ${
                      selectedDate === date.value
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300'
                        : 'border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 text-slate-650 dark:text-slate-300'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            {selectedDate && (
              <div>
                <label className="text-xs font-semibold text-slate-400 dark:text-slate-450 uppercase tracking-wider block mb-2">
                  {t('meeting.selectTime')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 ${
                        selectedTime === time
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300'
                          : 'border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 text-slate-650 dark:text-slate-300'
                      }`}
                    >
                      <Clock size={12} />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form details */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 dark:text-slate-450 uppercase tracking-wider block mb-1">
                  {t('contact.form.name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 dark:text-slate-450 uppercase tracking-wider block mb-1">
                  {t('contact.form.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 dark:text-slate-450 uppercase tracking-wider block mb-1">
                  Client Phone No
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99999 99999"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !name || !email || !phone}
              className="w-full bg-indigo-600 text-white font-medium text-sm py-3.5 rounded-2xl hover:bg-indigo-750 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-800 dark:disabled:text-slate-600 transition-all duration-300"
            >
              {t('meeting.confirm')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
