const locales = {
  kz: 'kk-KZ',
  ru: 'ru-RU',
  en: 'en-US',
  ar: 'ar',
};

export const getLocale = (language = 'kz') => locales[language] || locales.kz;

export const formatDate = (value, language = 'kz') => {
  if (!value) return '';

  const date =
    typeof value?.toDate === 'function'
      ? value.toDate()
      : value instanceof Date
        ? value
        : new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(getLocale(language), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const normalizeText = (value = '') =>
  String(value).toLowerCase().trim();
