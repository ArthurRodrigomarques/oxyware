"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: "pt" | "en") => {
    const segments = pathname.split("/").slice(2);
    router.push(`/${lang}${segments.length ? "/" + segments.join("/") : ""}`);
  };

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleLanguageChange("pt")}
      >
        <ReactCountryFlag countryCode="BR" svg style={{ width: 24, height: 24 }} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleLanguageChange("en")}
      >
        <ReactCountryFlag countryCode="GB" svg style={{ width: 24, height: 24 }} />
      </Button>
    </div>
  );
}
