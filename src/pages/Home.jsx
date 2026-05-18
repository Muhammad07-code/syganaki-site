import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  HeartHandshake,
  MapPin,
  QrCode,
  Sparkles,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInstituteContent } from '../data/instituteContent';
import FAQ from '../sections/FAQ';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const institute = getInstituteContent(i18n.language);
  const programs = institute.programs.slice(0, 2);
  const latest = institute.news.slice(0, 2);
  const gallery = institute.gallery.slice(0, 3);
  const statIcons = [CalendarDays, BookOpen, Users, GraduationCap];
  const featuredTeachers = [
    { id: 'bagdat-manabayev', image: '/institute/featured-director.png' },
    { id: 'zhaksylyk-rakhymbay', image: '/institute/featured-zhaksylyk.png' },
    { id: 'azamat-baizakov', image: '/institute/featured-azamat.png' },
    { id: 'temirzhan-muratov', image: '/institute/featured-temirzhan.png' },
  ]
    .map(({ id, image }) => {
      const teacher = institute.teachers.find((item) => item.id === id);
      return teacher ? { ...teacher, image } : null;
    })
    .filter(Boolean);

  return (
    <div className="overflow-hidden bg-background">
      <section className="relative min-h-[700px] overflow-hidden bg-primary-dark pt-24 text-white sm:min-h-[760px] lg:pt-28">
        <img
          src={institute.baseImages.hero}
          alt={t('brand.name')}
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/84 to-primary-dark/34" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/10" />
        <div className="islamic-pattern absolute inset-y-0 left-0 w-1/2 opacity-[0.12]" />

        <div className="container-custom relative z-10 flex min-h-[600px] flex-col justify-center pb-28 pt-12 sm:pb-36 lg:pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.65 }} className="max-w-4xl">
            <p className="section-eyebrow text-accent-gold">{institute.heroBadge}</p>
            <h1 className="max-w-4xl font-serif text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
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

            <a
              href="https://2gis.kz/astana/geo/70000001066292633/71.416744,51.125984"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex max-w-xl items-center gap-2 text-sm font-semibold text-white/70 hover:text-accent-gold"
            >
              <MapPin size={17} className="shrink-0 text-accent-gold" />
              {t('topbar.address')}
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-16 px-4 sm:-mt-20">
        <div className="container-custom">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {institute.stats.map(([value, label], index) => {
              const Icon = statIcons[index] || Sparkles;
              return (
              <div key={label} className="group relative overflow-hidden rounded-lg border border-white/80 bg-white p-5 shadow-[0_22px_70px_rgba(5,24,17,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(5,24,17,0.18)] sm:p-6">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-gold via-primary to-accent-gold opacity-80" />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-lightGold text-primary shadow-inner">
                  <Icon size={21} />
                </div>
                <p className="font-serif text-4xl font-extrabold leading-none text-primary-dark sm:text-5xl">{value}</p>
                <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{label}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <img
              src={institute.baseImages.about}
              alt={institute.aboutTitle}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <p className="section-eyebrow">{institute.aboutEyebrow}</p>
            <h2 className="section-title text-balance">{institute.aboutTitle}</h2>
            <p className="section-copy mt-5 max-w-2xl">{institute.aboutText}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {institute.aboutPoints.map(([title, desc]) => (
                <div key={title} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-accent-gold" size={20} />
                  <div>
                    <h3 className="font-bold text-primary-dark">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-ghost mt-8">
              {t('nav.about')}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-custom">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="section-eyebrow flex items-center gap-2">
                <Sparkles size={16} />
                {institute.programEyebrow}
              </p>
              <h2 className="section-title text-balance">{institute.programTitle}</h2>
              <p className="section-copy mt-4">{t('home.programs_desc')}</p>
            </div>
            <Link to="/programs" className="btn-ghost">
              {t('programs.learn_more')}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {programs.map((program, index) => (
              <motion.article
                key={program.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="premium-card grid overflow-hidden md:grid-cols-[0.82fr_1fr]"
              >
                <img src={program.image} alt={program.title} loading="lazy" className="h-full min-h-[260px] w-full object-cover" />
                <div className="p-6 sm:p-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent-lightGold px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                    <GraduationCap size={15} />
                    {program.duration}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-primary-dark">{program.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-7 text-slate-600">{program.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {program.subjects.slice(0, 4).map((subject) => (
                      <span key={subject} className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="section-eyebrow">
                <Users size={16} />
                {t('home.featured_teachers_eyebrow')}
              </p>
              <h2 className="section-title text-balance">{t('home.featured_teachers_title')}</h2>
              <p className="section-copy mt-4">{t('home.featured_teachers_desc')}</p>
            </div>
            <Link to="/teachers" className="btn-ghost">
              {t('nav.teachers')}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredTeachers.map((teacher, index) => (
              <motion.article
                key={teacher.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                className="group overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-[0_18px_54px_rgba(5,24,17,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_28px_78px_rgba(5,24,17,0.14)]"
              >
                <div className="aspect-[4/4.35] overflow-hidden bg-slate-100">
                  <img src={teacher.image} alt={teacher.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent-gold">{teacher.category}</p>
                  <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-primary-dark">{teacher.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">{teacher.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">{t('home.news_eyebrow')}</p>
                <h2 className="text-3xl font-serif font-bold text-primary-dark">{t('news.title')}</h2>
              </div>
              <Link to="/news" className="btn-ghost">
                {t('common.all')}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {latest.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`} className="premium-card grid overflow-hidden sm:grid-cols-[210px_1fr]">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full min-h-[170px] w-full object-cover" />
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={14} />
                        {item.date}
                      </span>
                      <span className="rounded-full bg-accent-lightGold px-3 py-1 font-bold text-primary">{item.category}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary-dark">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">{t('home.gallery_eyebrow')}</p>
                <h2 className="text-3xl font-serif font-bold text-primary-dark">{institute.galleryTitle}</h2>
              </div>
              <Link to="/gallery" className="btn-ghost">
                {t('nav.gallery')}
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((item, index) => (
                <Link key={item.id} to="/gallery" className={`group relative overflow-hidden rounded-lg ${index === 0 ? 'col-span-3 aspect-[16/8]' : 'aspect-square'}`}>
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-gold">{item.category}</p>
                    <h3 className="mt-1 font-serif text-lg font-bold text-white">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-lg bg-primary-dark p-6 text-white shadow-[0_28px_90px_rgba(5,24,17,0.18)] sm:p-8 lg:p-10">
            <div className="islamic-pattern absolute inset-0 opacity-[0.12]" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/96 to-primary/70" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
              <div className="max-w-3xl">
                <p className="section-eyebrow text-accent-gold">
                  <HeartHandshake size={16} />
                  {t('support.eyebrow')}
                </p>
                <h2 className="section-title text-white">{t('support.title')}</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{t('support.subtitle')}</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[t('support.point_1'), t('support.point_2')].map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/8 p-4">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-accent-gold" size={18} />
                      <p className="text-sm font-semibold leading-6 text-white/78">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/15 bg-white p-5 text-primary-dark shadow-[0_22px_70px_rgba(0,0,0,0.18)]">
                <div className="mb-5 grid aspect-square place-items-center rounded-lg border border-dashed border-accent-gold/60 bg-accent-lightGold">
                  <div className="text-center">
                    <QrCode className="mx-auto text-primary" size={82} />
                    <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.18em] text-primary/70">Kaspi QR</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                    <CreditCard className="shrink-0 text-accent-gold" size={19} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{t('support.kaspi_label')}</p>
                      <p className="font-extrabold text-primary-dark">{t('topbar.phone')}</p>
                    </div>
                  </div>
                  <p className="rounded-lg bg-primary-dark px-4 py-3 text-center text-sm font-extrabold text-white">
                    {t('support.payment_note')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ compact />
    </div>
  );
};

export default Home;
