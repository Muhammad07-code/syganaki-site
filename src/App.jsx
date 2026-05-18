import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Teachers = lazy(() => import('./pages/Teachers'));
const Partners = lazy(() => import('./pages/Partners'));
const Admission = lazy(() => import('./pages/Admission'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contacts = lazy(() => import('./pages/Contacts'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const Donation = lazy(() => import('./pages/Donation'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/Dashboard'));
const AdminApplications = lazy(() => import('./admin/Applications'));
const AdminNews = lazy(() => import('./admin/NewsManager'));
const AdminInquiries = lazy(() => import('./admin/Inquiries'));
const AdminGallery = lazy(() => import('./admin/GalleryManager'));
const AdminPrograms = lazy(() => import('./admin/ProgramsManager'));
const AdminContent = lazy(() => import('./admin/ContentManager'));
const AdminAssistant = lazy(() => import('./admin/AssistantManager'));
const AdminNotifications = lazy(() => import('./admin/Notifications'));
const Login = lazy(() => import('./admin/Login'));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background pt-24">
    <div className="h-11 w-11 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="partners" element={<Partners />} />
          <Route path="admission" element={<Admission />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="donation" element={<Donation />} />
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
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
