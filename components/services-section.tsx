"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ServiceGroup {
  id: string;
  title: string;
  desc: string;
  items: string[];
}

const serviceGroups: ServiceGroup[] = [
  {
    id: "01",
    title: "Repartiment",
    desc: "Solucions àgils per a l'última milla i distribució capil·lar. Optimitza la teva cadena de subministrament amb rutes eficients.",
    items: ["Servei de paqueteria", "Servei d'agrupatge", "Entregues B2B i B2C"]
  },
  {
    id: "02",
    title: "Trailers Nac.",
    desc: "Flota pròpia de tràilers per a càrregues completes a nivell peninsular. Seguiment GPS en temps real i màxima seguretat.",
    items: ["Rutes diàries", "Càrrega completa", "Servei porta a porta"]
  },
  {
    id: "03",
    title: "Trailers Int.",
    desc: "Connexions regulars amb els principals hubs logístics europeus. Experiència en trànsit transfronterer i optimització de rutes.",
    items: ["Rutes europees", "Gestió duanera", "Xarxa de col·laboradors"]
  },
  {
    id: "04",
    title: "Grues",
    desc: "Equipament especialitzat per a càrregues de gran tonatge i dimensions. Personal altament qualificat per a maniobres complexes.",
    items: ["Moviments interns", "Elevació de càrregues", "Posicionament maquinària"]
  },
  {
    id: "05",
    title: "Especials",
    desc: "Gestió integral de projectes singulars i mercaderies sobredimensionades, despatxos i cotxes pilot inclosos.",
    items: ["Embarcacions", "Grans estructures", "Maquinària pesada", "Contenidors"]
  },
  {
    id: "06",
    title: "Emmagatzematge",
    desc: "Instal·lacions d'alta seguretat per a l'estocatge, picking i preparació de comandes. Control d'inventari informatitzat.",
    items: ["Preparació de comandes", "Manipulacions", "Gestió de devolucions"]
  }
]

function ServiceItem({ group, index }: { group: ServiceGroup, index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="service-row border-b border-[#000000]/10 group">
      <div 
        className="flex items-center justify-between py-8 md:py-12 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-6 md:gap-12">
          <span className="text-xl md:text-2xl font-mono text-[#000000]/30 font-bold group-hover:text-primary transition-colors duration-500">
            {group.id}
          </span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#000000] group-hover:text-primary transition-colors duration-500">
            {group.title}
          </h3>
        </div>
        <div className="shrink-0 p-3 md:p-4 rounded-full bg-primary group-hover:bg-[#ffffff] group-hover:text-primary transition-colors duration-500 shadow-sm border border-[#000000]/5">
          <Plus className={`w-6 h-6 text-white group-hover:text-primary transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <p className="text-lg md:text-xl font-light text-[#000000]/70 leading-relaxed lg:pr-8">
                {group.desc}
              </p>
              
              <div className="flex flex-col gap-4">
                <p className="font-mono text-xs tracking-widest uppercase text-[#000000]/40 border-b border-[#000000]/10 pb-4 mb-2">
                  Especificacions operatives /
                </p>
                <ul className="space-y-4">
                  {group.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-4 text-[#000000]/80 font-mono text-sm uppercase tracking-wider">
                      <span className="text-primary text-xs font-bold">[{`0${i + 1}`}]</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Title Reveal
      gsap.from(".services-title-reveal", {
        y: 100,
        opacity: 0,
        rotateZ: 2,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      })

      // 2. Service Rows stagger
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        })
      })

    }, sectionRef)

    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="serveis" 
      className="relative w-full bg-[#ffffff] text-[#000000] z-50 pb-24"
    >
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 z-10">
        
        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">
          
          {/* Columna Izquierda: Título + Imagen — fluye normalmente (el contenido alto) */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="services-title-reveal inline-flex items-center px-4 py-2 rounded-full border border-[#000000]/10 text-[#000000] font-mono tracking-widest text-[10px] uppercase mb-12 bg-[#ffffff] backdrop-blur-md">
               <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
               Catàleg de Serveis
            </div>
            
            <h2 className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-[#000000] mb-8">
              <span className="services-title-reveal block">Serveis</span>
              <span className="services-title-reveal block italic font-serif text-primary lowercase tracking-normal">Globals</span>
            </h2>

            <p className="services-title-reveal font-mono text-xs uppercase tracking-[0.2em] text-[#000000]/60 max-w-[280px] leading-relaxed border-l-2 border-primary pl-6">
              Solucions logístiques integrals i personalitzades. Des d'entrega d'última milla fins a transports especials d'alt tonatge.
            </p>

            {/* Botón CTA */}
            <div className="services-title-reveal mt-16">
               <a href="#contacte" className="group inline-flex items-center gap-6 border border-[#000000]/10 rounded-full pl-8 pr-4 py-4 bg-[#ffffff] hover:bg-[#ffffff] transition-all duration-500 shadow-sm">
                 <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#000000]">Sol·licitar Pressupost</span>
                 <div className="w-12 h-12 rounded-full bg-[#ffffff] group-hover:bg-primary flex items-center justify-center transition-colors duration-500 border border-[#000000]/5 shadow-sm">
                    <Plus className="w-6 h-6 text-[#000000] group-hover:text-white transition-colors duration-500" />
                 </div>
               </a>
            </div>

            {/* Imagen grande — define la altura de la sección */}
            <div className="services-title-reveal mt-20 w-full aspect-[4/5] rounded-[2rem] overflow-hidden relative group hidden lg:block">
              <div className="absolute inset-0 bg-[#000000]/10 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
              <img 
                src="/media/fleet-truck-30.jpeg" 
                alt="Transports Globals FJM"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] grayscale group-hover:grayscale-0"
              />
            </div>
          </div>
          
          {/* Columna Derecha: Lista sticky — se pega al header y baja con el scroll */}
          <div className="lg:w-3/5 pt-12 lg:pt-0">
            <div className="lg:sticky lg:top-32">
              <div className="w-full border-t border-[#000000]/10">
                {serviceGroups.map((group, index) => (
                  <ServiceItem key={group.id} group={group} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}