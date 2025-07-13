'use client'

import React, { useState } from 'react'

// Simulated AI model for package placement optimization
const packagePlacementAI = (packages: PackageInput[]) => {
  // This would normally call an AI model, but we'll simulate the logic
  const sortedPackages = [...packages].sort((a, b) => {
    // Sort by fragility (high fragility goes on top)
    const fragilityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 }
    if (fragilityOrder[a.fragility] !== fragilityOrder[b.fragility]) {
      return fragilityOrder[a.fragility] - fragilityOrder[b.fragility]
    }
    // Then by weight (heavier on bottom)
    return b.weight - a.weight
  })

  // Calculate optimal positions
  let currentY = -2.5
  const positions = sortedPackages.map((pkg, index) => {
    const position: [number, number, number] = [
      (index % 2) * 3 - 1.5, // Alternate left/right
      currentY,
      (Math.floor(index / 2) % 2) * 2 - 1 // Alternate front/back
    ]
    currentY += (pkg.dimensions.height / 100) + 0.5 // Stack vertically with spacing
    return position
  })

  return {
    placements: sortedPackages.map((pkg, index) => ({
      ...pkg,
      position: positions[index],
      scale: [
        pkg.dimensions.width / 50,
        pkg.dimensions.height / 50,
        pkg.dimensions.depth / 50
      ] as [number, number, number],
      recommendation: generateRecommendation(pkg, index)
    })),
    summary: generateSummary(sortedPackages)
  }
}

const generateRecommendation = (pkg: PackageInput, index: number) => {
  const reasons = []
  if (pkg.fragility === 'High') {
    reasons.push('Placed on top due to high fragility')
  }
  if (pkg.weight > 5) {
    reasons.push('Heavy item - positioned for stability')
  }
  if (pkg.handlingInstructions.includes('upright')) {
    reasons.push('Oriented upright as specified')
  }
  if (index === 0) {
    reasons.push('Base layer for optimal weight distribution')
  }
  return reasons.join('. ')
}

const generateSummary = (packages: PackageInput[]) => {
  const totalWeight = packages.reduce((sum, pkg) => sum + pkg.weight, 0)
  const highFragilityCount = packages.filter(pkg => pkg.fragility === 'High').length
  const totalVolume = packages.reduce((sum, pkg) => 
    sum + (pkg.dimensions.width * pkg.dimensions.height * pkg.dimensions.depth), 0
  )

  return {
    totalWeight: totalWeight.toFixed(1),
    fragileItems: highFragilityCount,
    totalVolume: (totalVolume / 1000000).toFixed(2), // Convert to cubic meters
    efficiency: Math.min(95, 70 + (packages.length * 5)), // Simulated efficiency score
    recommendations: [
      'Fragile items placed on top layer',
      'Weight distribution optimized',
      'Handling instructions considered',
      'Space utilization maximized'
    ]
  }
}

interface PackageInput {
  id: string
  name: string
  fragility: 'Low' | 'Medium' | 'High'
  dimensions: {
    width: number
    height: number
    depth: number
  }
  weight: number
  handlingInstructions: string
  contents: string
}

interface PlacedPackage extends PackageInput {
  position: [number, number, number]
  scale: [number, number, number]
  recommendation: string
}

