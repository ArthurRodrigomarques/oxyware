import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Globe, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about_section");

  const items = t.raw("items") as string[];
  const statsData = t.raw("stats") as {
    icon: string;
    number: string;
    label: string;
  }[];

  const iconMap: Record<string, any> = {
    Users,
    Code: Clock,
    Globe,
    Award,
    CheckCircle,
  };

  return (
    <section className="py-24 px-6 relative bg-slate-950">
      <div className="absolute top-1/4 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto principal */}
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              {t("transform_ideas")}{" "}
              <span className="text-gradient">{t("digital_reality")}</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("oxyware_description")}
            </p>

            {/* Itens do about */}
            <div className="space-y-4 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              {t("button")}
            </Button>
          </div>

          {/* Cards de estatísticas */}
          <div className="grid grid-cols-2 gap-6">
            {statsData.map(({ icon, number, label }, idx) => {
              const Icon = iconMap[icon];
              return (
                <Card
                  key={idx}
                  className="glass-card p-8 text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-primary rounded-2xl text-white shadow-lg">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {label}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
