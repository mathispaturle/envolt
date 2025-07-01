import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Logos from "@/components/landing/Logos";
import Benefits from "@/components/landing/Benefits/Benefits";
import Container from "@/components/landing/Container";
import Section from "@/components/landing/Section";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';

const HomePage: React.FC = () => {
  return (
    <div className='relative min-h-screen'>
      <Header />
      <Hero />
      {/* <Logos /> */}
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title="Features"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
