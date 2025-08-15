"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Instagram, Mail, MessageSquare } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function RequestQuote() {
  const t = useTranslations();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
    setSuccess(true);
    reset();
  };

  return (
    <div className="min-h-screen items-center text-center px-4 bg-gradient-to-br from-blue-900 to-purple-600">
      <div className="max-w-md mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-6 mt-24">
          {t("contact_section.title")}
        </h1>

        {success && (
          <p className="text-green-600 mb-4">{t("contact_section.success")}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Label htmlFor="name" className="mb-2">
              {t("contact_section.name")}
            </Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder={t("contact_section.name")}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-2">
              {t("contact_section.email")}
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder={t("contact_section.email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="phone" className="mb-2">
              {t("contact_section.phone")}
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder={t("contact_section.phone")}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="message" className="mb-2">
              {t("contact_section.message")}
            </Label>
            <Textarea
              id="message"
              {...register("message", { required: true })}
              placeholder={t("contact_section.message")}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <Button
            type="submit"
            className="bg-blue-600 text-white cursor-pointer"
          >
            {t("contact_section.submit")}
          </Button>
        </form>

        <div className="mt-8 flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Contato/Contact </h2>
          <div className="flex justify-center gap-6 text-white">
            <a
              href="mailto:seuemail@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-800"
            >
              <Mail size={20} />
              Gmail
            </a>
            <a
              href="https://wa.me/5513996547656"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <MessageSquare size={20} />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/oxyware"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500"
            >
              <Instagram size={20} />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
