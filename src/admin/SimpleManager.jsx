import React, { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Check, Edit2, Image as ImageIcon, Loader2, Plus, Search, Trash2, Upload, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { db, isFirebaseConfigured } from '../firebase/config';
import { uploadNewsImage } from '../services/newsService';
import { fetchDataList } from '../services/dataService';
import { normalizeText } from '../utils/formatDate';

const getLocal = (name) => JSON.parse(window.localStorage.getItem(`syganaki-${name}`) || '[]');
const setLocal = (name, items) => window.localStorage.setItem(`syganaki-${name}`, JSON.stringify(items));

const makeInitial = (fields) =>
  fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {});

const SimpleManager = ({ collectionName, title, fields, previewField = 'title', imageField = 'image', fallbackItems = [] }) => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(makeInitial(fields));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchDataList(collectionName, fallbackItems, i18n.language);
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [i18n.language, collectionName]);

  const filtered = useMemo(() => {
    const q = normalizeText(search);
    return items.filter((item) => !q || normalizeText(JSON.stringify(item)).includes(q));
  }, [items, search]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(makeInitial(fields));
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: item[field.name] || field.defaultValue || '' }), {}));
    setModalOpen(true);
  };

  const handleUpload = async (event, fieldName) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadNewsImage(file);
      setFormData((current) => ({ ...current, [fieldName]: url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert(t('common.error'));
    } finally {
      setUploading(false);
    }
  };

  const handleArrayInput = (fieldName, value) => {
    const items = value.split(',').map(i => i.trim()).filter(i => i !== '');
    setFormData(current => ({ ...current, [fieldName]: items }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (!isFirebaseConfigured) {
        const current = getLocal(collectionName);
        if (editingId) {
          setLocal(collectionName, current.map((item) => (item.id === editingId ? { ...item, ...formData } : item)));
        } else {
          const id = crypto.randomUUID?.() || String(Date.now());
          setLocal(collectionName, [{ id, ...formData, createdAt: new Date().toISOString() }, ...current]);
        }
      } else if (editingId) {
        await setDoc(doc(db, collectionName, editingId), { ...formData, updatedAt: serverTimestamp() }, { merge: true });
      } else {
        await addDoc(collection(db, collectionName), { ...formData, createdAt: serverTimestamp() });
      }
      setModalOpen(false);
      await loadItems();
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm(t('admin.delete'))) return;
    if (!isFirebaseConfigured) {
      const current = getLocal(collectionName);
      const exists = current.find((i) => String(i.id) === String(id));
      if (exists) {
        setLocal(collectionName, current.map((i) => (String(i.id) === String(id) ? { ...i, deleted: true } : i)));
      } else {
        setLocal(collectionName, [...current, { id, deleted: true }]);
      }
    } else {
      await setDoc(doc(db, collectionName, String(id)), { deleted: true }, { merge: true });
    }
    await loadItems();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="admin-input pl-11" placeholder={t('admin.search')} />
        </div>
        <button type="button" onClick={openCreate} className="btn-primary">
          <Plus size={18} />
          {t('admin.add')}
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-64 animate-pulse rounded-lg bg-white" />)}
        </div>
      ) : filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="premium-card overflow-hidden">
              {item[imageField] ? (
                <img src={item[imageField]} alt={item[previewField]} className="aspect-[16/9] w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center bg-slate-100 text-slate-300"><ImageIcon size={38} /></div>
              )}
              <div className="p-5">
                <h2 className="line-clamp-2 font-serif text-xl font-bold text-primary-dark">{item[previewField] || title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.description || item.desc || item.answer || item.value}</p>
                <div className="mt-5 flex gap-2">
                  <button type="button" onClick={() => openEdit(item)} className="btn-ghost flex-1">
                    <Edit2 size={16} />
                    {t('admin.edit')}
                  </button>
                  <button type="button" onClick={() => removeItem(item.id)} className="rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="premium-card p-10 text-center text-slate-500">{t('common.not_found')}</div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-dark/70 p-4 backdrop-blur-sm">
            <motion.form initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} onSubmit={handleSubmit} className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <h2 className="text-xl font-bold">{title}</h2>
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg bg-slate-100 p-2 text-slate-600"><X size={20} /></button>
              </div>
              <div className="max-h-[calc(92vh-80px)] space-y-4 overflow-y-auto p-5">
                {fields.map((field) => (
                  <label key={field.name} className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{field.label}</span>
                    {field.type === 'textarea' ? (
                      <textarea value={formData[field.name]} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} className="admin-input min-h-[120px] resize-none" required={field.required} />
                    ) : field.type === 'image' ? (
                      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                        <input value={formData[field.name]} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} className="admin-input" required={field.required} />
                        <label className="btn-ghost cursor-pointer">
                          {uploading ? <Loader2 size={17} className="animate-spin" /> : <Upload size={17} />}
                          {t('admin.upload')}
                          <input type="file" accept="image/*" onChange={(event) => handleUpload(event, field.name)} className="hidden" />
                        </label>
                      </div>
                    ) : field.type === 'array' ? (
                      <div className="space-y-2">
                        <input
                          value={Array.isArray(formData[field.name]) ? formData[field.name].join(', ') : formData[field.name]}
                          onChange={(event) => handleArrayInput(field.name, event.target.value)}
                          className="admin-input"
                          placeholder="item1, item2, item3"
                          required={field.required}
                        />
                        <p className="text-[10px] text-slate-400">{t('admin.comma_separated') || 'Введите значения через запятую'}</p>
                      </div>
                    ) : (
                      <input value={formData[field.name]} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} className="admin-input" required={field.required} />
                    )}
                  </label>
                ))}
                <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost flex-1">{t('common.close')}</button>
                  <button type="submit" disabled={saving || uploading} className="btn-primary flex-1">
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    {t('admin.save')}
                  </button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimpleManager;
