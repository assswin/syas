import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Upload, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  selectedPlanName?: string;
  onOpenMeeting: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenMeeting }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('web-dev');
  const [budget, setBudget] = useState('5k-10k');
  const [message, setMessage] = useState('');
  const [fileAttachment, setFileAttachment] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sanitize = (val: string) => val.trim().replace(/<[^>]*>/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    if (!cleanName || !cleanEmail || isSubmitting) return;

    setIsSubmitting(true);

    const inquiry = {
      name: cleanName,
      email: cleanEmail,
      phone: sanitize(phone),
      service: sanitize(service),
      budget: sanitize(budget),
      message: sanitize(message),
      fileAttached: fileAttachment ? sanitize(fileAttachment) : 'None',
      date: new Date().toISOString()
    };
    
    fetch('/api/leads', {
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
    
    const EXCEL_WEBHOOK_URL = import.meta.env.VITE_EXCEL_WEBHOOK_URL || "";
    if (EXCEL_WEBHOOK_URL && EXCEL_WEBHOOK_URL !== '/api/leads') {
      if (window.location.protocol === 'https:' && EXCEL_WEBHOOK_URL.startsWith('http://')) {
        return;
      }
      fetch(EXCEL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      }).catch(() => {});
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setFileAttachment(sanitize(fileName));
    }
  };

  return (
    <section id="contact" className="pt-6 pb-24 transition-colors font-sans text-left relative sm:pt-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form (Col Span 7) */}
          <div className="lg:col-span-7 glass-card p-7 md:p-9 rounded-3xl border border-white/80 dark:border-white/10 shadow-2xl">
            {isSuccess ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-2 border border-emerald-500/20">
                  <CheckCircle size={44} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  We'll Connect Shortly
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Thank you! Our engineering team has received your inquiry and will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {t('contact.title')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-350">
                    {t('contact.subtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 text-xs glass-input rounded-2xl"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={150}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 text-xs glass-input rounded-2xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      maxLength={30}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99999 99999"
                      className="w-full px-4 py-3 text-xs glass-input rounded-2xl"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                      {t('contact.form.service')}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 text-xs glass-input rounded-2xl"
                    >
                      <option value="web-dev">Website Development</option>
                      <option value="web-apps">Web Applications / SaaS</option>
                      <option value="mobile-apps">Mobile iOS & Android Apps</option>
                      <option value="ui-ux">UI/UX Interface Prototyping</option>
                      <option value="ai-solutions">AI & Machine Learning Solutions</option>
                      <option value="automation">API Integration & Automation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {t('contact.form.budget')}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 text-xs glass-input rounded-2xl"
                  >
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="over-25k">$25,000+ (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us details about what you want to construct, third-party services, and targets..."
                    className="w-full px-4 py-3 text-xs glass-input rounded-2xl"
                  />
                </div>

                {/* Brief upload input */}
                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {t('contact.form.upload')}
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500/40 cursor-pointer">
                      <Upload size={14} className="text-indigo-500" />
                      Choose file
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                    {fileAttachment ? (
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-xl border border-indigo-500/30">
                        <FileText size={14} />
                        {fileAttachment}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">No brief uploaded</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glow-btn w-full text-xs font-bold py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{t('contact.form.submit')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Sidebar Coordinate (Col Span 5) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
                Direct Contact
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Let's Construct Something Sustainable
              </h2>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${t('contact.info.email')}`}
                  className="glass-card flex items-center gap-4 p-4 rounded-2xl text-slate-800 dark:text-slate-200 hover:border-indigo-500/40"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-black block uppercase">Email Support</span>
                    <span className="text-xs font-extrabold">{t('contact.info.email')}</span>
                  </div>
                </a>

                <a 
                  href={`tel:${t('contact.info.phone')}`}
                  className="glass-card flex items-center gap-4 p-4 rounded-2xl text-slate-800 dark:text-slate-200 hover:border-indigo-500/40"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-black block uppercase">Phone / Callback</span>
                    <span className="text-xs font-extrabold">{t('contact.info.phone')}</span>
                  </div>
                </a>

                <div className="glass-card flex items-center gap-4 p-4 rounded-2xl text-slate-800 dark:text-slate-200">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-black block uppercase">{t('contact.info.office')}</span>
                    <span className="text-xs font-extrabold">{t('contact.info.location')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized CSS Map block */}
            <div className="p-6 glass-card rounded-3xl text-left font-mono text-slate-300 relative overflow-hidden h-48 border border-white/80 dark:border-white/10">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 space-y-2.5 text-[11px]">
                <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-2">
                  <span className="text-indigo-400 font-bold uppercase">Syay Coordinate</span>
                  <span className="text-emerald-400 font-bold">● SYSTEM STABLE</span>
                </div>
                <p>&gt; Chennai Engineering Hub</p>
                <p className="text-cyan-400">&gt; LAT: 37.3382° N | LONG: 121.8863° W</p>
                
                <button
                  type="button"
                  onClick={onOpenMeeting}
                  className="mt-3 glow-btn px-4 py-2 rounded-xl text-[11px] font-bold block font-sans"
                >
                  Schedule Strategy Meeting
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

