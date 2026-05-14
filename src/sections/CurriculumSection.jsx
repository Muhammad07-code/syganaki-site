import React, { useState } from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Star, Globe2 } from 'lucide-react';

const CurriculumSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { title: 'Араб тілі', description: 'Грамматика, чтение и разговорная практика.' },
    { title: 'Хадис', description: 'Изучение и толкование авторитетных источников.' },
    { title: 'Фиқх', description: 'Исламское право и применение шариата.' },
    { title: 'Тәпсір', description: 'Толкование Корана и работа с классическими комментариями.' },
    { title: 'Ақида', description: 'Основы вероучения и религиозная уверенность.' },
  ];

  return (
    <section className="section-y bg-white">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Кітаптар / оқу бағдарламасы</p>
            <h2 className="section-title">Курс құрылымы және оқу бағыттары</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Мы показываем ключевые направления и образовательные категории, которые формируют академическую основу института.
            </p>
          </div>
          <button type="button" onClick={() => setIsOpen(true)} className="btn-primary">
            Толық оқу бағдарламасы
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/5 text-primary-dark">
                {item.title === 'Араб тілі' ? <Globe2 size={22} /> : item.title === 'Хадис' ? <BookOpen size={22} /> : item.title === 'Фиқх' ? <ShieldCheck size={22} /> : item.title === 'Тәпсір' ? <Star size={22} /> : <BookOpen size={22} />}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 sm:p-6">
          <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_24px_80px_rgba(5,24,17,0.24)]">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.26em] text-accent-gold">Оқу бағдарламасы</p>
                <h3 className="mt-4 text-3xl font-semibold text-slate-900">Полный учебный план</h3>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200">
                Закрыть
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="text-lg font-semibold text-slate-900">Араб тілі</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">Сарф, наху, чтение и перевод религиозных текстов, разговорная практика для уверенного понимания источников.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="text-lg font-semibold text-slate-900">Хадис</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">Изучение достоверных хадисов, их контекста и применения в современном исламском образовании.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="text-lg font-semibold text-slate-900">Фиқх</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">Исламское право, практическое применение норм, вопросы богослужения и общественной жизни.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="text-lg font-semibold text-slate-900">Тәпсір</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">Толкование Корана, изучение классических комментариев и работа с арабским текстом.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:col-span-2">
                <h4 className="text-lg font-semibold text-slate-900">Ақида</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">Основы вероучения, укрепление мировоззрения и развитие духовной уверенности.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CurriculumSection;
