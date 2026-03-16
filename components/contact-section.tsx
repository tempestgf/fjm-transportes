"use client"

import React, { useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Efecto Overlap: La sección oscura se monta sobre la blanca de About
      gsap.fromTo(sectionRef.current,
        { 
          y: 150, 
          borderTopLeftRadius: "100px", 
          borderTopRightRadius: "100px",
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

      // 2. Animación Brutalista del título
      gsap.fromTo(".contact-char",
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-title-container",
            start: "top 75%",
          }
        }
      )

      // 3. Revelado de los campos del formulario
      gsap.fromTo(".anim-form-row",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".form-wrapper",
            start: "top 80%",
          }
        }
      )

      // 4. Info lateral y líneas
      gsap.fromTo(".anim-info-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".info-wrapper",
            start: "top 80%",
          }
        }
      )

    }, sectionRef)

    const timer = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic for form submission
  }

  const title = "Parlem".split("");

  return (
    <section 
      ref={sectionRef} 
      id="contacte" 
      className="relative z-40 w-full bg-[#05090f] text-[#e8e8e5] pt-32 pb-0 -mt-24 rounded-t-[2.5rem] lg:rounded-t-[4rem] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col pt-10">
        
        {/* Superior: Título Masivo */}
        <div className="contact-title-container flex flex-col lg:flex-row items-start lg:items-end justify-between border-b border-white/10 pb-16 lg:pb-24 gap-12">
          
          <div className="flex flex-col">
            <h2 className="text-[6rem] sm:text-[8rem] lg:text-[12rem] leading-[0.85] font-black uppercase tracking-tighter flex overflow-hidden pb-4 lg:pb-8 pt-2">
              {title.map((char, i) => (
                <span key={i} className="contact-char block">
                  {char}
                </span>
              ))}
              <span className="contact-char block text-primary">.</span>
            </h2>
          </div>

          <div className="lg:w-1/3 flex flex-col gap-6 lg:pb-4">
            <p className="text-xl lg:text-2xl font-light text-white/60 leading-relaxed">
              Té un projecte complex? Necessita pressupost? <span className="text-white font-medium">L'ajudem a moure'l.</span>
            </p>
          </div>
        </div>

        {/* Inferior: Grid Editorial Info + Formulario */}
        <div className="flex flex-col lg:flex-row w-full flex-1">
          
          {/* Lado Izquierdo: Datos de contacto estilizados */}
          <div className="info-wrapper lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 py-16 lg:py-24 lg:pr-16 flex flex-col gap-16">
            
            <div className="anim-info-block group">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Email</h4>
              <a href="mailto:info@fjm-transports.com" className="text-3xl lg:text-4xl font-light tracking-tight hover:text-primary transition-colors duration-500">
                info@fjm-transports.com
              </a>
            </div>

            <div className="anim-info-block group">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Telèfon</h4>
              <a href="tel:+34931234567" className="text-3xl lg:text-4xl font-light tracking-tight hover:text-primary transition-colors duration-500">
                +34 93 123 45 67
              </a>
            </div>

            <div className="anim-info-block group">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Seu Central</h4>
              <p className="text-2xl lg:text-3xl font-light tracking-tight text-white/80 leading-relaxed">
                Polígon Industrial<br/>
                08293 Collbató<br/>
                Barcelona
              </p>
            </div>

          </div>

          {/* Lado Derecho: Formulario minimalista tipográfico */}
          <div className="form-wrapper lg:w-2/3 py-16 lg:py-24 lg:pl-16 lg:pr-8">
            <form onSubmit={submitForm} className="flex flex-col h-full justify-between gap-16">
              
              <div className="flex flex-col gap-8 lg:gap-12">
                {/* Fila 1 */}
                <div className="anim-form-row relative group flex flex-col md:flex-row md:items-end gap-4 border-b border-white/20 pb-4">
                  <span className="font-mono text-sm text-primary mb-2 md:mb-0 md:mr-6 shrink-0">01</span>
                  <input 
                    type="text" 
                    required
                    placeholder="Com es diu? *" 
                    className="w-full bg-transparent text-3xl lg:text-5xl font-light text-white placeholder:text-white/20 focus:outline-none focus:placeholder:text-transparent peer" 
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] peer-focus:w-full" />
                </div>

                {/* Fila 2 */}
                <div className="anim-form-row relative group flex flex-col md:flex-row md:items-end gap-4 border-b border-white/20 pb-4">
                  <span className="font-mono text-sm text-primary mb-2 md:mb-0 md:mr-6 shrink-0">02</span>
                  <input 
                    type="email" 
                    required
                    placeholder="Quin és el seu email? *" 
                    className="w-full bg-transparent text-3xl lg:text-5xl font-light text-white placeholder:text-white/20 focus:outline-none focus:placeholder:text-transparent peer" 
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] peer-focus:w-full" />
                </div>

                {/* Fila 3 y 4 (Empresa / Telef) */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  <div className="anim-form-row relative group flex-1 flex flex-col md:flex-row md:items-end gap-4 border-b border-white/20 pb-4">
                    <span className="font-mono text-sm text-primary mb-2 md:mb-0 md:mr-4 shrink-0">03</span>
                    <input 
                      type="text" 
                      placeholder="Empresa (Opcional)" 
                      className="w-full bg-transparent text-2xl lg:text-4xl font-light text-white placeholder:text-white/20 focus:outline-none focus:placeholder:text-transparent peer" 
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 ease-out peer-focus:w-full" />
                  </div>
                  
                  <div className="anim-form-row relative group flex-1 flex flex-col md:flex-row md:items-end gap-4 border-b border-white/20 pb-4">
                    <span className="font-mono text-sm text-primary mb-2 md:mb-0 md:mr-4 shrink-0">04</span>
                    <input 
                      type="tel" 
                      placeholder="Telèfon de contacte" 
                      className="w-full bg-transparent text-2xl lg:text-4xl font-light text-white placeholder:text-white/20 focus:outline-none focus:placeholder:text-transparent peer" 
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 ease-out peer-focus:w-full" />
                  </div>
                </div>

                {/* Fila 5 Mensaje */}
                <div className="anim-form-row relative group flex flex-col md:flex-row gap-4 border-b border-white/20 pb-4 mt-4">
                  <span className="font-mono text-sm text-primary md:mr-6 shrink-0 pt-2">05</span>
                  <textarea 
                    required
                    placeholder="Expliqui'ns les seves necessitats de transport..." 
                    className="w-full bg-transparent text-2xl lg:text-4xl font-light text-white placeholder:text-white/20 focus:outline-none focus:placeholder:text-transparent peer resize-none min-h-[120px]" 
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] peer-focus:w-full" />
                </div>
              </div>

              {/* Botón de envío Brutalista */}
              <div className="anim-form-row mt-12 mb-8">
                <button 
                  type="submit" 
                  className="group relative w-full h-24 lg:h-32 bg-[#e8e8e5] text-[#05090f] overflow-hidden rounded-[2rem] flex items-center justify-between px-8 lg:px-16"
                >
                  <span className="relative z-10 text-3xl lg:text-5xl font-black uppercase tracking-tighter group-hover:text-white transition-colors duration-500">
                    Enviar Petició
                  </span>
                  
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#05090f] flex items-center justify-center overflow-hidden group-hover:bg-white transition-colors duration-500">
                    <ArrowRight className="w-8 h-8 text-[#e8e8e5] absolute group-hover:translate-x-12 transition-transform duration-500" />
                    <ArrowRight className="w-8 h-8 text-[#05090f] absolute -translate-x-12 group-hover:translate-x-0 transition-transform duration-500" />
                  </div>

                  {/* Fondo interactivo que llena el botón */}
                  <div className="absolute inset-0 bg-primary transform translate-y-full rounded-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] z-0" />
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
