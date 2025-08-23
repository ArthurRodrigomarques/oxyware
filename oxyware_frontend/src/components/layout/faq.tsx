"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Faq() {
  const t = useTranslations("faq");

  const questions = [
    { question: t("q1.question"), answer: t("q1.answer") },
    { question: t("q2.question"), answer: t("q2.answer") },
    { question: t("q3.question"), answer: t("q3.answer") },
    { question: t("q4.question"), answer: t("q4.answer") },
  ];

  return (
    <section className="py-16 px-6 mx-auto bg-slate-950" id="faq">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        {t("title")}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="max-w-5xl mx-auto space-y-4"
      >
        {questions.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg md:text-2xl font-semibold text-white hover:no-underline focus:outline-none focus:ring-0">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-gray-300 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
