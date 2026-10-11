import emailjs from "@emailjs/browser";
import { CONTACT } from "@/lib/contact";

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const QUOTE_LIMITS = { name: 100, email: 254, phone: 30, message: 5000 } as const;

export function isValidQuoteName(value: string): boolean {
  return value.trim().length >= 2 && value.trim().length <= QUOTE_LIMITS.name;
}

export function isValidQuoteEmail(value: string): boolean {
  return value.trim().length <= QUOTE_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidQuotePhone(value: string): boolean {
  if (!value.trim()) return true;
  const digits = value.replace(/\D/g, "");
  return value.length <= QUOTE_LIMITS.phone && /^[+\d\s().-]+$/.test(value) && digits.length >= 8 && digits.length <= 15;
}

export function isValidQuoteMessage(value: string): boolean {
  return value.trim().length >= 10 && value.trim().length <= QUOTE_LIMITS.message;
}

export async function sendQuoteRequest(request: QuoteRequest): Promise<void> {
  if (!isValidQuoteName(request.name) || !isValidQuoteEmail(request.email) ||
    !isValidQuotePhone(request.phone) || !isValidQuoteMessage(request.message)) {
    throw new Error("Invalid quote request");
  }

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Quote email service is not configured");
  }

  await emailjs.send(serviceId, templateId, {
    name: request.name.trim(),
    email: request.email.trim(),
    phone: request.phone.trim(),
    message: request.message.trim(),
    to_email: CONTACT.email,
    reply_to: request.email.trim(),
  }, { publicKey });
}
