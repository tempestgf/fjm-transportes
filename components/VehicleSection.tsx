"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Stage, PresentationControls, Environment, Center } from "@react-three/drei"
import { Suspense } from "react"
import * as THREE from "three"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Estado global para vincular el GSAP del DOM con el modelo 3D de Fiber
export const truckState = {
  rotationY: -Math.PI / 2.2,
}

function TruckModel(props: any) {
  const { nodes, materials } = useGLTF('/low_poly_truck.glb') as any
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // 1. Rotación 3D impulsada directamente por el scroll (GSAP) + pequeña vibración del motor
      groupRef.current.rotation.y = truckState.rotationY
      
      // 2. Vibración sutil del motor para darle vida
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 20) * 0.015
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.Trailer_Grey_0.geometry} material={materials.Grey} />
        <mesh geometry={nodes.Trailer_Orange_0.geometry} material={materials.Orange} />
        {/* Luces traseras brillantes */}
        <mesh geometry={nodes.Trailer_Red_0.geometry}>
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        <mesh geometry={nodes.Trailer_TruckBlack_0.geometry} material={materials.TruckBlack} />
        <mesh geometry={nodes.Trailer_TruckWhiteBody_0.geometry} material={materials.TruckWhiteBody} />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes.Truck_Grey_0.geometry} material={materials.Grey} />
        
        {/* Faros delanteros reemplazados con material brillante amarillo */}
        <mesh geometry={nodes.Truck_Lights_0.geometry}>
          <meshBasicMaterial color="#ffcc00" />
          <pointLight position={[0, 0, 0]} color="#ffddaa" intensity={200} distance={1000} decay={2} />
        </mesh>
        
        <mesh geometry={nodes.Truck_Screen_0.geometry} material={materials.Screen} />
        <mesh geometry={nodes.Truck_TruckBlack_0.geometry} material={materials.TruckBlack} />
        <mesh geometry={nodes.Truck_TruckWhiteBody_0.geometry} material={materials.TruckWhiteBody} />
      </group>
    </group>
  )
}

const vehicleSpecs = [
  { metric: "1.000 KG", title: "Càrrega Lleugera", desc: "Transports de càrregues fins a 1.000 kg" },
  { metric: "3.500 KG", title: "Càrrega Mitjana", desc: "Transports de càrregues de 3.500 Kg" },
  { metric: "16 TN", title: "Càrrega Pesant", desc: "Transport de càrregues fins a 16 Tn" },
  { metric: "24 TN", title: "Gran Tonatge", desc: "Transports de càrregues fins a 24 Tn" },
  { metric: "14-38 M", title: "Camions Grues", desc: "Amb plomes de 14 a 38 metres d'extensió" },
  { metric: "VOLUM", title: "Góndoles Especials", desc: "Extensibles per a dipòsits de gran volum" },
  { metric: "90 TN", title: "Càrrega Extrema", desc: "Gòndoles i plataformes per a maquinària superpesant" },
  { metric: "30 M", title: "Plataformes", desc: "Estructures extensibles fins a 30 metres" },
  { metric: "0,60 M", title: "Maquinària d'Obra", desc: "Góndoles amb rampes especials (distància del sòl)" }
]

