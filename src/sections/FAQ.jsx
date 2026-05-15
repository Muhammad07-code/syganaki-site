import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQItem = ({ item, open, onClick }) => (
  <div className="border-b border-slate-200 last:border-b-0">
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-5 py-5 text-left"
    >
      <span className="font-serif text-lg font-bold leading-7 text-primary-dark sm:text-xl">
        {item.question}
      </span>
      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${open ? 'bg-primary text-white' : 'bg-slate-100 text-primary'}`}>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = ({ compact = false }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const items = t('faq.items', { returnObjects: true });

  return (
    <section className={compact ? 'bg-background py-10' : 'bg-background pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24'}>
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="section-eyebrow justify-center">
              <Sparkles size={14} />
              {t('nav.faq')}
            </p>
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-copy mx-auto mt-4 max-w-2xl">{t('faq.subtitle')}</p>
          </div>
          <div className="premium-panel bg-white p-5 sm:p-8">
            {items.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                open={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
