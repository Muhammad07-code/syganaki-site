import React, { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { CheckCircle2, Clock, Phone, Search, Trash2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db, isFirebaseConfigured } from '../firebase/config';
import { formatDate, normalizeText } from '../utils/formatDate';

const localKey = 'syganaki-applications';
const readLocal = () => JSON.parse(window.localStorage.getItem(localKey) || '[]');
const writeLocal = (items) => window.localStorage.setItem(localKey, JSON.stringify(items));

const Applications = () => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setItems(readLocal());
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
        date: formatDate(item.data().createdAt, i18n.language)
      })));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching applications:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [i18n.language]);

  const changeStatus = async (id, nextStatus) => {
    if (!isFirebaseConfigured) {
      const nextItems = items.map((item) => (item.id === id ? { ...item, status: nextStatus } : item));
      setItems(nextItems);
      writeLocal(nextItems);
      return;
    }
    try {
      await updateDoc(doc(db, 'applications', id), { status: nextStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm(t('admin.delete'))) return;
    if (!isFirebaseConfigured) {
      const nextItems = items.filter((item) => item.id !== id);
      setItems(nextItems);
      writeLocal(nextItems);
      return;
    }
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const filtered = useMemo(() => {
    const q = normalizeText(search);
    return items.filter((item) => {
      const matchSearch =
        !q ||
        normalizeText(item.fullName).includes(q) ||
        normalizeText(item.phone).includes(q) ||
        normalizeText(item.program).includes(q);
      const matchStatus = status === 'all' || (item.status || 'new') === status;
      return matchSearch && matchStatus;
    });
  }, [items, search, status]);

  const badge = (value = 'new') => {
    const map = {
      new: ['bg-blue-50 text-blue-700', Clock, t('admin.new')],
      contacted: ['bg-amber-50 text-amber-700', Phone, t('admin.processed')],
      processed: ['bg-amber-50 text-amber-700', Phone, t('admin.processed')],
      accepted: ['bg-emerald-50 text-emerald-700', CheckCircle2, t('admin.accepted')],
      rejected: ['bg-red-50 text-red-700', XCircle, t('admin.rejected')],
    };
    const [classes, Icon, label] = map[value] || map.new;
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${classes}`}>
        <Icon size={13} />
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="admin-input pl-11" placeholder={t('admin.search')} />
        </div>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="admin-input lg:w-56">
          <option value="all">{t('common.all')}</option>
          <option value="new">{t('admin.new')}</option>
          <option value="contacted">{t('admin.processed')}</option>
          <option value="accepted">{t('admin.accepted')}</option>
          <option value="rejected">{t('admin.rejected')}</option>
        </select>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-5 py-4">{t('admission.name')}</th>
                <th className="px-5 py-4">{t('admission.program')}</th>
                <th className="px-5 py-4">{t('admission.message')}</th>
                <th className="px-5 py-4">{t('common.date')}</th>
                <th className="px-5 py-4">{t('admin.status')}</th>
                <th className="px-5 py-4 text-right">{t('admin.edit')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="px-5 py-10 text-center text-slate-500">{t('common.loading')}</td></tr>
              ) : filtered.length ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-bold text-primary-dark">{item.fullName}</p>
                      <a href={`tel:${item.phone}`} className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary">
                        <Phone size={12} />
                        {item.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{item.program}</td>
                    <td className="max-w-xs truncate px-5 py-4 text-slate-500">{item.message || '—'}</td>
                    <td className="px-5 py-4 text-slate-500">{item.date || formatDate(item.createdAt, i18n.language)}</td>
                    <td className="px-5 py-4">{badge(item.status)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => changeStatus(item.id, 'contacted')} className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"><Phone size={16} /></button>
                        <button type="button" onClick={() => changeStatus(item.id, 'accepted')} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"><CheckCircle2 size={16} /></button>
                        <button type="button" onClick={() => changeStatus(item.id, 'rejected')} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><XCircle size={16} /></button>
                        <button type="button" onClick={() => removeItem(item.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="px-5 py-10 text-center text-slate-500">{t('common.not_found')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
