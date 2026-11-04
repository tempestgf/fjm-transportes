import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/site/hero"
import { Intro } from "@/components/site/intro"
import { FleetScale } from "@/components/site/fleet-scale"
import { Photos } from "@/components/site/photos"
import { Services } from "@/components/site/services"
import { Depot } from "@/components/site/depot"
import { Contact } from "@/components/site/contact"
import { SiteFooter } from "@/components/site/site-footer"

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <FleetScale />
        <Photos />
        <Services />
        <Depot />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
