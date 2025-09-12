import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Shield, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative hero-gradient py-20 lg:py-32 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Transport professional a <span className="text-primary">Catalunya</span>
              </h1>
              <p className="text-xl text-secondary-foreground/80 leading-relaxed max-w-2xl">
                Més de 15 anys d'experiència oferint serveis de transport convencional i urgent amb una flota completa
                de furgonetes a camions de 38 metres.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 bg-white/60 p-4 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Servei 24h</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 p-4 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Totalment assegurat</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 p-4 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Nacional i internacional</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 h-14">
                Sol·licitar pressupost
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 h-14 border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Veure la nostra flota
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/modern-truck-fleet-on-highway-professional-transpo.jpg"
                alt="Flota de camions FJM Transportes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border-2 border-primary/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm font-medium text-foreground">Anys d'experiència</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-xl border-2 border-primary/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm font-medium text-foreground">Servei disponible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
