import { SiteHeader } from "@/app/_components/layout/SiteHeader";
import { Hero } from "@/app/_components/hero/Hero";
import { TrustedByMarquee } from "@/app/_components/marquee/TrustedByMarquee";
import { ProblemSection } from "@/app/_components/layout/ProblemSection";
import { StatsSection } from "@/app/_components/stats/StatsSection";
import { BentoSection } from "@/app/_components/bento/BentoSection";
import { PricingSection } from "@/app/_components/pricing/PricingSection";
import { TestimonialsSection } from "@/app/_components/testimonials/TestimonialsSection";
import { FaqSection } from "@/app/_components/faq/FaqSection";
import { CtaSection } from "@/app/_components/cta/CtaSection";
import { SiteFooter } from "@/app/_components/footer/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustedByMarquee />
        <ProblemSection />
        <StatsSection />
        <BentoSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
