'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
})

interface MapOverlayProps {
  isVisible: boolean
  onToggle: () => void
}

export default function MapOverlay({ isVisible, onToggle }: MapOverlayProps) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow border border-gray-200"
        title={isVisible ? "Hide Map" : "Show Order Map"}
      >
        <svg 
          className="w-6 h-6 text-blue-600" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Map Overlay */}
      {isVisible && (
        <div className="absolute top-4 left-4 z-40 w-80 h-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Map Header */}
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">Mumbai Delivery Distribution</h3>
              <p className="text-xs text-blue-100">Live street-level clusters</p>
            </div>
            <button
              onClick={onToggle}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Map Content */}
          <div className="h-48 relative">
            <DynamicMap />
          </div>

          {/* Legend */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 text-[10px]">High Priority</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 text-[10px]">Standard</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 text-[10px]">Delivered</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 text-[10px]">Processing</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600 text-[10px]">Out for Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 text-[10px]">Pending</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-gray-500 font-medium text-xs">127 Orders • Mumbai, India</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
