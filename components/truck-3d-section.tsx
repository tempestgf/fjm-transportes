"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, ContactShadows, Float, Html, Center } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function TruckModel({ truckRef, onLoad }: { truckRef: React.RefObject<THREE.Group>, onLoad: () => void }) {
  // Carga el GLTF asegurando que existe en /public/low_poly_truck.glb
  const { scene } = useGLTF('/low_poly_truck.glb')
  
  useEffect(() => {
    // Avisamos al padre (y a GSAP) que el modelo 3D ya se ha montado y cargado
    if (scene) onLoad()
  }, [scene, onLoad])

  return (
    // La capa ref es la que animaremos con GSAP (position y rotation)
    <group ref={truckRef}>
      {/* Añadimos 'Center' para centrar el modelo sin importar cómo se exportó */}
      <Center top>
        {/* ESCALA REDUCIDA: Si el modelo sigue siendo gigante, cambia a 0.05 o 0.01 */}
        <primitive object={scene} scale={0.15} />
      </Center>
    </group>
  )
}

// Precarga para agilizar la renderización
useGLTF.preload('/low_poly_truck.glb')

export function Truck3DSection() {
  const containerRef = useRef<HTMLElement>(null)
  const truckRef = useRef<THREE.Group>(null)
  
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  
  // Estado para asegurarnos de que inicializamos GSAP solo cuando el modelo existe
  const [modelLoaded, setModelLoaded] = useState(false)

  useEffect(() => {
    // Evitamos inicializar GSAP hasta que <Suspense> haya terminado y el ref exista
    if (!modelLoaded || !truckRef.current || !containerRef.current) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.refresh()
      
      // ----- CONFIGURACIÓN INICIAL -----
      // Escondemos los textos fuera de pantalla
      gsap.set(text1Ref.current, { opacity: 0, y: 100 })
      gsap.set(text2Ref.current, { opacity: 0, y: 100 })
      gsap.set(text3Ref.current, { opacity: 0, y: 150, scale: 0.9 })
      
      // ----- TRANSICIÓN DE ENTRADA (MIENTRAS HACES SCROLL SOBRE EL HERO) -----
      gsap.fromTo(truckRef.current.position, 
        { x: 8, y: -2, z: -25 }, 
        { 
          x: 1.5, 
          y: -1, 
          z: 0, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", 
            end: "top top",      
            scrub: 1,
            refreshPriority: 8,
            // Importante no pinear aquí
          }
        }
      )
      
      gsap.fromTo(truckRef.current.rotation, 
        { y: -Math.PI / 1.1 }, 
        { 
          y: -Math.PI / 6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            refreshPriority: 8,
          }
        }
      )

      // ----- ANIMACIÓN PRINCIPAL PINEADA (AWWWARDS STYLE) -----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Duración del pin (4 veces el alto de pantalla)
          scrub: 1.5,    
          pin: true,     
          anticipatePin: 1,
          refreshPriority: 8,
        }
      })

      // PASO 1: El camión ya está de frente gracias a la animación anterior. Aparece Text 1.
      tl.addLabel("step1")
        .to(truckRef.current.position, { x: 1, y: -1, z: 1, duration: 2, ease: "slow(0.7, 0.7, false)" }, "step1")
        .to(text1Ref.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "step1+=0.2")

      // PASO 2: El camión da un giro pasando cerca de la cámara (perfil), desaparece Text 1 y entra Texto 2
      tl.addLabel("step2", "+=0.5") 
        .to(text1Ref.current, { opacity: 0, y: -80, duration: 1, ease: "power2.in" }, "step2")
        .to(truckRef.current.position, { x: -3.5, y: -0.5, z: 4, duration: 2.5, ease: "power2.inOut" }, "step2")
        .to(truckRef.current.rotation, { y: Math.PI / 3, duration: 2.5, ease: "power2.inOut" }, "step2")
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "step2+=1")

      // PASO 3: El camión se da vuelta por completo para alejarse hacia el horizonte, foco final: Texto 3
      tl.addLabel("step3", "+=0.5")
        .to(text2Ref.current, { opacity: 0, y: -80, duration: 1, ease: "power2.in" }, "step3")
        .to(truckRef.current.rotation, { y: Math.PI * 0.85, duration: 3, ease: "sine.inOut" }, "step3")
        .to(truckRef.current.position, { x: 0, y: -0.5, z: -15, duration: 3, ease: "power2.inOut" }, "step3")
        .to(text3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "expo.out" }, "step3+=1.5")
        
      // EFECTO DESVANECIMIENTO PARA LA SIGUIENTE SECCIÓN:
      // Esto hace que la escena 3D se oscurezca al final de su pin, fusionándose con la siguiente sección
      tl.to(containerRef.current, { opacity: 0, duration: 2, ease: "power1.inOut" }, "step3+=2.5")

      // Crucial: Al crear este pin asíncrono, desplazamos todas las secciones de abajo.
      // Necesitamos reordenar y refrescar ScrollTrigger para que recalcule sus posiciones.
      setTimeout(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      }, 200)

    }, containerRef)

    return () => ctx.revert() // Importantísimo: limpiar instancias de GSAP al desmontar
  }, [modelLoaded])

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#05090f] overflow-hidden">
      
      {/* Decoración Ambiental */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      {/* TEXTO FLOTANTE UI */}
      <div className="absolute inset-0 z-10 pointer-events-none container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SCENE 1 TEXT */}
        <div ref={text1Ref} className="absolute top-[25%] left-4 lg:left-12 max-w-xl md:top-1/3">
          <p className="text-primary font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-3">Especialistes</p>
          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-black text-white uppercase leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
            Logística <br/><span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>A Mida</span>
          </h2>
          <p className="text-slate-300 font-light text-lg border-l-2 border-primary pl-4 backdrop-blur-sm bg-black/10 rounded-r-xl py-2">
            Traslladem allò que d'altres no poden. Plataformes expansibles i vehicles especialitzats per a maquinària d'obra.
          </p>
        </div>

        {/* SCENE 2 TEXT */}
        <div ref={text2Ref} className="absolute top-[30%] -translate-y-1/2 right-4 lg:right-12 max-w-xl text-right md:top-1/2">
          <p className="text-primary font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-3">Potència i Fiabilitat</p>
          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-black text-white uppercase leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
            Fins a <br/><span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>90 Tones</span>
          </h2>
          <p className="text-slate-300 font-light text-lg border-r-2 border-primary pr-4 backdrop-blur-sm bg-black/10 rounded-l-xl py-2 ml-auto">
            Disposant d'una àmplia flota amb camions grues amb plomes de 38 metres i plataformes extensibles exclusives.
          </p>
        </div>

        {/* SCENE 3 TEXT */}
        <div ref={text3Ref} className="absolute top-1/3 left-1/2 -translate-x-1/2 max-w-3xl text-center w-full px-4 flex flex-col items-center">
          <div className="w-px h-16 bg-primary mb-4 hidden md:block"></div>
          <p className="text-primary font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-3">Rendiment Connectat</p>
          <h2 className="text-5xl md:text-8xl lg:text-[120px] font-black text-white uppercase leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
            Ruta sense <br/><span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>Límits</span>
          </h2>
          <p className="text-slate-300 font-light text-xl md:text-2xl max-w-2xl mx-auto backdrop-blur-sm bg-black/10 rounded-xl py-2 px-6">
            Lliuraments nacionals i internacionals. Experiència, control i puntualitat en cadascun dels quilòmetres.
          </p>
        </div>
      </div>

      {/* EVENTO 3D */}
      <div className="absolute inset-0 z-0 h-full w-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 12], fov: 40 }} dpr={[1, 2]}>
          <fog attach="fog" args={['#05090f', 5, 22]} />
          
          {/* Luces cinematográficas */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
          <spotLight position={[-10, 5, -5]} angle={0.3} penumbra={1} intensity={2} color="#2ca0cc" />
          <spotLight position={[10, 0, 5]} angle={0.4} penumbra={1} intensity={1} color="#1b4b6b" />
          
          <Suspense fallback={
            <Html center>
              <div className="flex flex-col items-center gap-4 bg-[#05090f]/90 p-8 rounded-2xl backdrop-blur-md">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-primary rounded-full animate-spin"></div>
                <span className="text-white text-xs tracking-[0.2em] uppercase font-bold">Generant actiu 3D...</span>
              </div>
            </Html>
          }>
            <Float
              speed={2} 
              rotationIntensity={0.1} 
              floatIntensity={0.2}
              floatingRange={[-0.05, 0.05]}
            >
              <TruckModel truckRef={truckRef} onLoad={() => setModelLoaded(true)} />
            </Float>
            <ContactShadows position={[0, -1, 0]} opacity={0.7} scale={20} blur={3} far={10} color="#000000" resolution={512} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

    </section>
  )
}
