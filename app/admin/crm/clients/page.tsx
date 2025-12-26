'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Edit2,
  Trash2,
  X,
  Plus,
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Star,
  Building2,
  Clock,
  Briefcase,
  ShieldCheck,
  MoreHorizontal,
  Download,
  ExternalLink,
  FileText,
  Zap,
  Eye,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Upload,
  FileUp,
  FileDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface Client {
  id: number
  name: string
  company: string
  email: string
  phone: string
  location: string
  joinDate: string
  totalSpent: number
  projects: number
  lastService: string
  status: 'Active' | 'Inactive' | 'Suspended'
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze'
  notes: string
  contracts: Array<{
    name: string
    value: number
    status: 'Active' | 'Completed' | 'Cancelled'
  }>
}

export default function ClientProfiles() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: 'Ahmed Al-Mansouri',
      company: 'Dubai Properties LLC',
      email: 'ahmed@dubaiprop.ae',
      phone: '+971-50-1111111',
      location: 'Dubai Marina',
      joinDate: '2024-01-15',
      totalSpent: 275000,
      projects: 4,
      lastService: '2025-12-22',
      status: 'Active',
      tier: 'Gold',
      notes: 'Premium client, high satisfaction',
      contracts: [
        { name: 'Monthly Cleaning', value: 45000, status: 'Active' },
        { name: 'Deep Cleaning', value: 25000, status: 'Completed' },
        { name: 'Event Cleaning', value: 35000, status: 'Completed' }
      ]
    },
    {
      id: 2,
      name: 'Layla Hassan',
      company: 'Paradise Hotels',
      email: 'layla@paradisehotels.ae',
      phone: '+971-50-4444444',
      location: 'Palm Jumeirah',
      joinDate: '2024-06-10',
      totalSpent: 450000,
      projects: 6,
      lastService: '2025-12-21',
      status: 'Active',
      tier: 'Platinum',
      notes: 'Strategic partner, regular volume',
      contracts: [
        { name: 'Daily Housekeeping', value: 120000, status: 'Active' },
        { name: 'Linen Services', value: 75000, status: 'Active' },
        { name: 'Event Cleanup', value: 50000, status: 'Completed' }
      ]
    },
    {
      id: 3,
      name: 'Fatima Al-Noor',
      company: 'Al Noor Logistics',
      email: 'fatima@alnoor.ae',
      phone: '+971-50-2222222',
      location: 'Jebel Ali',
      joinDate: '2024-09-20',
      totalSpent: 125000,
      projects: 2,
      lastService: '2025-12-19',
      status: 'Active',
      tier: 'Silver',
      notes: 'Growing client, potential for expansion',
      contracts: [
        { name: 'Warehouse Cleaning', value: 40000, status: 'Active' },
        { name: 'Office Maintenance', value: 30000, status: 'Completed' }
      ]
    },
    {
      id: 4,
      name: 'Mohammed Al-Rashid',
      company: 'Rashid Enterprises',
      email: 'mohammed@rashident.ae',
      phone: '+971-50-3333333',
      location: 'Business Bay',
      joinDate: '2024-03-12',
      totalSpent: 180000,
      projects: 3,
      lastService: '2025-12-20',
      status: 'Active',
      tier: 'Gold',
      notes: 'Consistent client, good payment history',
      contracts: [
        { name: 'Office Cleaning', value: 35000, status: 'Active' },
        { name: 'Facility Maintenance', value: 25000, status: 'Completed' }
      ]
    },
    {
      id: 5,
      name: 'Sara Al-Zahra',
      company: 'Zahra Medical Center',
      email: 'sara@zahramedical.ae',
      phone: '+971-50-5555555',
      location: 'Jumeirah',
      joinDate: '2024-11-05',
      totalSpent: 95000,
      projects: 1,
      lastService: '2025-12-18',
      status: 'Active',
      tier: 'Silver',
      notes: 'New client, excellent first impression',
      contracts: [
        { name: 'Medical Facility Cleaning', value: 30000, status: 'Active' }
      ]
    },
    {
      id: 6,
      name: 'Omar Al-Khalidi',
      company: 'Khalidi Construction',
      email: 'omar@khalidiconst.ae',
      phone: '+971-50-6666666',
      location: 'Dubai Silicon Oasis',
      joinDate: '2024-07-22',
      totalSpent: 320000,
      projects: 5,
      lastService: '2025-12-23',
      status: 'Active',
      tier: 'Platinum',
      notes: 'Large construction projects, high volume',
      contracts: [
        { name: 'Construction Site Cleaning', value: 80000, status: 'Active' },
        { name: 'Equipment Maintenance', value: 45000, status: 'Active' },
        { name: 'Worker Accommodation', value: 35000, status: 'Completed' }
      ]
    },
    {
      id: 7,
      name: 'Aisha Al-Mahmoud',
      company: 'Mahmoud Retail Group',
      email: 'aisha@mahmoudretail.ae',
      phone: '+971-50-7777777',
      location: 'Dubai Mall Area',
      joinDate: '2024-08-15',
      totalSpent: 210000,
      projects: 3,
      lastService: '2025-12-17',
      status: 'Active',
      tier: 'Gold',
      notes: 'Retail chain, multiple locations',
      contracts: [
        { name: 'Mall Cleaning Services', value: 55000, status: 'Active' },
        { name: 'Store Maintenance', value: 40000, status: 'Active' }
      ]
    },
    {
      id: 8,
      name: 'Khalid Al-Farsi',
      company: 'Farsi Shipping Co.',
      email: 'khalid@farsishipping.ae',
      phone: '+971-50-8888888',
      location: 'Port Rashid',
      joinDate: '2024-05-08',
      totalSpent: 380000,
      projects: 4,
      lastService: '2025-12-16',
      status: 'Active',
      tier: 'Platinum',
      notes: 'Shipping company, port facilities',
      contracts: [
        { name: 'Port Facility Cleaning', value: 95000, status: 'Active' },
        { name: 'Warehouse Services', value: 60000, status: 'Active' },
        { name: 'Office Cleaning', value: 25000, status: 'Completed' }
      ]
    }
  ])

  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    tier: 'All',
    status: 'All',
    location: 'All',
    dateRange: 'All',
    minSpent: '',
    maxSpent: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // New state for import/export and add client
  const [showAddClient, setShowAddClient] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importProgress, setImportProgress] = useState(0)
  const [importResults, setImportResults] = useState<{ success: number; errors: number; messages: string[] } | null>(null)
  const [newClientData, setNewClientData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    totalSpent: 0,
    projects: 0,
    tier: 'Bronze' as Client['tier'],
    status: 'Active' as Client['status'],
    notes: ''
  })

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(clients.map(c => c.location))]
    return uniqueLocations.sort()
  }, [clients])

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesTier = filters.tier === 'All' || client.tier === filters.tier
      const matchesStatus = filters.status === 'All' || client.status === filters.status
      const matchesLocation = filters.location === 'All' || client.location === filters.location

      const matchesSpent = (!filters.minSpent || client.totalSpent >= parseInt(filters.minSpent)) &&
                          (!filters.maxSpent || client.totalSpent <= parseInt(filters.maxSpent))

      let matchesDate = true
      if (filters.dateRange !== 'All') {
        const clientDate = new Date(client.joinDate)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - clientDate.getTime()) / (1000 * 3600 * 24))

        switch (filters.dateRange) {
          case 'Last 30 days':
            matchesDate = daysDiff <= 30
            break
          case 'Last 90 days':
            matchesDate = daysDiff <= 90
            break
          case 'Last 6 months':
            matchesDate = daysDiff <= 180
            break
          case 'Last year':
            matchesDate = daysDiff <= 365
            break
        }
      }

      return matchesSearch && matchesTier && matchesStatus && matchesLocation && matchesSpent && matchesDate
    })

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [clients, searchTerm, filters, sortConfig])

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedClients.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedClients, currentPage])

  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage)

  const handleSort = (key: keyof Client) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const metrics = useMemo(() => {
    const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0)
    const avgClientValue = clients.length > 0 ? totalRevenue / clients.length : 0
    const totalProjects = clients.reduce((sum, c) => sum + c.projects, 0)
    const activeClients = clients.filter(c => c.status === 'Active').length

    return { totalRevenue, avgClientValue, totalProjects, clientCount: clients.length, activeClients }
  }, [clients])

  const handleDeleteClient = useCallback((id: number) => {
    if (confirm('Delete this client profile?')) {
      setClients(clients.filter(c => c.id !== id))
      if (selectedClient?.id === id) setShowDetails(false)
    }
  }, [clients, selectedClient])

  const handleAddClient = useCallback((clientData: Omit<Client, 'id' | 'joinDate' | 'lastService' | 'contracts'>) => {
    const newClient: Client = {
      ...clientData,
      id: Math.max(...clients.map(c => c.id)) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      lastService: 'No service yet',
      contracts: []
    }
    setClients([...clients, newClient])
    setShowAddClient(false)
    setNewClientData({
      name: '',
      email: '',
      phone: '',
      company: '',
      tier: 'Bronze',
      status: 'Active',
      location: '',
      totalSpent: 0,
      projects: 0,
      notes: ''
    })
  }, [clients])

  const handleImportClients = useCallback(async (file: File) => {
    setImportProgress(0)
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string
        const lines = csv.split('\n').filter(line => line.trim())
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
        
        const requiredHeaders = ['name', 'email', 'phone']
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h))
        
        if (missingHeaders.length > 0) {
          setImportResults({
            success: 0,
            errors: 1,
            messages: [`Missing required columns: ${missingHeaders.join(', ')}`]
          })
          return
        }

        const importedClients: Client[] = []
        const errors: string[] = []
        
        lines.slice(1).forEach((line, index) => {
          setImportProgress(Math.round(((index + 1) / (lines.length - 1)) * 100))
          
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
          if (values.length !== headers.length) {
            errors.push(`Row ${index + 2}: Incorrect number of columns`)
            return
          }
          
          const clientData: any = {}
          headers.forEach((header, i) => {
            clientData[header] = values[i]
          })
          
          // Validate required fields
          if (!clientData.name || !clientData.email || !clientData.phone) {
            errors.push(`Row ${index + 2}: Missing required fields (name, email, phone)`)
            return
          }
          
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(clientData.email)) {
            errors.push(`Row ${index + 2}: Invalid email format`)
            return
          }
          
          const newClient: Client = {
            id: Math.max(...clients.map(c => c.id), 0) + importedClients.length + 1,
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone,
            company: clientData.company || '',
            tier: (['Platinum', 'Gold', 'Silver', 'Bronze'].includes(clientData.tier) ? clientData.tier : 'Bronze') as Client['tier'],
            status: (['Active', 'Inactive', 'Suspended'].includes(clientData.status) ? clientData.status : 'Active') as Client['status'],
            location: clientData.location || '',
            joinDate: clientData.joindate || new Date().toISOString().split('T')[0],
            totalSpent: parseFloat(clientData.totalspent) || 0,
            projects: parseInt(clientData.projects) || 0,
            lastService: clientData.lastservice || 'No service yet',
            notes: clientData.notes || '',
            contracts: []
          }
          
          importedClients.push(newClient)
        })
        
        setClients([...clients, ...importedClients])
        setImportResults({
          success: importedClients.length,
          errors: errors.length,
          messages: errors.length > 0 ? errors.slice(0, 5) : ['Import completed successfully']
        })
        
      } catch (error) {
        setImportResults({
          success: 0,
          errors: 1,
          messages: ['Failed to parse CSV file. Please check the format.']
        })
      }
    }
    reader.readAsText(file)
  }, [clients])

  const handleExportClients = useCallback(() => {
    const headers = [
      'Name', 'Email', 'Phone', 'Company', 'Tier', 'Status', 
      'Location', 'Join Date', 'Total Spent', 'Projects', 'Last Service', 'Notes'
    ]
    
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedClients.map(client => [
        `"${client.name}"`,
        `"${client.email}"`,
        `"${client.phone}"`,
        `"${client.company}"`,
        `"${client.tier}"`,
        `"${client.status}"`,
        `"${client.location}"`,
        `"${client.joinDate}"`,
        client.totalSpent,
        client.projects,
        `"${client.lastService}"`,
        `"${client.notes}"`
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `clients_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [filteredAndSortedClients])

  const resetFilters = () => {
    setFilters({
      tier: 'All',
      status: 'All',
      location: 'All',
      dateRange: 'All',
      minSpent: '',
      maxSpent: ''
    })
    setSearchTerm('')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all client relationships</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowImport(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <button
            onClick={handleExportClients}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddClient(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Client
          </button>
        </div>
      </div>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.clientCount}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.activeClients}</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">AED {(metrics.totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Client Value</p>
              <p className="text-2xl font-bold text-gray-900">AED {(metrics.avgClientValue / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalProjects}</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
            <select
              value={filters.tier}
              onChange={(e) => setFilters(prev => ({ ...prev, tier: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="All">All Tiers</option>
              <option value="Platinum">Platinum</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="All">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="All">All Dates</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Last 6 months">Last 6 months</option>
              <option value="Last year">Last year</option>
            </select>

            <input
              type="number"
              placeholder="Min spent"
              value={filters.minSpent}
              onChange={(e) => setFilters(prev => ({ ...prev, minSpent: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />

            <input
              type="number"
              placeholder="Max spent"
              value={filters.maxSpent}
              onChange={(e) => setFilters(prev => ({ ...prev, maxSpent: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        )}

        {(searchTerm || Object.values(filters).some(v => v !== 'All' && v !== '')) && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedClients.length} of {clients.length} clients
            </p>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Client
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center gap-1">
                    Company
                    {sortConfig.key === 'company' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('tier')}
                >
                  <div className="flex items-center gap-1">
                    Tier
                    {sortConfig.key === 'tier' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortConfig.key === 'status' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center gap-1">
                    Total Spent
                    {sortConfig.key === 'totalSpent' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('projects')}
                >
                  <div className="flex items-center gap-1">
                    Projects
                    {sortConfig.key === 'projects' && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Service
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.company}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                      client.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                      client.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {client.tier}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' :
                      client.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    AED {(client.totalSpent / 1000).toFixed(0)}K
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.projects}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.lastService}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedClient(client)
                          setShowDetails(true)
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete client"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedClients.length)} of {filteredAndSortedClients.length} clients
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Client Detail Modal */}
      {showDetails && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-700">
                    {selectedClient.name.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h2>
                  <p className="text-gray-600">{selectedClient.company}</p>
                </div>
              </div>
              <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Contracts Section */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    Active Contracts
                  </h3>
                  <div className="space-y-4">
                    {selectedClient.contracts.map((contract: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 border border-gray-300 rounded-2xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-300">
                            <Briefcase className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <p className="font-black text-gray-900">{contract.name}</p>
                            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-1">AED {contract.value.toLocaleString()}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          contract.status === 'Active' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-gray-300 text-gray-800 border border-gray-400'
                        }`}>
                          {contract.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    Client Intelligence
                  </h3>
                  <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                      {selectedClient.notes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 space-y-6">
                  <h4 className="text-sm font-black text-gray-600 uppercase tracking-widest">Quick Actions</h4>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <Edit2 className="h-4 w-4" /> Edit Profile
                  </button>
                  <button className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-gray-400">
                    <Download className="h-4 w-4" /> Export History
                  </button>
                  <button 
                    onClick={() => handleDeleteClient(selectedClient.id)}
                    className="w-full py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-red-300"
                  >
                    <Trash2 className="h-4 w-4" /> Delete Client
                  </button>
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6">
                  <h4 className="text-sm font-black text-gray-600 uppercase tracking-widest mb-4">Last Activity</h4>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-black text-gray-900">{selectedClient.lastService}</p>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Service Completed</p>
                    </div>
                  </div>
                </div>

                {/* Interconnected Actions */}
                <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 space-y-3">
                  <h4 className="text-sm font-black text-gray-600 uppercase tracking-widest mb-4">Related Actions</h4>
                  <Link 
                    href={`/admin/quotations/builder?clientId=${selectedClient.id}`}
                    className="w-full py-3 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-purple-300"
                  >
                    <FileText className="h-4 w-4" /> Create Quotation
                  </Link>
                  <Link 
                    href={`/admin/jobs?clientId=${selectedClient.id}`}
                    className="w-full py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-emerald-300"
                  >
                    <Briefcase className="h-4 w-4" /> View Jobs
                  </Link>
                  <Link 
                    href={`/admin/finance?clientId=${selectedClient.id}`}
                    className="w-full py-3 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-orange-300"
                  >
                    <DollarSign className="h-4 w-4" /> View Invoices
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-100 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-8 py-4 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
              <button onClick={() => setShowAddClient(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              handleAddClient(newClientData)
            }} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientData.name}
                    onChange={(e) => setNewClientData({...newClientData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={newClientData.email}
                    onChange={(e) => setNewClientData({...newClientData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newClientData.phone}
                    onChange={(e) => setNewClientData({...newClientData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={newClientData.company}
                    onChange={(e) => setNewClientData({...newClientData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tier</label>
                  <select
                    value={newClientData.tier}
                    onChange={(e) => setNewClientData({...newClientData, tier: e.target.value as Client['tier']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newClientData.status}
                    onChange={(e) => setNewClientData({...newClientData, status: e.target.value as Client['status']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newClientData.location}
                  onChange={(e) => setNewClientData({...newClientData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newClientData.notes}
                  onChange={(e) => setNewClientData({...newClientData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional notes about the client"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddClient(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Import Clients from CSV</h2>
              <button onClick={() => setShowImport(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">CSV Format Requirements</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your CSV file must include these required columns: <strong>name, email, phone</strong>
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-700">
                  name,email,phone,company,tier,status,location,joindate,totalspent,projects,lastservice,notes
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Optional columns: company, tier, status, location, joindate, totalspent, projects, lastservice, notes
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setImportFile(file)
                      setImportResults(null)
                      setImportProgress(0)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {importProgress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Importing...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {importResults && (
                <div className={`p-4 rounded-lg ${importResults.errors > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {importResults.errors > 0 ? (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <span className={`font-medium ${importResults.errors > 0 ? 'text-red-800' : 'text-green-800'}`}>
                      Import Results
                    </span>
                  </div>
                  <p className={`text-sm ${importResults.errors > 0 ? 'text-red-700' : 'text-green-700'}`}>
                    Successfully imported: {importResults.success} clients
                    {importResults.errors > 0 && `, Errors: ${importResults.errors}`}
                  </p>
                  {importResults.messages.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      {importResults.messages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowImport(false)
                    setImportFile(null)
                    setImportResults(null)
                    setImportProgress(0)
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => importFile && handleImportClients(importFile)}
                  disabled={!importFile || importProgress > 0}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                >
                  {importProgress > 0 ? 'Importing...' : 'Import Clients'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
