"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fleetCategories = [
  {
    id: "01",
    title: "Lleugers",
    description: "Vehicles ideats per a rutes ràpides i enviaments urbans o lleugers.",
    image: "/fleet/ligero.webp",
    points: [
      "Transports de càrregues fins a 1.000 kg",
      "Transports de càrregues de 3.500 Kg"
    ]
  },
  {
    id: "02",
    title: "Pesants",
    description: "Transport eficient per a mitjanes i grans càrregues nacionals i internacionals.",
    image: "/fleet/camion-rigido.jpg",
    points: [
      "Transport de càrregues fins a 16 Tn",
      "Transports de càrregues fins a 24 Tn"
    ]
  },
  {
    id: "03",
    title: "Amb Grua",
    description: "Vehicles equipats amb autogrua per a càrrega, descàrrega i posicionament precís.",
    image: "/fleet/autogrua.jpg",
    points: [
      "Camions grues amb plomes de 14 a 38 metres"
    ]
  },
  {
    id: "04",
    title: "Especials",
    description: "Plataformes i góndoles per a càrregues voluminoses i maquinària d'obra.",
    image: "/fleet/especials.avif",
    points: [
      "Góndoles extensibles per a dipòsits de gran volum",
      "Gòndoles i plataformes de càrregues fins a 90 Tn",
      "Plataformes extensibles de fins a 30 metres",
      "Góndoles amb rampes especials per a maquinària (0,60 m de distància del sòl)"
    ]
  }
]

export function FleetSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".fleet-panel")
      const wrapper = wrapperRef.current

      if (!wrapper) return

      // Master Timeline for Horizontal Scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (slides.length * window.innerWidth * 0.6),
          invalidateOnRefresh: true,
        }
      })

      // Move all panels horizontally
      tl.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
      }, 0)

      // Add a subtle parallax to the background images within the same timeline
      slides.forEach((slide) => {
        const img = slide.querySelector('.fleet-parallax-img')
        if (img) {
          tl.to(img, {
            xPercent: 25, // La imagen se mueve en la dirección contraria al scroll
            ease: "none"
          }, 0)
        }
      })

    }, sectionRef)

    // Fallback refresh for dimensions
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="flota" 
      className="relative z-20 w-full h-screen bg-[#05090f] overflow-hidden border-t border-white/10 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Título Fijo Global (Siempre visible) */}
      <div className="absolute top-10 lg:top-16 left-6 lg:left-16 z-50 pointer-events-none">
        <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-4 filter drop-shadow-lg">
          <span className="w-8 h-px bg-primary"></span>
          Flota i Vehicles
        </p>
      </div>

      {/* Contenedor Horizontal */}
      <div ref={wrapperRef} className="flex h-full w-[400vw] flex-nowrap" style={{ width: `${fleetCategories.length * 100}vw` }}>
        {fleetCategories.map((cat, i) => (
          <div key={cat.id} className="fleet-panel relative w-screen h-full shrink-0 flex items-center justify-center overflow-hidden">
            
            {/* Imagen Pura a Pantalla Completa con Parallax */}
            <div className="absolute inset-0 w-full h-full bg-black z-0">
               {/* La imagen es un 25% más ancha para permitir el parallax lateral (-ml-[12.5%]) */}
               <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="fleet-parallax-img absolute top-0 -left-[12.5%] w-[125%] h-full object-cover opacity-70"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#05090f] via-[#05090f]/30 to-[#05090f]/50 pointer-events-none" />
            </div>

            {/* Tipografía Outline Brutalista Absoluta de Fondo */}
            <div className="absolute top-[10%] lg:top-1/4 right-4 md:right-8 lg:right-12 z-0 pointer-events-none select-none opacity-20 hidden md:block">
               <h3 
                 className="text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-black uppercase text-transparent whitespace-nowrap leading-none text-right" 
                 style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
               >
                 {cat.title}
               </h3>
            </div>

            {/* Contenido Real Inferior (Flotando sobre la imagen) */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 lg:px-16 pb-20 lg:pb-28">
              <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-24 w-full">
                
                {/* Título de Vehículo Masivo */}
                <div className="flex-1 flex items-start gap-4 lg:gap-8">
                  <span className="text-primary font-mono text-2xl lg:text-5xl font-bold mt-2 lg:mt-6 shrink-0 filter drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                    {cat.id}/
                  </span>
                  <h3 className="text-6xl sm:text-7xl lg:text-[10rem] font-black uppercase tracking-tighter text-white/95 leading-[0.85] filter drop-shadow-2xl">
                    {cat.title}
                  </h3>
                </div>

                {/* Detalles y Puntos (Tech Specs) */}
                <div className="lg:w-[45%] flex flex-col pb-4 border-l border-primary/30 pl-6 lg:pl-10">
                  <p className="text-white/80 text-xl lg:text-2xl font-light leading-relaxed mb-10">
                    {cat.description}
                  </p>
                  <ul className="flex flex-col gap-5">
                    {cat.points.map((point, index) => (
                      <li key={index} className="text-white/90 text-lg lg:text-xl font-light tracking-tight flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Barra de progreso inferior tipo Scroll Awwwards */}
      <div className="absolute bottom-8 lg:bottom-12 left-6 lg:left-16 right-6 lg:right-16 z-50 flex items-center gap-6 opacity-60">
        <span className="text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest hidden sm:block">Scroll per explorar flota</span>
        <div className="flex-1 h-[1px] bg-white/20 relative">
          <div className="absolute top-0 left-0 h-full w-full bg-primary/20" />
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full border border-white" />
           <div className="w-2 h-2 rounded-full border border-white" />
           <div className="w-2 h-2 rounded-full bg-white hidden sm:block" />
        </div>
      </div>
      
    </section>
  )
}
