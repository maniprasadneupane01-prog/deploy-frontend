import Services from '../components/sections/Services';
import FAQ from '../components/sections/FAQ';
import PageTransition from '../components/layout/PageTransition';

export default function ServicesPage() {
  return (
    <PageTransition>
      <main id="main-content" className="pt-[var(--nav-height)]">
        <Services />
        <FAQ />
      </main>
    </PageTransition>
  );
}