import { getTranslations } from "next-intl/server";
import About from "@/components/layout/about";
import BodyServices from "@/components/layout/body-services";
import CTA from "@/components/layout/cta";
import Header from "@/components/layout/header";
import SlideIn from "@/components/AnimatedSlideIn";

// Metadata dinâmico com tradução
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://www.oxyware.com",
      siteName: "Oxyware",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
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
