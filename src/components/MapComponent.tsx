'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Sample order clusters data (simulating real delivery data in Mumbai, India)
const orderClusters = [
  // High Priority (Red) - Urgent deliveries - Bandra West area
  { id: 1, lat: 19.0596, lng: 72.8295, type: 'high', count: 8, area: 'Linking Road, Bandra West' },
  { id: 2, lat: 19.0598, lng: 72.8298, type: 'high', count: 5, area: 'Hill Road, Bandra West' },
  { id: 3, lat: 19.0594, lng: 72.8292, type: 'high', count: 6, area: 'Turner Road, Bandra West' },
  
  // Standard (Yellow) - Regular deliveries - Andheri East cluster
  { id: 4, lat: 19.1136, lng: 72.8697, type: 'standard', count: 12, area: 'Chakala Road, Andheri East' },
  { id: 5, lat: 19.1138, lng: 72.8695, type: 'standard', count: 9, area: 'J.B. Nagar, Andheri East' },
  { id: 6, lat: 19.1134, lng: 72.8699, type: 'standard', count: 11, area: 'Marol Naka, Andheri East' },
  { id: 7, lat: 19.1140, lng: 72.8692, type: 'standard', count: 7, area: 'MIDC Road, Andheri East' },
  
  // Delivered (Green) - Completed deliveries - Powai area
  { id: 8, lat: 19.1197, lng: 72.9056, type: 'delivered', count: 15, area: 'Hiranandani Gardens, Powai' },
  { id: 9, lat: 19.1195, lng: 72.9058, type: 'delivered', count: 13, area: 'Central Avenue, Powai' },
  { id: 10, lat: 19.1199, lng: 72.9054, type: 'delivered', count: 14, area: 'Galleria Mall Area, Powai' },
  
  // Processing (Blue) - New category for orders being processed - Worli area
  { id: 11, lat: 19.0176, lng: 72.8179, type: 'processing', count: 4, area: 'Annie Besant Road, Worli' },
  { id: 12, lat: 19.0178, lng: 72.8181, type: 'processing', count: 6, area: 'Dr. E Moses Road, Worli' },
  { id: 13, lat: 19.0174, lng: 72.8177, type: 'processing', count: 5, area: 'Pandurang Budhkar Marg, Worli' },
  
  // Out for Delivery (Orange) - New category - Juhu area
  { id: 14, lat: 19.1075, lng: 72.8263, type: 'outfordelivery', count: 3, area: 'Juhu Tara Road, Juhu' },
  { id: 15, lat: 19.1077, lng: 72.8265, type: 'outfordelivery', count: 4, area: 'JVPD Scheme, Juhu' },
  { id: 16, lat: 19.1073, lng: 72.8261, type: 'outfordelivery', count: 2, area: 'Gulmohar Road, Juhu' },
  
  // Pending (Purple) - New category - Colaba area (very close street clustering)
  { id: 17, lat: 18.9067, lng: 72.8147, type: 'pending', count: 7, area: 'Colaba Causeway' },
  { id: 18, lat: 18.9069, lng: 72.8149, type: 'pending', count: 5, area: 'Mandlik Road, Colaba' },
  { id: 19, lat: 18.9065, lng: 72.8145, type: 'pending', count: 8, area: 'Arthur Bunder Road, Colaba' },
  { id: 20, lat: 18.9071, lng: 72.8151, type: 'pending', count: 4, area: 'Shahid Bhagat Singh Road, Colaba' },
]

const getClusterColor = (type: string) => {
  switch (type) {
    case 'high': return '#ef4444'         // Red - High priority
    case 'standard': return '#eab308'     // Yellow - Standard
    case 'delivered': return '#22c55e'    // Green - Delivered
    case 'processing': return '#3b82f6'   // Blue - Processing
    case 'outfordelivery': return '#f97316' // Orange - Out for delivery
    case 'pending': return '#8b5cf6'      // Purple - Pending
    default: return '#6b7280'             // Gray - Default
  }
}

const getClusterSize = (count: number) => {
  // Smaller sizes for street-level clustering
  if (count > 12) return 18
  if (count > 8) return 14
  if (count > 5) return 10
  return 8
}

export default function MapComponent() {
  useEffect(() => {
    // Fix for default markers in React Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  return (
    <MapContainer
      center={[19.0760, 72.8777]} // Mumbai, India coordinates
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      dragging={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {orderClusters.map((cluster) => (
        <CircleMarker
          key={cluster.id}
          center={[cluster.lat, cluster.lng]}
          radius={getClusterSize(cluster.count)}
          fillColor={getClusterColor(cluster.type)}
          color="#ffffff"
          weight={2}
          opacity={0.9}
          fillOpacity={0.7}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold text-gray-900 mb-1">{cluster.area}</div>
              <div className="text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Orders:</span>
                  <span className="font-medium">{cluster.count}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span>Status:</span>
                  <span 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      cluster.type === 'high' ? 'bg-red-100 text-red-800' :
                      cluster.type === 'standard' ? 'bg-yellow-100 text-yellow-800' :
                      cluster.type === 'delivered' ? 'bg-green-100 text-green-800' :
                      cluster.type === 'processing' ? 'bg-blue-100 text-blue-800' :
                      cluster.type === 'outfordelivery' ? 'bg-orange-100 text-orange-800' :
                      cluster.type === 'pending' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {cluster.type === 'high' ? 'High Priority' :
                     cluster.type === 'standard' ? 'Standard' :
                     cluster.type === 'delivered' ? 'Delivered' :
                     cluster.type === 'processing' ? 'Processing' :
                     cluster.type === 'outfordelivery' ? 'Out for Delivery' :
                     cluster.type === 'pending' ? 'Pending' : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
