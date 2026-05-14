import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Instagram, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveInquiry } from '../services/formService';

const ContactCard = ({ icon, title, children }) => (
  <div className="premium-card p-6">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-lightGold text-primary">
      {icon}
    </div>
    <h3 className="text-lg font-bold">{title}</h3>
    <div className="mt-3 text-sm leading-7 text-slate-600">{children}</div>
  </div>
);

const Contacts = () => {
  const { t } = useTranslation();
  const subjects = t('contacts.subjects', { returnObjects: true });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: subjects[0],
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await saveInquiry(formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', subject: subjects[0], message: '' });
    } catch (err) {
      setError(err.message === 'rate_limited' ? t('common.too_many_requests', { defaultValue: t('common.error') }) : t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-primary-dark pb-16 pt-32 text-white sm:pt-40">
        <img src="/institute/hero-institute.jpeg" alt={t('contacts.title')} className="absolute inset-0 h-full w-full object-cover opacity-28" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/55" />
        <div className="islamic-pattern absolute inset-0 opacity-[0.12]" />
        <div className="container-custom relative z-10 max-w-4xl">
          <p className="section-eyebrow">{t('nav.contacts')}</p>
          <h1 className="section-title text-white">{t('contacts.title')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">{t('contacts.subtitle')}</p>
        </div>
      </section>

      <section className="-mt-8 pb-8">
        <div className="container-custom relative z-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={<MapPin size={24} />} title={t('contacts.address_title')}>
            <a href="https://2gis.kz/astana/geo/70000001066292633/71.416744,51.125984" target="_blank" rel="noreferrer" className="font-bold text-primary hover:text-accent-gold">{t('topbar.address')}</a>
          </ContactCard>
          <ContactCard icon={<Phone size={24} />} title={t('contacts.phone_title')}>
            <a href={`tel:${t('topbar.phone')}`} className="font-bold text-primary hover:text-accent-gold">{t('topbar.phone')}</a>
          </ContactCard>
          <ContactCard icon={<Mail size={24} />} title={t('contacts.email_title')}>
            <a href={`mailto:${t('topbar.email')}`} className="font-bold text-primary hover:text-accent-gold">{t('topbar.email')}</a>
          </ContactCard>
          <ContactCard icon={<Clock size={24} />} title={t('contacts.hours_title')}>
            {t('contacts.hours')}
          </ContactCard>
        </div>
      </section>

      <section className="section-y pt-8">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="premium-panel bg-white p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={42} />
                </div>
                <h2 className="text-2xl font-bold">{t('common.success')}</h2>
                <button type="button" onClick={() => setSubmitted(false)} className="btn-ghost mt-7">
                  {t('admission.send_another')}
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{t('contacts.form_title')}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t('contacts.form_subtitle')}</p>
                {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="input-premium"
                    placeholder={t('admission.name')}
                    required
                    minLength={2}
                  />
                  <input
                    value={formData.phone}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    className="input-premium"
                    placeholder={t('admission.phone')}
                    required
                    type="tel"
                  />
                  <select
                    value={formData.subject}
                    onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                    className="input-premium"
                  >
                    {subjects.map((subject) => (
                      <option key={subject}>{subject}</option>
                    ))}
                  </select>
                  <textarea
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="input-premium min-h-[140px] resize-none"
                    placeholder={t('admission.message')}
                    required
                  />
                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {t('common.send')}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <iframe
                title={t('contacts.map_title')}
                className="h-[360px] w-full border-0"
                src="/2gis-map.html"
              />
            </div>
            <div className="premium-card p-6">
              <h3 className="text-xl font-bold">{t('contacts.socials_title')}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/h.syganaki.kz' },
                  { label: 'Telegram', icon: Send, href: 'https://t.me/+77761764131' },
                ].map(({ label, icon: Icon, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 font-bold text-slate-700 hover:border-accent-gold hover:bg-accent-lightGold">
                    <Icon size={20} className="text-accent-gold" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
