import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Navbar } from "@/components/layout/public/navbar"
import { Footer } from "@/components/layout/public/footer"
import { HeroSection } from "./(public)/_components/hero-section"
import { TrainingOptionsSection } from "./(public)/_components/training-options-section"
import { ScheduleEventsSection } from "./(public)/_components/schedule-events-section"
import { SuccessStoriesSection } from "./(public)/_components/success-stories-section"

export default function Page() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <TrainingOptionsSection />
      <ScheduleEventsSection />
      <SuccessStoriesSection/>
      <Footer />
    </div>
  )
}
