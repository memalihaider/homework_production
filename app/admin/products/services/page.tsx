'use client'

import { useState, useEffect } from 'react'
import { Plus, Zap, Edit, Trash2, X, Check, Archive, Grid, List, Search, Filter, Star, Clock, Users } from 'lucide-react'

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
  price?: number // Add price field for compatibility
  unit: string
  image?: string
  createdAt: string
  rating?: number
  duration?: string
  popularity?: number
  featured?: boolean
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    categoryId: 0,
    basePrice: 0,
    unit: 'sq ft',
    duration: '',
    featured: false
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedCategories = localStorage.getItem('homeware_product_categories')
    let savedServices = localStorage.getItem('homeware_product_services')

    // Initialize with enhanced mock data if none exists
    if (!savedServices) {
      const mockServices: Service[] = [
        // Cleaning Services Category (ID: 1)
        {
          id: 1,
          name: 'Residential Cleaning',
          description: 'Complete home cleaning service including dusting, vacuuming, mopping, bathroom cleaning, and kitchen sanitization. Perfect for regular maintenance and deep cleaning needs.',
          categoryId: 1,
          categoryName: 'Cleaning Services',
          basePrice: 2.5,
          price: 2.5,
          unit: 'sq ft',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          duration: '2-4 hours',
          popularity: 95,
          featured: true
        },
        {
          id: 2,
          name: 'Commercial Office Cleaning',
          description: 'Professional office cleaning service including workspace sanitization, common area maintenance, and waste management. Ideal for corporate environments.',
          categoryId: 1,
          categoryName: 'Cleaning Services',
          basePrice: 2.8,
          price: 2.8,
          unit: 'sq ft',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          duration: '3-6 hours',
          popularity: 88,
          featured: false
        },
        {
          id: 3,
          name: 'Deep Cleaning Service',
          description: 'Intensive deep cleaning for hard-to-reach areas, including behind furniture, inside appliances, and detailed sanitization. Recommended quarterly.',
          categoryId: 1,
          categoryName: 'Cleaning Services',
          basePrice: 4.5,
          price: 4.5,
          unit: 'sq ft',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.9,
          duration: '4-8 hours',
          popularity: 92,
          featured: true
        },
        {
          id: 4,
          name: 'Medical Facility Sanitization',
          description: 'Medical-grade sanitization and cleaning service compliant with healthcare standards. Includes antimicrobial treatments and sterilization protocols.',
          categoryId: 1,
          categoryName: 'Cleaning Services',
          basePrice: 5.2,
          unit: 'sq ft',
          image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          duration: '6-12 hours',
          popularity: 78,
          featured: false
        },
        {
          id: 5,
          name: 'Carpet Cleaning',
          description: 'Professional carpet cleaning using advanced steam cleaning technology. Removes deep stains and eliminates allergens.',
          categoryId: 1,
          categoryName: 'Cleaning Services',
          basePrice: 3.5,
          unit: 'sq ft',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          duration: '2-3 hours',
          popularity: 85,
          featured: false
        },
        // Facility Maintenance Category (ID: 3)
        {
          id: 6,
          name: 'Facility Maintenance',
          description: 'Comprehensive facility maintenance including minor repairs, equipment servicing, and preventive maintenance to ensure optimal building condition.',
          categoryId: 3,
          categoryName: 'Facility Maintenance',
          basePrice: 15,
          unit: 'hour',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          duration: '1-4 hours',
          popularity: 76,
          featured: false
        },
        {
          id: 7,
          name: 'HVAC System Maintenance',
          description: 'Complete heating, ventilation, and air conditioning system maintenance including filter replacement, duct cleaning, and performance optimization.',
          categoryId: 3,
          categoryName: 'Facility Maintenance',
          basePrice: 25,
          unit: 'hour',
          image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          duration: '2-6 hours',
          popularity: 82,
          featured: true
        },
        {
          id: 8,
          name: 'Electrical System Check',
          description: 'Comprehensive electrical system inspection and maintenance including wiring checks, outlet testing, and safety compliance verification.',
          categoryId: 3,
          categoryName: 'Facility Maintenance',
          basePrice: 20,
          unit: 'hour',
          image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          duration: '1-3 hours',
          popularity: 89,
          featured: false
        },
        {
          id: 9,
          name: 'Plumbing Maintenance',
          description: 'Professional plumbing maintenance including leak detection, pipe inspection, and fixture servicing to prevent costly repairs.',
          categoryId: 3,
          categoryName: 'Facility Maintenance',
          basePrice: 18,
          unit: 'hour',
          image: 'https://images.unsplash.com/photo-1621905252472-943afaa20e20?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          duration: '1-2 hours',
          popularity: 81,
          featured: false
        },
        // Safety & Security Category (ID: 4)
        {
          id: 10,
          name: 'Security System Installation',
          description: 'Professional installation of security systems including cameras, alarms, and access control. Complete setup and testing included.',
          categoryId: 4,
          categoryName: 'Safety & Security',
          basePrice: 500,
          unit: 'system',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.7,
          duration: '4-8 hours',
          popularity: 91,
          featured: true
        },
        {
          id: 11,
          name: 'Fire Safety Inspection',
          description: 'Comprehensive fire safety inspection including extinguisher checks, alarm systems, and emergency exit verification.',
          categoryId: 4,
          categoryName: 'Safety & Security',
          basePrice: 150,
          unit: 'inspection',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.9,
          duration: '2-4 hours',
          popularity: 87,
          featured: false
        },
        {
          id: 12,
          name: 'Emergency Lighting Service',
          description: 'Installation and maintenance of emergency lighting systems to ensure building safety and compliance with fire codes.',
          categoryId: 4,
          categoryName: 'Safety & Security',
          basePrice: 75,
          unit: 'fixture',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.6,
          duration: '1-2 hours',
          popularity: 73,
          featured: false
        },
        // Pest Control Category (ID: 5) - New Category
        {
          id: 13,
          name: 'General Pest Control',
          description: 'Comprehensive pest control service targeting common household and commercial pests including ants, cockroaches, and rodents.',
          categoryId: 5,
          categoryName: 'Pest Control',
          basePrice: 120,
          unit: 'treatment',
          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.4,
          duration: '1-2 hours',
          popularity: 79,
          featured: false
        },
        {
          id: 14,
          name: 'Termite Inspection',
          description: 'Professional termite inspection and treatment service to protect your property from destructive termite infestations.',
          categoryId: 5,
          categoryName: 'Pest Control',
          basePrice: 200,
          unit: 'inspection',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.8,
          duration: '2-3 hours',
          popularity: 84,
          featured: true
        },
        {
          id: 15,
          name: 'Rodent Control Service',
          description: 'Specialized rodent control service including trapping, baiting, and exclusion techniques to eliminate rodent infestations.',
          categoryId: 5,
          categoryName: 'Pest Control',
          basePrice: 180,
          unit: 'treatment',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          rating: 4.5,
          duration: '2-4 hours',
          popularity: 77,
          featured: false
        }
      ]
      localStorage.setItem('homeware_product_services', JSON.stringify(mockServices))
      savedServices = JSON.stringify(mockServices)
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }

    if (savedServices) {
      const parsedServices = JSON.parse(savedServices)
      // Update category names
      const categoriesMap = savedCategories ? JSON.parse(savedCategories).reduce((map: any, cat: Category) => {
        map[cat.id] = cat.name
        return map
      }, {}) : {}

      const updatedServices = parsedServices.map((service: Service) => ({
        ...service,
        categoryName: categoriesMap[service.categoryId] || 'Unknown Category',
        price: service.price || service.basePrice // Ensure price field exists for compatibility
      }))

      setServices(updatedServices)
    }
  }

  const saveServices = (updatedServices: Service[]) => {
    localStorage.setItem('homeware_product_services', JSON.stringify(updatedServices))
    setServices(updatedServices)
  }

  const handleAddService = () => {
    if (!newService.name.trim() || !newService.categoryId) return

    const category = categories.find(cat => cat.id === newService.categoryId)
    const service: Service = {
      id: Date.now(),
      name: newService.name.trim(),
      description: newService.description.trim(),
      categoryId: newService.categoryId,
      categoryName: category?.name || 'Unknown Category',
      basePrice: newService.basePrice,
      price: newService.basePrice, // Add price field for compatibility
      unit: newService.unit,
      duration: newService.duration,
      featured: newService.featured,
      createdAt: new Date().toISOString(),
      rating: 4.0,
      popularity: 0
    }

    const updatedServices = [...services, service]
    saveServices(updatedServices)
    updateCategoryCounts()

    setNewService({ name: '', description: '', categoryId: 0, basePrice: 0, unit: 'sq ft', duration: '', featured: false })
    setShowAddModal(false)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setNewService({
      name: service.name,
      description: service.description,
      categoryId: service.categoryId,
      basePrice: service.basePrice,
      unit: service.unit,
      duration: service.duration || '',
      featured: service.featured || false
    })
  }

  const handleUpdateService = () => {
    if (!editingService || !newService.name.trim() || !newService.categoryId) return

    const category = categories.find(cat => cat.id === newService.categoryId)
    const updatedServices = services.map(service =>
      service.id === editingService.id
        ? {
            ...service,
            name: newService.name.trim(),
            description: newService.description.trim(),
            categoryId: newService.categoryId,
            categoryName: category?.name || 'Unknown Category',
            basePrice: newService.basePrice,
            price: newService.basePrice, // Update price field for compatibility
            unit: newService.unit,
            duration: newService.duration,
            featured: newService.featured
          }
        : service
    )

    saveServices(updatedServices)
    updateCategoryCounts()

    setEditingService(null)
    setNewService({ name: '', description: '', categoryId: 0, basePrice: 0, unit: 'sq ft', duration: '', featured: false })
  }

  const handleDeleteService = (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(service => service.id !== id)
      saveServices(updatedServices)
      updateCategoryCounts()
    }
  }

  const updateCategoryCounts = () => {
    const savedCategories = localStorage.getItem('homeware_product_categories')
    if (savedCategories) {
      const categories = JSON.parse(savedCategories)
      const products = JSON.parse(localStorage.getItem('homeware_product_products') || '[]')

      const updatedCategories = categories.map((cat: Category) => ({
        ...cat,
        serviceCount: services.filter(s => s.categoryId === cat.id).length,
        productCount: products.filter((p: any) => p.categoryId === cat.id).length
      }))

      localStorage.setItem('homeware_product_categories', JSON.stringify(updatedCategories))
    }
  }

  // Filter and search services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === null || service.categoryId === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Group services by category
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.categoryId]) {
      acc[service.categoryId] = []
    }
    acc[service.categoryId].push(service)
    return acc
  }, {} as Record<number, Service[]>)

  const unitOptions = ['sq ft', 'sq m', 'hour', 'day', 'month', 'service', 'item', 'inspection', 'treatment', 'fixture', 'system']

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="w-full px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900">Services Management</h1>
              <p className="text-slate-600 mt-2">Organize and manage your service offerings across multiple categories</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Zap className="h-4 w-4" />
                  <span>{services.length} Total Services</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Grid className="h-4 w-4" />
                  <span>{Object.keys(servicesByCategory).length} Categories</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="h-5 w-5" />
              Add Service
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({services.filter(s => s.categoryId === category.id).length})
                  </option>
                ))}
              </select>
              <div className="flex border border-slate-200 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Content */}
      <div className="w-full px-6 py-8">
        {Object.keys(servicesByCategory).length === 0 ? (
          <div className="text-center py-16">
            <Zap className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No services found</h3>
            <p className="text-slate-500 mb-6">
              {searchTerm || selectedCategory ? 'Try adjusting your search or filters.' : 'Get started by adding your first service.'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
            >
              Create First Service
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(servicesByCategory).map(([categoryId, categoryServices]) => {
              const category = categories.find(cat => cat.id === parseInt(categoryId))
              return (
                <div key={categoryId} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-900">{category?.name || 'Unknown Category'}</h2>
                        <p className="text-sm text-slate-600">{categoryServices.length} services available</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {categoryServices.filter(s => s.featured).length > 0 && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                          {categoryServices.filter(s => s.featured).length} Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Services Grid/List */}
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryServices.map(service => (
                        <div key={service.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 group">
                          {/* Service Image */}
                          <div className="relative">
                            {service.image ? (
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                                <Zap className="h-12 w-12 text-slate-400" />
                              </div>
                            )}
                            {service.featured && (
                              <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Featured
                              </div>
                            )}
                            <div className="absolute top-3 right-3 flex gap-1">
                              <button
                                onClick={() => handleEditService(service)}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Edit className="h-4 w-4 text-slate-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </div>

                          {/* Service Content */}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{service.name}</h3>
                              {service.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-xs text-slate-600">{service.rating}</span>
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 mb-3 line-clamp-2">{service.description}</p>

                            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                              {service.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{service.duration}</span>
                                </div>
                              )}
                              {service.popularity && (
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{service.popularity}%</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <span className="font-bold text-green-600">AED {service.basePrice.toLocaleString()}</span>
                                <span className="text-slate-500">/{service.unit}</span>
                              </div>
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                {service.categoryName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List View */
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Service</th>
                              <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Rating</th>
                              <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Price</th>
                              <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Duration</th>
                              <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Popularity</th>
                              <th className="px-6 py-4 text-right text-xs font-black text-slate-700 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryServices.map((service) => (
                              <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    {service.image ? (
                                      <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-12 h-12 object-cover rounded-lg"
                                      />
                                    ) : (
                                      <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-slate-400" />
                                      </div>
                                    )}
                                    <div>
                                      <p className="font-bold text-slate-900">{service.name}</p>
                                      <p className="text-sm text-slate-600 line-clamp-1">{service.description}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {service.rating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                      <span className="text-sm font-bold">{service.rating}</span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm">
                                    <span className="font-bold text-green-600">AED {service.basePrice.toLocaleString()}</span>
                                    <span className="text-slate-500">/{service.unit}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                  {service.duration || '-'}
                                </td>
                                <td className="px-6 py-4">
                                  {service.popularity && (
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4 text-slate-400" />
                                      <span className="text-sm font-bold">{service.popularity}%</span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-1">
                                    <button
                                      onClick={() => handleEditService(service)}
                                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                                      title="Edit Service"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteService(service.id)}
                                      className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                      title="Delete Service"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingService) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">
                {editingService ? 'Edit Service' : 'Add Service'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingService(null)
                  setNewService({ name: '', description: '', categoryId: 0, basePrice: 0, unit: 'sq ft', duration: '', featured: false })
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-black text-slate-900">Service Name *</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder="e.g., Deep Cleaning"
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Category *</label>
                <select
                  value={newService.categoryId}
                  onChange={(e) => setNewService({...newService, categoryId: parseInt(e.target.value)})}
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-black text-slate-900">Base Price *</label>
                  <input
                    type="number"
                    value={newService.basePrice}
                    onChange={(e) => setNewService({...newService, basePrice: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-black text-slate-900">Unit</label>
                  <select
                    value={newService.unit}
                    onChange={(e) => setNewService({...newService, unit: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Duration</label>
                <input
                  type="text"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})}
                  placeholder="e.g., 2-4 hours"
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Description</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Brief description of this service..."
                  rows={3}
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newService.featured}
                  onChange={(e) => setNewService({...newService, featured: e.target.checked})}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm font-black text-slate-900">Mark as Featured Service</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingService(null)
                    setNewService({ name: '', description: '', categoryId: 0, basePrice: 0, unit: 'sq ft', duration: '', featured: false })
                  }}
                  className="flex-1 py-2 border-2 border-slate-200 text-slate-900 font-black rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={editingService ? handleUpdateService : handleAddService}
                  className="flex-1 py-2 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}