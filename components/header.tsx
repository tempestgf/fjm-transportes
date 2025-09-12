"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Truck, Phone } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">FJM Transportes</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#serveis" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Serveis
            </a>
            <a href="#flota" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Els nostres vehicles
            </a>
            <a href="#sobre-nosaltres" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Sobre nosaltres
            </a>
            <a href="#contacte" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Contacte
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            >
              <Phone className="h-4 w-4" />
              <span>669 422 375</span>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">Pressupost</Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <a href="#serveis" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Serveis
              </a>
              <a href="#flota" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Els nostres vehicles
              </a>
              <a href="#sobre-nosaltres" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Sobre nosaltres
              </a>
              <a href="#contacte" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Contacte
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center space-x-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  <Phone className="h-4 w-4" />
                  <span>669 422 375</span>
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white">Pressupost</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
