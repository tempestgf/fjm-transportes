"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function Depot() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = ref.current!

      // Els metres quadrats s'eixamplen amb l'scroll: la xifra ocupa el que diu
      gsap.fromTo(
        root.querySelector(".depot__area"),
        { "--w": 62 },
        {
          "--w": 125,
          ease: "none",
          scrollTrigger: { trigger: ".depot__area", start: "top 85%", end: "top 30%", scrub: true },
        },
      )
      gsap.fromTo(
        root.querySelector(".depot__strip img"),
        { yPercent: -4.5 },
        {
          yPercent: 4.5,
          ease: "none",
          scrollTrigger: { trigger: ".depot__strip", start: "top bottom", end: "bottom top", scrub: true },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} className="depot" id="infraestructura" aria-labelledby="depot-title">
      <div className="depot__head">
        <h2 id="depot-title" className="depot__area">
          1.100 m²
        </h2>
        <div className="depot__intro">
          <p>
            La nostra nau és al polígon de La Magarola, a Esparreguera: una zona clau del trànsit de
            Barcelona i la seva província.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Carrer+Tres+Rieres+20+Esparreguera"
            target="_blank"
            rel="noreferrer"
          >
            Carrer Tres Rieres, nau 20, 08292 Esparreguera
          </a>
        </div>
      </div>
      <dl className="depot__facts">
        <div>
          <dt>Espai flexible</dt>
          <dd>Superfície que s'adapta a cada producte, amb maniobra còmoda i segura.</dd>
        </div>
        <div>
          <dt>Accés ràpid</dt>
          <dd>Portal industrial gran i ràpid, per reduir l'espera de càrrega i descàrrega.</dd>
        </div>
        <div>
          <dt>Vigilància 24/7</dt>
          <dd>Càmeres de seguretat i alarmes de reacció immediata.</dd>
        </div>
      </dl>
      <div className="depot__strip">
        <img
          src="/media/web/truck-28.webp"
          alt="Tràiler de FJM Transportes amb la lona blava, davant de la nau d'Esparreguera"
          width={2000}
          height={1334}
          loading="lazy"
        />
      </div>
    </section>
  )
}
