'use client'

import { useState, useMemo } from 'react'
import { Calendar, CheckCircle, Clock, AlertCircle, X } from 'lucide-react'

const EMPLOYEES = [
  'Ahmed Al-Mazrouei',
  'Mohammed Bin Ali',
  'Hassan Al-Mazrouei',
  'Sara Al-Noor',
  'Layla Al-Mansouri',
  'Omar Khan',
]

interface LeaveRequest {
  id: number
  employee: string
  type: 'Annual Leave' | 'Sick Leave' | 'Compassionate Leave' | 'Maternity Leave' | 'Unpaid Leave'
  startDate: string
  endDate: string
  days: number
  status: 'Pending' | 'Approved' | 'Rejected'
  approver: string
  reason: string
}

interface LeaveBalance {
  employee: string
  annual: number
  sick: number
  compassionate: number
  maternity: number
}

export default function LeaveManagement() {
  const [activeTab, setActiveTab] = useState<'requests' | 'balance'>('requests')
  const [selectedLeaveType, setSelectedLeaveType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null)

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, employee: 'Ahmed Al-Mazrouei', type: 'Annual Leave', startDate: '2025-02-10', endDate: '2025-02-14', days: 5, status: 'Approved', approver: 'Fatima', reason: 'Personal vacation' },
    { id: 2, employee: 'Mohammed Bin Ali', type: 'Sick Leave', startDate: '2025-01-22', endDate: '2025-01-23', days: 2, status: 'Pending', approver: 'Ahmed', reason: 'Medical appointment' },
    { id: 3, employee: 'Hassan Al-Mazrouei', type: 'Compassionate Leave', startDate: '2025-01-21', endDate: '2025-01-21', days: 1, status: 'Approved', approver: 'Ahmed', reason: 'Family emergency' },
    { id: 4, employee: 'Sara Al-Noor', type: 'Annual Leave', startDate: '2025-03-01', endDate: '2025-03-10', days: 10, status: 'Approved', approver: 'Fatima', reason: 'Summer vacation' },
    { id: 5, employee: 'Layla Al-Mansouri', type: 'Maternity Leave', startDate: '2025-04-01', endDate: '2025-07-31', days: 120, status: 'Approved', approver: 'Fatima', reason: 'Maternity' },
    { id: 6, employee: 'Omar Khan', type: 'Unpaid Leave', startDate: '2025-02-20', endDate: '2025-02-21', days: 2, status: 'Rejected', approver: 'Ahmed', reason: 'High operational period' },
  ])

  const leaveBalance: LeaveBalance[] = [
    { employee: 'Ahmed Al-Mazrouei', annual: 15, sick: 10, compassionate: 3, maternity: 0 },
    { employee: 'Mohammed Bin Ali', annual: 18, sick: 8, compassionate: 3, maternity: 0 },
    { employee: 'Hassan Al-Mazrouei', annual: 12, sick: 6, compassionate: 3, maternity: 0 },
    { employee: 'Sara Al-Noor', annual: 20, sick: 10, compassionate: 3, maternity: 120 },
    { employee: 'Layla Al-Mansouri', annual: 8, sick: 9, compassionate: 3, maternity: 0 },
    { employee: 'Omar Khan', annual: 19, sick: 10, compassionate: 3, maternity: 0 },
  ]

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter(req => {
      const typeMatch = selectedLeaveType === 'all' || req.type === selectedLeaveType
      const statusMatch = selectedStatus === 'all' || req.status === selectedStatus
      const searchMatch = searchTerm === '' || req.employee.toLowerCase().includes(searchTerm.toLowerCase())
      return typeMatch && statusMatch && searchMatch
    })
  }, [selectedLeaveType, selectedStatus, searchTerm])

  const stats = useMemo(() => {
    return {
      total: leaveRequests.length,
      approved: leaveRequests.filter(r => r.status === 'Approved').length,
      pending: leaveRequests.filter(r => r.status === 'Pending').length,
      rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
    }
  }, [leaveRequests])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleApproveRequest = () => {
    if (selectedRequest) {
      setLeaveRequests(leaveRequests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: 'Approved' as const, approver: 'Current User' }
          : req
      ))
      setShowApprovalModal(false)
      setSelectedRequest(null)
    }
  }

  const handleRejectRequest = () => {
    if (selectedRequest) {
      setLeaveRequests(leaveRequests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: 'Rejected' as const, approver: 'Current User' }
          : req
      ))
      setShowApprovalModal(false)
      setSelectedRequest(null)
    }
  }


  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
        <p className="text-gray-600 mt-1">Manage employee leave requests and balances</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-3 font-medium text-sm border-b-2 ${
              activeTab === 'requests'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Leave Requests
          </button>
          <button
            onClick={() => setActiveTab('balance')}
            className={`px-4 py-3 font-medium text-sm border-b-2 ${
              activeTab === 'balance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Leave Balance
          </button>
        </div>
      </div>

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select
                value={selectedLeaveType}
                onChange={(e) => setSelectedLeaveType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Compassionate Leave">Compassionate Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{req.employee}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.startDate} to {req.endDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.days}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate">{req.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {req.status === 'Pending' && (
                        <button
                          onClick={() => {
                            setSelectedRequest(req)
                            setShowApprovalModal(true)
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Review
                        </button>
                      )}
                      {req.status !== 'Pending' && (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRequests.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">
                No leave requests found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Balance Tab */}
      {activeTab === 'balance' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Annual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sick</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Compassionate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Maternity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaveBalance.map((emp, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{emp.employee}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.annual} days</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.sick} days</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.compassionate} days</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{emp.maternity} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Review Leave Request</h2>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-600">Employee</p>
                <p className="font-medium text-gray-900">{selectedRequest.employee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Leave Type</p>
                <p className="font-medium text-gray-900">{selectedRequest.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium text-gray-900">{selectedRequest.startDate} to {selectedRequest.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Days</p>
                <p className="font-medium text-gray-900">{selectedRequest.days} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reason</p>
                <p className="font-medium text-gray-900">{selectedRequest.reason}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleApproveRequest}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={handleRejectRequest}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
