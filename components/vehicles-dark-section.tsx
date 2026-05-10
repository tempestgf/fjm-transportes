"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const vehicles = [
  { title: "Transports de càrregues fins a 1.000\u00A0kg", img: "/media/fleet-truck-01.jpeg" },
  { title: "Transports de càrregues de 3.500\u00A0Kg", img: "/media/fleet-truck-02.jpeg" },
  { title: "Transport de càrregues fins a 16\u00A0Tn", img: "/media/fleet-truck-03.jpeg" },
  { title: "Transports de càrregues fins a 24\u00A0Tn", img: "/media/fleet-truck-04.jpeg" },
  { title: "Camions grues amb plomes de 14 a 38\u00A0metres", img: "/media/fleet-truck-05.jpeg" },
  { title: "Góndoles extensibles per a dipòsits de gran volum", img: "/media/fleet-truck-06.jpeg" },
  { title: "Gòndoles i plataformes de càrregues fins a 90\u00A0Tn", img: "/media/fleet-truck-07.jpeg" },
  { title: "Plataformes extensibles de fins a 30\u00A0metres", img: "/media/fleet-truck-08.jpeg" },
  { title: "Góndoles amb rampes especials per a maquinària d’obra pública (0,60\u00A0m de distància del sòl)", img: "/media/fleet-truck-09.jpeg" }
]

export function VehiclesDarkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Entry overlap effect
      gsap.fromTo(sectionRef.current,
        { 
          y: 150, 
          borderTopLeftRadius: "150px", 
          borderTopRightRadius: "150px",
        },
        {
          y: 0,
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
            refreshPriority: 1,
          }
        }
      )

      // 2. Title reveal
      gsap.from(".vehicle-title-reveal", {
        y: 100,
        opacity: 0,
        rotateZ: 3,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      })

      // 3. List items reveal
      gsap.utils.toArray<HTMLElement>(".vehicle-row").forEach((row) => {
        gsap.from(row, {
          y: 80,
          opacity: 0,
          rotateX: -20,
          transformOrigin: "0% 50% -50",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        })
      })

      // 4. Parallax on sticky image wrapper
      if (imageWrapperRef.current && listRef.current) {
        gsap.to(imageWrapperRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="vehicles" 
      className="relative w-full bg-[#000000] text-[#ffffff] -mt-24 z-30 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Grid Background Overlay clipped to section borders */}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Top Marquee */}
      <div className="w-full border-b border-white/10 py-6 overflow-hidden bg-[#223560]/20 relative z-10">
        <div className="flex whitespace-nowrap opacity-70">
           <div className="animate-marquee inline-block">
             {[...Array(6)].map((_, i) => (
               <span key={i} className="text-xl md:text-3xl font-black uppercase tracking-[0.2em] mx-8 font-mono">
                 FJM Transportes <span className="text-[#223560] mx-8">✦</span> Capacitat Total <span className="text-[#223560] mx-8">✦</span>
               </span>
             ))}
           </div>
           {/* Duplicate for infinite effect */}
           <div className="animate-marquee inline-block">
             {[...Array(6)].map((_, i) => (
               <span key={`dup-${i}`} className="text-xl md:text-3xl font-black uppercase tracking-[0.2em] mx-8 font-mono">
                 FJM Transportes <span className="text-[#223560] mx-8">✦</span> Capacitat Total <span className="text-[#223560] mx-8">✦</span>
               </span>
             ))}
           </div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 z-10">
        
        {/* Title Block */}
        <div className="flex flex-col mb-20">
          <div className="vehicle-title-reveal inline-flex items-center px-4 py-2 rounded-full border border-white/20 text-[#ffffff] font-mono tracking-widest text-[10px] uppercase mb-8 w-fit bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#223560] mr-3"></span>
            Especificacions
          </div>
          
          <h2 className="text-[12vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-4 text-[#ffffff]">
            <span className="vehicle-title-reveal block">La Nostra</span>
            <span className="vehicle-title-reveal block italic font-serif text-[#223560] lowercase tracking-normal pl-0 lg:pl-32">Flota</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left: Interactive List */}
          <div className="lg:w-3/5 flex flex-col w-full" ref={listRef}>
            {vehicles.map((vehicle, index) => (
              <div 
                key={index} 
                className="vehicle-row group border-t border-white/10 py-8 md:py-12 relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Full row background sweep */}
                <div className="absolute inset-0 bg-[#ffffff] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                  <div className="flex items-start md:items-center gap-6 md:gap-12 w-full">
                    <span className="font-mono text-white/30 group-hover:text-black/30 text-xl transition-colors duration-500 shrink-0 mt-2 md:mt-0">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-[2.2vw] font-black uppercase tracking-tighter leading-[0.9] text-white group-hover:text-black transition-colors duration-500 w-full">
                      {vehicle.title}
                    </h3>
                  </div>
                  <div className="hidden md:flex w-16 h-16 rounded-full border border-white/20 group-hover:border-black/20 items-center justify-center shrink-0 transition-colors duration-500 overflow-hidden relative">
                    <ArrowUpRight className="w-8 h-8 text-white absolute group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500" />
                    <ArrowUpRight className="w-8 h-8 text-black absolute -translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
            {/* Final border bottom */}
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Right: Sticky Visualizer */}
          <div className="lg:w-2/5 hidden lg:block">
            <div className="sticky top-32 w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 group">
              <div className="absolute inset-0 bg-[#223560]/30 mix-blend-multiply z-10 pointer-events-none transition-opacity duration-500 opacity-50" />
              
              <div ref={imageWrapperRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
                {vehicles.map((vehicle, index) => (
                  <img 
                    key={index}
                    src={vehicle.img} 
                    alt={vehicle.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out filter ${
                      activeIndex === index 
                        ? "opacity-100 scale-100 grayscale-0" 
                        : "opacity-0 scale-105 grayscale"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm z-20 pointer-events-none">
                <span className="text-white text-3xl font-black uppercase tracking-widest border border-white/30 px-10 py-5 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-500">
                  FJM
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
