/**
 * Alçats laterals de la flota. Tot està dibuixat en metres reals: 1 unitat SVG = 1 m,
 * y = 0 és el terra i els vehicles miren cap a la dreta.
 * Les siluetes són orientatives. Les xifres de 38 m, 30 m i 0,60 m són dades de FJM.
 */

const C = {
  cab: "#F5F8FA",
  cabShade: "#D5E0E8",
  lona: "#004C96",
  lonaLight: "#1A6BBE",
  navy: "#06264A",
  tyre: "#0E1E2E",
  rim: "#B9C7D3",
  glass: "#2B5880",
  sky: "#8FD0F3",
  red: "#D8232A",
  steel: "#5B6F82",
  amber: "#F0B429",
}

function Wheel({ x, r = 0.52 }: { x: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={-r} r={r} fill={C.tyre} />
      <circle cx={x} cy={-r} r={r * 0.56} fill={C.rim} />
      <circle cx={x} cy={-r} r={r * 0.2} fill={C.navy} />
    </g>
  )
}

function Globe({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.sky} stroke={C.lona} strokeWidth={r * 0.14} />
      <path
        d={`M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}`}
        stroke={C.lona}
        strokeWidth={r * 0.14}
      />
    </g>
  )
}

/** Cabina avançada. `x` és la paret del darrere. */
function Cab({ x, h = 3.2, w = 2.4, spoiler = false }: { x: number; h?: number; w?: number; spoiler?: boolean }) {
  const t = -h
  const belt = -h * 0.6
  return (
    <g>
      {spoiler && (
        <path
          d={`M${x + 0.1} ${t}L${x + 0.25} ${t - 0.62}Q${x + 0.3} ${t - 0.72} ${x + 0.5} ${t - 0.72}L${x + 1.1} ${t - 0.66}L${x + w - 0.6} ${t}Z`}
          fill={C.cabShade}
        />
      )}
      <path
        d={`M${x} -0.95V${t + 0.16}Q${x} ${t} ${x + 0.16} ${t}H${x + w - 0.72}Q${x + w - 0.5} ${t} ${x + w - 0.4} ${t + 0.26}L${x + w - 0.08} ${belt}Q${x + w} ${belt + 0.2} ${x + w} ${belt + 0.42}V-0.95Z`}
        fill={C.cab}
      />
      <path
        d={`M${x + 0.86} ${t + 0.42}H${x + w - 0.68}L${x + w - 0.27} ${belt + 0.04}H${x + 0.86}Z`}
        fill={C.glass}
      />
      <path d={`M${x + 0.72} ${t + 0.3}V-1.02`} stroke={C.cabShade} strokeWidth={0.035} />
      <rect x={x + w - 0.12} y={belt - 0.34} width={0.1} height={0.46} rx={0.04} fill={C.navy} />
      <rect x={x + w - 0.98} y={-1.28} width={1.05} height={0.34} rx={0.08} fill={C.navy} />
      <rect x={x + w - 0.26} y={-1.62} width={0.26} height={0.16} rx={0.04} fill={C.amber} />
      <Globe x={x + 1.28} y={belt + 0.48} r={0.2} />
    </g>
  )
}

function Chassis({ x0, x1, y = -1.2 }: { x0: number; x1: number; y?: number }) {
  return <rect x={x0} y={y} width={x1 - x0} height={0.3} fill={C.navy} />
}

/** Caixa de lona amb les cintes verticals. */
function Lona({ x, w, h, base = 1.25, label }: { x: number; w: number; h: number; base?: number; label?: boolean }) {
  const top = -h
  const height = h - base
  const straps = Math.floor(w / 1.1)
  return (
    <g>
      <rect x={x} y={top} width={w} height={height} fill={C.lona} />
      <rect x={x} y={top} width={w} height={0.16} fill={C.cab} />
      <rect x={x} y={-base - 0.1} width={w} height={0.1} fill={C.cab} />
      {Array.from({ length: straps }, (_, i) => (
        <rect
          key={i}
          x={x + ((i + 0.5) * w) / straps}
          y={top + 0.16}
          width={0.035}
          height={height - 0.26}
          fill={C.lonaLight}
        />
      ))}
      {label && (
        <text
          x={x + w / 2}
          y={top + height * 0.62}
          textAnchor="middle"
          fontSize={Math.min(height * 0.36, w * 0.09)}
          fontWeight={800}
          fill={C.cab}
          style={{ fontStretch: "125%" }}
        >
          FJM Transportes
        </text>
      )}
    </g>
  )
}

export function Van({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path
        d="M0 -0.5V-2.2Q0 -2.45 0.25 -2.45H3.6Q3.9 -2.45 4.15 -2.15L4.85 -1.42L5.25 -1.28Q5.42 -1.2 5.42 -1V-0.5Z"
        fill={C.cab}
      />
      <path d="M3.42 -2.25H3.62Q3.82 -2.25 3.98 -2.05L4.5 -1.45H3.42Z" fill={C.glass} />
      <rect x={0} y={-1.02} width={3.2} height={0.09} fill={C.lona} />
      <rect x={4.9} y={-0.82} width={0.52} height={0.3} rx={0.06} fill={C.navy} />
      <rect x={5.1} y={-1.18} width={0.28} height={0.12} rx={0.03} fill={C.amber} />
      <Globe x={1.6} y={-1.7} r={0.3} />
      <Wheel x={1.1} r={0.37} />
      <Wheel x={4.25} r={0.37} />
    </g>
  )
}

