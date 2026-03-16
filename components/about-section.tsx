"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Efecto Overlap de entrada (esquinas se ajustan)
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
            end: "top 30%",
            scrub: 1,
            refreshPriority: 2,
          }
        }
      )

      // 2. Textos de título en cascada (Brutalism Typography)
      gsap.from(".reveal-text", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      })

      // 3. Expanding Image Scroll (Estilo Awwwards)
      if (imgWrapperRef.current && imgRef.current) {
        gsap.to(imgWrapperRef.current, {
          width: "100%",
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapperRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          }
        })

        // Parallax interior en la imagen que se expande
        gsap.fromTo(imgRef.current, 
          { y: "-15%", scale: 1.15 },
          { 
            y: "15%", 
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imgWrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        )
      }

      // 4. Circular badge infinito y entrada suave
      gsap.from(".spin-badge-container", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".spin-badge-container",
          start: "top 80%",
        }
      })

      gsap.to(".spin-badge", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
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
      id="sobre-nosaltres" 
      className="relative z-30 w-full overflow-hidden bg-[#e8e8e5] text-[#05090f] -mt-24 pt-32 pb-0 shadow-[0_-30px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Superior: Typography Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 relative z-10">
          
          {/* Columna Izquierda: Los 15 Años */}
          <div className="lg:w-1/3 flex flex-col justify-start">
            <div className="reveal-text lg:sticky lg:top-32">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-black/10 text-[#05090f] font-mono tracking-widest text-[10px] uppercase mb-12 bg-white/50 backdrop-blur-md">
                 <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                 Sobre Nosaltres
              </div>
              
              <div className="text-[8rem] lg:text-[11rem] text-[#05090f] font-black tracking-tighter leading-none mb-4 flex items-start">
                15<span className="text-primary text-6xl mt-4">+</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#05090f]/60 max-w-[200px] leading-relaxed">
                Anys d'experiència movint el que els altres no poden
              </div>
            </div>
          </div>
          
          {/* Columna Derecha: Título y Párrafos (Brutalista) */}
          <div className="lg:w-2/3 pt-4 lg:pt-16">
            <h2 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-16 text-[#05090f]">
              <span className="reveal-text block">Líders en</span>
              <span className="reveal-text block italic font-serif text-primary lowercase tracking-normal">especials</span>
              <span className="reveal-text block">i urgents</span>
            </h2>

            <div className="w-full h-px bg-black/10 mb-16" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg lg:text-xl font-light text-[#05090f]/80 leading-relaxed">
              <p className="reveal-text">
                <strong className="font-bold text-[#05090f]">FJM Transports</strong> és una empresa de transports especialitzada en transports convencionals i serveis urgents. Amb seu a <strong className="text-primary font-bold">Collbató (Barcelona)</strong>, oferim serveis d'abast nacional i internacional garantint màxima confiança.
              </p>
              <div className="flex flex-col gap-8">
                <p className="reveal-text">
                  La nostra especialitat és el transport de grans volums i pesos, incloent-hi maquinària especial per a obra pública. Disposem de diverses plataformes versàtils per a totes les necessitats.
                </p>
                <p className="reveal-text">
                  Gràcies a la nostra flota flexible i el tipus de treball precís, oferim un servei altament personalitzat, adaptant-nos a totes les exigències i terminis dels nostres clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inferior: Expanding Image Scrub + Rotative SVG Badge */}
      <div className="w-full flex relative justify-center items-end" style={{ height: "auto" }}>
        
        {/* Floating Badge (Posicionado entre el texto y la imagen) */}
        <div className="spin-badge-container absolute z-20 hidden md:flex bottom-[65%] right-16 w-40 h-40">
          <div className="w-full h-full relative flex items-center justify-center bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-black/5">
            <svg viewBox="0 0 100 100" className="spin-badge w-full h-full p-2">
              <path id="circlePathAbout" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text className="text-[10px] font-mono uppercase tracking-[0.22em] fill-[#05090f] font-bold">
                <textPath href="#circlePathAbout">
                  • FJM Transports • Experiència i Seguretat
                </textPath>
              </text>
            </svg>
            <div className="absolute w-3 h-3 bg-primary rounded-full" />
          </div>
        </div>

        {/* Imagen en expansión controlada por el scroll */}
        <div 
          ref={imgWrapperRef} 
          className="relative w-[90%] md:w-[70%] h-[50vh] md:h-[80vh] rounded-t-[3rem] overflow-hidden" // Solo redondeado superior
        >
          <div className="absolute inset-0 bg-black/10 z-10 mix-blend-multiply pointer-events-none" />
          {/* Overlay oscuro sutil para no deslumbrar en el contraste general */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
          
          <img 
            ref={imgRef}
            src="/fleet/especials.avif" // Imagen local requerida
            alt="Transports Especials i Maquinària Pesada" 
            className="absolute inset-0 w-full h-[130%] object-cover origin-center"
          />
          
          {/* Título gigante superpuesto que respeta el interior del recorte */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none overflow-hidden">
             <h3 className="reveal-text text-white text-[12vw] md:text-[9vw] font-black uppercase tracking-tighter opacity-80" style={{ mixBlendMode: 'overlay' }}>
               Expansió
             </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
