'use client'

import React, { useState, useEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'

export default function BoxLayout() {
  const { scene } = useGLTF('/cardboard_box.glb')
  const router = useRouter()
  const { scene: threeScene } = useThree()

  // Set background color on mount
  useEffect(() => {
    threeScene.background = new THREE.Color('#1a1a1a') // Dark container feel
  }, [threeScene])

  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [hoveredBox, setHoveredBox] = useState<number | null>(null)

  const boxes = [
    {
      id: 1,
      position: [1.3, -2.5, 1],
      scale: [4, 2, 3],
      name: "Electronics Package",
      contents: "PlayStation 5 Digital Edition",
      packaging: [
        "Outer Cardboard Box",
        "Foam Padding",
        "Anti-static Wrap",
        "Product"
      ]
    },
    {
      id: 2,
      position: [3.33, -1.7, 0],
      scale: [1, 6, 5],
      name: "Fragile Items",
      contents: "LED Screen Display",
      packaging: [
        "Heavy-duty Carton",
        "Corner Protectors",
        "Bubble Wrap",
        "Screen Panel"
      ]
    },
    {
      id: 3,
      position: [3.01, -1.87, -1.8],
      scale: [2, 5, 0.8],
      name: "Electronics Package",
      contents: "Apple Ipad Air",
      packaging: [
        "Outer Cardboard Box",
        "Foam Padding",
        "Anti-static Packing",
        "Bubble Wrap",
      ]
    },
    {
      id: 4,
      position: [1.89, -2.1, -0.75],
      scale: [2.5, 4, 2],
      name: "Books and Media",
      contents: "Thriller Novel Collection",
      packaging: [
        "Reinforced Cardboard Box",
        "Bubble Wrap",
        "Shrink Wrap",
        "Book Collection"
      ]
    },
    {
      id: 5,
      position: [2.28, -1.64, 0.56],
      scale: [1.4, 2.46, 1.56],
      name: "Clothes and Apparel",
      contents: "Football Jersey Set",
      packaging: [
        "Poly Mailer Bag",
        "Bubble Wrap",
        "Clothing Tag",
        "Football Jersey Set"
      ]
    },
    {
      id: 6,
      position: [0.79, -1.74, 1.51],
      scale: [5.3, 1.87, 1.3],
      name: "Sports Equipment",
      contents: "Yoga Mat",
      packaging: [
        "Plastic Wrap",
        "Cardboard Sleeve",
        "Yoga Mat"
      ]
    }
  ]

  const handleBoxClick = (boxId: number) => {
    setSelectedBox(selectedBox === boxId ? null : boxId)
  }

  const handleBoxDoubleClick = (boxId: number) => {
    router.push(`/box/${boxId}`)
  }

  function getBoxScene(isSelected: boolean, isDimmed: boolean) {
    const cloned = scene.clone(true)
    cloned.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const originalMaterial = child.material
        const newMaterial = originalMaterial.clone()
        if (isSelected) {
          newMaterial.color.set('#FFD700')
          newMaterial.emissive.set('#FFD700')
          newMaterial.emissiveIntensity = 0.3
          newMaterial.opacity = 1
          newMaterial.transparent = false
        } else if (isDimmed) {
          newMaterial.opacity = 0.3
          newMaterial.transparent = true
        } else {
          newMaterial.opacity = 1
          newMaterial.transparent = false
        }
        child.material = newMaterial
      }
    })
    return cloned
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 10, 5]} intensity={1} color="#ffffff" />

      {/* Ground plane to enhance visual realism */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.01, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Wireframe container */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 6, 4]} />
        <meshStandardMaterial color="#004c91" wireframe />
      </mesh>

      {/* Boxes */}
      {boxes.map((box) => {
        const isSelected = selectedBox === box.id
        const isDimmed = selectedBox !== null && !isSelected
        return (
          <group key={box.id}>
            <group 
              position={box.position} 
              scale={box.scale}
              onClick={(e) => {
                e.stopPropagation()
                handleBoxClick(box.id)
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                handleBoxDoubleClick(box.id)
              }}
              onPointerEnter={() => setHoveredBox(box.id)}
              onPointerLeave={() => setHoveredBox(null)}
            >
              <primitive object={getBoxScene(isSelected, isDimmed)} />
            </group>

            {isSelected && (
              <Html position={[-6, 2, 0]} center>
                <div className="bg-black bg-opacity-70 text-white p-3 rounded text-xs max-w-48 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold text-yellow-400 mb-1">{box.name}</h4>
                  <p className="text-gray-300 mb-2 text-xs">{box.contents}</p>
                  <div className="space-y-1">
                    {box.packaging.map((layer, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-200">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Html>
            )}
          </group>
        )
      })}

      {hoveredBox !== null && (
        <Html position={[0, -4, 0]} center>
          <div className="text-white bg-black bg-opacity-50 px-3 py-1 rounded text-xs">
            Click for details • Double-click for full view
          </div>
        </Html>
      )}
    </>
  )
}
