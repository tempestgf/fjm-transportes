import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contacte" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
            Contacta amb nosaltres
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Estem aquí per ajudar-te amb les teves necessitats de transport. Contacta amb nosaltres per un pressupost
            personalitzat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-space-grotesk)]">
                Informació de contacte
              </h3>
              <p className="text-muted-foreground text-pretty">
                Pots contactar amb nosaltres a través dels nostres telèfons o per mail i et confeccionarem un pressupost
                personalitzat amb la millor relació qualitat/preu del mercat.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <div className="font-medium text-foreground">Telèfons</div>
                  <div className="text-muted-foreground">669 422 375 (24 hores)</div>
                  <div className="text-muted-foreground">93 777 53 32</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-muted-foreground">fjm@fjmtransportes.com</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <div className="font-medium text-foreground">Adreça</div>
                  <div className="text-muted-foreground">
                    C. Tres Rieres nau 20
                    <br />
                    Polígon Industrial Magarola
                    <br />
                    08292 Esparreguera - Barcelona
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-secondary mt-1" />
                <div>
                  <div className="font-medium text-foreground">Horaris</div>
                  <div className="text-muted-foreground">
                    Dilluns a Divendres: 8:00 - 18:00
                    <br />
                    Urgències: 24 hores, 7 dies
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-space-grotesk)]">Sol·licita un pressupost</CardTitle>
              <CardDescription>Omple el formulari i et contactarem el més aviat possible</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nom</label>
                  <Input placeholder="El teu nom" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Empresa</label>
                  <Input placeholder="Nom de l'empresa" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Telèfon</label>
                  <Input placeholder="Número de telèfon" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input type="email" placeholder="correu@exemple.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipus de servei</label>
                <Input placeholder="Transport convencional, urgent, mercaderies especials..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Missatge</label>
                <Textarea placeholder="Descriu les teves necessitats de transport..." className="min-h-[100px]" />
              </div>

              <Button className="w-full bg-secondary hover:bg-secondary/90">Enviar sol·licitud</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
