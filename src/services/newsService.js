import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, isFirebaseConfigured, storage } from '../firebase/config';
import { formatDate } from '../utils/formatDate';
import { validateImageFile } from '../utils/security';

const NEWS_COLLECTION = 'news';
const localKey = 'syganaki-news';

const getLocalNews = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(window.localStorage.getItem(localKey) || '[]');
};

const setLocalNews = (items) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(localKey, JSON.stringify(items));
  }
};

export const mapNewsDoc = (document, language = 'kz') => {
  const data = document.data();
  const rawDate = data.createdAt || data.updatedAt || data.date;

  return {
    id: document.id,
    ...data,
    date: data.date || formatDate(rawDate, language),
  };
};

export const fetchNewsList = async (fallback = [], language = 'kz') => {
  let dbItems = [];

  if (!isFirebaseConfigured) {
    dbItems = getLocalNews();
  } else {
    try {
      const q = query(collection(db, NEWS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      dbItems = snapshot.docs.map((item) => mapNewsDoc(item, language));
    } catch (error) {
      console.warn('News fetch error:', error);
    }
  }

  const deletedIds = dbItems.filter((i) => i.deleted).map((i) => String(i.id));
  const validDbItems = dbItems.filter((i) => !i.deleted);

  const validFallback = fallback
    .map((f, idx) => ({ ...f, id: String(f.id || `fallback-${idx}`) }))
    .filter((f) => !deletedIds.includes(f.id) && !validDbItems.find((dbItem) => String(dbItem.id) === f.id));

  return [...validDbItems, ...validFallback];
};

export const fetchNewsArticle = async (id, fallback = [], language = 'kz') => {
  if (!isFirebaseConfigured) {
    const localItem = getLocalNews().find((item) => String(item.id) === String(id));
    return localItem || fallback.find((item) => String(item.id) === String(id)) || null;
  }

  try {
    const snap = await getDoc(doc(db, NEWS_COLLECTION, id));
    if (snap.exists()) return mapNewsDoc(snap, language);
  } catch (error) {
    console.warn('Article fallback is used:', error);
  }

  return fallback.find((item) => String(item.id) === String(id)) || null;
};

export const saveNewsArticle = async (payload, editingId) => {
  if (!isFirebaseConfigured) {
    const items = getLocalNews();
    const now = new Date().toISOString();
    if (editingId) {
      setLocalNews(items.map((item) => (item.id === editingId ? { ...item, ...payload, updatedAt: now } : item)));
      return editingId;
    }

    const id = crypto.randomUUID?.() || String(Date.now());
    setLocalNews([{ id, ...payload, date: payload.date || new Date().toLocaleDateString(), createdAt: now }, ...items]);
    return id;
  }

  if (editingId) {
    await setDoc(doc(db, NEWS_COLLECTION, editingId), {
      ...payload,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return editingId;
  }

  const result = await addDoc(collection(db, NEWS_COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return result.id;
};

export const deleteNewsArticle = (id) => {
  if (!isFirebaseConfigured) {
    const current = getLocalNews();
    const exists = current.find(i => String(i.id) === String(id));
    if (exists) {
      setLocalNews(current.map(i => String(i.id) === String(id) ? { ...i, deleted: true } : i));
    } else {
      setLocalNews([...current, { id, deleted: true }]);
    }
    return Promise.resolve();
  }

  return setDoc(doc(db, NEWS_COLLECTION, id), { deleted: true }, { merge: true });
};

export const uploadNewsImage = async (file) => {
  validateImageFile(file);

  const toBase64 = (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  if (!isFirebaseConfigured) {
    return toBase64(file);
  }

  try {
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const imageRef = ref(storage, `news/${safeName}`);
    
    // Upload with timeout to prevent hanging
    const uploadPromise = uploadBytes(imageRef, file).then(() => getDownloadURL(imageRef));
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 15000));
    
    return await Promise.race([uploadPromise, timeoutPromise]);
  } catch (error) {
    console.warn('Firebase Storage failed or timed out. Falling back to base64.', error);
    return toBase64(file);
  }
};
