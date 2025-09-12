import { Truck, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6" />
              <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">FJM Transportes</span>
            </div>
            <p className="text-sm text-primary-foreground/80 text-pretty">
              Empresa especialitzada en transports convencionals i serveis urgents amb més de 15 anys d'experiència a
              Catalunya.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)]">Serveis</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Transport Convencional</li>
              <li>Serveis Urgents</li>
              <li>Mercaderies Especials</li>
              <li>Transport Internacional</li>
            </ul>
          </div>

          {/* Fleet */}
          <div className="space-y-4">
            <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)]">Flota</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Furgonetes fins 3.5T</li>
              <li>Camions rígids fins 18T</li>
              <li>Camions articulats 38m</li>
              <li>Plataformes especials 90T</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)]">Contacte</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>669 422 375</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>93 777 53 32</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>fjm@fjmtransportes.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Esparreguera, Barcelona</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">© 2024 FJM Transportes. Tots els drets reservats.</p>
        </div>
      </div>
    </footer>
  )
}
