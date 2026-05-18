import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Circle, Image as ImageIcon, Inbox, MessageSquare, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase/config';
import {
  markNotificationRead,
  markNotificationsRead,
  subscribeAdminNotifications,
} from '../services/notificationService';

const typeIcon = {
  application: Inbox,
  message: MessageSquare,
  upload: ImageIcon,
};

const notificationTone = {
  application: 'bg-blue-50 text-blue-700',
  message: 'bg-emerald-50 text-emerald-700',
  upload: 'bg-amber-50 text-amber-700',
};

const Notifications = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAdminNotifications(auth.currentUser, i18n.language, setNotifications);
    return () => unsubscribe();
  }, [i18n.language]);

  const unread = useMemo(() => notifications.filter((item) => !item.read), [notifications]);
  const visible = useMemo(() => {
    if (filter === 'unread') return notifications.filter((item) => !item.read);
    if (filter === 'read') return notifications.filter((item) => item.read);
    return notifications;
  }, [filter, notifications]);

  const openNotification = async (item) => {
    await markNotificationRead(auth.currentUser, item.id);
    navigate(item.route);
  };

  const markAllRead = async () => {
    setMarking(true);
    try {
      await markNotificationsRead(auth.currentUser, unread.map((item) => item.id));
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="premium-card p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
              <Bell size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">{t('admin.notifications')}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{t('admin.notifications_desc')}</p>
            </div>
          </div>
        </div>

        <button type="button" onClick={markAllRead} disabled={marking || unread.length === 0} className="btn-primary">
          <CheckCheck size={18} />
          {t('admin.mark_all_read')}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          ['all', t('common.all'), notifications.length],
          ['unread', t('admin.unread'), unread.length],
          ['read', t('admin.read'), notifications.length - unread.length],
        ].map(([value, label, count]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-bold ${
              filter === value ? 'bg-primary text-white shadow-lg' : 'border border-slate-200 bg-white text-slate-600 hover:bg-accent-lightGold'
            }`}
          >
            {label} {count > 0 ? `(${count})` : ''}
          </button>
        ))}
      </div>

      {visible.length ? (
        <div className="grid gap-3">
          {visible.map((item) => {
            const Icon = typeIcon[item.type] || Newspaper;
            return (
              <article key={item.id} className={`premium-card overflow-hidden ${item.read ? 'bg-white' : 'border-primary/20 bg-white shadow-[0_18px_60px_rgba(5,24,17,0.12)]'}`}>
                <button
                  type="button"
                  onClick={() => openNotification(item)}
                  className="grid w-full gap-4 p-4 text-left sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${notificationTone[item.type] || 'bg-slate-50 text-slate-700'}`}>
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {!item.read && <Circle size={9} className="fill-red-500 text-red-500" />}
                      <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-500">
                        {t(`admin.notification_${item.type}`)}
                      </span>
                      {item.date && <span className="text-xs font-semibold text-slate-400">{item.date}</span>}
                    </div>
                    <h3 className="mt-2 line-clamp-1 font-serif text-xl font-bold text-primary-dark">{item.title}</h3>
                    {item.body && <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{item.body}</p>}
                  </div>
                  {item.image ? (
                    <img src={item.image} alt="" className="hidden h-16 w-24 rounded-lg object-cover sm:block" />
                  ) : (
                    <span className="hidden text-xs font-bold uppercase tracking-[0.14em] text-primary sm:block">
                      {t('admin.open')}
                    </span>
                  )}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="premium-card p-10 text-center">
          <Bell className="mx-auto mb-4 text-slate-300" size={38} />
          <p className="font-bold text-slate-600">{t('admin.no_notifications')}</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
