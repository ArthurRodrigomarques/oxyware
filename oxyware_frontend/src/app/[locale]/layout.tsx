import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../locales/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="relative min-h-screen overflow-hidden">
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/bg3.png')" }}
        />

        <div
          className="fixed bottom-0 right-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/oxy.png')",
            backgroundSize: "500px",
            backgroundRepeat: "no-repeat",
            width: "500px",
            height: "400px",
          }}
        />

        {/* Conteúdo */}
        <main className="relative z-10">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
