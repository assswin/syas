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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-modal border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto font-sans">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('estimator.leadForm.success')}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              We have received your estimate of <span className="font-semibold text-emerald-600 dark:text-emerald-400">${estimatedPrice.toLocaleString()}</span>. A software architect will review your project requirements and reach out via email.
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
              className="mt-6 w-full max-w-xs bg-indigo-600 text-white font-medium text-sm py-3 rounded-2xl hover:bg-indigo-700 transition-all duration-300"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-full min-h-[500px]">
            {/* Form Side */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="text-indigo-600 dark:text-indigo-400" size={22} />
                  {t('estimator.title')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t('estimator.subtitle')}
                </p>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Steps Content */}
              <div className="my-6 space-y-4">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.service')}
                      </label>
                      <select 
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      >
                        <option value="web-dev">Website Development</option>
                        <option value="web-apps">Web Application / Portal</option>
                        <option value="mobile-apps">iOS / Android Mobile App</option>
                        <option value="ai-solutions">AI & Machine Learning Integration</option>
                        <option value="automation">Process Automation / API Flow</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.complexity')}
                      </label>
                      <div className="space-y-2">
                        {['simple', 'medium', 'complex'].map((level) => (
                          <label 
                            key={level}
                            className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${
                              complexity === level 
                                ? 'border-indigo-600 bg-indigo-50/45 dark:border-indigo-550 dark:bg-indigo-950/20'
                                : 'border-slate-150 hover:border-slate-250 dark:border-slate-800 dark:hover:border-slate-700'
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
                              <p className="text-xs font-bold text-slate-850 dark:text-slate-100 capitalize">{level}</p>
                              <p className="text-[11px] text-slate-400 dark:text-slate-450 mt-0.5">
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
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.platforms')}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['web', 'mobile', 'both'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setPlatform(item)}
                            className={`py-3 px-2 text-xs font-bold rounded-xl border transition-all text-center ${
                              platform === item
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-300'
                                : 'border-slate-200 dark:border-slate-800 dark:text-slate-350 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            {t(`estimator.platformOptions.${item}`)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        {t('estimator.steps.timeline')}
                      </label>
                      <div className="space-y-2">
                        {['fast', 'standard', 'flexible'].map((time) => (
                          <label 
                            key={time}
                            className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                              timeline === time 
                                ? 'border-indigo-600 bg-indigo-50/45 dark:border-indigo-550 dark:bg-indigo-950/20'
                                : 'border-slate-150 hover:border-slate-250 dark:border-slate-800 dark:hover:border-slate-700'
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
                              <p className="text-xs font-bold text-slate-850 dark:text-slate-100">
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
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t('estimator.leadForm.desc')}
                    </p>
                    
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        rows={2}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Include third-party syncs, features, etc."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center text-xs font-medium text-slate-500 hover:text-indigo-650 transition-colors"
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!name || !email}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-655 cursor-pointer"
                  >
                    {t('estimator.leadForm.submit')} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Pricing Result */}
            <div className="w-full md:w-60 bg-slate-50 dark:bg-slate-850 p-6 md:p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-150 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-450 uppercase tracking-widest block mb-1">
                {t('estimator.steps.result')}
              </span>
              
              <div className="flex items-center text-3xl font-extrabold text-slate-850 dark:text-white my-3">
                <DollarSign size={24} className="text-indigo-600 dark:text-indigo-400 -mt-2" />
                <span>{estimatedPrice.toLocaleString()}</span>
              </div>

              <p className="text-[10px] text-slate-400 dark:text-slate-450 leading-relaxed max-w-[180px]">
                Calculated ranges represent guidelines. Exact scope quotes will be verified by proposal reviews.
              </p>

              {/* Quick specs overview */}
              <div className="w-full text-left mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Service:</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold uppercase">{service.replace('-',' ')}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Scale:</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold uppercase">{complexity}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Platform:</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold uppercase">{platform}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Speed:</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold uppercase">{timeline}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
