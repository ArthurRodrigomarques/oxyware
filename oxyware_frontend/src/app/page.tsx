import About from "@/components/layout/about";
import BodyServices from "@/components/layout/body-services";
import CTA from "@/components/layout/cta";
import Header from "@/components/layout/header";

export default function Page() {
  return (
    <div>
      <Header />
      <div>
        <BodyServices />
        <About />
      </div>
      <CTA/>
    </div>
  );
}
