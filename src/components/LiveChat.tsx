import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Redirect to WhatsApp API
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "919360537379"; // User's WhatsApp phone number
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-80 rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          {/* Header */}
          <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm">
                  SY
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-emerald-600"></div>
              </div>
              <div>
                <p className="font-semibold text-sm">Syay Support</p>
                <p className="text-xs text-emerald-100">Online • Usually replies in minutes</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-emerald-200 transition-colors p-1 rounded-full hover:bg-emerald-700/50"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages body */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 h-44 overflow-y-auto space-y-3 flex flex-col justify-end">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs text-slate-700 dark:text-slate-200 max-w-[85%] self-start shadow-sm border border-slate-100 dark:border-slate-700/50">
              {t('dashboard.mockChat.intro')}
            </div>
          </div>

          {/* Footer input form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder={t('dashboard.chatPlaceholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-sm transition-colors duration-200 relative group"
        aria-label="Contact support on WhatsApp"
      >
        <span className="absolute -top-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 bg-slate-900 text-white text-xs px-2 py-1 rounded transition-opacity transition-transform duration-200 whitespace-nowrap dark:bg-slate-100 dark:text-slate-900">
          {t('contact.info.whatsapp')}
        </span>
        <MessageSquare size={24} className={isOpen ? 'hidden' : 'block'} />
        <X size={24} className={isOpen ? 'block' : 'hidden'} />
      </button>
    </div>
  );
};
