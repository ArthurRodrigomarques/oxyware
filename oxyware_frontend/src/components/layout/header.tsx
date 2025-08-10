import Image from "next/image";
import { ArrowRight, Code, Smartphone, Globe } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center px-4">
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="rounded-full mt-4"
      />
      <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
        <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Desenvolvimento
        </span>
        <br />
        <span className="text-foreground">do Futuro</span>
      </h1>

      <h2 className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-gray-400">
        Criamos aplicativos e websites modernos que impulsionam seu negócio para
        a era digital com tecnologia de ponta e design inovador.
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
        <Button
          size="lg"
          className="px-8 py-4 rounded-full min-w-[200px] bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          Começar Projeto
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="glass-card px-8 py-4 text-lg font-semibold rounded-full min-w-[200px] hover:bg-white/10"
        >
          Ver Portfólio
        </Button>
      </div>

      <div className="flex justify-center gap-12 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <Smartphone className="h-8 w-8 text-purple-600" />
          <span className="text-sm">Apps</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Globe className="h-8 w-8 text-blue-400" />
          <span className="text-sm">Websites</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Code className="h-8 w-8 text-green-400" />
          <span className="text-sm">Sistemas</span>
        </div>
      </div>
    </div>
  );
}
