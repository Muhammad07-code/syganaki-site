import React from 'react';

const PartnersSection = () => {
  const partners = [
    { title: 'Al-Azhar', description: 'Классическое исламское образование и общие академические стандарты.' },
    { title: 'Haseki', description: 'Научные связи и обмен методиками преподавания.' },
    { title: 'Международные семинары', description: 'Участие в конференциях и научных форумах.' },
    { title: 'Конференции', description: 'Обмен опытом с зарубежными исламскими центрами.' },
  ];

  return (
    <section className="section-y bg-primary-dark text-white">
      <div className="container-custom">
        <div className="mb-12 max-w-2xl">
          <p className="section-eyebrow text-white/80">Халықаралық байланыстар</p>
          <h2 className="section-title text-white">Сильные партнерские связи с международными исламскими центрами</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-white/70">
            Институт формирует официальные академические связи с партнерами, которые укрепляют международный статус и образовательные стандарты.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {partners.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-[0_24px_80px_rgba(5,24,17,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-gold">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-white/80">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
