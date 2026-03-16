"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Registramos ScrollTrigger por si no lo está globalmente
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const lenis = new Lenis({
      duration: 1.4, // Un poco más lento para más elegancia "premium"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva suave Awwwards
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    })

    // Sincronizar Lenis con ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
