import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Bed,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Play,
  Quote,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInstituteContent } from '../data/instituteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const SectionHeader = ({ eyebrow, title, description, action, titleClassName = '' }) => (
  <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
    <div className="max-w-3xl">
      <p className="section-eyebrow flex items-center gap-2">
        <Sparkles size={16} className="text-accent-gold" />
        {eyebrow}
      </p>
      <h2 className={`section-title text-balance ${titleClassName}`}>{title}</h2>
      {description && <p className={`section-copy mt-4 max-w-2xl ${titleClassName}`}>{description}</p>}
    </div>
    {action}
  </div>
);

const Home = () => {
  const { t, i18n } = useTranslation();
  const institute = getInstituteContent(i18n.language);
  const heroCards = institute.stats;
  const programs = institute.programs;
  const benefits = t('benefits', { returnObjects: true });
  const news = institute.events.map(([title, excerpt, image], index) => ({
    id: `event-${index + 1}`,
    title,
    excerpt,
    image,
    date: index === 3 ? '2025' : '2025',
    category: institute.eventEyebrow,
  }));
  const gallery = institute.gallery;
  const aboutIcons = [BookOpen, Bed, Utensils, Award];

  return (
    <div className="overflow-hidden bg-background">
      <section className="relative min-h-[760px] overflow-hidden bg-primary-dark pt-24 text-white sm:min-h-[820px] lg:pt-28">
        <img
          src="/institute/hero-institute.jpeg"
          alt={t('brand.name')}
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/82 to-primary-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/20" />
        <div className="islamic-pattern absolute inset-y-0 left-0 w-1/2 opacity-[0.13]" />

        <div className="container-custom relative z-10 flex min-h-[660px] flex-col justify-center pb-40 pt-16 sm:pb-48 lg:pt-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="section-eyebrow text-accent-gold">{institute.heroBadge}</p>
            <h1 className="max-w-4xl break-words font-serif text-3xl font-extrabold leading-[1.12] text-white [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl xl:text-7xl">
              {institute.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {institute.heroSubtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/programs" className="btn-primary">
                <BookOpen size={18} />
                {t('hero.primary')}
              </Link>
              <Link to="/admission" className="btn-secondary">
                {t('hero.secondary')}
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 -mt-20 px-4 sm:-mt-24 lg:-mt-28">
        <div className="container-custom">
          <div className="premium-panel grid grid-cols-2 gap-px overflow-hidden bg-slate-200/70 shadow-xl lg:grid-cols-4">
            {heroCards.map(([value, label], index) => (
              <div key={label} className="bg-white/94 p-5 sm:p-6 lg:p-7">
                <p className="font-serif text-3xl font-extrabold text-primary-dark sm:text-4xl">{value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                <div className="mt-4 h-1 w-10 rounded-full bg-accent-gold" style={{ opacity: 1 - index * 0.12 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section-y bg-background">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="relative">
            <img src="/institute/library.jpeg" alt={institute.aboutTitle} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <p className="section-eyebrow">{institute.aboutEyebrow}</p>
            <h2 className="section-title text-balance">{institute.aboutTitle}</h2>
            <p className="section-copy mt-5 max-w-2xl">{institute.aboutText}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {institute.aboutPoints.slice(0, 4).map(([title, desc], index) => {
                const Icon = aboutIcons[index] || CheckCircle2;
                return (
                  <div key={title} className="premium-card p-5">
                    <Icon className="mb-4 text-accent-gold" size={28} />
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-custom">
          <SectionHeader
            eyebrow={institute.programEyebrow}
            title={institute.programTitle}
            description={t('home.programs_desc')}
            action={<Link to="/programs" className="btn-ghost">{t('common.all')}<ArrowRight size={16} /></Link>}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {programs.slice(0, 2).map((program, index) => (
              <motion.article
                key={program.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.04 }}
                className="group relative overflow-hidden rounded-3xl bg-slate-50 shadow-xl"
              >
                <img src={program.image} alt={program.title} loading="lazy" className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="relative z-10 p-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary-dark/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {program.format}
                  </span>
                  <h3 className="mt-6 text-2xl font-serif font-bold text-primary-dark">{program.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{program.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">{program.duration}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">{program.level || t('programs.level_standard')}</span>
                  </div>
                  <Link to="/programs" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-accent-gold">
                    {t('programs.learn_more')}<ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom">
          <SectionHeader
            eyebrow={institute.teacherEyebrow}
            title={institute.teacherTitle}
            description={institute.teacherText}
            action={<Link to="/teachers" className="btn-ghost">{t('nav.teachers')}<ArrowRight size={16} /></Link>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {institute.teachers.slice(0, 3).map((teacher, index) => (
              <motion.article key={teacher.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.04 }} className="premium-card overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={teacher.image} alt={teacher.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 text-xl font-bold text-primary-dark">{teacher.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{teacher.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-custom">
          <SectionHeader eyebrow={t('home.news_eyebrow')} title={t('home.news_title')} action={<Link to="/news" className="btn-ghost">{t('news.title')}<ArrowRight size={16} /></Link>} />
          <div className="grid gap-5 lg:grid-cols-3">
            {news.slice(0, 3).map((item, index) => (
              <motion.article key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.06 }} className="premium-card overflow-hidden">
                <Link to={`/news/${item.id}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1"><CalendarDays size={14} />{item.date}</span>
                      <span className="rounded-full bg-accent-lightGold px-3 py-1 font-bold text-primary">{item.category}</span>
                    </div>
                    <h3 className="line-clamp-2 font-serif text-xl font-bold text-primary-dark">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom">
          <SectionHeader eyebrow={t('home.gallery_eyebrow')} title={institute.galleryTitle || t('home.gallery_title')} action={<Link to="/gallery" className="btn-ghost">{t('nav.gallery')}<ArrowRight size={16} /></Link>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.slice(0, 4).map((item, index) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.04 }} className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/82 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-gold">{item.category}</p>
                  <h3 className="mt-1 font-serif text-xl font-bold text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-12 text-white">
        <div className="container-custom">
          <SectionHeader eyebrow={t('home.benefits_eyebrow')} title={t('home.benefits_title')} titleClassName="text-white" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.06 }} className="glass-dark p-6">
                <CheckCircle2 className="mb-5 text-accent-gold" size={30} />
                <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
