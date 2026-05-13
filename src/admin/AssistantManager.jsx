import React from 'react';
import { useTranslation } from 'react-i18next';
import SimpleManager from './SimpleManager';

const AssistantManager = () => {
  const { t } = useTranslation();
  return (
    <SimpleManager
      collectionName="assistantFaq"
      title={t('admin.assistant')}
      imageField="none"
      fields={[
        { name: 'question', label: t('admin.question'), required: true },
        { name: 'answer', label: t('admin.answer'), type: 'textarea', required: true },
        { name: 'language', label: t('admin.language'), required: true, defaultValue: 'kz' },
      ]}
      previewField="question"
    />
  );
};

export default AssistantManager;
