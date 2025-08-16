import { getTranslations } from "next-intl/server";
import About from "@/components/layout/about";
import BodyServices from "@/components/layout/body-services";
import CTA from "@/components/layout/cta";
import Header from "@/components/layout/header";
import SlideIn from "@/components/AnimatedSlideIn";
import type { Metadata } from "next";
import FloatingSocials from "@/components/FloatingSocials";

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
        <SlideIn direction="left">
          <BodyServices />
        </SlideIn>
        <SlideIn direction="right" delay={0.2}>
          <About />
        </SlideIn>
        <SlideIn direction="left" delay={0.3}>
          <CTA />
        </SlideIn>
        <FloatingSocials />
      </div>
    </div>
  );
}
