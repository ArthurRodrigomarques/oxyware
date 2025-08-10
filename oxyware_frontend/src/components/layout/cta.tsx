"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-purple-800 to-blue-800 ">

      <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />

      <div className="absolute top-10 left-1/4 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-10 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <h2 className="mb-8 text-5xl md:text-6xl font-bold leading-tight">
          Pronto para <span className="text-gradient">Inovar</span>?
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-xl md:text-2xl text-muted-foreground leading-relaxed">
          Vamos transformar sua visão em uma solução digital excepcional. Entre
          em contato e descubra como podemos impulsionar seu negócio.
        </p>

        <div className="mx-auto flex max-w-[600px] flex-col gap-6 sm:flex-row justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-2xl px-10 py-5 text-xl font-semibold hover:scale-[1.05] transition-transform cursor-pointer"
          >
            Iniciar Projeto
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="glass-card rounded-full px-10 py-5 text-xl font-semibold min-w-[250px] hover:bg-white/10 cursor-pointer"
          >
            <MessageCircle className="mr-3 h-6 w-6" />
            Falar Conosco
          </Button>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-muted-foreground">
          <p className="mb-4">Entre em contato através de:</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-8 text-foreground">
            <a
              href="mailto:oxywaretech@gmail.com"
              className="hover:text-gray-400 transition-colors"
            >
              oxywaretech@gmail.com
            </a>
            <a
              href="tel:+5513991908771"
              className="hover:text-gray-400 transition-colors"
            >
              +55 (13) 99190-8771
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
