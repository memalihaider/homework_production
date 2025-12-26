'use client'

import { useState, useCallback } from 'react'
import { Search, Filter, Plus, MoreVertical, Mail, Phone, Calendar, MapPin, ShieldCheck, Clock, Trash2, Edit2, X } from 'lucide-react'

export default function HR() {
  const [activeTab, setActiveTab] = useState('employees')
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Smith', role: 'Supervisor', department: 'Operations', status: 'Active', joinDate: '2024-01-15', rating: 4.8, location: 'Dubai Marina', salary: 5500, email: 'john@homeware.ae', phone: '+971-50-1234567' },
    { id: 2, name: 'Sarah Johnson', role: 'Cleaner', department: 'Operations', status: 'Active', joinDate: '2024-03-20', rating: 4.9, location: 'Downtown Dubai', salary: 2500, email: 'sarah@homeware.ae', phone: '+971-50-1234568' },
    { id: 3, name: 'Ahmed Hassan', role: 'Cleaner', department: 'Operations', status: 'Active', joinDate: '2024-06-10', rating: 4.5, location: 'Business Bay', salary: 2300, email: 'ahmed@homeware.ae', phone: '+971-50-1234569' },
    { id: 4, name: 'Maria Rodriguez', role: 'HR Manager', department: 'HR', status: 'Active', joinDate: '2023-11-05', rating: 4.7, location: 'JLT', salary: 4800, email: 'maria@homeware.ae', phone: '+971-50-1234570' }
  ])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', role: '', department: 'Operations', status: 'Active', joinDate: '', salary: '', location: '', email: '', phone: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('All')

  const activeCount = employees.filter(e => e.status === 'Active').length
  const onLeaveCount = employees.filter(e => e.status === 'On Leave').length
  const avgRating = (employees.reduce((sum, e) => sum + e.rating, 0) / employees.length).toFixed(1)
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === 'All' || emp.department === filterDept
    return matchesSearch && matchesDept
  })

  const handleAddEmployee = useCallback(() => {
    setFormData({ name: '', role: '', department: 'Operations', status: 'Active', joinDate: '', salary: '', location: '', email: '', phone: '' })
    setIsEditing(false)
    setSelectedEmployee(null)
    setShowModal(true)
  }, [])

  const handleEditEmployee = useCallback((emp: any) => {
    setFormData(emp)
    setSelectedEmployee(emp)
    setIsEditing(true)
    setShowModal(true)
  }, [])

  const handleSaveEmployee = useCallback(() => {
    if (!formData.name || !formData.role || !formData.salary || !formData.email) {
      alert('Please fill all required fields')
      return
    }

    if (isEditing && selectedEmployee) {
      setEmployees(employees.map(emp => emp.id === (selectedEmployee as any).id ? { ...formData, id: (selectedEmployee as any).id, salary: parseFloat(formData.salary as any), rating: (selectedEmployee as any).rating } : emp))
      alert('Employee updated successfully')
    } else {
      const newEmployee = { ...formData, id: Date.now(), rating: 4.5, salary: parseFloat(formData.salary as any) }
      setEmployees([...employees, newEmployee as any])
      alert('Employee added successfully')
    }
    setShowModal(false)
  }, [formData, isEditing, selectedEmployee, employees])

  const handleDeleteEmployee = useCallback((emp: any) => {
    setSelectedEmployee(emp)
    setShowDeleteConfirm(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (selectedEmployee) {
      setEmployees(employees.filter(emp => emp.id !== (selectedEmployee as any).id))
      alert(`${(selectedEmployee as any).name} removed from team`)
      setShowDeleteConfirm(false)
      setSelectedEmployee(null)
    }
  }, [employees, selectedEmployee])

  const handleStatusChange = useCallback((emp: any, newStatus: any) => {
    setEmployees(employees.map(e => e.id === emp.id ? { ...e, status: newStatus } : e))
    alert(`${emp.name}'s status updated to ${newStatus}`)
  }, [employees])

  return (
    <div className="space-y-8 bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Human Resources</h1>
          <p className="text-gray-600">Manage your workforce, attendance, and performance.</p>
        </div>
        <button 
          onClick={handleAddEmployee}
          className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-pink-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Total Staff</p>
              <p className="text-2xl font-bold text-black">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">On Duty</p>
              <p className="text-2xl font-bold text-black">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">On Leave</p>
              <p className="text-2xl font-bold text-black">{onLeaveCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 uppercase">Avg. Rating</p>
              <p className="text-2xl font-bold text-black">{avgRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Directory */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('employees')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'employees' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Directory
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'payroll' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Payroll (AED {totalSalary.toLocaleString()})
            </button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
            </div>
            <select 
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-black">
              <option>All</option>
              <option>Operations</option>
              <option>HR</option>
              <option>Management</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Salary</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-black">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black">{emp.role}</td>
                  <td className="px-6 py-4 text-sm text-black">{emp.department}</td>
                  <td className="px-6 py-4">
                    <select
                      value={emp.status}
                      onChange={(e) => handleStatusChange(emp, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                        emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-black">AED {emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-bold text-pink-600">{emp.rating}/5.0</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditEmployee(emp)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-300 shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-300">
              <h2 className="text-xl font-bold text-black">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-5 w-5 text-black" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
              <input
                type="text"
                placeholder="Role (e.g., Supervisor)"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              >
                <option>Operations</option>
                <option>HR</option>
                <option>Management</option>
              </select>
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
              <input
                type="number"
                placeholder="Monthly Salary (AED)"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
              />
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-300">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmployee}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
              >
                {isEditing ? 'Update' : 'Add'} Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-300 shadow-lg w-full max-w-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-black">Remove Employee?</h3>
              <p className="text-gray-600">Are you sure you want to remove <span className="font-bold text-black">{(selectedEmployee as any).name}</span> from the team? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-300">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-black"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Remove Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
