import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import MainServices from '@/components/sections/MainServices';
import ExtendedServices from '@/components/sections/ExtendedServices';
import Showcase from '@/components/sections/Showcase';
import Careers from '@/components/sections/Careers';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MainServices />
      <ExtendedServices />
      <Showcase />
      <Careers />
      <ContactForm />
      <Footer />
    </main>
  );
}
