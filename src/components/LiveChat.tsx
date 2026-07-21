import React, { useState } from 'react';
import { MessageCircle, X, PhoneCall } from 'lucide-react';

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const WHATSAPP_PHONE = '919360537379'; // Syay Labs WhatsApp support

  const handleStartWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(userMsg.trim() || 'Hi Syay Labs team, I would like to inquire about building software.');
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 font-sans sm:bottom-24">
      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="mb-4 w-80 glass-modal rounded-3xl shadow-2xl overflow-hidden border border-white/80 dark:border-white/10 animate-fade-in text-left">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-black text-sm border border-white/30">
                  SL
                </div>
                <span className="w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-600 rounded-full absolute bottom-0 right-0"></span>
              </div>
              <div>
                <h4 className="text-xs font-black">Syay Support Team</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span>● Online on WhatsApp</span>
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <div className="p-3.5 glass-card rounded-2xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed border border-emerald-500/20">
              👋 Hello! Need quick answers regarding pricing, project specs, or strategy calls? Message us directly on WhatsApp for instant assistance!
            </div>

            <form onSubmit={handleStartWhatsApp} className="space-y-3 pt-1">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-3.5 py-2.5 text-xs glass-input rounded-xl font-bold"
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <PhoneCall size={14} />
                <span>Start WhatsApp Chat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glow-btn p-4 rounded-full shadow-2xl flex items-center justify-center text-white border border-white/40 group hover:scale-110 transition-transform cursor-pointer"
        aria-label="Open Live Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
};
