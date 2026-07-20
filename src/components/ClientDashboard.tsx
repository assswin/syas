import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Clock, Send, Upload, FileText, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'client' | 'agent';
  text: string;
  time: string;
}

interface ProjectFile {
  name: string;
  size: string;
  uploadedAt: string;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  


  // Project state
  const [chatMessage, setChatMessage] = useState('');
  const [chatList, setChatList] = useState<Message[]>(() => {
    const saved = localStorage.getItem('client_dashboard_chat');
    if (saved) return JSON.parse(saved);
    return [
      { sender: 'agent', text: t('dashboard.mockChat.intro'), time: '10:00 AM' }
    ];
  });

  const [uploadedFiles, setUploadedFiles] = useState<ProjectFile[]>(() => {
    const saved = localStorage.getItem('client_dashboard_files');
    if (saved) return JSON.parse(saved);
    return [
      { name: "Brand_Guidelines_v2.pdf", size: "3.4 MB", uploadedAt: "June 20, 2026" },
      { name: "Product_Catalog_Export.csv", size: "480 KB", uploadedAt: "June 25, 2026" }
    ];
  });

  const activeMilestone = 3; // Frontend development

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('client_dashboard_chat', JSON.stringify(chatList));
  }, [chatList]);

  useEffect(() => {
    localStorage.setItem('client_dashboard_files', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  if (!isOpen) return null;



  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg: Message = {
      sender: 'client',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatList(prev => [...prev, newMsg]);
    setChatMessage('');

    // Trigger coordinator automated reply after 1s
    setTimeout(() => {
      const coordinatorReply: Message = {
        sender: 'agent',
        text: t('dashboard.mockChat.response'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatList(prev => [...prev, coordinatorReply]);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFile: ProjectFile = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      setUploadedFiles(prev => [newFile, ...prev]);
      alert(t('dashboard.uploadSuccess'));
    }
  };

  const milestones = [
    { id: 1, title: "Requirement Discussion & Proposal", desc: "Detailed timeline mapping and quotes confirmation.", status: "completed" },
    { id: 2, title: "UI/UX Wireframes & Sign-off", desc: "Interactive Figma prototyping and reviews.", status: "completed" },
    { id: 3, title: "Frontend Implementation", desc: "Coding of React layout components and views.", status: "current" },
    { id: 4, title: "Backend Systems Integration", desc: "Database connections, secure APIs development.", status: "pending" },
    { id: 5, title: "Speed & Security Quality Audit", desc: "Unit verification tests and browser compatibility reviews.", status: "pending" },
    { id: 6, title: "Production Cloud Deployment", desc: "DNS pointing and automated deployment pipeline setups.", status: "pending" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-sans">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Shield className="text-indigo-600 dark:text-indigo-400" size={20} />
            <h3 className="text-base font-bold text-slate-850 dark:text-white">
              {t('dashboard.title')}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">

            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-150 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Portal Body */}
        <div className="flex-1 overflow-y-auto p-6">
            {/* Dashboard Logged-In View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Tracker Panel (Col Span 2) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-850 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        {t('dashboard.activeProject')}
                      </span>
                      <h4 className="text-base font-bold text-slate-850 dark:text-white">
                        AuraSync Premium E-Commerce Build
                      </h4>
                    </div>
                    <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30">
                      Phase 3: Coding
                    </span>
                  </div>

                  {/* Milestones list */}
                  <div className="space-y-4 relative pl-3 border-l-2 border-slate-150 dark:border-slate-800 ml-1.5">
                    {milestones.map((m) => (
                      <div key={m.id} className="relative flex items-start group">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[19px] w-2.5 h-2.5 rounded-full border-2 bg-white dark:bg-slate-900 ${
                          m.id < activeMilestone 
                            ? 'border-emerald-500 bg-emerald-500'
                            : m.id === activeMilestone
                            ? 'border-indigo-600'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}></div>

                        <div className="flex-1 pl-4">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-bold ${
                              m.id <= activeMilestone ? 'text-slate-850 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                            }`}>
                              {m.title}
                            </span>
                            {m.id < activeMilestone && (
                              <CheckCircle className="text-emerald-500" size={13} />
                            )}
                            {m.id === activeMilestone && (
                              <Clock className="text-indigo-600 dark:text-indigo-400" size={13} />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-450 dark:text-slate-450 mt-0.5">
                            {m.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Upload Panel */}
                <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-850 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-850 dark:text-white uppercase tracking-wide">
                      {t('dashboard.filesTitle')}
                    </h4>
                    
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-semibold hover:bg-indigo-700 transition-colors duration-200 cursor-pointer">
                      <Upload size={12} />
                      {t('contact.form.upload')}
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>

                  {/* File List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-xl flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-[10px] font-bold text-slate-850 dark:text-slate-200 truncate">
                              {file.name}
                            </p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500">
                              {file.size}
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap">
                          {file.uploadedAt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Column */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-850 shadow-sm flex flex-col h-[400px] overflow-hidden">
                {/* Coordinator Header */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-150 dark:border-slate-850 flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-250">
                      Sarah (Coordinator)
                    </h5>
                    <p className="text-[9px] text-green-500 font-medium">Online</p>
                  </div>
                </div>

                {/* Message Log */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/10">
                  {chatList.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'client' ? 'self-end items-end ml-auto' : 'self-start items-start'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm ${
                        msg.sender === 'client'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-white border border-slate-100 dark:bg-slate-800 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Input box */}
                <form onSubmit={handleSendMessage} className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 flex gap-2">
                  <input
                    type="text"
                    placeholder={t('dashboard.chatPlaceholder')}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Send size={12} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