export function LightTruck({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Chassis x0={0.2} x1={6.5} y={-0.98} />
      <Lona x={0} w={4.7} h={3.2} base={1.05} label />
      <g transform="translate(0 0.1)">
        <Cab x={4.85} h={2.75} w={2.05} />
      </g>
      <Wheel x={1.25} r={0.44} />
      <Wheel x={5.75} r={0.44} />
    </g>
  )
}

export function RigidTruck({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Chassis x0={0.3} x1={9.4} />
      <Lona x={0} w={7.1} h={3.9} label />
      <Cab x={7.25} h={3.25} />
      <Wheel x={1.75} />
      <Wheel x={8.55} />
    </g>
  )
}

export function Articulated({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Chassis x0={0.4} x1={13.6} y={-1.28} />
      <Lona x={0} w={13.6} h={4} label />
      <rect x={8.6} y={-1.05} width={0.14} height={0.98} fill={C.steel} />
      <rect x={8.4} y={-0.1} width={0.54} height={0.1} fill={C.steel} />
      <Wheel x={1.6} />
      <Wheel x={2.9} />
      <Wheel x={4.2} />
      <Chassis x0={12.4} x1={16.6} y={-1.15} />
      <Cab x={14.2} h={3.5} spoiler />
      <Wheel x={13.1} />
      <Wheel x={15.8} />
    </g>
  )
}

export function CraneTruck({ x }: { x: number }) {
  // Pivot de la ploma: el mou fleet-scale.tsx pels data-*
  const px = 7.1
  const py = -3
  const sections = [
    { h: 0.8, y: -0.4, fill: C.lona },
    { h: 0.68, y: -0.34, fill: C.lonaLight },
    { h: 0.56, y: -0.28, fill: C.lona },
    { h: 0.46, y: -0.23, fill: C.lonaLight },
    { h: 0.36, y: -0.18, fill: C.red },
  ]
  return (
    <g transform={`translate(${x} 0)`}>
      <Chassis x0={0.2} x1={10.5} />
      <rect x={0.2} y={-1.5} width={6.4} height={0.3} fill={C.lona} />
      {[1.1, 6.3].map((ox) => (
        <g key={ox}>
          <rect x={ox} y={-1.2} width={0.2} height={1.1} fill={C.steel} />
          <rect x={ox - 0.2} y={-0.1} width={0.6} height={0.1} fill={C.navy} />
        </g>
      ))}
      <path d={`M6.5 -1.2H7.9V-2.5L${px + 0.4} ${py - 0.3}H${px - 0.6}Z`} fill={C.lona} />
      <g data-boom>
        {/* Els trams van de dins cap a fora; fleet-scale.tsx els fa lliscar */}
        {sections
          .slice()
          .reverse()
          .map((s, ri) => {
            const i = sections.length - 1 - ri
            return (
              <rect
                key={i}
                data-boom-section={i}
                x={px}
                y={py + s.y}
                width={8}
                height={s.h}
                fill={s.fill}
              />
            )
          })}
        <g data-boom-dim opacity={0}>
          <path
            d={`M${px} ${py - 1.6}H${px + 38}M${px} ${py - 2.1}V${py - 1.1}M${px + 38} ${py - 2.1}V${py - 1.1}`}
            stroke={C.navy}
            strokeWidth={0.1}
            fill="none"
          />
          <text x={px + 19} y={py - 2.1} textAnchor="middle" fontSize={1.5} fontWeight={700} fill={C.navy}>
            38 m
          </text>
        </g>
      </g>
      <line data-rope stroke={C.tyre} strokeWidth={0.06} />
      <rect data-hook width={0.6} height={0.8} rx={0.1} fill={C.amber} />
      <Cab x={8.1} h={3.3} />
      <Wheel x={1.9} />
      <Wheel x={3.1} />
      <Wheel x={9.4} />
    </g>
  )
}

function Excavator({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={-0.9} width={4.6} height={0.9} rx={0.44} fill={C.tyre} />
      <rect x={0.3} y={-0.72} width={4} height={0.54} rx={0.27} fill={C.steel} />
      <rect x={0.5} y={-2.1} width={3.2} height={1.2} rx={0.1} fill={C.amber} />
      <path d="M2.3 -3.2H3.5Q3.7 -3.2 3.7 -3V-2.1H2.3Z" fill={C.amber} />
      <path d="M2.5 -3H3.5V-2.3H2.5Z" fill={C.glass} />
      <path
        d="M3.6 -1.7L5.6 -4.3L6.2 -4L4.1 -1.3Z M5.75 -4.3L7.1 -2.4L6.6 -2L5.3 -3.9Z"
        fill={C.amber}
      />
      <path d="M6.7 -2.5L7.4 -1.5Q7 -0.9 6.2 -1.2L6.5 -2Z" fill={C.steel} />
    </g>
  )
}

