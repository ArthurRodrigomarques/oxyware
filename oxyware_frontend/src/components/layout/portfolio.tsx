"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Portfolio() {
  const t = useTranslations("portfolio");

  const projects = [
    {
      id: 1,
      title: t("projects.realEstate"),
      description: t("projects.realEstateDescription"),
      image: "/example/websiteexample.png",
    },
    {
      id: 2,
      title: t("projects.cars"),
      description: t("projects.carsDescription"),
      image: "/example/cars.png",
    },
  ];

  return (
    <section className="py-16" id="portfolio text-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">{t("title")}</h2>
      <p className="text-center text-white mb-16 max-w-3xl mx-auto">
        {t("description")}
      </p>
      <div className="flex flex-col gap-16 px-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 w-full rounded-2xl shadow-lg overflow-hidden">
              <div className="h-[400px] overflow-y-auto scrollbar-hide">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={800}
                  className="object-cover w-full"
                  quality={100}
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <h3 className="text-2xl font-semibold mb-4 text-white">{project.title}</h3>
              <p className="text-white whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
