'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Star, CheckCircle, AlertCircle, Clock, MapPin, Phone, Mail, FileText, Send, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'

// Client Survey Interface
interface SurveyQuestion {
  id: number
  question: string
  type: 'rating' | 'yesno' | 'multiple' | 'text'
  options?: string[]
  required: boolean
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

// Survey questions
const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: 'How satisfied are you with our overall service?',
    type: 'rating',
    required: true
  },
  {
    id: 2,
    question: 'How would you rate the cleanliness of your facility after our service?',
    type: 'rating',
    required: true
  },
  {
    id: 3,
    question: 'How professional was our team?',
    type: 'rating',
    required: true
  },
  {
    id: 4,
    question: 'Did we complete the service within the agreed timeframe?',
    type: 'yesno',
    required: true
  },
  {
    id: 5,
    question: 'Would you recommend our services to others?',
    type: 'yesno',
    required: true
  },
  {
    id: 6,
    question: 'Which services are you most satisfied with?',
    type: 'multiple',
    options: ['Deep Cleaning', 'Regular Maintenance', 'Sanitization', 'Equipment Cleaning', 'Other'],
    required: false
  },
  {
    id: 7,
    question: 'Please share any additional feedback or suggestions for improvement.',
    type: 'text',
    required: false
  }
]

// Shared client data (same as used throughout the app)
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

function ClientSurvey() {
  const searchParams = useSearchParams()
  const surveyId = searchParams.get('id')
  const clientId = searchParams.get('clientId')

  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<number, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    if (clientId) {
      const foundClient = sharedClients.find(c => c.id === parseInt(clientId))
      setClient(foundClient)
    }
  }, [clientId])

  const handleRatingChange = useCallback((questionId: number, rating: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: { answer: rating, rating }
    }))
  }, [])

  const handleYesNoChange = useCallback((questionId: number, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: { answer }
    }))
  }, [])

  const handleMultipleChoiceChange = useCallback((questionId: number, answers: string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: { answer: answers }
    }))
  }, [])

  const handleTextChange = useCallback((questionId: number, text: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: { answer: text }
    }))
  }, [])

  const calculateOverallRating = useCallback(() => {
    const ratingQuestions = [1, 2, 3] // Rating questions
    const ratings = ratingQuestions.map(q => responses[q]?.rating).filter(r => r !== undefined)
    return ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0
  }, [responses])

  const handleSubmit = useCallback(async () => {
    if (!client || !surveyId) return

    setIsSubmitting(true)

    try {
      const surveyResponses: SurveyResponse[] = Object.entries(responses).map(([questionId, response]) => ({
        questionId: parseInt(questionId),
        answer: response.answer,
        rating: response.rating
      }))

      const completedSurvey: CompletedSurvey = {
        id: parseInt(surveyId),
        clientId: client.id,
        clientName: client.name,
        clientEmail: client.email,
        serviceType: 'General Cleaning', // This could be passed via URL params
        surveyDate: new Date().toISOString(),
        status: 'completed',
        responses: surveyResponses,
        overallRating: calculateOverallRating(),
        comments: responses[7]?.answer || ''
      }

      // Store in localStorage (in real app, this would be an API call)
      const existingSurveys = JSON.parse(localStorage.getItem('clientSurveys') || '[]')
      const updatedSurveys = [...existingSurveys, completedSurvey]
      localStorage.setItem('clientSurveys', JSON.stringify(updatedSurveys))

      setIsCompleted(true)
    } catch (error) {
      console.error('Error submitting survey:', error)
      alert('Error submitting survey. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [client, surveyId, responses, calculateOverallRating])

  const currentQuestion = surveyQuestions[currentStep]
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100
  const isLastQuestion = currentStep === surveyQuestions.length - 1
  const canProceed = currentQuestion?.required ? responses[currentQuestion.id] !== undefined : true

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate your time and valuable input.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Overall Rating:</strong> {calculateOverallRating().toFixed(1)}/5
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You can now close this window or return to your dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service Satisfaction Survey</h1>
              <p className="text-gray-600 mt-1">Help us improve our services</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Question {currentStep + 1} of {surveyQuestions.length}</p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.company}</p>
                <p className="text-sm text-gray-600">{client.location}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Survey ID: {surveyId}</p>
                <p>Client ID: {clientId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestion.question}
            </h2>
            {currentQuestion.required && (
              <span className="text-sm text-red-600 font-medium">* Required</span>
            )}
          </div>

          {/* Question Content */}
          <div className="mb-8">
            {currentQuestion.type === 'rating' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(currentQuestion.id, star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          (responses[currentQuestion.id]?.rating || 0) >= star
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            )}

            {currentQuestion.type === 'yesno' && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleYesNoChange(currentQuestion.id, 'Yes')}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    responses[currentQuestion.id]?.answer === 'Yes'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleYesNoChange(currentQuestion.id, 'No')}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    responses[currentQuestion.id]?.answer === 'No'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            )}

            {currentQuestion.type === 'multiple' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <label key={option} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={(responses[currentQuestion.id]?.answer || []).includes(option)}
                      onChange={(e) => {
                        const currentAnswers = responses[currentQuestion.id]?.answer || []
                        if (e.target.checked) {
                          handleMultipleChoiceChange(currentQuestion.id, [...currentAnswers, option])
                        } else {
                          handleMultipleChoiceChange(currentQuestion.id, currentAnswers.filter((a: string) => a !== option))
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <textarea
                value={responses[currentQuestion.id]?.answer || ''}
                onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
                placeholder="Please share your feedback..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Survey
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Your feedback matters!</span>
            </div>
            <p className="text-blue-700 text-sm">
              This survey helps us maintain the highest standards of service quality and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClientSurveyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    }>
      <ClientSurvey />
    </Suspense>
  )
}
