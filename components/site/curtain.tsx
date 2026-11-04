import type { CSSProperties } from "react"

export const CURTAIN_PANELS = 14

/**
 * Lona lateral d'un tràiler, tallada en plecs verticals. Cada plec porta la seva
 * part de la retolació, de manera que el text es plega amb la tela.
 * `open`: s'obre sola en carregar (només CSS, no depèn del JavaScript).
 * `scroll`: la tanca l'scroll des de depot.tsx.
 */
export function Curtain({ mode }: { mode: "open" | "scroll" }) {
  return (
    <div className={`curtain curtain--${mode}`} aria-hidden="true">
      {Array.from({ length: CURTAIN_PANELS }, (_, i) => (
        <div key={i} className="curtain__panel" style={{ "--i": i } as CSSProperties}>
          <div className="curtain__print">
            <span className="curtain__name">FJM Transportes</span>
            <span className="curtain__phone">93 777 53 32</span>
          </div>
          <span className="curtain__fold" />
          <span className="curtain__strap" />
        </div>
      ))}
    </div>
  )
}
