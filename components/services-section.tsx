"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const serviceGroups = [
  {
    id: "01",
    title: "Transports de repartiment",
    items: ["Servei de paqueteria", "Servei d'agrupatge"],
    image: "/fleet/ligero.webp"
  },
  {
    id: "02",
    title: "Trailers - Servei nacional",
    items: [],
    image: "/fleet/camion-rigido.jpg"
  },
  {
    id: "03",
    title: "Trailers - Servei internacional",
    items: [],
    image: "/fleet/camion-rigido.jpg"
  },
  {
    id: "04",
    title: "Grues i trasllats industrials",
    items: [],
    image: "/fleet/autogrua.jpg"
  },
  {
    id: "05",
    title: "Transports especials",
    items: ["Embarcacions", "Grans estructures", "Maquinària pesada", "Contenidors"],
    image: "/fleet/especials.avif"
  },
  {
    id: "06",
    title: "Emmagatzematge",
    items: ["Preparació de comandes", "Manipulacions", "Gestió de devolucions"],
    image: "/fleet/ligero.webp" // Cambia esta imagen si tienes una de almacén en public/fleet
  }
]

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation for the whole section
      gsap.fromTo(
        ".awwwards-text",
        { y: 150, opacity: 0, rotate: 5 },
        { 
          y: 0, opacity: 1, rotate: 0, 
          duration: 1.5, 
          stagger: 0.1, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      id="serveis" 
      className="relative z-20 w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center py-20 border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        {serviceGroups.map((group, index) => (
          <img
            key={group.id}
            src={group.image}
            alt={group.title}
            className={`absolute inset-0 w-full h-full object-cover origin-center transition-all duration-[1.2s] ease-[cubic-bezier(0.7,0,0.2,1)] ${
              activeIndex === index 
                ? "opacity-50 scale-100 filter-none" 
                : "opacity-0 scale-110 blur-sm"
            }`}
          />
        ))}
        {/* Dark overlay to ensure text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8 mt-20">
        <h2 className="awwwards-text text-primary font-mono text-sm tracking-[0.3em] uppercase mb-12 flex items-center gap-4">
          <span className="w-12 h-px bg-primary"></span>
          Serveis Especialitzats
        </h2>

        <div className="w-full flex flex-col" ref={listRef}>
          {serviceGroups.map((group, index) => {
            const isActive = activeIndex === index;
            const hasItems = group.items.length > 0;

            return (
              <div 
                key={group.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className="group relative border-b border-white/10 last:border-b-0 py-8 md:py-12 cursor-pointer awwwards-text"
              >
                {/* Number & Title */}
                <div className="flex flex-col md:flex-row md:items-end md:gap-12 relative z-10">
                  <span className={`text-xl md:text-3xl font-mono transition-colors duration-500 mb-4 md:mb-0 md:pb-2 ${
                    isActive ? "text-primary" : "text-white/20 group-hover:text-white/50"
                  }`}>
                    {group.id}
                  </span>
                  
                  <h3 className={`text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-bold uppercase tracking-tighter leading-[0.85] transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${
                    isActive ? "text-white translate-x-0 sm:translate-x-4" : "text-white/40 group-hover:text-white/70"
                  }`}>
                    {group.title}
                  </h3>
                </div>

                {/* Subitems container (smoothly expands when active) */}
                <AnimatePresence>
                  {isActive && hasItems && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
                      className="overflow-hidden md:pl-[6.5rem]"
                    >
                      <ul className="pt-8 pb-4 space-y-3">
                        {group.items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 + (i * 0.05), duration: 0.5, ease: "easeOut" }}
                            className="text-lg md:text-2xl text-white/80 font-light flex items-center gap-4"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
