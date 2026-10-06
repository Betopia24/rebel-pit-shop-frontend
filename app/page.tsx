import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Navbar } from "@/components/layout/public/navbar"
import { Footer } from "@/components/layout/public/footer"
import { HeroSection } from "./(public)/_components/hero-section"

export default function Page() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <Footer />
    </div>
  )
}
