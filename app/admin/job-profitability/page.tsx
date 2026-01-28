'use client'

import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  AlertCircle,
  ArrowLeft,
  Download,
  Filter,
  Search,
  ChevronDown,
  TrendingDown
} from 'lucide-react'
import Link from 'next/link'

export default function JobProfitabilityAndCapacity() {
  const [timeRange, setTimeRange] = useState('month')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [profitabilityFilter, setProfitabilityFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('profit-desc')
  const [showFilters, setShowFilters] = useState(true)

  // Sample job profitability data - interconnected with jobs page
  const jobsData = [
    {
      id: 1,
      jobTitle: 'Residential House Cleaning',
      department: 'Cleaning',
      budget: 5000,
      actualCost: 3800,
      revenue: 5500,
      teamSize: 4,
      estimatedHours: 40,
      actualHours: 38,
      status: 'Completed',
      profitMargin: 31.6,
      createdDate: '2025-12-01',
      completedDate: '2025-12-15',
      client: 'John Smith',
      location: 'Downtown Residence'
    },
    {
      id: 2,
      jobTitle: 'Commercial Office Cleaning',
      department: 'Cleaning',
      budget: 8000,
      actualCost: 7200,
      revenue: 8500,
      teamSize: 6,
      estimatedHours: 60,
      actualHours: 56,
      status: 'Completed',
      profitMargin: 17.9,
      createdDate: '2025-12-05',
      completedDate: '2025-12-20',
      client: 'Corporate Towers Inc',
      location: 'Business District'
    },
    {
      id: 3,
      jobTitle: 'Building Maintenance',
      department: 'Maintenance',
      budget: 12000,
      actualCost: 14200,
      revenue: 12500,
      teamSize: 5,
      estimatedHours: 80,
      actualHours: 92,
      status: 'In Progress',
      profitMargin: 3.9,
      createdDate: '2025-12-10',
      completedDate: null,
      client: 'Municipal Services',
      location: 'Downtown Complex'
    },
    {
      id: 4,
      jobTitle: 'Garden Landscaping',
      department: 'Landscaping',
      budget: 6500,
      actualCost: 5900,
      revenue: 7200,
      teamSize: 3,
      estimatedHours: 50,
      actualHours: 48,
      status: 'Completed',
      profitMargin: 22.0,
      createdDate: '2025-11-20',
      completedDate: '2025-12-05',
      client: 'Residential Estates',
      location: 'Suburban Area'
    },
    {
      id: 5,
      jobTitle: 'Carpet & Upholstery Cleaning',
      department: 'Cleaning',
      budget: 3000,
      actualCost: 3200,
      revenue: 3200,
      teamSize: 2,
      estimatedHours: 20,
      actualHours: 24,
      status: 'Completed',
      profitMargin: 0,
      createdDate: '2025-12-08',
      completedDate: '2025-12-12',
      client: 'Luxury Apartments',
      location: 'Premium Tower'
    },
    {
      id: 6,
      jobTitle: 'Industrial Equipment Cleaning',
      department: 'Industrial',
      budget: 15000,
      actualCost: 13500,
      revenue: 16000,
      teamSize: 7,
      estimatedHours: 100,
      actualHours: 98,
      status: 'In Progress',
      profitMargin: 18.5,
      createdDate: '2025-11-25',
      completedDate: null,
      client: 'Manufacturing Corp',
      location: 'Industrial Zone'
    },
    {
      id: 7,
      jobTitle: 'Window Cleaning - Multi-storey',
      department: 'Cleaning',
      budget: 4500,
      actualCost: 4100,
      revenue: 5000,
      teamSize: 3,
      estimatedHours: 35,
      actualHours: 32,
      status: 'Completed',
      profitMargin: 21.9,
      createdDate: '2025-11-15',
      completedDate: '2025-12-01',
      client: 'Business Plaza',
      location: 'City Center'
    },
    {
      id: 8,
      jobTitle: 'Parking Area Maintenance',
      department: 'Maintenance',
      budget: 3500,
      actualCost: 3800,
      revenue: 3800,
      teamSize: 2,
      estimatedHours: 25,
      actualHours: 28,
      status: 'Scheduled',
      profitMargin: 0,
      createdDate: '2025-12-12',
      completedDate: null,
      client: 'Shopping Center',
      location: 'Mall District'
    },
    {
      id: 9,
      jobTitle: 'Exterior Landscaping',
      department: 'Landscaping',
      budget: 8000,
      actualCost: 7200,
      revenue: 8800,
      teamSize: 4,
      estimatedHours: 60,
      actualHours: 55,
      status: 'Completed',
      profitMargin: 22.0,
      createdDate: '2025-12-03',
      completedDate: '2025-12-18',
      client: 'Corporate Park',
      location: 'Business Complex'
    },
    {
      id: 10,
      jobTitle: 'HVAC System Cleaning',
      department: 'Maintenance',
      budget: 6000,
      actualCost: 5500,
      revenue: 6500,
      teamSize: 3,
      estimatedHours: 40,
      actualHours: 38,
      status: 'Pending',
      profitMargin: 15.4,
      createdDate: '2025-12-14',
      completedDate: null,
      client: 'Office Building',
      location: 'Business Park'
    }
  ]

  // Team capacity data
  const capacityData = [
    { name: 'John Smith', department: 'Cleaning', availableHours: 40, allocatedHours: 38, utilization: 95 },
    { name: 'Sarah Johnson', department: 'Cleaning', availableHours: 40, allocatedHours: 35, utilization: 87.5 },
    { name: 'Ahmed Hassan', department: 'Maintenance', availableHours: 40, allocatedHours: 42, utilization: 105 },
    { name: 'Maria Garcia', department: 'Landscaping', availableHours: 40, allocatedHours: 30, utilization: 75 },
    { name: 'Michael Chen', department: 'Cleaning', availableHours: 40, allocatedHours: 38, utilization: 95 },
    { name: 'David Rodriguez', department: 'Industrial', availableHours: 40, allocatedHours: 40, utilization: 100 }
  ]

  // Profitability trend data
  const trendData = [
    { month: 'January', revenue: 45000, cost: 32000, profit: 13000 },
    { month: 'February', revenue: 52000, cost: 38000, profit: 14000 },
    { month: 'March', revenue: 48000, cost: 35000, profit: 13000 },
    { month: 'April', revenue: 61000, cost: 42000, profit: 19000 },
    { month: 'May', revenue: 58000, cost: 40000, profit: 18000 },
    { month: 'June', revenue: 65000, cost: 44000, profit: 21000 }
  ]

  // Department profitability breakdown
  const departmentProfitability = [
    { name: 'Cleaning', value: 45, color: '#4F46E5' },
    { name: 'Maintenance', value: 20, color: '#EC4899' },
    { name: 'Landscaping', value: 22, color: '#10B981' },
    { name: 'Industrial', value: 13, color: '#F59E0B' }
  ]

  // Filtered and sorted jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobsData.filter(job => {
      const matchesDept = departmentFilter === 'all' || job.department === departmentFilter
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter
      const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      let matchesProfitability = true
      if (profitabilityFilter === 'profitable') {
        matchesProfitability = job.profitMargin > 0
      } else if (profitabilityFilter === 'highly-profitable') {
        matchesProfitability = job.profitMargin >= 20
      } else if (profitabilityFilter === 'break-even') {
        matchesProfitability = job.profitMargin === 0
      } else if (profitabilityFilter === 'loss') {
        matchesProfitability = job.profitMargin < 0
      }
      
      return matchesDept && matchesStatus && matchesSearch && matchesProfitability
    })

    // Sort filtered jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'profit-desc':
          return b.profitMargin - a.profitMargin
        case 'profit-asc':
          return a.profitMargin - b.profitMargin
        case 'revenue-desc':
          return b.revenue - a.revenue
        case 'revenue-asc':
          return a.revenue - b.revenue
        case 'cost-desc':
          return b.actualCost - a.actualCost
        case 'cost-asc':
          return a.actualCost - b.actualCost
        case 'margin-desc':
          return (b.revenue - b.actualCost) - (a.revenue - a.actualCost)
        case 'margin-asc':
          return (a.revenue - a.actualCost) - (b.revenue - b.actualCost)
        default:
          return 0
      }
    })

    return filtered
  }, [jobsData, departmentFilter, statusFilter, searchTerm, profitabilityFilter, sortBy])

  // Calculate totals and metrics
  const totalBudget = filteredJobs.reduce((sum, job) => sum + job.budget, 0)
  const totalCost = filteredJobs.reduce((sum, job) => sum + job.actualCost, 0)
  const totalRevenue = filteredJobs.reduce((sum, job) => sum + job.revenue, 0)
  const totalProfit = totalRevenue - totalCost
  const avgProfitMargin = filteredJobs.length > 0 ? filteredJobs.reduce((sum, job) => sum + job.profitMargin, 0) / filteredJobs.length : 0
  const profitableJobs = filteredJobs.filter(j => j.profitMargin > 0).length
  const losingJobs = filteredJobs.filter(j => j.profitMargin < 0).length
  const totalHours = filteredJobs.reduce((sum, job) => sum + job.actualHours, 0)
  const costPerHour = totalHours > 0 ? totalCost / totalHours : 0
  const revenuePerHour = totalHours > 0 ? totalRevenue / totalHours : 0

  const getProfitColor = (margin: number) => {
    if (margin > 20) return 'text-green-600 font-bold'
    if (margin >= 10) return 'text-blue-600 font-bold'
    if (margin > 0) return 'text-yellow-600 font-bold'
    if (margin === 0) return 'text-gray-600 font-bold'
    return 'text-red-600 font-bold'
  }

  const getProfitBgColor = (margin: number) => {
    if (margin > 20) return 'bg-green-50 border border-green-200'
    if (margin >= 10) return 'bg-blue-50 border border-blue-200'
    if (margin > 0) return 'bg-yellow-50 border border-yellow-200'
    if (margin === 0) return 'bg-gray-50 border border-gray-200'
    return 'bg-red-50 border border-red-200'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border border-green-300'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border border-blue-300'
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800 border border-purple-300'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Profitability & Capacity</h1>
            <p className="text-sm text-gray-600 mt-1">Track job profitability, team capacity, and resource utilization</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-blue-700 uppercase">Total Revenue</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">AED {(totalRevenue / 1000).toFixed(1)}K</div>
          <div className="text-xs text-blue-600 mt-2">{filteredJobs.length} jobs</div>
        </div>

        <div className="bg-linear-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-xs font-bold text-red-700 uppercase">Total Cost</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">AED {(totalCost / 1000).toFixed(1)}K</div>
          <div className="text-xs text-red-600 mt-2">{filteredJobs.filter(j => j.status === 'In Progress').length} ongoing</div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-xs font-bold text-green-700 uppercase">Total Profit</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">AED {(totalProfit / 1000).toFixed(1)}K</div>
          <div className="text-xs text-green-600 mt-2">{avgProfitMargin.toFixed(1)}% avg margin</div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs font-bold text-purple-700 uppercase">Profitable Jobs</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{profitableJobs}</div>
          <div className="text-xs text-purple-600 mt-2">{losingJobs} losing jobs</div>
        </div>

        <div className="bg-linear-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs font-bold text-orange-700 uppercase">Cost per Hour</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">AED {costPerHour.toFixed(0)}</div>
          <div className="text-xs text-orange-600 mt-2">{totalHours}h total hours</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profitability Trend */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Profitability Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Profitability Breakdown */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Profitability by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentProfitability}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentProfitability.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {departmentProfitability.map((dept) => (
              <div key={dept.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                <span className="text-sm text-gray-600">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-gray-300 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="space-y-4">
            {/* Search and Sort Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title, client, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
              >
                <option value="profit-desc">Sort: Profit (High to Low)</option>
                <option value="profit-asc">Sort: Profit (Low to High)</option>
                <option value="revenue-desc">Sort: Revenue (High to Low)</option>
                <option value="revenue-asc">Sort: Revenue (Low to High)</option>
                <option value="cost-desc">Sort: Cost (High to Low)</option>
                <option value="cost-asc">Sort: Cost (Low to High)</option>
                <option value="margin-desc">Sort: Margin (High to Low)</option>
                <option value="margin-asc">Sort: Margin (Low to High)</option>
              </select>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {/* Filter Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
              >
                <option value="all">All Departments</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Landscaping">Landscaping</option>
                <option value="Industrial">Industrial</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
              </select>

              <select
                value={profitabilityFilter}
                onChange={(e) => setProfitabilityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
              >
                <option value="all">All Profitability</option>
                <option value="highly-profitable">Highly Profitable (≥20%)</option>
                <option value="profitable">Profitable (&gt;0%)</option>
                <option value="break-even">Break Even (0%)</option>
                <option value="loss">Loss (&lt;0%)</option>
              </select>
            </div>

            {/* Active Filters Display */}
            {(departmentFilter !== 'all' || statusFilter !== 'all' || profitabilityFilter !== 'all' || searchTerm) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {departmentFilter !== 'all' && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium flex items-center gap-2">
                    {departmentFilter}
                    <button onClick={() => setDepartmentFilter('all')} className="hover:text-indigo-600">×</button>
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2">
                    {statusFilter}
                    <button onClick={() => setStatusFilter('all')} className="hover:text-blue-600">×</button>
                  </span>
                )}
                {profitabilityFilter !== 'all' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-2">
                    {profitabilityFilter === 'highly-profitable' ? 'Highly Profitable' : profitabilityFilter === 'break-even' ? 'Break Even' : profitabilityFilter === 'loss' ? 'Loss' : 'Profitable'}
                    <button onClick={() => setProfitabilityFilter('all')} className="hover:text-purple-600">×</button>
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-2">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="hover:text-gray-600">×</button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Jobs Table */}
      <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-300 bg-linear-to-r from-gray-50 to-white">
          <h3 className="font-bold text-lg text-gray-900">Job Profitability Breakdown</h3>
          <p className="text-sm text-gray-600 mt-1">{filteredJobs.length} jobs found</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Department</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Budget</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Actual Cost</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Profit</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Margin %</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">{job.jobTitle}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{job.client}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                        {job.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 text-sm">AED {job.budget.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-600 text-sm">AED {job.actualCost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-600 text-sm">AED {job.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-sm">
                      <span className={job.revenue - job.actualCost >= 0 ? 'text-green-600' : 'text-red-600'}>
                        AED {(job.revenue - job.actualCost).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold text-sm ${getProfitColor(job.profitMargin)}`}>
                        {job.profitMargin.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="font-medium">No jobs found matching your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Capacity Utilization */}
      <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-300">
          <h3 className="font-bold text-lg text-gray-900">Team Capacity Utilization</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Team Member</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Department</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Available Hours</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Allocated Hours</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {capacityData.map((member, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 text-gray-600">{member.department}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{member.availableHours}h</td>
                  <td className="px-6 py-4 text-right text-gray-600">{member.allocatedHours}h</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            member.utilization >= 100
                              ? 'bg-red-500'
                              : member.utilization >= 90
                              ? 'bg-green-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(member.utilization, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold text-sm ${
                        member.utilization >= 100
                          ? 'text-red-600'
                          : member.utilization >= 90
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}>
                        {member.utilization.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
