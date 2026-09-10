"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  CircleHelp,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqItem {
  readonly id: string;
  readonly numberLabel: string;
  readonly question: string;
  readonly answer: string;
}

type QuestionKey =
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q8"
  | "q9"
  | "q10";

const QUESTION_KEYS: readonly QuestionKey[] = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
];

export default function Faq(): React.JSX.Element {
  const t = useTranslations("faq");

  const faqItems: readonly FaqItem[] = QUESTION_KEYS.map(
    (key: QuestionKey, index: number): FaqItem => ({
      id: `item-${index + 1}`,
      numberLabel: String(index + 1).padStart(2, "0"),
      question: t(`${key}.question`),
      answer: t(`${key}.answer`),
    })
  );

  return (
    <section
      className={cn(
        "relative py-28 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden scroll-mt-20"
      )}
      id="faq"
    >
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.14),transparent_70%)] pointer-events-none"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
        )}
      />
      <div
        className={cn(
          "absolute top-1/4 -left-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"
        )}
      />
      <div
        className={cn(
          "absolute bottom-1/4 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        )}
      />

      <div className={cn("container relative mx-auto max-w-5xl")}>
        <div className={cn("flex flex-col items-center text-center mb-14 sm:mb-16 space-y-4")}>
          <div
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 backdrop-blur-md text-xs font-mono tracking-widest text-purple-300"
            )}
          >
            <CircleHelp className={cn("w-3.5 h-3.5 text-purple-400")} />
            <span>{t("badge")}</span>
          </div>

          <h2
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl"
            )}
          >
            {t("title")}
          </h2>

          <p
            className={cn(
              "text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
            )}
          >
            {t("subtitle")}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className={cn("space-y-3.5")}
        >
          {faqItems.map((faq: FaqItem) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className={cn(
                "group rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] px-5 sm:px-7 transition-all duration-300 data-[state=open]:border-purple-500/40 data-[state=open]:bg-white/[0.04] data-[state=open]:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "py-5 sm:py-6 text-left hover:no-underline focus-visible:ring-0 gap-4"
                )}
              >
                <div className={cn("flex items-center gap-3.5 sm:gap-4 flex-1 text-left")}>
                  <span
                    className={cn(
                      "flex-shrink-0 text-xs font-mono font-bold px-2 py-1 rounded-md bg-white/5 text-purple-300 group-hover:text-purple-200 group-hover:bg-purple-500/20 group-data-[state=open]:bg-purple-600/30 group-data-[state=open]:text-purple-200 border border-purple-500/20 transition-colors"
                    )}
                  >
                    {faq.numberLabel}
                  </span>
                  <span
                    className={cn(
                      "text-base sm:text-lg md:text-xl font-medium text-white group-hover:text-purple-200 group-data-[state=open]:text-purple-200 transition-colors"
                    )}
                  >
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "text-sm sm:text-base text-zinc-300 leading-relaxed pb-6 pt-2 pl-0 sm:pl-12 border-t border-white/5"
                )}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div
          className={cn(
            "mt-14 sm:mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md hover:border-purple-500/30 transition-all"
          )}
        >
          <div className={cn("space-y-1.5 text-center sm:text-left")}>
            <div className={cn("inline-flex items-center gap-2 text-sm font-semibold text-white")}>
              <Sparkles className={cn("w-4 h-4 text-purple-400")} />
              <span>{t("support_title")}</span>
            </div>
            <p className={cn("text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed")}>
              {t("support_description")}
            </p>
          </div>
          <a
            href="https://wa.me/5513996547656"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
              "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500",
              "text-white text-sm font-semibold tracking-wide shadow-lg shadow-purple-950/50",
              "transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
            )}
          >
            <MessageCircle className={cn("w-4 h-4")} />
            <span>{t("support_cta")}</span>
            <ArrowUpRight className={cn("w-4 h-4")} />
          </a>
        </div>
      </div>
    </section>
  );
}

