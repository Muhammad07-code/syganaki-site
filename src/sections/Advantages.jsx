import React from 'react';
import { BookOpen, Home, ShieldCheck, Sparkles, Globe2, Users } from 'lucide-react';

const Advantages = () => {
  const items = [
    { title: 'Тегін оқу', icon: BookOpen, description: 'Качественное образование без платы за обучение для всех зачисленных студентов.' },
    { title: 'Жатақхана', icon: Home, description: 'Комфортное проживание в безопасной и академической среде.' },
    { title: '3 мезгіл тамақ', icon: Sparkles, description: 'Сбалансированное питание обеспечивает здоровье и концентрацию.' },
    { title: 'Шәкіртақы', icon: ShieldCheck, description: 'Стипендия поддерживает студентов во время обучения.' },
    { title: 'Араб тілінде білім', icon: Globe2, description: 'Занятия проходят на арабском языке с акцентом на классический текст.' },
    { title: 'Шетелдік ұстаздар', icon: Users, description: 'Преподаватели с международным опытом и глубоким знанием исламских наук.' },
  ];

  return (
    <section className="section-y bg-white">
      <div className="container-custom">
        <div className="mb-12 max-w-2xl">
          <p className="section-eyebrow">Институт артықшылықтары</p>
          <h2 className="section-title">Почему обучение в нашем институте выбирают семьи со всего мира</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Мы совмещаем академическую строгость, классическую исламскую традицию и заботу о каждом студенте.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="premium-card p-7 group hover:-translate-y-1 hover:shadow-premium transition-all duration-300">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/5 text-primary-dark shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
