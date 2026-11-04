"use client"

import { useMemo } from "react"

/**
 * El paisatge de darrere de la flota: el massís de Montserrat, els turons i el polígon.
 * Tot es pinta un sol cop. fleet-scale.tsx només mou els grups i canvia els colors que
 * porten data-tone (dia, capvespre, nit) a mesura que avança l'scroll.
 */

const ridgeWidth = 3600
/** Punt més alt del massís dins del perfil: fleet-scale.tsx hi encara la càmera. */
export const RIDGE_PEAK = ridgeWidth * 0.47

function random(start: number) {
  let seed = start
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const n = (v: number) => v.toFixed(1)

/** Silueta del massís vist des d'Esparreguera: alçada relativa al llarg del perfil. */
const profile: [number, number][] = [
  [0, 0.16], [0.06, 0.28], [0.12, 0.5], [0.2, 0.6], [0.27, 0.78], [0.33, 0.68], [0.4, 0.92],
  [0.47, 1], [0.54, 0.84], [0.6, 0.68], [0.68, 0.76], [0.76, 0.48], [0.84, 0.36], [0.92, 0.2], [1, 0.1],
]

function envelope(u: number) {
  const i = Math.max(0, profile.findIndex(([x]) => x > u) - 1)
  const [x0, y0] = profile[i]
  const [x1, y1] = profile[Math.min(i + 1, profile.length - 1)]
  const k = x1 === x0 ? 0 : (u - x0) / (x1 - x0)
  return y0 + (y1 - y0) * (0.5 - 0.5 * Math.cos(Math.PI * k))
}

/**
 * Montserrat són torres de conglomerat separades per canals. Primer es tria cada torre,
 * després les agulles que la coronen, i cada canal baixa com una esquerda.
 */
function massif(height: number, start: number, flip = false) {
  const rnd = random(start)
  let x = -60
  let outline = `M${x} ${height}`
  let cracks = ""
  while (x < ridgeWidth + 60) {
    const u = Math.min(1, Math.max(0, x / ridgeWidth))
    const env = envelope(flip ? 1 - u : u)
    const tower = 58 + rnd() * (130 - env * 40)
    const top = height * (1 - env * (0.8 + rnd() * 0.17))
    const gully = Math.min(height, top + 26 + rnd() * 62 * (0.5 + env))
    const needles = 1 + Math.floor(rnd() * (2.2 + env * 2))
    outline += `L${n(x)} ${n(gully)}`
    let cursor = x
    for (let i = 0; i < needles; i++) {
      const w = (tower / needles) * (0.75 + rnd() * 0.5)
      const edge = Math.abs(i - (needles - 1) / 2) / Math.max(1, needles / 2)
      const peak = top + edge * edge * 22 + rnd() * 14
      const foot = i === needles - 1 ? gully : Math.min(gully, peak + 10 + rnd() * 24)
      const lean = 0.1 + rnd() * 0.14
      outline += `C${n(cursor + w * lean)} ${n(peak - 3)} ${n(cursor + w * (lean + 0.66))} ${n(peak - 3)} ${n(cursor + w)} ${n(foot)}`
      cursor += w
      if (i < needles - 1) {
        cracks += `M${n(cursor)} ${n(foot)}q${n(rnd() * 8 - 4)} ${n(30 + rnd() * 30)} ${n(rnd() * 10 - 5)} ${n(60 + rnd() * 70)}`
      }
    }
    cracks += `M${n(cursor)} ${n(gully)}q${n(rnd() * 12 - 6)} ${n(50 + rnd() * 40)} ${n(rnd() * 16 - 8)} ${n(height - gully)}`
    x = cursor
  }
  return { outline: `${outline}L${n(x)} ${height}Z`, cracks }
}

/** Turons suaus de bosc: fan de transició entre la roca i el polígon. */
function hills(height: number) {
  let d = `M-60 ${height}`
  for (let x = -60; x <= ridgeWidth + 60; x += 24) {
    const y = 0.52 + 0.2 * Math.sin(x / 310 + 1.1) + 0.12 * Math.sin(x / 127) + 0.05 * Math.sin(x / 43 + 2)
    d += `L${x} ${n(height * y)}`
  }
  return `${d}L${ridgeWidth + 60} ${height}Z`
}

/** Naus, arbres i fanals del polígon de La Magarola. La base és y = 0. */
function yard() {
  const rnd = random(29)
  let solid = ""
  let lines = ""
  let windows = ""
  const lamps: { x: number; y: number }[] = []
  let x = -1100
  let count = 0
  while (x < 3200) {
    count += 1
    const kind = rnd()
    if (kind < 0.62) {
      const w = 130 + rnd() * 210
      const h = 34 + rnd() * 40
      if (count % 3 === 0) {
        // Coberta de dents de serra
        const teeth = Math.max(3, Math.round(w / 46))
        const step = w / teeth
        solid += `M${n(x)} 0V${n(-h)}`
        for (let i = 0; i < teeth; i++) solid += `l${n(step)} -11v11`
        solid += `V0Z`
      } else {
        solid += `M${n(x)} 0V${n(-h)}L${n(x + w / 2)} ${n(-h - 9)}L${n(x + w)} ${n(-h)}V0Z`
      }
      const rows = h > 56 ? 2 : 1
      for (let r = 0; r < rows; r++) {
        for (let wx = x + 12; wx < x + w - 14; wx += 22 + rnd() * 16) {
          if (rnd() < 0.45) windows += `M${n(wx)} ${n(-h + 9 + r * 18)}h9v5h-9Z`
        }
      }
      x += w + 14 + rnd() * 70
    } else if (kind < 0.84) {
      // Xiprers i pollancres
      const trees = 2 + Math.floor(rnd() * 4)
      for (let i = 0; i < trees; i++) {
        const h = 26 + rnd() * 34
        const w = 6 + rnd() * 6
        solid += `M${n(x)} 0Q${n(x - w)} ${n(-h * 0.5)} ${n(x + w * 0.3)} ${n(-h)}Q${n(x + w * 1.5)} ${n(-h * 0.5)} ${n(x + w * 0.7)} 0Z`
        x += w + 3 + rnd() * 9
      }
      x += 16 + rnd() * 50
    } else {
      // Sitja
      const w = 20 + rnd() * 14
      const h = 66 + rnd() * 34
      solid += `M${n(x)} 0V${n(-h)}Q${n(x + w / 2)} ${n(-h - 10)} ${n(x + w)} ${n(-h)}V0Z`
      x += w + 22 + rnd() * 50
    }
    if (count % 2 === 0) {
      const lx = x - 8
      lines += `M${n(lx)} 0V-74q0 -6 7 -6h11`
      lamps.push({ x: lx + 18, y: -79 })
    }
  }
  // Torres d'alta tensió, ben separades
  for (const px of [-420, 680, 1760, 2740]) {
    lines += `M${px - 16} 0L${px - 3} -126H${px + 3}L${px + 16} 0M${px - 13} -18L${px + 9} -44L${px - 8} -70L${px + 6} -96M${px + 13} -18L${px - 9} -44L${px + 8} -70L${px - 6} -96`
    lines += `M${px - 24} -104H${px + 24}M${px - 18} -118H${px + 18}`
  }
  return { solid, lines, windows, lamps }
}

const stars = (() => {
  const rnd = random(53)
  return Array.from({ length: 90 }, () => ({
    x: +(rnd() * 100).toFixed(2),
    y: +(Math.pow(rnd(), 1.5) * 62).toFixed(2),
    r: +(0.5 + rnd() * 0.9).toFixed(2),
    o: +(0.35 + rnd() * 0.65).toFixed(2),
  }))
})()

const clouds = (() => {
  const rnd = random(71)
  const out: { x: number; y: number; rx: number; ry: number; o: number }[] = []
  for (let i = 0; i < 12; i++) {
    const x = -300 + i * 330 + rnd() * 160
    const y = 7 + rnd() * 42
    const rx = 150 + rnd() * 260
    for (let k = 0; k < 3; k++) {
      out.push({
        x: Math.round(x + (rnd() - 0.5) * rx),
        y: +(y + (rnd() - 0.5) * 2.4).toFixed(1),
        rx: Math.round(rx * (0.5 + rnd() * 0.6)),
        ry: Math.round(5 + rnd() * 14),
        o: +(0.45 + rnd() * 0.5).toFixed(2),
      })
    }
  }
  return out
})()

export function Backdrop() {
  const land = useMemo(
    () => ({ far: massif(300, 31, true), near: massif(300, 7), hills: hills(300), yard: yard() }),
    [],
  )
  return (
    <svg className="scale__back" aria-hidden="true" width="100%" height="100%">
      <defs>
        <linearGradient id="ld-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B4DEF6" data-tone="#B4DEF6 #5C8DC4 #0B2D59" />
          <stop offset="0.75" stopColor="#CFECFB" data-tone="#CFECFB #C9BFC6 #0C3567" />
        </linearGradient>
        <linearGradient id="ld-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FB5E2" data-tone="#6FB5E2 #2B5A96 #07203F" />
          <stop offset="0.55" stopColor="#8CC9EC" data-tone="#8CC9EC #55779F #0A2B55" />
          <stop offset="1" stopColor="#BDE4F8" data-tone="#BDE4F8 #A99FAE #0C3567" />
        </linearGradient>
        <linearGradient id="ld-hills" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4E9CCF" data-tone="#4E9CCF #1F4A82 #051B36" />
          <stop offset="1" stopColor="#7DBEE6" data-tone="#7DBEE6 #4F6E98 #082648" />
        </linearGradient>
        <radialGradient id="ld-cloud">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ld-lamp">
          <stop offset="0" stopColor="#FFE9BE" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#FFD58A" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFD58A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g data-stars opacity={0}>
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#fff" opacity={s.o} />
        ))}
      </g>
      <g data-clouds>
        {clouds.map((c, i) => (
          <ellipse key={i} cx={c.x} cy={`${c.y}%`} rx={c.rx} ry={c.ry} fill="url(#ld-cloud)" opacity={c.o} />
        ))}
      </g>
      <g data-ridge-far>
        <path d={land.far.outline} fill="url(#ld-far)" />
      </g>
      <g data-ridge>
        <path d={land.near.outline} fill="url(#ld-near)" />
        <path
          d={land.near.cracks}
          fill="none"
          stroke="#2F7FBE"
          strokeWidth={2}
          strokeOpacity={0.22}
          vectorEffect="non-scaling-stroke"
          data-tone="#2F7FBE #123A6E #020F20"
          data-tone-attr="stroke"
        />
      </g>
      <g data-hills>
        <path d={land.hills} fill="url(#ld-hills)" />
      </g>
      <g data-yard>
        <path d={land.yard.solid} fill="#3E8BC2" data-tone="#3E8BC2 #173F75 #041830" />
        <path
          d={land.yard.lines}
          fill="none"
          stroke="#3E8BC2"
          strokeWidth={1.5}
          data-tone="#3E8BC2 #173F75 #041830"
          data-tone-attr="stroke"
        />
        <g data-yard-lights opacity={0}>
          <path d={land.yard.windows} fill="#FFD58A" opacity={0.85} />
          {land.yard.lamps.map((l, i) => (
            <circle key={i} cx={+l.x.toFixed(1)} cy={l.y} r={30} fill="url(#ld-lamp)" />
          ))}
        </g>
      </g>
    </svg>
  )
}

