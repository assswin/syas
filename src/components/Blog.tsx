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
    <section id="blog" className="pt-6 pb-24 transition-colors font-sans text-left relative sm:pt-8">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {selectedPost ? (
          /* Detailed Single Post View */
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              <span>{t('blog.backToBlog')}</span>
            </button>

            <div className="glass-card rounded-3xl p-8 space-y-6 border border-white/80 dark:border-white/10">
              <div className="space-y-4">
                <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black px-3.5 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedPost.title}
                </h2>
                
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 border-b border-slate-200/60 dark:border-slate-800 pb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-indigo-500" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-indigo-500" /> {selectedPost.readTime}</span>
                </div>
              </div>

              <div className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed space-y-5">
                {selectedPost.content.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Author footer */}
              <div className="mt-8 p-5 glass-pill rounded-2xl flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                  SL
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white">Syay Engineering Team</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Publishing reviews on serverless infrastructures, Web performance, and AI applications.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Grid Feed View */
          <div className="space-y-16">
            <div className="max-w-2xl space-y-3">
              
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {t('blog.title')}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                {t('blog.subtitle')}
              </p>
            </div>

            <div ref={revealRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="flex flex-col justify-between p-7 glass-card rounded-3xl cursor-pointer group hover:border-indigo-500/40"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      <span className="text-indigo-600 dark:text-indigo-400">{post.category}</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-xs font-black text-indigo-600 dark:text-indigo-400 group hover:text-indigo-700 transition-colors">
                    <span>{t('blog.readArticle')}</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out" />
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

