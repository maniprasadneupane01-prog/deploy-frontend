import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import CustomCursor from './components/cursor/CustomCursor';
import BookingPanel from './components/booking/BookingPanel';
import ToastContainer from './components/ui/Toast';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BookingProvider>
          <BrowserRouter>
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            <Footer />
            <BookingPanel />
            <ToastContainer />
          </BrowserRouter>
        </BookingProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}