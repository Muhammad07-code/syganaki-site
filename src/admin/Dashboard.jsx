import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { ArrowRight, Bot, Clock, Inbox, MessageSquare, Newspaper, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db, isFirebaseConfigured } from '../firebase/config';
import { formatDate } from '../utils/formatDate';

const StatCard = ({ title, value, icon: Icon, tone, to }) => (
  <Link to={to} className="premium-card p-5 block hover:shadow-xl transition-shadow duration-200">
    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${tone}`}>
      <Icon size={23} />
    </div>
    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{title}</p>
    <p className="mt-2 font-serif text-3xl font-extrabold text-primary-dark">{value}</p>
  </Link>
);

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState({ applications: 0, inquiries: 0, news: 0, assistant: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      const localCount = (key) => {
        try {
          return JSON.parse(window.localStorage.getItem(`syganaki-${key}`) || '[]').length;
        } catch {
          return 0;
        }
      };
      setStats({
        applications: localCount('applications'),
        inquiries: localCount('inquiries'),
        news: localCount('news'),
        assistant: 3,
      });
      const localApps = JSON.parse(window.localStorage.getItem('syganaki-applications') || '[]');
      setRecent(localApps.slice(0, 5));
      setLoading(false);
      return;
    }

    const unsubApps = onSnapshot(collection(db, 'applications'), (snap) => {
      setStats(prev => ({ ...prev, applications: snap.size }));
    });

    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snap) => {
      setStats(prev => ({ ...prev, inquiries: snap.size }));
    });

    const unsubNews = onSnapshot(collection(db, 'news'), (snap) => {
      setStats(prev => ({ ...prev, news: snap.size }));
    });

    const unsubAssistant = onSnapshot(collection(db, 'assistantFaq'), (snap) => {
      setStats(prev => ({ ...prev, assistant: snap.size }));
    });

    const qRecent = query(collection(db, 'applications'), orderBy('createdAt', 'desc'), limit(5));
    const unsubRecent = onSnapshot(qRecent, (snap) => {
      setRecent(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: formatDate(doc.data().createdAt, i18n.language)
      })));
      setLoading(false);
    });

    return () => {
      unsubApps();
      unsubInquiries();
      unsubNews();
      unsubAssistant();
      unsubRecent();
    };
  }, [i18n.language]);

  const cards = [
    { title: t('admin.applications'), value: stats.applications, icon: Inbox, tone: 'bg-primary text-white', to: '/admin/applications' },
    { title: t('admin.inquiries'), value: stats.inquiries, icon: MessageSquare, tone: 'bg-emerald-600 text-white', to: '/admin/inquiries' },
    { title: t('admin.news'), value: stats.news, icon: Newspaper, tone: 'bg-accent-gold text-primary-dark', to: '/admin/news' },
    { title: t('admin.assistant'), value: stats.assistant, icon: Bot, tone: 'bg-slate-900 text-white', to: '/admin/assistant' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="premium-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-xl font-bold">{t('admin.applications')}</h2>
            <Link to="/admin/applications" className="text-sm font-extrabold text-primary hover:text-accent-gold">
              {t('common.all')}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-4">{t('admission.name')}</th>
                  <th className="px-5 py-4">{t('admission.program')}</th>
                  <th className="px-5 py-4">{t('common.date')}</th>
                  <th className="px-5 py-4">{t('admin.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="4" className="px-5 py-10 text-center text-slate-500">{t('common.loading')}</td></tr>
                ) : recent.length ? (
                  recent.map((item) => (
                    <tr key={item.id}>
                      <td className="px-5 py-4 font-bold text-primary-dark">{item.fullName}</td>
                      <td className="px-5 py-4 text-slate-600">{item.program}</td>
                      <td className="px-5 py-4 text-slate-500">{item.date || formatDate(item.createdAt, i18n.language)}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                          (item.status === 'accepted' || item.status === 'contacted') ? 'bg-emerald-50 text-emerald-700' :
                          item.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {item.status ? t(`admin.${item.status === 'contacted' ? 'processed' : item.status}`) : t('admin.new')}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="px-5 py-10 text-center text-slate-500">{t('common.not_found')}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="premium-card bg-primary-dark p-6 text-white">
            <TrendingUp className="mb-5 text-accent-gold" size={30} />
            <h2 className="text-xl font-bold text-white">{t('admin.dashboard')}</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">{t('admin.production_note')}</p>
            <Link to="/admin/news" className="btn-gold mt-6 w-full !text-primary-dark">
              {t('admin.add_news', { defaultValue: `${t('admin.add')} ${t('admin.news')}` })}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="premium-card p-6 border-l-4 border-accent-gold">
            <Clock className="mb-4 text-accent-gold" size={28} />
            <h3 className="font-bold">{t('admin.realtime')}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {t('admin.realtime_desc', { defaultValue: 'Система обновляется в реальном времени. Новые заявки появятся здесь мгновенно.' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
