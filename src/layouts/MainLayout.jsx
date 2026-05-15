import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AIAssistant from '../components/AIAssistant';
import Seo from '../components/Seo';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
