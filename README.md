# 🚚 Walmart Logistics & Package Optimization Platform

![Walmart Logistics](https://img.shields.io/badge/Walmart-Logistics-0071ce?style=for-the-badge&logo=walmart)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.178.0-000000?style=for-the-badge&logo=three.js)

A modern, AI-powered logistics and package optimization platform built for Walmart's supply chain operations. This application combines 3D visualization, real-time mapping, and intelligent package placement algorithms to streamline delivery operations.

## 🌟 Features

### 🎯 **AI Package Optimization**
- **Smart Placement Algorithm**: AI-powered package arrangement based on fragility, weight, and handling instructions
- **Real-time Recommendations**: Intelligent suggestions for optimal package positioning
- **Efficiency Scoring**: Advanced metrics showing space utilization and optimization results
- **Interactive Package Management**: Add, remove, and organize packages with detailed specifications

### 📦 **3D Visualization**
- **Interactive 3D Canvas**: Immersive container visualization using React Three Fiber
- **Real-time Package Interaction**: Click, hover, and manipulate packages in 3D space
- **Detailed Box Views**: Comprehensive package information with layered visualization
- **Walmart-themed Design**: Professional UI matching Walmart's corporate branding

### 🗺️ **Live Delivery Mapping**
- **Mumbai Street-Level Clustering**: Real-time delivery distribution across Mumbai, India
- **6-Status Color System**: 
  - 🔴 **High Priority** - Urgent deliveries
  - 🟡 **Standard** - Regular deliveries  
  - 🟢 **Delivered** - Completed orders
  - 🔵 **Processing** - Orders being processed
  - 🟠 **Out for Delivery** - En route packages
  - 🟣 **Pending** - Awaiting processing
- **Interactive Clusters**: Click for detailed order information
- **Street-Level Detail**: Micro-clustering on the same roads and neighborhoods

### 🎨 **Professional UI/UX**
- **Walmart Branding**: Authentic blue (#004c91) and yellow (#ffc220) color scheme
- **Responsive Design**: Mobile-friendly layouts and interactions
- **Smooth Animations**: Professional transitions and hover effects
- **Intuitive Navigation**: Easy-to-use interface for all skill levels

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20.11.0 or higher
- **npm** 10.8.2 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/A-k-s-h-a-t-G-u-p-t-a/walmart-sparkathon.git
   cd walmart-sparkathon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
walmart-hack/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (pages)/
│   │   │   ├── canvas/               # 3D Container Visualization
│   │   │   │   ├── page.tsx          # Main 3D canvas page
│   │   │   │   └── BoxLayout.tsx     # 3D container and box logic
│   │   │   └── products/             # AI Package Optimization
│   │   │       └── page.tsx          # Products input and AI processing
│   │   ├── box/
│   │   │   └── [boxId]/              # Dynamic box detail pages
│   │   │       └── page.tsx          # Individual package view
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage/Dashboard
│   └── components/
│       ├── MapOverlay.tsx            # Map toggle and overlay component
│       └── MapComponent.tsx          # Leaflet map with clusters
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 15.3.5** - React framework with App Router
- **React 19.0.0** - UI library with latest features
- **TypeScript** - Type-safe development

### **3D Visualization**
- **Three.js 0.178.0** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### **Mapping & Geolocation**
- **Leaflet 1.9.4** - Open-source mapping library
- **React Leaflet** - React components for Leaflet
- **OpenStreetMap** - Free map tiles (no API key required)

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom Walmart Theme** - Brand-consistent color palette
- **Responsive Design** - Mobile-first approach

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 📱 Pages & Features

### 🏠 **Homepage** (`/`)
- Walmart-branded navigation and dashboard
- Quick access to all platform features
- Professional corporate layout

### 📦 **Products Page** (`/products`)
- **Package Input Form**: Name, contents, fragility, dimensions, weight, handling instructions
- **AI Processing**: 2-second simulation of AI calculation
- **Real-time Package List**: Live updates as packages are added
- **AI Results Dashboard**: Efficiency metrics and recommendations
- **Package Management**: Add, remove, and organize packages

### 🎯 **3D Canvas** (`/canvas`)
- **Interactive 3D Container**: Wireframe cargo container visualization
- **Clickable Packages**: Hover effects and selection highlighting
- **Info Panels**: Detailed package information on interaction
- **Map Overlay**: Toggle street-level delivery clusters
- **Navigation**: Double-click to view detailed package pages

### 📋 **Package Details** (`/box/[boxId]`)
- **Detailed Package View**: Comprehensive package information
- **Packaging Layers**: Visual breakdown of package contents
- **Error Handling**: Graceful handling of invalid package IDs

## 🤖 AI Algorithm Features

### **Smart Sorting Logic**
```typescript
// Fragility-first sorting (High -> Medium -> Low)
const fragilityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 }

// Weight-based secondary sorting (Heavy on bottom)
return b.weight - a.weight
```

### **Intelligent Positioning**
- **Vertical Stacking**: Fragile items placed on top
- **Weight Distribution**: Heavy items form stable base
- **Spatial Optimization**: Efficient use of container space
- **Handling Instructions**: Respects special requirements (upright, fragile)

### **Recommendation Engine**
- **Placement Reasoning**: Detailed explanations for each decision
- **Efficiency Scoring**: Real-time optimization metrics
- **Best Practices**: Industry-standard logistics recommendations

## 🗺️ Mumbai Delivery Clusters

### **Geographic Coverage**
- **Bandra West**: Linking Road, Hill Road, Turner Road
- **Andheri East**: Chakala Road, J.B. Nagar, Marol Naka
- **Powai**: Hiranandani Gardens, Central Avenue, Galleria Mall
- **Worli**: Annie Besant Road, Dr. E Moses Road
- **Juhu**: Juhu Tara Road, JVPD Scheme, Gulmohar Road
- **Colaba**: Colaba Causeway, Mandlik Road, Arthur Bunder Road

### **Real-time Metrics**
- **127 Total Orders** across Mumbai
- **Street-level clustering** with 2-15 orders per cluster
- **6 delivery status categories** with color coding
- **Interactive popups** with detailed order information

## 🎨 Design System

### **Walmart Brand Colors**
```css
--walmart-blue: #004c91    /* Primary brand color */
--walmart-yellow: #ffc220  /* Secondary accent color */
--walmart-light-blue: #0066cc  /* Interactive elements */
```

### **Status Colors**
```css
--high-priority: #ef4444     /* Red - Urgent */
--standard: #eab308          /* Yellow - Regular */
--delivered: #22c55e         /* Green - Complete */
--processing: #3b82f6        /* Blue - In progress */
--out-for-delivery: #f97316  /* Orange - En route */
--pending: #8b5cf6           /* Purple - Waiting */
```

## 🚀 Performance Features

- **Dynamic Imports**: Code splitting for optimal loading
- **SSR-Safe Components**: Proper handling of client-side libraries
- **Optimized 3D Rendering**: Efficient Three.js performance
- **Responsive Images**: Adaptive loading for all devices
- **Fast Refresh**: Instant development feedback

## 📝 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Code linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Walmart Sparkathon and is intended for demonstration purposes.

## 👥 Team

Built with ❤️ for Walmart Sparkathon by [A-k-s-h-a-t-G-u-p-t-a](https://github.com/A-k-s-h-a-t-G-u-p-t-a)

## 🔮 Future Enhancements

- **Real AI Integration**: Connect with actual machine learning models
- **Backend API**: Database integration for persistent data
- **Advanced 3D Models**: More detailed package and container visualizations
- **Real-time Updates**: WebSocket integration for live order tracking
- **Mobile App**: React Native version for field operations
- **Analytics Dashboard**: Comprehensive logistics performance metrics

---

**Built for the future of logistics. Powered by innovation. 🚚✨**
