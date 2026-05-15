import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, Handshake, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInstituteContent } from '../data/instituteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="mb-12 sm:mb-16">
    <p className="section-eyebrow flex items-center gap-2">
      <Star size={16} className="text-accent-gold" />
      {eyebrow}
    </p>
    <h1 className="section-title text-balance mt-4">{title}</h1>
    {description && <p className="section-copy mt-6 max-w-3xl">{description}</p>}
  </div>
);

const Partners = () => {
  const { t, i18n } = useTranslation();
  const institute = getInstituteContent(i18n.language);

  const partnerCategories = useMemo(
    () => [
      {
        title: t('partners.international') || 'International Partners',
        icon: Globe,
        description: t('partners.international_desc') || 'Global partnerships for academic cooperation',
        partners: [
          { name: 'Al-Azhar University', location: 'Egypt', year: '2023' },
          { name: 'Islamic University of Medina', location: 'Saudi Arabia', year: '2023' },
          { name: 'Qatar University', location: 'Qatar', year: '2024' },
        ],
      },
      {
        title: t('partners.national') || 'National Partners',
        icon: Award,
        description: t('partners.national_desc') || 'Collaborative institutions in Kazakhstan',
        partners: [
          { name: 'Eurasian Islamic Institute', location: 'Astana', year: '2022' },
          { name: 'Ministry of Education', location: 'Astana', year: '2022' },
          { name: 'Astana City Administration', location: 'Astana', year: '2023' },
        ],
      },
      {
        title: t('partners.community') || 'Community Partners',
        icon: Users,
        description: t('partners.community_desc') || 'Local organizations and mosques',
        partners: [
          { name: 'Jami Mosque Nur-Sultan', location: 'Astana', year: '2022' },
          { name: 'Islamic Cultural Center', location: 'Astana', year: '2023' },
          { name: 'Youth Development Foundation', location: 'Astana', year: '2023' },
        ],
      },
    ],
    [t],
  );

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-primary-dark pt-24 text-white">
        <img
          src="/institute/students.jpeg"
          alt="Partners"
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/82 to-primary-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/20" />

        <div className="container-custom relative z-10 flex min-h-[500px] flex-col justify-center pb-24 pt-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <SectionHeader
              eyebrow={t('nav.partners') || 'Partners'}
              title={t('partners.title') || 'Institutional Partnerships'}
              description={
                t('partners.subtitle') ||
                'The institute collaborates with leading universities, organizations, and institutions worldwide'
              }
            />
            <Link to="/admission" className="btn-primary">
              {t('hero.secondary')}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners by Category */}
      {partnerCategories.map((category, categoryIndex) => {
        const IconComponent = category.icon;
        return (
          <section key={category.title} className={`section-y ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-background'}`}>
            <div className="container-custom">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
                <div className="mb-12 flex items-start gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <IconComponent className="text-accent-gold" size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-serif text-primary-dark">{category.title}</h2>
                    <p className="mt-3 text-lg text-slate-600">{category.description}</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.partners.map((partner, index) => (
                  <motion.article
                    key={`${partner.name}-${partner.location}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                    transition={{ delay: index * 0.06 }}
                    className="premium-card group p-6 hover:shadow-2xl"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-lg font-bold text-primary-dark line-clamp-2">{partner.name}</h3>
                      <Handshake className="mt-1 shrink-0 text-accent-gold" size={24} />
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-gold" />
                        {partner.location}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                        Partner since {partner.year}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Benefits of Partnership */}
      <section className="section-y bg-primary-dark text-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title text-white text-balance">Why Partner With Us?</h2>
            <p className="section-copy mt-6 mx-auto max-w-2xl text-white/78">
              Partnership with Husamuddin as-Syganaqi Institute opens doors to quality Islamic education, research, and cultural exchange.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Quality Curriculum',
                icon: Award,
                desc: 'Access to carefully developed Islamic studies programs',
              },
              {
                title: 'Experienced Faculty',
                icon: Users,
                desc: 'Collaboration with PhD specialists and Islamic scholars',
              },
              {
                title: 'Global Network',
                icon: Globe,
                desc: 'Connect with Islamic institutions worldwide',
              },
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.06 }}
                  className="glass-dark p-6"
                >
                  <BenefitIcon className="mb-4 text-accent-gold" size={32} />
                  <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-y bg-background">
        <div className="container-custom text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <h2 className="text-3xl font-bold font-serif text-primary-dark mb-6">Interested in Partnership?</h2>
            <p className="text-lg text-slate-600 mb-9 max-w-2xl mx-auto">
              Contact our administration office to discuss collaboration opportunities and institutional partnerships.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/contacts" className="btn-primary">
                {t('nav.contacts')}
              </Link>
              <a href="https://t.me/" className="btn-secondary">
                {t('common.whatsapp')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
