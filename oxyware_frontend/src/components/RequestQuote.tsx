"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Instagram, Mail, MessageSquare } from "lucide-react";
import emailjs from "emailjs-com";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function RequestQuote() {
  const t = useTranslations();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSuccess(true);
      setError(false);
      reset();
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/bgquote2.png')" }}
    >
      <div className="max-w-2xl w-full bg-slate-900 rounded-xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-white">
          {t("contact_section.title")}
        </h1>

        {success && (
          <p className="text-green-500 mb-4 text-lg">
            {t("contact_section.success")}
          </p>
        )}
        {error && (
          <p className="text-red-500 mb-4 text-lg">
            {t("contact_section.error")}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Label htmlFor="name" className="mb-2 text-white">
              {t("contact_section.name")}
            </Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder={t("contact_section.name")}
              className="border-gray-300 h-14 text-lg"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {t("contact_section.required")}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-2 text-white">
              {t("contact_section.email")}
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder={t("contact_section.email")}
              className="border-gray-300 h-14 text-lg"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {t("contact_section.required")}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="phone" className="mb-2 text-white">
              {t("contact_section.phone")}
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder={t("contact_section.phone")}
              className="border-gray-300 h-14 text-lg"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="message" className="mb-2 text-white">
              {t("contact_section.message")}
            </Label>
            <Textarea
              id="message"
              {...register("message", { required: true })}
              placeholder={t("contact_section.message")}
              className="border-gray-300 h-40 text-lg"
            />
            {errors.message && (
              <span className="text-red-500 text-sm">
                {t("contact_section.required")}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold cursor-pointer"
          >
            {t("contact_section.submit")}
          </Button>
        </form>

        <div className="mt-10 flex flex-col gap-4 text-center">
          <h2 className="text-xl font-semibold text-white">
            Contato / Contact
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-300">
            <a
              href="mailto:seuemail@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <Mail size={24} />
              Gmail
            </a>
            <a
              href="https://wa.me/5513988622256"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400"
            >
              <MessageSquare size={24} />
              WhatsApp
            </a>
            <a
              href="https://instagram.com/oxyware"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-400"
            >
              <Instagram size={24} />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
