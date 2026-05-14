import React from 'react';
import { CalendarDays, Trophy, Mic, BookOpen, Users } from 'lucide-react';

const EventsSection = () => {
  const events = [
    { title: 'Международная олимпиада', label: 'Олимпиада', description: 'Студенты участвовали в международных соревнованиях по чтению и толкованию Корана.', icon: Trophy },
    { title: 'Научный семинар', label: 'Семинар', description: 'Обсуждение современного исламского образования и методики преподавания.', icon: Mic },
    { title: 'Конкурс хадисов', label: 'Конкурс', description: 'Студенты демонстрировали знание хадисов и толкование текстов.', icon: BookOpen },
    { title: 'Лекции по фикху', label: 'Лекции', description: 'Серия академических занятий с зарубежными преподавателями.', icon: BookOpen },
    { title: 'Спортивные встречи', label: 'Спорт', description: 'Здоровый образ жизни и командный дух поддерживаются спортивными мероприятиями.', icon: Users },
  ];

  return (
    <section className="section-y bg-white">
      <div className="container-custom">
        <div className="mb-12 max-w-2xl">
          <p className="section-eyebrow">Ғылыми және қоғамдық қызмет</p>
          <h2 className="section-title">Научные события и общественные инициативы</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Наш институт поддерживает активную жизнь студентов через олимпиады, семинары, лекции и общественные проекты.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[32px] bg-primary-dark p-8 text-white shadow-premium">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(202,164,93,0.25),_transparent_38%)]" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.3em] text-accent-gold">График деятельности</p>
              <h3 className="mt-5 text-3xl font-semibold leading-tight">Учебные мероприятия, которые развивают интеллект и лидерство</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                Мы создаем платформу для выступлений, соревнований и межкультурного обмена.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {events.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                  <div className="absolute right-4 top-4 rounded-2xl bg-accent-gold/10 p-3 text-accent-gold">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{item.label}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
