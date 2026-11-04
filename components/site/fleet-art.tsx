/**
 * Alçats laterals de la flota. Tot està dibuixat en metres reals: 1 unitat SVG = 1 m,
 * y = 0 és el terra i els vehicles miren cap a la dreta. La llum ve de dalt a l'esquerra.
 * La retolació segueix les fotos: cabina blanca, baixos foscos, lona blava i bord d'alumini.
 * Les siluetes són orientatives. Les xifres de 38 m, 30 m i 0,60 m són dades de FJM.
 */

const C = {
  cab: "#F5F8FA",
  seam: "#B4C2CE",
  lona: "#004C96",
  lonaLight: "#2C7DD0",
  navy: "#06264A",
  ink: "#0F1A25",
  sky: "#8FD0F3",
  red: "#D8232A",
  steel: "#5B6F82",
  amber: "#F0A91E",
  alu: "#C9D4DC",
}

const url = (id: string) => `url(#fa-${id})`

/** Degradats i la roda, una sola vegada per a tota l'escena. */
export function FleetDefs() {
  const nuts = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2)
  const holes = Array.from({ length: 8 }, (_, i) => ((i + 0.5) / 8) * Math.PI * 2)
  return (
    <defs>
      <linearGradient id="fa-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.6" stopColor="#F1F5F8" />
        <stop offset="1" stopColor="#C7D3DC" />
      </linearGradient>
      <linearGradient id="fa-dark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3A4856" />
        <stop offset="1" stopColor="#10181F" />
      </linearGradient>
      <linearGradient id="fa-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9CCBE6" />
        <stop offset="0.42" stopColor="#35688F" />
        <stop offset="1" stopColor="#102C45" />
      </linearGradient>
      <linearGradient id="fa-lona" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1467BD" />
        <stop offset="0.4" stopColor="#004C96" />
        <stop offset="1" stopColor="#003571" />
      </linearGradient>
      <linearGradient id="fa-fold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#001A40" stopOpacity="0.3" />
        <stop offset="0.3" stopColor="#6DB4F2" stopOpacity="0.2" />
        <stop offset="0.62" stopColor="#6DB4F2" stopOpacity="0" />
        <stop offset="1" stopColor="#001A40" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="fa-alu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F1F4F6" />
        <stop offset="0.5" stopColor="#B4C0CA" />
        <stop offset="0.75" stopColor="#E2E8ED" />
        <stop offset="1" stopColor="#8796A3" />
      </linearGradient>
      <linearGradient id="fa-paint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2C7DD0" />
        <stop offset="1" stopColor="#003E80" />
      </linearGradient>
      <linearGradient id="fa-amber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFC94D" />
        <stop offset="1" stopColor="#DE8E0B" />
      </linearGradient>
      <linearGradient id="fa-lamp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#9FC4DA" />
      </linearGradient>
      <radialGradient id="fa-tyre">
        <stop offset="0.6" stopColor="#2B3743" />
        <stop offset="1" stopColor="#0B131B" />
      </radialGradient>
      <radialGradient id="fa-rim" cx="0.38" cy="0.32" r="0.8">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#8E9EAC" />
      </radialGradient>
      <radialGradient id="fa-shadow">
        <stop offset="0" stopColor="#020B15" stopOpacity="0.75" />
        <stop offset="1" stopColor="#020B15" stopOpacity="0" />
      </radialGradient>
      <pattern id="fa-stripes" width={0.5} height={0.5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width={0.5} height={0.5} fill={C.cab} />
        <rect width={0.25} height={0.5} fill={C.red} />
      </pattern>
      <g id="fa-wheel">
        <circle r={1} fill={url("tyre")} />
        <circle r={0.9} fill="none" stroke="#35424F" strokeWidth={0.025} />
        <circle r={0.63} fill="#0A1219" />
        <circle r={0.59} fill={url("rim")} />
        <circle r={0.47} fill="none" stroke="#7E8F9E" strokeWidth={0.02} />
        {holes.map((a) => (
          <circle key={a} cx={+(0.4 * Math.cos(a)).toFixed(3)} cy={+(0.4 * Math.sin(a)).toFixed(3)} r={0.058} fill="#26323D" />
        ))}
        <circle r={0.29} fill="#A9B7C3" />
        {nuts.map((a) => (
          <circle key={a} cx={+(0.22 * Math.cos(a)).toFixed(3)} cy={+(0.22 * Math.sin(a)).toFixed(3)} r={0.026} fill="#44525F" />
        ))}
        <circle r={0.12} fill="#E4EAEF" />
      </g>
    </defs>
  )
}

