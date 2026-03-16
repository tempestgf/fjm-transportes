import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Truck3DSection } from "@/components/truck-3d-section"
import { ServicesSection } from "@/components/services-section"
import { FleetSection } from "@/components/fleet-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <Truck3DSection /> */}
      <ServicesSection />
      <FleetSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
