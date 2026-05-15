import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInstituteContent } from '../data/instituteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const Partners = () => {
  const { t, i18n } = useTranslation();
  const institute = getInstituteContent(i18n.language);

  return (
    <div className="overflow-hidden bg-background">
      <section className="relative overflow-hidden bg-primary-dark pb-16 pt-32 text-white sm:pt-40">
        <img src={institute.baseImages.international} alt={t('partners.title')} className="absolute inset-0 h-full w-full object-cover opacity-28" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/55" />
        <div className="islamic-pattern absolute inset-0 opacity-[0.12]" />
        <div className="container-custom relative z-10 max-w-4xl">
          <p className="section-eyebrow">{t('nav.partners')}</p>
          <h1 className="section-title text-white">{t('partners.title')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{t('partners.subtitle')}</p>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-custom">
          <div className="mb-10 max-w-3xl">
            <p className="section-eyebrow">{institute.eventEyebrow}</p>
            <h2 className="section-title">{t('partners.academic_title', { defaultValue: institute.eventTitle })}</h2>
            <p className="section-copy mt-4">{t('partners.academic_desc', { defaultValue: institute.news[3]?.excerpt })}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {institute.partners.map((partner, index) => (
              <motion.article
                key={partner.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="premium-card p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-lightGold text-primary">
                    {index === 0 ? <Users size={24} /> : <Globe2 size={24} />}
                  </div>
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">{partner.type}</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark">{partner.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm font-bold text-accent-gold">
                  <MapPin size={15} />
                  {partner.location}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{partner.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom grid gap-6 lg:grid-cols-2">
          {institute.news.slice(3, 5).map((item) => (
            <Link key={item.id} to={`/news/${item.id}`} className="premium-card group overflow-hidden">
              <img src={item.image} alt={item.title} loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="p-6">
                <p className="section-eyebrow">{item.category}</p>
                <h3 className="font-serif text-2xl font-bold text-primary-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-y bg-primary-dark text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-eyebrow">{t('nav.contacts')}</p>
            <h2 className="section-title max-w-3xl text-white">{t('partners.contact_title', { defaultValue: t('partners.title') })}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">{t('partners.contact_desc', { defaultValue: t('contacts.subtitle') })}</p>
          </div>
          <Link to="/contacts" className="btn-primary">
            {t('nav.contacts')}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Partners;
