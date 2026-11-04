"use client"

import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Articulated,
  CraneTruck,
  ExtendablePlatform,
  Gondola,
  LightTruck,
  RigidTruck,
  Van,
  montserratPath,
} from "./fleet-art"

/** Posició de cada vehicle a la carretera, en metres. */
const POS = { van: 0, light: 9.5, rigid: 21, truck: 35, crane: 62, gondola: 88, platform: 146 }

type Shot = {
  num: string
  name: string
  text: string
  x0: number // finestra que ha de cabre a la pantalla, en metres
  x1: number
  top: number
  tall?: boolean // pot ocupar també la zona del text
}

const shots: Shot[] = [
  { num: "1.000 kg", name: "Furgonetes", text: "Càrregues de fins a 1.000 kg.", x0: -1.6, x1: 7, top: 3.2 },
  { num: "3.500 kg", name: "Camions lleugers", text: "Càrregues de 3.500 kg.", x0: 7.5, x1: 18.5, top: 3.9 },
  { num: "16 Tn", name: "Camions rígids", text: "Càrregues de fins a 16 Tn.", x0: 19, x1: 33, top: 4.6 },
  { num: "24 Tn", name: "Tràilers", text: "Càrregues de fins a 24 Tn.", x0: 33, x1: 54, top: 5 },
  {
    num: "38 m",
    name: "Camions grua",
    text: "Plomes de 14 a 38 metres.",
    x0: 52,
    x1: 82,
    top: 42,
    tall: true,
  },
  {
    num: "90 Tn",
    name: "Gòndoles",
    text: "Gòndoles i plataformes de fins a 90 Tn. Amb rampes especials per a maquinària d'obra pública, a 0,60 m del terra.",
    x0: 85,
    x1: 112,
    top: 6.5,
  },
  {
    num: "30 m",
    name: "Plataformes extensibles",
    text: "Plataformes de fins a 30 metres, i gòndoles extensibles per a dipòsits de gran volum.",
    x0: 113,
    x1: 154,
    top: 8.5,
  },
]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)

const MOVE = 1 // unitats de temps per moure la càmera
const HOLD = 0.75

/** Calendari: [arriba, marxa] de cada pla; els plans llargs tenen més temps quiet. */
function buildSchedule() {
  const holds = [0.7, HOLD, HOLD, HOLD, 2.3, HOLD + 0.2, 2.1, 1]
  const out: { arrive: number; leave: number }[] = []
  let t = 0
  for (let i = 0; i < holds.length; i++) {
    out.push({ arrive: t, leave: t + holds[i] })
    t += holds[i] + MOVE
  }
  return { slots: out, total: t - MOVE }
}

