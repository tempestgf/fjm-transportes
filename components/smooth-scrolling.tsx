"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Anchors propis: amb els pins, l'opció `anchors` de Lenis es quedava curta
    // quan el recorregut travessava una secció fixada. Un destí numèric és exacte.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a[href^="#"]')
      const hash = link?.getAttribute("href")
      const target = hash && hash.length > 1 ? document.querySelector(hash) : null
      if (!target) return
      e.preventDefault()
      lenis.resize()
      const y = target.getBoundingClientRect().top + window.scrollY
      lenis.scrollTo(y, { duration: 1.4, force: true })
      history.replaceState(null, "", hash)
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
