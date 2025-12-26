'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Eye, Edit2, Trash2, CheckCircle, Clock, AlertCircle, Users, MapPin, Calendar, Send, FileText, BarChart3, Star, X } from 'lucide-react'

// Shared client data (same as used in client management)
const sharedClients = [
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
    notes: 'Premium client, high satisfaction'
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
    notes: 'Strategic partner, regular volume'
  },
  {
    id: 3,
    name: 'Fatima Al-Noor',
    company: 'Al Noor Logistics',
    email: 'fatima@alnoorlogistics.ae',
    phone: '+971-50-2222222',
    location: 'Dubai Industrial City',
    joinDate: '2024-03-20',
    totalSpent: 180000,
    projects: 3,
    lastService: '2025-12-20',
    status: 'Active',
    tier: 'Silver',
    notes: 'Growing client, warehouse focus'
  },
  {
    id: 4,
    name: 'Mohammed Al-Zahra',
    company: 'Emirates Medical Center',
    email: 'mohammed@emmc.ae',
    phone: '+971-50-3333333',
    location: 'Dubai Healthcare City',
    joinDate: '2024-08-15',
    totalSpent: 320000,
    projects: 5,
    lastService: '2025-12-19',
    status: 'Active',
    tier: 'Platinum',
    notes: 'Medical facility, critical account'
  },
  {
    id: 5,
    name: 'Sara Al-Mahmoud',
    company: 'Royal Mall Group',
    email: 'sara@royalmall.ae',
    phone: '+971-50-5555555',
    location: 'Dubai Mall Area',
    joinDate: '2024-11-01',
    totalSpent: 150000,
    projects: 2,
    lastService: '2025-12-18',
    status: 'Active',
    tier: 'Silver',
    notes: 'New client, shopping mall'
  }
]

interface Survey {
  id: number
  clientId: number
  clientName: string
  clientEmail: string
  company: string
  location: string
  serviceType: string
  status: 'pending' | 'sent' | 'in_progress' | 'completed' | 'overdue'
  surveyLink: string
  createdDate: string
  dueDate: string
  completedDate?: string
  overallRating?: number
  responses?: number
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignedTo?: string
  notes?: string
}

interface SurveyResponse {
  questionId: number
  answer: string | number | string[]
  rating?: number
}

interface CompletedSurvey {
  id: number
  clientId: number
  clientName: string
  clientEmail: string
  serviceType: string
  surveyDate: string
  status: 'completed'
  responses: SurveyResponse[]
  overallRating?: number
  comments?: string
}

