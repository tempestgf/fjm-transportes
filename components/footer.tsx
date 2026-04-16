"use client"

import { useRef, useEffect } from "react"
import { ArrowUpRight, MoveUp } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const hugeTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax effect on the giant text moving up as you scroll down
      gsap.fromTo(hugeTextRef.current, 
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          }
        }
      )

      gsap.fromTo(".footer-link", 
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="relative z-30 w-full bg-[#05090f] text-[#e8e8e5] pb-0 overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
        
        {/* Superior: Grid Editorial Info (like contact-section) */}
        <div className="flex flex-col lg:flex-row w-full pb-16 lg:pb-24 border-b border-white/10 gap-16 lg:gap-0">
            
            {/* Lado Izquierdo: Navegación & Datos Contacto */}
            <div className="lg:w-1/3 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 pt-16 lg:pt-24 pb-16 lg:pb-0 pr-0 lg:pr-16 gap-16">
              
              <div className="footer-link group">
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 text-[#e8e8e5] font-mono tracking-widest text-[10px] uppercase mb-8 w-max">
                   <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
                   Navegació
                </div>
                <ul className="flex flex-col gap-6">
                  {['Serveis', 'Flota', 'Nosaltres', 'Contacte'].map((item, i) => (
                    <li key={i}>
                      <Link href={`#${item.toLowerCase()}`} className="text-3xl lg:text-4xl font-light tracking-tight hover:text-primary transition-colors duration-500 flex items-center gap-4 group w-max">
                        <span>{item}</span>
                        <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="footer-link group">
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Email</h4>
                <a href="mailto:fjm@fjmtransportes.com" className="text-2xl lg:text-3xl font-light tracking-tight hover:text-primary transition-colors duration-500">
                  fjm@fjmtransportes.com
                </a>
              </div>

              <div className="footer-link group">
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Telèfon (Oficina)</h4>
                <a href="tel:+34937775332" className="text-3xl lg:text-4xl font-light tracking-tight hover:text-primary transition-colors duration-500">
                  937 77 53 32
                </a>
              </div>

            </div>

            {/* Lado Derecho: Sede y Botón Top */}
            <div className="lg:w-2/3 flex flex-col justify-between pt-16 lg:pt-24 pl-0 lg:pl-16">
              
              <div className="footer-link group flex gap-12">
                <div className="flex-1">
                  <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Seu Central</h4>
                  <p className="text-xl lg:text-2xl font-light tracking-tight text-white/80 leading-relaxed">
                    C/ Tres Rieres, Nau 20<br/>
                    Polígon Industrial La Magarola<br/>
                    08292 Esparreguera, Barcelona<br/>
                    NIF: B66139247
                  </p>
                </div>
                <div className="flex-1 hidden md:block">
                  <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Més Contactes</h4>
                  <div className="text-sm font-light text-white/60 space-y-2">
                    <p><strong>Trànsit:</strong> +34 687 94 26 42 / fjmtrafico@fjmtransportes.com</p>
                    <p><strong>Comercial:</strong> +34 669 42 23 75</p>
                    <p><strong>Admin:</strong> +34 669 42 23 50 / administracion@administracionfjmtransportes.com</p>
                    <p><strong>Magatzem:</strong> +34 616 71 94 66 / trafico2@fjmtransportes.com</p>
                  </div>
                </div>
              </div>

              <div className="footer-link mt-12 w-full max-w-2xl">
                <button 
                  onClick={scrollToTop}
                  className="group relative w-full h-24 lg:h-32 bg-[#e8e8e5] text-[#05090f] overflow-hidden rounded-[2rem] flex items-center justify-between px-8 lg:px-16"
                >
                  <span className="relative z-10 text-3xl lg:text-5xl font-black uppercase tracking-tighter group-hover:text-white transition-colors duration-500">
                    Tornar a Dalt
                  </span>
                  
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#05090f] flex items-center justify-center overflow-hidden group-hover:bg-white transition-colors duration-500">
                    <MoveUp className="w-8 h-8 text-[#e8e8e5] absolute group-hover:-translate-y-12 transition-transform duration-500" />
                    <MoveUp className="w-8 h-8 text-[#05090f] absolute translate-y-12 group-hover:translate-y-0 transition-transform duration-500" />
                  </div>

                  <div className="absolute inset-0 bg-primary transform translate-y-full rounded-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] z-0" />
                </button>
              </div>

            </div>
        </div>

        {/* FJM TRANSPORTE TITLE MASIVO Brutalista */}
        <div className="w-full flex flex-col items-center justify-center py-16 lg:py-24" ref={hugeTextRef}>
          <h2 className="text-[22vw] sm:text-[18vw] md:text-[15vw] lg:text-[9vw] xl:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter flex flex-col items-center text-center w-full max-w-[100vw] px-4 overflow-visible">
            <span className="text-white block px-4">FJM</span>
            <span className="text-transparent block px-4 whitespace-nowrap" style={{ WebkitTextStroke: "min(3px, 0.4vw) rgba(255,255,255,0.8)" }}>
              TRANSPORTES<span className="text-primary" style={{ WebkitTextStroke: "0px" }}>.</span>
            </span>
          </h2>
        </div>

        {/* Footer legal minimalista */}
        <div className="footer-link w-full border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center text-white/30 font-mono text-xs uppercase tracking-widest z-10 mt-auto">
           <p>© {new Date().getFullYear()} FJM Transportes. Tots els drets reservats.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors duration-300">Avís Legal</a>
             <a href="#" className="hover:text-white transition-colors duration-300">Privacitat</a>
             <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
           </div>
        </div>

      </div>
    </footer>
  )
}
