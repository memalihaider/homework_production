'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Question {
  id: string
  text: string
  type: 'text' | 'textarea' | 'multiple-choice' | 'checkbox' | 'rating' | 'scale' | 'NPS' | 'date'
  required: boolean
  options?: string[]
}

interface FormSection {
  id: string
  title: string
  description?: string
  questions: Question[]
}

export default function SurveyFormSection() {
  const [sections, setSections] = useState<FormSection[]>([
    {
      id: '1',
      title: 'Basic Information',
      description: 'Please provide your feedback',
      questions: []
    }
  ])
  const [title, setTitle] = useState('New Survey')
  const [description, setDescription] = useState('')

  const addSection = () => {
    const newSection: FormSection = {
      id: Date.now().toString(),
      title: 'New Section',
      questions: []
    }
    setSections([...sections, newSection])
  }

  const addQuestion = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: [
            ...section.questions,
            {
              id: Date.now().toString(),
              text: 'New Question',
              type: 'text',
              required: false
            }
          ]
        }
      }
      return section
    }))
  }

  const removeQuestion = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.filter(q => q.id !== questionId)
        }
      }
      return section
    }))
  }

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId))
  }

  const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ))
  }

  const updateQuestion = (sectionId: string, questionId: string, updates: Partial<Question>) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(q =>
            q.id === questionId ? { ...q, ...updates } : q
          )
        }
      }
      return section
    }))
  }

  return (
    <div className="space-y-4">
      {/* Survey Title */}
      <div className="bg-white rounded border border-gray-300 p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Survey Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="e.g. Client Satisfaction Survey"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Description (Internal)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white text-black focus:outline-none focus:ring-1 focus:ring-black min-h-[60px]"
              placeholder="Describe the purpose of this survey..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded border border-gray-300 p-4">
            <div className="flex items-start justify-between mb-3 border-b border-gray-200 pb-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, { title: e.target.value })}
                  className="text-base font-bold text-black bg-transparent border-0 focus:outline-none focus:ring-0 w-full p-0"
                  placeholder="Section Title"
                />
                <textarea
                  value={section.description || ''}
                  onChange={(e) => updateSection(section.id, { description: e.target.value })}
                  className="w-full p-0 text-xs text-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none mt-0.5"
                  placeholder="Add section description..."
                  rows={1}
                />
              </div>
              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(section.id)}
                  className="p-1.5 hover:bg-red-50 rounded text-red-500 transition-colors ml-2 border border-transparent hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-2 mb-3">
              {section.questions.map((question) => (
                <div key={question.id} className="bg-white rounded p-3 space-y-2 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={question.text}
                        onChange={(e) => updateQuestion(section.id, question.id, { text: e.target.value })}
                        className="w-full text-sm font-medium text-black bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-black py-0.5"
                        placeholder="Enter question here"
                      />
                    </div>
                    <button
                      onClick={() => removeQuestion(section.id, question.id)}
                      className="p-1.5 hover:bg-red-50 rounded text-red-500 transition-colors border border-transparent hover:border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={question.type}
                      onChange={(e) => updateQuestion(section.id, question.id, { type: e.target.value as any })}
                      className="px-2 py-1 border border-gray-300 rounded bg-white text-black text-[11px] font-bold uppercase tracking-tight focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                    >
                      <option value="text">Short Text</option>
                      <option value="textarea">Long Text</option>
                      <option value="multiple-choice">Choice</option>
                      <option value="checkbox">Check</option>
                      <option value="rating">Rating</option>
                      <option value="scale">Scale</option>
                      <option value="NPS">NPS</option>
                      <option value="date">Date</option>
                    </select>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-tight text-gray-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => updateQuestion(section.id, question.id, { required: e.target.checked })}
                        className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span>Required</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => addQuestion(section.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-colors border border-gray-200 hover:border-gray-400"
            >
              <Plus className="w-3.5 h-3.5" />
              ADD QUESTION
            </button>
          </div>
        ))}
      </div>

      {/* Add Section Button */}
      <button
        onClick={addSection}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-400 text-[11px] font-bold uppercase tracking-widest text-gray-500 rounded hover:border-black hover:text-black transition-all bg-white"
      >
        <Plus className="w-4 h-4" />
        Add New Section
      </button>

      {/* Action Buttons */}
      <div className="flex gap-2 sticky bottom-0 bg-white border-t border-gray-300 py-3 -mx-4 -mb-4 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="flex-1 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          Save Draft
        </button>
        <button className="flex-1 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-black text-white rounded hover:bg-gray-800 transition-colors">
          Publish Survey
        </button>
      </div>
    </div>
  )
}
