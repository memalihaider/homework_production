'use client'

import { useState, useMemo } from 'react'
import { Calendar, Plus, Search, Filter, Zap, Users, Clock, MapPin, Briefcase, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Link as LinkIcon, Eye, Edit2, Trash2, X, DollarSign, Truck } from 'lucide-react'

export default function MeetingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1))
  const [selectedDate, setSelectedDate] = useState('2025-01-20')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState<number | null>(null)
  const [viewingMeeting, setViewingMeeting] = useState<number | null>(null)
  const teamMembers = ['Ahmed Al-Mazrouei', 'Mohammed Hassan', 'Hassan Al-Mansouri', 'Fatima Al-Ketbi', 'Layla Al-Mansouri', 'Sara Al-Noor', 'Omar Khan']
  const vehicles = ['Company Car', 'Company Van', 'Company Truck', 'Personal Vehicle', 'Client Location', 'Office']
  
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30 mins',
    attendees: [] as string[],
    type: 'Standup',
    linkedJob: '',
    linkedClient: '',
    vehicle: 'Company Car',
    cost: '',
    location: '',
    notes: ''
  })

  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Weekly Operations Standup', date: '2025-01-20', time: '09:00', duration: '30 mins', attendees: ['Ahmed', 'Mohammed', 'Hassan'], type: 'Standup', linkedJob: 'JOB-OPS-2025-001', linkedClient: null, agendaAI: 'Auto-generated', summary: 'Pending', status: 'Scheduled', notes: 'Team sync on weekly progress', decisions: [], vehicle: 'Office', cost: 0, location: 'Office Conference Room' },
    { id: 2, title: 'Job Closeout - Downtown Tower', date: '2025-01-20', time: '14:00', duration: '45 mins', attendees: ['Ahmed', 'Fatima', 'Client'], type: 'Job Review', linkedJob: 'JOB-DOT-2025-001', linkedClient: 'Downtown Business Tower', agendaAI: 'Auto-generated', summary: 'Pending', status: 'Scheduled', notes: 'Final project review with client', decisions: [], vehicle: 'Company Van', cost: 250, location: 'Downtown Business Tower' },
    { id: 3, title: 'Financial Review Q4 2024', date: '2025-01-21', time: '10:00', duration: '60 mins', attendees: ['Fatima', 'Layla', 'Ahmed'], type: 'Financial', linkedJob: null, linkedClient: null, agendaAI: 'Auto-generated', summary: 'Pending', status: 'Scheduled', notes: 'Quarterly financial analysis', decisions: [], vehicle: 'Office', cost: 0, location: 'Office Main Board Room' },
    { id: 4, title: 'HR Policy Update Meeting', date: '2025-01-21', time: '15:00', duration: '30 mins', attendees: ['Fatima', 'Sara', 'Layla'], type: 'HR', linkedJob: null, linkedClient: null, agendaAI: 'Auto-generated', summary: 'Pending', status: 'Scheduled', notes: 'New HR policies discussion', decisions: [], vehicle: 'Office', cost: 0, location: 'HR Office' },
    { id: 5, title: 'Client Feedback Session - Mall Cleaning', date: '2025-01-22', time: '11:00', duration: '45 mins', attendees: ['Ahmed', 'Mohammed', 'Client Contact'], type: 'Client Meeting', linkedJob: 'JOB-MAL-2025-003', linkedClient: 'Shopping Mall Dubai', agendaAI: 'Auto-generated', summary: 'Pending', status: 'Scheduled', notes: 'Client satisfaction feedback', decisions: [], vehicle: 'Company Car', cost: 150, location: 'Shopping Mall Dubai' },
  ])

  const handleAddMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time && newMeeting.attendees.length > 0) {
      if (editingMeeting) {
        // Update existing meeting
        setMeetings(meetings.map(m => m.id === editingMeeting ? { ...m, ...newMeeting, cost: parseInt(newMeeting.cost) || 0 } : m))
        setEditingMeeting(null)
      } else {
        // Create new meeting
        const meeting = {
          id: Math.max(...meetings.map(m => m.id), 0) + 1,
          ...newMeeting,
          cost: parseInt(newMeeting.cost) || 0,
          agendaAI: 'Auto-generated',
          summary: 'Pending',
          status: 'Scheduled',
          decisions: []
        }
        setMeetings([...meetings, meeting as any])
      }
      setNewMeeting({ title: '', date: '', time: '', duration: '30 mins', attendees: [], type: 'Standup', linkedJob: '', linkedClient: '', vehicle: 'Company Car', cost: '', location: '', notes: '' })
      setShowMeetingForm(false)
    }
  }

  const handleEditMeeting = (id: number) => {
    const meeting = meetings.find(m => m.id === id)
    if (meeting) {
      setNewMeeting({ 
        ...meeting, 
        cost: meeting.cost?.toString() || '',
        linkedClient: meeting.linkedClient || ''
      } as any)
      setEditingMeeting(id)
      setShowMeetingForm(true)
      setViewingMeeting(null)
    }
  }

  const handleDeleteMeeting = (id: number) => {
    setMeetings(meetings.filter(m => m.id !== id))
  }

  const handleViewMeeting = (id: number) => {
    setViewingMeeting(viewingMeeting === id ? null : id)
  }

  const filteredMeetings = useMemo(() => {
    return meetings.filter(meeting => {
      const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           meeting.linkedClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           meeting.linkedJob?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || meeting.type === selectedType
      return matchesSearch && matchesType
    })
  }, [searchTerm, selectedType, meetings])

  const meetingTypes = ['all', 'Standup', 'Job Review', 'Financial', 'HR', 'Client Meeting', 'Review', 'Audit', 'Strategic']

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }, [currentMonth])

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const formatDate = (day: number) => {
    return `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  // Get meeting type color function - FIXED THIS PART
  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'Standup': return 'bg-blue-100 text-blue-700'
      case 'Job Review': return 'bg-pink-100 text-pink-700'
      case 'Financial': return 'bg-green-100 text-green-700'
      case 'HR': return 'bg-purple-100 text-purple-700'
      case 'Client Meeting': return 'bg-orange-100 text-orange-700'
      case 'Review': return 'bg-yellow-100 text-yellow-700'
      case 'Audit': return 'bg-red-100 text-red-700'
      case 'Strategic': return 'bg-indigo-100 text-indigo-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Meeting Calendar</h1>
          <p className="text-muted-foreground mt-1">Dynamic calendar with auto agenda creation and full meeting management</p>
        </div>
        <button onClick={() => setShowMeetingForm(!showMeetingForm)} className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span className="font-bold">Schedule Meeting</span>
        </button>
      </div>

      {/* Add/Edit Meeting Form Modal */}
      {showMeetingForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{editingMeeting ? 'Edit Meeting' : 'Schedule New Meeting'}</h3>
            <button onClick={() => { setShowMeetingForm(false); setEditingMeeting(null); }} className="p-1 hover:bg-blue-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Basic Info */}
            <input
              type="text"
              placeholder="Meeting Title *"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-3"
            />
            
            <input type="date" value={newMeeting.date} onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="time" value={newMeeting.time} onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <select value={newMeeting.duration} onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="15 mins">15 mins</option>
              <option value="30 mins">30 mins</option>
              <option value="45 mins">45 mins</option>
              <option value="60 mins">1 hour</option>
              <option value="90 mins">1.5 hours</option>
              <option value="120 mins">2 hours</option>
            </select>

            {/* Meeting Type */}
            <select value={newMeeting.type} onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {meetingTypes.filter(t => t !== 'all').map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
            
            {/* Location */}
            <input type="text" placeholder="Location" value={newMeeting.location} onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            
            {/* Vehicle */}
            <select value={newMeeting.vehicle} onChange={(e) => setNewMeeting({...newMeeting, vehicle: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {vehicles.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>

            {/* Cost */}
            <input type="number" placeholder="Cost (AED)" value={newMeeting.cost} onChange={(e) => setNewMeeting({...newMeeting, cost: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

            {/* Job & Client Links */}
            <input type="text" placeholder="Linked Job ID" value={newMeeting.linkedJob} onChange={(e) => setNewMeeting({...newMeeting, linkedJob: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" placeholder="Linked Client" value={newMeeting.linkedClient} onChange={(e) => setNewMeeting({...newMeeting, linkedClient: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

            {/* Team Members Multi-Select */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-sm font-bold">Team Members *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {teamMembers.map(member => (
                  <label key={member} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-blue-100 cursor-pointer">
                    <input type="checkbox" checked={newMeeting.attendees.includes(member)} onChange={(e) => {
                      if (e.target.checked) {
                        setNewMeeting({...newMeeting, attendees: [...newMeeting.attendees, member]})
                      } else {
                        setNewMeeting({...newMeeting, attendees: newMeeting.attendees.filter(a => a !== member)})
                      }
                    }} className="w-4 h-4" />
                    <span className="text-sm">{member.split(' ')[0]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <textarea placeholder="Meeting Notes" value={newMeeting.notes} onChange={(e) => setNewMeeting({...newMeeting, notes: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-3 h-20" />
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowMeetingForm(false); setEditingMeeting(null); }} className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleAddMeeting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">{editingMeeting ? 'Update Meeting' : 'Create Meeting'}</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Meetings</p>
          <p className="text-3xl font-black text-blue-700">{meetings.length}</p>
          <p className="text-xs text-blue-600 mt-1">All scheduled</p>
        </div>
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">This Month</p>
          <p className="text-3xl font-black text-green-700">{meetings.filter(m => m.date.startsWith(currentMonth.getFullYear() + '-' + String(currentMonth.getMonth() + 1).padStart(2, '0'))).length}</p>
          <p className="text-xs text-green-600 mt-1">{currentMonth.toLocaleDateString('en-US', { month: 'long' })}</p>
        </div>
        <div className="bg-linear-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">With Clients</p>
          <p className="text-3xl font-black text-orange-700">{meetings.filter(m => m.linkedClient).length}</p>
          <p className="text-xs text-orange-600 mt-1">Client meetings</p>
        </div>
        <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Linked to Jobs</p>
          <p className="text-3xl font-black text-purple-700">{meetings.filter(m => m.linkedJob).length}</p>
          <p className="text-xs text-purple-600 mt-1">Job-related</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-card border rounded-lg p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search meetings by title, client name, job ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground mb-2 block">Meeting Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {meetingTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Grid & Meetings List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-card border rounded-lg p-4 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <button onClick={previousMonth} className="p-1 hover:bg-muted rounded">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h3 className="font-bold text-lg">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
            <button onClick={nextMonth} className="p-1 hover:bg-muted rounded">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-bold text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              const dateStr = day ? formatDate(day) : ''
              const dayMeetings = dateStr ? meetings.filter(m => m.date === dateStr) : []
              const isToday = day && dateStr === new Date().toISOString().split('T')[0]
              const isSelected = day && dateStr === selectedDate

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (day) setSelectedDate(dateStr)
                  }}
                  disabled={!day}
                  className={`aspect-square p-2 rounded text-sm font-semibold transition-colors relative ${
                    !day ? 'text-muted-foreground/30' :
                    isSelected ? 'bg-blue-600 text-white' :
                    isToday ? 'bg-green-100 text-green-700 border border-green-300' :
                    dayMeetings.length > 0 ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                    'hover:bg-muted text-foreground'
                  }`}
                >
                  {day}
                  {dayMeetings.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {dayMeetings.slice(0, 3).map((_, i) => (
                        <div key={i} className="h-1 w-1 bg-current rounded-full"></div>
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Meetings List for Selected Date */}
        <div className="bg-card border rounded-lg p-4 lg:col-span-2 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Meetings - {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>

          {filteredMeetings.filter(m => m.date === selectedDate).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No meetings scheduled for this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMeetings.filter(m => m.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time)).map((meeting) => (
                <div key={meeting.id} className={`border rounded-lg p-4 transition-all ${viewingMeeting === meeting.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-muted/30'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-bold text-lg">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {meeting.time} ({meeting.duration})
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleViewMeeting(meeting.id)} className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleEditMeeting(meeting.id)} className="p-2 hover:bg-green-100 text-green-600 rounded transition-colors" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteMeeting(meeting.id)} className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getMeetingTypeColor(meeting.type)}`}>
                      {meeting.type}
                    </span>
                  </div>

                  {/* Attendees */}
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {meeting.attendees.slice(0, 3).join(', ')}{meeting.attendees.length > 3 ? ` +${meeting.attendees.length - 3}` : ''}
                    </span>
                  </div>

                  {/* Cost & Vehicle Display */}
                  <div className="flex flex-wrap gap-2 mb-3 text-xs">
                    {meeting.cost > 0 && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded">
                        <DollarSign className="h-3 w-3" />
                        AED {meeting.cost}
                      </div>
                    )}
                    <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      <Truck className="h-3 w-3" />
                      {meeting.vehicle}
                    </div>
                    {meeting.location && (
                      <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        <MapPin className="h-3 w-3" />
                        {meeting.location}
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {meeting.linkedJob && (
                      <a href={`/admin/jobs/detail?id=${meeting.linkedJob}`} className="flex items-center gap-1 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded hover:bg-pink-200 transition-colors cursor-pointer">
                        <LinkIcon className="h-3 w-3" />
                        Job: {meeting.linkedJob}
                      </a>
                    )}
                    {meeting.linkedClient && (
                      <div className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        <Users className="h-3 w-3" />
                        {meeting.linkedClient}
                      </div>
                    )}
                  </div>

                  {/* Expanded View */}
                  {viewingMeeting === meeting.id && (
                    <div className="pt-3 border-t space-y-2 text-sm">
                      {meeting.notes && (
                        <div>
                          <p className="font-bold text-muted-foreground">Notes:</p>
                          <p>{meeting.notes}</p>
                        </div>
                      )}
                      <p className="text-muted-foreground"><span className="font-bold">Status:</span> {meeting.status}</p>
                      <p className="text-muted-foreground"><span className="font-bold">Created:</span> 2025-01-20</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Zap className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900">Complete Meeting Management</p>
          <p className="text-sm text-blue-800 mt-1">• Schedule meetings with full details (attendees, vehicle, cost, location) • Manage team member attendance • Track meeting costs and transportation • Full CRUD operations (Create, Read, Update, Delete) • Cross-linked with jobs and clients</p>
        </div>
      </div>
    </div>
  )
}