export function FleetScale() {
  const root = useRef<HTMLElement>(null)
  const ridge = useMemo(() => montserratPath(2600, 300), [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = root.current!
    const stage = el.querySelector<HTMLElement>(".scale__stage")!
    const world = el.querySelector<SVGGElement>("[data-world]")!
    const mountain = el.querySelector<SVGGElement>("[data-ridge]")!
    const canvas = el.querySelector<HTMLCanvasElement>(".scale__ruler")!
    const ctx = canvas.getContext("2d")!
    const items = Array.from(el.querySelectorAll<HTMLElement>(".scale__item"))
    const outro = el.querySelector<HTMLElement>(".scale__outro")!

    const q = <T extends Element>(s: string) => el.querySelector<T>(s)!
    const boom = q<SVGGElement>("[data-boom]")
    const boomSections = Array.from(el.querySelectorAll<SVGRectElement>("[data-boom-section]"))
    const boomDim = q<SVGGElement>("[data-boom-dim]")
    const rope = q<SVGLineElement>("[data-rope]")
    const hook = q<SVGRectElement>("[data-hook]")
    const rear = q<SVGGElement>("[data-platform-rear]")
    const beam = q<SVGGElement>("[data-beam]")
    const platDim = q<SVGGElement>("[data-platform-dim]")
    const platLine = q<SVGLineElement>("[data-platform-dim-line]")
    const platEnd = q<SVGLineElement>("[data-platform-dim-end]")

    const { slots, total } = buildSchedule()
    const PX = 7.1
    const PY = -3

    let W = 0
    let H = 0
    let ground = 0
    let textBottom = 0
    let fontFamily = "sans-serif"

    const measure = () => {
      const r = stage.getBoundingClientRect()
      W = r.width
      H = r.height
      ground = Math.round(H * 0.84)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = (H - ground) * dpr
      canvas.style.height = `${H - ground}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fontFamily = getComputedStyle(document.body).fontFamily
      textBottom = W < 700 ? H * 0.42 : H * 0.36
    }

    const finalShot = { x0: -4, x1: 153, top: 44, tall: true }
    const camera = (s: { x0: number; x1: number; top: number; tall?: boolean }) => {
      const avail = s.tall ? ground - H * 0.09 : ground - textBottom
      const scale = Math.min((W * 0.92) / (s.x1 - s.x0), avail / s.top)
      return { x: (s.x0 + s.x1) / 2, ls: Math.log(scale) }
    }

    const drawRuler = (camX: number, scale: number) => {
      const h = H - ground
      ctx.clearRect(0, 0, W, h)
      const major = scale > 60 ? 1 : scale > 22 ? 5 : scale > 7 ? 10 : 50
      const minor = major === 1 ? 0.1 : major / 5
      const left = camX - W / 2 / scale
      const right = camX + W / 2 / scale
      ctx.strokeStyle = "rgba(255,255,255,.75)"
      ctx.fillStyle = "#fff"
      ctx.lineWidth = 1
      ctx.font = `600 13px ${fontFamily}`
      ctx.textBaseline = "top"
      ctx.beginPath()
      for (let m = Math.ceil(left / minor) * minor; m <= right; m += minor) {
        const px = Math.round(W / 2 + (m - camX) * scale) + 0.5
        const isMajor = Math.abs(m / major - Math.round(m / major)) < 1e-6
        ctx.moveTo(px, 0)
        ctx.lineTo(px, isMajor ? 16 : 7)
        if (isMajor) ctx.fillText(`${Math.round(m)} m`, px + 5, 18)
      }
      ctx.stroke()
    }

    let active = -1
    const setActive = (i: number) => {
      if (i === active) return
      active = i
      items.forEach((it, n) => {
        it.classList.toggle("is-active", n === i)
        it.classList.toggle("is-past", n < i)
      })
      outro.classList.toggle("is-active", i === shots.length)
    }

    const render = (p: number) => {
      const t = p * total
      const all = [...shots, finalShot] as (typeof finalShot | Shot)[]

      // Càmera: quieta dins de cada pla i amb easing entre plans. Interpola el logaritme
      // de l'escala perquè l'allunyament es noti constant.
      let cam = camera(all[0])
      let current = 0
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i]
        if (t >= s.arrive && t <= s.leave) {
          cam = camera(all[i])
          current = i
          break
        }
        if (i < slots.length - 1 && t > s.leave && t < slots[i + 1].arrive) {
          const k = ease((t - s.leave) / MOVE)
          const a = camera(all[i])
          const b = camera(all[i + 1])
          cam = { x: a.x + (b.x - a.x) * k, ls: a.ls + (b.ls - a.ls) * k }
          current = k < 0.5 ? i : i + 1
          break
        }
      }
      const scale = Math.exp(cam.ls)
      world.setAttribute(
        "transform",
        `translate(${W / 2 - cam.x * scale} ${ground}) scale(${scale})`,
      )
      mountain.setAttribute("transform", `translate(${-120 - cam.x * 2.4} ${ground - H * 0.3}) scale(1 ${(H * 0.3) / 300})`)
      drawRuler(cam.x, scale)
      setActive(current)

      // Ploma: primer s'aixeca, després s'estén
      const craneAt = slots[4]
      const lift = ease(range(t, craneAt.arrive - 0.3, craneAt.arrive + 1))
      const tele = ease(range(t, craneAt.arrive + 0.5, craneAt.leave - 0.1))
      const angle = 177 - 92 * lift
      boom.setAttribute("transform", `rotate(${-angle} ${PX} ${PY})`)
      boomSections.forEach((sec, i) => sec.setAttribute("x", String(PX + i * 7.5 * tele)))
      boomDim.setAttribute("opacity", String(range(tele, 0.9, 1)))
      const length = 8 + 30 * tele
      const rad = (angle * Math.PI) / 180
      const tipX = PX + length * Math.cos(rad)
      const tipY = PY - length * Math.sin(rad)
      const ropeLen = 1 + 4 * tele
      rope.setAttribute("x1", String(tipX))
      rope.setAttribute("y1", String(tipY))
      rope.setAttribute("x2", String(tipX))
      rope.setAttribute("y2", String(tipY + ropeLen))
      hook.setAttribute("x", String(tipX - 0.3))
      hook.setAttribute("y", String(tipY + ropeLen))

      // Plataforma: s'estén i la biga baixa a sobre
      const platAt = slots[6]
      const ext = ease(range(t, platAt.arrive + 0.1, platAt.arrive + 1.1))
      const lower = ease(range(t, platAt.arrive + 1.1, platAt.leave - 0.05))
      const shift = (1 - ext) * 16
      rear.setAttribute("transform", `translate(${shift} 0)`)
      platLine.setAttribute("x1", String(-30 + shift))
      platEnd.setAttribute("x1", String(-30 + shift))
      platEnd.setAttribute("x2", String(-30 + shift))
      platDim.setAttribute("opacity", String(range(ext, 0.2, 0.6)))
      beam.setAttribute("transform", `translate(0 ${-(1 - lower) * 40})`)
      beam.setAttribute("opacity", lower > 0 ? "1" : "0")
    }

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.classList.add("scale--live")
      let progress = 0
      const refresh = () => {
        measure()
        render(progress)
      }
      ScrollTrigger.addEventListener("refreshInit", refresh)
      refresh()
      const st = ScrollTrigger.create({
        trigger: stage,
        pin: true,
        start: "top top",
        end: () => `+=${window.innerHeight * 8.5}`,
        anticipatePin: 1,
        onUpdate: (self) => {
          progress = self.progress
          render(progress)
        },
      })
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", refresh)
        st.kill()
        el.classList.remove("scale--live")
      }
    })
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const refresh = () => {
        measure()
        render(1)
      }
      refresh()
      window.addEventListener("resize", refresh)
      return () => window.removeEventListener("resize", refresh)
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="scale" id="vehicles" aria-labelledby="scale-title">
      <div className="scale__stage">
        <svg className="scale__art" aria-hidden="true" width="100%" height="100%">
          <g data-ridge>
            <path d={ridge} fill="#74BFEA" />
          </g>
          <g data-world>
            <Van x={POS.van} />
            <LightTruck x={POS.light} />
            <RigidTruck x={POS.rigid} />
            <Articulated x={POS.truck} />
            <CraneTruck x={POS.crane} />
            <Gondola x={POS.gondola} />
            <ExtendablePlatform x={POS.platform} />
          </g>
        </svg>
        <div className="scale__road">
          <canvas className="scale__ruler" aria-hidden="true" />
        </div>
        <div className="scale__copy">
          <h2 id="scale-title" className="scale__title">
            La flota, a escala
          </h2>
          <ol className="scale__list">
            {shots.map((s) => (
              <li key={s.num} className="scale__item">
                <p className="scale__num">{s.num}</p>
                <h3 className="scale__name">{s.name}</h3>
                <p className="scale__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="scale__outro">
            <p className="scale__outro-text">Digui'ns què cal moure i triem el vehicle.</p>
            <a className="btn btn--navy" href="#contacte">
              Demanar pressupost
            </a>
          </div>
        </div>
        <p className="scale__note">Siluetes orientatives. Les xifres són capacitats de la flota.</p>
      </div>
    </section>
  )
}
