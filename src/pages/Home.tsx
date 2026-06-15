import { Seo } from '../components/common/Seo';
import { Hero } from '../components/home/Hero';
import { TrustedBy } from '../components/home/TrustedBy';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { StatsSection } from '../components/home/StatsSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { CTASection } from '../components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Seo
        title="GrowthX Solution — Transform Your Business with Digital Innovation"
        description="High-converting websites and digital marketing strategies that accelerate business growth. WordPress, Shopify, custom development, Meta & Google Ads."
      />
      <Hero />
      <TrustedBy />
      <ServicesPreview />
      <StatsSection />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
