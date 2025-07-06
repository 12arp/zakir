
import { ContactSection } from "@/components/layout/sections/contact";
import { DealerSection } from "@/components/layout/sections/dealer";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";

import { ProductsSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";

import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Sahu Metals - Agriculture Equipment Agency",
  description: "Sahu Metals: Your trusted partner for agriculture equipment sales, leasing, and maintenance.",
  openGraph: {
    type: "website",
    url: "https://sahumetals.com/",
    title: "Sahu Metals - Agriculture Equipment Agency",
    description: "Sahu Metals: Your trusted partner for agriculture equipment sales, leasing, and maintenance.",
    images: [
      {
        url: "/hero-image-light.jpeg",
        width: 1200,
        height: 630,
        alt: "Sahu Metals - Agriculture Equipment Agency",
      },
    ],
  },
  
};

export default function Home() {
  return (
    <>
      <HeroSection /><SponsorsSection />
      <ProductsSection limit={3} />
      {/* remove */}
      <FeaturesSection />
     
      <TestimonialSection />
     
   
     
      <ContactSection />
      <FAQSection />
      <DealerSection />
      <FooterSection />
    </>
  );
}
