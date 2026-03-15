import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PictureImage } from "@/components/ui/picture-image";
import {
  Leaf,
  Droplets,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  FlaskConical,
  HandHeart,
  BookOpen,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";

import ingredientsImgPng from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates.png";
import ingredients320w from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-320w.webp";
import ingredients640w from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-640w.webp";
import ingredients1024w from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-1024w.webp";
import ingredients320wAvif from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-320w.avif";
import ingredients640wAvif from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-640w.avif";
import ingredients1024wAvif from "@assets/generated_images/traditional_chinese_herbs_(ginseng,_angelica,_etc)_arranged_on_separate_small_plates-1024w.avif";

const ingredientsSrcSet = [
  { width: 320, webpSrc: ingredients320w, avifSrc: ingredients320wAvif },
  { width: 640, webpSrc: ingredients640w, avifSrc: ingredients640wAvif },
  { width: 1024, webpSrc: ingredients1024w, avifSrc: ingredients1024wAvif },
];

const features = [
  {
    id: "scalp",
    title: "深層頭皮淨化配方",
    description:
      "針對頭皮屑、油脂過剩與毛囊堵塞問題。使用珍貴草本精華，溫和去除老廢角質，平衡頭皮油脂分泌，讓頭皮重新呼吸。",
    icon: <Droplets className="w-6 h-6 text-primary" />,
    tags: ["控油", "去屑", "潔淨"],
  },
  {
    id: "nourish",
    title: "髮根強健滋養配方",
    description:
      "專為落髮、稀疏髮質設計。富含人參、何首烏等滋養成分，深入毛囊提供營養，強健髮根，促進健康生長循環。",
    icon: <Leaf className="w-6 h-6 text-primary" />,
    tags: ["固髮", "滋養", "活化"],
  },
];

const steps = [
  {
    number: "01",
    icon: <MessageCircle className="w-7 h-7 text-primary" />,
    title: "頭皮問題諮詢",
    description: "專業護理師深入了解您的頭皮狀況、生活習慣與護髮歷史，找出根本原因。",
  },
  {
    number: "02",
    icon: <FlaskConical className="w-7 h-7 text-primary" />,
    title: "草本配方調配",
    description: "依據諮詢結果，為您量身選配最適合的天然草本配方，確保安全有效。",
  },
  {
    number: "03",
    icon: <HandHeart className="w-7 h-7 text-primary" />,
    title: "深層護理療程",
    description: "運用草本精華進行深層頭皮護理，舒緩不適、強化毛囊、滋養髮絲。",
  },
  {
    number: "04",
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    title: "專業居家建議",
    description: "護理師提供日常保養建議，幫助您在家中延續並鞏固療程效果。",
  },
  {
    number: "05",
    icon: <CalendarCheck className="w-7 h-7 text-primary" />,
    title: "定期追蹤調整",
    description: "持續追蹤頭皮改善進度，適時調整配方與療程，讓效果穩定長久。",
  },
];

export default function ServicesPage() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Page Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">首頁</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">服務介紹</span>
            </div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              獨家技術
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              沐璿草本護髮服務
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              結合傳統草本智慧與現代萃取技術，為不同頭皮問題量身打造天然解方。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 兩大草本配方 */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              兩大草本配方
            </h2>
            <p className="text-muted-foreground text-lg">
              專為不同頭皮困擾設計，溫和有效，長期安全使用。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  id={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {feature.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-foreground/80 font-medium">
                  <ShieldCheck className="text-primary w-5 h-5" />
                  <span>SGS 安全認證</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80 font-medium">
                  <Sparkles className="text-primary w-5 h-5" />
                  <span>無化學添加</span>
                </div>
              </div>
            </div>

            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                <PictureImage
                  src={ingredientsImgPng}
                  alt="沐璿草本護髮 — 人參、當歸等傳統中藥草本食材，天然護髮配方原料"
                  width={1024}
                  height={1024}
                  srcSetEntries={ingredientsSrcSet}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  containerClassName="absolute inset-0 w-full h-full"
                  style={{ aspectRatio: "unset" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-serif text-2xl italic">"源自大自然的治癒力量"</p>
                </div>
              </div>
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-[2rem] -z-10 translate-x-4 translate-y-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 服務流程 */}
      <section className="py-20 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              服務流程
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              五步驟完整護髮體驗
            </h2>
            <p className="text-muted-foreground text-lg">
              從諮詢到追蹤，每個環節都由專業護理師全程陪伴。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6 md:gap-4 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-primary/15 z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-primary/10 flex items-center justify-center mb-4 group-hover:scale-110">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-primary/50 tracking-widest mb-1">{step.number}</span>
                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary-foreground)/0.05),transparent_60%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              準備好體驗草本護髮？
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              立即預約，讓專業護理師為您量身打造最適合的頭皮護理方案。
            </p>
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg h-12 px-10"
              >
                立即預約
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