type Rig = { at: number; front: number; lamp: number; tail: number; tailY?: number; beacon?: number }

/** On té els llums cada vehicle, en metres des del seu origen. */
function rigs(pos: Record<string, number>): Rig[] {
  return [
    { at: pos.van, front: 5.47, lamp: -1.24, tail: 0, tailY: -1.62 },
    { at: pos.light, front: 6.98, lamp: -1.16, tail: 0 },
    { at: pos.rigid, front: 9.68, lamp: -1.38, tail: 0 },
    { at: pos.truck, front: 16.73, lamp: -1.38, tail: 0 },
    { at: pos.crane, front: 10.48, lamp: -1.38, tail: 0.1 },
    { at: pos.gondola, front: 20.8, lamp: -1.38, tail: -0.3, beacon: 19.07 },
    { at: pos.platform, front: 5.38, lamp: -1.38, tail: -30, beacon: 3.65 },
  ]
}

/** Llums de la flota: van en una capa a part perquè el filtre de nit no els apagui. */
export function FleetLights({ pos }: { pos: Record<string, number> }) {
  const reach = 12
  return (
    <svg className="scale__glow" aria-hidden="true" width="100%" height="100%">
      <defs>
        <linearGradient id="gl-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.62" />
          <stop offset="1" stopColor="#FFF4D6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="gl-white">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.22" stopColor="#FFF1CC" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFF1CC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gl-red">
          <stop offset="0" stopColor="#FF8C8C" />
          <stop offset="0.3" stopColor="#D8232A" stopOpacity="0.7" />
          <stop offset="1" stopColor="#D8232A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gl-amber">
          <stop offset="0" stopColor="#FFE9A8" />
          <stop offset="0.3" stopColor="#F0A91E" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F0A91E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gl-pool">
          <stop offset="0" stopColor="#FFF1CC" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFF1CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g data-glow-world>
        {rigs(pos).map((r) => {
          const x = r.at + r.front
          const tail = r.at + r.tail
          return (
            <g key={r.at} data-span={`${tail - 2} ${x + reach}`}>
              <ellipse cx={x + reach * 0.42} cy={0.16} rx={reach * 0.56} ry={0.3} fill="url(#gl-pool)" />
              <path d={`M${x} ${r.lamp - 0.08}L${x + reach} ${r.lamp - 0.7}V0.05L${x} ${r.lamp + 0.1}Z`} fill="url(#gl-beam)" />
              <circle cx={x - 0.1} cy={r.lamp} r={0.95} fill="url(#gl-white)" />
              <circle
                cx={tail}
                cy={r.tailY ?? -1.15}
                r={0.6}
                fill="url(#gl-red)"
                {...(r.tail === -30 ? { "data-tail": "" } : {})}
              />
              {r.beacon !== undefined && <circle cx={r.at + r.beacon} cy={-4.05} r={1.2} fill="url(#gl-amber)" />}
            </g>
          )
        })}
        <circle data-tip r={1.5} fill="url(#gl-red)" />
      </g>
    </svg>
  )
}
