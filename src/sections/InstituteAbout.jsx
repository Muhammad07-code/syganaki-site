import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstituteAbout = () => {
  const highlights = [
    'Исламское образование',
    'Арабский язык',
    'Классические исламские науки',
    'Бесплатное обучение',
    'Жатақхана',
    'Шәкіртақы',
  ];

  return (
    <section className="section-y bg-slate-50">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Институт туралы</p>
            <h2 className="section-title">Официальный центр исламского образования и духовного наставничества</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700">
              Институт имени Хусамуддина ас-Сыганаки объединяет глубокую академическую программу, классические исламские науки и практическую подготовку
              к служению обществу. Мы создаем среду, где знание идет рука об руку с нравственностью и уважением традиций.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Миссия</p>
                <p className="mt-3 text-base font-semibold text-slate-900 leading-7">
                  Подготовка специалистов с глубокими исламскими знаниями, высоким академическим уровнем и нравственной зрелостью.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Тарихы</p>
                <p className="mt-3 text-base font-semibold text-slate-900 leading-7">
                  Институт был основан в 2022 году для развития нового уровня религиозного образования в Казахстане.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-3 text-sm font-semibold text-primary-dark">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent-gold" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/about" className="btn-secondary">
                Подробнее об институте
                <ArrowRight size={16} />
              </Link>
              <Link to="/programs" className="btn-primary">
                Программы обучения
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] bg-slate-900 shadow-premium">
            <img
              src="/institute/library.jpeg"
              alt="Институт Хусамуддина ас-Сыганаки"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl text-white">
              <p className="text-xs uppercase tracking-[0.26em] text-accent-gold">Академиялық институт</p>
              <p className="mt-3 text-2xl font-bold leading-tight">2022 жылы құрылған</p>
              <p className="mt-3 text-sm text-white/75 leading-6">
                Начало новой академической традиции, объединившей классическое обучение и современный образовательный подход.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstituteAbout;
