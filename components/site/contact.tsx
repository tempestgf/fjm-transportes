"use client"

import { type FormEvent, useEffect, useState } from "react"
import { services } from "./services"

const departments = [
  { name: "Trànsit", phone: "+34 687 94 26 42", mail: "fjmtrafico@fjmtransportes.com" },
  { name: "Comercial, 24 hores", phone: "+34 669 42 23 75", mail: "fjm@fjmtransportes.com" },
  {
    name: "Administració",
    phone: "+34 669 42 23 50",
    mail: "administracion@administracionfjmtransportes.com",
  },
  { name: "Magatzem", phone: "+34 616 71 94 66", mail: "trafico2@fjmtransportes.com" },
]

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`

export function Contact() {
  const [service, setService] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onService = (e: Event) => setService((e as CustomEvent<string>).detail)
    window.addEventListener("fjm:service", onService)
    return () => window.removeEventListener("fjm:service", onService)
  }, [])

  // Encara no hi ha servidor de correu: la petició s'obre redactada al correu del client.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      `Nom: ${f.get("nom")}`,
      `Empresa: ${f.get("empresa") || "-"}`,
      `Correu: ${f.get("correu")}`,
      `Telèfon: ${f.get("telefon") || "-"}`,
      `Servei: ${f.get("servei") || "-"}`,
      "",
      String(f.get("missatge")),
    ].join("\n")
    const subject = `Pressupost web: ${f.get("servei") || "consulta"}`
    window.location.href = `mailto:fjm@fjmtransportes.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="contact" id="contacte" aria-labelledby="contact-title">
      <div className="contact__head">
        <h2 id="contact-title">Parlem.</h2>
        <p>Té un projecte complex? Necessita pressupost? L'ajudem a moure'l.</p>
      </div>
      <div className="contact__grid">
        <form className="form" onSubmit={submit}>
          <label className="field">
            <span>Nom i cognoms</span>
            <input name="nom" required autoComplete="name" />
          </label>
          <label className="field">
            <span>Empresa (opcional)</span>
            <input name="empresa" autoComplete="organization" />
          </label>
          <label className="field">
            <span>Correu electrònic</span>
            <input name="correu" type="email" required autoComplete="email" />
          </label>
          <label className="field">
            <span>Telèfon (opcional)</span>
            <input name="telefon" type="tel" autoComplete="tel" />
          </label>
          <label className="field field--wide">
            <span>Servei</span>
            <select name="servei" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Encara no ho sé</option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          <label className="field field--wide">
            <span>Què cal moure, des d'on i fins on?</span>
            <textarea name="missatge" required rows={4} />
          </label>
          <div className="form__foot">
            <button className="btn btn--white" type="submit">
              Enviar petició
            </button>
            <p role="status">
              {sent
                ? "Hem obert el seu correu amb la petició redactada. Si no s'ha obert, escrigui a fjm@fjmtransportes.com."
                : "La petició s'obrirà al seu correu, a punt per enviar."}
            </p>
          </div>
        </form>
        <div className="reach">
          <a className="reach__main" href="tel:+34937775332">
            93 777 53 32
          </a>
          <p className="reach__sub">Oficina</p>
          <dl className="reach__list">
            {departments.map((d) => (
              <div key={d.name}>
                <dt>{d.name}</dt>
                <dd>
                  <a href={tel(d.phone)}>{d.phone}</a>
                </dd>
                <dd>
                  <a href={`mailto:${d.mail}`}>{d.mail}</a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
