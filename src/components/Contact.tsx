import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Upload, FileText, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  selectedPlanName?: string;
  onOpenMeeting: () => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedPlanName, onOpenMeeting }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('web-dev');
  const [budget, setBudget] = useState('5k-10k');
  const [message, setMessage] = useState('');
  const [fileAttachment, setFileAttachment] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Save lead query
    const inquiry = {
      name,
      email,
      phone,
      service,
      budget,
      message,
      fileAttached: fileAttachment || 'None',
      date: new Date().toLocaleString()
    };
    
    // Post data to Node.js / MySQL backend
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry)
    }).then(res => {
      if(res.ok) setIsSuccess(true);
    }).catch(err => console.error("Error sending to database:", err));
    
    // Post data to Microsoft Excel / Google Sheets Webhook pipeline (if configured)
    const EXCEL_WEBHOOK_URL = import.meta.env.VITE_EXCEL_WEBHOOK_URL || "";
    if (EXCEL_WEBHOOK_URL) {
      fetch(EXCEL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      }).catch(err => console.error("Error sending to Excel database:", err));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttachment(e.target.files[0].name);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors font-sans text-left relative">
      <div className="gradient-divider"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form (Col Span 7) */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl">
            {isSuccess ? (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-2 animate-bounce">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-xl font-bold text-slate-850 dark:text-white">
                  We connect Shortly
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-850 dark:text-white">
                    {t('contact.title')}
                  </h3>
                  <p className="text-xs text-slate-455 dark:text-slate-450">
                    {t('contact.subtitle')}
                  </p>
                </div>

                {selectedPlanName && (
                  <div className="p-3 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-705 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/50">
                    Inquiring about plan: <span className="underline">{selectedPlanName}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99999 99999"
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {t('contact.form.service')}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {t('contact.form.budget')}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  >
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="over-25k">$25,000+ (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us details about what you want to construct, third-party services, and targets..."
                    className="w-full px-3.5 py-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>

                {/* Brief upload input */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {t('contact.form.upload')}
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-250 dark:border-slate-800 text-slate-655 dark:text-slate-350 bg-white dark:bg-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                      <Upload size={14} />
                      Choose file
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                    {fileAttachment ? (
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5 bg-indigo-50/50 dark:bg-indigo-950/20 px-3 py-1.5 rounded-xl">
                        <FileText size={13} className="text-indigo-650" />
                        {fileAttachment}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-450">No brief uploaded</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  <Send size={14} />
                  <span>{t('contact.form.submit')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Sidebar Coordinate (Col Span 5) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full border border-indigo-100/50">
                Contact Info
              </span>
              <h2 className="text-2xl font-extrabold text-slate-850 dark:text-white leading-tight">
                Let's Construct Something Sustainable
              </h2>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${t('contact.info.email')}`}
                  className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-slate-850/50 border border-slate-150 dark:border-slate-800 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-205"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-indigo-650 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Email Support</span>
                    <span className="text-xs font-bold">{t('contact.info.email')}</span>
                  </div>
                </a>

                <a 
                  href={`tel:${t('contact.info.phone')}`}
                  className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-slate-850/50 border border-slate-150 dark:border-slate-800 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-205"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-indigo-650 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Phone / Callback</span>
                    <span className="text-xs font-bold">{t('contact.info.phone')}</span>
                  </div>
                </a>

                <div 
                  className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-slate-850/50 border border-slate-150 dark:border-slate-800 rounded-2xl text-slate-700 dark:text-slate-205"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-indigo-655 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">{t('contact.info.office')}</span>
                    <span className="text-xs font-bold">{t('contact.info.location')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized CSS Google Map block */}
            <div className="p-6 bg-slate-900 border border-slate-850 dark:bg-slate-950 dark:border-slate-900 rounded-3xl text-left font-mono text-slate-400 relative overflow-hidden h-44">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 space-y-2 text-[10px]">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-indigo-400 font-bold uppercase">Syay coordinate</span>
                  <span className="text-slate-500">SYSTEM STABLE</span>
                </div>
                <p>&gt; Chennai</p>
                <p className="text-emerald-450">&gt; LAT: 37.3382° N | LONG: 121.8863° W</p>
                <p>&gt; Meeting Scopes: Available weekdays</p>
                
                <button
                  type="button"
                  onClick={onOpenMeeting}
                  className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold px-4 py-2 rounded-xl text-[10px] block w-fit border border-indigo-500/20 transition-all"
                >
                  Schedule in-office meeting
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
