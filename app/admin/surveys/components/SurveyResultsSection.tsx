'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, Download } from 'lucide-react'
import { Survey, MOCK_SURVEYS, MOCK_RESPONSES } from '@/lib/surveys-data'

interface Props {
  surveys: Survey[]
}

export default function SurveyResultsSection({ surveys }: Props) {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null)

  const stats = useMemo(() => {
    const totalResponses = MOCK_RESPONSES.length
    const avgCompletionRate = Math.round(surveys.reduce((acc, s) => acc + s.completionRate, 0) / surveys.length)
    const totalSurveys = surveys.length
    const avgRating = totalResponses > 0 
      ? (MOCK_RESPONSES.reduce((acc, r) => acc + (r.overallRating || 0), 0) / totalResponses).toFixed(1)
      : 'N/A'

    return { totalResponses, avgCompletionRate, totalSurveys, avgRating }
  }, [surveys])

  const selectedSurveyData = selectedSurvey ? surveys.find(s => s.id === selectedSurvey) : null
  const surveyResponses = selectedSurvey ? MOCK_RESPONSES.filter(r => r.surveyId === selectedSurvey) : []

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded border border-gray-300 p-3 shadow-none">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Surveys</p>
          <p className="text-xl font-bold text-black">{stats.totalSurveys}</p>
        </div>
        <div className="bg-white rounded border border-gray-300 p-3 shadow-none">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Responses</p>
          <p className="text-xl font-bold text-black">{stats.totalResponses}</p>
        </div>
        <div className="bg-white rounded border border-gray-300 p-3 shadow-none">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Completion</p>
          <p className="text-xl font-bold text-black">{stats.avgCompletionRate}%</p>
        </div>
        <div className="bg-white rounded border border-gray-300 p-3 shadow-none">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Avg Rating</p>
          <p className="text-xl font-bold text-black">{stats.avgRating}/5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Survey Selector */}
        <div className="bg-white rounded border border-gray-300 p-3 shadow-none">
          <h3 className="text-sm font-bold text-black mb-3">Survey List</h3>
          <div className="space-y-1">
            {surveys.map((survey) => (
              <button
                key={survey.id}
                onClick={() => setSelectedSurvey(survey.id)}
                className={`w-full text-left px-3 py-2 rounded transition-colors ${
                  selectedSurvey === survey.id
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-900 hover:bg-gray-50 border border-transparent'
                }`}
              >
                <p className="font-bold text-[13px]">{survey.title}</p>
                <p className={`text-[10px] uppercase font-medium ${selectedSurvey === survey.id ? 'text-gray-300' : 'text-gray-500'}`}>
                  {MOCK_RESPONSES.filter(r => r.surveyId === survey.id).length} responses
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          {selectedSurveyData ? (
            <div className="space-y-4">
              {/* Survey Info */}
              <div className="bg-white rounded border border-gray-300 p-4 shadow-none">
                <h3 className="text-base font-bold text-black mb-3">{selectedSurveyData.title}</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                   <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Client</p>
                    <p className="text-[11px] font-bold text-black truncate">{selectedSurveyData.clientName}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Company</p>
                    <p className="text-[11px] font-bold text-black truncate">{selectedSurveyData.company}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Status</p>
                    <p className="text-[11px] font-bold text-black capitalize">{selectedSurveyData.status}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Responses</p>
                    <p className="text-[11px] font-bold text-black">{selectedSurveyData.responseCount}/{selectedSurveyData.sendCount}</p>
                  </div>
                </div>
              </div>

              {/* Responses LIST */}
              {surveyResponses.length > 0 && (
                <div className="bg-white rounded border border-gray-300 p-4 shadow-none">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-black text-sm">Response Detail ({surveyResponses.length})</h4>
                    <button className="flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase font-bold bg-black text-white rounded hover:bg-gray-800 transition-colors border border-black">
                      <Download className="w-3 h-3" />
                      CSV Export
                    </button>
                  </div>
                  <div className="space-y-2">
                    {surveyResponses.map((response) => (
                      <div key={response.id} className="bg-white border border-gray-200 rounded p-b flex items-center justify-between p-3">
                        <div>
                          <p className="font-bold text-[13px] text-black">{response.clientName}</p>
                          <p className="text-[11px] text-gray-500">{response.submittedDate}</p>
                        </div>
                        {response.overallRating && (
                          <div className="bg-white border border-gray-300 px-3 py-1 rounded">
                            <span className="font-bold text-[14px] text-black">{response.overallRating}</span>
                            <span className="text-[11px] text-gray-400 ml-0.5">/ 5.0</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded border border-gray-300 p-10 text-center shadow-none">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2 opacity-50" />
              <p className="text-sm text-gray-500">Select a survey to view analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
