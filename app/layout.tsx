import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "FJM Transportes - Empresa de Transports a Catalunya",
  description:
    "Empresa especialitzada en transports convencionals i serveis urgents amb més de 15 anys d'experiència. Flota completa de furgonetes a camions de 38m.",
  keywords: "transport, camions, furgonetes, Catalunya, Barcelona, logística, transport urgent",
    generator: 'v0.app'
}

import { SmoothScrolling } from "@/components/smooth-scrolling"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ca" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-gray-50">
        <SmoothScrolling>
          <Suspense fallback={null}>{children}</Suspense>
        </SmoothScrolling>
      </body>
    </html>
  )
}
