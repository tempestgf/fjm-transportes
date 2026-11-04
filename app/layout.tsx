import type React from "react"
import type { Metadata } from "next"
import { Archivo } from "next/font/google"
import "./globals.css"
import "./site.css"
import { SmoothScrolling } from "@/components/smooth-scrolling"

const faviconHref = new URL("./FJM_LOGO.ico", import.meta.url).href

// Una sola família variable: l'eix d'amplada fa de display (125) i de cota tècnica (62).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "FJM Transportes | Transport nacional, internacional i especial des d'Esparreguera",
  description:
    "Transports convencionals, serveis urgents i càrregues especials. Camions grua fins a 38 m, gòndoles fins a 90 Tn i plataformes extensibles fins a 30 m.",
  keywords: "transport, transport especial, camions grua, gòndoles, Esparreguera, Barcelona, logística, transport urgent",
  icons: {
    icon: faviconHref,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca" className={archivo.variable}>
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  )
}
