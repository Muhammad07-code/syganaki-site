import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchNewsList } from '../services/newsService';

const NewsPreview = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackNews = t('news.fallback', { returnObjects: true }) || [];

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsList(fallbackNews, i18n.language);
        setNews(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading news:", error);
        setNews(fallbackNews.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [i18n.language]);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent-gold uppercase tracking-[0.2em] mb-4">{t('news_preview.badge') || t('home.news_eyebrow')}</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">{t('news_preview.title') || t('home.news_title')}</h3>
          </div>
          <Link to="/news" className="btn-gold !py-3 !px-8 whitespace-nowrap">
            {t('news_preview.all_news') || t('common.all')}
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent-gold" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-premium transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image || "/institute/students.jpeg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Calendar size={14} className="text-accent-gold" />
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent-gold group-hover:gap-4 transition-all">
                      {t('news_preview.read_more') || t('common.read_more')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsPreview;
