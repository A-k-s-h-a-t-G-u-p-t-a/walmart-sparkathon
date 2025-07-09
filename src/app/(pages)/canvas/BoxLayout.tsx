'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface Item {
  id: string
  width: number
  height: number
  depth: number
  position: [number, number, number]
  color: string
}

const items: Item[] = [
  { id: 'item1', width: 1, height: 1, depth: 1, position: [0, 0, 0], color: 'red' },
  { id: 'item2', width: 1, height: 2, depth: 1, position: [1.2, 0, 0], color: 'blue' },
  { id: 'item3', width: 1.5, height: 1, depth: 1, position: [0, 1.2, 0], color: 'green' },
]

export default function BoxLayout() {
  const outerRef = useRef<THREE.Mesh>(null)

  return (
    <>
      {/* Outer Packaging Box (Transparent) */}
      <mesh ref={outerRef} position={[0, 0, 0]}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="gray" transparent opacity={0.8} wireframe />
      </mesh>

      {/* Render Inner Items */}
      {items.map((item) => (
        <mesh key={item.id} position={item.position}>
          <boxGeometry args={[item.width, item.height, item.depth]} />
          <meshStandardMaterial color={item.color} />
        </mesh>
      ))}
    </>
  )
}
