"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLHeadingElement>(null)
  const text2Ref = useRef<HTMLHeadingElement>(null)
  const text3Ref = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Animación de Entrada Inicial
      // En vez de fromTo que "bloquea" los estilos iniciales, seteamos los estilos de entrada 
      // y animamos HASTA el estado base (el que hereda luego el ScrollTrigger)
      gsap.set(imageRef.current, { width: "0vw", height: "0vh", borderRadius: "100px" })
      
      const introTl = gsap.timeline()
      introTl.to(imageRef.current, {
        width: "30vw", height: "40vh", borderRadius: "24px", duration: 1.8, ease: "power4.out" 
      })
      
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, delay: 1.2, ease: "power3.out" }
      )

      // 2. Animación de Scroll (Pin & Scale)
      // Enlazamos este timeline PARA QUE EMPIECE DE LAS MEDIDAS EXACTAS DE ARRIBA
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      })

      // Le decimos explicitly start at 30vw/40vh and end at 100vw/100vh
      tl.fromTo(imageRef.current, 
        {
          width: "30vw",
          height: "40vh",
          borderRadius: "24px",
        },
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "none",
        }, 
      0)

      tl.to([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: -100,
        stagger: 0.1,
        ease: "power2.inOut"
      }, 0)

      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0.4
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#004C96] flex flex-col items-center justify-center overflow-hidden">

      <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
        <h1 ref={text1Ref} className="text-[#ffffff] text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-center m-0">
          Transport
        </h1>
        
        <div className="flex items-center justify-center gap-4 lg:gap-8 w-full">
          <h1 ref={text2Ref} className="text-[#ffffff] text-[15vw] leading-[0.8] font-black uppercase tracking-tighter m-0 italic font-sans">
            &
          </h1>
          <h1 ref={text3Ref} className="text-[#ffffff] text-[15vw] leading-[0.8] font-black uppercase tracking-tighter m-0" style={{ WebkitTextStroke: "2px #ffffff", color: "transparent" }}>
            Logística
          </h1>
        </div>
      </div>

      {/* Logo Central (Aparece tras el texto) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img 
          ref={logoRef} 
          src="/FJM_LOGO.png" 
          alt="FJM Logo" 
          className="w-48 md:w-80 object-contain opacity-0"
        />
      </div>

      {/* Video Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex justify-center items-center">
        <div 
          ref={imageRef}
          className="overflow-hidden relative bg-[#ffffff] flex justify-center items-center"
          style={{ width: "30vw", height: "40vh", borderRadius: "24px" }}
        >
          <video 
            src="/hero.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-[100vw] h-[100vh] object-cover scale-105 pointer-events-none max-w-none"
          />
          <div className="absolute inset-0 bg-[#000000]/30 mix-blend-overlay" />
        </div>
      </div>

      <div ref={descRef} className="absolute bottom-12 z-20 w-full px-8 flex justify-end items-end mix-blend-difference opacity-0">
        <Link
          href="#contacte"
          className="group relative isolate h-14 md:h-16 bg-[#ffffff] text-[#000000] overflow-hidden rounded-full flex items-center justify-between px-6 gap-6 md:px-8 md:gap-8 border border-[#000000]/10 shadow-sm"
        >
          <span className="relative z-10 text-sm md:text-xl font-black uppercase tracking-tighter group-hover:text-[#ffffff] transition-colors duration-500">
            Pressupost
          </span>

          <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary group-hover:bg-[#ffffff] flex items-center justify-center overflow-hidden transition-colors duration-500 shrink-0 border border-[#000000]/5 shadow-sm">
            <ArrowUpRight className="w-5 h-5 text-[#ffffff] group-hover:text-primary absolute group-hover:translate-x-8 group-hover:-translate-y-8 transition-all duration-500" />
            <ArrowUpRight className="w-5 h-5 text-[#ffffff] group-hover:text-primary absolute -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
          </div>

          <div className="absolute inset-0 rounded-[inherit] bg-primary scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100 z-0" />
        </Link>
      </div>

    </section>
  )
}
