'use client'

import { useState, useEffect, useMemo } from 'react'
import { BarChart3, TrendingUp, Users, Star, Calendar, Download, Filter, Search, CheckCircle } from 'lucide-react'

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

interface SurveyQuestion {
  id: number
  type: 'rating' | 'yesno' | 'multiple' | 'text'
  question: string
  options?: string[]
  required: boolean
}

const surveyQuestions: SurveyQuestion[] = [
  { id: 1, type: 'rating', question: 'How satisfied are you with our overall service?', required: true },
  { id: 2, type: 'rating', question: 'How would you rate the cleanliness of your facility after our service?', required: true },
  { id: 3, type: 'rating', question: 'How professional was our team?', required: true },
  { id: 4, type: 'yesno', question: 'Did we complete the service within the agreed timeframe?', required: true },
  { id: 5, type: 'yesno', question: 'Would you recommend our services to others?', required: true },
  { id: 6, type: 'multiple', question: 'Which services are you most satisfied with?', options: ['Deep Cleaning', 'Regular Maintenance', 'Sanitization', 'Equipment Cleaning', 'Other'], required: false },
  { id: 7, type: 'text', question: 'Please share any additional feedback or suggestions for improvement.', required: false }
]

export default function SurveyResults() {
  const [completedSurveys, setCompletedSurveys] = useState<CompletedSurvey[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')

  useEffect(() => {
    const storedSurveys = JSON.parse(localStorage.getItem('clientSurveys') || '[]')
    setCompletedSurveys(storedSurveys)
  }, [])

  const filteredSurveys = useMemo(() => {
    return completedSurveys.filter(survey => {
      const matchesSearch = survey.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.serviceType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesService = serviceFilter === 'All' || survey.serviceType === serviceFilter

      const matchesDate = dateFilter === 'All' || (() => {
        const surveyDate = new Date(survey.surveyDate)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - surveyDate.getTime()) / (1000 * 60 * 60 * 24))

        switch (dateFilter) {
          case 'Last 7 days': return daysDiff <= 7
          case 'Last 30 days': return daysDiff <= 30
          case 'Last 90 days': return daysDiff <= 90
          default: return true
        }
      })()

      return matchesSearch && matchesService && matchesDate
    })
  }, [completedSurveys, searchTerm, serviceFilter, dateFilter])

  const analytics = useMemo(() => {
    if (filteredSurveys.length === 0) return null

    const totalSurveys = filteredSurveys.length
    const avgRating = filteredSurveys.reduce((sum, s) => sum + (s.overallRating || 0), 0) / totalSurveys

    // Calculate rating distribution
    const ratingDistribution = [0, 0, 0, 0, 0] // 1-5 stars
    filteredSurveys.forEach(survey => {
      if (survey.overallRating) {
        const rating = Math.floor(survey.overallRating)
        if (rating >= 1 && rating <= 5) {
          ratingDistribution[rating - 1]++
        }
      }
    })

    // Calculate yes/no responses
    const yesNoResponses = {
      timelyService: { yes: 0, no: 0 },
      wouldRecommend: { yes: 0, no: 0 }
    }

    filteredSurveys.forEach(survey => {
      survey.responses.forEach(response => {
        if (response.questionId === 4) { // Timely service
          if (response.answer === 'Yes') yesNoResponses.timelyService.yes++
          else if (response.answer === 'No') yesNoResponses.timelyService.no++
        }
        if (response.questionId === 5) { // Would recommend
          if (response.answer === 'Yes') yesNoResponses.wouldRecommend.yes++
          else if (response.answer === 'No') yesNoResponses.wouldRecommend.no++
        }
      })
    })

    // Calculate service satisfaction
    const serviceSatisfaction = {
      'Deep Cleaning': 0,
      'Regular Maintenance': 0,
      'Sanitization': 0,
      'Equipment Cleaning': 0,
      'Other': 0
    }

    filteredSurveys.forEach(survey => {
      survey.responses.forEach(response => {
        if (response.questionId === 6 && Array.isArray(response.answer)) {
          response.answer.forEach(service => {
            if (service in serviceSatisfaction) {
              serviceSatisfaction[service as keyof typeof serviceSatisfaction]++
            }
          })
        }
      })
    })

    return {
      totalSurveys,
      avgRating,
      ratingDistribution,
      yesNoResponses,
      serviceSatisfaction
    }
  }, [filteredSurveys])

  const exportResults = () => {
    const csvData = [
      ['Client Name', 'Service Type', 'Survey Date', 'Overall Rating', 'Comments'],
      ...filteredSurveys.map(survey => [
        survey.clientName,
        survey.serviceType,
        survey.surveyDate,
        survey.overallRating?.toString() || '',
        survey.comments || ''
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `survey_results_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Survey Results & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive analysis of client feedback and satisfaction</p>
          </div>
          <button
            onClick={exportResults}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Export Results
          </button>
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
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Services</option>
            <option value="Office Deep Cleaning">Office Deep Cleaning</option>
            <option value="Medical Facility Sanitization">Medical Facility Sanitization</option>
            <option value="Hotel Deep Cleaning">Hotel Deep Cleaning</option>
            <option value="Warehouse Cleaning">Warehouse Cleaning</option>
            <option value="General Cleaning">General Cleaning</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Time</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
          </select>
        </div>

        {analytics && (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Surveys</p>
                    <p className="text-xl font-bold text-gray-900">{analytics.totalSurveys}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-xl font-bold text-gray-900">{analytics.avgRating.toFixed(1)}</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Timely Service</p>
                    <p className="text-xl font-bold text-gray-900">
                      {analytics.yesNoResponses.timelyService.yes > 0 ?
                        Math.round((analytics.yesNoResponses.timelyService.yes / (analytics.yesNoResponses.timelyService.yes + analytics.yesNoResponses.timelyService.no)) * 100) : 0}%
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Would Recommend</p>
                    <p className="text-xl font-bold text-gray-900">
                      {analytics.yesNoResponses.wouldRecommend.yes > 0 ?
                        Math.round((analytics.yesNoResponses.wouldRecommend.yes / (analytics.yesNoResponses.wouldRecommend.yes + analytics.yesNoResponses.wouldRecommend.no)) * 100) : 0}%
                    </p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${analytics.totalSurveys > 0 ? (analytics.ratingDistribution[rating - 1] / analytics.totalSurveys) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {analytics.ratingDistribution[rating - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Satisfaction */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Satisfaction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(analytics.serviceSatisfaction).map(([service, count]) => (
                  <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{service}</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Survey Results Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Individual Survey Responses</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timely</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSurveys.map((survey) => {
                  const timelyResponse = survey.responses.find(r => r.questionId === 4)?.answer
                  const recommendResponse = survey.responses.find(r => r.questionId === 5)?.answer

                  return (
                    <tr key={survey.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{survey.clientName}</div>
                        <div className="text-sm text-gray-500">{survey.clientEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {survey.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(survey.surveyDate).toLocaleDateString()}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          timelyResponse === 'Yes' ? 'bg-green-100 text-green-800' :
                          timelyResponse === 'No' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {timelyResponse || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          recommendResponse === 'Yes' ? 'bg-green-100 text-green-800' :
                          recommendResponse === 'No' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {recommendResponse || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {survey.comments || '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filteredSurveys.length === 0 && (
            <div className="px-6 py-12 text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No survey results found</p>
              <p className="text-sm text-gray-400 mt-1">Complete surveys will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}