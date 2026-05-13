import React from 'react';
import { Users, GraduationCap, BookOpen, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <GraduationCap size={32} />, value: '2+', label: t('stats.years') },
    { icon: <Users size={32} />, value: '100+', label: t('stats.graduates') },
    { icon: <BookOpen size={32} />, value: '4', label: t('stats.programs') },
    { icon: <Globe size={32} />, value: '100%', label: t('stats.employment') },
  ];

  return (
    <section className="py-20 bg-white relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-primary-light mb-4 bg-primary/5 p-4 rounded-2xl">
              {stat.icon}
            </div>
            <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
