import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { BlogItem } from '../data/contentData';

export const Blog: React.FC = () => {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null);

  const posts: BlogItem[] = t('blog.items') as any || [];

  return (
    <section id="blog" className="py-24 transition-colors font-sans text-left relative">
      <div className="gradient-divider"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {selectedPost ? (
          /* Detailed Single Post View */
          <div className="max-w-3xl mx-auto space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-650 dark:text-indigo-400 hover:text-indigo-750 transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              <span>{t('blog.backToBlog')}</span>
            </button>

            <div className="space-y-4">
              <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-indigo-100/50 uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white leading-tight">
                {selectedPost.title}
              </h2>
              
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={13} /> {selectedPost.date}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {selectedPost.readTime}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-150 dark:border-slate-800 text-slate-650 dark:text-slate-300 text-sm leading-relaxed space-y-4">
              {/* Output content paragraphs split by newlines */}
              {selectedPost.content.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Simulated Author footer */}
            <div className="mt-10 p-5 bg-white dark:bg-slate-850 border border-slate-150 dark:border-slate-800 rounded-2xl flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                EA
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Syay Engineering Team</p>
                <p className="text-[10px] text-slate-405">Publishing reviews on serverless infrastructures, Web performance, and AI applications.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Grid Feed View */
          <div className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
                {t('blog.title')}
              </h2>
              <p className="text-sm text-slate-550 dark:text-slate-405 leading-relaxed">
                {t('blog.subtitle')}
              </p>
            </div>

            <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`flex flex-col justify-between p-6 glass-card premium-card rounded-3xl cursor-pointer group`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-850 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-550 dark:text-slate-450 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-indigo-650 dark:text-indigo-400 group hover:text-indigo-755 transition-colors">
                    <span>{t('blog.readArticle')}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200 ease-out" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
