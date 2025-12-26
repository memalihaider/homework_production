'use client'

import { useState, useMemo } from 'react'
import { FileText, Plus, Archive, Zap, Check, AlertCircle, Trash2, Search, Link as LinkIcon, Clock, Users, BarChart3, Briefcase, Eye, Edit2, History } from 'lucide-react'

export default function NotesDecisions() {
  const [selectedMeeting, setSelectedMeeting] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab] = useState<'notes' | 'decisions' | 'actions' | 'history'>('notes')
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [editedNoteText, setEditedNoteText] = useState('')
  const [showDecisionForm, setShowDecisionForm] = useState(false)
  const [newDecision, setNewDecision] = useState({ title: '', description: '', linkedItems: '' })

  const meetingNotes = [
    {
      id: 1,
      meeting: 'Job Closeout - Downtown Tower',
      linkedJob: 'JOB-DOT-2025-001',
      linkedClient: 'Downtown Business Tower',
      date: '2025-01-20',
      time: '14:00',
      organizer: 'Ahmed Al-Mazrouei',
      notes: 'Project completed on schedule. Quality metrics exceeded expectations with 99.5% client satisfaction. All team members performed exceptionally. Equipment usage was optimized resulting in 15% cost savings.',
      decisions: [
        { id: 1, text: 'Approve final invoice of AED 5,000', owner: 'Fatima', status: 'Approved', linkedItems: ['JOB-DOT-2025-001'], date: '2025-01-20', priority: 'High' },
        { id: 2, text: 'Schedule client testimonial recording', owner: 'Ahmed', status: 'Open', linkedItems: ['Downtown Business Tower'], date: '2025-01-20', priority: 'Medium' },
        { id: 3, text: 'Award bonus to Mohammed Bin Ali for exceptional team coordination', owner: 'Fatima', status: 'Approved', linkedItems: [], date: '2025-01-20', priority: 'High' }
      ],
      actionItems: [
        { id: 1, text: 'Send final invoice to client', owner: 'Layla', dueDate: '2025-01-21', status: 'pending', priority: 'High', linkedJob: 'JOB-DOT-2025-001' },
        { id: 2, text: 'Collect client feedback survey', owner: 'Ahmed', dueDate: '2025-01-22', status: 'pending', priority: 'Medium', linkedJob: 'JOB-DOT-2025-001' },
        { id: 3, text: 'Process team bonuses', owner: 'Fatima', dueDate: '2025-01-25', status: 'pending', priority: 'High', linkedJob: null }
      ],
      timeline: 'Job closure will impact next week\'s team scheduling - mark team as available for new assignments',
      history: [
        { timestamp: '2025-01-20 14:45', action: 'Meeting concluded', user: 'Ahmed Al-Mazrouei' },
        { timestamp: '2025-01-20 14:52', action: '3 decisions recorded', user: 'System (AI)' },
        { timestamp: '2025-01-20 14:53', action: '3 action items extracted', user: 'System (AI)' },
        { timestamp: '2025-01-20 15:10', action: 'Notes approved by manager', user: 'Fatima Al-Ketbi' }
      ]
    },
    {
      id: 2,
      meeting: 'Weekly Operations Standup',
      linkedJob: null,
      linkedClient: null,
      date: '2025-01-20',
      time: '09:00',
      organizer: 'Ahmed Al-Mazrouei',
      notes: 'Discussed upcoming job schedules for next 2 weeks. Equipment maintenance scheduled for this weekend. Two new clients onboarded successfully. Team capacity planning shows 85% utilization next week.',
      decisions: [
        { id: 4, text: 'Approve equipment maintenance schedule', owner: 'Ahmed', status: 'Approved', linkedItems: [], date: '2025-01-20', priority: 'High' },
        { id: 5, text: 'Assign new client jobs to Mohammed\'s team', owner: 'Ahmed', status: 'Approved', linkedItems: [], date: '2025-01-20', priority: 'High' }
      ],
      actionItems: [
        { id: 4, text: 'Prepare equipment maintenance checklist', owner: 'Omar', dueDate: '2025-01-25', status: 'in-progress', priority: 'High', linkedJob: null },
        { id: 5, text: 'Send welcome packages to new clients', owner: 'Sara', dueDate: '2025-01-21', status: 'pending', priority: 'Medium', linkedJob: null },
        { id: 6, text: 'Confirm job assignments with Mohammed team', owner: 'Ahmed', dueDate: '2025-01-21', status: 'pending', priority: 'High', linkedJob: null }
      ],
      timeline: 'Weekend maintenance will free up Monday resources for new job assignments. New client jobs scheduled for Jan 25-27.',
      history: [
        { timestamp: '2025-01-20 09:30', action: 'Meeting started', user: 'Ahmed Al-Mazrouei' },
        { timestamp: '2025-01-20 09:45', action: '2 decisions recorded', user: 'System (AI)' },
        { timestamp: '2025-01-20 09:50', action: '3 action items extracted', user: 'System (AI)' }
      ]
    },
    {
      id: 3,
      meeting: 'Financial Review Q4 2024',
      linkedJob: null,
      linkedClient: null,
      date: '2025-01-21',
      time: '10:00',
      organizer: 'Fatima Al-Ketbi',
      notes: 'Q4 revenue exceeded projections by 12% reaching AED 450,000. Payment collection rate at 98% - best performing quarter. Operational costs within budget at 42%. Strong cash flow position enables growth initiatives.',
      decisions: [
        { id: 6, text: 'Approve Q1 2025 budget increase of 15%', owner: 'Fatima', status: 'Approved', linkedItems: [], date: '2025-01-21', priority: 'High' },
        { id: 7, text: 'Reinvest surplus into new equipment', owner: 'Ahmed', status: 'Approved', linkedItems: [], date: '2025-01-21', priority: 'High' },
        { id: 8, text: 'Approve hiring 2 new team members in February', owner: 'Fatima', status: 'Approved', linkedItems: [], date: '2025-01-21', priority: 'High' }
      ],
      actionItems: [
        { id: 7, text: 'Prepare Q1 budget allocation report', owner: 'Layla', dueDate: '2025-01-25', status: 'in-progress', priority: 'High', linkedJob: null },
        { id: 8, text: 'Research and quote new equipment vendors', owner: 'Ahmed', dueDate: '2025-01-28', status: 'pending', priority: 'Medium', linkedJob: null },
        { id: 9, text: 'Post job openings for new team members', owner: 'Fatima', dueDate: '2025-01-27', status: 'pending', priority: 'High', linkedJob: null }
      ],
      timeline: 'Budget approval enables immediate hiring of 2 new team members in February, increasing capacity by 25%.',
      history: [
        { timestamp: '2025-01-21 10:15', action: 'Meeting started', user: 'Fatima Al-Ketbi' },
        { timestamp: '2025-01-21 10:55', action: '3 decisions recorded', user: 'System (AI)' },
        { timestamp: '2025-01-21 11:00', action: '3 action items extracted', user: 'System (AI)' },
        { timestamp: '2025-01-21 11:05', action: 'Report finalized', user: 'Layla' }
      ]
    }
  ]

  const filteredNotes = useMemo(() => {
    return meetingNotes.filter(note => {
      const meetingMatch = selectedMeeting === 'all' || note.linkedJob === selectedMeeting
      const searchMatch = note.meeting.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.notes.toLowerCase().includes(searchTerm.toLowerCase())
      return meetingMatch && searchMatch
    })
  }, [selectedMeeting, searchTerm])

  // Extract all decisions and action items
  const allDecisions = useMemo(() => {
    return filteredNotes.flatMap(note => 
      note.decisions.map(dec => ({ ...dec, meetingName: note.meeting, meetingDate: note.date }))
    )
  }, [filteredNotes])

  const allActionItems = useMemo(() => {
    return filteredNotes.flatMap(note => 
      note.actionItems.map(item => ({ ...item, meetingName: note.meeting, meetingDate: note.date }))
    )
  }, [filteredNotes])

  const stats = useMemo(() => {
    return {
      totalDecisions: allDecisions.length,
      approvedDecisions: allDecisions.filter(d => d.status === 'Approved').length,
      openDecisions: allDecisions.filter(d => d.status === 'Open').length,
      totalActions: allActionItems.length,
      completedActions: allActionItems.filter(a => a.status === 'completed').length,
      inProgressActions: allActionItems.filter(a => a.status === 'in-progress').length,
      pendingActions: allActionItems.filter(a => a.status === 'pending').length,
    }
  }, [allDecisions, allActionItems])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'Open': return 'bg-blue-100 text-blue-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50'
      case 'Medium': return 'text-orange-600 bg-orange-50'
      case 'Low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const meetings = Array.from(new Set(meetingNotes.map(n => n.linkedJob || n.meeting))).filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Notes & Decisions</h1>
          <p className="text-muted-foreground mt-1">Complete decision history, action items, and AI extraction audit trail</p>
        </div>
        <button onClick={() => setShowDecisionForm(!showDecisionForm)} className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span className="font-bold">{showDecisionForm ? 'Cancel' : 'Record Decision'}</span>
        </button>
      </div>

      {/* Decision Form Modal */}
      {showDecisionForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg">Record New Decision</h3>
          <input 
            type="text" 
            placeholder="Decision Title *" 
            value={newDecision.title}
            onChange={(e) => setNewDecision({...newDecision, title: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea 
            placeholder="Decision Description *" 
            value={newDecision.description}
            onChange={(e) => setNewDecision({...newDecision, description: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
          />
          <input 
            type="text" 
            placeholder="Linked Items (comma-separated, e.g. JOB-001, CLIENT-NAME)" 
            value={newDecision.linkedItems}
            onChange={(e) => setNewDecision({...newDecision, linkedItems: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowDecisionForm(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={() => {
              if (newDecision.title && newDecision.description) {
                // Placeholder - would update decisions state
                alert('Decision recorded: ' + newDecision.title);
                setNewDecision({ title: '', description: '', linkedItems: '' });
                setShowDecisionForm(false);
              }
            }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">Record Decision</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Decisions</p>
          <p className="text-3xl font-black text-green-700">{stats.totalDecisions}</p>
          <p className="text-xs text-green-600 mt-1">{stats.approvedDecisions} approved</p>
        </div>
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Action Items</p>
          <p className="text-3xl font-black text-blue-700">{stats.totalActions}</p>
          <p className="text-xs text-blue-600 mt-1">{stats.completedActions} completed</p>
        </div>
        <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">In Progress</p>
          <p className="text-3xl font-black text-purple-700">{stats.inProgressActions}</p>
          <p className="text-xs text-purple-600 mt-1">Action items</p>
        </div>
        <div className="bg-linear-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-3xl font-black text-yellow-700">{stats.pendingActions}</p>
          <p className="text-xs text-yellow-600 mt-1">Awaiting action</p>
        </div>
        <div className="bg-linear-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">AI Extraction</p>
          <p className="text-3xl font-black text-orange-700">100%</p>
          <p className="text-xs text-orange-600 mt-1">Automated</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        {(['notes', 'decisions', 'actions', 'history'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors capitalize flex items-center gap-2 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'notes' && <FileText className="h-4 w-4" />}
            {tab === 'decisions' && <Check className="h-4 w-4" />}
            {tab === 'actions' && <AlertCircle className="h-4 w-4" />}
            {tab === 'history' && <History className="h-4 w-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-card border rounded-lg p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes, decisions, action items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* NOTES TAB */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{note.meeting}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {note.date} at {note.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {note.organizer}
                    </span>
                  </div>
                  {note.linkedJob && (
                    <div className="flex items-center gap-2 mt-2">
                      <a href={`/admin/jobs/detail?id=${note.linkedJob}`} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded hover:bg-pink-200 transition-colors flex items-center gap-1">
                        <LinkIcon className="h-3 w-3" />
                        {note.linkedJob}
                      </a>
                      {note.linkedClient && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          {note.linkedClient}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingNoteId(note.id)} className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Notes Content */}
              {editingNoteId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editedNoteText}
                    onChange={(e) => setEditedNoteText(e.target.value)}
                    className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors">
                    Save Note
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{note.notes}</p>
                </div>
              )}

              {/* Summary Stats for This Note */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <p className="text-2xl font-black text-blue-700">{note.decisions.length}</p>
                  <p className="text-xs text-blue-600">Decisions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-green-700">{note.actionItems.length}</p>
                  <p className="text-xs text-green-600">Action Items</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-orange-700">{note.history.length}</p>
                  <p className="text-xs text-orange-600">Audit Events</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DECISIONS TAB */}
      {activeTab === 'decisions' && (
        <div className="space-y-4">
          {allDecisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Check className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No decisions recorded</p>
            </div>
          ) : (
            allDecisions.map((decision) => (
              <div key={decision.id} className="bg-card border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold">{decision.text}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{decision.meetingName}</span>
                      <span>{decision.meetingDate}</span>
                      <span>Owner: {decision.owner}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(decision.status)}`}>
                      {decision.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getPriorityColor(decision.priority)}`}>
                      {decision.priority}
                    </span>
                  </div>
                </div>

                {decision.linkedItems.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {decision.linkedItems.map((item, idx) => (
                      <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded flex items-center gap-1">
                        <LinkIcon className="h-3 w-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ACTIONS TAB */}
      {activeTab === 'actions' && (
        <div className="space-y-4">
          {allActionItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No action items extracted</p>
            </div>
          ) : (
            allActionItems.map((item) => (
              <div key={item.id} className="bg-card border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold">{item.text}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{item.meetingName}</span>
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
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>

                {item.linkedJob && (
                  <div className="p-2 bg-pink-50 border border-pink-200 rounded">
                    <a href={`/admin/jobs/detail?id=${item.linkedJob}`} className="text-xs text-pink-700 font-bold hover:text-pink-900 flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      Linked to {item.linkedJob}
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-card border rounded-lg p-6">
              <h3 className="font-bold mb-4">{note.meeting} - Decision History</h3>
              <div className="space-y-3">
                {note.history.map((entry, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="text-right text-xs text-muted-foreground min-w-32 pt-1">
                      {entry.timestamp}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                        <p className="font-bold text-sm">{entry.action}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">By: {entry.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Extraction Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Zap className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900">AI Action Item & Decision Extraction</p>
          <p className="text-sm text-blue-800 mt-1">Our AI automatically extracts action items, decisions, and key discussion points from meetings. All items are categorized, assigned ownership, linked to relevant jobs/clients, and tracked through a complete decision history audit trail for full accountability and timeline impact analysis.</p>
        </div>
      </div>
    </div>
  )
}
