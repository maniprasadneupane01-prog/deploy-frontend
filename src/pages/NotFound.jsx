import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <main id="main-content" className="pt-[var(--nav-height)] min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="font-yeseva text-6xl md:text-8xl text-terra-500 mb-4">404</h1>
          <p className="font-sans text-[var(--text-muted)] mb-8">This page doesn't exist.</p>
          <Link to="/" className="inline-flex bg-terra-500 text-white font-sans font-semibold px-8 py-3 rounded-full hover:translate-y-[-2px] transition-transform">Back to Home</Link>
        </div>
      </main>
    </PageTransition>
  );
}