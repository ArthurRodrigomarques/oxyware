"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

export default function Process() {
  const t = useTranslations("Process");

  const steps = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
  ];

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <Card key={i} className="text-center">
            <CardHeader>
              <CheckCircle className="mx-auto w-8 h-8 text-green-500" />
              <CardTitle>{t(`step${i + 1}`)}</CardTitle>
            </CardHeader>
            <CardContent>{step}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
