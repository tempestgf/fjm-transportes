"use client"

import { MoveUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative z-30 w-full bg-[#004C96] text-[#ffffff] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Logo + Botón volver arriba */}
        <div className="flex items-center justify-between py-12 border-b border-[#ffffff]/10">
          <Image
            src="/FJM_LOGO.png"
            alt="FJM Transportes"
            width={200}
            height={80}
            className="h-12 w-auto object-contain"
          />
          <button
            onClick={scrollToTop}
            className="anti-alias-btn group flex items-center gap-3 px-6 py-3 rounded-full border border-[#ffffff]/20 hover:bg-[#ffffff]/10 transition-colors duration-500"
          >
            <span className="text-sm font-mono uppercase tracking-widest text-[#ffffff]/60 group-hover:text-[#ffffff] transition-colors duration-300">
              Tornar a Dalt
            </span>
            <div className="relative w-8 h-8 rounded-full bg-[#ffffff] flex items-center justify-center overflow-hidden shrink-0">
              <MoveUp className="w-4 h-4 text-[#004C96] absolute group-hover:-translate-y-8 transition-all duration-500" />
              <MoveUp className="w-4 h-4 text-[#004C96] absolute translate-y-8 group-hover:translate-y-0 transition-all duration-500" />
            </div>
          </button>
        </div>

        {/* Navegació + Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 text-[#ffffff]/40 font-mono text-xs uppercase tracking-widest">
          <nav className="flex gap-8">
            {[
              { name: "Serveis", href: "#serveis" },
              { name: "Vehicles", href: "#vehicles" },
              { name: "Infraestructura", href: "#infraestructura" },
              { name: "Contacte", href: "#contacte" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#ffffff] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} FJM Transportes · NIF B66139247</p>
        </div>

      </div>
    </footer>
  )
}
