"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          onClick={handleClick}
          className="flex items-center space-x-2"
        >
          <Image
            src="/logo.png"
            alt="Oxyware Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold text-white">Oxyware</span>
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
