"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

export function Services() {
  const [open, setOpen] = useState<number | null>(null)

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
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
