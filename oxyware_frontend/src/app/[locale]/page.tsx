import { getTranslations } from "next-intl/server";
import About from "@/components/layout/about";
import BodyServices from "@/components/layout/body-services";
import CTA from "@/components/layout/cta";
import Header from "@/components/layout/header";
import SlideIn from "@/components/AnimatedSlideIn";
import type { Metadata } from "next";
import FloatingSocials from "@/components/FloatingSocials";
import Portfolio from "@/components/layout/portfolio";
import Faq from "@/components/layout/faq";
import Footer from "@/components/layout/footer";
import AboutSection from "@/components/layout/aboutSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://www.oxyware.com"),
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "/",
      siteName: "Oxyware",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="overflow-x-hidden">
      <Header />
      <div>
        <SlideIn>
          <BodyServices />
        </SlideIn>
        <SlideIn delay={0.1}>
          <About />
        </SlideIn>
        <SlideIn delay={0.1}>
          <Portfolio />
        </SlideIn>
        <SlideIn delay={0.1}>
          <AboutSection />
        </SlideIn>
        <SlideIn delay={0.1}>
          <Faq />
        </SlideIn>
        <SlideIn delay={0.1}>
          <CTA />
        </SlideIn>
        <SlideIn delay={0.1}>
          <Footer />
        </SlideIn>
        <FloatingSocials />
      </div>
    </div>
  );
}
