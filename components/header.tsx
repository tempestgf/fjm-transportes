"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import gsap from "gsap"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animación de entrada inicial del header
    gsap.fromTo(headerRef.current, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    )
  }, [])

  // Menu Toggle Animations
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(menuRef.current, {
        top: 0,
        duration: 0.8,
        ease: "power4.inOut"
      })
      gsap.fromTo(".menu-item",
        { y: "150%", opacity: 0, rotate: 5 },
        { y: 0, opacity: 1, rotate: 0, stagger: 0.05, duration: 1, delay: 0.4, ease: "power4.out" }
      )
      gsap.fromTo(".menu-video",
        { scale: 0.8, opacity: 0, borderRadius: "50%" },
        { scale: 1, opacity: 1, borderRadius: "24px", duration: 1.2, delay: 0.5, ease: "expo.out" }
      )
    } else {
      document.body.style.overflow = 'auto'
      gsap.to(menuRef.current, {
        top: "-100vh",
        duration: 0.8,
        ease: "power4.inOut"
      })
    }
  }, [isMenuOpen])

  const navLinks = [
    { name: "Serveis", href: "#serveis", num: "01" },
    { name: "Flota", href: "#flota", num: "02" },
    { name: "Nosaltres", href: "#sobre-nosaltres", num: "03" },
    { name: "Contacte", href: "#contacte", num: "04" },
  ]

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[100] py-6 px-6 md:px-12 mix-blend-difference pointer-events-none"
      >
        <div className="flex items-center justify-between w-full pointer-events-auto">
          
          {/* Logo Minimalista */}
          <a href="#" className="relative z-[110] flex items-center group" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/FJM_LOGO.png"
              alt="FJM Transportes"
              width={180}
              height={72}
              priority
              className="h-9 w-auto object-contain md:h-10"
            />
          </a>

          {/* Toggle Menu Button Brutalista */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="anti-alias-btn mix-blend-normal group relative z-[110] h-12 w-12 md:h-14 md:w-auto bg-[#ffffff] text-[#000000] overflow-hidden rounded-full flex items-center justify-center md:justify-between p-1 md:px-6 md:gap-6 transition-colors duration-500 border border-[#000000]/10 shadow-sm"
          >
            <span className="relative z-10 text-sm font-black uppercase tracking-tighter group-hover:text-[#ffffff] transition-colors duration-500 hidden md:block">
              {isMenuOpen ? "Tancar" : "Menú"}
            </span>
            
            <div className="relative z-10 w-10 h-10 rounded-full bg-primary group-hover:bg-[#ffffff] flex items-center justify-center overflow-hidden transition-colors duration-500 shrink-0 border border-[#000000]/5 shadow-sm">
              <div className="absolute flex items-center justify-center text-[#ffffff] group-hover:text-primary group-hover:translate-x-8 group-hover:-translate-y-8 transition-all duration-500">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </div>
              <div className="absolute flex items-center justify-center text-[#ffffff] group-hover:text-primary -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </div>
            </div>

            <div className="absolute inset-0 bg-primary scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100 z-0" />
          </button>
          
        </div>
      </header>

      {/* Fullscreen Brutalist Menu */}
      <div 
        ref={menuRef}
        className="fixed left-0 top-[-100vh] w-full h-screen bg-[#000000] z-[90] flex flex-col justify-between px-6 md:px-12 pt-32 pb-12 overflow-hidden"
      >
        <div className="flex-1 flex flex-col justify-center">
          
          <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-24 h-full"> 
            {/* Navegación Izquierda */}
            <nav className="flex flex-col gap-2 md:gap-4 w-full lg:w-1/2">
              {navLinks.map((link, i) => (
                <div key={i} className="overflow-hidden pb-4">
                  <a 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="menu-item flex items-baseline gap-4 md:gap-8 group text-[#ffffff] hover:pl-8 transition-all duration-500 w-max"
                  >
                    <span className="font-sans text-xs md:text-sm text-[#ffffff]/30 mb-2 md:mb-6">
                      {link.num}
                    </span>
                    <span className="text-[12vw] md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85] group-hover:italic group-hover:text-[#ffffff] transition-colors">
                      {link.name}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Video Derecha (Awwwards Style) */}
            <div className="hidden lg:flex w-1/2 h-[50vh] xl:h-[60vh] justify-end items-center pr-8">
              <div className="menu-video w-full max-w-2xl h-full relative overflow-hidden bg-[#ffffff]/5 opacity-0">
                <video 
                  src="/hero.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover scale-105" 
                />
                {/* Dark overlay sobre el video para no competir con el texto */}
                <div className="absolute inset-0 bg-[#000000]/30 mix-blend-overlay"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Menu Footer Reducido */}
        <div className="border-t border-[#ffffff]/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
          <div className="overflow-hidden pb-2">
            <a href="mailto:fjm@fjmtransportes.com" className="menu-item text-[#ffffff] text-2xl md:text-3xl font-light hover:italic transition-all">
              fjm@fjmtransportes.com
            </a>
          </div>
          <div className="overflow-hidden text-right">
            <span className="menu-item font-sans text-[10px] text-[#ffffff]/40 tracking-widest uppercase block mb-2">Socials</span>
            <div className="menu-item flex gap-6 text-[#ffffff] font-sans text-xs tracking-widest uppercase">
              <a href="#" className="hover:text-[#ffffff]/60 hover:underline underline-offset-4">Instagram</a>
              <a href="#" className="hover:text-[#ffffff]/60 hover:underline underline-offset-4">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
