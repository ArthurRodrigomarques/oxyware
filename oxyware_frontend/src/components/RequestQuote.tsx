"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, CheckCircle2, Instagram, Mail, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT } from "@/lib/contact";
import {
  isValidQuoteEmail, isValidQuoteMessage, isValidQuoteName, isValidQuotePhone,
  QUOTE_LIMITS, sendQuoteRequest,
} from "@/lib/quote-request";
import type { QuoteRequest } from "@/lib/quote-request";

type SubmissionStatus = "idle" | "success" | "error";

const FIELD_CLASS = "h-12 rounded-lg border-white/15 bg-white/5 px-4 text-base text-white placeholder:text-slate-500 shadow-none focus-visible:border-blue-400 focus-visible:ring-blue-400/20 md:text-base";

export default function RequestQuote(): React.JSX.Element {
  const t = useTranslations("contact_section");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [isFormReady, setIsFormReady] = useState<boolean>(false);
  const submissionLock = useRef<boolean>(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<QuoteRequest>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  useEffect((): void => setIsFormReady(true), []);

  const onSubmit = async (request: QuoteRequest): Promise<void> => {
    if (submissionLock.current) return;
    submissionLock.current = true;
    setStatus("idle");
    try {
      await sendQuoteRequest(request);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    } finally {
      submissionLock.current = false;
    }
  };

  return (
    <section
      aria-labelledby="quote-title"
      className="min-h-dvh bg-cover bg-center px-5 pb-12 pt-28 text-white sm:px-8 sm:pb-16 sm:pt-36 lg:px-12"
      style={{ backgroundImage: "url('/bgquote2.png')" }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
        <div className="lg:col-start-1 lg:row-start-1 lg:pt-6">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase text-blue-300">
            <span aria-hidden="true" className="size-2 bg-blue-400" />
            {t("eyebrow")}
          </p>
          <h1 id="quote-title" className="max-w-lg text-balance text-4xl font-bold leading-tight sm:text-5xl">
            {t("headline")} <span className="text-blue-400">{t("headline_highlight")}</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-2" aria-label={t("services_label")}>
            {["websites", "apps", "systems"].map((service: string) => (
              <span key={service} className="rounded-md border border-white/10 px-3 py-2 text-xs text-slate-300">{t(`services.${service}`)}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950 p-5 shadow-xl sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="mb-3 text-xs font-semibold uppercase text-blue-300">{t("form_eyebrow")}</p>
          <h2 className="text-balance text-2xl font-semibold leading-snug sm:text-3xl">{t("title")}</h2>
          <p id="quote-form-description" className="mt-3 text-pretty text-sm leading-relaxed text-slate-400">{t("form_description")}</p>

          <form method="post" noValidate={isFormReady} onSubmit={handleSubmit(onSubmit)} aria-describedby="quote-form-description" aria-busy={isSubmitting} className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-slate-200">{t("name")}</Label>
                <Input id="name" autoComplete="name" required maxLength={QUOTE_LIMITS.name} disabled={isSubmitting} placeholder={t("name_placeholder")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={FIELD_CLASS}
                  {...register("name", { required: t("required"), validate: (value: string): true | string => isValidQuoteName(value) || t("invalid_name") })} />
                {errors.name && <p id="name-error" role="alert" className="text-xs text-red-300">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-slate-200">{t("email")}</Label>
                <Input id="email" type="email" autoComplete="email" inputMode="email" required maxLength={QUOTE_LIMITS.email} disabled={isSubmitting} placeholder={t("email_placeholder")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={FIELD_CLASS}
                  {...register("email", { required: t("required"), validate: (value: string): true | string => isValidQuoteEmail(value) || t("invalid_email") })} />
                {errors.email && <p id="email-error" role="alert" className="text-xs text-red-300">{errors.email.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-slate-200">{t("phone")} <span className="font-normal text-slate-500">{t("optional")}</span></Label>
              <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={QUOTE_LIMITS.phone} disabled={isSubmitting} placeholder={t("phone_placeholder")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={FIELD_CLASS}
                {...register("phone", { validate: (value: string): true | string => isValidQuotePhone(value) || t("invalid_phone") })} />
              {errors.phone && <p id="phone-error" role="alert" className="text-xs text-red-300">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm text-slate-200">{t("message")}</Label>
              <Textarea id="message" required rows={5} maxLength={QUOTE_LIMITS.message} disabled={isSubmitting} placeholder={t("message_placeholder")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-hint message-error" : "message-hint"} className="min-h-40 resize-y rounded-lg border-white/15 bg-white/5 px-4 py-3 text-base leading-relaxed text-white placeholder:text-slate-500 shadow-none focus-visible:border-blue-400 focus-visible:ring-blue-400/20 md:text-base"
                {...register("message", { required: t("required"), validate: (value: string): true | string => isValidQuoteMessage(value) || t("invalid_message") })} />
              <p id="message-hint" className="text-xs leading-relaxed text-slate-500">{t("message_hint")}</p>
              {errors.message && <p id="message-error" role="alert" className="text-xs text-red-300">{errors.message.message}</p>}
            </div>

            {status === "success" && <div role="status" className="flex items-start gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm leading-relaxed text-emerald-200"><CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><p>{t("success")}</p></div>}
            {status === "error" && <div role="alert" className="rounded-lg border border-red-400/20 bg-red-400/5 p-4 text-sm leading-relaxed text-red-200"><p>{t("error")}</p><a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">{t("whatsapp_fallback")}<ArrowUpRight className="size-4" aria-hidden="true" /></a></div>}

            <Button type="submit" disabled={!isFormReady || isSubmitting} className="h-12 w-full cursor-pointer rounded-lg bg-blue-600 px-5 text-base font-semibold text-white transition-colors duration-150 hover:bg-blue-500 focus-visible:ring-blue-400 disabled:cursor-wait">
              {isSubmitting ? t("sending") : t("submit")}<Send className="size-4" aria-hidden="true" />
            </Button>
            <p className="text-center text-xs leading-relaxed text-slate-500">{t("form_note")}</p>
          </form>
        </div>
        <div className="lg:col-start-1 lg:row-start-2 lg:pb-6">
          <div className="mt-10 border-t border-white/10 pt-7">
            <h2 className="mb-3 font-sans text-sm font-semibold text-white">{t("direct_contact")}</h2>
            <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-lg py-4 outline-none transition-colors duration-150 hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-400">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"><MessageCircle className="size-5" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{t("whatsapp")}</span><span className="mt-1 block text-sm text-slate-400 tabular-nums">{CONTACT.phone}</span></span>
              <ArrowUpRight className="size-4 shrink-0 text-slate-500" aria-hidden="true" />
            </a>
            <a href={CONTACT.emailHref} className="group flex items-center gap-4 rounded-lg py-4 outline-none transition-colors duration-150 hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-400">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"><Mail className="size-5" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{t("email")}</span><span className="mt-1 block break-all text-sm text-slate-400">{CONTACT.email}</span></span>
              <ArrowUpRight className="size-4 shrink-0 text-slate-500" aria-hidden="true" />
            </a>
            <a href={CONTACT.instagramHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-slate-400 outline-none transition-colors duration-150 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-400">
              <Instagram className="size-4" aria-hidden="true" /> @oxyware <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6 text-xs text-slate-400" aria-label={t("process_label")}>
            <span>{t("process.idea")}</span><ArrowRight className="size-3 text-blue-400" aria-hidden="true" />
            <span>{t("process.proposal")}</span><ArrowRight className="size-3 text-blue-400" aria-hidden="true" />
            <span>{t("process.delivery")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
