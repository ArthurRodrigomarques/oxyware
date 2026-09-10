"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import ReactCountryFlag from "react-country-flag";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = (lang: "pt" | "en"): void => {
    const segments = pathname.split("/").slice(2);
    const targetPath = segments.length > 0 ? `/${segments.join("/")}` : "";
    router.push(`/${lang}${targetPath}`);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg border border-white/10 bg-slate-900/80 p-1 backdrop-blur-md shadow-xs",
        className
      )}
    >
      <button
        type="button"
        aria-label="Português"
        onClick={(): void => handleLanguageChange("pt")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 cursor-pointer",
          currentLocale === "pt"
            ? "bg-purple-600/30 border border-purple-400/50 shadow-xs scale-105"
            : "opacity-60 hover:opacity-100 hover:bg-white/10"
        )}
      >
        <ReactCountryFlag
          countryCode="BR"
          svg
          style={{ width: 16, height: 16, borderRadius: "2px", objectFit: "cover" }}
        />
      </button>
      <button
        type="button"
        aria-label="English"
        onClick={(): void => handleLanguageChange("en")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 cursor-pointer",
          currentLocale === "en"
            ? "bg-purple-600/30 border border-purple-400/50 shadow-xs scale-105"
            : "opacity-60 hover:opacity-100 hover:bg-white/10"
        )}
      >
        <ReactCountryFlag
          countryCode="GB"
          svg
          style={{ width: 16, height: 16, borderRadius: "2px", objectFit: "cover" }}
        />
      </button>
    </div>
  );
}
