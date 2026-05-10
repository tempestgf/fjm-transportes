import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Truck3DSection } from "@/components/truck-3d-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { InfrastructureSection } from "@/components/InfrastructureSection"
import { VehiclesSection } from "@/components/VehicleSection"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      {/* <Truck3DSection /> */}
      <InfrastructureSection />
      <ServicesSection />
      <VehiclesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
