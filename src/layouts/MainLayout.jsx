import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { TopAnnouncementBar } from '../components/common/TopAnnouncementBar';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopAnnouncementBar />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};