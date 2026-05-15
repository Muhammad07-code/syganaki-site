import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { formatDate } from '../utils/formatDate';

const FIREBASE_READ_TIMEOUT = 6000;

const withTimeout = (promise, timeout = FIREBASE_READ_TIMEOUT) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('firebase_read_timeout')), timeout);
    }),
  ]);

export const fetchDataList = async (collectionName, fallback = [], language = 'kz') => {
  let dbItems = [];

  if (!isFirebaseConfigured) {
    dbItems = JSON.parse(window.localStorage.getItem(`syganaki-${collectionName}`) || '[]');
  } else {
    try {
      const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      const snapshot = await withTimeout(getDocs(q));
      dbItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt ? formatDate(doc.data().createdAt, language) : (doc.data().date || '')
      }));
    } catch (error) {
      console.warn(`${collectionName} fetch error, using fallback:`, error);
    }
  }

  const deletedIds = dbItems.filter((i) => i.deleted).map((i) => String(i.id));
  const validDbItems = dbItems.filter((i) => !i.deleted);

  const validFallback = fallback
    .map((f, idx) => ({ ...f, id: String(f.id || `fallback-${idx}`) }))
    .filter((f) => !deletedIds.includes(f.id) && !validDbItems.find((dbItem) => String(dbItem.id) === f.id));

  return [...validDbItems, ...validFallback];
};
