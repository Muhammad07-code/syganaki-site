import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { getInstituteContent } from '../data/instituteContent';

export const askAssistant = async ({ message, language }) => {
  const endpoint = import.meta.env.VITE_AI_ASSISTANT_ENDPOINT;

  // Try fetching from local Firestore FAQ first
  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'assistantFaq'), where('language', '==', language));
      const snap = await getDocs(q);
      const faqs = snap.docs.map(doc => doc.data());

      const text = message.toLowerCase();
      const match = faqs.find(f => text.includes(f.question.toLowerCase()));
      if (match) return match.answer;
    } catch {
      // Keep backend details out of the public UI.
    }
  }

  if (!endpoint) return null;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      language,
      institute: 'Husamuddin as-Syganaqi Islamic Institute',
    }),
  });

  if (!response.ok) {
    throw new Error('assistant_unavailable');
  }

  const data = await response.json();
  return data.answer || data.message || null;
};

export const localAssistantAnswer = (question, t, language = 'kz') => {
  const text = question.toLowerCase();
  const institute = getInstituteContent(language);

  if (text.includes('қабыл') || text.includes('поступ') || text.includes('admission') || text.includes('قبول')) {
    return `${t('admission.steps.0.title')}: ${t('admission.steps.0.desc')} ${t('admission.steps.1.title')}: ${t('admission.steps.1.desc')}`;
  }

  if (text.includes('program') || text.includes('бағдар') || text.includes('программ') || text.includes('برنامج')) {
    const programs = institute.programs;
    return Array.isArray(programs)
      ? programs.map((item) => item.title).join(' • ')
      : t('assistant.fallback');
  }

  if (text.includes('мекен') || text.includes('адрес') || text.includes('address') || text.includes('عنوان')) {
    return t('topbar.address');
  }

  return t('assistant.fallback');
};
