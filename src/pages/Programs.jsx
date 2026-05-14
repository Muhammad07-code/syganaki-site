import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, GraduationCap, Layers, ShieldCheck, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const islamicSciences = [
  {
    year: '1-ші жыл',
    title: 'Подготовительный курс',
    description: 'Фундаментальные дисциплины для уверенного старта в классическом исламском образовании.',
    topics: ['Арабский язык', 'Тафсир', 'Уставы учебы'],
  },
  {
    year: '2-ші жыл',
    title: 'Негізгі ислам ғылымдары',
    description: 'Глубокое изучение фикха, хадиса и акиды в академическом формате.',
    topics: ['Фиқх', 'Хадис', 'Акида'],
  },
  {
    year: '3-ші жыл',
    title: 'Практическая подготовка',
    description: 'Заключительный этап с исследовательской работой и общественным служением.',
    topics: ['Коран', 'Ижазалық практика', 'Социальная деятельность'],
  },
];

const quranProgram = {
  duration: '1 жыл',
  title: 'Құран ижазасы',
  description: 'Интенсивная программа для заучивания Корана, изучения таджвида и подготовки к официальной ижазе.',
  points: ['Таджвид', 'Жадығару', 'Құран ғылымдары', 'Араб тілі'],
};

const Programs = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-primary-dark pb-16 pt-32 text-white sm:pt-40">
        <img src="/institute/quran-ijaza.jpeg" alt={t('programs.title')} className="absolute inset-0 h-full w-full object-cover opacity-28" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/55" />
        <div className="islamic-pattern absolute inset-0 opacity-[0.12]" />
        <div className="container-custom relative z-10 max-w-4xl">
          <p className="section-eyebrow">{t('nav.programs')}</p>
          <h1 className="section-title text-white">{t('programs.title')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{t('programs.subtitle')}</p>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <p className="section-eyebrow">Ислам ғылымдері</p>
            <h2 className="section-title">3 года системной подготовки в классических исламских науках</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Программа включает арабский язык, тафсир, хадис, фикх и акиду, предоставляя глубокое знание и академическую дисциплину.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,164,93,0.12),transparent_40%)]" />
              <div className="relative">
                <div className="mb-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-accent-gold">Курс құрылымы</p>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">Учебная последовательность по годам</h3>
                </div>
                <div className="space-y-6">
                  {islamicSciences.map((item, index) => (
                    <div key={item.year} className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent-gold text-white text-sm font-bold shadow-sm">
                        {item.year}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.year}</p>
                        <h4 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h4>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.topics.map((topic) => (
                            <span key={topic} className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary-dark">{topic}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {islamicSciences.map((item) => (
                <article key={item.title} className="premium-card p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/5 text-primary-dark">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-5 grid gap-2">
                    {item.topics.map((topic) => (
                      <div key={topic} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-accent-gold" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-slate-50">
        <div className="container-custom">
          <div className="mb-10 max-w-2xl">
            <p className="section-eyebrow">Құран ижазасы</p>
            <h2 className="section-title">Программа посвящена изучению Корана и таджвиду</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Одногодичная программа для глубокого изучения правил чтения, заучивания и науки о Коране.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex items-center gap-3 rounded-3xl bg-accent-gold/10 px-4 py-3 text-sm font-semibold text-accent-gold">
                <Globe2 size={18} /> 1 жыл
              </div>
              <h3 className="text-3xl font-semibold text-slate-900">{quranProgram.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{quranProgram.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {quranProgram.points.map((point) => (
                  <div key={point} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] bg-primary-dark p-8 text-white shadow-premium">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                <BookOpen size={18} /> Арнайы программа
              </div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent-gold">Құран ғылымдары</p>
              <h3 className="mt-5 text-3xl font-semibold leading-tight">Профессиональная подготовка по чтению Корана</h3>
              <div className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                <p>Глубокое заучивание Корана под руководством опытных преподавателей.</p>
                <p>Изучение классических школ таджвида и кыраата.</p>
                <p>Подготовка к официальной ижазе и публичному чтению.</p>
              </div>
              <Link to="/admission" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gold px-6 py-3 text-sm font-semibold text-primary-dark transition-all hover:bg-[#d9b66d]">
                Подать заявку
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
