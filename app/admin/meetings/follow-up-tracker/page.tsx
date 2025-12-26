'use client'

import { useState, useMemo } from 'react'
import { CheckCircle, AlertCircle, Clock, Users, Briefcase, TrendingUp, Filter, Search, Archive, Zap, Plus, Link as LinkIcon, Eye, Edit2, Trash2, ArrowRight, X } from 'lucide-react'

export default function FollowUpTracker() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterOwner, setFilterOwner] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState<'active' | 'timeline' | 'accountability'>('active')
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    item: '',
    owner: '',
    dueDate: '',
    status: 'pending' as const,
    linkedJob: '',
    priority: 'Medium',
    notes: ''
  })
  const [actionItems, setActionItems] = useState([
    {
      id: 1,
      item: 'Send final invoice to client',
      owner: 'Layla Al-Mansouri',
      dueDate: '2025-01-21',
      status: 'pending',
      linkedJob: 'JOB-DOT-2025-001',
      linkedClient: 'Downtown Business Tower',
      createdDate: '2025-01-20',
      priority: 'High',
      accountable: 'Layla',
      impact: 'Critical - client payment',
      timelineImpact: 'Affects job closure completion',
      progressPercent: 0,
      dependencies: [],
      linkedMeeting: 'Job Closeout - Downtown Tower',
      assignedBy: 'Ahmed Al-Mazrouei'
    },
    {
      id: 2,
      item: 'Collect client feedback survey',
      owner: 'Ahmed Al-Mazrouei',
      dueDate: '2025-01-22',
      status: 'pending',
      linkedJob: 'JOB-DOT-2025-001',
      linkedClient: 'Downtown Business Tower',
      createdDate: '2025-01-20',
      priority: 'Medium',
      accountable: 'Ahmed',
      impact: 'High - quality assurance',
      timelineImpact: 'Input for next job scheduling',
      progressPercent: 0,
      dependencies: [1],
      linkedMeeting: 'Job Closeout - Downtown Tower',
      assignedBy: 'Ahmed Al-Mazrouei'
    },
    {
      id: 3,
      item: 'Process team bonuses',
      owner: 'Fatima Al-Ketbi',
      dueDate: '2025-01-25',
      status: 'pending',
      linkedJob: null,
      linkedClient: null,
      createdDate: '2025-01-20',
      priority: 'High',
      accountable: 'Fatima',
      impact: 'Medium - employee morale',
      timelineImpact: 'Must complete before payroll cutoff',
      progressPercent: 0,
      dependencies: [],
      linkedMeeting: 'Job Closeout - Downtown Tower',
      assignedBy: 'Ahmed Al-Mazrouei'
    },
    {
      id: 4,
      item: 'Prepare equipment maintenance checklist',
      owner: 'Omar Khan',
      dueDate: '2025-01-25',
      status: 'in-progress',
      linkedJob: null,
      linkedClient: null,
      createdDate: '2025-01-20',
      priority: 'High',
      accountable: 'Omar',
      impact: 'Critical - equipment availability',
      timelineImpact: 'Weekend maintenance dependent on this',
      progressPercent: 60,
      dependencies: [],
      linkedMeeting: 'Weekly Operations Standup',
      assignedBy: 'Ahmed Al-Mazrouei'
    },
    {
      id: 5,
      item: 'Send welcome packages to new clients',
      owner: 'Sara Al-Noor',
      dueDate: '2025-01-21',
      status: 'completed',
      linkedJob: null,
      linkedClient: 'New Client A, New Client B',
      createdDate: '2025-01-19',
      priority: 'Low',
      accountable: 'Sara',
      impact: 'Low - relationship building',
      timelineImpact: 'Enables new client onboarding',
      progressPercent: 100,
      dependencies: [],
      linkedMeeting: 'Weekly Operations Standup',
      assignedBy: 'Ahmed Al-Mazrouei'
    },
    {
      id: 6,
      item: 'Prepare Q1 budget allocation report',
      owner: 'Layla Al-Mansouri',
      dueDate: '2025-01-25',
      status: 'in-progress',
      linkedJob: null,
      linkedClient: null,
      createdDate: '2025-01-21',
      priority: 'High',
      accountable: 'Layla',
      impact: 'Critical - budget planning',
      timelineImpact: 'Affects hiring and equipment purchases',
      progressPercent: 75,
      dependencies: [],
      linkedMeeting: 'Financial Review Q4 2024',
      assignedBy: 'Fatima Al-Ketbi'
    },
    {
      id: 7,
      item: 'Research and quote new equipment vendors',
      owner: 'Ahmed Al-Mazrouei',
      dueDate: '2025-01-28',
      status: 'pending',
      linkedJob: null,
      linkedClient: null,
      createdDate: '2025-01-21',
      priority: 'Medium',
      accountable: 'Ahmed',
      impact: 'Medium - operational efficiency',
      timelineImpact: 'Equipment purchase dependent on this',
      progressPercent: 0,
      dependencies: [6],
      linkedMeeting: 'Financial Review Q4 2024',
      assignedBy: 'Fatima Al-Ketbi'
    },
    {
      id: 8,
      item: 'Confirm job assignments with Mohammed team',
      owner: 'Ahmed Al-Mazrouei',
      dueDate: '2025-01-21',
      status: 'pending',
      linkedJob: 'JOB-MAL-2025-003',
      linkedClient: 'Shopping Mall Dubai',
      createdDate: '2025-01-20',
      priority: 'High',
      accountable: 'Ahmed',
      impact: 'Critical - job scheduling',
      timelineImpact: 'Blocks new client job start date',
      progressPercent: 0,
      dependencies: [4],
      linkedMeeting: 'Weekly Operations Standup',
      assignedBy: 'Ahmed Al-Mazrouei'
    },
  ])

  const handleAddItem = () => {
    if (newItem.item && newItem.owner && newItem.dueDate) {
      if (editingItem) {
        setActionItems(actionItems.map(item => item.id === editingItem ? { ...item, item: newItem.item, owner: newItem.owner, dueDate: newItem.dueDate, status: newItem.status, linkedJob: newItem.linkedJob, priority: newItem.priority } : item) as any)
        setEditingItem(null)
      } else {
        const item = {
          id: Math.max(...actionItems.map(i => i.id), 0) + 1,
          item: newItem.item,
          owner: newItem.owner,
          dueDate: newItem.dueDate,
          status: newItem.status,
          linkedJob: newItem.linkedJob,
          linkedClient: '',
          createdDate: new Date().toISOString().split('T')[0],
          priority: newItem.priority,
          accountable: newItem.owner.split(' ')[0],
          impact: newItem.priority === 'High' ? 'Critical' : 'Medium',
          timelineImpact: '',
          progressPercent: 0,
          dependencies: [],
          linkedMeeting: '',
          assignedBy: 'Current User'
        }
        setActionItems([...actionItems, item] as any)
      }
      setNewItem({ item: '', owner: '', dueDate: '', status: 'pending', linkedJob: '', priority: 'Medium', notes: '' })
      setShowForm(false)
    }
  }

  const handleEditItem = (id: number) => {
    const item = actionItems.find(i => i.id === id)
    if (item) {
      setNewItem({ item: item.item, owner: item.owner, dueDate: item.dueDate, status: item.status as any, linkedJob: item.linkedJob || '', priority: item.priority, notes: '' })
      setEditingItem(id)
      setShowForm(true)
    }
  }

  const handleDeleteItem = (id: number) => {
    setActionItems(actionItems.filter(item => item.id !== id))
  }

  const handleUpdateStatus = (id: number, status: string) => {
    setActionItems(actionItems.map(item => item.id === id ? { ...item, status: status as any } : item))
  }

  const handleUpdateProgress = (id: number, percent: number) => {
    setActionItems(actionItems.map(item => item.id === id ? { ...item, progressPercent: percent } : item))
  }

  const filteredItems = useMemo(() => {
    return actionItems.filter(item => {
      const statusMatch = filterStatus === 'all' || item.status === filterStatus
      const ownerMatch = filterOwner === 'all' || item.owner === filterOwner
      const priorityMatch = filterPriority === 'all' || item.priority === filterPriority
      const searchMatch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.linkedClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.linkedJob?.toLowerCase().includes(searchTerm.toLowerCase())
      return statusMatch && ownerMatch && priorityMatch && searchMatch
    })
  }, [filterStatus, filterOwner, filterPriority, searchTerm])

  const stats = useMemo(() => {
    return {
      total: actionItems.length,
      completed: actionItems.filter(i => i.status === 'completed').length,
      inProgress: actionItems.filter(i => i.status === 'in-progress').length,
      pending: actionItems.filter(i => i.status === 'pending').length,
      overdue: actionItems.filter(i => i.dueDate < '2025-01-20' && i.status !== 'completed').length,
      critical: actionItems.filter(i => i.priority === 'High').length,
    }
  }, [])

  const owners = ['all', ...Array.from(new Set(actionItems.map(i => i.owner)))]
  const statuses = ['all', 'pending', 'in-progress', 'completed']
  const priorities = ['all', 'High', 'Medium', 'Low']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700'
      case 'Medium': return 'bg-orange-100 text-orange-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    return dueDate < '2025-01-20' && status !== 'completed'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Follow-Up Tracker</h1>
          <p className="text-muted-foreground mt-1">Accountability tracking, timeline impact, and job cross-linking</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingItem(null); setNewItem({ item: '', owner: '', dueDate: '', status: 'pending', linkedJob: '', priority: 'Medium', notes: '' }) }} className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span className="font-bold">{showForm ? 'Cancel' : 'New Follow-Up'}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">{editingItem ? 'Edit Follow-Up' : 'Add New Follow-Up'}</h3>
            <button onClick={() => { setShowForm(false); setEditingItem(null); }} className="p-1 hover:bg-blue-100 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Action Item *" value={newItem.item} onChange={(e) => setNewItem({...newItem, item: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2" />
            <select value={newItem.priority} onChange={(e) => setNewItem({...newItem, priority: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <input type="text" placeholder="Owner *" value={newItem.owner} onChange={(e) => setNewItem({...newItem, owner: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="date" value={newItem.dueDate} onChange={(e) => setNewItem({...newItem, dueDate: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <select value={newItem.status} onChange={(e) => setNewItem({...newItem, status: e.target.value as any})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input type="text" placeholder="Linked Job ID (optional)" value={newItem.linkedJob} onChange={(e) => setNewItem({...newItem, linkedJob: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="Notes" value={newItem.notes} onChange={(e) => setNewItem({...newItem, notes: e.target.value})} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-3 h-20" />
          </div>

          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowForm(false); setEditingItem(null); }} className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleAddItem} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold">{editingItem ? 'Update' : 'Add Follow-Up'}</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="text-2xl font-black text-blue-700">{stats.total}</p>
        </div>
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-black text-green-700">{stats.completed}</p>
          <p className="text-xs text-green-600 mt-1">{Math.round((stats.completed / stats.total) * 100)}%</p>
        </div>
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">In Progress</p>
          <p className="text-2xl font-black text-blue-700">{stats.inProgress}</p>
        </div>
        <div className="bg-linear-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-black text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Job-Linked</p>
          <p className="text-2xl font-black text-purple-700">{actionItems.filter(i => i.linkedJob).length}</p>
        </div>
        <div className="bg-linear-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">High Priority</p>
          <p className="text-2xl font-black text-red-700">{stats.critical}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        {(['active', 'timeline', 'accountability'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors capitalize flex items-center gap-2 ${
              selectedTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'active' && <CheckCircle className="h-4 w-4" />}
            {tab === 'timeline' && <Clock className="h-4 w-4" />}
            {tab === 'accountability' && <Users className="h-4 w-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search action items, jobs, clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority === 'all' ? 'All Priority' : priority}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-2 block">Owner</label>
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {owners.map(owner => (
                <option key={owner} value={owner}>{owner === 'all' ? 'All Owners' : owner.split(' ')[0]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ACTIVE TAB - Action Items List */}
      {selectedTab === 'active' && (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-lg p-4 transition-all ${
                isOverdue(item.dueDate, item.status)
                  ? 'bg-red-50 border-red-200 shadow-sm'
                  : 'bg-card border-default hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-lg">{item.item}</p>
                    {isOverdue(item.dueDate, item.status) && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">From: {item.linkedMeeting}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded font-semibold ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              {item.status !== 'completed' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-xs font-bold">{item.progressPercent}%</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        item.status === 'in-progress' ? 'bg-blue-600' : 'bg-yellow-600'
                      }`}
                      style={{ width: `${item.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground mb-1">Owner</p>
                  <p className="font-semibold">{item.owner.split(' ')[0]}</p>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                  <p className={`font-semibold ${isOverdue(item.dueDate, item.status) ? 'text-red-600' : ''}`}>
                    {item.dueDate}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground mb-1">Impact</p>
                  <p className="font-semibold text-blue-600 text-xs">{item.impact.split(' ')[0]}</p>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground mb-1">Assigned By</p>
                  <p className="font-semibold text-xs">{item.assignedBy.split(' ')[0]}</p>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground mb-1">Created</p>
                  <p className="font-semibold text-xs">{item.createdDate}</p>
                </div>
              </div>

              {/* Cross-Links */}
              {(item.linkedJob || item.linkedClient) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.linkedJob && (
                    <a href={`/admin/jobs/detail?id=${item.linkedJob}`} className="flex items-center gap-1 text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded hover:bg-pink-200 transition-colors">
                      <LinkIcon className="h-3 w-3" />
                      {item.linkedJob}
                    </a>
                  )}
                  {item.linkedClient && (
                    <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {item.linkedClient.split(',')[0].trim()}
                    </span>
                  )}
                </div>
              )}

              {/* Timeline Impact & Actions */}
              <div className="flex gap-3 items-start">
                <div className="flex-1 p-3 bg-muted/50 rounded border-l-4 border-orange-500">
                  <p className="text-xs font-bold mb-1">⏱️ Timeline Impact</p>
                  <p className="text-xs text-muted-foreground">{item.timelineImpact}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleUpdateStatus(item.id, item.status === 'completed' ? 'pending' : 'completed')} className="p-2 hover:bg-blue-100 text-blue-600 rounded transition-colors" title={`Mark as ${item.status === 'completed' ? 'pending' : 'completed'}`}>
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleEditItem(item.id)} className="p-2 hover:bg-green-100 text-green-600 rounded transition-colors" title="Edit">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeleteItem(item.id)} className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TIMELINE TAB */}
      {selectedTab === 'timeline' && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold mb-4">Dependency Timeline</h3>
            {filteredItems
              .filter(item => item.dependencies && item.dependencies.length > 0)
              .map(item => (
                <div key={item.id} className="mb-4 pb-4 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{item.item}</p>
                      <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="text-right text-xs">
                      <p className="font-bold">{item.dependencies.length} blocker(s)</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Timeline Impact Summary */}
          <div className="bg-card border rounded-lg p-4 space-y-3">
            <h3 className="font-bold mb-4">Job Impact Analysis</h3>
            {Array.from(new Set(actionItems.filter(i => i.linkedJob).map(i => i.linkedJob as string))).map(job => {
              const jobItems = actionItems.filter(i => i.linkedJob === job);
              return (
                <div key={job} className="border rounded-lg p-3 bg-muted/50">
                  <p className="font-bold text-sm mb-2">{job}</p>
                  <p className="text-xs text-muted-foreground mb-2">{jobItems.length} action items</p>
                  <div className="space-y-1">
                    {jobItems.map(item => (
                      <div key={item.id} className="text-xs flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${item.status === 'completed' ? 'bg-green-600' : item.status === 'in-progress' ? 'bg-blue-600' : 'bg-yellow-600'}`}></span>
                        {item.item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ACCOUNTABILITY TAB */}
      {selectedTab === 'accountability' && (
        <div className="space-y-3">
          {Array.from(new Set(filteredItems.map(i => i.owner))).map(owner => {
            const ownerItems = filteredItems.filter(i => i.owner === owner);
            const completed = ownerItems.filter(i => i.status === 'completed').length;
            const total = ownerItems.length;
            
            return (
              <div key={owner} className="bg-card border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold">{owner}</p>
                    <p className="text-xs text-muted-foreground">Assigned by: {ownerItems[0]?.assignedBy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-blue-600">{Math.round((completed / total) * 100)}%</p>
                    <p className="text-xs text-muted-foreground">{completed}/{total} complete</p>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-3 mb-3">
                  <div
                    className="h-3 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${(completed / total) * 100}%` }}
                  ></div>
                </div>

                <div className="space-y-2">
                  {ownerItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.item}</p>
                        <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Zap className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-900">Accountability & Timeline Tracking</p>
          <p className="text-sm text-blue-800 mt-1">Track action items with full accountability to individual owners. Visualize dependencies, timeline impact on linked jobs, and completion rates per person. Identify blockers and manage priorities for optimal workflow.</p>
        </div>
      </div>
    </div>
  )
}
