'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  DollarSign,
  Sparkles,
  Wind,
  Shield,
  Lightbulb,
  Hammer,
  Star,
  CheckCircle,
  ChevronRight
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
  cleaning: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50',
  maintenance: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50',
  inspection: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50',
  consultation: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50',
  specialized: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-900/50'
}

const categoryAccentColors = {
  cleaning: 'text-blue-600 dark:text-blue-400',
  maintenance: 'text-green-600 dark:text-green-400',
  inspection: 'text-purple-600 dark:text-purple-400',
  consultation: 'text-amber-600 dark:text-amber-400',
  specialized: 'text-pink-600 dark:text-pink-400'
}

export default function ServicesPage() {
  const router = useRouter()
  const [activeServices, setActiveServices] = useState<Service[]>(MOCK_SERVICES.filter(s => s.isActive))
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'duration'>('name')

  const filteredAndSortedServices = useMemo(() => {
    let filtered = activeServices.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort services
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.basePrice - b.basePrice)
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => a.duration - b.duration)
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [activeServices, searchTerm, selectedCategory, sortBy])

  const categories = ['all', 'cleaning', 'maintenance', 'inspection', 'consultation', 'specialized']
  const categoryLabels = {
    all: 'All Services',
    cleaning: 'Cleaning Services',
    maintenance: 'Maintenance',
    inspection: 'Inspection',
    consultation: 'Consultation',
    specialized: 'Specialized Services'
  }

  const handleBookService = (serviceId: string) => {
    router.push(`/booking?service=${serviceId}`)
  }

  return (
    {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Our Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover our comprehensive range of professional hygiene and cleaning solutions tailored to meet your needs
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filteredAndSortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredAndSortedServices.map((service) => {
              const IconComponent = categoryIcons[service.category]
              return (
                <div
                  key={service.id}
                  className={`group rounded-2xl border-2 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${categoryColors[service.category]}`}
                >
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md ${categoryAccentColors[service.category]}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-foreground mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="px-6 py-4 space-y-2 border-t border-current border-opacity-20">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        <span className="font-bold text-foreground">{service.duration}</span> hours
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Starting from <span className="font-black text-foreground">AED {service.basePrice}</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
                    <button
                      onClick={() => handleBookService(service.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${categoryAccentColors[service.category]} hover:shadow-lg shadow-md`}
                    >
                      Book Now
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-lg">
            <Sparkles className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Services Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find the service you're looking for
            </p>
          </div>
        )}

        {/* Stats Section */}
        {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-black mb-2">{activeServices.length}+</p>
              <p className="text-blue-100">Professional Services</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-2">100%</p>
              <p className="text-blue-100">Satisfaction Guaranteed</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-2">24/7</p>
              <p className="text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