export default function ProductsPage() {
  const [packages, setPackages] = useState<PackageInput[]>([])
  const [currentPackage, setCurrentPackage] = useState<PackageInput>({
    id: '',
    name: '',
    fragility: 'Medium',
    dimensions: { width: 30, height: 20, depth: 25 },
    weight: 2,
    handlingInstructions: '',
    contents: ''
  })
  const [placementResult, setPlacementResult] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const addPackage = () => {
    if (!currentPackage.name || !currentPackage.contents) {
      alert('Please fill in name and contents')
      return
    }

    const newPackage = {
      ...currentPackage,
      id: Date.now().toString()
    }
    setPackages([...packages, newPackage])
    setCurrentPackage({
      id: '',
      name: '',
      fragility: 'Medium',
      dimensions: { width: 30, height: 20, depth: 25 },
      weight: 2,
      handlingInstructions: '',
      contents: ''
    })
  }

  const generatePlacement = async () => {
    if (packages.length === 0) {
      alert('Please add at least one package')
      return
    }

    setIsGenerating(true)
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result = packagePlacementAI(packages)
    setPlacementResult(result)
    setIsGenerating(false)
  }

  const clearAll = () => {
    setPackages([])
    setPlacementResult(null)
  }

  const removePackage = (packageId: string) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId))
    setPlacementResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-900">AI Package Optimization</h1>
          <p className="text-gray-600 mt-1">Input package details and get optimal placement recommendations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Package</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Package Name</label>
                <input
                  type="text"
                  value={currentPackage.name}
                  onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Electronics Box"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Contents</label>
                <input
                  type="text"
                  value={currentPackage.contents}
                  onChange={(e) => setCurrentPackage({...currentPackage, contents: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., PlayStation 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Fragility</label>
                <select
                  value={currentPackage.fragility}
                  onChange={(e) => setCurrentPackage({...currentPackage, fragility: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Dimensions (cm)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={currentPackage.dimensions.width}
                    onChange={(e) => setCurrentPackage({
                      ...currentPackage, 
                      dimensions: {...currentPackage.dimensions, width: Number(e.target.value)}
                    })}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    placeholder="Width"
                  />
                  <input
                    type="number"
                    value={currentPackage.dimensions.height}
                    onChange={(e) => setCurrentPackage({
                      ...currentPackage, 
                      dimensions: {...currentPackage.dimensions, height: Number(e.target.value)}
                    })}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    placeholder="Height"
                  />
                  <input
                    type="number"
                    value={currentPackage.dimensions.depth}
                    onChange={(e) => setCurrentPackage({
                      ...currentPackage, 
                      dimensions: {...currentPackage.dimensions, depth: Number(e.target.value)}
                    })}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    placeholder="Depth"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={currentPackage.weight}
                  onChange={(e) => setCurrentPackage({...currentPackage, weight: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Handling Instructions</label>
                <textarea
                  value={currentPackage.handlingInstructions}
                  onChange={(e) => setCurrentPackage({...currentPackage, handlingInstructions: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="e.g., Keep upright, fragile contents"
                />
              </div>

              <button
                onClick={addPackage}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Package
              </button>

              {packages.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearAll}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Clear All Packages
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Package Overview & AI Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Package Overview</h2>
              {packages.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {packages.length} Package{packages.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {/* AI Processing Status */}
            {isGenerating && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <div>
                    <p className="text-blue-900 font-medium">AI is calculating optimal placement...</p>
                    <p className="text-blue-600 text-sm">This may take a few moments</p>
                  </div>
                </div>
              </div>
            )}

            {placementResult && !isGenerating && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="text-green-600 mr-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-900 font-medium">AI Optimization Complete!</p>
                    <p className="text-green-600 text-sm">Placement recommendations generated successfully</p>
                  </div>
                </div>
              </div>
            )}

            {/* Package List */}
            {packages.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Added Packages</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {packages.map((pkg, index) => (
                    <div key={pkg.id} className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                              #{index + 1}
                            </span>
                            <p className="font-medium text-sm">{pkg.name}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              pkg.fragility === 'High' ? 'bg-red-100 text-red-800' :
                              pkg.fragility === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {pkg.fragility}
                            </span>
                          </div>
                          <p className="text-xs text-gray-700 mb-1">Contents: {pkg.contents}</p>
                          <p className="text-xs text-gray-600">
                            Dimensions: {pkg.dimensions.width}×{pkg.dimensions.height}×{pkg.dimensions.depth}cm
                          </p>
                          <p className="text-xs text-gray-600">Weight: {pkg.weight}kg</p>
                          {pkg.handlingInstructions && (
                            <p className="text-xs text-gray-600 mt-1">
                              Instructions: {pkg.handlingInstructions}
                            </p>
                          )}
                          {placementResult && (
                            <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                              <p className="text-xs text-blue-900 font-medium">AI Recommendation:</p>
                              <p className="text-xs text-blue-700">
                                {placementResult.placements.find((p: any) => p.id === pkg.id)?.recommendation}
                              </p>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removePackage(pkg.id)}
                          className="ml-3 text-red-500 hover:text-red-700 p-1"
                          title="Remove package"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {!isGenerating && !placementResult && (
                  <div className="mt-4">
                    <button
                      onClick={generatePlacement}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Generate AI Placement Optimization
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg text-gray-600 mb-2">No packages added yet</p>
                <p className="text-sm text-gray-500">Fill out the form on the left to add your first package</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Results Summary */}
        {placementResult && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Optimization Results</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{placementResult.summary.totalWeight}kg</div>
                <div className="text-sm text-gray-600">Total Weight</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{placementResult.summary.fragileItems}</div>
                <div className="text-sm text-gray-600">Fragile Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{placementResult.summary.totalVolume}m³</div>
                <div className="text-sm text-gray-600">Total Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{placementResult.summary.efficiency}%</div>
                <div className="text-sm text-gray-600">Efficiency Score</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">AI Recommendations</h3>
              <ul className="space-y-2">
                {placementResult.summary.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
