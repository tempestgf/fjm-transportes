"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Articulated, CraneTruck, Forklift, Gondola, Van } from "./fleet-art"

export const services = [
  {
    title: "Repartiment",
    text: "Transports de repartiment per a càrregues petites i mitjanes.",
    items: ["Paqueteria", "Agrupatge"],
  },
  {
    title: "Tràilers nacionals",
    text: "Tràilers per a càrrega completa arreu de l'Estat.",
    items: [],
  },
  {
    title: "Tràilers internacionals",
    text: "El mateix servei de tràiler, fora de les nostres fronteres.",
    items: [],
  },
  {
    title: "Grues",
    text: "Camions grua amb plomes de 14 a 38 metres, per a elevació i trasllats industrials.",
    items: ["Trasllats industrials"],
  },
  {
    title: "Especials",
    text: "El que no cap en un camió normal. Gòndoles i plataformes de fins a 90 Tn i 30 metres.",
    items: ["Embarcacions", "Grans estructures", "Maquinària pesada", "Contenidors"],
  },
  {
    title: "Emmagatzematge",
    text: "1.100 m² de nau a Esparreguera per guardar i preparar la mercaderia.",
    items: ["Preparació de comandes", "Manipulacions", "Gestió de devolucions"],
  },
]

/** Cada servei amb el seu vehicle: `from` i `to` són els metres que ocupa, `tall` l'alçada. */
const rigs: { from: number; to: number; tall: number; art: ReactNode }[] = [
  { from: -0.3, to: 5.8, tall: 2.6, art: <Van x={0} /> },
  { from: -0.3, to: 17.1, tall: 4.1, art: <Articulated x={0} /> },
  { from: -0.3, to: 17.1, tall: 4.1, art: <Articulated x={0} /> },
  { from: -1.3, to: 10.8, tall: 3.7, art: <CraneTruck x={0} parked /> },
  { from: -0.7, to: 21.1, tall: 4.1, art: <Gondola x={0} bare /> },
  { from: -0.1, to: 4.3, tall: 3.2, art: <Forklift x={0} /> },
]

/** El vehicle arriba rodant per la línia de sota: la línia fa de carretera. */
function Rig({ index, open }: { index: number; open: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const { from, to, tall, art } = rigs[index]
  const seen = useRef(false)

  useEffect(() => {
    const svg = ref.current!
    if (!open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(svg, { x: 0 })
      return
    }
    const wheels = svg.querySelectorAll("[data-wheel]")
    const road = svg.parentElement!.offsetWidth
    const pxPerMetre = svg.getBoundingClientRect().width / (to - from)
    const ride = { x: -road }
    const place = () => {
      gsap.set(svg, { x: ride.x })
      const turn = (ride.x / (pxPerMetre * 0.5)) * (180 / Math.PI)
      wheels.forEach((w) => w.setAttribute("transform", `rotate(${turn.toFixed(1)})`))
    }
    place()
    const drive = () => gsap.to(ride, { x: 0, duration: 1.7, ease: "power3.out", onUpdate: place })

    // El primer servei ve obert: el vehicle espera que la secció entri a la pantalla
    if (!seen.current && index === 0) {
      seen.current = true
      const wait = ScrollTrigger.create({ trigger: svg.parentElement, start: "top 88%", once: true, onEnter: drive })
      return () => wait.kill()
    }
    const tween = drive()
    return () => {
      tween.kill()
    }
  }, [open, from, to, index])

  return (
    <div className="col-span-full flex justify-end overflow-hidden">
      <svg
        ref={ref}
        className="block h-auto max-w-full shrink-0"
        style={{ width: `max(calc(${to - from} * var(--metre)), 58%)` }}
        viewBox={`${from} ${-tall} ${to - from} ${tall}`}
        aria-hidden="true"
      >
        {art}
      </svg>
    </div>
  )
}

export function Services() {
  const [open, setOpen] = useState<number | null>(0)

  // L'acordió canvia l'alçada de la pàgina: cal recalcular els punts de pin de sota
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const id = setTimeout(() => ScrollTrigger.refresh(), 560)
    return () => clearTimeout(id)
  }, [open])

  const askFor = (title: string) => {
    window.dispatchEvent(new CustomEvent("fjm:service", { detail: title }))
  }

  return (
    <section className="services" id="serveis" aria-labelledby="services-title">
      <div className="services__head">
        <h2 id="services-title">Serveis</h2>
        <p>Transport general de qualsevol tipus de mercaderia, i tot el que no és general.</p>
      </div>
      <ul className="services__list">
        {services.map((s, i) => {
          const isOpen = open === i
          return (
            <li key={s.title} className={`service${isOpen ? " is-open" : ""}`}>
              <h3>
                <button
                  className="service__toggle"
                  aria-expanded={isOpen}
                  aria-controls={`service-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="service__title">{s.title}</span>
                  <span className="service__mark" aria-hidden="true" />
                </button>
              </h3>
              <div className="service__panel" id={`service-${i}`} {...(isOpen ? {} : ({ inert: "" } as object))}>
                <div className="service__inner">
                  <p className="service__text">{s.text}</p>
                  {s.items.length > 0 && (
                    <ul className="service__items">
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )}
                  <a className="service__ask" href="#contacte" onClick={() => askFor(s.title)}>
                    Demanar pressupost de {s.title.toLowerCase()}
                  </a>
                  <Rig index={i} open={isOpen} />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
