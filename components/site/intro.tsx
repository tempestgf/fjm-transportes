"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const statement =
  "Portem qualsevol tipus de mercaderia. La nostra especialitat són els grans volums, els grans pesos i la maquinària especial per a l'obra pública."

export function Intro() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".intro__word"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro__statement",
            start: "top 78%",
            end: "bottom 52%",
            scrub: true,
          },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} className="intro" id="sobre-nosaltres">
      <p className="intro__statement">
        {statement.split(" ").map((word, i) => (
          <span key={i} className="intro__word">
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="intro__body">
        <p>
          Fa més de 25 anys que fem transports convencionals i serveis urgents, a escala nacional i
          internacional, amb seu a Esparreguera.
        </p>
        <p>
          Amb la flota que tenim i el tipus de feina que fem, el servei és molt personalitzat: ens
          adaptem a les exigències i als terminis de cada client.
        </p>
      </div>
    </section>
  )
}
