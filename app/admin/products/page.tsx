'use client'

import { useState, useEffect } from 'react'
import { Plus, Package, Archive, Zap, BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  color: string
  createdAt: string
  serviceCount: number
  productCount: number
}

interface Service {
  id: number
  name: string
  description: string
  categoryId: number
  categoryName: string
  basePrice: number
  unit: string
  createdAt: string
}

interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  categoryName: string
  price: number
  unit: string
  createdAt: string
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalServices: 0,
    totalProducts: 0,
    totalValue: 0
  })

  useEffect(() => {
    // Load data from localStorage
    const savedCategories = localStorage.getItem('homeware_product_categories')
    const savedServices = localStorage.getItem('homeware_product_services')
    const savedProducts = localStorage.getItem('homeware_product_products')

    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories)
      setCategories(parsedCategories)
    }

    if (savedServices) {
      const parsedServices = JSON.parse(savedServices)
      setServices(parsedServices)
    }

    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts)
      setProducts(parsedProducts)
    }

    // Calculate stats
    const totalCategories = savedCategories ? JSON.parse(savedCategories).length : 0
    const totalServices = savedServices ? JSON.parse(savedServices).length : 0
    const totalProducts = savedProducts ? JSON.parse(savedProducts).length : 0
    const totalValue = (savedServices ? JSON.parse(savedServices).reduce((sum: number, service: Service) => sum + service.basePrice, 0) : 0) +
                      (savedProducts ? JSON.parse(savedProducts).reduce((sum: number, product: Product) => sum + product.price, 0) : 0)

    setStats({
      totalCategories,
      totalServices,
      totalProducts,
      totalValue
    })
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Product Management</h1>
          <p className="text-slate-500">Manage categories, services, and products for your quotations.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.href = '/admin/products/categories'}
            className="inline-flex items-center gap-2 px-4 py-3 border border-slate-200 text-slate-700 font-black rounded-xl hover:bg-slate-50 transition-all"
          >
            <Archive className="h-5 w-5" />
            Manage Categories
          </button>
          <button
            onClick={() => window.location.href = '/admin/products/services'}
            className="inline-flex items-center gap-2 px-4 py-3 border border-slate-200 text-slate-700 font-black rounded-xl hover:bg-slate-50 transition-all"
          >
            <Zap className="h-5 w-5" />
            Manage Services
          </button>
          <button
            onClick={() => window.location.href = '/admin/products/products'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Package className="h-5 w-5" />
            Manage Products
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Archive className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Categories</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.totalCategories}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Services</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.totalServices}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Products</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Value</p>
              <p className="text-3xl font-black text-slate-900 mt-1">AED {stats.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Categories */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900">Recent Categories</h2>
          <button
            onClick={() => window.location.href = '/admin/products/categories'}
            className="text-blue-600 hover:text-blue-700 font-bold text-sm"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((category) => (
            <div key={category.id} className="p-4 border border-slate-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="font-black text-slate-900">{category.name}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{category.description}</p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{category.serviceCount} services</span>
                <span>{category.productCount} products</span>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full text-center py-8">
              <Archive className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500">No categories created yet.</p>
              <button
                onClick={() => window.location.href = '/admin/products/categories'}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700"
              >
                Create First Category
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/admin/products/categories'}
            className="p-6 border-2 border-dashed border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
          >
            <Archive className="h-8 w-8 text-slate-400 group-hover:text-blue-600 mb-3" />
            <h3 className="font-black text-slate-900 mb-2">Add Category</h3>
            <p className="text-sm text-slate-600">Create new service categories to organize your offerings.</p>
          </button>
          <button
            onClick={() => window.location.href = '/admin/products/services'}
            className="p-6 border-2 border-dashed border-slate-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-left group"
          >
            <Zap className="h-8 w-8 text-slate-400 group-hover:text-green-600 mb-3" />
            <h3 className="font-black text-slate-900 mb-2">Add Service</h3>
            <p className="text-sm text-slate-600">Define services within categories for quotations.</p>
          </button>
          <button
            onClick={() => window.location.href = '/admin/products/products'}
            className="p-6 border-2 border-dashed border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
          >
            <Package className="h-8 w-8 text-slate-400 group-hover:text-purple-600 mb-3" />
            <h3 className="font-black text-slate-900 mb-2">Add Product</h3>
            <p className="text-sm text-slate-600">Add products and materials to your catalog.</p>
          </button>
        </div>
      </div>
    </div>
  )
}