'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import BoxLayout from './BoxLayout'

export default function PackagingPage() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <BoxLayout />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