export function Gondola({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      {/* Bogie del darrere */}
      <rect x={0} y={-1.3} width={5.6} height={0.42} fill={C.navy} />
      {[0.7, 1.9, 3.1, 4.3].map((wx) => (
        <Wheel key={wx} x={wx} r={0.42} />
      ))}
      {/* Plataforma baixa */}
      <path d="M5 -1.3L5.6 -1H13.7L14.5 -1.7V-1.9H13.4L13 -0.6H5.6Z" fill={C.lona} />
      <rect x={5.4} y={-1} width={8} height={0.4} fill={C.lona} />
      <path d="M13.2 -1L14.4 -2H17.4V-1.55H14.6L13.5 -0.6Z" fill={C.lona} />
      <Excavator x={5.8} y={-1} />
      <Chassis x0={15.9} x1={20.8} y={-1.15} />
      <Cab x={18.4} h={3.5} spoiler />
      <Wheel x={16.3} />
      <Wheel x={17.6} />
      <Wheel x={20} />
      <path d="M9.4 -0.04V-0.56M9.2 -0.03H9.6M9.2 -0.57H9.6" stroke={C.navy} strokeWidth={0.05} />
      <text x={9.75} y={-0.14} fontSize={0.42} fontWeight={700} fill={C.navy}>
        0,60 m
      </text>
    </g>
  )
}

/** `x` és el punt d'enganxament; la plataforma creix cap enrere des d'aquí. */
export function ExtendablePlatform({ x }: { x: number }) {
  const top = -1.5
  return (
    <g transform={`translate(${x} 0)`}>
      <defs>
        <pattern id="panel-stripes" width={0.5} height={0.5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={0.5} height={0.5} fill={C.cab} />
          <rect width={0.25} height={0.5} fill={C.red} />
        </pattern>
      </defs>
      <g data-platform-rear>
        <rect x={-30} y={top} width={18} height={0.32} fill={C.lonaLight} />
        <rect x={-30} y={top - 0.04} width={1} height={0.9} fill="url(#panel-stripes)" />
        {[-28.4, -27.1, -25.8].map((wx) => (
          <Wheel key={wx} x={wx} />
        ))}
        <rect x={-29} y={-1.18} width={4.4} height={0.2} fill={C.navy} />
      </g>
      <rect x={-14} y={top - 0.08} width={15} height={0.42} fill={C.lona} />
      <g data-beam>
        <Girder x0={-29.6} x1={-0.4} y={top - 0.08} />
      </g>
      <Chassis x0={-1.2} x1={5.4} y={-1.15} />
      <Cab x={3} h={3.5} spoiler />
      <Wheel x={0.4} />
      <Wheel x={1.7} />
      <Wheel x={4.6} />
      <g data-platform-dim opacity={0}>
        <line data-platform-dim-line x1={-30} x2={1} y1={-6.2} y2={-6.2} stroke={C.navy} strokeWidth={0.1} />
        <line x1={1} x2={1} y1={-6.6} y2={-5.8} stroke={C.navy} strokeWidth={0.1} />
        <line data-platform-dim-end x1={-30} x2={-30} y1={-6.6} y2={-5.8} stroke={C.navy} strokeWidth={0.1} />
        <text x={-14.5} y={-6.7} textAnchor="middle" fontSize={1.5} fontWeight={700} fill={C.navy}>
          30 m
        </text>
      </g>
    </g>
  )
}

/** Biga de gelosia: la «gran estructura» que carrega la plataforma. */
function Girder({ x0, x1, y }: { x0: number; x1: number; y: number }) {
  const h = 2.2
  const bays = 16
  const step = (x1 - x0) / bays
  let web = ""
  for (let i = 0; i < bays; i++) {
    const a = x0 + i * step
    web += `M${a} ${y}L${a + step / 2} ${y - h}L${a + step} ${y}`
  }
  return (
    <g>
      <path d={web} stroke={C.steel} strokeWidth={0.14} fill="none" />
      <rect x={x0} y={y - 0.14} width={x1 - x0} height={0.16} fill={C.navy} />
      <rect x={x0} y={y - h - 0.08} width={x1 - x0} height={0.16} fill={C.navy} />
    </g>
  )
}

/** Perfil de Montserrat: agulles arrodonides, la muntanya que Esparreguera té al costat. */
export function montserratPath(width: number, height: number) {
  let seed = 7
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  let x = -40
  let d = `M${x} ${height}`
  while (x < width + 40) {
    const massif = 0.5 + 0.5 * Math.sin((x / width) * Math.PI * 2.1 + 0.3)
    const w = 22 + rnd() * 40
    const top = height * (0.42 + 0.3 * (1 - massif) + rnd() * 0.1)
    const notch = Math.min(height, top + 12 + rnd() * 26)
    const n = (v: number) => v.toFixed(1)
    d += `L${n(x)} ${n(notch)}`
    d += `C${n(x)} ${n(top)} ${n(x + w)} ${n(top)} ${n(x + w)} ${n(notch)}`
    x += w
  }
  return `${d}L${x.toFixed(1)} ${height}Z`
}
