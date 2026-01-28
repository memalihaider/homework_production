'use client'

import { useState, useMemo } from 'react'
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  BarChart3,
  Plus,
  LogIn,
  LogOut,
  Briefcase,
  Users,
  TrendingUp
} from 'lucide-react'
import { MOCK_ATTENDANCE, MOCK_EMPLOYEES, MOCK_SHIFTS, Attendance, Employee } from '@/lib/hr-data'

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [activeTab, setActiveTab] = useState<'daily' | 'mark' | 'history' | 'overtime'>('daily')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [attendance, setAttendance] = useState<Attendance[]>(MOCK_ATTENDANCE)
  const [employees] = useState<Employee[]>(MOCK_EMPLOYEES)
  const [editingRecord, setEditingRecord] = useState<Attendance | null>(null)
  const [showMarkForm, setShowMarkForm] = useState(false)

  const [markForm, setMarkForm] = useState({
    employeeId: '',
    clockIn: '',
    clockOut: '',
    jobId: '',
    jobTitle: '',
    overtimeHours: '',
    notes: ''
  })

  // Get today's attendance
  const todayAttendance = useMemo(() => {
    return attendance.filter(a => a.date === currentDate)
  }, [attendance, currentDate])

  // Filter attendance
  const filteredAttendance = useMemo(() => {
    return todayAttendance.filter(a => {
      const matchesSearch = a.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || a.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [todayAttendance, searchTerm, filterStatus])

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: employees.length,
      present: filteredAttendance.filter(a => a.status === 'Present').length,
      late: filteredAttendance.filter(a => a.status === 'Late').length,
      absent: filteredAttendance.filter(a => a.status === 'Absent').length,
      onJob: filteredAttendance.filter(a => a.status === 'On Job').length,
      totalOvertimeHours: attendance.reduce((sum, a) => sum + (a.overtimeHours || 0), 0)
    }
  }, [employees, filteredAttendance, attendance])

  // Handle mark attendance
  const handleMarkAttendance = () => {
    if (!markForm.employeeId || !markForm.clockIn) {
      alert('Please fill in required fields')
      return
    }

    const employee = employees.find(e => e.id === markForm.employeeId)
    if (!employee) return

    const newAttendance: Attendance = {
      id: `ATT${Date.now()}`,
      employeeId: markForm.employeeId,
      employeeName: employee.name,
      date: currentDate,
      shift: 'Standard Shift',
      clockIn: markForm.clockIn,
      clockOut: markForm.clockOut || null,
      status: markForm.clockOut ? 'Present' : 'Late',
      workingHours: 0,
      jobId: markForm.jobId || undefined,
      jobTitle: markForm.jobTitle || undefined,
      overtimeHours: markForm.overtimeHours ? parseFloat(markForm.overtimeHours) : undefined,
      notes: markForm.notes || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Check if already exists for today
    const existingIndex = attendance.findIndex(
      a => a.employeeId === markForm.employeeId && a.date === currentDate
    )

    if (existingIndex >= 0) {
      const updated = [...attendance]
      updated[existingIndex] = newAttendance
      setAttendance(updated)
    } else {
      setAttendance([...attendance, newAttendance])
    }

    // Reset form
    setMarkForm({
      employeeId: '',
      clockIn: '',
      clockOut: '',
      jobId: '',
      jobTitle: '',
      overtimeHours: '',
      notes: ''
    })
    setShowMarkForm(false)
  }

  // Handle clock out
  const handleClockOut = (record: Attendance) => {
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const updated = attendance.map(a => {
      if (a.id === record.id) {
        const clockInTime = new Date(`2024-01-01 ${a.clockIn}`)
        const clockOutTime = new Date(`2024-01-01 ${time}`)
        const hours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)

        return {
          ...a,
          clockOut: time,
          status: 'Present' as const,
          workingHours: Math.round(hours * 100) / 100,
          updatedAt: new Date().toISOString()
        }
      }
      return a
    }) as Attendance[]

    setAttendance(updated)
  }

  // Handle delete
  const handleDelete = (id: string) => {
    if (confirm('Delete this attendance record?')) {
      setAttendance(attendance.filter(a => a.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Attendance Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track attendance, manage shifts, and mark overtime with job assignments
          </p>
        </div>
        <button
          onClick={() => setShowMarkForm(!showMarkForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Mark Attendance
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-[11px] text-muted-foreground font-bold uppercase">Total</p>
          <p className="text-2xl font-black text-foreground mt-1">{stats.total}</p>
        </div>
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-[11px] text-muted-foreground font-bold uppercase">Present</p>
          <p className="text-2xl font-black text-green-600 mt-1">{stats.present}</p>
        </div>
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-[11px] text-muted-foreground font-bold uppercase">On Job</p>
          <p className="text-2xl font-black text-purple-600 mt-1">{stats.onJob}</p>
        </div>
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-[11px] text-muted-foreground font-bold uppercase">Late</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{stats.late}</p>
        </div>
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-[11px] text-muted-foreground font-bold uppercase">Absent</p>
          <p className="text-2xl font-black text-red-600 mt-1">{stats.absent}</p>
        </div>
        <div className="bg-card border rounded-2xl p-4">
          <p className="text-[11px] text-muted-foreground font-bold uppercase">Overtime Hrs</p>
          <p className="text-2xl font-black text-yellow-600 mt-1">{stats.totalOvertimeHours.toFixed(1)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          {[
            { id: 'daily', label: 'Daily Attendance', icon: Calendar },
            { id: 'mark', label: 'Mark Attendance', icon: Plus },
            { id: 'history', label: 'History', icon: BarChart3 },
            { id: 'overtime', label: 'Overtime', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Daily Attendance Tab */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Date & Filters */}
          <div className="flex gap-4">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="px-4 py-2.5 bg-muted/50 border rounded-xl text-sm"
            />
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border rounded-xl text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-muted/50 border rounded-xl text-sm"
            >
              <option value="all">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="On Job">On Job</option>
            </select>
          </div>

          {/* Attendance List */}
          <div className="space-y-3">
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map(record => (
                <div key={record.id} className="bg-card border rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${
                          record.status === 'Present' ? 'bg-green-600' :
                          record.status === 'On Job' ? 'bg-purple-600' :
                          record.status === 'Late' ? 'bg-amber-600' : 'bg-red-600'
                        }`} />
                        <p className="font-black">{record.employeeName}</p>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          record.status === 'Present' ? 'bg-green-100 text-green-700' :
                          record.status === 'On Job' ? 'bg-purple-100 text-purple-700' :
                          record.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Shift</p>
                          <p className="font-bold">{record.shift}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Clock In</p>
                          <p className="font-bold">{record.clockIn || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Clock Out</p>
                          <p className="font-bold">{record.clockOut || '—'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Hours</p>
                          <p className="font-bold">{record.workingHours}h</p>
                        </div>
                        {record.jobTitle && (
                          <div>
                            <p className="text-xs text-muted-foreground">Job</p>
                            <p className="font-bold text-purple-600 text-xs">{record.jobTitle}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!record.clockOut && (
                        <button
                          onClick={() => handleClockOut(record)}
                          className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
                          title="Clock out"
                        >
                          <LogOut className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-card border rounded-2xl p-12 text-center">
                <p className="text-muted-foreground">No attendance records for selected date</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mark Attendance Tab */}
      {activeTab === 'mark' && (
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="text-lg font-black mb-6">Mark Attendance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold mb-2 block">Employee</label>
                <select
                  value={markForm.employeeId}
                  onChange={(e) => setMarkForm({ ...markForm, employeeId: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm"
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Clock In Time</label>
                <input
                  type="time"
                  value={markForm.clockIn}
                  onChange={(e) => setMarkForm({ ...markForm, clockIn: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Clock Out Time (Optional)</label>
                <input
                  type="time"
                  value={markForm.clockOut}
                  onChange={(e) => setMarkForm({ ...markForm, clockOut: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Job ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., JOB001"
                  value={markForm.jobId}
                  onChange={(e) => setMarkForm({ ...markForm, jobId: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Job Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Villa Deep Cleaning"
                  value={markForm.jobTitle}
                  onChange={(e) => setMarkForm({ ...markForm, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Overtime Hours (Optional)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={markForm.overtimeHours}
                  onChange={(e) => setMarkForm({ ...markForm, overtimeHours: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Notes (Optional)</label>
                <textarea
                  placeholder="Add any notes..."
                  value={markForm.notes}
                  onChange={(e) => setMarkForm({ ...markForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-muted/50 border rounded-lg text-sm h-20 resize-none"
                />
              </div>
              <button
                onClick={handleMarkAttendance}
                className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark Attendance
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 rounded-lg p-4 border space-y-3">
              <h4 className="font-bold">Attendance Tips</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Select employee from the list</li>
                <li>• Enter clock in/out times</li>
                <li>• Link to job if employee is assigned</li>
                <li>• Record overtime hours if applicable</li>
                <li>• Add notes for special cases</li>
              </ul>
              <div className="pt-4 border-t space-y-2">
                <p className="text-xs font-bold">Real-Time Integration:</p>
                <p className="text-xs">✓ Connected to job assignments</p>
                <p className="text-xs">✓ Automatic payroll calculation</p>
                <p className="text-xs">✓ Overtime tracking</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overtime Tab */}
      {activeTab === 'overtime' && (
        <div className="space-y-4">
          <div className="bg-card border rounded-2xl p-4">
            <h3 className="font-black mb-4">Overtime Records</h3>
            <div className="space-y-3">
              {attendance
                .filter(a => a.overtimeHours && a.overtimeHours > 0)
                .map(record => (
                  <div key={record.id} className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">{record.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                        {record.jobTitle && (
                          <p className="text-xs text-purple-600 font-bold mt-1">{record.jobTitle}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-black text-yellow-600">{record.overtimeHours}h</p>
                        {record.overtimeReason && (
                          <p className="text-xs text-muted-foreground">{record.overtimeReason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              {attendance.filter(a => a.overtimeHours && a.overtimeHours > 0).length === 0 && (
                <p className="text-muted-foreground text-sm">No overtime records</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
