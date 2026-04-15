import { Link } from "wouter";

export default function PageFooter() {
  return (
    <div className="border-t-2 border-foreground/30 pt-8 pb-10 bg-background">
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm text-foreground/70">
        <Link href="/locations" className="hover:text-foreground transition-colors">門市資訊</Link>
        <Link href="/faq" className="hover:text-foreground transition-colors">常見問題</Link>
        <Link href="/services" className="hover:text-foreground transition-colors">服務介紹</Link>
        <Link href="/contact" className="hover:text-foreground transition-colors">預約聯絡</Link>
      </nav>
      <p className="text-center text-sm text-foreground/70">&copy; {new Date().getFullYear()} 沐璿草本護髮中心 Mu Xuan Herbal Hair Care. All rights reserved.</p>
    </div>
  );
}
