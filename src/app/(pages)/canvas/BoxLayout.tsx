'use client'

import React, { useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export default function BoxLayout() {
  // Load the cardboard GLB model
  const { scene } = useGLTF('/cardboard_box.glb')
  const router = useRouter()
  
  // State for tracking selected box
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [hoveredBox, setHoveredBox] = useState<number | null>(null)

  // Box data with packaging information
  const boxes = [
    {
      id: 1,
      position: [1.3, -2.5, 1] as [number, number, number],
      scale: [4, 2, 3] as [number, number, number],
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
      position: [3.33, -1.7, 0] as [number, number, number],
      scale: [1, 6, 5] as [number, number, number],
      name: "Fragile Items",
      contents: "LED Screen Display",
      packaging: [
        "Heavy-duty Carton",
        "Corner Protectors",
        "Bubble Wrap",
        "Screen Panel"
      ]
    }
  ]

  const handleBoxClick = (boxId: number) => {
    setSelectedBox(selectedBox === boxId ? null : boxId)
  }

  const handleBoxDoubleClick = (boxId: number) => {
    router.push(`/box/${boxId}`)
  }

  return (
    <>
      {/* Container with wireframe boundaries only */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 6, 4]} />
        <meshStandardMaterial 
          color="#004c91" 
          wireframe
        />
      </mesh>

      {/* Render boxes with interactions */}
      {boxes.map((box) => (
        <group key={box.id}>
          {/* Highlight outline for selected box */}
          {selectedBox === box.id && (
            <mesh position={box.position} scale={[box.scale[0] * 1.1, box.scale[1] * 1.1, box.scale[2] * 1.1]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial 
                color="#FFD700" 
                wireframe 
                transparent 
                opacity={0.8}
              />
            </mesh>
          )}
          
          {/* Hover outline */}
          {hoveredBox === box.id && selectedBox !== box.id && (
            <mesh position={box.position} scale={[box.scale[0] * 1.05, box.scale[1] * 1.05, box.scale[2] * 1.05]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial 
                color="#FFFF00" 
                wireframe 
                transparent 
                opacity={0.4}
              />
            </mesh>
          )}

          {/* Cardboard box */}
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
            <primitive object={scene.clone()} />
          </group>

          {/* Package information display - subtle and fixed position */}
          {selectedBox === box.id && (
            <Html 
              position={[-6, 2, 0]} 
              center
            >
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
      ))}

      {/* Instructions - show only when hovering */}
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
