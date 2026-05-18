import React, { useEffect, useMemo, useState } from 'react';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { Check, FileText, Loader2, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db, isFirebaseConfigured } from '../firebase/config';

const localKey = 'syganaki-siteTexts';

const sections = [
  {
    id: 'home',
    titleKey: 'admin.content_home',
    fields: [
      ['home.heroTitle', 'admin.content_main_title', 'textarea'],
      ['home.heroSubtitle', 'admin.content_short_desc', 'textarea'],
      ['home.heroButton', 'admin.content_button_text', 'text'],
    ],
  },
  {
    id: 'about',
    titleKey: 'admin.content_about',
    fields: [
      ['about.text', 'admin.content_about_text', 'textarea'],
      ['about.mission', 'admin.content_mission', 'textarea'],
      ['about.values', 'admin.content_values', 'textarea'],
    ],
  },
  {
    id: 'admission',
    titleKey: 'admin.content_admission',
    fields: [
      ['admission.text', 'admin.content_admission_text', 'textarea'],
      ['admission.documents', 'admin.content_documents', 'textarea'],
      ['admission.requirements', 'admin.content_requirements', 'textarea'],
    ],
  },
  {
    id: 'contacts',
    titleKey: 'admin.content_contacts',
    fields: [
      ['contacts.phone', 'admin.content_phone', 'text'],
      ['contacts.email', 'admin.content_email', 'text'],
      ['contacts.address', 'admin.content_address', 'textarea'],
      ['contacts.hours', 'admin.content_hours', 'text'],
    ],
  },
  {
    id: 'footer',
    titleKey: 'admin.content_footer',
    fields: [
      ['footer.description', 'admin.content_footer_text', 'textarea'],
      ['footer.copyright', 'admin.content_copyright', 'textarea'],
      ['footer.socials', 'admin.content_socials', 'textarea'],
    ],
  },
];

const readLocal = () => {
  try {
    return JSON.parse(window.localStorage.getItem(localKey) || '[]');
  } catch {
    return [];
  }
};

const writeLocal = (items) => window.localStorage.setItem(localKey, JSON.stringify(items));

const docId = (language, key) => `${language}_${key.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

const ContentManager = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(sections[0].id);
  const [language, setLanguage] = useState(i18n.language || 'kz');
  const [values, setValues] = useState({});
  const [existingIds, setExistingIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeSection = useMemo(() => sections.find((section) => section.id === active) || sections[0], [active]);
  const allKeys = useMemo(() => sections.flatMap((section) => section.fields.map(([key]) => key)), []);

  useEffect(() => {
    setLanguage(i18n.language || 'kz');
  }, [i18n.language]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const nextValues = {};
      const nextIds = {};
      try {
        const rows = isFirebaseConfigured
          ? (await getDocs(collection(db, 'siteTexts'))).docs.map((item) => ({ id: item.id, ...item.data() }))
          : readLocal();

        rows
          .filter((item) => item.language === language && !item.deleted)
          .forEach((item) => {
            nextValues[item.key] = item.value || '';
            nextIds[item.key] = item.id;
          });
      } catch (error) {
        console.warn('siteTexts load error:', error);
      } finally {
        setValues(nextValues);
        setExistingIds(nextIds);
        setLoading(false);
      }
    };

    load();
  }, [language]);

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      if (!isFirebaseConfigured) {
        const current = readLocal();
        const withoutCurrent = current.filter((item) => !(item.language === language && allKeys.includes(item.key)));
        const nextRows = allKeys.map((key) => ({
          id: existingIds[key] || docId(language, key),
          key,
          language,
          value: values[key] || '',
          updatedAt: new Date().toISOString(),
        }));
        writeLocal([...nextRows, ...withoutCurrent]);
      } else {
        await Promise.all(allKeys.map((key) => setDoc(
          doc(db, 'siteTexts', existingIds[key] || docId(language, key)),
          {
            key,
            language,
            value: values[key] || '',
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        )));
      }
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <div className="premium-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">{t('admin.content')}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {t('admin.content_desc', { defaultValue: 'Сайт мәтіндерін түсінікті бөлімдер арқылы өзгертіңіз.' })}
              </p>
            </div>
          </div>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} className="admin-input lg:w-44">
            <option value="kz">Қазақша</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <div className="premium-card p-3">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActive(section.id)}
              className={`mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-extrabold ${
                active === section.id ? 'bg-primary text-white shadow-lg' : 'text-slate-600 hover:bg-accent-lightGold hover:text-primary'
              }`}
            >
              {t(section.titleKey)}
              {active === section.id && <Check size={16} />}
            </button>
          ))}
        </div>

        <div className="premium-card overflow-hidden">
          <div className="border-b border-slate-100 p-5">
            <h3 className="text-xl font-bold text-primary-dark">{t(activeSection.titleKey)}</h3>
            <p className="mt-1 text-sm text-slate-500">{t('admin.content_helper', { defaultValue: 'Өрістерді толтырып, барлық өзгерісті бір рет сақтаңыз.' })}</p>
          </div>
          <div className="space-y-5 p-5">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-lg bg-slate-100" />)
            ) : (
              activeSection.fields.map(([key, labelKey, type]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{t(labelKey)}</span>
                  {type === 'textarea' ? (
                    <textarea
                      value={values[key] || ''}
                      onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                      className="admin-input min-h-[130px] resize-y leading-7"
                      placeholder={t('admin.content_placeholder', { defaultValue: 'Мәтінді енгізіңіз...' })}
                    />
                  ) : (
                    <input
                      value={values[key] || ''}
                      onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                      className="admin-input"
                      placeholder={t('admin.content_placeholder', { defaultValue: 'Мәтінді енгізіңіз...' })}
                    />
                  )}
                </label>
              ))
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className={`text-sm font-bold ${saved ? 'text-emerald-600' : 'text-slate-400'}`}>
              {saved ? t('common.success') : t('admin.firebase_note')}
            </p>
            <button type="submit" disabled={saving || loading} className="btn-primary">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {t('admin.save')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContentManager;
