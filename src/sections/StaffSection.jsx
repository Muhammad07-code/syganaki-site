import React from 'react';
import { Award } from 'lucide-react';

const StaffSection = () => {
  const teachers = [
    {
      name: 'Шейх Ахмад аль-Масри',
      position: 'Ректор, профессор',
      education: 'Al-Azhar',
      country: 'Египет',
      image: '/institute/study-hall.jpeg',
    },
    {
      name: 'Хашим Хасеки',
      position: 'Старший преподаватель',
      education: 'Haseki',
      country: 'Турция',
      image: '/institute/library.jpeg',
    },
    {
      name: 'Доктор Фархад',
      position: 'PhD по исламской теологии',
      education: 'PhD',
      country: 'Казахстан',
      image: '/institute/classroom.jpeg',
    },
    {
      name: 'Имам Саид',
      position: 'Преподаватель арабского языка',
      education: 'Международные курсы',
      country: 'Кыргызстан',
      image: '/institute/quran-ijaza.jpeg',
    },
  ];

  return (
    <section className="section-y bg-slate-50">
      <div className="container-custom">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Ұстаздар құрамы</p>
            <h2 className="section-title">10 оқытушы — международный академический состав</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Учебный процесс поддерживается преподавателями с дипломами Al-Azhar, Haseki и международным опытом.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm">
            <Award size={18} className="text-accent-gold" />
            10 оқытушы
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <article key={teacher.name} className="premium-card overflow-hidden">
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img src={teacher.image} alt={teacher.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-gold">{teacher.country}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{teacher.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{teacher.position}</p>
                <p className="mt-4 text-sm font-semibold text-slate-700">{teacher.education}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
