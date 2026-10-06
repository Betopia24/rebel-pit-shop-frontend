import { Navbar } from "@/components/layout/public/navbar"
import { Footer } from "@/components/layout/public/footer"
import { HeroSection } from "./(public)/_components/hero-section"
import { TrainingOptionsSection } from "./(public)/_components/training-options-section"
import { ScheduleEventsSection } from "./(public)/_components/schedule-events-section"
import { SuccessStoriesSection } from "./(public)/_components/success-stories-section"
import { ContactCtaSection } from "./(public)/_components/contact-cta-section"

export default function Page() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <TrainingOptionsSection />
      <ScheduleEventsSection />
      <SuccessStoriesSection/>
      <ContactCtaSection />
      <Footer />
    </div>
  )
}
