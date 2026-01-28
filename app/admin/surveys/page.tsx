'use client'

import { useState } from 'react'
import { Plus, FileText, Settings, TrendingUp, AlertCircle } from 'lucide-react'
import { MOCK_SURVEYS, Survey } from '@/lib/surveys-data'
import SurveysDashboard from './components/SurveysDashboard'
import SurveyFormSection from './components/SurveyFormSection'
import SurveyTemplatesSection from './components/SurveyTemplatesSection'
import SurveyResultsSection from './components/SurveyResultsSection'

const STATUS_COLORS: Record<string, { badge: string }> = {
  draft: { badge: 'bg-gray-100 text-gray-800' },
  active: { badge: 'bg-green-100 text-green-800' },
  paused: { badge: 'bg-yellow-100 text-yellow-800' },
  closed: { badge: 'bg-orange-100 text-orange-800' },
  completed: { badge: 'bg-blue-100 text-blue-800' }
}

export default function SurveysModule() {
  const [surveys, setSurveys] = useState<Survey[]>(MOCK_SURVEYS)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'templates' | 'results'>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [surveyToDelete, setSurveyToDelete] = useState<string | null>(null)
  const [selectedDetailSurvey, setSelectedDetailSurvey] = useState<Survey | null>(null)

  const handleDeleteSurvey = (id: string) => {
    setSurveyToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (surveyToDelete) {
      setSurveys(surveys.filter(s => s.id !== surveyToDelete))
      setShowDeleteModal(false)
      setSurveyToDelete(null)
    }
  }

  const handleStatusChange = (id: string, newStatus: Survey['status']) => {
    setSurveys(surveys.map(s => 
      s.id === id ? { ...s, status: newStatus, updatedDate: new Date().toISOString().split('T')[0] } : s
    ))
  }

  const handleDuplicateSurvey = (survey: Survey) => {
    const newSurvey: Survey = {
      ...survey,
      id: `survey-${Date.now()}`,
      title: `${survey.title} (Copy)`,
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      sendCount: 0,
      responseCount: 0,
      completionRate: 0,
    }
    setSurveys([newSurvey, ...surveys])
  }

  const handleViewResponses = (surveyId: string) => {
    const survey = surveys.find(s => s.id === surveyId)
    if (survey) {
      setSelectedDetailSurvey(survey)
      setActiveTab('results')
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FileText },
    { id: 'create', label: 'Create Survey', icon: Plus },
    { id: 'templates', label: 'Templates', icon: Settings },
    { id: 'results', label: 'Results & Analytics', icon: TrendingUp }
  ] as const

  return (
    <div className="w-full bg-white min-h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-1">Survey Management</h1>
        <p className="text-sm text-gray-600">Create and analyze client surveys with dynamic form generation</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded border border-gray-300 p-1 mb-6 flex gap-1 overflow-x-auto shadow-none">
        {tabs.map((tab) => {
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors whitespace-nowrap text-[12px] uppercase font-bold tracking-tight ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'text-gray-500 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-100 p-1">
        {activeTab === 'dashboard' && (
          <SurveysDashboard
            surveys={surveys}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            onDelete={handleDeleteSurvey}
            onDuplicate={handleDuplicateSurvey}
            onViewResponses={handleViewResponses}
            onStatusChange={handleStatusChange}
          />
        )}

        {activeTab === 'create' && (
          <SurveyFormSection />
        )}

        {activeTab === 'templates' && (
          <SurveyTemplatesSection onUseTemplate={(id) => setActiveTab('create')} />
        )}

        {activeTab === 'results' && (
          <SurveyResultsSection surveys={surveys} />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-xl border border-gray-200">
            <h3 className="text-lg font-bold text-black mb-1">Delete Survey?</h3>
            <p className="text-sm text-gray-600 mb-6">This action cannot be undone. All data associated with this survey will be permanently removed.</p>
            <div className="flex gap-2 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Delete Survey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

