import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Sparkles, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInstituteContent } from '../data/instituteContent';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="mb-12 sm:mb-16">
    <p className="section-eyebrow flex items-center gap-2">
      <Sparkles size={16} className="text-accent-gold" />
      {eyebrow}
    </p>
    <h1 className="section-title text-balance mt-4">{title}</h1>
    {description && <p className="section-copy mt-6 max-w-3xl">{description}</p>}
  </div>
);

const Teachers = () => {
  const { t, i18n } = useTranslation();
  const institute = getInstituteContent(i18n.language);

  const teacherQualifications = useMemo(
    () => [
      { icon: Award, title: t('teachers.phd') || 'PhD Holders', count: institute.teachers.filter(t => t.role.en?.includes('PhD')).length || 3 },
      { icon: BookOpen, title: t('teachers.specialists') || 'Islamic Scholars', count: institute.teachers.length || 6 },
      { icon: Users, title: t('teachers.experienced') || 'Years Average', count: '15+' },
    ],
    [t, institute.teachers],
  );

  const teacherRoles = useMemo(
    () => [
      { category: t('teachers.administration') || 'Administration', teachers: institute.teachers.slice(0, 1) },
      { category: t('teachers.quran') || 'Quranic Sciences', teachers: institute.teachers.slice(1, 3) },
      { category: t('teachers.islamic') || 'Islamic Studies', teachers: institute.teachers.slice(3, 5) },
      { category: t('teachers.languages') || 'Arabic Language', teachers: institute.teachers.slice(5, 6) },
    ],
    [t, institute.teachers],
  );

  return (
    <div className="overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-primary-dark pt-24 text-white">
        <img
          src="/institute/study-hall.jpeg"
          alt="Teachers"
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/82 to-primary-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark/20" />

        <div className="container-custom relative z-10 flex min-h-[500px] flex-col justify-center pb-24 pt-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7 }}>
            <SectionHeader
              eyebrow={t('nav.teachers') || 'Faculty'}
              title={t('teachers.title') || 'Our Faculty'}
              description={
                t('teachers.subtitle') ||
                'Experienced specialists with deep Islamic knowledge and academic credentials'
              }
            />
            <Link to="/admission" className="btn-primary">
              {t('hero.secondary')}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="section-y bg-white">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-3">
            {teacherQualifications.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.06 }}
                  className="premium-card p-8 text-center"
                >
                  <Icon className="mx-auto mb-4 text-accent-gold" size={40} />
                  <p className="text-4xl font-bold font-serif text-primary-dark">{item.count}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-600">{item.title}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teachers by Department */}
      {teacherRoles.map((department, deptIndex) => (
        <section key={department.category} className={`section-y ${deptIndex % 2 === 0 ? 'bg-background' : 'bg-white'}`}>
          <div className="container-custom">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="mb-12 text-3xl font-bold font-serif text-primary-dark"
            >
              {department.category}
            </motion.h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {department.teachers.map((teacher, index) => (
                <motion.article
                  key={teacher.name.en || teacher.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.06 }}
                  className="premium-card group overflow-hidden"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      src={teacher.image}
                      alt={teacher.name.en || teacher.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="line-clamp-2 text-xl font-bold text-primary-dark">{teacher.name.en || teacher.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{teacher.role.en || teacher.role}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {teacher.specializations?.slice(0, 2).map((spec) => (
                        <span key={spec} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Teaching Philosophy */}
      <section className="section-y bg-primary-dark text-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-4xl font-bold font-serif mb-6 text-white">Teaching Approach</h2>
            <div className="space-y-6 text-lg leading-8 text-white/78">
              <p>
                Our faculty believes in combining classical Islamic scholarship with contemporary academic standards.
                Each teacher brings expertise in their field and a commitment to student development.
              </p>
              <p>
                Classes emphasize not just knowledge transmission, but character formation, critical thinking,
                and the application of Islamic sciences to contemporary challenges.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-y bg-background">
        <div className="container-custom text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <h2 className="text-3xl font-bold font-serif text-primary-dark mb-6">Learn From Our Experts</h2>
            <p className="text-lg text-slate-600 mb-9 max-w-2xl mx-auto">
              Join our programs and study under experienced scholars committed to your academic and spiritual growth.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/programs" className="btn-primary">
                {t('hero.primary')}
                <ArrowRight size={18} />
              </Link>
              <Link to="/admission" className="btn-secondary">
                {t('hero.secondary')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Teachers;
