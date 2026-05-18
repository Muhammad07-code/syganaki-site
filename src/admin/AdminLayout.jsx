import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Bell,
  Bot,
  FileText,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Settings,
  User,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { hasAdminAccess } from '../services/adminAuth';
import { markNotificationsRead, subscribeAdminNotifications } from '../services/notificationService';

const AdminLayout = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifications = useMemo(
    () => notifications.filter((item) => !item.read),
    [notifications],
  );

  const counts = useMemo(
    () => ({
      notifications: unreadNotifications.length,
      applications: unreadNotifications.filter((item) => item.type === 'application').length,
      inquiries: unreadNotifications.filter((item) => item.type === 'message').length,
      uploads: unreadNotifications.filter((item) => item.type === 'upload').length,
    }),
    [unreadNotifications],
  );

  const menuItems = [
    { icon: LayoutDashboard, label: t('admin.dashboard'), path: '/admin' },
    { icon: Bell, label: t('admin.notifications'), path: '/admin/notifications', badge: counts.notifications },
    { icon: Inbox, label: t('admin.applications'), path: '/admin/applications', badge: counts.applications },
    { icon: MessageSquare, label: t('admin.inquiries'), path: '/admin/inquiries', badge: counts.inquiries },
    { icon: Newspaper, label: t('admin.news'), path: '/admin/news', badge: counts.uploads },
    { icon: Image, label: t('admin.gallery'), path: '/admin/gallery' },
    { icon: Settings, label: t('admin.programs'), path: '/admin/programs' },
    { icon: FileText, label: t('admin.content'), path: '/admin/content' },
    { icon: Bot, label: t('admin.assistant'), path: '/admin/assistant' },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/admin/login');
      } else {
        try {
          const allowed = await hasAdminAccess(currentUser);
          if (!allowed) {
            setAccessDenied(true);
            await signOut(auth);
          } else {
            setUser(currentUser);
          }
        } catch {
          setAccessDenied(true);
          await signOut(auth);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user && isFirebaseConfigured) return;
    const unsubscribe = subscribeAdminNotifications(user, i18n.language, setNotifications);
    return () => unsubscribe();
  }, [i18n.language, user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="premium-panel max-w-md bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-primary-dark">{t('admin.unauthorized', { defaultValue: 'You do not have access to this section.' })}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">{t('admin.security_note', { defaultValue: 'Admin access is protected by Firebase Auth and the admin role.' })}</p>
          <Link to="/admin/login" className="btn-primary mt-6">{t('admin.login')}</Link>
        </div>
      </div>
    );
  }

  const currentTitle = menuItems.find((item) => item.path === location.pathname)?.label || t('admin.dashboard');
  const totalNew = counts.notifications;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 lg:flex">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] max-w-[86vw] transform bg-primary-dark text-white shadow-2xl transition-transform duration-300 lg:static lg:max-w-none lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                <img src="/logo.png" alt={t('brand.name')} className="h-full w-full object-contain" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-serif text-base font-bold">{t('brand.short')}</span>
                <span className="block truncate text-[10px] font-extrabold uppercase tracking-[0.22em] text-accent-gold">Admin</span>
              </span>
            </Link>
            <button type="button" className="rounded-lg bg-white/10 p-2 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {menuItems.map(({ icon: Icon, label, path, badge }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/admin'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-accent-gold text-primary-dark shadow-lg'
                      : 'text-white/65 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={19} />
                  {label}
                </div>
                {badge > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm">
                    {badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-red-200 hover:bg-red-500/10 hover:text-red-100"
            >
              <LogOut size={19} />
              {t('admin.logout')}
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" className="rounded-lg bg-slate-100 p-2 text-primary lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={21} />
            </button>
            <h1 className="truncate text-lg font-extrabold text-primary-dark">{currentTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/notifications')}
              className="relative rounded-lg bg-slate-100 p-2 text-slate-600 hover:bg-accent-lightGold hover:text-primary"
              aria-label={t('admin.notifications')}
            >
              <Bell size={20} />
              {totalNew > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
            <div className="hidden text-right sm:block">
              <p className="max-w-[220px] truncate text-xs font-bold text-slate-700">{user?.email}</p>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Administrator</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <User size={20} />
            </div>
          </div>
        </header>

        <main className="p-3 sm:p-6 lg:p-8">
          <Outlet context={{ user, notifications, markNotificationsRead }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
