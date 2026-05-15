import React from 'react';
import { useTranslation } from 'react-i18next';
import SimpleManager from './SimpleManager';
import { getInstituteContent } from '../data/instituteContent';

const ProgramsManager = () => {
  const { t, i18n } = useTranslation();
  return (
    <SimpleManager
      collectionName="programs"
      fallbackItems={getInstituteContent(i18n.language).programs}
      title={t('admin.programs')}
      fields={[
        { name: 'title', label: t('admin.title_field'), required: true },
        { name: 'duration', label: t('programs.duration'), required: true },
        { name: 'format', label: t('programs.format'), required: true },
        { name: 'subjects', label: t('programs.subjects'), type: 'array' },
        { name: 'opportunities', label: t('programs.opportunities'), type: 'array' },
        { name: 'image', label: t('admin.image'), type: 'image' },
        { name: 'desc', label: t('admin.description'), type: 'textarea', required: true },
      ]}
    />
  );
};

export default ProgramsManager;
