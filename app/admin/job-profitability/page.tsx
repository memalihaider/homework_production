'use client'

import { useState } from 'react'
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
  Search
} from 'lucide-react'
import Link from 'next/link'

export default function JobProfitabilityAndCapacity() {
  const [timeRange, setTimeRange] = useState('month')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample job profitability data
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
      profitMargin: 31.6
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
      profitMargin: 17.9
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
      profitMargin: 3.9
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
      profitMargin: 22.0
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
      profitMargin: 0
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
      profitMargin: 18.5
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

  // Filtered jobs
  const filteredJobs = jobsData.filter(job => {
    const matchesDept = departmentFilter === 'all' || job.department === departmentFilter
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesDept && matchesSearch
  })

  // Calculate totals
  const totalBudget = filteredJobs.reduce((sum, job) => sum + job.budget, 0)
  const totalCost = filteredJobs.reduce((sum, job) => sum + job.actualCost, 0)
  const totalRevenue = filteredJobs.reduce((sum, job) => sum + job.revenue, 0)
  const totalProfit = totalRevenue - totalCost
  const avgProfitMargin = filteredJobs.length > 0 ? filteredJobs.reduce((sum, job) => sum + job.profitMargin, 0) / filteredJobs.length : 0

  const getProfitColor = (margin: number) => {
    if (margin >= 20) return 'text-green-600'
    if (margin >= 10) return 'text-blue-600'
    if (margin >= 0) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    return status === 'Completed'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <span className="text-xs font-bold text-purple-700 uppercase">Team Utilization</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">92.3%</div>
          <div className="text-xs text-purple-600 mt-2">6 team members</div>
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

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="all">All Departments</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Landscaping">Landscaping</option>
          <option value="Industrial">Industrial</option>
        </select>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-300">
          <h3 className="font-bold text-lg text-gray-900">Job Profitability Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Department</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Budget</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Actual Cost</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Profit Margin</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{job.jobTitle}</td>
                  <td className="px-6 py-4 text-gray-600">{job.department}</td>
                  <td className="px-6 py-4 text-right text-gray-600">AED {job.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-gray-600">AED {job.actualCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-gray-600">AED {job.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold ${getProfitColor(job.profitMargin)}`}>
                      {job.profitMargin.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
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
