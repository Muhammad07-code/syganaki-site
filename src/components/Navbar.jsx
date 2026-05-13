import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Globe2,
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
import LanguagePills from './LanguagePills';

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
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = useMemo(
    () => [
      { label: t('nav.home'), path: '/' },
      {
        label: t('nav.about'),
        path: '/about',
        children: [
          { label: t('about.history_title'), path: '/about' },
          { label: t('gallery.title'), path: '/gallery' },
          { label: t('faq.title'), path: '/#faq' },
        ],
      },
      {
        label: t('nav.programs'),
        path: '/programs',
        children: t('programs.items', { returnObjects: true }).slice(0, 3).map((item) => ({
          label: item.title,
          path: '/programs',
        })),
      },
      { label: t('nav.admission'), path: '/admission' },
      { label: t('nav.news'), path: '/news' },
      { label: t('nav.contacts'), path: '/contacts' },
    ],
    [t],
  );

  const currentLanguage =
    languages.find((language) => language.code === i18n.language) || languages[0];
  const isLight = scrolled;

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
  }, [location.pathname]);

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
            <a href="https://t.me/" target="_blank" rel="noreferrer" className="hover:text-accent-gold">
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
        <div className="container-custom flex h-20 items-center justify-between gap-4 lg:h-[86px]">
          <Link to="/" onClick={handleLogoClick} className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-1.5 transition-all ${
                isLight
                  ? 'border-primary/10 bg-white shadow-sm'
                  : 'border-white/20 bg-white/95 shadow-[0_16px_44px_rgba(0,0,0,0.22)]'
              }`}
            >
              <img src="/logo.png" alt={t('brand.name')} className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0">
              <span
                className={`block truncate font-serif text-lg font-extrabold leading-tight sm:text-xl ${
                  isLight ? 'text-primary-dark' : 'text-white'
                }`}
              >
                {t('brand.name')}
              </span>
              <span className="block truncate text-[10px] font-extrabold uppercase tracking-[0.28em] text-accent-gold">
                {t('brand.type')}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div key={item.path} className="group relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-lg px-3 text-xs font-extrabold uppercase tracking-[0.08em] transition-all ${
                      isLight ? 'text-slate-700 hover:bg-primary/5' : 'text-white/90 hover:bg-white/10'
                    } ${isActive ? 'text-accent-gold' : ''}`
                  }
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                </NavLink>

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full min-w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="premium-card overflow-hidden p-2">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.label}-${child.path}`}
                          to={child.path}
                          className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-accent-lightGold hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t('common.search')}
              className={`hidden h-11 w-11 items-center justify-center rounded-lg lg:flex ${
                isLight ? 'text-slate-700 hover:bg-primary/5' : 'text-white hover:bg-white/10'
              }`}
            >
              <Search size={20} />
            </button>

            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setLangOpen((value) => !value)}
                className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-bold transition-colors ${
                  isLight
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-primary-dark'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {currentLanguage.short}
                <ChevronDown size={14} className="opacity-70" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="premium-card absolute right-0 top-full mt-2 w-32 overflow-hidden p-1.5"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => changeLanguage(language.code)}
                        className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs font-semibold transition-colors ${
                          currentLanguage.code === language.code
                            ? 'bg-primary/10 text-primary-dark'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                        }`}
                      >
                        {language.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/admission" 
              className={`hidden xl:inline-flex h-9 items-center justify-center rounded-full px-5 text-xs font-bold transition-all ${
                isLight 
                  ? 'bg-primary/5 text-primary hover:bg-primary hover:text-white' 
                  : 'bg-white/10 text-white backdrop-blur hover:bg-accent-gold hover:text-primary-dark'
              }`}
            >
              {t('nav.apply')}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`flex h-11 w-11 items-center justify-center rounded-lg lg:hidden ${
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
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="safe-bottom ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <img src="/logo.png" alt={t('brand.name')} className="h-8 w-8 rounded-md object-contain" />
                  <p className="truncate font-serif text-sm font-bold text-primary-dark">{t('brand.short')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg hover:bg-slate-100 p-2 text-primary transition-colors"
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

              <div className="border-t border-slate-100 bg-slate-50 p-4 space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-600 mb-2">LANGUAGE</p>
                  <LanguagePills
                    languages={languages}
                    currentLanguage={currentLanguage}
                    onChange={(code) => {
                      changeLanguage(code);
                    }}
                  />
                </div>
                <Link
                  to="/admission"
                  className="flex items-center justify-center rounded-lg bg-accent-gold text-primary-dark font-bold py-2.5 hover:bg-accent-gold/90 transition-colors text-sm"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-primary-dark/96 p-4 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute right-4 top-4 rounded-lg bg-white/10 p-3 text-white hover:bg-white/20 sm:right-8 sm:top-8"
              aria-label={t('common.close')}
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-3xl">
              <p className="section-eyebrow">{t('common.search')}</p>
              <div className="relative">
                <input
                  autoFocus
                  className="w-full border-b border-white/25 bg-transparent py-4 pr-12 text-2xl text-white outline-none placeholder:text-white/25 focus:border-accent-gold sm:text-3xl"
                  placeholder={t('common.search_placeholder')}
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-accent-gold" size={24} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {navItems.map((item) => (
                  <Link key={`search-${item.path}`} to={item.path} className="btn-secondary">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
