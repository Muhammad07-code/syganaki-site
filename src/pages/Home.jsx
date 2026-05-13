import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Play,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FAQ from '../sections/FAQ';

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
  const { t } = useTranslation();
  const heroCards = t('hero.cards', { returnObjects: true });
  const programs = t('programs.items', { returnObjects: true });
  const benefits = t('benefits', { returnObjects: true });
  const news = t('news.fallback', { returnObjects: true });
  const gallery = t('gallery.items', { returnObjects: true });
  const testimonials = t('testimonials', { returnObjects: true });

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
            <p className="section-eyebrow text-accent-gold">{t('hero.badge')}</p>
            <h1 className="max-w-4xl text-balance font-serif text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {t('hero.subtitle')}
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
            {heroCards.map((card, index) => (
              <div key={card.label} className="bg-white/94 p-5 sm:p-6 lg:p-7">
                <p className="font-serif text-3xl font-extrabold text-primary-dark sm:text-4xl">{card.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{card.label}</p>
                <div className="mt-4 h-1 w-10 rounded-full bg-accent-gold" style={{ opacity: 1 - index * 0.12 }} />
              </div>
            ))}
          </div>
        </div>
      </div>



      <section className="section-y bg-white">
        <div className="container-custom">
          <SectionHeader
            eyebrow={t('home.programs_eyebrow')}
            title={t('home.programs_title')}
            description={t('home.programs_desc')}
            action={<Link to="/programs" className="btn-ghost">{t('common.all')}<ArrowRight size={16} /></Link>}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <motion.article
                key={program.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.04 }}
                className={`group relative min-h-[360px] overflow-hidden rounded-lg ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <img src={program.image} alt={program.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/72 to-primary-dark/10" />
                <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-6 text-white">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-gold text-primary-dark">
                    {index % 2 === 0 ? <GraduationCap size={23} /> : <BookOpen size={23} />}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">{program.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/75">{program.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-white/85">
                    <span className="rounded-full bg-white/12 px-3 py-1.5 backdrop-blur">{program.duration}</span>
                    <span className="rounded-full bg-white/12 px-3 py-1.5 backdrop-blur">{program.format}</span>
                  </div>
                  <Link to="/programs" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-accent-gold">
                    {t('programs.learn_more')}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
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

      <section className="section-y bg-background">
        <div className="container-custom">
          <SectionHeader
            eyebrow={t('home.news_eyebrow')}
            title={t('home.news_title')}
            action={<Link to="/news" className="btn-ghost">{t('news.title')}<ArrowRight size={16} /></Link>}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {news.map((item, index) => (
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

      <section className="section-y bg-white">
        <div className="container-custom">
          <SectionHeader eyebrow={t('home.gallery_eyebrow')} title={t('home.gallery_title')} action={<Link to="/gallery" className="btn-ghost">{t('nav.gallery')}<ArrowRight size={16} /></Link>} />
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

      <section className="bg-primary-dark py-16 text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg">
            <img src="/institute/hero-institute.jpeg" alt={t('home.video_title')} loading="lazy" className="h-[320px] w-full object-cover sm:h-[440px]" />
            <div className="absolute inset-0 bg-primary-dark/35" />
            <button type="button" className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-gold text-primary-dark shadow-2xl">
              <Play size={28} fill="currentColor" />
            </button>
          </div>
          <div className="max-w-xl">
            <p className="section-eyebrow">{t('hero.video')}</p>
            <h2 className="section-title text-white">{t('home.video_title')}</h2>
            <p className="mt-5 text-lg leading-8 text-white/68">{t('home.video_desc')}</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container-custom">
          <SectionHeader eyebrow={t('home.testimonials_eyebrow')} title={t('home.testimonials_title')} />
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.figure key={item.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.05 }} className="premium-card p-6">
                <Quote className="mb-5 text-accent-gold" size={30} />
                <blockquote className="text-sm leading-7 text-slate-700">{item.text}</blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-5">
                  <p className="font-bold text-primary-dark">{item.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{item.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <div id="faq">
        <FAQ />
      </div>

      <section className="section-y bg-white">
        <div className="container-custom">
          <SectionHeader eyebrow={t('home.contact_eyebrow')} title={t('home.contact_title')} action={<Link to="/contacts" className="btn-primary">{t('nav.contacts')}<ArrowRight size={16} /></Link>} />
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="premium-card p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold">{t('contacts.form_title')}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t('contacts.form_subtitle')}</p>
              <div className="mt-6 space-y-3 text-sm font-semibold text-slate-700">
                <p className="flex gap-3"><MapPin size={18} className="text-accent-gold shrink-0" /><a href="https://2gis.kz/astana/geo/70000001066292633/71.416744,51.125984" target="_blank" rel="noreferrer" className="hover:text-accent-gold">{t('topbar.address')}</a></p>
                <p className="flex gap-3"><CalendarDays size={18} className="text-accent-gold" />{t('contacts.hours')}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <iframe
                title={t('contacts.map_title')}
                className="h-[320px] w-full border-0"
                src="/2gis-map.html"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
