import React from 'react';
import { useTranslation } from 'react-i18next';
import SimpleManager from './SimpleManager';

const ContentManager = () => {
  const { t } = useTranslation();
  return (
    <SimpleManager
      collectionName="siteTexts"
      title={t('admin.content')}
      imageField="none"
      fields={[
        { name: 'key', label: t('admin.key'), required: true },
        { name: 'language', label: t('admin.language'), required: true, defaultValue: 'kz' },
        { name: 'value', label: t('admin.content'), type: 'textarea', required: true },
      ]}
      previewField="key"
    />
  );
};

export default ContentManager;
