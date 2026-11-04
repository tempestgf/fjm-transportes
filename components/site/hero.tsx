import { HeroCurtain } from "./curtain"

export function Hero() {
  return (
    <>
    <span id="inici" />
    <section className="hero">
      <img
        className="hero__photo"
        src="/media/web/truck-33.webp"
        alt="Tractora de FJM Transportes vista de cara al polígon de La Magarola, sota un cel de núvols"
        width={2000}
        height={1334}
        fetchPriority="high"
      />
      <div className="hero__copy">
        <h1 className="hero__title">Movem el que els altres no poden.</h1>
        <div className="hero__foot">
          <p className="hero__lead">
            Transport nacional i internacional, serveis urgents i càrregues especials des d'Esparreguera.
          </p>
          <div className="hero__actions">
            <a className="btn btn--white" href="#contacte">
              Demanar pressupost
            </a>
            <a className="btn btn--ghost" href="tel:+34669422375">
              669 422 375, 24 hores
            </a>
          </div>
        </div>
      </div>
      <div className="hero__dim" aria-hidden="true" />
      <HeroCurtain />
    </section>
    </>
  )
}
