'use client'

import { useState, useCallback } from 'react'
import { 
  Video, 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  ChevronRight,
  Trash2,
  X
} from 'lucide-react'

export default function Meetings() {
  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Weekly Team Briefing', type: 'Internal', date: '2025-12-22', time: '09:00', attendees: ['Ahmed', 'John', 'Sarah'], status: 'Scheduled', location: 'Main Office', organizer: 'Maria' },
    { id: 2, title: 'Client Meeting - Villa Project', type: 'Client', date: '2025-12-23', time: '14:00', attendees: ['Ahmed Al-Mansoori', 'John Smith'], status: 'Scheduled', location: 'Palm Jumeirah', organizer: 'John' },
    { id: 3, title: 'Operations Review', type: 'Internal', date: '2025-12-20', time: '11:00', attendees: ['Maria', 'John', 'Ahmed'], status: 'Completed', location: 'Conference Room', organizer: 'Maria' },
    { id: 4, title: 'New Staff Orientation', type: 'Internal', date: '2025-12-24', time: '10:00', attendees: ['HR Team', 'New Hires'], status: 'Scheduled', location: 'Training Room', organizer: 'Maria' }
  ])
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [formData, setFormData] = useState({ title: '', type: 'Internal', date: '', time: '', location: '', organizer: '', attendees: '' })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All' || meeting.type === filterType
    return matchesSearch && matchesType
  })

  const upcomingCount = meetings.filter(m => m.status === 'Scheduled').length
  const completedCount = meetings.filter(m => m.status === 'Completed').length
  const totalAttendees = meetings.reduce((sum, m) => sum + m.attendees.length, 0)

  const handleAddMeeting = useCallback(() => {
    setFormData({ title: '', type: 'Internal', date: '', time: '', location: '', organizer: '', attendees: '' })
    setIsEditing(false)
    setSelectedMeeting(null)
    setShowModal(true)
  }, [])

  const handleEditMeeting = useCallback((meeting: any) => {
    setFormData({
      title: meeting.title,
      type: meeting.type,
      date: meeting.date,
      time: meeting.time,
      location: meeting.location,
      organizer: meeting.organizer,
      attendees: meeting.attendees.join(', ')
    })
    setSelectedMeeting(meeting)
    setIsEditing(true)
    setShowModal(true)
  }, [])

  const handleSaveMeeting = useCallback(() => {
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      alert('Please fill all required fields')
      return
    }

    if (isEditing && selectedMeeting) {
      setMeetings(meetings.map(m => m.id === (selectedMeeting as any).id ? {
        ...formData,
        id: (selectedMeeting as any).id,
        attendees: formData.attendees.split(',').map(a => a.trim()),
        status: (selectedMeeting as any).status
      } : m))
      alert('Meeting updated successfully')
    } else {
      const newMeeting = {
        id: Date.now(),
        ...formData,
        attendees: formData.attendees.split(',').map(a => a.trim()),
        status: 'Scheduled'
      }
      setMeetings([...meetings, newMeeting])
      alert('Meeting scheduled successfully')
    }
    setShowModal(false)
  }, [formData, isEditing, selectedMeeting, meetings])

  const handleDeleteMeeting = useCallback((meeting: any) => {
    setSelectedMeeting(meeting)
    setShowDeleteConfirm(true)
  }, [])

  const confirmDelete = useCallback(() => {
    if (selectedMeeting) {
      setMeetings(meetings.filter(m => m.id !== (selectedMeeting as any).id))
      alert('Meeting cancelled')
      setShowDeleteConfirm(false)
      setSelectedMeeting(null)
    }
  }, [meetings, selectedMeeting])

  const handleStatusChange = useCallback((meeting: any, newStatus: any) => {
    setMeetings(meetings.map(m => m.id === meeting.id ? { ...m, status: newStatus } : m))
    alert(`Meeting status updated to ${newStatus}`)
  }, [meetings])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage internal and client meetings.</p>
        </div>
        <button 
          onClick={handleAddMeeting}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-bold hover:bg-pink-700 transition-all shadow-lg shadow-pink-500/20">
          <Plus className="h-4 w-4" />
          Schedule Meeting
        </button>
      </div>

      {/* Meeting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Upcoming</p>
              <p className="text-2xl font-bold">{upcomingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Completed</p>
              <p className="text-2xl font-bold">{completedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">Total Attendees</p>
              <p className="text-2xl font-bold">{totalAttendees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search meetings by title or organizer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-card border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none">
          <option>All</option>
          <option>Internal</option>
          <option>Client</option>
        </select>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-card border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${meeting.type === 'Internal' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                    {meeting.type === 'Internal' ? (
                      <Users className={`h-6 w-6 ${meeting.type === 'Internal' ? 'text-blue-600' : 'text-purple-600'}`} />
                    ) : (
                      <Video className={`h-6 w-6 ${meeting.type === 'Internal' ? 'text-blue-600' : 'text-purple-600'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{meeting.title}</h3>
                    <p className={`text-xs font-medium mt-1 ${meeting.type === 'Internal' ? 'text-blue-600' : 'text-purple-600'}`}>
                      {meeting.type}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(meeting.date).toLocaleDateString('en-GB')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {meeting.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {meeting.location}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {meeting.attendees.map((attendee, idx) => (
                    <span key={idx} className="px-3 py-1 bg-muted text-xs rounded-full font-medium">
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <select
                  value={meeting.status}
                  onChange={(e) => handleStatusChange(meeting, e.target.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                    meeting.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditMeeting(meeting)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMeeting(meeting)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit Meeting' : 'Schedule New Meeting'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-muted rounded">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Meeting Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option>Internal</option>
                <option>Client</option>
              </select>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <textarea
                placeholder="Attendees (comma-separated)"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                className="w-full px-3 py-2 bg-muted border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 h-20 resize-none"
              />
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMeeting}
                className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
              >
                {isEditing ? 'Update' : 'Schedule'} Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border shadow-lg w-full max-w-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold">Cancel Meeting?</h3>
              <p className="text-muted-foreground">Are you sure you want to cancel <span className="font-bold text-foreground">{(selectedMeeting as any).title}</span>? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Keep Meeting
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Cancel Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
