import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import GetStartedSection from '@/components/GetStartedSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { TestimonialsSectionDemo } from '@/components/TestimonialsSectionDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <GetStartedSection />
        <TestimonialsSectionDemo />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
