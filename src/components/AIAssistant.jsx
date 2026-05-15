import React, { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageSquare, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { askAssistant, localAssistantAnswer } from '../services/assistantService';

const storageKey = 'syganaki-ai-history';

const AIAssistant = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const listRef = useRef(null);

  const normalizedMessages = messages.length
    ? messages
    : [{ role: 'assistant', content: t('assistant.welcome') }];

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
  }, [messages]);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, normalizedMessages.length, loading]);

  const handleSend = async (value = input) => {
    const text = value.trim();
    if (!text || loading) return;

    const nextMessages = [...normalizedMessages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const apiAnswer = await askAssistant({ message: text, language: i18n.language, t });
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: apiAnswer || localAssistantAnswer(text, t, i18n.language) },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: localAssistantAnswer(text, t, i18n.language) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = t('assistant.quick', { returnObjects: true });

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 flex h-[min(620px,calc(100vh-120px))] w-[calc(100vw-32px)] max-w-[410px] flex-col overflow-hidden rounded-lg border border-white/20 bg-white shadow-[0_26px_80px_rgba(5,24,17,0.22)]"
          >
            <div className="flex items-center justify-between bg-primary-dark p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gold text-primary-dark">
                  <Bot size={22} />
                </div>
                <div>
                  <p className="font-bold leading-tight">{t('assistant.title')}</p>
                  <p className="text-xs text-white/58">{t('assistant.subtitle')}</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-[#f8f6ef] p-4">
              {normalizedMessages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[84%] rounded-lg px-4 py-3 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'border border-slate-200 bg-white text-slate-700 shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                    <Loader2 size={16} className="animate-spin" />
                    {t('common.loading')}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto no-scrollbar">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleSend(question)}
                    className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-accent-gold hover:bg-accent-lightGold"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="input-premium min-w-0 flex-1 py-3"
                  placeholder={t('assistant.placeholder')}
                />
                <button type="submit" className="btn-primary h-[46px] w-[46px] px-0" disabled={loading} aria-label={t('common.send')}>
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-dark text-white shadow-[0_18px_44px_rgba(5,24,17,0.32)] hover:bg-primary"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={t('assistant.title')}
      >
        {open ? <X size={26} /> : <MessageSquare size={26} />}
      </motion.button>
    </div>
  );
};

export default AIAssistant;
