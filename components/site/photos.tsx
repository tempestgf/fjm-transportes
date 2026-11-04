"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function Photos() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = ref.current!
      gsap.fromTo(
        root.querySelector(".photos__lead"),
        { clipPath: "inset(14% 16% 14% 16%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 90%", end: "top 15%", scrub: true },
        },
      )
      root.querySelectorAll<HTMLElement>(".photos__frame img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -4.5 },
          {
            yPercent: 4.5,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} className="photos" aria-label="Vehicles de FJM Transportes">
      <figure className="photos__frame photos__lead">
        <img
          src="/media/web/truck-26.webp"
          alt="Tractora blanca amb semiremolc de lona blava a l'exterior de la nau"
          width={1600}
          height={1068}
          loading="lazy"
        />
      </figure>
      <div className="photos__pair">
        <figure>
          <div className="photos__frame">
            <img
              src="/media/web/truck-14.webp"
              alt="Camió rígid amb lona blava sortint de la nau de FJM Transportes"
              width={1400}
              height={934}
              loading="lazy"
            />
          </div>
          <figcaption>Camió rígid, a la porta de la nau.</figcaption>
        </figure>
        <figure>
          <div className="photos__frame">
            <img
              src="/media/web/truck-31.webp"
              alt="Tractora de FJM Transportes vista de cara al polígon de La Magarola"
              width={1400}
              height={934}
              loading="lazy"
            />
          </div>
          <figcaption>Tractora, al polígon de La Magarola.</figcaption>
        </figure>
      </div>
    </section>
  )
}
