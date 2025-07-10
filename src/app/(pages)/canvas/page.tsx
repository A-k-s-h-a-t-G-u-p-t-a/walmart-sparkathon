'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import BoxLayout from './BoxLayout'

export default function PackagingPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50">
      <Canvas 
        camera={{ position: [8, 6, 12], fov: 60 }}
        onClick={(e) => {
          // This will handle clicks on the canvas background
          e.stopPropagation()
        }}
      >
        <ambientLight intensity={0.6} color="#e6f3ff" />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#ffd700" />
        <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#004c91" />
        <fog attach="fog" args={['#e6f3ff', 20, 50]} />
        <Suspense fallback={null}>
          <BoxLayout />
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>
    </div>
  )
}
