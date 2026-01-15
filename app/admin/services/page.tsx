'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  MoreVertical,
  Sparkles,
  Building2,
  Wind,
  UtensilsCrossed,
  Bug,
  Hammer,
  Droplets,
  Shield,
  Lightbulb,
  Square
} from 'lucide-react'
import { MOCK_SERVICES, Service } from '@/lib/bookings-services-data'

const categoryIcons = {
  cleaning: Sparkles,
  maintenance: Wind,
  inspection: Shield,
  consultation: Lightbulb,
  specialized: Hammer
}

const categoryColors = {
  cleaning: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
  maintenance: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300',
  inspection: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300',
  consultation: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300',
  specialized: 'bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-300'
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [services, searchTerm, selectedCategory])

  const handleToggleActive = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ))
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id))
    setShowDeleteConfirm(null)
  }

  const handleViewDetails = (service: Service) => {
    setSelectedService(service)
    setShowDetailsModal(true)
  }

  const categories = ['all', 'cleaning', 'maintenance', 'inspection', 'consultation', 'specialized']
  const categoryLabels = {
    all: 'All Services',
    cleaning: 'Cleaning',
    maintenance: 'Maintenance',
    inspection: 'Inspection',
    consultation: 'Consultation',
    specialized: 'Specialized'
  }

  const activeCount = services.filter(s => s.isActive).length
  const totalCount = services.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Services Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all available services - <span className="font-bold text-foreground">{activeCount}/{totalCount}</span> active
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Total Services</p>
              <p className="text-2xl font-black text-foreground mt-1">{totalCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Active</p>
              <p className="text-2xl font-black text-foreground mt-1">{activeCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Inactive</p>
              <p className="text-2xl font-black text-foreground mt-1">{totalCount - activeCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
              <EyeOff className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Avg Price</p>
              <p className="text-2xl font-black text-foreground mt-1">AED {Math.round(services.reduce((sum, s) => sum + s.basePrice, 0) / totalCount)}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-muted/50 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {categoryLabels[cat as keyof typeof categoryLabels]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-card border rounded-2xl overflow-hidden">
        {filteredServices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">Duration</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-muted-foreground uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredServices.map((service) => {
                  const CategoryIcon = categoryIcons[service.category]
                  return (
                    <tr key={service.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
                          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                            <CategoryIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-foreground truncate">{service.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{service.description.substring(0, 50)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold ${categoryColors[service.category]}`}>
                          <CategoryIcon className="h-3.5 w-3.5" />
                          {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-foreground">AED {service.basePrice}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-muted-foreground">{service.duration}h</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {service.isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100/50 dark:bg-green-950/30 text-green-700 dark:text-green-300 rounded-lg text-xs font-bold">
                            <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></div>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100/50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-lg text-xs font-bold">
                            <div className="h-2 w-2 rounded-full bg-red-600"></div>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(service)}
                            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-950/30 rounded-lg text-blue-600 transition-colors"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleToggleActive(service.id)}
                            className="p-2 hover:bg-amber-100 dark:hover:bg-amber-950/30 rounded-lg text-amber-600 transition-colors"
                            title={service.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {service.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => {}}
                            className="p-2 hover:bg-green-100 dark:hover:bg-green-950/30 rounded-lg text-green-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(service.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-950/30 rounded-lg text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground font-bold">No services found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-black mb-2">Delete Service?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border hover:bg-muted transition-colors font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteService(showDeleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
