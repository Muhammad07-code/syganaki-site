import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AIAssistant from '../components/AIAssistant';
import Seo from '../components/Seo';

const MainLayout = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className={`flex min-h-screen flex-col ${isArabic ? 'has-arabic-content' : ''}`}>
      <Seo />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AIAssistant />
    </div>
  );
};

export default MainLayout;
