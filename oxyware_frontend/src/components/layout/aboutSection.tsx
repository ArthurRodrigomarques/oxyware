"use client";

import { Target, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      className="py-20 px-4 relative overflow-hidden bg-slate-950 text-white"
      id="about-section"
    >
      <div className="container mx-auto max-w-6xl relative text-white">
        {/* background */}
        <div className="pointer-events-none absolute inset-0 opacity-10 ">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl" />
        </div>

        {/* header */}
        <div className="relative z-10 text-center mb-16 text-white">
          <h2 className="text-5xl font-bold mb-6 text-white">
            {t("title.part1")}{" "}
            <span className="text-gradient">{t("title.part2")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-white">
            {t("description")}
          </p>
        </div>

        {/* grid */}
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center mb-20 text-white">
          {/* text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gradient">
                {t("history.title")}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("history.paragraph1")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("history.paragraph2")}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("history.paragraph3")}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-white">
            <Card className="relative overflow-hidden p-6 rounded-2xl border border-slate-700 bg-card/60 backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
              <div className="relative flex items-start gap-4">
                <div className="p-3 border-2 border-purple-600 rounded-md bg-purple-500/20">
                  <Target className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    {t("values.mission.title")}
                  </h4>
                  <p className="text-muted-foreground">
                    {t("values.mission.description")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden p-6 rounded-2xl border text-white border-slate-700 bg-card/60 backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:border-sky-500 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]">
              <div className="relative flex items-start gap-4">
                <div className="p-3 border-2 border-sky-500 rounded-md bg-sky-400/20">
                  <Zap className="w-6 h-6 text-sky-700" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    {t("values.vision.title")}
                  </h4>
                  <p className="text-muted-foreground">
                    {t("values.vision.description")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden p-6 rounded-2xl border text-white border-slate-700 bg-card/60 backdrop-blur transition-all duration-300 hover:scale-[1.03] hover:border-fuchsia-500 hover:shadow-[0_0_20px_rgba(217,70,239,0.6)]">
              <div className="relative flex items-start gap-4">
                <div className="p-3 border-2 border-fuchsia-600 rounded-md bg-fuchsia-500/20">
                  <Users className="w-6 h-6 text-fuchsia-700" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    {t("values.values.title")}
                  </h4>
                  <p className="text-muted-foreground">
                    {t("values.values.description")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
