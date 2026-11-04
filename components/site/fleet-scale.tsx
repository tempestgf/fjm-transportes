"use client"

import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Articulated,
  CraneTruck,
  ExtendablePlatform,
  FleetDefs,
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
  pan?: [number, number, number] // al mòbil: recorregut d'un extrem a l'altre i part del vehicle que es veu alhora
  phone?: [number, number] // al mòbil: finestra pròpia en lloc del recorregut
}

const shots: Shot[] = [
  { num: "1.000 kg", name: "Furgonetes", text: "Càrregues de fins a 1.000 kg.", x0: -1.6, x1: 7, top: 3.2, pan: [-0.5, 6, 0.8] },
  { num: "3.500 kg", name: "Camions lleugers", text: "Càrregues de 3.500 kg.", x0: 7.5, x1: 18.5, top: 3.9, pan: [9, 17, 0.72] },
  { num: "16 Tn", name: "Camions rígids", text: "Càrregues de fins a 16 Tn.", x0: 19, x1: 33, top: 4.6, pan: [20.4, 31.3, 0.66] },
  { num: "24 Tn", name: "Tràilers", text: "Càrregues de fins a 24 Tn.", x0: 33, x1: 54, top: 5, pan: [34.4, 52.3, 0.52] },
  {
    num: "38 m",
    name: "Camions grua",
    text: "Plomes de 14 a 38 metres.",
    x0: 52,
    x1: 82,
    top: 42,
    tall: true,
    phone: [49, 76],
  },
  {
    num: "90 Tn",
    name: "Gòndoles",
    text: "Gòndoles i plataformes de fins a 90 Tn. Amb rampes especials per a maquinària d'obra pública, a 0,60 m del terra.",
    x0: 85,
    x1: 112,
    top: 6.5,
    pan: [86.8, 109.6, 0.5],
  },
  {
    num: "30 m",
    name: "Plataformes extensibles",
    text: "Plataformes de fins a 30 metres, i gòndoles extensibles per a dipòsits de gran volum.",
    x0: 113,
    x1: 154,
    top: 8.5,
    pan: [152.2, 115, 0.55],
  },
]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a))
const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2)
const sine = (v: number) => 0.5 - 0.5 * Math.cos(Math.PI * v)

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
  const farRidge = useMemo(() => montserratPath(2600, 300, 31), [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = root.current!
    const stage = el.querySelector<HTMLElement>(".scale__stage")!
    const world = el.querySelector<SVGGElement>("[data-world]")!
    const mountain = el.querySelector<SVGGElement>("[data-ridge]")!
    const farMountain = el.querySelector<SVGGElement>("[data-ridge-far]")!
    const vehicles = Array.from(el.querySelectorAll<SVGGElement>("[data-span]")).map((node) => {
      const [a, b] = node.dataset.span!.split(" ").map(Number)
      return { node, a, b, shown: true }
    })
    const canvas = el.querySelector<HTMLCanvasElement>(".scale__ruler")!
    const ctx = canvas.getContext("2d")!
    const items = Array.from(el.querySelectorAll<HTMLElement>(".scale__item"))
    const outro = el.querySelector<HTMLElement>(".scale__outro")!

    const q = <T extends Element>(s: string) => el.querySelector<T>(s)!
    const boom = q<SVGGElement>("[data-boom]")
    const boomSections = Array.from(el.querySelectorAll<SVGGElement>("[data-boom-section]"))
    const boomDim = q<SVGGElement>("[data-boom-dim]")
    const rope = q<SVGLineElement>("[data-rope]")
    const hook = q<SVGGElement>("[data-hook]")
    const ramRod = q<SVGLineElement>("[data-ram-rod]")
    const ramCyl = q<SVGLineElement>("[data-ram-cyl]")
    const outriggers = Array.from(el.querySelectorAll<SVGGElement>("[data-outrigger]"))
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
    let horizon = 0
    let fontFamily = "sans-serif"

    const measure = () => {
      const r = stage.getBoundingClientRect()
      W = r.width
      H = r.height
      ground = Math.round(H * 0.85)
      horizon = Math.round(H * 0.8)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = (H - ground) * dpr
      canvas.style.height = `${H - ground}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fontFamily = getComputedStyle(document.body).fontFamily
      textBottom = W < 700 ? H * 0.42 : H * 0.36
    }

    type Frame = Omit<Shot, "num" | "name" | "text">
    const finalShot: Frame = { x0: -4, x1: 153, top: 44, tall: true }

    /** Cada pla té una entrada i una sortida: a l'ordinador coincideixen, al mòbil la càmera recorre el vehicle. */
    const camera = (s: Frame) => {
      const phone = W < 700
      const avail = s.tall ? ground - H * 0.09 : ground - textBottom
      const [x0, x1] = phone && s.phone ? s.phone : [s.x0, s.x1]
      const fit = Math.min((W * 0.92) / (x1 - x0), avail / s.top)
      const centre = (x0 + x1) / 2
      if (!phone || !s.pan) return { xa: centre, xb: centre, ls: Math.log(fit) }
      const [a, b, share] = s.pan
      const length = Math.abs(b - a)
      const scale = Math.min(avail / s.top, W / (length * share))
      const half = W / 2 / scale
      if (length <= half * 2) return { xa: (a + b) / 2, xb: (a + b) / 2, ls: Math.log(scale) }
      const dir = Math.sign(b - a)
      return { xa: a + dir * half, xb: b - dir * half, ls: Math.log(scale) }
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
      const all: Frame[] = [...shots, finalShot]

      // Càmera: quieta dins de cada pla i amb easing entre plans. Interpola el logaritme
      // de l'escala perquè l'allunyament es noti constant.
      const first = camera(all[0])
      let cam = { x: first.xa, ls: first.ls }
      let current = 0
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i]
        if (t >= s.arrive && t <= s.leave) {
          const c = camera(all[i])
          cam = { x: c.xa + (c.xb - c.xa) * sine((t - s.arrive) / (s.leave - s.arrive)), ls: c.ls }
          current = i
          break
        }
        if (i < slots.length - 1 && t > s.leave && t < slots[i + 1].arrive) {
          const k = ease((t - s.leave) / MOVE)
          const a = camera(all[i])
          const b = camera(all[i + 1])
          cam = { x: a.xb + (b.xa - a.xb) * k, ls: a.ls + (b.ls - a.ls) * k }
          current = k < 0.5 ? i : i + 1
          break
        }
      }
      const scale = Math.exp(cam.ls)
      world.setAttribute(
        "transform",
        `translate(${W / 2 - cam.x * scale} ${ground}) scale(${scale})`,
      )
      const ridgeH = H * 0.22
      mountain.setAttribute("transform", `translate(${-120 - cam.x * 2.4} ${horizon - ridgeH}) scale(1 ${ridgeH / 300})`)
      farMountain.setAttribute("transform", `translate(${-60 - cam.x * 1.1} ${horizon - ridgeH * 1.25}) scale(1 ${(ridgeH * 1.25) / 300})`)

      // Només es pinta el que és a la pantalla: al mòbil l'escena sencera pesa massa
      const left = cam.x - W / 2 / scale - 3
      const right = cam.x + W / 2 / scale + 3
      for (const v of vehicles) {
        const show = v.b > left && v.a < right
        if (show !== v.shown) {
          v.shown = show
          v.node.style.display = show ? "" : "none"
        }
      }
      drawRuler(cam.x, scale)
      setActive(current)

      // Ploma: primer s'aixeca, després s'estén
      const craneAt = slots[4]
      const lift = ease(range(t, craneAt.arrive - 0.3, craneAt.arrive + 1))
      const tele = ease(range(t, craneAt.arrive + 0.5, craneAt.leave - 0.1))
      const angle = 177 - 92 * lift
      boom.setAttribute("transform", `rotate(${-angle} ${PX} ${PY})`)
      boomSections.forEach((sec, i) => sec.setAttribute("transform", `translate(${i * 7.5 * tele} 0)`))
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
      hook.setAttribute("transform", `translate(${tipX} ${tipY + ropeLen})`)

      // Pistó: va de la torreta a la ploma, i els estabilitzadors toquen a terra abans d'aixecar
      const ramX = PX + 3 * Math.cos(rad)
      const ramY = PY - 3 * Math.sin(rad)
      const baseX = 5.3
      const baseY = -1.62
      const ramLen = Math.hypot(ramX - baseX, ramY - baseY)
      const cylLen = Math.min(ramLen, 1.75)
      ramRod.setAttribute("x1", String(baseX))
      ramRod.setAttribute("y1", String(baseY))
      ramRod.setAttribute("x2", String(ramX))
      ramRod.setAttribute("y2", String(ramY))
      ramCyl.setAttribute("x1", String(baseX))
      ramCyl.setAttribute("y1", String(baseY))
      ramCyl.setAttribute("x2", String(baseX + ((ramX - baseX) / ramLen) * cylLen))
      ramCyl.setAttribute("y2", String(baseY + ((ramY - baseY) / ramLen) * cylLen))
      const legs = ease(range(t, craneAt.arrive - 0.8, craneAt.arrive - 0.2))
      outriggers.forEach((o) => o.setAttribute("transform", `translate(0 ${-(1 - legs) * 0.62})`))

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
      // L'escenari és sticky: al mòbil no tremola com un pin amb transform
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
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
        <div className="scale__road">
          <canvas className="scale__ruler" aria-hidden="true" />
        </div>
        <svg className="scale__art" aria-hidden="true" width="100%" height="100%">
          <FleetDefs />
          <g data-ridge-far>
            <path d={farRidge} fill="#A9DCF6" />
          </g>
          <g data-ridge>
            <path d={ridge} fill="#74BFEA" />
          </g>
          <g data-world>
            <g data-span={`${POS.van - 1} ${POS.van + 6}`}>
              <Van x={POS.van} />
            </g>
            <g data-span={`${POS.light - 1} ${POS.light + 8}`}>
              <LightTruck x={POS.light} />
            </g>
            <g data-span={`${POS.rigid - 1} ${POS.rigid + 11}`}>
              <RigidTruck x={POS.rigid} />
            </g>
            <g data-span={`${POS.truck - 1} ${POS.truck + 18}`}>
              <Articulated x={POS.truck} />
            </g>
            <g data-span={`${POS.crane - 45} ${POS.crane + 50}`}>
              <CraneTruck x={POS.crane} />
            </g>
            <g data-span={`${POS.gondola - 2} ${POS.gondola + 22}`}>
              <Gondola x={POS.gondola} />
            </g>
            <g data-span={`${POS.platform - 32} ${POS.platform + 7}`}>
              <ExtendablePlatform x={POS.platform} />
            </g>
          </g>
        </svg>
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
