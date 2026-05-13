import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutPreview = () => {
  const { t } = useTranslation();

  const highlightsData = t('about_preview.highlights', { returnObjects: true });
  const highlights = Array.isArray(highlightsData) ? highlightsData : [];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1590076214537-1df1717a0a1f?auto=format&fit=crop&q=80&w=1000"
                alt="Students studying"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-gold/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-sm font-bold text-accent-gold uppercase tracking-[0.2em] mb-4">{t('about_preview.badge')}</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 leading-tight">
              {t('about_preview.title')}
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t('about_preview.description')}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary-light" size={20} />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors group">
              {t('about_preview.cta')}
              <div className="w-8 h-[2px] bg-primary group-hover:w-12 transition-all"></div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
