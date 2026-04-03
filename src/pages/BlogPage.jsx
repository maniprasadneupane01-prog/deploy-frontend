import Blog from '../components/sections/Blog';
import PageTransition from '../components/layout/PageTransition';

export default function BlogPage() {
  return (
    <PageTransition>
      <main id="main-content" className="pt-[var(--nav-height)]">
        <Blog />
      </main>
    </PageTransition>
  );
}