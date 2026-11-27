'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import type { Group } from 'three'

function Barbell() {
  const barbell = useRef<Group>(null)
  const orbit = useRef<Group>(null)

  useFrame(({ clock, pointer }) => {
    if (barbell.current) {
      barbell.current.rotation.y = Math.sin(clock.elapsedTime * 0.24) * 0.22 + pointer.x * 0.08
      barbell.current.rotation.x = pointer.y * 0.05
    }
    if (orbit.current) orbit.current.rotation.z = clock.elapsedTime * 0.12
  })

  return (
    <group position={[1.15, 0, 0]}>
      <group ref={orbit}>
        <mesh rotation={[0.45, 0.2, 0.25]}>
          <torusGeometry args={[2.02, 0.012, 8, 120]} />
          <meshBasicMaterial color="#f36100" transparent opacity={0.48} />
        </mesh>
        <mesh rotation={[0.45, -0.2, -0.18]}>
          <torusGeometry args={[2.2, 0.008, 8, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
      </group>
      <Float speed={1.15} floatIntensity={0.28} rotationIntensity={0}>
        <group ref={barbell} rotation={[0.06, 0, -0.16]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.055, 0.055, 3.2, 24]} />
            <meshStandardMaterial color="#b8b8b8" metalness={0.88} roughness={0.25} />
          </mesh>
          {[-1.12, -0.92, 0.92, 1.12].map((x, index) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[index % 2 === 0 ? 0.43 : 0.33, index % 2 === 0 ? 0.43 : 0.33, 0.13, 48]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? '#262626' : '#f36100'}
                metalness={index % 2 === 0 ? 0.38 : 0.2}
                roughness={index % 2 === 0 ? 0.52 : 0.35}
              />
            </mesh>
          ))}
          {[-1.32, 1.32].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.13, 0.13, 0.16, 32]} />
              <meshStandardMaterial color="#e4e4e4" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={3.2} color="#ffffff" />
      <pointLight position={[-3, 1, 3]} intensity={36} color="#f36100" />
      <Barbell />
    </>
  )
}

function SceneFallback() {
  return (
    <div className="hero-3d-fallback">
      <div className="fallback-orbit fallback-orbit-one" />
      <div className="fallback-orbit fallback-orbit-two" />
      <div className="fallback-barbell">
        <span className="fallback-plate fallback-plate-outer" />
        <span className="fallback-plate fallback-plate-inner" />
        <span className="fallback-shaft" />
        <span className="fallback-plate fallback-plate-inner" />
        <span className="fallback-plate fallback-plate-outer" />
      </div>
    </div>
  )
}

export function Hero3DScene() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [webglSupported, setWebglSupported] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    const testCanvas = document.createElement('canvas')
    const context = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')
    const debugInfo = context?.getExtension('WEBGL_debug_renderer_info')
    const rendererName = context && debugInfo ? String(context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : ''
    const canRender = Boolean(context && rendererName && !/llvmpipe|swiftshader|software/i.test(rendererName))
    context?.getExtension('WEBGL_lose_context')?.loseContext()

    updatePreference()
    const timeoutId = window.setTimeout(() => setWebglSupported(canRender), 120)
    preference.addEventListener('change', updatePreference)
    return () => {
      window.clearTimeout(timeoutId)
      preference.removeEventListener('change', updatePreference)
    }
  }, [])

  if (reducedMotion) return null

  return (
    <div className="hero-3d-scene" aria-hidden="true">
      {webglSupported ? (
        <Canvas camera={{ position: [0, 0, 7], fov: 39 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: false }}>
          <Scene />
        </Canvas>
      ) : (
        <SceneFallback />
      )}
    </div>
  )
}
