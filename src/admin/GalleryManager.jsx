import React from 'react';
import { useTranslation } from 'react-i18next';
import SimpleManager from './SimpleManager';
import { getInstituteContent } from '../data/instituteContent';

const GalleryManager = () => {
  const { t, i18n } = useTranslation();
  return (
    <SimpleManager
      collectionName="gallery"
      fallbackItems={getInstituteContent(i18n.language).gallery}
      title={t('admin.gallery')}
      fields={[
        { name: 'title', label: t('admin.title_field'), required: true },
        { name: 'category', label: t('common.category'), required: true },
        { name: 'image', label: t('admin.image'), type: 'image', required: true },
        { name: 'description', label: t('admin.description'), type: 'textarea' },
      ]}
    />
  );
};

export default GalleryManager;
