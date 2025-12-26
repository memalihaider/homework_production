'use client'

import { useState, useMemo } from 'react'
import { Users, Search, Filter, Download, Plus, UserPlus, Award, Briefcase, MapPin, Phone, Mail, Shield, TrendingUp, AlertCircle } from 'lucide-react'

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const employees = [
    { id: 1, name: 'Ahmed Al-Mazrouei', email: 'ahmed@homeware.ae', phone: '+971501234567', role: 'Operations Manager', department: 'Operations', status: 'Active', joinDate: '2023-01-15', supervisor: 'Fatima', team: ['Mohammed', 'Ali', 'Hassan'], rating: 4.8, burnoutRisk: 'Low' },
    { id: 2, name: 'Fatima Al-Ketbi', email: 'fatima@homeware.ae', phone: '+971501234568', role: 'HR Director', department: 'HR', status: 'Active', joinDate: '2022-06-10', supervisor: 'Executive', team: ['Ahmed', 'Sara', 'Layla'], rating: 4.9, burnoutRisk: 'Low' },
    { id: 3, name: 'Mohammed Bin Ali', email: 'mohammed@homeware.ae', phone: '+971501234569', role: 'Team Lead - Cleaning', department: 'Operations', status: 'Active', joinDate: '2023-03-20', supervisor: 'Ahmed', team: ['Hassan', 'Omar', 'Khalid'], rating: 4.6, burnoutRisk: 'Medium' },
    { id: 4, name: 'Sara Al-Noor', email: 'sara@homeware.ae', phone: '+971501234570', role: 'Recruitment Specialist', department: 'HR', status: 'Active', joinDate: '2023-09-01', supervisor: 'Fatima', team: [], rating: 4.7, burnoutRisk: 'Low' },
    { id: 5, name: 'Hassan Al-Mazrouei', email: 'hassan@homeware.ae', phone: '+971501234571', role: 'Senior Cleaning Specialist', department: 'Operations', status: 'On Leave', joinDate: '2022-11-05', supervisor: 'Mohammed', team: [], rating: 4.5, burnoutRisk: 'High' },
    { id: 6, name: 'Layla Al-Mansouri', email: 'layla@homeware.ae', phone: '+971501234572', role: 'Payroll Officer', department: 'HR', status: 'Active', joinDate: '2023-02-14', supervisor: 'Fatima', team: [], rating: 4.8, burnoutRisk: 'Low' },
    { id: 7, name: 'Omar Khan', email: 'omar@homeware.ae', phone: '+971501234573', role: 'Cleaning Specialist', department: 'Operations', status: 'Active', joinDate: '2023-07-01', supervisor: 'Mohammed', team: [], rating: 4.3, burnoutRisk: 'Medium' },
    { id: 8, name: 'Khalid Al-Shehhi', email: 'khalid@homeware.ae', phone: '+971501234574', role: 'Cleaning Specialist', department: 'Operations', status: 'Active', joinDate: '2023-08-15', supervisor: 'Mohammed', team: [], rating: 4.4, burnoutRisk: 'Low' },
  ]

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDept = selectedDepartment === 'all' || emp.department === selectedDepartment
      const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [searchTerm, selectedDepartment, selectedStatus])

  // Supervisor-to-team ratios
  const supervisorMetrics = useMemo(() => {
    const metrics: Record<string, { supervisors: number; directReports: number; ratio: string }> = {}
    const supervisors: Record<string, number> = {}
    const teamMembers: Record<string, number> = {}

    employees.forEach(emp => {
      if (emp.supervisor && emp.supervisor !== 'Executive') {
        supervisors[emp.supervisor] = (supervisors[emp.supervisor] || 0) + 1
      }
      emp.team.forEach(member => {
        teamMembers[emp.name] = (teamMembers[emp.name] || 0) + 1
      })
    })

    employees.forEach(emp => {
      if (supervisors[emp.name]) {
        metrics[emp.name] = {
          supervisors: 1,
          directReports: supervisors[emp.name],
          ratio: `1:${supervisors[emp.name]}`
        }
      }
    })

    return metrics
  }, [])

  const departments = ['all', 'Operations', 'HR', 'Finance', 'Marketing']
  const statuses = ['all', 'Active', 'On Leave', 'Inactive']

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-700'
      case 'High': return 'bg-orange-100 text-orange-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700'
      case 'On Leave': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 bg-white text-black">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black">Employee Directory</h1>
          <p className="text-gray-600 mt-1">Manage team members, roles, and organization structure</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="h-5 w-5" />
          <span className="font-bold">Add Employee</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search employees by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-black">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status === 'all' ? 'All Status' : status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 mb-2 block">Quick Stats</label>
            <div className="text-sm font-bold text-black">Total: {filteredEmployees.length} employees</div>
          </div>
        </div>
      </div>

      {/* Supervisor Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Total Employees</p>
          <p className="text-2xl font-black text-blue-700">{employees.length}</p>
          <p className="text-xs text-blue-600 mt-2">Across all departments</p>
        </div>
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Supervision Ratio</p>
          <p className="text-2xl font-black text-green-700">1:3 Avg</p>
          <p className="text-xs text-green-600 mt-2">1 supervisor to 3 team members</p>
        </div>
        <div className="bg-linear-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Burnout Risk</p>
          <p className="text-2xl font-black text-orange-700">1 Critical</p>
          <p className="text-xs text-orange-600 mt-2">Requires immediate attention</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Role</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Department</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Supervisor</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Team Size</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Burnout</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        {emp.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-black">{emp.role}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{emp.department}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-black">{emp.supervisor}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-bold text-black">{emp.team.length}</div>
                    {emp.team.length > 0 && (
                      <p className="text-xs text-gray-600">{supervisorMetrics[emp.name]?.ratio}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-black">{emp.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getBurnoutColor(emp.burnoutRisk)}`}>
                      {emp.burnoutRisk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Organization Hierarchy Summary */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h3 className="font-bold text-black mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Supervision Structure
        </h3>
        <div className="space-y-3">
          {Object.entries(supervisorMetrics).map(([supervisor, data]) => (
            <div key={supervisor} className="p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-black">{supervisor}</p>
                  <p className="text-xs text-gray-600">Manages {data.directReports} team members</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{data.ratio}</p>
                  <p className="text-xs text-gray-600">Supervision Ratio</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
