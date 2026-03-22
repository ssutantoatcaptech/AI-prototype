import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
