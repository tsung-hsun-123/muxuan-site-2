import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PictureImage } from "@/components/ui/picture-image";
import { ArrowRight, Leaf } from "lucide-react";

import heroBgPng from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere.png";
import heroBg320w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.webp";
import heroBg640w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.webp";
import heroBg1024w from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.webp";
import heroBg320wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-320w.avif";
import heroBg640wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-640w.avif";
import heroBg1024wAvif from "@assets/generated_images/herbal_hair_treatment_hero_background_with_green_leaves_and_calm_atmosphere-1024w.avif";

const heroSrcSet = [
  { width: 320, webpSrc: heroBg320w, avifSrc: heroBg320wAvif },
  { width: 640, webpSrc: heroBg640w, avifSrc: heroBg640wAvif },
  { width: 1024, webpSrc: heroBg1024w, avifSrc: heroBg1024wAvif },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background z-10" />
        <PictureImage
          src={heroBgPng}
          alt="沐璿草本護髮中心 — 天然草本護髮背景，充滿生命力的綠葉"
          width={1024}
          height={1024}
          srcSetEntries={heroSrcSet}
          sizes="100vw"
          priority={true}
          className="w-full h-full object-cover"
          containerClassName="absolute inset-0 w-full h-full"
          style={{ aspectRatio: "unset" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 text-center">
        <div className="bg-black/30 backdrop-blur-[2px] rounded-3xl p-6 md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none border border-white/10 md:border-none mb-8 md:mb-0">
          {/* Badge */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 text-primary mb-6"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-sm font-bold tracking-wider">我們的信念</span>
          </div>

          {/* Lead-in */}
          <p
            className="animate-fade-up text-base md:text-lg text-white/85 font-medium tracking-widest mb-3 drop-shadow-sm"
            style={{ animationDelay: "0.45s" }}
          >
            沐璿始終相信
          </p>

          {/* Hero statement */}
          <h1
            className="animate-fade-up text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 drop-shadow-md leading-snug"
            style={{ animationDelay: "0.65s" }}
          >
            <span className="sr-only">沐璿草本護髮 — </span>
            染髮，也可以是
            <br />
            一種溫和的保養。
          </h1>

          {/* Divider */}
          <div
            className="animate-fade-up flex items-center justify-center gap-3 mb-6"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="block h-px w-12 bg-white/40" />
            <Leaf className="w-3 h-3 text-white/50" />
            <span className="block h-px w-12 bg-white/40" />
          </div>

          {/* Supporting text */}
          <p
            className="animate-fade-up text-base md:text-lg text-white/92 max-w-xl mx-auto mb-4 md:mb-10 font-normal leading-loose drop-shadow-sm"
            style={{ animationDelay: "0.95s" }}
          >
            我們堅持以最真誠的心，選用天然草本成分，<br/>
            打造兼顧「遮蓋白髮」與「頭皮健康」的護理方式，<br/>
            讓每一次染髮，都是一次安心的調理過程。
          </p>
        </div>

        <div
          className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "1.15s" }}
        >
          <Link href="/locations">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white border-none text-lg h-12 px-8"
            >
              門市資訊
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto bg-white/80 hover:bg-white text-primary border-white/90 backdrop-blur-md text-lg h-12 px-8 font-medium shadow-lg shadow-white/20"
            onClick={() => scrollTo("services")}
          >
            了解草本護髮
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
