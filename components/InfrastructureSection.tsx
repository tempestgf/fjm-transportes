"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShieldCheck, Move, Truck, ArrowUpRight, Anchor, PackageCheck } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function InfrastructureSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Entry overlap effect (consistent with site architecture)
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

      // 2. Title & Large Typography reveal
      gsap.from(".infra-title-reveal", {
        y: 120,
        opacity: 0,
        rotateZ: 2,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      })

      // 3. List items reveal
      gsap.utils.toArray<HTMLElement>(".infra-item").forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        })
      })

      // 4. Cards stagger
      gsap.from(".infra-card", {
        y: 100,
        opacity: 0,
        rotateX: -15,
        transformOrigin: "50% 100%",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".infra-card-container",
          start: "top 80%",
        }
      })

    }, sectionRef)

    // Timeout to recalculate scroll positions after layout
    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="infraestructura" 
      className="relative w-full bg-[#ffffff] text-[#000000] -mt-24 z-40 shadow-[0_-30px_60px_rgba(0,0,0,0.4)] pb-12 overflow-hidden"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 z-10">
        
        {/* Superior: Typography Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32 relative z-10">
          
          {/* Columna Izquierda: Capacidad (Sticky) */}
          <div className="lg:w-2/5 flex flex-col justify-start">
            <div className="infra-title-reveal lg:sticky lg:top-40">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-[#000000]/10 text-[#000000] font-mono tracking-widest text-[10px] uppercase mb-12 bg-[#ffffff]/50 backdrop-blur-md">
                 <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                 Infraestructura
              </div>
              
              <div className="text-[6rem] lg:text-[8rem] text-[#000000] font-black tracking-tighter leading-none mb-2 flex items-start">
                1.100<span className="text-primary text-4xl lg:text-5xl mt-4 lg:mt-6 ml-2 tracking-normal">m²</span>
              </div>
              <div className="text-[4rem] lg:text-[6rem] text-[#000000]/20 font-black tracking-tighter leading-none mb-12 flex items-start">
                6<span className="text-[#000000]/20 text-2xl lg:text-3xl mt-4 lg:mt-6 ml-4 tracking-normal">m d'alçada</span>
              </div>

              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#000000]/60 max-w-[250px] leading-relaxed border-l-2 border-primary pl-6">
                Carrer Tres Rieres, Nau 20 <br/>
                Pol. Ind. La Magarola <br/>
                08292 Esparreguera
              </div>

              {/* Imagen en el espacio vacío */}
              <div className="mt-16 w-full aspect-[4/5] rounded-[2rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-[#000000]/10 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                <img 
                  src="/media/fleet-truck-05.jpeg" 
                  alt="Instal·lacions FJM Transportes"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] grayscale group-hover:grayscale-0"
                />
              </div>
            </div>
          </div>
          
          {/* Columna Derecha: Título y Lista */}
          <div className="lg:w-3/5 pt-4 lg:pt-0">
            <h2 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-16 text-[#000000]">
              <span className="infra-title-reveal block">Centre</span>
              <span className="infra-title-reveal block italic font-serif text-primary lowercase tracking-normal">Logístic</span>
              <span className="infra-title-reveal block">Avançat</span>
            </h2>

            <div className="w-full h-px bg-[#000000]/10 mb-16" />

            {/* Features List */}
            <div className="flex flex-col gap-12">
              <div className="infra-item flex flex-col gap-6 group">
                <div className="flex items-center gap-6 border-b border-[#000000]/10 pb-6">
                  <div className="p-4 bg-[#f5f5f5] rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Move className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-[#000000]">Espai Flexible</h3>
                </div>
                <p className="text-[#000000]/70 text-lg lg:text-xl font-light leading-relaxed pl-2">
                  Superfície distribuïda per maximitzar i facilitar el flux logístic. Adaptem l'ús de l'espai per a diferents tipus de productes, garantint una maniobrabilitat òptima i segura en cada operació.
                </p>
              </div>

              <div className="infra-item flex flex-col gap-6 group">
                <div className="flex items-center gap-6 border-b border-[#000000]/10 pb-6">
                  <div className="p-4 bg-[#f5f5f5] rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <ArrowUpRight className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-[#000000]">Accessibilitat Ideal</h3>
                </div>
                <p className="text-[#000000]/70 text-lg lg:text-xl font-light leading-relaxed pl-2">
                  Entrada principal equipada amb un gran portaló industrial de ràpid accés. Permet un maneig eficaç per a qualsevol tipus de vehicle, reduint temps d'espera.
                </p>
              </div>

              <div className="infra-item flex flex-col gap-6 group">
                <div className="flex items-center gap-6 border-b border-[#000000]/10 pb-6">
                  <div className="p-4 bg-[#f5f5f5] rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-[#000000]">Seguretat Avançada</h3>
                </div>
                <p className="text-[#000000]/70 text-lg lg:text-xl font-light leading-relaxed pl-2">
                  Sistema de vigilància de darrera generació, incloent càmeres de seguretat 24/7 i alarmes de reacció immediata. Els seus actius, sempre protegits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Serveis Globals */}
        <div className="mt-40 relative infra-card-container">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-full h-px bg-[#000000]/10" />
            <h3 className="shrink-0 font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[#000000]/40">
              Serveis Globals
            </h3>
            <div className="w-full h-px bg-[#000000]/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="infra-card bg-[#f5f5f5] p-8 lg:p-12 rounded-[2rem] group hover:bg-[#223560] transition-colors duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] flex flex-col">
              <Truck className="w-12 h-12 text-primary mb-8 group-hover:text-white transition-colors duration-500" />
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#000000] group-hover:text-white transition-colors duration-500">Transport Nac. i Int.</h4>
              <p className="text-[#000000]/60 group-hover:text-white/80 transition-colors duration-500 font-light leading-relaxed mb-auto pb-8">
                Càrregues completes, fraccionades i serveis d'urgència adaptats als seus terminis més exigents.
              </p>
              <div className="inline-block px-4 py-2 bg-[#000000]/5 group-hover:bg-white/10 rounded-full text-xs font-mono text-[#000000]/80 group-hover:text-white transition-colors duration-500 w-fit">
                Flota pròpia + 80 autònoms
              </div>
            </div>

            <div className="infra-card bg-[#f5f5f5] p-8 lg:p-12 rounded-[2rem] group hover:bg-[#223560] transition-colors duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] flex flex-col">
              <Anchor className="w-12 h-12 text-primary mb-8 group-hover:text-white transition-colors duration-500" />
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#000000] group-hover:text-white transition-colors duration-500">Serveis Especials</h4>
              <p className="text-[#000000]/60 group-hover:text-white/80 transition-colors duration-500 font-light leading-relaxed mb-auto">
                Transport altament especialitzat de maquinària pesada, embarcacions, grans estructures i més.
              </p>
            </div>

            <div className="infra-card bg-[#f5f5f5] p-8 lg:p-12 rounded-[2rem] group hover:bg-[#223560] transition-colors duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] flex flex-col">
              <PackageCheck className="w-12 h-12 text-primary mb-8 group-hover:text-white transition-colors duration-500" />
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#000000] group-hover:text-white transition-colors duration-500">Emmagatzematge</h4>
              <p className="text-[#000000]/60 group-hover:text-white/80 transition-colors duration-500 font-light leading-relaxed mb-auto">
                Recepció, verificació i descàrrega, garantint un control de qualitat exhaustiu en cada etapa del procés logístic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tècnic del Document */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 mt-24 z-10">
        <div className="flex justify-end border-t border-[#000000]/10 pt-8">
          <p className="text-[#000000]/30 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-right max-w-2xl">
            Francisco Javier Martinez Operador de transports, S.L. · C/ Tres Rieres, nau 20 Pol. Ind. La Magarola · 08292 - Esparraguera · NIF: B66139247
          </p>
        </div>
      </div>
    </section>
  )
}