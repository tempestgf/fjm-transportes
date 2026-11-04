"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { createCurtain, type CurtainGL } from "./curtain-gl"

const CLOSED = 1.16
const RAISED = -0.22
// A partir d'aquí la capa CSS ja puja sola i la tela no hi entra
const LATE_MS = 2200

function addCanvas(host: HTMLElement) {
  const canvas = document.createElement("canvas")
  canvas.className = "curtain-gl"
  canvas.setAttribute("aria-hidden", "true")
  host.appendChild(canvas)
  return canvas
}

/** Obertura del hero: la tela puja de baix a dalt. Sense WebGL, la capa CSS fa la mateixa pujada. */
export function HeroCurtain() {
  const host = useRef<HTMLDivElement>(null)
  const cover = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let dead = false
    let stop = () => {}

    const dim = gsap.fromTo(
      ".hero__dim",
      { opacity: 0 },
      {
        opacity: 0.6,
        ease: "none",
        scrollTrigger: { trigger: ".intro", start: "top bottom", end: "top top", scrub: true },
      },
    )

    if (!reduce && performance.now() < LATE_MS) {
      const canvas = addCanvas(host.current!)
      createCurtain(canvas).then((curtain) => {
        if (!curtain || dead || performance.now() > LATE_MS) {
          curtain?.destroy()
          canvas.remove()
          return
        }
        const state = { hem: CLOSED }
        const draw = (t: number) => curtain.render(state.hem, t)
        draw(0)
        canvas.classList.add("is-on")
        cover.current!.classList.add("is-handed-over")
        gsap.ticker.add(draw)
        const tween = gsap.to(state, {
          hem: RAISED,
          duration: 2.4,
          delay: 0.55,
          ease: "power2.inOut",
          onComplete: () => stop(),
        })
        stop = () => {
          stop = () => {}
          tween.kill()
          gsap.ticker.remove(draw)
          curtain.destroy()
          canvas.remove()
        }
      })
    }

    return () => {
      dead = true
      stop()
      dim.scrollTrigger?.kill()
      dim.kill()
    }
  }, [])

  return (
    <>
      <div ref={cover} className="hero__cover" aria-hidden="true" />
      <div ref={host} className="cloth" aria-hidden="true" />
    </>
  )
}

/** Tancament del peu: la mateixa tela baixa de dalt a baix amb l'scroll. */
export function FinaleCurtain() {
  const host = useRef<HTMLDivElement>(null)
  const flat = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = document.querySelector<HTMLElement>(".finale")!
      root.classList.add("finale--live")
      let hem = RAISED
      let curtain: CurtainGL | null = null
      let canvas: HTMLCanvasElement | null = null
      let alive = true

      const draw = (t: number) => {
        if (curtain && hem > RAISED + 0.01) curtain.render(hem, t)
      }
      const start = () => {
        canvas = addCanvas(host.current!)
        createCurtain(canvas).then((c) => {
          if (!alive) return c?.destroy()
          if (!c) {
            canvas?.remove()
            root.classList.add("finale--flat")
            return
          }
          curtain = c
          canvas!.classList.add("is-on")
          gsap.ticker.add(draw)
        })
      }

      // La tela es prepara abans d'arribar-hi perquè no hi hagi cap salt
      const near = ScrollTrigger.create({ trigger: root, start: "top 300%", once: true, onEnter: start })
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const k = Math.min(1, Math.max(0, (self.progress - 0.06) / 0.84))
          const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
          hem = RAISED + (CLOSED - RAISED) * eased
          root.classList.toggle("is-closed", self.progress > 0.88)
          if (flat.current) flat.current.style.transform = `scaleY(${eased})`
        },
      })

      return () => {
        alive = false
        near.kill()
        st.kill()
        gsap.ticker.remove(draw)
        curtain?.destroy()
        canvas?.remove()
        root.classList.remove("finale--live", "finale--flat", "is-closed")
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      <div ref={flat} className="finale__flat" aria-hidden="true" />
      <div ref={host} className="cloth" aria-hidden="true" />
    </>
  )
}
