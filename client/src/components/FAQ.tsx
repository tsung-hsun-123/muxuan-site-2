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
    question: "Q2：頭皮癢、頭皮屑反覆發作怎麼改善？",
    answer: "頭皮癢、頭皮屑反覆出現，是許多人長期困擾的問題。即使換了洗髮精，情況常常只是暫時改善，沒多久又再次發作。\n\n常見原因包括油脂分泌過多、頭皮乾燥敏感、作息不規律、壓力過大，甚至長期使用刺激性較強的化學染髮產品，都可能讓頭皮屏障受損，進而引發頭皮癢、頭皮屑、泛紅與不適感。\n\n想真正改善頭皮問題，關鍵在於「調理頭皮」，而天然草本頭皮護理透過植物萃取成分，溫和清潔並舒緩頭皮，幫助平衡油脂分泌、減少敏感刺激，同時改善頭皮屑與頭皮發炎問題。\n\n相較於過度清潔或短暫壓制症狀，草本護理更重視從根本修復頭皮健康，讓頭皮恢復正常代謝與穩定狀態。尤其對於長期反覆發作、敏感型頭皮或脂漏性頭皮的人來說，更是一種溫和且持久的改善方式。\n\n頭皮健康了，髮質自然會跟著改善。從今天開始，給頭皮一個真正能呼吸的機會。"
  },
  {
    question: "Q3：草本護髮與化學染劑有何不同？",
    answer: "面對白髮困擾，許多人都會在「天然染髮」與「化學染髮」之間猶豫，不知道哪一種更適合自己。其實，兩者最大的差別就在於成分、對頭皮的影響，以及長期使用後的健康狀態。\n\n化學染髮的優點是上色快速、顏色選擇多樣，能在短時間內達到明顯的染髮效果。但許多化學染劑中含有阿摩尼亞、過氧化氫、PPD等刺激性成分，長期使用容易造成頭皮敏感、乾癢、泛紅，甚至讓頭皮受損。\n\n天然染髮則以植物性草本成分為主，像是天然指甲花、草本植物萃取等，透過溫和的方式進行染色。雖然顏色變化不像化學染髮那麼多，也需要較多時間累積效果，但對頭皮較溫和，更適合敏感性頭皮與重視健康養護的人。\n\n尤其對於需要長期遮蓋白髮的人來說，天然草本染髮不只是改變髮色，更是一種頭皮保養，透過染髮同時進行頭皮調理，減少刺激與負擔，讓頭皮維持健康穩定的狀態。\n\n選擇染髮，不只是選顏色，更是在選擇未來頭皮的健康。天然染髮與化學染髮各有其優缺點，重點在於找到最適合自己的方式。"
  },
  {
    question: "Q4：多久需要做一次護理？",
    answer: "很多人在開始接觸草本護髮時，最常問的問題就是：「草本護髮多久做一次效果最好？」其實，草本護理不像一般快速型化學護理，它更重視頭皮的循序調理與長期穩定，因此護理頻率會依照個人的頭皮狀況而有所不同。\n\n如果是頭皮容易出油、頭皮癢、頭皮屑明顯、脂漏性頭皮，或有白髮、掉髮困擾的人，初期建議每 7～14 天進行一次草本護理，讓頭皮能穩定調理，幫助恢復健康平衡。\n\n當頭皮狀況逐漸穩定後，可以調整為每1月～3個月做一次，作為日常保養與維持，避免問題再次反覆發作。特別是長期需要遮蓋白髮的人，規律的草本染髮與頭皮護理，更能同時兼顧美觀與健康。\n\n天然草本護髮的重點不在一次見效，而是在持續養護。透過植物成分溫和調理頭皮，讓毛囊與髮根慢慢恢復健康，效果通常更穩定且持久。找到適合自己的護理頻率，才能真正讓頭皮回到健康、舒適的狀態。"
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
