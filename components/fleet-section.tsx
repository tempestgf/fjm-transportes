import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const vehicles = [
  {
    type: "Furgonetes",
    image: "/delivery-van-professional-transport.jpg",
    capacity: "Fins a 3.5T",
    description: "Perfectes per a lliuraments urbans i transport de paqueteria.",
    specs: ["Càrrega útil: 1.5T", "Volum: 15m³", "Ideal per ciutat"],
  },
  {
    type: "Camions Rígids",
    image: "/rigid-truck-professional-transport.jpg",
    capacity: "Fins a 18T",
    description: "Vehicles versàtils per a transport de mercaderies generals.",
    specs: ["Càrrega útil: 12T", "Volum: 45m³", "Plataforma fixa"],
  },
  {
    type: "Camions Articulats",
    image: "/articulated-truck-trailer-professional-transport.jpg",
    capacity: "Fins a 38m",
    description: "La nostra flota més gran per a transports de llarga distància.",
    specs: ["Càrrega útil: 24T", "Longitud: 38m", "Gran volum"],
  },
  {
    type: "Plataformes Especials",
    image: "/special-platform-truck-heavy-machinery-transport.jpg",
    capacity: "Fins a 90T",
    description: "Equips especialitzats per a maquinària i càrregues especials.",
    specs: ["Fins a 90T", "Plataforma extensible", "Permisos especials"],
  },
]

export function FleetSection() {
  return (
    <section id="flota" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
            La nostra flota
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Disposem d'una àmplia flota composta per diferents tipus de vehicles per adaptar-nos a totes les necessitats
            de transport.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-background"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-[family-name:var(--font-space-grotesk)]">{vehicle.type}</CardTitle>
                  <Badge variant="secondary">{vehicle.capacity}</Badge>
                </div>
                <CardDescription className="text-pretty">{vehicle.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vehicle.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                      {spec}
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
