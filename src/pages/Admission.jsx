import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Loader2, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { buildWhatsAppLink, saveApplication } from '../services/formService';
import { fetchDataList } from '../services/dataService';

const WHATSAPP_NUMBER = '+77771764131';

const Admission = () => {
  const { t, i18n } = useTranslation();
  const fallbackPrograms = t('programs.items', { returnObjects: true }) || [];
  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  const steps = t('admission.steps', { returnObjects: true });
  const requirements = t('admission.requirements', { returnObjects: true });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    program: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPrograms = async () => {
      setLoadingPrograms(true);
      const data = await fetchDataList('programs', fallbackPrograms, i18n.language);
      setPrograms(data);
      if (data.length > 0 && !formData.program) {
        setFormData(prev => ({ ...prev, program: data[0].title }));
      }
      setLoadingPrograms(false);
    };
    loadPrograms();
  }, [i18n.language]);

  const isValid = useMemo(() => {
    const phoneDigits = formData.phone.replace(/\D/g, '');
    return formData.fullName.trim().length >= 2 && phoneDigits.length >= 10 && formData.program;
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!isValid) {
      setError(t('common.error'));
      return;
    }

    setLoading(true);
    try {
      await saveApplication(formData);
      setSubmitted(true);
      const message = `${t('admission.whatsapp_text')}\n\n${t('admission.name')}: ${formData.fullName}\n${t('admission.phone')}: ${formData.phone}\n${t('admission.program')}: ${formData.program}`;
      window.open(buildWhatsAppLink(WHATSAPP_NUMBER, message), '_blank', 'noopener,noreferrer');
      setFormData({ fullName: '', phone: '', program: firstProgram, message: '' });
    } catch (err) {
      console.error(err);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-primary-dark pb-16 pt-32 text-white sm:pt-40">
        <img src="/institute/students.jpeg" alt={t('admission.title')} className="absolute inset-0 h-full w-full object-cover opacity-28" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/55" />
        <div className="islamic-pattern absolute inset-0 opacity-[0.12]" />
        <div className="container-custom relative z-10 max-w-4xl">
          <p className="section-eyebrow">{t('nav.admission')}</p>
          <h1 className="section-title text-white">{t('admission.title')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{t('admission.subtitle')}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="space-y-8">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <ShieldCheck className="text-accent-gold" size={30} />
                <h2 className="text-3xl font-bold">{t('admission.steps_title')}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="premium-card p-6"
                  >
                    <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-lightGold font-serif text-xl font-extrabold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="premium-panel bg-white p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileText className="text-accent-gold" size={30} />
                <h2 className="text-3xl font-bold">{t('admission.docs_title')}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {requirements.map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="premium-panel sticky top-24 bg-white p-6 sm:p-8">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={42} />
                </div>
                <h3 className="text-2xl font-bold">{t('admission.success')}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t('admission.success_desc')}</p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn-ghost mt-7">
                  {t('admission.send_another')}
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{t('admission.form_title')}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t('admission.form_subtitle')}</p>

                {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{t('admission.name')}</span>
                    <input
                      value={formData.fullName}
                      onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                      className="input-premium"
                      required
                      minLength={2}
                      autoComplete="name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{t('admission.phone')}</span>
                    <input
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      className="input-premium"
                      required
                      type="tel"
                      placeholder="+7 ___ ___ __ __"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{t('admission.program')}</span>
                    <select
                      value={formData.program}
                      onChange={(event) => setFormData({ ...formData, program: event.target.value })}
                      className="input-premium"
                    >
                      {programs.map((program) => (
                        <option key={program.id}>{program.title}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{t('admission.message')}</span>
                    <textarea
                      value={formData.message}
                      onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                      className="input-premium min-h-[118px] resize-none"
                    />
                  </label>
                  <button type="submit" disabled={loading || !isValid} className="btn-primary w-full">
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    {t('admission.send')}
                  </button>
                  <a
                    href={buildWhatsAppLink(WHATSAPP_NUMBER, t('admission.whatsapp_text'))}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost w-full"
                  >
                    <MessageCircle size={18} />
                    {t('common.whatsapp')}
                  </a>
                </form>
              </>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Admission;
