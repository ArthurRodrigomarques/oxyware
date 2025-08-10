import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import { stats } from "@/data/stats";
import { aboutItems } from "@/data/aboutItems";

export default function About() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute top-1/4 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Transformamos <span className="text-gradient">Ideias</span> em
              <br />
              Realidade Digital
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Na OxyWare, somos apaixonados por tecnologia e inovação. Nossa
              equipe de desenvolvedores especialistas trabalha com as
              tecnologias mais avançadas para criar soluções que superam
              expectativas.
            </p>

            <div className="space-y-4 mb-8">
              {aboutItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
              Conhecer Nossa Equipe
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ icon: Icon, number, label }, idx) => (
              <Card
                key={idx}
                className="glass-card p-8 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-primary rounded-2xl text-white shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gradient mb-2">
                  {number}
                </div>
                <div className="text-muted-foreground font-medium">{label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
