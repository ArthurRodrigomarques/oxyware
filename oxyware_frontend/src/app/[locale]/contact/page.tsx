import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RequestQuote from "@/components/RequestQuote";

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
      url: "/request-quote",
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
  return <RequestQuote />;
}
