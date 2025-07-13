'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Box data - this could be moved to a shared file later
const boxData = {
  '1': {
    id: 1,
    name: "Electronics Package",
    contents: "PlayStation 5 Digital Edition",
    packaging: [
      { layer: "Outer Cardboard Box", description: "Corrugated cardboard protection", color: "#8B4513" },
      { layer: "Foam Padding", description: "High-density foam insert", color: "#FFFACD" },
      { layer: "Anti-static Wrap", description: "Anti-static plastic wrap", color: "#E6E6FA" },
      { layer: "Product", description: "PlayStation 5 Digital Edition", color: "#F8F8FF" }
    ],
    dimensions: "40cm x 20cm x 30cm",
    weight: "4.2 kg",
    fragility: "Medium",
    handlingInstructions: "Keep upright, handle with care"
  },
  '2': {
    id: 2,
    name: "Fragile Items",
    contents: "LED Screen Display",
    packaging: [
      { layer: "Heavy-duty Carton", description: "Heavy-duty shipping box", color: "#8B4513" },
      { layer: "Corner Protectors", description: "Foam corner guards", color: "#FFFACD" },
      { layer: "Bubble Wrap", description: "Air-cushioned protection", color: "#E0E0E0" },
      { layer: "Screen Panel", description: "LED Display Screen", color: "#2F4F4F" }
    ],
    dimensions: "60cm x 90cm x 5cm",
    weight: "8.7 kg",
    fragility: "High",
    handlingInstructions: "THIS SIDE UP - Fragile electronics inside"
  },
  '3': {
    id: 3,
    name: "Electronics Package",
    contents: "Apple Ipad Air",
    packaging: [
      { layer: "Outer Cardboard Box", description: "Corrugated cardboard protection", color: "#8B4513" },
      { layer: "Foam Padding", description: "High-density foam insert", color: "#FFFACD" },
      { layer: "Anti-static Packing", description: "Anti-static bubble wrap", color: "#E0E0E0" },
      { layer: "Bubble Wrap", description: "Air-cushioned protection", color: "#2F4F4F" }
    ],
    dimensions: "24cm x 18cm x 0.7cm",
    weight: "0.5 kg",
    fragility: "High",
    handlingInstructions: "THIS SIDE UP - Fragile electronics inside"
  },
  '4': {
    id: 4,
    name: "Books and Media",
    contents: "Thriller Novel Collection",
    packaging: [
      { layer: "Reinforced Cardboard Box", description: "Sturdy protection for books", color: "#8B4513" },
      { layer: "Bubble Wrap", description: "Air-cushioned protection", color: "#FFFACD" },
      { layer: "Shrink Wrap", description: "Tight-fitting plastic wrap", color: "#E0E0E0" },
      { layer: "Book Collection", description: "Collection of thriller novels", color: "#2F4F4F" }
    ],
    dimensions: "24cm x 18cm x 15cm",
    weight: "4.5 kg",
    fragility: "Low",
    handlingInstructions: "Handle with care - Books inside"
  },
  '5': {
    id: 5,
    name: "Clothes and Apparel",
    contents: "Football Jersey Set",
    packaging: [
      { layer: "Poly Mailer Bag", description: "Lightweight and durable bag", color: "#8B4513" },
      { layer: "Bubble Wrap", description: "Air-cushioned protection", color: "#FFFACD" },
      { layer: "Clothing Tag", description: "Tag with size and care instructions", color: "#E0E0E0" },
      { layer: "Football Jersey Set", description: "Set of football jerseys", color: "#2F4F4F" }
    ],
    dimensions: "24cm x 45cm x 15cm",
    weight: "0.2 kg",
    fragility: "Low",
    handlingInstructions: "Handle with care - Clothing inside"
  },
  '6': {
    id: 6,
    name: "Sports Equipment",
    contents: "Yoga Mat",
    packaging: [
      { layer: "Plastic Wrap", description: "Protective plastic covering", color: "#8B4513" },
      { layer: "Cardboard Sleeve", description: "Sturdy cardboard protection", color: "#FFFACD" },
      { layer: "Yoga Mat", description: "High-density foam mat", color: "#E0E0E0" },
    ],
    dimensions: "24cm x 45cm x 15cm",
    weight: "0.2 kg",
    fragility: "Low",
    handlingInstructions: "Handle with care - Sports Equipment inside"
  }
}

export default function BoxDetailPage() {
  const params = useParams()
  const boxId = params.boxId as string
  const box = boxData[boxId as keyof typeof boxData]

  if (!box) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Box Not Found</h1>
          <p className="text-gray-600 mb-6">The requested box details could not be found.</p>
          <Link 
            href="/canvas"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Canvas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{box.name}</h1>
            <p className="text-gray-600">Detailed Package Information</p>
          </div>
          <Link 
            href="/canvas"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            ← Back to Canvas
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Overview</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Contents</label>
                <p className="text-lg text-gray-900">{box.contents}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Dimensions</label>
                <p className="text-lg text-gray-900">{box.dimensions}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Weight</label>
                <p className="text-lg text-gray-900">{box.weight}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Fragility Level</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  box.fragility === 'High' ? 'bg-red-100 text-red-800' :
                  box.fragility === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {box.fragility}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Handling Instructions</label>
                <p className="text-lg text-gray-900">{box.handlingInstructions}</p>
              </div>
            </div>
          </div>

          {/* Packaging Layers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Packaging Layers</h2>
            <div className="space-y-4">
              {box.packaging.map((layer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: layer.color }}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{layer.layer}</h3>
                      <p className="text-sm text-gray-600">{layer.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Visualization Placeholder */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">3D Package Visualization</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-gray-600">3D model visualization would appear here</p>
              <p className="text-sm text-gray-500 mt-2">Box ID: {box.id}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex space-x-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
            Download Package Report
          </button>
          <button className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors">
            Print Labels
          </button>
          <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors">
            Track Package
          </button>
        </div>
      </div>
    </div>
  )
}
