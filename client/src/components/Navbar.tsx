import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const scrollNavItems = [
  { name: "首頁", id: "home" },
  { name: "適合對象", id: "audience" },
  { name: "品牌故事", id: "story" },
  { name: "分店資訊", id: "locations" },
  { name: "常見問題", id: "faq" },
  { name: "聯絡我們", id: "contact" },
];

import logo from "@assets/Untitled_design__15_-removebg-preview_1764006141705.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location] = useLocation();

  const isServicesPage = location === "/services";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isServicesPage) return;

      for (const item of scrollNavItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isServicesPage]);

  const scrollToSection = (id: string) => {
    if (isServicesPage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b bg-white/70 backdrop-blur-md border-border/20",
        isScrolled
          ? "py-2 shadow-sm border-border/40"
          : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div
          className="cursor-pointer flex items-center gap-3"
          onClick={() => scrollToSection("home")}
        >
          <img src={logo} alt="沐璿草本" className="h-12 w-auto object-contain" width={500} height={500} />
          <span className="font-serif text-xl font-bold text-primary hidden sm:block">沐璿草本護髮中心</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {scrollNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                !isServicesPage && activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.name}
            </button>
          ))}

          {/* Services page link with underline on hover */}
          <Link href="/services">
            <span
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors relative inline-block",
                "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left",
                isServicesPage
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              服務介紹
            </span>
          </Link>

          <Button
            variant="default"
            size="sm"
            className="ml-2 bg-primary hover:bg-primary/90 text-white"
            onClick={() => scrollToSection("contact")}
          >
            立即預約
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-12">
              <div className="flex flex-col gap-4">
                {scrollNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg font-medium py-2 border-b border-border/50 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <Link href="/services">
                  <span
                    className={cn(
                      "block text-lg font-medium py-2 border-b border-border/50 transition-colors",
                      isServicesPage ? "text-primary" : "hover:text-primary"
                    )}
                  >
                    服務介紹
                  </span>
                </Link>
                <Button
                  className="mt-4 w-full bg-primary hover:bg-primary/90"
                  onClick={() => scrollToSection("contact")}
                >
                  立即預約
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
