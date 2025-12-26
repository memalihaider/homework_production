'use client'

import { useState } from 'react'
import { ArrowLeft, Edit2, Share2, Download, Users, Clock, MapPin, CheckCircle, AlertCircle, Zap, FileText, Eye, Save, MessageSquare, Link as LinkIcon, Trash2, Plus } from 'lucide-react'

export default function MeetingDetail() {
  const [selectedTab, setSelectedTab] = useState<'details' | 'agenda' | 'notes' | 'summary'>('details')
  const [isEditing, setIsEditing] = useState(false)
  const [meetingNotes, setMeetingNotes] = useState('')
  const [showDecisionForm, setShowDecisionForm] = useState(false)
  const [newDecision, setNewDecision] = useState({ title: '', description: '', linkedItems: '' })
  const [actionItems, setActionItems] = useState<Array<{id: number; text: string; owner: string; dueDate: string; status: 'pending' | 'in-progress' | 'completed'}>>([
    { id: 1, text: 'Send final invoice to client', owner: 'Fatima Al-Ketbi', dueDate: '2025-01-21', status: 'pending' },
    { id: 2, text: 'Collect client satisfaction feedback', owner: 'Ahmed Al-Mazrouei', dueDate: '2025-01-22', status: 'pending' },
  ])
  const [decisions, setDecisions] = useState<Array<{id: number; title: string; description: string; linkedItems: string[]; owner: string; date: string}>>([
    { id: 1, title: 'Approved final job completion', description: 'Downtown Tower deep cleaning project officially closed', linkedItems: ['JOB-DOT-2025-001'], owner: 'Ahmed Al-Mazrouei', date: '2025-01-20' },
  ])
  const [newNote, setNewNote] = useState('')

  const handleRecordDecision = () => {
    if (newDecision.title && newDecision.description) {
      const decision = {
        id: Math.max(...decisions.map(d => d.id), 0) + 1,
        title: newDecision.title,
        description: newDecision.description,
        linkedItems: newDecision.linkedItems ? newDecision.linkedItems.split(',').map(s => s.trim()) : [],
        owner: 'Current User',
        date: new Date().toISOString().split('T')[0]
      }
      setDecisions([...decisions, decision])
      setNewDecision({ title: '', description: '', linkedItems: '' })
      setShowDecisionForm(false)
    }
  }

  const meeting = {
    id: 2,
    title: 'Job Closeout - Downtown Tower',
    date: '2025-01-20',
    time: '14:00',
    duration: '45 mins',
    location: 'Conference Room B',
    organizer: 'Ahmed Al-Mazrouei',
    linkedJob: 'JOB-DOT-2025-001',
    linkedClient: 'Downtown Business Tower',
    description: 'Final closeout meeting for the Downtown Tower deep cleaning project. Review quality metrics, client feedback, and final payment status.',
    attendees: [
      { name: 'Ahmed Al-Mazrouei', role: 'Operations Manager', status: 'Accepted', accountability: 'Lead' },
      { name: 'Fatima Al-Ketbi', role: 'HR Director', status: 'Accepted', accountability: 'Approver' },
      { name: 'Client Representative', role: 'Facility Manager', status: 'Pending', accountability: 'Feedback Provider' },
    ],
    aiGeneratedAgenda: [
      { item: 'Project completion review', timeAllocated: '10 mins', owner: 'Ahmed' },
      { item: 'Quality inspection results', timeAllocated: '10 mins', owner: 'Ahmed' },
      { item: 'Client satisfaction feedback', timeAllocated: '10 mins', owner: 'Client Rep' },
      { item: 'Invoice and payment status', timeAllocated: '10 mins', owner: 'Fatima' },
      { item: 'Next steps and follow-up', timeAllocated: '5 mins', owner: 'Ahmed' },
    ],
    aiSummary: 'Pending - will be generated post-meeting',
    actionItems: [],
    decisions: [],
    status: 'Scheduled',
    accountability: {
      createdBy: 'Ahmed Al-Mazrouei',
      createdDate: '2025-01-15',
      owner: 'Ahmed Al-Mazrouei',
      stakeholders: ['Fatima Al-Ketbi', 'Client Team'],
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black">{meeting.title}</h1>
            <p className="text-muted-foreground mt-1">Job Closeout Review</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setSelectedTab('details')}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors ${
            selectedTab === 'details'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setSelectedTab('agenda')}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            selectedTab === 'agenda'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className="h-4 w-4" />
          AI Agenda
        </button>
        <button
          onClick={() => setSelectedTab('summary')}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            selectedTab === 'summary'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="h-4 w-4" />
          AI Summary
        </button>
      </div>

      {/* DETAILS TAB */}
      {selectedTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Info */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-bold">Meeting Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                  <p className="font-bold">{meeting.date} at {meeting.time}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-bold">{meeting.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-bold">{meeting.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Organizer</p>
                  <p className="font-bold">{meeting.organizer}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{meeting.description}</p>
              </div>
            </div>

            {/* Cross-Linked Resources */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-bold">Cross-Linked Resources</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer">
                  <p className="text-xs text-muted-foreground mb-1">Linked Job</p>
                  <p className="font-bold">{meeting.linkedJob}</p>
                  <p className="text-xs text-pink-600 mt-1">Downtown Tower Deep Cleaning - Status: Completed</p>
                </div>
                <div className="p-3 border rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer">
                  <p className="text-xs text-muted-foreground mb-1">Linked Client</p>
                  <p className="font-bold">{meeting.linkedClient}</p>
                  <p className="text-xs text-orange-600 mt-1">Contract Value: AED 5,000 | Status: Active</p>
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Attendees & Accountability
              </h3>
              <div className="space-y-3">
                {meeting.attendees.map((attendee, idx) => (
                  <div key={idx} className="p-3 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-bold">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground">{attendee.role}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${attendee.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {attendee.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{attendee.accountability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Accountability Tracking */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Accountability Tracking
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">Created By</p>
                  <p className="font-bold text-sm">{meeting.accountability.createdBy}</p>
                  <p className="text-xs text-muted-foreground mt-1">{meeting.accountability.createdDate}</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">Meeting Owner</p>
                  <p className="font-bold text-sm">{meeting.accountability.owner}</p>
                  <p className="text-xs text-muted-foreground mt-1">Responsible for outcomes</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">Stakeholders</p>
                  <div className="space-y-1 mt-1">
                    {meeting.accountability.stakeholders.map((stakeholder, idx) => (
                      <p key={idx} className="text-sm font-semibold">{stakeholder}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-bold mb-3">Status</h3>
              <div className="space-y-2">
                <span className="block text-xs bg-blue-100 text-blue-700 px-3 py-2 rounded font-semibold">
                  {meeting.status}
                </span>
                <p className="text-xs text-muted-foreground">Meeting scheduled and confirmed with all attendees</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI AGENDA TAB */}
      {selectedTab === 'agenda' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <Zap className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-900">AI-Generated Agenda</p>
              <p className="text-sm text-blue-800 mt-1">This agenda was automatically created based on meeting type, attendees, and linked job/client. It's fully customizable.</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-bold mb-4">Meeting Agenda</h3>
            <div className="space-y-3">
              {meeting.aiGeneratedAgenda.map((item, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold">{idx + 1}. {item.item}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.timeAllocated}
                        </span>
                        <span>Owner: {item.owner}</span>
                      </div>
                    </div>
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">Total Meeting Time: {meeting.duration}</p>
            </div>
          </div>
        </div>
      )}

      {/* AI NOTES & DECISIONS TAB */}
      {selectedTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Notes */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Meeting Notes
                </h3>
                <button onClick={() => setIsEditing(!isEditing)} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                  {isEditing ? 'Done' : 'Edit'}
                </button>
              </div>
              
              {isEditing ? (
                <textarea
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  placeholder="Add detailed meeting notes, discussion points, and observations..."
                  className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="p-4 bg-muted/50 rounded-lg min-h-40">
                  {meetingNotes || <p className="text-muted-foreground italic">No notes yet. Click Edit to add notes.</p>}
                </div>
              )}
            </div>

            {/* Action Items */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-bold">Action Items</h3>
              <div className="space-y-3">
                {actionItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-bold">{item.text}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.owner}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due: {item.dueDate}
                          </span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <select
                      value={item.status}
                      onChange={(e) => {
                        const updated = [...actionItems]
                        updated[actionItems.indexOf(item)].status = e.target.value as any
                        setActionItems(updated)
                      }}
                      className="text-xs px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-xs px-3 py-2 border rounded-lg hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
                Add Action Item
              </button>
            </div>

            {/* Decisions */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <h3 className="font-bold">Key Decisions</h3>
              <div className="space-y-3">
                {decisions.map((decision) => (
                  <div key={decision.id} className="p-4 border rounded-lg bg-green-50 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-green-900">{decision.title}</p>
                        <p className="text-sm text-green-800 mt-1">{decision.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-green-700">
                          <span>Owner: {decision.owner}</span>
                          <span>{decision.date}</span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {decision.linkedItems.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-green-200">
                        {decision.linkedItems.map((item, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                            <LinkIcon className="h-3 w-3" />
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Record Decision Form */}
              {showDecisionForm && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                  <h4 className="font-bold text-sm">Record New Decision</h4>
                  <input 
                    type="text" 
                    placeholder="Decision Title *" 
                    value={newDecision.title}
                    onChange={(e) => setNewDecision({...newDecision, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <textarea 
                    placeholder="Decision Description *" 
                    value={newDecision.description}
                    onChange={(e) => setNewDecision({...newDecision, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm h-16"
                  />
                  <input 
                    type="text" 
                    placeholder="Linked Items (comma-separated, e.g. JOB-001, JOB-002)" 
                    value={newDecision.linkedItems}
                    onChange={(e) => setNewDecision({...newDecision, linkedItems: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => setShowDecisionForm(false)} className="px-3 py-2 border rounded-lg hover:bg-gray-100 text-sm transition-colors">Cancel</button>
                    <button onClick={handleRecordDecision} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors font-bold">Record Decision</button>
                  </div>
                </div>
              )}
              
              <button onClick={() => setShowDecisionForm(!showDecisionForm)} className="flex items-center gap-2 text-xs px-3 py-2 border rounded-lg hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
                {showDecisionForm ? 'Cancel' : 'Record Decision'}
              </button>
            </div>
          </div>

          {/* Right Column: Summary Stats */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <h3 className="font-bold">Summary</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">Action Items</p>
                  <p className="text-2xl font-black text-blue-600">{actionItems.length}</p>
                  <p className="text-xs text-blue-700 mt-1">{actionItems.filter(a => a.status === 'completed').length} completed</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">Decisions</p>
                  <p className="text-2xl font-black text-green-600">{decisions.length}</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-1">Completion Rate</p>
                  <p className="text-2xl font-black text-orange-600">{actionItems.length > 0 ? Math.round((actionItems.filter(a => a.status === 'completed').length / actionItems.length) * 100) : 0}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI SUMMARY TAB */}
      {selectedTab === 'summary' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex gap-3">
            <Eye className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-purple-900">AI Meeting Summary</p>
              <p className="text-sm text-purple-800 mt-1">Post-meeting AI summaries will automatically extract action items, key decisions, and generate a searchable transcript. This will be populated after the meeting concludes.</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-muted-foreground">Meeting summary will be generated after the meeting</p>
              <p className="text-xs text-muted-foreground mt-1">Scheduled for: 2025-01-20 at 14:00</p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <p className="text-sm font-bold text-blue-900 mb-2">What the AI Summary will include:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Key discussion points and outcomes</li>
                <li>✓ Action items with ownership and deadlines</li>
                <li>✓ Critical decisions made during the meeting</li>
                <li>✓ Timeline impact analysis on linked jobs</li>
                <li>✓ Follow-up items and next steps</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
