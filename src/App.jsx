import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Admission from './pages/Admission';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Gallery from './pages/Gallery';
import Contacts from './pages/Contacts';
import FAQPage from './pages/FAQPage';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import AdminApplications from './admin/Applications';
import AdminNews from './admin/NewsManager';
import AdminInquiries from './admin/Inquiries';
import AdminGallery from './admin/GalleryManager';
import AdminPrograms from './admin/ProgramsManager';
import AdminContent from './admin/ContentManager';
import AdminAssistant from './admin/AssistantManager';
import Login from './admin/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="admission" element={<Admission />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="assistant" element={<AdminAssistant />} />
      </Route>
    </Routes>
  );
}

export default App;
