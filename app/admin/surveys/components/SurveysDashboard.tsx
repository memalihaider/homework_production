'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Search, Eye, Edit2, Trash2, Copy, FileText, CheckCircle, Play, Pause, X, TrendingUp } from 'lucide-react'
import { Survey, MOCK_SURVEYS, MOCK_RESPONSES } from '@/lib/surveys-data'

const STATUS_COLORS: Record<string, { badge: string }> = {
  draft: { badge: 'bg-gray-100 text-gray-800 border border-gray-200' },
  active: { badge: 'bg-green-50 text-green-700 border border-green-100' },
  paused: { badge: 'bg-yellow-50 text-yellow-700 border border-yellow-100' },
  closed: { badge: 'bg-orange-50 text-orange-700 border border-orange-100' },
  completed: { badge: 'bg-blue-50 text-blue-700 border border-blue-100' }
}

const PRIORITY_COLORS: Record<string, string> = {
  'Low': 'bg-blue-50 text-blue-700 border border-blue-100',
  'Medium': 'bg-yellow-50 text-yellow-700 border border-yellow-100',
  'High': 'bg-orange-50 text-orange-700 border border-orange-100',
  'Critical': 'bg-red-50 text-red-700 border border-red-100'
}

interface Props {
  surveys: Survey[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  priorityFilter: string
  setPriorityFilter: (priority: string) => void
  onDelete: (id: string) => void
  onDuplicate: (survey: Survey) => void
  onViewResponses: (id: string) => void
  onStatusChange: (id: string, status: Survey['status']) => void
}

export default function SurveysDashboard({
  surveys,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onDelete,
  onDuplicate,
  onViewResponses,
  onStatusChange
}: Props) {
  const filteredSurveys = useMemo(() => {
    return surveys.filter(survey => {
      const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          survey.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          survey.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || survey.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || survey.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [surveys, searchTerm, statusFilter, priorityFilter])

  const stats = useMemo(() => {
    return {
      total: surveys.length,
      active: surveys.filter(s => s.status === 'active').length,
      completed: surveys.filter(s => s.status === 'completed').length,
      avgCompletionRate: Math.round(surveys.reduce((acc, s) => acc + s.completionRate, 0) / surveys.length)
    }
  }, [surveys])

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Surveys', value: stats.total, icon: FileText, color: 'text-gray-900' },
          { label: 'Active', value: stats.active, icon: Play, color: 'text-green-600' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-blue-600' },
          { label: 'Avg. Completion', value: `${stats.avgCompletionRate}%`, icon: TrendingUp, color: 'text-orange-600' },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white rounded p-3 shadow-none border border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                  <p className="text-xl font-bold text-black">{stat.value}</p>
                </div>
                <Icon className={`w-5 h-5 ${stat.color} opacity-40`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded border border-gray-300 p-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search surveys..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black" 
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black">
            <option value="All">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
            <option value="completed">Completed</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-black">
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-300 overflow-hidden">
        {filteredSurveys.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2 opacity-50" />
            <p className="text-sm text-gray-500">No surveys found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-black">Survey</th>
                  <th className="px-4 py-2 text-left font-semibold text-black">Client</th>
                  <th className="px-4 py-2 text-left font-semibold text-black">Status</th>
                  <th className="px-4 py-2 text-left font-semibold text-black">Stats</th>
                  <th className="px-4 py-2 text-left font-semibold text-black">Priority</th>
                  <th className="px-4 py-2 text-left font-semibold text-black">Performance</th>
                  <th className="px-4 py-2 text-left font-semibold text-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSurveys.map((survey) => (
                  <tr key={survey.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-black">{survey.title}</p>
                        <p className="text-xs text-gray-500">{survey.serviceType}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-black">{survey.clientName}</p>
                        <p className="text-xs text-gray-500">{survey.company}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        value={survey.status}
                        onChange={(e) => onStatusChange(survey.id, e.target.value as Survey['status'])}
                        className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border ${STATUS_COLORS[survey.status].badge} focus:outline-none cursor-pointer`}
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="closed">Closed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-black">{survey.responseCount}/{survey.sendCount}</p>
                        <p className="text-[10px] text-gray-500 uppercase">Resp/Sent</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${PRIORITY_COLORS[survey.priority]}`}>
                        {survey.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-black h-1.5 rounded-full" style={{ width: `${survey.completionRate}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{survey.completionRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onViewResponses(survey.id)} title="View responses" className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors border border-transparent hover:border-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDuplicate(survey)} title="Duplicate" className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors border border-transparent hover:border-gray-300">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(survey.id)} title="Delete" className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors border border-transparent hover:border-red-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
