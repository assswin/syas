import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, DollarSign, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CostEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [service, setService] = useState('web-dev');
  const [complexity, setComplexity] = useState('medium');
  const [platform, setPlatform] = useState('web');
  const [timeline, setTimeline] = useState('standard');
  
  // Lead info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    // Basic Pricing Logic
    let basePrice = 2500;
    
    // Service base costs
    if (service === 'web-dev') basePrice = 2500;
    else if (service === 'web-apps') basePrice = 5000;
    else if (service === 'mobile-apps') basePrice = 6000;
    else if (service === 'ai-solutions') basePrice = 8000;
    else if (service === 'automation') basePrice = 2000;

    // Complexity factor
    let complexityMultiplier = 1.0;
    if (complexity === 'simple') complexityMultiplier = 0.8;
    else if (complexity === 'medium') complexityMultiplier = 1.2;
    else if (complexity === 'complex') complexityMultiplier = 2.0;

    let cost = basePrice * complexityMultiplier;

    // Platform additions
    if (platform === 'mobile') cost += 1000;
    else if (platform === 'both') cost = cost * 1.35;

    // Timeline modifier
    if (timeline === 'fast') cost = cost * 1.25; // +25% rush charge
    else if (timeline === 'flexible') cost = cost * 0.9; // -10% discount

    setEstimatedPrice(Math.round(cost));
  }, [service, complexity, platform, timeline]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Save lead detail
    const lead = {
      name,
      email,
      details,
      service,
      complexity,
      platform,
      timeline,
      estimate: estimatedPrice,
      date: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('lead_estimate_inquiry', JSON.stringify(lead));
    setIsSuccess(true);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto font-sans border border-white/80 dark:border-white/10">
        
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
              <CheckCircle2 size={44} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {t('estimator.leadForm.success')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-350 max-w-md leading-relaxed">
              We have received your estimate of <span className="font-extrabold text-emerald-500 text-sm">${estimatedPrice.toLocaleString()}</span>. A software architect will review your project requirements and reach out via email.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setName('');
                setEmail('');
                setDetails('');
                onClose();
              }}
              className="mt-6 glow-btn w-full max-w-xs py-3.5 rounded-2xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-full min-h-[520px]">
            {/* Form Side */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Calculator size={18} />
                  </div>
                  {t('estimator.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('estimator.subtitle')}
                </p>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-200/60 dark:bg-slate-800 h-2 rounded-full mt-5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Steps Content */}
              <div className="my-6 space-y-4">
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.service')}
                      </label>
                      <select 
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 text-xs glass-input rounded-2xl font-bold"
                      >
                        <option value="web-dev">Website Development</option>
                        <option value="web-apps">Web Application / Portal</option>
                        <option value="mobile-apps">iOS / Android Mobile App</option>
                        <option value="ai-solutions">AI & Machine Learning Integration</option>
                        <option value="automation">Process Automation / API Flow</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.complexity')}
                      </label>
                      <div className="space-y-2">
                        {['simple', 'medium', 'complex'].map((level) => (
                          <label 
                            key={level}
                            className={`flex items-start p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              complexity === level 
                                ? 'glass-card border-indigo-500/60 bg-indigo-500/10 shadow-glow-indigo'
                                : 'glass-card hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="complexity" 
                              value={level}
                              checked={complexity === level}
                              onChange={() => setComplexity(level)}
                              className="mt-1 mr-3 accent-indigo-600"
                            />
                            <div className="text-left">
                              <p className="text-xs font-black text-slate-900 dark:text-white capitalize">{level}</p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {t(`estimator.complexityOptions.${level}`)}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.platforms')}
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {['web', 'mobile', 'both'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setPlatform(item)}
                            className={`py-3 px-2 text-xs font-black rounded-2xl border transition-all text-center ${
                              platform === item
                                ? 'glow-btn shadow-md'
                                : 'glass-card text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
                            }`}
                          >
                            {t(`estimator.platformOptions.${item}`)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.timeline')}
                      </label>
                      <div className="space-y-2">
                        {['fast', 'standard', 'flexible'].map((time) => (
                          <label 
                            key={time}
                            className={`flex items-center p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              timeline === time 
                                ? 'glass-card border-indigo-500/60 bg-indigo-500/10 shadow-glow-indigo'
                                : 'glass-card hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="timeline" 
                              value={time}
                              checked={timeline === time}
                              onChange={() => setTimeline(time)}
                              className="mr-3 accent-indigo-600"
                            />
                            <div className="text-left">
                              <p className="text-xs font-black text-slate-900 dark:text-white">
                                {t(`estimator.timelineOptions.${time}`)}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-3.5 animate-fade-in">
                    <p className="text-xs text-slate-600 dark:text-slate-350">
                      {t('estimator.leadForm.desc')}
                    </p>
                    
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2.5 text-xs glass-input rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-2.5 text-xs glass-input rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        rows={2}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Include third-party syncs, features, etc."
                        className="w-full px-4 py-2.5 text-xs glass-input rounded-xl font-bold"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200/60 dark:border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center text-xs font-black text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="glow-btn px-6 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    Next <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!name || !email}
                    className="glow-btn px-6 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {t('estimator.leadForm.submit')} <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Pricing Result */}
            <div className="w-full md:w-64 glass-pill p-6 md:p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-200/60 dark:border-slate-800 text-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                {t('estimator.steps.result')}
              </span>
              
              <div className="flex items-center text-4xl font-black text-slate-900 dark:text-white my-3 gradient-text">
                <DollarSign size={28} className="text-indigo-500 -mt-2" />
                <span>{estimatedPrice.toLocaleString()}</span>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[180px]">
                Calculated ranges represent guidelines. Exact scope quotes will be verified by proposal reviews.
              </p>

              {/* Quick specs overview */}
              <div className="w-full text-left mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 uppercase">{service.replace('-',' ')}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-400">Scale:</span>
                  <span className="text-slate-700 dark:text-slate-200 uppercase">{complexity}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-400">Platform:</span>
                  <span className="text-slate-700 dark:text-slate-200 uppercase">{platform}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-400">Speed:</span>
                  <span className="text-slate-700 dark:text-slate-200 uppercase">{timeline}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

