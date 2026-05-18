import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Send,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MobileMenuAccordion from './MobileMenuAccordion';
import { getInstituteContent } from '../data/instituteContent';
import { normalizeText } from '../utils/formatDate';

const languages = [
  { code: 'kz', label: 'Қазақша', short: 'ҚАЗ' },
  { code: 'ru', label: 'Русский', short: 'РУС' },
  { code: 'en', label: 'English', short: 'ENG' },
  { code: 'ar', label: 'العربية', short: 'عربي' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const institute = useMemo(() => getInstituteContent(i18n.language), [i18n.language]);

  const navItems = useMemo(
    () => [
      { label: t('nav.home'), path: '/' },
      { label: t('nav.about'), path: '/about' },
      { label: t('nav.programs'), path: '/programs' },
      { label: t('nav.teachers'), path: '/teachers' },
      { label: t('nav.partners'), path: '/partners' },
      { label: t('nav.admission'), path: '/admission' },
      { label: t('nav.news'), path: '/news' },
      { label: t('nav.gallery'), path: '/gallery' },
      { label: t('nav.contacts'), path: '/contacts' },
    ],
    [t],
  );

  const currentLanguage =
    languages.find((language) => language.code === i18n.language) || languages[0];
  const isLight = scrolled;

  const searchResults = useMemo(() => {
    const baseItems = [
      ...navItems.map((item) => ({ title: item.label, label: t('common.details'), path: item.path })),
      ...institute.programs.map((item) => ({ title: item.title, label: t('nav.programs'), path: '/programs' })),
      ...institute.news.map((item) => ({ title: item.title, label: t('nav.news'), path: `/news/${item.id}` })),
      ...institute.gallery.slice(0, 6).map((item) => ({ title: item.title, label: t('nav.gallery'), path: '/gallery' })),
    ];
    const query = normalizeText(searchQuery);
    const results = query
      ? baseItems.filter((item) => normalizeText(`${item.title} ${item.label}`).includes(query))
      : baseItems.slice(0, 6);

    return results.slice(0, 8);
  }, [institute, navItems, searchQuery, t]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = () => setLangOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [langOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    setMenuOpen(false);
  };

  const handleLogoClick = (event) => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    window.setTimeout(() => setLogoClicks(0), 1800);

    if (nextCount >= 4) {
      event.preventDefault();
      setLogoClicks(0);
      navigate('/admin/login');
    }
  };

  return (
    <>
      <div
        dir="ltr"
        className={`fixed inset-x-0 top-0 z-50 hidden border-b transition-all duration-500 lg:block ${
          scrolled
            ? '-translate-y-full border-transparent bg-primary-dark/0'
            : 'translate-y-0 border-white/10 bg-primary-dark/60 backdrop-blur-xl'
        }`}
      >
        <div className="container-custom flex h-10 items-center justify-between text-xs font-semibold text-white/80">
          <div className="flex min-w-0 items-center gap-6">
            <span className="flex min-w-0 items-center gap-2">
              <MapPin size={14} className="shrink-0 text-accent-gold" />
              <a href="https://2gis.kz/astana/geo/70000001066292633/71.416744,51.125984" target="_blank" rel="noreferrer" className="truncate hover:text-accent-gold">{t('topbar.address')}</a>
            </span>
            <a href={`tel:${t('topbar.phone')}`} className="flex items-center gap-2 hover:text-accent-gold">
              <Phone size={14} className="text-accent-gold" />
              {t('topbar.phone')}
            </a>
            <a href={`mailto:${t('topbar.email')}`} className="flex items-center gap-2 hover:text-accent-gold">
              <Mail size={14} className="text-accent-gold" />
              {t('topbar.email')}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/h.syganaki.kz" target="_blank" rel="noreferrer" className="hover:text-accent-gold">
              <Instagram size={16} />
            </a>
            <a href="https://t.me/+77761764131" target="_blank" rel="noreferrer" className="hover:text-accent-gold">
              <Send size={16} />
            </a>
          </div>
        </div>
      </div>

      <header
        dir="ltr"
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
          isLight
            ? 'top-0 border-b border-slate-200/80 bg-white/95 shadow-[0_18px_60px_rgba(5,24,17,0.08)] backdrop-blur-xl'
            : 'top-0 bg-transparent lg:top-10'
        }`}
      >
        <div className="container-custom flex h-20 items-center justify-between gap-3 lg:h-[86px]">
          <Link to="/" onClick={handleLogoClick} className="flex shrink-0 items-center gap-3">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-1.5 transition-all ${
                isLight
                  ? 'border-primary/10 bg-white shadow-sm'
                  : 'border-white/20 bg-white/95 shadow-[0_16px_44px_rgba(0,0,0,0.22)]'
              }`}
            >
              <img src="/logo.png" alt={t('brand.name')} className="h-full w-full object-contain" />
            </span>
            <span className="hidden min-w-0 max-w-[220px] sm:block lg:max-w-[260px] 2xl:max-w-none">
              <span
                className={`block truncate font-serif text-base font-extrabold leading-tight 2xl:text-lg ${
                  isLight ? 'text-primary-dark' : 'text-white'
                }`}
              >
                {t('brand.name')}
              </span>
              <span className="mt-0.5 block truncate text-[9px] font-extrabold uppercase tracking-[0.22em] text-accent-gold 2xl:text-[10px] 2xl:tracking-[0.28em]">
                {t('brand.type')}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <div key={item.path} className="group relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-lg px-2 text-[10px] font-extrabold uppercase tracking-[0.04em] transition-all 2xl:px-2.5 2xl:text-[11px] ${
                      isLight ? 'text-slate-700 hover:bg-primary/5' : 'text-white/90 hover:bg-white/10'
                    } ${isActive ? 'text-accent-gold' : ''}`
                  }
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                </NavLink>
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t('common.search')}
              className={`hidden h-11 w-11 items-center justify-center rounded-lg 2xl:flex ${
                isLight ? 'text-slate-700 hover:bg-primary/5' : 'text-white hover:bg-white/10'
              }`}
            >
              <Search size={20} />
            </button>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setLangOpen((value) => !value)}
                className={`flex h-9 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold transition-colors ${
                  isLight
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-primary-dark'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Globe size={16} className="opacity-70" />
                {currentLanguage.short}
                <ChevronDown size={14} className={`opacity-70 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="premium-card absolute right-0 top-full mt-2 w-36 overflow-hidden p-1.5"
                    style={{ zIndex: 100 }}
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => changeLanguage(language.code)}
                        className={`flex w-full items-center justify-between rounded px-3 py-2.5 text-xs font-semibold transition-colors ${
                          currentLanguage.code === language.code
                            ? 'bg-primary/10 text-primary-dark'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                        }`}
                      >
                        <span>{language.label}</span>
                        <span className="text-[10px] opacity-50">{language.short}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`flex h-11 w-11 items-center justify-center rounded-lg xl:hidden ${
                isLight ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white backdrop-blur-xl'
              }`}
              aria-label="Open menu"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="safe-bottom ml-auto flex h-full w-full max-w-sm flex-col overflow-hidden bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <img src="/logo.png" alt={t('brand.name')} className="h-8 w-8 shrink-0 rounded-md object-contain" />
                  <p className="line-clamp-2 font-serif text-sm font-bold leading-tight text-primary-dark">{t('brand.name')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg p-2 text-primary transition-colors hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <nav className="border-b border-slate-100">
                  {navItems.map((item) => (
                    <MobileMenuAccordion
                      key={item.path}
                      item={item}
                      onNavigate={() => {
                        setMenuOpen(false);
                      }}
                    />
                  ))}
                </nav>
              </div>

              <div className="space-y-3 border-t border-slate-100 bg-slate-50 p-4">
                <Link
                  to="/admission"
                  className="flex items-center justify-center rounded-lg bg-accent-gold py-2.5 text-sm font-bold text-primary-dark transition-colors hover:bg-accent-gold/90"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('nav.apply')}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="fixed right-4 top-24 z-[110] w-[calc(100vw-2rem)] max-w-xl sm:right-6 lg:right-8 lg:top-28"
          >
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_80px_rgba(5,24,17,0.22)]">
              <div className="flex items-center gap-3 border-b border-slate-100 p-3">
                <Search className="shrink-0 text-accent-gold" size={20} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder={t('common.search_placeholder')}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100"
                  aria-label={t('common.close')}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[340px] overflow-y-auto p-2">
                {searchResults.length ? (
                  searchResults.map((item, index) => (
                    <Link
                      key={`${item.path}-${item.title}-${index}`}
                      to={item.path}
                      className="group flex items-center justify-between gap-4 rounded-lg px-3 py-3 hover:bg-accent-lightGold/70"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-primary-dark">{item.title}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-slate-500">{item.label}</span>
                      </span>
                      <Search size={15} className="shrink-0 text-slate-300 group-hover:text-accent-gold" />
                    </Link>
                  ))
                ) : (
                  <div className="px-3 py-8 text-center text-sm font-semibold text-slate-500">
                    {t('common.not_found')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
