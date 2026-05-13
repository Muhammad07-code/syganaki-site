import React from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Library, ShieldCheck, Target, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PageHero = ({ title, subtitle }) => (
  <section className="relative overflow-hidden bg-primary-dark pb-16 pt-32 text-white sm:pt-40">
    <img src="/institute/hero-institute.jpeg" alt={title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/60" />
    <div className="islamic-pattern absolute inset-0 opacity-[0.10]" />
    <div className="container-custom relative z-10 max-w-4xl">
      <p className="section-eyebrow">{title}</p>
      <h1 className="section-title text-white">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{subtitle}</p>
    </div>
  </section>
);

const About = () => {
  const { t } = useTranslation();
  const values = t('about.values', { returnObjects: true });
  const stats = t('stats', { returnObjects: true });
  const benefits = t('benefits', { returnObjects: true });

  return (
    <div className="bg-background">
      <PageHero title={t('about.title')} subtitle={t('about.subtitle')} />

      <section className="section-y bg-white">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src="/institute/library.jpeg" alt={t('about.history_title')} className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl" />
            <div className="premium-panel absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-px overflow-hidden bg-slate-200/70">
              {stats.slice(0, 3).map((item) => (
                <div key={item.label} className="bg-white/92 p-4 text-center">
                  <p className="font-serif text-2xl font-extrabold text-primary">{item.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-eyebrow">{t('about.history_title')}</p>
            <h2 className="section-title">{t('about.history_title')}</h2>
            <p className="section-copy mt-6">{t('about.history')}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="premium-card p-6">
                <Target className="mb-4 text-accent-gold" size={30} />
                <h3 className="text-xl font-bold">{t('about.mission_title')}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t('about.mission')}</p>
              </div>
              <div className="premium-card p-6">
                <Eye className="mb-4 text-accent-gold" size={30} />
                <h3 className="text-xl font-bold">{t('about.vision_title')}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t('about.vision')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="section-eyebrow">{t('about.values_title')}</p>
            <h2 className="section-title text-white">{t('about.values_title')}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const icons = [ShieldCheck, Award, Users];
              const Icon = icons[index] || ShieldCheck;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-dark p-7"
                >
                  <Icon className="mb-5 text-accent-gold" size={34} />
                  <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom grid gap-5 lg:grid-cols-3">
          {benefits.slice(0, 3).map((benefit, index) => {
            const images = ['/institute/classroom.jpeg', '/institute/students.jpeg', '/institute/study-hall.jpeg'];
            const icons = [Library, Users, Award];
            const Icon = icons[index] || Library;
            return (
            <article key={benefit.title} className="premium-card overflow-hidden">
              <img src={images[index]} alt={benefit.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <Icon className="mb-4 text-accent-gold" size={28} />
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.desc}</p>
              </div>
            </article>
          )})}
        </div>
      </section>
    </div>
  );
};

export default About;
