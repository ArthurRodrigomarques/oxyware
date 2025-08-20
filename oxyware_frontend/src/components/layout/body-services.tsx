"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
  Smartphone,
  Globe,
  Code,
  Zap,
  Shield,
  Rocket,
  TrendingUp,
  PenTool,
  Share2,
} from "lucide-react";

export default function BodyServices() {
  const t = useTranslations("services_section");

  const services = t.raw("services") as {
    icon: string;
    title: string;
    description: string;
  }[];

  const iconsMap: Record<
    string,
    React.FC<{ size?: number; className?: string }>
  > = {
    Smartphone,
    Globe,
    Code,
    Zap,
    Shield,
    Rocket,
    TrendingUp,
    PenTool,
    Share2,
  };

  return (
    <section className="py-24 px-6 bg-slate-950 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-gradient">{t("our_services")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            let gradientClass = "";
            if (index % 3 === 0) {
              gradientClass = "bg-gradient-to-b from-purple-500 to-blue-500";
            } else if (index % 3 === 1) {
              gradientClass = "bg-gradient-to-b from-green-600 to-green-300";
            } else {
              gradientClass = "bg-gradient-to-b from-green-500 to-purple-500";
            }

            const Icon = iconsMap[service.icon];

            return (
              <Card
                key={index}
                className="group relative overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer max-w-lg w-full"
              >
                <div
                  className={`absolute inset-0 ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardHeader className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-2xl ${gradientClass} text-white shadow-lg mb-4`}
                  >
                    {Icon && <Icon size={28} />}
                  </div>

                  <CardTitle className="text-xl font-bold text-center">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="leading-relaxed text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>

                <div
                  className={`absolute bottom-0 left-0 w-full h-1 ${gradientClass} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
