"use client"

import { useEffect, useRef, useState } from "react"

const links = [
  { href: "#vehicles", label: "Flota" },
  { href: "#serveis", label: "Serveis" },
  { href: "#infraestructura", label: "Nau" },
  { href: "#contacte", label: "Contacte" },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const el = ref.current
      if (!el) return
      el.classList.toggle("nav--solid", y > window.innerHeight * 0.8)
      el.classList.toggle("nav--hidden", y > last && y > 200)
      last = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header ref={ref} className={`nav${open ? " nav--open" : ""}`}>
      <a className="nav__brand" href="#inici" onClick={() => setOpen(false)}>
        <img src="/media/web/logo-96.png" alt="" width={40} height={40} />
        <span>FJM Transportes</span>
      </a>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Tancar" : "Menú"}
      </button>
      <nav id="nav-links" className="nav__links" aria-label="Principal">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="nav__phone" href="tel:+34669422375">
          669 422 375
        </a>
      </nav>
    </header>
  )
}
