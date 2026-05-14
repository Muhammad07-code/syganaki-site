import React from 'react';

const GraduatesSection = () => {
  const stats = [
    { label: 'Түлек', value: '50+' },
    { label: 'Жұмысқа орналасу', value: '100%' },
    { label: 'Имамдар', value: '25+' },
    { label: 'Ұстаздар', value: '15+' },
  ];

  return (
    <section className="section-y bg-primary-dark text-white">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-eyebrow text-white/80">Түлектер жетістігі</p>
            <h2 className="section-title text-white">Выпускники института успешно служат обществу</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
              Наши выпускники продолжают свою деятельность в мечетях, образовательных центрах и общественных проектах.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/10 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <p className="text-4xl font-extrabold text-white">{item.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.26em] text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GraduatesSection;
