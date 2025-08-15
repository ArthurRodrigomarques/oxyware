import About from "@/components/layout/about";
import BodyServices from "@/components/layout/body-services";
import CTA from "@/components/layout/cta";
import Header from "@/components/layout/header";
import SlideIn from "@/components/AnimatedSlideIn";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <Header />

      <div>
        <SlideIn direction="left">
          <BodyServices />
        </SlideIn>

        <SlideIn direction="right" delay={0.2}>
          <About />
        </SlideIn>

        <SlideIn direction="left" delay={0.3}>
          <CTA />
        </SlideIn>
      </div>
    </div>
  );
}
