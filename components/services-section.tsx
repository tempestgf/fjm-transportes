import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Package, Globe } from "lucide-react"

const services = [
  {
    icon: Truck,
    title: "Transport Convencional",
    description: "Servei regular de transport de mercaderies amb la màxima fiabilitat i puntualitat.",
    features: ["Planificació optimitzada", "Seguiment en temps real", "Documentació completa"],
  },
  {
    icon: Clock,
    title: "Serveis Urgents",
    description: "Transport exprés per a lliuraments que no poden esperar, disponible 24 hores.",
    features: ["Resposta immediata", "Lliurament el mateix dia", "Servei 24/7"],
  },
  {
    icon: Package,
    title: "Mercaderies Especials",
    description: "Transport especialitzat per a càrregues de gran volum, pes i maquinària especial.",
    features: ["Plataformes adaptables", "Fins a 90 tones", "Permisos especials"],
  },
  {
    icon: Globe,
    title: "Nacional i Internacional",
    description: "Cobertura completa a nivell nacional i connexions internacionals fiables.",
    features: ["Tota la península", "Europa", "Documentació aduanera"],
  },
]

export function ServicesSection() {
  return (
    <section id="serveis" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Els nostres serveis</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Oferim solucions de transport personalitzades que s'adapten perfectament a les necessitats dels nostres
            clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
