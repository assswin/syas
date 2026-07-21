import React, { useState } from 'react';
import { Filter, Code, BarChart3, AlertCircle, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { ProjectItem } from '../data/contentData';

type PortfolioFilter = 'all' | 'websites' | 'mobile' | 'ai' | 'automation' | 'dashboard';

export const Portfolio: React.FC = () => {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = t('portfolio.items') as any || [];

  const matchesFilter = (project: ProjectItem, filter: PortfolioFilter) => {
    if (filter === 'all') return true;
    if (filter === 'websites') {
      return ['websites', 'website', 'web', 'web-dev'].includes(project.category);
    }
    return project.category === filter;
  };

  const filteredProjects = projects.filter((project) => matchesFilter(project, activeFilter));

  const filters = [
    { value: 'all', label: t('portfolio.filterAll') },
    { value: 'websites', label: t('portfolio.filterWeb') },
    { value: 'mobile', label: t('portfolio.filterMobile') },
    { value: 'ai', label: t('portfolio.filterAi') },
    { value: 'automation', label: t('portfolio.filterAutomation') },
    { value: 'dashboard', label: t('portfolio.filterDashboard') }
  ];

  return (
    <section id="portfolio" className="pt-6 pb-24 transition-colors font-sans relative sm:pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title headers */}
        <div className=" max-w-2xl mx-auto mb-12 space-y-3">
      
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('portfolio.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          <Filter size={15} className="text-indigo-500 mr-1 hidden sm:block" />
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value as PortfolioFilter)}
              className={`py-2 px-5 text-xs font-extrabold rounded-full transition-all duration-200 ${
                activeFilter === filter.value
                  ? 'glow-btn shadow-md'
                  : 'glass-pill text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`reveal stagger-${idx + 1} group glass-card rounded-3xl overflow-hidden cursor-pointer flex flex-col sm:flex-row text-left hover:border-indigo-500/40 transition-all duration-300`}
              >
                {/* Visual Card image */}
                <div className="sm:w-1/2 relative h-52 sm:h-auto overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {project.isDemo && (
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                      {t('portfolio.demoLabel')}
                    </span>
                  )}
                </div>

                {/* Text Card description */}
                <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      {project.category.replace('-',' ')}
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-extrabold pt-1">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 rounded-3xl border border-dashed border-slate-300/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-900/40 p-8 text-center">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No projects match this filter yet.</p>
            </div>
          )}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md text-left animate-fade-in">
            <div className="relative w-full max-w-2xl glass-modal rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white bg-slate-950/60 hover:bg-slate-950/90 transition-colors p-2.5 rounded-full z-10 border border-white/20 backdrop-blur-md"
              >
                <X size={18} />
              </button>

              {/* Banner image */}
              <div className="relative h-64 w-full">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] font-black bg-indigo-600 px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-black">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Meta details list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-5">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block">{t('portfolio.clientIndustry')}</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{selectedProject.clientIndustry}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Status</span>
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      Completed
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block">Copyright</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">100% Client Owned</span>
                  </div>
                </div>

                {/* Challenges details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <AlertCircle size={16} className="text-indigo-500" />
                      {t('portfolio.problem')}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Code size={16} className="text-indigo-500" />
                      {t('portfolio.solution')}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Bullet Results lists */}
                <div className="space-y-3 p-5 glass-pill rounded-2xl border border-emerald-500/20">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 size={16} className="text-emerald-500" />
                    {t('portfolio.results')}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.results.map((res, idx) => (
                      <li key={idx} className="text-xs text-slate-700 dark:text-slate-200 font-bold flex items-start gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1 shrink-0"></span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech specifications */}
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">Technologies Used</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-bold px-3 py-1 rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Demo Action links */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    onClick={() => { setSelectedProject(null); alert('Concept demo is successfully deployed to client test environments.'); }}
                    className="glow-btn flex-1 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('portfolio.liveDemo')}</span>
                    <ExternalLink size={15} />
                  </button>
                  
                  <button 
                    onClick={() => { setSelectedProject(null); alert('Repository access is confidential to protect client intellectual property.'); }}
                    className="glass-card flex-1 py-3.5 rounded-2xl font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 hover:border-indigo-500/40 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span>{t('portfolio.github')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

