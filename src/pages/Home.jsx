import { Suspense } from 'react';
import Hero from '../components/sections/Hero';
import TrustMarquee from '../components/sections/TrustMarquee';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import WhyUs from '../components/sections/WhyUs';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import Team from '../components/sections/Team';
import Blog from '../components/sections/Blog';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import SocialFeed from '../components/sections/SocialFeed';
import Skeleton from '../components/ui/Skeleton';

const LazySection = ({ children }) => (
  <Suspense fallback={<Skeleton height="400px" className="w-full" />}>{children}</Suspense>
);

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <LazySection><TrustMarquee /></LazySection>
      <LazySection><Services /></LazySection>
      <LazySection><About /></LazySection>
      <LazySection><WhyUs /></LazySection>
      <LazySection><Gallery /></LazySection>
      <LazySection><Testimonials /></LazySection>
      <LazySection><Team /></LazySection>
      <LazySection><Blog /></LazySection>
      <LazySection><FAQ /></LazySection>
      <LazySection><Contact /></LazySection>
      <LazySection><SocialFeed /></LazySection>
    </main>
  );
}