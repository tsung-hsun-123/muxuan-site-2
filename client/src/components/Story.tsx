import { motion } from "framer-motion";
import { PictureImage } from "@/components/ui/picture-image";

import storyImgPng from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs.png";
import story320w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.webp";
import story640w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.webp";
import story1024w from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.webp";
import story320wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-320w.avif";
import story640wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-640w.avif";
import story1024wAvif from "@assets/generated_images/symbolic_herbal_journey_image_with_healthy_plant_growing_from_traditional_herbs-1024w.avif";

const storySrcSet = [
  { width: 320, webpSrc: story320w, avifSrc: story320wAvif },
  { width: 640, webpSrc: story640w, avifSrc: story640wAvif },
  { width: 1024, webpSrc: story1024w, avifSrc: story1024wAvif },
];

export default function Story() {
  return (
    <section id="story" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 relative inline-block">
            關於沐璿
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full left-1/2 -translate-x-1/2"></span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Image Column */}
          <motion.div 
            className="lg:col-span-4 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-32">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] h-full">
                <PictureImage
                  src={storyImgPng}
                  alt="沐璿草本護髮品牌故事 — 草本植物從傳統藥材中生長，象徵品牌追求天然護髮之旅"
                  width={1024}
                  height={1024}
                  srcSetEntries={storySrcSet}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                  className="w-full h-full object-cover"
                  containerClassName="absolute inset-0 w-full h-full"
                  style={{ aspectRatio: "unset" }}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-xl shadow-xl max-w-xs border border-border hidden md:block">
                <p className="font-serif text-lg italic text-primary">
                  "真正好的產品，應該讓更多人受惠。"
                </p>
                <p className="text-right mt-2 text-sm font-bold text-muted-foreground">—— 葉玉女 創始人</p>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            className="lg:col-span-8 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-muted-foreground space-y-5 leading-loose text-[15px] font-sans">
              <p>
                創辦人葉玉女，在新加坡生活的20年間，與草本文化結下了一段緣分，這套草本配方的靈感，就是在那段時間得到啟發。
              </p>
              <p>
                這段旅程的起點，來自她與母親、女兒，三代人長期深受脂漏性皮膚炎影響而起。頭皮屑反覆出現、發癢不適，她多年來試過各種方法，卻始終沒有真正好轉。同時，隨著年齡增長，白髮問題也逐漸浮現，傳統染髮劑帶來的刺激與負擔，讓頭皮狀況更加惡化。
              </p>

              <blockquote className="border-l-4 border-primary/40 pl-5 py-1 my-6">
                <p className="font-serif text-lg font-bold text-foreground/80 italic leading-snug">
                  「難道『遮蓋白髮』，就一定要讓頭皮受傷嗎？」
                </p>
              </blockquote>

              <p>
                三代人共同的頭皮困擾，加上對染髮安全的擔憂，讓她下定決心，一定要找到一種既能自然遮蓋白髮，又能溫和調理頭皮的方式。於是，她投入一年多時間，專注於天然草本的研究與調配，反覆測試與改良，只為找到一個既溫和又穩定的配方。最終，她成功研發出一套天然、安全、有效的草本配方，讓染髮既可以保養頭皮，也可以染白髮。
              </p>
              <p>
                這套配方不僅能自然修飾白髮，同時也幫助改善頭皮屑、油脂失衡與搔癢問題，讓頭皮逐漸回到健康的狀態，同時也顯得更年輕。這個真實的案例，從三代人的困擾，到親身驗證的改善成果，所經歷的不只是產品的誕生，更是一個被實踐證明可行的答案。
              </p>
              <p>
                隨著新加坡市場逐漸穩定，她決定將這份結合「染白髮」與「頭皮護理」的成果帶回台灣，讓更多人選擇染白髮時，可以透過溫和的自然方式，找回頭皮的舒適與平衡。
              </p>
              <p className="font-medium text-foreground/70">
                沐璿草本始終堅持，以真誠的心、天然的成分、安心的配方，陪伴每一位需要的人。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
