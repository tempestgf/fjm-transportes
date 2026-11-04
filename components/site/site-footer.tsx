import { FinaleCurtain } from "./curtain"

/** El peu és el final de la funció: la tela baixa sobre la nau i s'hi queda el nom. */
export function SiteFooter() {
  return (
    <footer className="finale">
      <div className="finale__stage">
        <img
          className="finale__photo"
          src="/media/web/truck-03.webp"
          alt="Tres camions de FJM Transportes aparcats davant de la nau d'Esparreguera"
          width={2000}
          height={1334}
          loading="lazy"
        />
        <FinaleCurtain />
        <p className="finale__mark" aria-hidden="true">
          FJM Transportes
        </p>
        <div className="finale__row">
          <p>Carrer Tres Rieres, nau 20, Polígon Industrial La Magarola, 08292 Esparreguera</p>
          <p>© 2026 FJM Transportes, NIF B66139247</p>
          <a href="#inici">Tornar a dalt</a>
        </div>
      </div>
    </footer>
  )
}