function Wheel({ x, r = 0.52 }: { x: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${-r}) scale(${r})`}>
      <use href="#fa-wheel" data-wheel />
    </g>
  )
}

/** Aleta sobre una roda. */
function Guard({ x, r = 0.52 }: { x: number; r?: number }) {
  const o = r + 0.11
  return (
    <path
      d={`M${x - o} ${-r + 0.06}A${o} ${o} 0 0 1 ${x + o} ${-r + 0.06}`}
      fill="none"
      stroke={C.ink}
      strokeWidth={0.1}
    />
  )
}

/** Ombra de contacte sobre l'asfalt. */
function Shadow({ x0, x1 }: { x0: number; x1: number }) {
  return <ellipse cx={(x0 + x1) / 2} cy={0.04} rx={(x1 - x0) / 2 + 0.7} ry={0.24} fill={url("shadow")} />
}

function Globe({ x, y, r }: { x: number; y: number; r: number }) {
  const w = r * 0.13
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.sky} stroke={C.lona} strokeWidth={w} />
      <ellipse cx={x} cy={y} rx={r * 0.46} ry={r} fill="none" stroke={C.lona} strokeWidth={w * 0.7} />
      <path d={`M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}`} stroke={C.lona} strokeWidth={w * 0.7} />
    </g>
  )
}

function Frame({ x0, x1, y = -1.2, h = 0.26 }: { x0: number; x1: number; y?: number; h?: number }) {
  return <rect x={x0} y={y} width={x1 - x0} height={h} fill={url("dark")} />
}

/** Dipòsit d'alumini amb les seves cintes. */
function Tank({ x, w, y = -1.12, h = 0.54 }: { x: number; w: number; y?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h * 0.34} fill={url("alu")} />
      {[0.22, 0.78].map((k) => (
        <rect key={k} x={x + w * k} y={y - 0.02} width={0.05} height={h + 0.04} fill={C.ink} />
      ))}
    </g>
  )
}

function SideGuard({ x0, x1 }: { x0: number; x1: number }) {
  const posts = Math.max(2, Math.round((x1 - x0) / 1.5) + 1)
  return (
    <g>
      {Array.from({ length: posts }, (_, i) => (
        <rect key={i} x={x0 + ((x1 - x0 - 0.05) * i) / (posts - 1)} y={-1.14} width={0.05} height={0.56} fill={C.ink} />
      ))}
      <rect x={x0} y={-1.06} width={x1 - x0} height={0.09} fill={url("alu")} />
      <rect x={x0} y={-0.74} width={x1 - x0} height={0.09} fill={url("alu")} />
    </g>
  )
}

/**
 * Cabina avançada. `x` és la paret del darrere i la roda davantera va a x + 1,38·s.
 * `high` és la cabina de les tractores, `day` la dels rígids, amb l'spoiler al sostre.
 */
function Cab({
  x,
  kind = "high",
  s = 1,
  beacon = false,
}: {
  x: number
  kind?: "high" | "day"
  s?: number
  beacon?: boolean
}) {
  const high = kind === "high"
  const top = high ? -3.85 : -3.15
  const wt = high ? -3.1 : -2.88
  return (
    <g transform={`translate(${x} 0) scale(${s})`}>
      {high ? (
        <path d={`M0.02 ${top + 0.24}L-0.24 ${top + 0.42}V-1.72L0.02 -1.5Z`} fill="#DCE5EB" />
      ) : (
        <path
          d={`M0.08 ${top + 0.02}L0.12 ${top - 0.66}Q0.14 ${top - 0.78} 0.3 ${top - 0.74}L1.08 ${top - 0.5}Q1.62 ${top - 0.32} 1.92 ${top + 0.03}Z`}
          fill={url("body")}
        />
      )}
      <path
        d={`M0 -0.6V${top + 0.28}Q0 ${top} 0.3 ${top}H1.5Q1.92 ${top} 2.03 ${top + 0.24}L2.32 -2.3Q2.38 -2.1 2.38 -1.9V-0.6Q2.38 -0.5 2.28 -0.5H0.1Q0 -0.5 0 -0.6Z`}
        fill={url("body")}
      />
      {/* Ombra de la paret del darrere i llum al sostre */}
      <rect x={0} y={top + 0.2} width={0.13} height={-top - 0.8} fill={C.navy} opacity={0.09} />
      <path d={`M0.32 ${top + 0.07}H1.5`} stroke="#fff" strokeWidth={0.05} />

      {/* Baixos foscos, graons i pas de roda */}
      <path d="M0.5 -1.18H2.38V-0.6Q2.38 -0.5 2.28 -0.5H0.5Z" fill={url("dark")} />
      <rect x={0.06} y={-1.08} width={0.62} height={0.58} fill={url("dark")} />
      <rect x={0.14} y={-1} width={0.46} height={0.06} fill={url("alu")} />
      <rect x={0.14} y={-0.74} width={0.46} height={0.06} fill={url("alu")} />
      <path d="M0.68 -0.5A0.7 0.7 0 0 1 2.08 -0.5Z" fill="#070D13" />

      {/* Vidres */}
      <path
        d={`M0.98 ${wt}H1.84Q1.92 ${wt} 1.94 ${wt + 0.06}L2.1 -2.38Q2.11 -2.26 2 -2.26L1.44 -2.24Q1 -2.26 0.98 -2.42Z`}
        fill={url("glass")}
        stroke={C.ink}
        strokeWidth={0.05}
      />
      <path d={`M1.98 ${top + 0.34}L2.31 -2.32L2.23 -2.3L1.9 ${top + 0.36}Z`} fill={url("glass")} />

      {/* Para-sol: la banda fosca que porta el nom a les fotos */}
      <path
        d={`M1.6 ${top + 0.16}H2.04L2.2 ${top + 0.26}Q2.24 ${top + 0.3} 2.2 ${top + 0.33}L1.66 ${top + 0.33}Z`}
        fill={url("dark")}
      />

      {/* Xapa */}
      <path d={`M0.94 ${wt - 0.14}V-1.3H2.1L2.2 -2`} fill="none" stroke={C.seam} strokeWidth={0.024} />
      <rect x={1.02} y={-2.1} width={0.24} height={0.055} rx={0.02} fill={C.ink} />
      <path d="M1.98 -1.84H2.34M2 -1.74H2.34M2.02 -1.64H2.34" stroke="#A7B6C2" strokeWidth={0.028} />
      <rect x={0.02} y={-1.32} width={2.06} height={0.045} fill={C.alu} />

      {/* Llums */}
      <path d="M1.98 -1.54H2.38V-1.22H2.1Z" fill={url("lamp")} stroke="#6E8192" strokeWidth={0.015} />
      <rect x={1.8} y={-1.52} width={0.15} height={0.09} rx={0.02} fill={C.amber} />
      <rect x={2.12} y={-0.86} width={0.26} height={0.1} rx={0.02} fill={url("lamp")} />

      {/* Retrovisor */}
      <path d={`M2.04 ${wt + 0.02}L2.36 ${wt - 0.04}`} stroke={C.ink} strokeWidth={0.05} />
      <rect x={2.3} y={wt - 0.14} width={0.15} height={0.64} rx={0.05} fill={url("dark")} />

      {high && (
        <g fill={C.amber}>
          <rect x={0.7} y={top - 0.04} width={0.13} height={0.05} rx={0.015} />
          <rect x={1.05} y={top - 0.04} width={0.13} height={0.05} rx={0.015} />
          <rect x={1.4} y={top - 0.04} width={0.13} height={0.05} rx={0.015} />
        </g>
      )}
      {beacon && (
        <g>
          <rect x={0.4} y={top - 0.06} width={0.5} height={0.07} fill={C.ink} />
          <path
            d={`M0.47 ${top - 0.06}V${top - 0.2}Q0.47 ${top - 0.26} 0.54 ${top - 0.26}H0.76Q0.83 ${top - 0.26} 0.83 ${top - 0.2}V${top - 0.06}Z`}
            fill={url("amber")}
          />
        </g>
      )}

      {/* Retolació de la porta */}
      <Globe x={1.42} y={-1.86} r={0.19} />
      <text x={1.42} y={-1.49} textAnchor="middle" fontSize={0.13} fontWeight={800} fill={C.lona} style={{ fontStretch: "118%" }}>
        FJM Transportes
      </text>
    </g>
  )
}

/** Caixa de lona: sostre, cortina amb cintes, bord d'alumini i travesser. */
function Curtainsider({ x, w, h, base = 1.3, label }: { x: number; w: number; h: number; base?: number; label?: boolean }) {
  const board = 0.46
  const top = -h + 0.14
  const ch = h - base - board - 0.14
  const n = Math.max(3, Math.round(w / 1.15))
  const fw = w / n
  const size = Math.min(ch * 0.27, w * 0.063)
  return (
    <g>
      <rect x={x} y={top} width={w} height={ch} fill={url("lona")} />
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + i * fw} y={top} width={fw} height={ch} fill={url("fold")} />
      ))}
      {Array.from({ length: n - 1 }, (_, i) => (
        <g key={i}>
          <rect x={x + (i + 1) * fw - 0.018} y={top} width={0.036} height={ch} fill={C.lonaLight} opacity={0.55} />
          <rect x={x + (i + 1) * fw - 0.035} y={top + ch - 0.17} width={0.07} height={0.16} fill={C.alu} />
        </g>
      ))}
      <rect x={x} y={top + ch - 0.035} width={w} height={0.035} fill="#E8EEF2" />
      <rect x={x} y={-h} width={w} height={0.15} rx={0.04} fill={url("alu")} />

      {/* Bord d'alumini */}
      <rect x={x} y={-base - board} width={w} height={board} fill={url("alu")} />
      {Array.from({ length: n + 1 }, (_, i) => (
        <rect key={i} x={x + i * fw - 0.02} y={-base - board} width={0.04} height={board} fill="#7D8C99" />
      ))}
      <rect x={x} y={-base} width={w} height={0.12} fill={url("dark")} />
      {Array.from({ length: Math.floor(w / 2.2) }, (_, i) => (
        <rect key={i} x={x + 1 + i * 2.2} y={-base + 0.03} width={0.14} height={0.06} fill={C.amber} />
      ))}

      {/* Testera i pilar del darrere */}
      <rect x={x + w - 0.2} y={-h} width={0.2} height={h - base + 0.12} rx={0.03} fill={url("body")} />
      <rect x={x} y={-h} width={0.09} height={h - base + 0.12} fill={url("alu")} />
      <rect x={x + 0.02} y={-base - 0.3} width={0.06} height={0.24} fill={C.red} />

      {label && (
        <g>
          <Globe x={x + w / 2 - size * 5.9} y={top + ch * 0.47} r={size * 0.76} />
          <text
            x={x + w / 2 + size * 0.45}
            y={top + ch * 0.47 + size * 0.36}
            textAnchor="middle"
            fontSize={size}
            fontWeight={800}
            fill="#fff"
            style={{ fontStretch: "125%" }}
          >
            FJM Transportes
          </text>
        </g>
      )}
    </g>
  )
}

export function Van({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={0} x1={5.46} />
      <path
        d="M0 -0.6V-2.2Q0 -2.46 0.25 -2.46H3.55Q3.86 -2.46 4.1 -2.21L4.86 -1.46L5.3 -1.32Q5.47 -1.26 5.47 -1.06V-0.62Q5.47 -0.5 5.36 -0.5H0.1Q0 -0.5 0 -0.6Z"
        fill={url("body")}
      />
      <path d="M0 -0.86H5.47V-0.62Q5.47 -0.5 5.36 -0.5H0.1Q0 -0.5 0 -0.6Z" fill={url("dark")} />
      <path d="M0.56 -0.5A0.49 0.49 0 0 1 1.54 -0.5Z M3.82 -0.5A0.49 0.49 0 0 1 4.8 -0.5Z" fill="#070D13" />
      {/* Vidres */}
      <path d="M3.32 -2.24H3.62Q3.84 -2.24 3.98 -2.1L4.6 -1.5H3.32Z" fill={url("glass")} stroke={C.ink} strokeWidth={0.04} />
      <path d="M2.3 -2.24H3.16V-1.56H2.3Z" fill={url("glass")} stroke={C.ink} strokeWidth={0.04} />
      {/* Xapa */}
      <path d="M2.2 -2.34V-0.86M3.22 -2.34V-0.86M0.06 -2.3V-0.86" fill="none" stroke={C.seam} strokeWidth={0.024} />
      <path d="M0.12 -1.98H2.14M0.12 -1.2H2.14" stroke={C.seam} strokeWidth={0.014} />
      <rect x={2.32} y={-1.34} width={0.2} height={0.05} rx={0.02} fill={C.ink} />
      <rect x={3.36} y={-1.34} width={0.2} height={0.05} rx={0.02} fill={C.ink} />
      <rect x={0} y={-1.08} width={3.2} height={0.08} fill={C.lona} />
      <Globe x={0.78} y={-1.62} r={0.24} />
      <text x={1.16} y={-1.54} fontSize={0.2} fontWeight={800} fill={C.lona} style={{ fontStretch: "118%" }}>
        FJM
      </text>
      {/* Llums i retrovisor */}
      <path d="M4.86 -1.42L5.3 -1.28Q5.42 -1.22 5.44 -1.1H4.92Z" fill={url("lamp")} stroke="#6E8192" strokeWidth={0.015} />
      <rect x={0} y={-1.86} width={0.07} height={0.44} fill={C.red} />
      <rect x={4.52} y={-1.72} width={0.12} height={0.26} rx={0.04} fill={url("dark")} />
      <Wheel x={1.05} r={0.37} />
      <Wheel x={4.31} r={0.37} />
    </g>
  )
}

export function LightTruck({ x }: { x: number }) {
  const s = 0.84
  const cx = 4.98
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={0} x1={7} />
      <Frame x0={0.3} x1={6} y={-1.02} h={0.2} />
      <Curtainsider x={0} w={4.8} h={3.2} base={1.02} label />
      <SideGuard x0={2.1} x1={4.6} />
      <Tank x={4.0} w={0.8} y={-0.96} h={0.4} />
      <Guard x={1.25} r={0.44} />
      <Cab x={cx} kind="day" s={s} />
      <Wheel x={1.25} r={0.44} />
      <Wheel x={cx + 1.38 * s} r={0.44} />
    </g>
  )
}

export function RigidTruck({ x }: { x: number }) {
  const cx = 7.3
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={0} x1={9.7} />
      <Frame x0={0.5} x1={8} />
      <Curtainsider x={0} w={7.15} h={3.9} label />
      <SideGuard x0={2.55} x1={6.2} />
      <Tank x={6.3} w={1.1} />
      <Guard x={1.75} />
      <Cab x={cx} kind="day" />
      <Wheel x={1.75} />
      <Wheel x={cx + 1.38} />
    </g>
  )
}

export function Articulated({ x }: { x: number }) {
  const cx = 14.35
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={0} x1={16.8} />
      {/* Semiremolc */}
      <rect x={0.5} y={-1.22} width={11.9} height={0.24} fill={url("dark")} />
      <path d="M5.4 -0.98H10.4L9.6 -0.76H6.1Z" fill={url("dark")} />
      <Curtainsider x={0} w={13.6} h={4} base={1.34} label />
      <SideGuard x0={5.4} x1={9.9} />
      <rect x={10.1} y={-1} width={0.12} height={0.92} fill={C.steel} />
      <rect x={9.92} y={-0.08} width={0.48} height={0.08} fill={C.ink} />
      {[1.9, 3.21, 4.52].map((wx) => (
        <g key={wx}>
          <Guard x={wx} />
          <Wheel x={wx} />
        </g>
      ))}
      {/* Tractora */}
      <Frame x0={11.1} x1={15} y={-1.16} />
      <rect x={11.5} y={-1.32} width={1.3} height={0.16} fill={C.ink} />
      <Tank x={12.82} w={1.46} />
      <Guard x={12.1} />
      <Cab x={cx} kind="high" />
      <Wheel x={12.1} />
      <Wheel x={cx + 1.38} />
    </g>
  )
}

export function CraneTruck({ x, parked = false }: { x: number; parked?: boolean }) {
  // Pivot de la ploma: el mou fleet-scale.tsx pels data-*. Aparcada, queda plegada sobre la caixa.
  const px = 7.1
  const py = -3
  const sections = [0.82, 0.7, 0.58, 0.47, 0.36]
  const cx = 8.1
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={0} x1={10.6} />
      <Frame x0={0.2} x1={9} />
      {/* Plataforma i caixons */}
      <rect x={0.1} y={-1.52} width={7.8} height={0.34} fill={url("paint")} />
      <rect x={0.1} y={-1.56} width={7.8} height={0.07} fill={url("alu")} />
      <rect x={3.9} y={-1.16} width={1.5} height={0.56} fill={url("dark")} />
      <path d="M4.6 -1.16V-0.6" stroke="#55636F" strokeWidth={0.02} />
      <rect x={0.5} y={-2.34} width={0.14} height={0.82} fill={url("dark")} />
      <path d="M0.2 -2.4H0.94V-2.28H0.2Z" fill={C.ink} />
      {/* Estabilitzadors: baixen abans d'aixecar la ploma */}
      {[0.75, 6.75].map((ox) => (
        <g key={ox} data-outrigger transform={parked ? "translate(0 -0.62)" : undefined}>
          <rect x={ox} y={-1.3} width={0.24} height={1.2} fill={url("alu")} />
          <rect x={ox - 0.26} y={-0.11} width={0.76} height={0.11} rx={0.02} fill={C.ink} />
        </g>
      ))}
      {/* Pistó de la ploma */}
      <line data-ram-rod stroke="#DDE4EA" strokeWidth={0.1} {...(parked ? { x1: 5.3, y1: -1.62, x2: 4.1, y2: -3.16 } : {})} />
      <line data-ram-cyl stroke={C.ink} strokeWidth={0.19} {...(parked ? { x1: 5.3, y1: -1.62, x2: 4.22, y2: -3 } : {})} />
      {/* Corona i torreta */}
      <rect x={5.7} y={-1.74} width={2.2} height={0.2} fill={C.ink} />
      <path d={`M5.9 -1.74H7.9V-2.2L${px + 0.52} ${py - 0.48}H${px - 0.62}L5.9 -2.3Z`} fill={url("paint")} />
      <path d="M6.08 -1.92H7.7" stroke={C.lonaLight} strokeWidth={0.03} />
      <g data-boom transform={parked ? `rotate(-177 ${px} ${py})` : undefined}>
        {/* Els trams van de dins cap a fora; fleet-scale.tsx els fa lliscar */}
        {sections
          .slice()
          .reverse()
          .map((h, ri) => {
            const i = sections.length - 1 - ri
            const tip = i === sections.length - 1
            return (
              <g key={i} data-boom-section={i}>
                <rect x={px} y={py - h / 2} width={8} height={h} rx={0.05} fill={tip ? C.red : url("paint")} />
                <rect x={px} y={py - h / 2 + 0.04} width={8} height={0.05} fill="#fff" opacity={0.28} />
                <rect x={px + 7.72} y={py - h / 2} width={0.28} height={h} fill={tip ? "#fff" : C.ink} opacity={tip ? 1 : 0.65} />
                {tip && <circle cx={px + 8} cy={py} r={0.3} fill={C.ink} />}
                {tip && <circle cx={px + 8} cy={py} r={0.13} fill={C.alu} />}
              </g>
            )
          })}
        <circle cx={px} cy={py} r={0.3} fill={C.ink} />
        <circle cx={px} cy={py} r={0.13} fill={C.alu} />
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
      {!parked && <line data-rope stroke={C.ink} strokeWidth={0.06} />}
      {!parked && (
        <g data-hook>
          <rect x={-0.3} y={0} width={0.6} height={0.66} rx={0.1} fill={url("amber")} />
          <circle cx={0} cy={0.3} r={0.13} fill={C.ink} />
          <path d="M0 0.66V0.86Q0.27 0.9 0.24 1.14Q0.16 1.4 -0.14 1.3" fill="none" stroke={C.ink} strokeWidth={0.1} />
        </g>
      )}
      <Guard x={1.9} />
      <Guard x={3.1} />
      <Cab x={cx} kind="day" />
      <Wheel x={1.9} />
      <Wheel x={3.1} />
      <Wheel x={cx + 1.38} />
    </g>
  )
}

function Excavator({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Eruga */}
      <rect x={0} y={-0.86} width={4.3} height={0.86} rx={0.42} fill={C.ink} />
      <rect x={0.14} y={-0.72} width={4.02} height={0.58} rx={0.29} fill="#33414E" />
      {[0.46, 3.84].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={-0.43} r={0.3} fill={C.steel} />
          <circle cx={cx} cy={-0.43} r={0.1} fill={C.ink} />
        </g>
      ))}
      {[1.08, 1.62, 2.16, 2.7, 3.24].map((cx) => (
        <circle key={cx} cx={cx} cy={-0.3} r={0.13} fill={C.steel} />
      ))}
      <rect x={1.1} y={-1.02} width={2} height={0.18} fill={C.ink} />
      {/* Motor i contrapès */}
      <path d="M-0.3 -1.04H0.72V-1.84H0.12Q-0.3 -1.8 -0.3 -1.42Z" fill={url("dark")} />
      <path d="M0.6 -1.04H3.3V-1.92H0.6Z" fill={url("amber")} />
      <path d="M0.82 -1.72H1.8M0.82 -1.6H1.8M0.82 -1.48H1.8" stroke="#9A6407" strokeWidth={0.035} />
      {/* Cabina */}
      <path d="M2.2 -1.9V-3.04Q2.2 -3.14 2.3 -3.14H3.12L3.3 -2.42V-1.9Z" fill={url("amber")} />
      <path d="M2.32 -2.06V-3H3.04L3.18 -2.42V-2.06Z" fill={url("glass")} stroke={C.ink} strokeWidth={0.03} />
      {/* Braç recollit per al transport */}
      <path d="M2.0 -1.5L1.86 -2L4.32 -3.56Q4.66 -3.66 4.76 -3.36L4.66 -3.02L2.46 -1.46Z" fill={url("amber")} />
      <line x1={2.7} y1={-1.52} x2={3.86} y2={-2.72} stroke="#DDE4EA" strokeWidth={0.09} />
      <line x1={2.7} y1={-1.52} x2={3.3} y2={-2.14} stroke={C.ink} strokeWidth={0.17} />
      <path d="M4.3 -3.46L4.72 -3.62L5.92 -1.3L5.56 -1.1Z" fill={url("amber")} />
      <path d="M5.76 -1.34L5.3 -0.62Q5.2 -0.2 5.66 -0.18L6.5 -0.28L6.36 -0.92Z" fill={C.steel} />
      <path d="M5.66 -0.18L5.6 -0.04M5.96 -0.22L5.92 -0.08M6.26 -0.25L6.22 -0.11" stroke={C.ink} strokeWidth={0.07} />
      <circle cx={4.5} cy={-3.42} r={0.12} fill={C.ink} />
      <circle cx={5.76} cy={-1.26} r={0.11} fill={C.ink} />
    </g>
  )
}

export function Gondola({ x, bare = false }: { x: number; bare?: boolean }) {
  const cx = 18.42
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={-0.5} x1={20.9} />
      {/* Rampes especials, plegades */}
      <path d="M0.34 -1.34L-0.44 -3.06L-0.14 -3.2L0.72 -1.34Z" fill={url("paint")} />
      <path d="M0.2 -1.72L0.56 -1.84M0.02 -2.12L0.38 -2.26M-0.16 -2.52L0.2 -2.66" stroke={C.alu} strokeWidth={0.05} />
      {/* Bogie del darrere */}
      <rect x={0} y={-1.34} width={5.6} height={0.44} fill={url("paint")} />
      <rect x={0} y={-1.38} width={5.6} height={0.06} fill={url("alu")} />
      {[0.7, 1.9, 3.1, 4.3].map((wx) => (
        <g key={wx}>
          <Guard x={wx} r={0.42} />
          <Wheel x={wx} r={0.42} />
        </g>
      ))}
      {/* Plataforma baixa, a 0,60 m del terra */}
      <path d="M5.1 -1.34H5.6L6.1 -0.6H13.1L13.8 -1.56H15.2V-1.96H13.6L13.2 -1.56L12.7 -0.86V-0.22H6.2L5.1 -0.9Z" fill={url("paint")} />
      <rect x={6.1} y={-0.62} width={7} height={0.06} fill={url("alu")} />
      {/* Coll de cigne */}
      <path d="M13.3 -1.32L14.3 -2.12H17.5V-1.62H14.7L13.7 -0.82Z" fill={url("paint")} />
      <path d="M14.3 -2.12H17.5" stroke={C.alu} strokeWidth={0.06} />
      <Excavator x={6.3} y={-0.62} />
      {/* Tractora */}
      <Frame x0={15.8} x1={19.2} y={-1.16} />
      <Tank x={17.75} w={0.6} y={-1.06} h={0.44} />
      <Guard x={16.3} />
      <Guard x={17.5} />
      <Cab x={cx} kind="high" beacon />
      <Wheel x={16.3} />
      <Wheel x={17.5} />
      <Wheel x={cx + 1.38} />
      {!bare && (
        <>
          <path d="M13.5 -0.03V-0.6M13.3 -0.03H13.7M13.3 -0.6H13.7" stroke={C.cab} strokeWidth={0.05} />
          <text x={13.85} y={-0.17} fontSize={0.4} fontWeight={700} fill={C.cab}>
            0,60 m
          </text>
        </>
      )}
    </g>
  )
}

/** `x` és el punt d'enganxament; la plataforma creix cap enrere des d'aquí. */
export function ExtendablePlatform({ x }: { x: number }) {
  const top = -1.5
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={-14} x1={5.5} />
      <g data-platform-rear>
        <Shadow x0={-30} x1={-24.5} />
        {/* Tub telescòpic i dolly */}
        <rect x={-30} y={top + 0.06} width={18} height={0.24} fill={url("alu")} />
        <rect x={-30} y={top - 0.02} width={18} height={0.08} fill={url("paint")} />
        <rect x={-30} y={top - 0.06} width={1.1} height={0.96} fill="url(#fa-stripes)" />
        <rect x={-29.2} y={-1.2} width={4.7} height={0.22} fill={url("dark")} />
        {[-28.4, -27.1, -25.8].map((wx) => (
          <g key={wx}>
            <Guard x={wx} />
            <Wheel x={wx} />
          </g>
        ))}
      </g>
      {/* Tram fix */}
      <rect x={-14} y={top - 0.08} width={15} height={0.44} fill={url("paint")} />
      <rect x={-14} y={top - 0.1} width={15} height={0.06} fill={url("alu")} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={-13.2 + i * 1.45} y={top + 0.02} width={0.09} height={0.24} fill="#003E80" />
      ))}
      <path d="M-14 -1.14L-10.5 -1.14L-10.1 -0.9H-3L-2.6 -1.14H1" stroke={C.ink} strokeWidth={0.1} fill="none" />
      <g data-beam>
        <Girder x0={-29.6} x1={-0.4} y={top - 0.1} />
      </g>
      <Frame x0={-1.2} x1={3.8} y={-1.16} />
      <Tank x={2.34} w={0.62} y={-1.06} h={0.44} />
      <Guard x={0.4} />
      <Guard x={1.7} />
      <Cab x={3} kind="high" beacon />
      <Wheel x={0.4} />
      <Wheel x={1.7} />
      <Wheel x={4.38} />
      <g data-platform-dim opacity={0}>
        <line data-platform-dim-line x1={-30} x2={1} y1={-6.2} y2={-6.2} stroke="#fff" strokeWidth={0.1} />
        <line x1={1} x2={1} y1={-6.6} y2={-5.8} stroke="#fff" strokeWidth={0.1} />
        <line data-platform-dim-end x1={-30} x2={-30} y1={-6.6} y2={-5.8} stroke="#fff" strokeWidth={0.1} />
        <text x={-14.5} y={-6.7} textAnchor="middle" fontSize={1.5} fontWeight={700} fill="#fff">
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
      <path d={web} stroke={C.steel} strokeWidth={0.15} fill="none" />
      <rect x={x0} y={y - 0.18} width={x1 - x0} height={0.2} fill={url("dark")} />
      <rect x={x0} y={y - h - 0.1} width={x1 - x0} height={0.2} fill={url("dark")} />
      <rect x={x0} y={y - h - 0.1} width={x1 - x0} height={0.05} fill="#6F8294" />
    </g>
  )
}

/** Carretó elevador amb un palet: el vehicle de la nau. */
export function Forklift({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Shadow x0={0.1} x1={3.9} />
      {/* Pal i forquilles */}
      <rect x={2.62} y={-3.1} width={0.14} height={3.02} fill={url("dark")} />
      <rect x={2.8} y={-2.5} width={0.08} height={2.42} fill={url("alu")} />
      <path d="M2.84 -1.28V-0.16H4.05" fill="none" stroke={C.steel} strokeWidth={0.09} />
      {/* Palet i càrrega */}
      <rect x={2.95} y={-0.32} width={1.2} height={0.05} fill={C.alu} />
      <path d="M2.97 -0.27H3.11V-0.12H2.97ZM3.48 -0.27H3.62V-0.12H3.48ZM3.99 -0.27H4.13V-0.12H3.99Z" fill={C.steel} />
      <rect x={3} y={-1.42} width={1.1} height={1.1} fill={url("lona")} />
      <path d="M3 -0.87H4.1M3.55 -1.42V-0.32" stroke={C.lonaLight} strokeWidth={0.03} />
      {/* Cos i contrapès */}
      <path d="M0.1 -0.36V-1.08Q0.1 -1.3 0.32 -1.3H2.2L2.56 -0.36Z" fill={url("paint")} />
      <path d="M0.1 -0.36V-0.84H0.72V-0.36Z" fill={url("dark")} />
      <rect x={0.98} y={-1.68} width={0.14} height={0.4} fill={C.ink} />
      <path d="M0.98 -1.68H1.5V-1.56H1.1L1.06 -1.3H0.98Z" fill={C.ink} />
      {/* Protecció de sostre */}
      <path d="M0.62 -1.3L0.78 -2.32H2.06L2.34 -1.3" fill="none" stroke={C.ink} strokeWidth={0.08} />
      <rect x={0.74} y={-2.36} width={1.36} height={0.06} fill={C.ink} />
      <path d="M1.9 -1.5L1.66 -1.74" stroke={C.ink} strokeWidth={0.05} />
      <rect x={0.52} y={-2.52} width={0.14} height={0.12} rx={0.03} fill={url("amber")} />
      <Wheel x={0.7} r={0.3} />
      <Wheel x={2.14} r={0.38} />
    </g>
  )
}

/** Una persona d'1,75 m, amb casc i armilla: la referència d'escala al costat de la grua. */
export function Person({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <ellipse cx={0} cy={0.03} rx={0.5} ry={0.07} fill={url("shadow")} />
      <path d="M-0.17 -0.86L-0.2 -0.03H-0.05L0 -0.62L0.05 -0.03H0.2L0.17 -0.86Z" fill={C.navy} />
      <path d="M-0.2 -0.03H-0.03V0H-0.24ZM0.03 -0.03H0.2L0.24 0H0.03Z" fill={C.ink} />
      <path d="M-0.2 -1.42Q-0.2 -1.46 -0.14 -1.46H0.14Q0.2 -1.46 0.2 -1.42L0.19 -0.84H-0.19Z" fill={C.amber} />
      <path d="M-0.19 -1.12H0.19M-0.19 -1.02H0.19" stroke={C.cab} strokeWidth={0.035} />
      <path d="M-0.21 -1.42L-0.29 -0.86M0.21 -1.42L0.29 -0.86" stroke={C.navy} strokeWidth={0.095} strokeLinecap="round" />
      <circle cx={0} cy={-1.59} r={0.105} fill="#E7C4A5" />
      <path d="M-0.125 -1.61A0.125 0.125 0 0 1 0.125 -1.61H0.17V-1.585H-0.125Z" fill={C.cab} />
    </g>
  )
}
