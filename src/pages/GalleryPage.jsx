import Gallery from '../components/sections/Gallery';
import PageTransition from '../components/layout/PageTransition';

export default function GalleryPage() {
  return (
    <PageTransition>
      <main id="main-content" className="pt-[var(--nav-height)]">
        <Gallery />
      </main>
    </PageTransition>
  );
}