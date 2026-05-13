import React from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProgramsPreview = () => {
  const { t } = useTranslation();

  const icons = [
    <GraduationCap className="text-white" size={24} />,
    <Book className="text-white" size={24} />,
    <Clock className="text-white" size={24} />
  ];

  const colors = ['bg-primary', 'bg-accent-gold', 'bg-primary-light'];

  const programsData = t('programs_preview.list', { returnObjects: true });
  const programs = Array.isArray(programsData) ? programsData : [];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-accent-gold uppercase tracking-[0.2em] mb-4">{t('programs_preview.badge')}</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">{t('programs_preview.title')}</h3>
          <p className="text-slate-600">
            {t('programs_preview.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group"
            >
              <div className={`w-14 h-14 ${colors[index % colors.length]} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                {icons[index % icons.length]}
              </div>
              <h4 className="text-2xl font-serif font-bold text-primary mb-4">{program.title}</h4>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                {program.description}
              </p>

              <div className="flex items-center gap-6 mb-8 py-4 border-y border-slate-50">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">{t('programs_preview.duration_label')}</span>
                  <span className="text-sm font-bold text-slate-700">{program.duration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">{t('programs_preview.level_label')}</span>
                  <span className="text-sm font-bold text-slate-700">{program.level}</span>
                </div>
              </div>

              <Link
                to="/programs"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent-gold transition-colors"
              >
                {t('programs_preview.cta')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
