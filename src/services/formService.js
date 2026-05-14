import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { canSubmitForm, sanitizeFormPayload } from '../utils/security';

const saveLocal = (collectionName, data) => {
  const key = `syganaki-${collectionName}`;
  const current = JSON.parse(window.localStorage.getItem(key) || '[]');
  const item = {
    id: crypto.randomUUID?.() || String(Date.now()),
    ...data,
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(key, JSON.stringify([item, ...current]));
  return Promise.resolve({ id: item.id });
};

export const saveApplication = (data) => {
  if (!canSubmitForm('application', 90_000)) {
    return Promise.reject(new Error('rate_limited'));
  }
  const clean = sanitizeFormPayload(data, { fullName: 120, phone: 40, program: 120, message: 1000 });
  return isFirebaseConfigured
    ? addDoc(collection(db, 'applications'), {
        ...clean,
        status: 'new',
        createdAt: serverTimestamp(),
      })
    : saveLocal('applications', { ...clean, status: 'new' });
};

export const saveInquiry = (data) => {
  if (!canSubmitForm('inquiry', 60_000)) {
    return Promise.reject(new Error('rate_limited'));
  }
  const clean = sanitizeFormPayload(data, { name: 120, phone: 40, subject: 120, message: 1200 });
  return isFirebaseConfigured
    ? addDoc(collection(db, 'inquiries'), {
        ...clean,
        status: 'new',
        type: clean.type || 'contact_form',
        createdAt: serverTimestamp(),
      })
    : saveLocal('inquiries', { ...clean, status: 'new', type: clean.type || 'contact_form' });
};

export const buildWhatsAppLink = (phone, message) => {
  const normalizedPhone = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};