export function VehiclesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Textos de título en cascada
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      })

      // 3. Animación de las filas de la tabla de especificaciones
      const rows = gsap.utils.toArray(".spec-row")
      gsap.fromTo(rows, 
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
          }
        }
      )

      // 4. Aparición del modelo 3D: De pequeño a grande sin difuminar (opacity fija)
      gsap.fromTo(".model-3d-container", 
        { scale: 0, y: 100, opacity: 1 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "top 20%",
            scrub: 1,
          }
        }
      )

      // 5. Rotación 3D progresiva con el scroll — muestra el perfil del camión
      gsap.to(truckState, {
        rotationY: -Math.PI / 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: 2,
        }
      })

      // 5. Animación de la galería final (Efecto Parallax Scroll)
      gsap.fromTo(".massive-footer-gallery",
        { x: "5%" },
        {
          x: "-25%",
          ease: "none",
          scrollTrigger: {
            trigger: ".massive-footer-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="vehicles" 
      className="relative z-50 w-full overflow-hidden bg-[#f4f4f4] text-[#000000] pt-12 pb-24"
    >
      {/* Background pattern para mantener la continuidad */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#000000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container relative mx-auto px-4 md:px-8 lg:px-12 z-10 max-w-[1600px]">
        
        {/* Floating 3D Model — fijo en la derecha, parallax sutil */}
        <div 
          className="model-3d-container absolute top-[0%] right-[-2%] w-[52vw] h-[52vw] max-w-[700px] max-h-[700px] pointer-events-none z-20 hidden lg:block"
        >
          <Suspense fallback={null}>
            <Canvas camera={{ position: [-8, 4, 10], fov: 40 }}>
              <ambientLight intensity={0.7} />
              <Suspense fallback={null}>
                <Stage environment="city" intensity={0.5} adjustCamera={1.2} shadows={false}>
                  <PresentationControls
                    global={false}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 3, tension: 800 }}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                  >
                    <Center>
                      <TruckModel />
                    </Center>
                  </PresentationControls>
                </Stage>
              </Suspense>
            </Canvas>
          </Suspense>
        </div>

        {/* Cabecera Brutalista */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 md:mb-32 relative z-10 gap-8">
          <div className="flex flex-col pointer-events-auto">
            <div className="reveal-text inline-flex w-fit items-center px-4 py-2 rounded-full border border-[#000000]/10 text-[#000000] font-mono tracking-widest text-[10px] uppercase mb-12 bg-[#ffffff] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary mr-3"></span>
              Capacitat Operativa
            </div>
            
            <h2 className="text-6xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-[#000000]">
              <span className="reveal-text block relative z-20">Els nostres</span>
              <span className="reveal-text block italic font-serif text-primary lowercase tracking-normal relative z-20">vehicles</span>
            </h2>
          </div>
        </div>

        {/* Línea separadora principal */}
        <div className="w-full h-px bg-[#ffffff]/10 mb-12" />

        {/* Tabla de Especificaciones Ténicas */}
        <div className="w-full flex justify-center">
          <div ref={listRef} className="w-full max-w-6xl flex flex-col">
            {/* Cabecera de la tabla (Solo visible en Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-8 pb-4 border-b border-[#000000]/20 font-mono text-xs uppercase tracking-widest text-primary">
              <div className="col-span-2">Mètrica Clau</div>
              <div className="col-span-4">Categoria</div>
              <div className="col-span-6">Especificació Tècnica</div>
            </div>

            {/* Filas de la Tabla */}
            {vehicleSpecs.map((spec, index) => (
              <div 
                key={index} 
                className="spec-row group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-6 md:py-8 border-b border-[#000000]/10 hover:border-primary transition-colors duration-500"
              >
                {/* Métrica Gigante */}
                <div className="col-span-1 md:col-span-2">
                  <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#000000] group-hover:pl-2 transition-all duration-300">
                    {spec.metric}
                  </span>
                </div>
                
                {/* Categoría / Título */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  <span className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#000000]/80 group-hover:text-primary transition-colors duration-300">
                    {spec.title}
                  </span>
                </div>

                {/* Descripción detallada */}
                <div className="col-span-1 md:col-span-6">
                  <p className="text-sm md:text-base font-mono text-[#000000]/60 uppercase tracking-wide leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Brutalista: Galería de Imágenes Parallax */}
      <div className="massive-footer-container relative w-full h-[40vh] md:h-[50vh] mt-24 flex items-center overflow-hidden bg-[#f4f4f4] border-t border-[#000000]/10">
        <div className="absolute inset-0 opacity-5 z-0" style={{ backgroundImage: "radial-gradient(#000000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        <div className="massive-footer-gallery flex gap-4 md:gap-8 whitespace-nowrap px-8 md:px-12 z-10 w-max pointer-events-auto cursor-ew-resize">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
             <div key={i} className="w-[60vw] md:w-[35vw] lg:w-[25vw] h-[25vh] md:h-[35vh] rounded-[2rem] overflow-hidden flex-shrink-0 relative group shadow-lg">
               <div className="absolute inset-0 bg-[#000000]/20 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" />
               <img 
                 src={i % 2 === 0 ? "/media/fleet-truck-30.jpeg" : "/media/fleet-truck-05.jpeg"} 
                 alt={`Vehículo de flota ${i + 1}`}
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] grayscale group-hover:grayscale-0"
               />
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}