// Survey Assignment Page with AI Risk Detection
export default function SurveyAssignment() {
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 1,
      clientId: 1,
      clientName: 'Ahmed Al-Mansouri',
      clientEmail: 'ahmed@dubaiprop.ae',
      company: 'Dubai Properties LLC',
      location: 'Dubai Marina',
      serviceType: 'Office Deep Cleaning',
      status: 'pending',
      surveyLink: `/client/survey?id=1&clientId=1`,
      createdDate: '2025-12-20',
      dueDate: '2025-12-27',
      priority: 'High',
      notes: 'Post-service satisfaction survey'
    },
    {
      id: 2,
      clientId: 4,
      clientName: 'Mohammed Al-Zahra',
      clientEmail: 'mohammed@emmc.ae',
      company: 'Emirates Medical Center',
      location: 'Dubai Healthcare City',
      serviceType: 'Medical Facility Sanitization',
      status: 'sent',
      surveyLink: `/client/survey?id=2&clientId=4`,
      createdDate: '2025-12-19',
      dueDate: '2025-12-26',
      priority: 'Critical',
      assignedTo: 'Survey Team A',
      notes: 'Critical medical facility survey'
    },
    {
      id: 3,
      clientId: 2,
      clientName: 'Layla Hassan',
      clientEmail: 'layla@paradisehotels.ae',
      company: 'Paradise Hotels',
      location: 'Palm Jumeirah',
      serviceType: 'Hotel Deep Cleaning',
      status: 'in_progress',
      surveyLink: `/client/survey?id=3&clientId=2`,
      createdDate: '2025-12-18',
      dueDate: '2025-12-25',
      priority: 'High',
      assignedTo: 'Survey Team B',
      notes: 'Hotel guest satisfaction survey'
    },
    {
      id: 4,
      clientId: 3,
      clientName: 'Fatima Al-Noor',
      clientEmail: 'fatima@alnoorlogistics.ae',
      company: 'Al Noor Logistics',
      location: 'Dubai Industrial City',
      serviceType: 'Warehouse Cleaning',
      status: 'completed',
      surveyLink: `/client/survey?id=4&clientId=3`,
      createdDate: '2025-12-17',
      dueDate: '2025-12-24',
      completedDate: '2025-12-23',
      overallRating: 4.5,
      responses: 8,
      priority: 'Medium',
      assignedTo: 'Survey Team C',
      notes: 'Completed successfully'
    }
  ])

  const [completedSurveys, setCompletedSurveys] = useState<CompletedSurvey[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [newSurvey, setNewSurvey] = useState({
    clientId: '',
    serviceType: 'General Cleaning',
    priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Critical',
    dueDate: '',
    notes: ''
  })

  // Load completed surveys from localStorage
  useEffect(() => {
    const storedSurveys = JSON.parse(localStorage.getItem('clientSurveys') || '[]')
    setCompletedSurveys(storedSurveys)
  }, [])

  const createSurvey = useCallback(() => {
    if (!newSurvey.clientId || !newSurvey.dueDate) {
      alert('Please fill in all required fields')
      return
    }

    const client = sharedClients.find(c => c.id === parseInt(newSurvey.clientId))
    if (!client) return

    const survey: Survey = {
      id: Math.max(...surveys.map(s => s.id), 0) + 1,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      company: client.company,
      location: client.location,
      serviceType: newSurvey.serviceType,
      status: 'pending',
      surveyLink: `/client/survey?id=${Math.max(...surveys.map(s => s.id), 0) + 1}&clientId=${client.id}`,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newSurvey.dueDate,
      priority: newSurvey.priority,
      notes: newSurvey.notes
    }

    setSurveys(prev => [...prev, survey])
    setShowCreateModal(false)
    setNewSurvey({
      clientId: '',
      serviceType: 'General Cleaning',
      priority: 'Medium',
      dueDate: '',
      notes: ''
    })
  }, [newSurvey, surveys])

  const sendSurvey = useCallback((surveyId: number) => {
    setSurveys(prev => prev.map(s =>
      s.id === surveyId ? { ...s, status: 'sent' as const } : s
    ))
    // In real app, send email with survey link
    alert('Survey link sent to client!')
  }, [])

  const updateSurveyStatus = useCallback((surveyId: number, status: Survey['status']) => {
    setSurveys(prev => prev.map(s =>
      s.id === surveyId ? { ...s, status } : s
    ))
  }, [])

  const deleteSurvey = useCallback((surveyId: number) => {
    if (confirm('Delete this survey?')) {
      setSurveys(prev => prev.filter(s => s.id !== surveyId))
    }
  }, [])

  const filteredSurveys = useMemo(() => {
    return surveys.filter(survey => {
      const matchesSearch = survey.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.serviceType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'All' || survey.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || survey.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [surveys, searchTerm, statusFilter, priorityFilter])

  const stats = useMemo(() => {
    const total = surveys.length
    const sent = surveys.filter(s => s.status === 'sent').length
    const completed = surveys.filter(s => s.status === 'completed').length
    const pending = surveys.filter(s => s.status === 'pending').length
    const avgRating = completedSurveys.length > 0
      ? completedSurveys.reduce((sum, s) => sum + (s.overallRating || 0), 0) / completedSurveys.length
      : 0

    return { total, sent, completed, pending, avgRating }
  }, [surveys, completedSurveys])

  const getStatusColor = (status: Survey['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: Survey['priority']) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Survey Management</h1>
            <p className="text-gray-600 mt-1">Create, send, and track client satisfaction surveys</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Survey
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Surveys</p>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sent</p>
                <p className="text-xl font-bold text-gray-900">{stats.sent}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search surveys..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Surveys Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSurveys.map((survey) => (
                  <tr key={survey.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{survey.clientName}</div>
                        <div className="text-sm text-gray-500">{survey.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{survey.serviceType}</div>
                      <div className="text-sm text-gray-500">{survey.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(survey.status)}`}>
                        {survey.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(survey.priority)}`}>
                        {survey.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(survey.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {survey.overallRating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{survey.overallRating.toFixed(1)}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {survey.status === 'pending' && (
                          <button
                            onClick={() => sendSurvey(survey.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Send Survey"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                        {survey.status === 'completed' && (
                          <button
                            onClick={() => {
                              setSelectedSurvey(survey)
                              setShowResultsModal(true)
                            }}
                            className="text-purple-600 hover:text-purple-900"
                            title="View Results"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => updateSurveyStatus(survey.id, survey.status === 'sent' ? 'in_progress' : 'sent')}
                          className="text-green-600 hover:text-green-900"
                          title="Update Status"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSurvey(survey.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Survey"
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

        {/* Create Survey Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Create New Survey</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client *</label>
                  <select
                    value={newSurvey.clientId}
                    onChange={(e) => setNewSurvey({...newSurvey, clientId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a client</option>
                    {sharedClients.map(client => (
                      <option key={client.id} value={client.id}>{client.name} - {client.company}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                  <select
                    value={newSurvey.serviceType}
                    onChange={(e) => setNewSurvey({...newSurvey, serviceType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General Cleaning">General Cleaning</option>
                    <option value="Office Deep Cleaning">Office Deep Cleaning</option>
                    <option value="Medical Facility Sanitization">Medical Facility Sanitization</option>
                    <option value="Warehouse Cleaning">Warehouse Cleaning</option>
                    <option value="Hotel Deep Cleaning">Hotel Deep Cleaning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newSurvey.priority}
                    onChange={(e) => setNewSurvey({...newSurvey, priority: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={newSurvey.dueDate}
                    onChange={(e) => setNewSurvey({...newSurvey, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newSurvey.notes}
                    onChange={(e) => setNewSurvey({...newSurvey, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createSurvey}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Create Survey
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Survey Results Modal */}
        {showResultsModal && selectedSurvey && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Survey Results</h2>
                <button onClick={() => setShowResultsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900">{selectedSurvey.clientName}</h3>
                  <p className="text-sm text-gray-600">{selectedSurvey.company}</p>
                  <p className="text-sm text-gray-600">{selectedSurvey.serviceType}</p>
                </div>

                {selectedSurvey.overallRating && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-green-800">Overall Rating: {selectedSurvey.overallRating.toFixed(1)}/5</span>
                    </div>
                    <p className="text-sm text-green-700">
                      {selectedSurvey.responses} questions answered
                    </p>
                  </div>
                )}

                <div className="text-center text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Detailed survey results will be displayed here</p>
                  <p className="text-sm">Integration with completed survey data coming soon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

