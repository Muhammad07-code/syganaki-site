import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

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

export const saveApplication = (data) =>
  isFirebaseConfigured
    ? addDoc(collection(db, 'applications'), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp(),
      })
    : saveLocal('applications', { ...data, status: 'new' });

export const saveInquiry = (data) =>
  isFirebaseConfigured
    ? addDoc(collection(db, 'inquiries'), {
        ...data,
        status: 'new',
        type: data.type || 'contact_form',
        createdAt: serverTimestamp(),
      })
    : saveLocal('inquiries', { ...data, status: 'new', type: data.type || 'contact_form' });

export const buildWhatsAppLink = (phone, message) => {
  const normalizedPhone = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};
