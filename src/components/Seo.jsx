import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getInstituteContent } from '../data/instituteContent';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://hsyganaki.kz').replace(/\/$/, '');

const setMeta = (selector, attr, value) => {
  if (!value) return;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.setAttribute(attr, value);
};

const setCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const Seo = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const institute = getInstituteContent(i18n.language);

  useEffect(() => {
    const path = location.pathname;
    const route = path.split('/')[1] || 'home';
    const routeTitles = {
      home: t('brand.name'),
      about: t('nav.about'),
      programs: t('nav.programs'),
      teachers: t('nav.teachers'),
      partners: t('nav.partners'),
      admission: t('nav.admission'),
      news: t('nav.news'),
      gallery: t('nav.gallery'),
      faq: t('nav.faq'),
      contacts: t('nav.contacts'),
    };

    const routeDescriptions = {
      home: institute.heroSubtitle,
      about: institute.aboutText,
      programs: t('programs.subtitle'),
      teachers: institute.teacherText,
      partners: t('partners.subtitle'),
      admission: t('admission.subtitle'),
      news: t('news.subtitle'),
      gallery: t('gallery.subtitle'),
      faq: t('faq.subtitle'),
      contacts: t('contacts.subtitle'),
    };

    const routeImages = {
      home: institute.baseImages.hero,
      about: institute.baseImages.about,
      programs: institute.baseImages.lecture,
      teachers: institute.baseImages.studyGroup,
      partners: institute.baseImages.international,
      admission: institute.baseImages.students,
      news: institute.baseImages.seminar,
      gallery: institute.baseImages.campus,
      contacts: institute.baseImages.hero,
    };

    const title = routeTitles[route] ? `${routeTitles[route]} | ${t('brand.type')}` : `${t('brand.name')} | ${t('brand.type')}`;
    const description = routeDescriptions[route] || institute.heroSubtitle;
    const canonical = `${siteUrl}${path === '/' ? '' : path}`;
    const image = `${siteUrl}${routeImages[route] || institute.baseImages.hero}`;

    document.title = title;
    document.documentElement.lang = i18n.language === 'kz' ? 'kk' : i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', 'index, follow');
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setCanonical(canonical);
  }, [i18n.language, institute, location.pathname, t]);

  return null;
};

export default Seo;
