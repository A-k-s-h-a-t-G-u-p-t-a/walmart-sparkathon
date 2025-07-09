import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#004c91] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-[#ffc220] text-[#004c91] px-3 py-1 rounded font-bold text-xl">
                  Walmart
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  href="/"
                  className="hover:bg-[#0066cc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard"
                  className="hover:bg-[#0066cc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/products"
                  className="hover:bg-[#0066cc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Products
                </Link>
                <Link 
                  href="/services"
                  className="hover:bg-[#0066cc] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Services
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="hover:bg-[#0066cc] p-2 rounded-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#004c91] to-[#0066cc] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save Money. Live Better.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover amazing deals on everything you need, from groceries to electronics, all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#ffc220] text-[#004c91] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#ffb700] transition-colors">
                Shop Now
              </button>
              <Link 
                href="/dashboard"
                className="bg-white text-[#004c91] px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Walmart?</h2>
            <p className="text-xl text-gray-600">Everything you need, all in one place</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#004c91] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Low Prices</h3>
              <p className="text-gray-600">Everyday low prices on millions of items</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#004c91] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your items delivered quickly to your door</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-[#004c91] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">100% satisfaction guarantee on all products</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#ffc220] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#004c91] mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-[#004c91] mb-8">Join millions of customers who trust Walmart for their everyday needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#004c91] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#003d73] transition-colors">
              Browse Products
            </button>
            <Link 
              href="/dashboard"
              className="bg-white text-[#004c91] px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors border-2 border-[#004c91]"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#004c91] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="bg-[#ffc220] text-[#004c91] px-3 py-1 rounded font-bold text-xl mb-4 inline-block">
                Walmart
              </div>
              <p className="text-gray-300">Save Money. Live Better.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">All Departments</a></li>
                <li><a href="#" className="hover:text-white">Weekly Ads</a></li>
                <li><a href="#" className="hover:text-white">Clearance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><a href="#" className="hover:text-white">My Account</a></li>
                <li><a href="#" className="hover:text-white">Order History</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Walmart Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
