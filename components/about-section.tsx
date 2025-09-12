import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, MapPin, Clock } from "lucide-react"

const stats = [
  {
    icon: Award,
    number: "15+",
    label: "Anys d'experiència",
    description: "Servint clients amb excel·lència",
  },
  {
    icon: Users,
    number: "500+",
    label: "Clients satisfets",
    description: "Confien en els nostres serveis",
  },
  {
    icon: MapPin,
    number: "1000+",
    label: "Rutes completades",
    description: "Cada mes amb èxit",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Disponibilitat",
    description: "Servei d'urgències sempre actiu",
  },
]

export function AboutSection() {
  return (
    <section id="sobre-nosaltres" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
                Sobre FJM Transportes
              </h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                FJM Transportes és una empresa especialitzada en transports convencionals i serveis urgents amb seu a
                Collbató (Barcelona). Amb més de 15 anys d'experiència, oferim serveis de transport nacional i
                internacional.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground text-pretty leading-relaxed">
                A més d'oferir serveis de transport general de qualsevol tipus de mercaderia, la nostra especialitat és
                el transport de grans volums i pesos i maquinària especial per a l'obra pública. Disposem de diversos
                tipus de plataformes que s'adapten a totes les necessitats.
              </p>

              <p className="text-muted-foreground text-pretty leading-relaxed">
                El nostre servei és molt personalitzat i ens adaptem perfectament a les exigències dels nostres clients,
                oferint sempre la millor relació qualitat-preu del mercat.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-secondary font-[family-name:var(--font-space-grotesk)]">
                      {stat.number}
                    </div>
                    <div className="font-medium text-foreground">{stat.label}</div>
                    <div className="text-sm text-muted-foreground text-pretty">{stat.description}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
