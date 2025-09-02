import PrivacyPolicy from "@/components/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Oxyware",
  description: "Privacy Policy.",
};

export default function Privacypolicy() {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
}
