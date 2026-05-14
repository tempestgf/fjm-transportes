import type React from "react"
import type { Metadata } from "next"
import { Inter, Courier_Prime } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const faviconHref = new URL("./FJM_LOGO.ico", import.meta.url).href

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
})

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "FJM Transportes - Empresa de Transports a Catalunya",
  description:
    "Empresa especialitzada en transports convencionals i serveis urgents amb més de 15 anys d'experiència. Flota completa de furgonetes a camions de 38m.",
  keywords: "transport, camions, furgonetes, Catalunya, Barcelona, logística, transport urgent",
  generator: 'v0.app',
  icons: {
    icon: faviconHref,
  },
}

import { SmoothScrolling } from "@/components/smooth-scrolling"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca" className={`${inter.variable} ${courierPrime.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <SmoothScrolling>
          <Suspense fallback={null}>{children}</Suspense>
        </SmoothScrolling>
      </body>
    </html>
  )
}
