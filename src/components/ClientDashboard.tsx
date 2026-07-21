import React, { useState } from 'react';
import { X, CheckCircle, Clock, FileText, Send, Download, Layers, ShieldCheck, UserCheck } from 'lucide-react';

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'files'>('overview');

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Lead Architect (Syay)', text: 'Hello! Sprint 2 features are currently deployed to the staging environment for review.', time: '10:14 AM' },
    { id: 2, sender: 'You', text: 'Looks great! Are the API webhooks included in this release?', time: '10:30 AM' },
    { id: 3, sender: 'Lead Architect (Syay)', text: 'Yes, both Stripe payment callbacks and Excel auto-log endpoints are active.', time: '10:32 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'You', text: inputMsg, time: 'Just now' }
    ]);
    setInputMsg('');
  };

  const projectMilestones = [
    { title: "Discovery & Architecture Blueprint", date: "Oct 12, 2025", status: "completed", desc: "Line-item specs, DB schema design, and tech stack approval." },
    { title: "UI/UX High-Fidelity Prototypes", date: "Oct 28, 2025", status: "completed", desc: "Interactive Figma flows and glassmorphism UI system." },
    { title: "Core Web & API Integrations", date: "Nov 15, 2025", status: "in-progress", desc: "Staging deployment, webhook triggers, and client dashboard integration." },
    { title: "QA Testing & Manual Code Audit", date: "Nov 30, 2025", status: "upcoming", desc: "Zero error check, security vulnerability scan, and performance audit." },
    { title: "Production Deployment & Handover", date: "Dec 10, 2025", status: "upcoming", desc: "100% Repository transfer and live server domain DNS linking." }
  ];

  const projectFiles = [
    { name: "Syay_Labs_Architecture_Blueprint.pdf", size: "3.4 MB", date: "Oct 14, 2025" },
    { name: "Database_Schema_v2.sql", size: "840 KB", date: "Oct 22, 2025" },
    { name: "Staging_Environment_Access_Keys.txt", size: "12 KB", date: "Nov 02, 2025" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-4xl glass-modal rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/80 dark:border-white/10 text-left">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-800 flex justify-between items-center bg-indigo-500/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Syay Client Portal
                </h3>
                <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  ACTIVE SPRINT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Project Code: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">#SYAY-8942</span> • Client: <span className="font-bold text-slate-700 dark:text-slate-200">Acme Enterprise</span>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/60"
          >
            <X size={20} />
          </button>
        </div>

        {/* Portal Tabs Bar */}
        <div className="flex border-b border-slate-200/60 dark:border-slate-800 px-6 bg-slate-100/30 dark:bg-slate-900/40">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers size={15} />
            Sprint Overview
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3.5 px-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck size={15} />
            Direct Team Feed
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`py-3.5 px-4 text-xs font-extrabold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'files'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText size={15} />
            Repository Assets ({projectFiles.length})
          </button>
        </div>

        {/* Portal Content Scroll Area */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Progress metric banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 glass-card rounded-2xl border border-indigo-500/20">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Current Progress</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 gradient-text">65% Delivered</p>
                </div>
                <div className="p-5 glass-card rounded-2xl border border-emerald-500/20">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Target Completion</span>
                  <p className="text-xl font-black text-slate-900 dark:text-white mt-1">Dec 10, 2025</p>
                </div>
                <div className="p-5 glass-card rounded-2xl border border-cyan-500/20">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Staging Status</span>
                  <p className="text-xl font-black text-emerald-500 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    ONLINE 100%
                  </p>
                </div>
              </div>

              {/* Milestones timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Development Milestones
                </h4>
                <div className="space-y-3">
                  {projectMilestones.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl glass-card border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                        m.status === 'completed'
                          ? 'border-emerald-500/20 bg-emerald-500/5'
                          : m.status === 'in-progress'
                          ? 'border-indigo-500/40 bg-indigo-500/10 shadow-glow-indigo'
                          : 'border-slate-200/50 dark:border-slate-800'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {m.status === 'completed' && <CheckCircle size={16} className="text-emerald-500" />}
                          {m.status === 'in-progress' && <Clock size={16} className="text-indigo-500 animate-spin" />}
                          {m.status === 'upcoming' && <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>}
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">{m.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-6">{m.desc}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400 mt-2 sm:mt-0 pl-6 sm:pl-0">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[400px] justify-between space-y-4 animate-fade-in">
              <div className="space-y-3 overflow-y-auto pr-2 flex-1">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] font-black text-slate-400 mb-1">{msg.sender} • {msg.time}</span>
                    <div 
                      className={`p-3.5 rounded-2xl text-xs max-w-sm ${
                        msg.sender === 'You'
                          ? 'glow-btn text-white'
                          : 'glass-card text-slate-800 dark:text-slate-200 border border-indigo-500/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <input 
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type message to lead architect..."
                  className="flex-1 px-4 py-3 text-xs glass-input rounded-2xl font-bold"
                />
                <button 
                  type="submit"
                  className="glow-btn px-5 rounded-2xl text-xs font-bold flex items-center justify-center cursor-pointer"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* FILES TAB */}
          {activeTab === 'files' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Project Documentation & Specs
              </h4>
              <div className="space-y-3">
                {projectFiles.map((file, idx) => (
                  <div key={idx} className="p-4 glass-card rounded-2xl border border-slate-200/60 dark:border-slate-800 flex justify-between items-center hover:border-indigo-500/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white">{file.name}</p>
                        <p className="text-[10px] text-slate-400">{file.size} • Uploaded {file.date}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading ${file.name}`)}
                      className="p-2.5 glass-card rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
