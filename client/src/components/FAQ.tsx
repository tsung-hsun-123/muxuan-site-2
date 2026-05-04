import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Q1：草本護髮真的有效嗎？",
    answer: "許多人在面對白髮、掉髮、頭皮癢、頭皮屑、出油過多等問題時，開始尋找更溫和、健康的護理方式，而「草本護髮」正是近年越來越受重視的選擇。\n\n與一般化學式護理不同，草本護髮更重視「頭皮養護」與「循序修復」，讓頭皮能自然呼吸，從根本改善問題。雖然效果不像化學產品那樣快速明顯，但草本護理的優勢在於溫和、安全、穩定且持久，特別適合重視健康、敏感頭皮，以及希望自然遮蓋白髮的人。\n\n選擇天然草本護髮，不只是改善外在髮況，更是給頭皮一個真正健康的開始。"
  },
  {
    question: "Q2：草本護髮能幫助生髮嗎？",
    answer: "頭皮癢、頭皮屑反覆出現，是許多人長期困擾的問題。即使換了洗髮精，情況常常只是暫時改善，沒多久又再次發作。\n\n常見原因包括油脂分泌過多、頭皮乾燥敏感、作息不規律、壓力過大，甚至長期使用刺激性較強的化學染髮產品，都可能讓頭皮屏障受損，進而引發頭皮癢、頭皮屑、泛紅與不適感。\n\n想真正改善頭皮問題，關鍵在於「調理頭皮」，而天然草本頭皮護理透過植物萃取成分，溫和清潔並舒緩頭皮，幫助平衡油脂分泌、減少敏感刺激，同時改善頭皮屑與頭皮發炎問題。\n\n相較於過度清潔或短暫壓制症狀，草本護理更重視從根本修復頭皮健康，讓頭皮恢復正常代謝與穩定狀態。尤其對於長期反覆發作、敏感型頭皮或脂漏性頭皮的人來說，更是一種溫和且持久的改善方式。\n\n頭皮健康了，髮質自然會跟著改善。從今天開始，給頭皮一個真正能呼吸的機會。"
  },
  {
    question: "Q3：草本護髮與化學染劑有何不同？",
    answer: "沐璿草本護髮 不含 PPD、不含 PTD，沒有刺激性氣味，也不會破壞頭髮鱗片或引發頭皮敏感。\n在上色的同時，草本成分能滋養頭皮、強化髮絲，使顏色自然柔和、服貼持久。這也是許多敏弱肌與長期染髮者選擇草本護髮的主要原因。"
  },
  {
    question: "Q4：多久需要做一次護理？",
    answer: "依個人頭皮狀況而定：\n\n特殊狀況（如嚴重油脂、落髮、敏感）：建議每週調理一次。\n一般保養：每月一次即可。\n\n初期可採密集調理，加速穩定頭皮；當狀況改善後，可逐步延長保養週期。"
  },
  {
    question: "Q5：一次護理的價格多少？",
    answer: "我們會依您的頭皮狀況與頭髮長度，提供客製化的專屬課程建議。\n一次護理的價格根據頭髮長度與密度而定，範圍為 $800 - $1550，特長另計，將由專業頭皮護理師於現場為您評估並報價。"
  },
  {
    question: "Q6：一次頭皮護理需要多久？",
    answer: "首次護理：約 1.5 小時\n第二次加強護理：約 1 小時\n\n時間包括頭皮檢測、草本調理、護理程序與專業諮詢，確保每位客戶都能獲得最完整的護理體驗。"
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            常見問與答 (FAQs)
          </h2>
          <p className="text-muted-foreground text-lg">
            為您解答關於草本護髮的疑問
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
