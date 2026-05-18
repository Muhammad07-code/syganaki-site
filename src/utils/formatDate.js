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

  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${d}.${m}.${y} ${h}:${min}`;
};

export const normalizeText = (value = '') =>
  String(value).toLowerCase().trim();
