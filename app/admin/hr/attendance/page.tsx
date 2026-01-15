'use client'

import { useState, useMemo } from 'react'
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  BarChart3,
  ClipboardList,
  LogOut,
  LogIn,
  Zap,
  Check,
  XCircle,
} from 'lucide-react'

interface Shift {
  id: number
  name: string
  startTime: string
  endTime: string
  color: string
  assignedEmployees?: string[]
}

type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Half-day' | 'Leave'

interface Overtime {
  id: number
  attendanceId: number
  employeeName: string
  date: string
  overtimeHours: number
  overtimeType: 'Regular' | 'Weekend' | 'Holiday' | 'Emergency'
  reason: string
  approved: boolean
  approvedBy?: string
  jobId?: number
  jobTitle?: string
  rate: number
  totalAmount: number
}

interface Attendance {
  id: number
  employeeName: string
  employeeId: string
  date: string
  shift: string
  clockIn: string | null
  clockOut: string | null
  status: 'Present' | 'Late' | 'Absent' | 'Half-day' | 'Leave'
  workingHours: number
  overtime?: Overtime
  hasOvertime?: boolean
  notes?: string
}

const DEFAULT_SHIFTS: Shift[] = [
  { id: 1, name: 'Early Shift', startTime: '06:00', endTime: '14:00', color: 'bg-amber-100 border-amber-300' },
  { id: 2, name: 'Standard Shift', startTime: '08:00', endTime: '17:00', color: 'bg-blue-100 border-blue-300' },
  { id: 3, name: 'Evening Shift', startTime: '14:00', endTime: '22:00', color: 'bg-purple-100 border-purple-300' },
  { id: 4, name: 'Night Shift', startTime: '22:00', endTime: '06:00', color: 'bg-indigo-100 border-indigo-300' },
]

const EMPLOYEES = [
  'Ahmed Al-Mazrouei',
  'Fatima Al-Ketbi',
  'Mohammed Bin Ali',
  'Sara Al-Noor',
  'Hassan Al-Mazrouei',
  'Layla Al-Mansouri',
  'Omar Khan',
  'Khalid Al-Shehhi',
]

// Helper function to get current time in HH:MM format
const getCurrentTime = (): string => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [activeTab, setActiveTab] = useState<'daily' | 'manual' | 'shifts' | 'history' | 'overtime'>('daily')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [shifts, setShifts] = useState<Shift[]>(DEFAULT_SHIFTS)
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([
    { id: 1, employeeName: 'Ahmed Al-Mazrouei', employeeId: 'E001', date: new Date().toISOString().split('T')[0], shift: 'Standard Shift', clockIn: '08:00', clockOut: '17:30', status: 'Present', workingHours: 9.5, hasOvertime: true, overtime: { id: 1, attendanceId: 1, employeeName: 'Ahmed Al-Mazrouei', date: new Date().toISOString().split('T')[0], overtimeHours: 1.5, overtimeType: 'Regular', reason: 'Project deadline', approved: true, approvedBy: 'Manager', rate: 50, totalAmount: 75 } },
    { id: 2, employeeName: 'Fatima Al-Ketbi', employeeId: 'E002', date: new Date().toISOString().split('T')[0], shift: 'Standard Shift', clockIn: '08:15', clockOut: '17:45', status: 'Late', workingHours: 9.5 },
    { id: 3, employeeName: 'Mohammed Bin Ali', employeeId: 'E003', date: new Date().toISOString().split('T')[0], shift: 'Early Shift', clockIn: '06:00', clockOut: '14:00', status: 'Present', workingHours: 8 },
    { id: 4, employeeName: 'Sara Al-Noor', employeeId: 'E004', date: new Date().toISOString().split('T')[0], shift: 'Standard Shift', clockIn: null, clockOut: null, status: 'Absent', workingHours: 0 },
    { id: 5, employeeName: 'Hassan Al-Mazrouei', employeeId: 'E005', date: new Date().toISOString().split('T')[0], shift: 'Standard Shift', clockIn: '09:00', clockOut: null, status: 'Late', workingHours: 0 },
  ])
  const [overtimeRecords, setOvertimeRecords] = useState<Overtime[]>([
    { id: 1, attendanceId: 1, employeeName: 'Ahmed Al-Mazrouei', date: new Date().toISOString().split('T')[0], overtimeHours: 1.5, overtimeType: 'Regular', reason: 'Project deadline', approved: true, approvedBy: 'Manager', jobId: 101, jobTitle: 'Office Deep Cleaning - Downtown Tower', rate: 50, totalAmount: 75 },
  ])

  const [editingShift, setEditingShift] = useState<Shift | null>(null)
  const [shiftForm, setShiftForm] = useState({ name: '', startTime: '', endTime: '' })

  const [manualEntryForm, setManualEntryForm] = useState({
    employeeName: '',
    shiftId: '',
    clockIn: '',
    clockOut: '',
    status: 'Present' as AttendanceStatus,
    notes: ''
  })

  const [editingRecord, setEditingRecord] = useState<Attendance | null>(null)
  const [recordForm, setRecordForm] = useState({
    employeeName: '',
    shiftId: '',
    clockIn: '',
    clockOut: '',
    status: 'Present' as AttendanceStatus,
    notes: ''
  })

  const [shiftEmployeeForm, setShiftEmployeeForm] = useState({
    shiftId: '',
    employeeName: ''
  })

  const [overtimeForm, setOvertimeForm] = useState({
    employeeName: '',
    overtimeHours: '',
    overtimeType: 'Regular' as 'Regular' | 'Weekend' | 'Holiday' | 'Emergency',
    reason: '',
    jobTitle: '',
    rate: ''
  })

  const [editingOvertime, setEditingOvertime] = useState<Overtime | null>(null)

  // ==================== SHIFT MANAGEMENT ====================
  const handleAddShift = () => {
    if (!shiftForm.name || !shiftForm.startTime || !shiftForm.endTime) {
      alert('Please fill in all shift details')
      return
    }
    const newShift: Shift = {
      id: Date.now(),
      name: shiftForm.name,
      startTime: shiftForm.startTime,
      endTime: shiftForm.endTime,
      color: 'bg-gray-100 border-gray-300',
      assignedEmployees: []
    }
    setShifts([...shifts, newShift])
    setShiftForm({ name: '', startTime: '', endTime: '' })
  }

  const handleAssignEmployeeToShift = (shiftId: number | string, employeeName: string) => {
    if (!employeeName) {
      alert('Please select an employee')
      return
    }
    setShifts(shifts.map(s => {
      if (s.id === parseInt(shiftId.toString())) {
        const employees = s.assignedEmployees || []
        if (!employees.includes(employeeName)) {
          return { ...s, assignedEmployees: [...employees, employeeName] }
        } else {
          alert(`${employeeName} is already assigned to this shift`)
        }
      }
      return s
    }))
    setShiftEmployeeForm({ shiftId: '', employeeName: '' })
  }

  const handleRemoveEmployeeFromShift = (shiftId: number, employeeName: string) => {
    setShifts(shifts.map(s => 
      s.id === shiftId 
        ? { ...s, assignedEmployees: (s.assignedEmployees || []).filter(e => e !== employeeName) }
        : s
    ))
  }

  const handleMarkDirectAttendance = (employeeName: string, status: AttendanceStatus) => {
    const shiftName = shifts.find(s => (s.assignedEmployees || []).includes(employeeName))?.name || 'Standard Shift'
    const currentTime = getCurrentTime()
    
    const newRecord: Attendance = {
      id: Date.now(),
      employeeName,
      employeeId: `E${Math.floor(Math.random() * 1000)}`,
      date: currentDate,
      shift: shiftName,
      clockIn: status === 'Present' ? currentTime : null,
      clockOut: status === 'Present' ? currentTime : null,
      status,
      workingHours: status === 'Present' ? 0 : 0,
      notes: ''
    }

    // Check if already marked for today
    const existingRecord = attendanceRecords.find(r => r.employeeName === employeeName && r.date === currentDate)
    if (existingRecord) {
      // If marking as Present, update clock times. Otherwise just update status.
      const updatedRecord = status === 'Present' 
        ? { ...existingRecord, status, clockIn: currentTime, clockOut: currentTime }
        : { ...existingRecord, status }
      setAttendanceRecords(attendanceRecords.map(r => 
        r.id === existingRecord.id ? updatedRecord : r
      ))
    } else {
      setAttendanceRecords([...attendanceRecords, newRecord])
    }
    alert(`${employeeName} marked as ${status} at ${currentTime}`)
  }

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift)
    setShiftForm({ name: shift.name, startTime: shift.startTime, endTime: shift.endTime })
  }

  const handleUpdateShift = () => {
    if (!editingShift || !shiftForm.name || !shiftForm.startTime || !shiftForm.endTime) {
      alert('Please fill in all shift details')
      return
    }
    setShifts(shifts.map(s => s.id === editingShift.id ? { ...s, ...shiftForm } : s))
    setEditingShift(null)
    setShiftForm({ name: '', startTime: '', endTime: '' })
  }

  const handleDeleteShift = (id: number) => {
    if (confirm('Delete this shift?')) {
      setShifts(shifts.filter(s => s.id !== id))
    }
  }

  // ==================== ATTENDANCE MANAGEMENT ====================
  const calculateWorkingHours = (clockIn: string, clockOut: string) => {
    if (!clockIn || !clockOut) return 0
    const [inH, inM] = clockIn.split(':').map(Number)
    const [outH, outM] = clockOut.split(':').map(Number)
    let hours = outH - inH + (outM - inM) / 60
    if (hours < 0) hours += 24
    return parseFloat(hours.toFixed(2))
  }

  const handleAddAttendance = () => {
    if (!manualEntryForm.employeeName || !manualEntryForm.shiftId) {
      alert('Please select employee and shift')
      return
    }

    const shiftName = shifts.find(s => s.id === parseInt(manualEntryForm.shiftId))?.name || ''
    const clockInTime = manualEntryForm.clockIn || getCurrentTime()
    const clockOutTime = manualEntryForm.clockOut || getCurrentTime()
    const workingHours = calculateWorkingHours(clockInTime, clockOutTime)
    
    const newRecord: Attendance = {
      id: Date.now(),
      employeeName: manualEntryForm.employeeName,
      employeeId: `E${Math.floor(Math.random() * 1000)}`,
      date: currentDate,
      shift: shiftName,
      clockIn: clockInTime,
      clockOut: clockOutTime,
      status: manualEntryForm.status,
      workingHours,
      notes: manualEntryForm.notes
    }

    setAttendanceRecords([...attendanceRecords, newRecord])
    setManualEntryForm({ employeeName: '', shiftId: '', clockIn: '', clockOut: '', status: 'Present', notes: '' })
    alert('Attendance recorded successfully!')
  }

  const handleEditRecord = (record: Attendance) => {
    setEditingRecord(record)
    const shift = shifts.find(s => s.name === record.shift)
    setRecordForm({
      employeeName: record.employeeName,
      shiftId: shift?.id.toString() || '',
      clockIn: record.clockIn || '',
      clockOut: record.clockOut || '',
      status: record.status,
      notes: record.notes || ''
    })
  }

  const handleUpdateRecord = () => {
    if (!editingRecord || !recordForm.employeeName || !recordForm.shiftId) {
      alert('Please fill in all required fields')
      return
    }

    const shiftName = shifts.find(s => s.id === parseInt(recordForm.shiftId))?.name || ''
    const workingHours = calculateWorkingHours(recordForm.clockIn, recordForm.clockOut)

    setAttendanceRecords(attendanceRecords.map(r => 
      r.id === editingRecord.id 
        ? { ...r, employeeName: recordForm.employeeName, shift: shiftName, clockIn: recordForm.clockIn || null, clockOut: recordForm.clockOut || null, status: recordForm.status, workingHours, notes: recordForm.notes }
        : r
    ))
    setEditingRecord(null)
    setRecordForm({ employeeName: '', shiftId: '', clockIn: '', clockOut: '', status: 'Present', notes: '' })
  }

  const handleDeleteRecord = (id: number) => {
    if (confirm('Delete this attendance record?')) {
      setAttendanceRecords(attendanceRecords.filter(r => r.id !== id))
    }
  }

  // ==================== OVERTIME MANAGEMENT ====================
  const handleAddOvertime = () => {
    if (!overtimeForm.employeeName || !overtimeForm.overtimeHours || !overtimeForm.rate) {
      alert('Please fill in all required fields')
      return
    }

    const record = attendanceRecords.find(r => r.employeeName === overtimeForm.employeeName && r.date === currentDate)
    if (!record) {
      alert('Please select an employee with attendance on this date')
      return
    }

    const overtimeHours = parseFloat(overtimeForm.overtimeHours)
    const rate = parseFloat(overtimeForm.rate)
    const totalAmount = overtimeHours * rate

    const newOvertime: Overtime = {
      id: Date.now(),
      attendanceId: record.id,
      employeeName: overtimeForm.employeeName,
      date: currentDate,
      overtimeHours,
      overtimeType: overtimeForm.overtimeType,
      reason: overtimeForm.reason,
      jobId: undefined,
      jobTitle: overtimeForm.jobTitle || undefined,
      rate,
      totalAmount,
      approved: false,
    }

    setOvertimeRecords([...overtimeRecords, newOvertime])
    
    // Update attendance record to link overtime
    setAttendanceRecords(attendanceRecords.map(r => 
      r.id === record.id 
        ? { ...r, hasOvertime: true, overtime: newOvertime }
        : r
    ))

    setOvertimeForm({ employeeName: '', overtimeHours: '', overtimeType: 'Regular', reason: '', jobTitle: '', rate: '' })
    alert('Overtime record added successfully!')
  }

  const handleApproveOvertime = (id: number) => {
    setOvertimeRecords(overtimeRecords.map(o => 
      o.id === id 
        ? { ...o, approved: true, approvedBy: 'Admin' }
        : o
    ))
  }

  const handleDeleteOvertime = (id: number) => {
    if (confirm('Delete this overtime record?')) {
      setOvertimeRecords(overtimeRecords.filter(o => o.id !== id))
      setAttendanceRecords(attendanceRecords.map(r => 
        r.overtime?.id === id 
          ? { ...r, hasOvertime: false, overtime: undefined }
          : r
      ))
    }
  }

  // ==================== FILTERS & STATS ====================
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter(r => {
      const matchesDate = r.date === currentDate
      const matchesStatus = filterStatus === 'all' || r.status === filterStatus
      const matchesSearch = searchTerm === '' || r.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesDate && matchesStatus && matchesSearch
    })
  }, [attendanceRecords, currentDate, filterStatus, searchTerm])

  const stats = useMemo(() => {
    const present = filteredRecords.filter(r => r.status === 'Present').length
    const late = filteredRecords.filter(r => r.status === 'Late').length
    const absent = filteredRecords.filter(r => r.status === 'Absent').length
    const halfDay = filteredRecords.filter(r => r.status === 'Half-day').length
    const totalHours = filteredRecords.reduce((sum, r) => sum + r.workingHours, 0)
    
    return { present, late, absent, halfDay, totalHours: totalHours.toFixed(1) }
  }, [filteredRecords])

  const historyRecords = useMemo(() => {
    return attendanceRecords
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 50)
  }, [attendanceRecords])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300'
      case 'Late':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      case 'Absent':
        return 'bg-red-100 text-red-700 border-red-300'
      case 'Half-day':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'Leave':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-500 to-red-600 p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-white/80 font-bold text-sm uppercase tracking-wider">Management System</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Attendance Tracking</h1>
          <p className="text-white/90 mt-3 text-lg font-medium max-w-2xl">
            Easy daily attendance management with shift scheduling, manual entry, and comprehensive history tracking
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/10 blur-[100px]"></div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-2xl border border-gray-200 shadow-md">
        {[
          { id: 'daily' as const, label: '📅 Daily View' },
          { id: 'manual' as const, label: '✏️ Add Attendance' },
          { id: 'shifts' as const, label: '⏰ Manage Shifts' },
          { id: 'overtime' as const, label: '⚡ Overtime' },
          { id: 'history' as const, label: '📊 History' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      {(activeTab === 'daily' || activeTab === 'history') && (
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {activeTab === 'daily' && (
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Select Date</label>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            )}
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Search Employee</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
            {activeTab === 'daily' && (
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">Filter Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Half-day">Half-day</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== DAILY ATTENDANCE TAB ==================== */}
      {activeTab === 'daily' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                <span className="text-2xl font-black text-emerald-600">{stats.present}</span>
              </div>
              <p className="text-xs font-bold text-gray-600 uppercase">Present</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="h-8 w-8 text-amber-600" />
                <span className="text-2xl font-black text-amber-600">{stats.late}</span>
              </div>
              <p className="text-xs font-bold text-gray-600 uppercase">Late</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <X className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-black text-red-600">{stats.absent}</span>
              </div>
              <p className="text-xs font-bold text-gray-600 uppercase">Absent</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-black text-blue-600">{stats.halfDay}</span>
              </div>
              <p className="text-xs font-bold text-gray-600 uppercase">Half-day</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-black text-purple-600">{stats.totalHours}</span>
              </div>
              <p className="text-xs font-bold text-gray-600 uppercase">Total Hrs</p>
            </div>
          </div>

          {/* Quick Mark Attendance */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <h3 className="text-lg font-black text-gray-900 mb-4">🏃 Mark Direct Attendance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {EMPLOYEES.map(emp => (
                <div key={emp} className="flex gap-1">
                  <button
                    onClick={() => handleMarkDirectAttendance(emp, 'Present')}
                    className="flex-1 px-2 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold rounded-lg transition-all border border-emerald-300"
                    title={`Mark ${emp} as Present`}
                  >
                    ✓ {emp.split(' ')[0]}
                  </button>
                  <button
                    onClick={() => handleMarkDirectAttendance(emp, 'Absent')}
                    className="px-2 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded-lg transition-all border border-red-300"
                    title={`Mark ${emp} as Absent`}
                  >
                    ✗
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Attendance Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Shift</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Clock In</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Clock Out</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Hours</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map(record => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{record.employeeName}</div>
                          <div className="text-xs text-gray-500">{record.employeeId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">{record.shift}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <LogIn className="h-4 w-4 text-emerald-600" />
                            <span className="font-semibold text-gray-900">{record.clockIn || '—'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <LogOut className="h-4 w-4 text-rose-600" />
                            <span className="font-semibold text-gray-900">{record.clockOut || '—'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{record.workingHours}h</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => handleEditRecord(record)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500 font-semibold">
                        No attendance records found for {currentDate}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ==================== MANUAL ENTRY TAB ==================== */}
      {activeTab === 'manual' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add New Record Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Plus className="h-6 w-6 text-rose-600" />
              Add New Attendance
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Employee</label>
                <select
                  value={manualEntryForm.employeeName}
                  onChange={(e) => setManualEntryForm({ ...manualEntryForm, employeeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">Select Employee...</option>
                  {EMPLOYEES.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Shift</label>
                <select
                  value={manualEntryForm.shiftId}
                  onChange={(e) => setManualEntryForm({ ...manualEntryForm, shiftId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">Select Shift...</option>
                  {shifts.map(shift => (
                    <option key={shift.id} value={shift.id}>
                      {shift.name} ({shift.startTime} - {shift.endTime})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Clock In</label>
                  <input
                    type="time"
                    value={manualEntryForm.clockIn}
                    onChange={(e) => setManualEntryForm({ ...manualEntryForm, clockIn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Clock Out</label>
                  <input
                    type="time"
                    value={manualEntryForm.clockOut}
                    onChange={(e) => setManualEntryForm({ ...manualEntryForm, clockOut: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select
                  value={manualEntryForm.status}
                  onChange={(e) => setManualEntryForm({ ...manualEntryForm, status: e.target.value as AttendanceStatus })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Half-day">Half-day</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={manualEntryForm.notes}
                  onChange={(e) => setManualEntryForm({ ...manualEntryForm, notes: e.target.value })}
                  placeholder="Add any notes..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  rows={3}
                />
              </div>

              <button
                onClick={handleAddAttendance}
                className="w-full px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
              >
                <Plus className="h-5 w-5" />
                Add Attendance Record
              </button>
            </div>
          </div>

          {/* Today's Entries */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-blue-600" />
              Today's Entries
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {attendanceRecords
                .filter(r => r.date === currentDate)
                .sort((a, b) => new Date(`2000-01-01T${b.clockIn || '00:00'}`).getTime() - new Date(`2000-01-01T${a.clockIn || '00:00'}`).getTime())
                .map(record => (
                  <div key={record.id} className="p-4 border border-gray-200 rounded-xl hover:border-rose-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{record.employeeName}</p>
                        <p className="text-xs text-gray-500">{record.shift}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <LogIn className="h-3 w-3" /> {record.clockIn || '—'}
                      </span>
                      <span className="flex items-center gap-1 text-rose-600 font-semibold">
                        <LogOut className="h-3 w-3" /> {record.clockOut || '—'}
                      </span>
                      <span className="flex items-center gap-1 text-purple-600 font-semibold">
                        <Clock className="h-3 w-3" /> {record.workingHours}h
                      </span>
                    </div>
                    {record.notes && (
                      <p className="text-xs text-gray-600 mb-2 italic">"{record.notes}"</p>
                    )}
                  </div>
                ))}
              {attendanceRecords.filter(r => r.date === currentDate).length === 0 && (
                <p className="text-center text-gray-500 py-8">No entries yet for today</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== SHIFTS TAB ==================== */}
      {activeTab === 'shifts' && (
        <div className="space-y-6">
          {/* Add/Edit Shift */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {editingShift ? '✏️ Edit Shift' : '⏰ Create New Shift'}
            </h2>
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Shift Name</label>
                <input
                  type="text"
                  value={shiftForm.name}
                  onChange={(e) => setShiftForm({ ...shiftForm, name: e.target.value })}
                  placeholder="e.g., Morning Shift"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={shiftForm.startTime}
                  onChange={(e) => setShiftForm({ ...shiftForm, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={shiftForm.endTime}
                  onChange={(e) => setShiftForm({ ...shiftForm, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Assign Employee</label>
                <select
                  value={shiftEmployeeForm.employeeName}
                  onChange={(e) => setShiftEmployeeForm({ ...shiftEmployeeForm, employeeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">Select Employee...</option>
                  {EMPLOYEES.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                {editingShift ? (
                  <>
                    <button
                      onClick={handleUpdateShift}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setEditingShift(null)
                        setShiftForm({ name: '', startTime: '', endTime: '' })
                      }}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-xl transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddShift}
                    className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Shift
                  </button>
                )}
              </div>
            </div>

            {/* Quick Assign Employee to Shift */}
            {!editingShift && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-sm font-bold text-blue-900 mb-3">👥 Quick Assign Employee to Shift</h3>
                <div className="flex gap-2">
                  <select
                    value={shiftEmployeeForm.shiftId}
                    onChange={(e) => setShiftEmployeeForm({ ...shiftEmployeeForm, shiftId: e.target.value })}
                    className="flex-1 px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Shift to Assign...</option>
                    {shifts.map(shift => (
                      <option key={shift.id} value={shift.id}>{shift.name}</option>
                    ))}
                  </select>
                  <select
                    value={shiftEmployeeForm.employeeName}
                    onChange={(e) => setShiftEmployeeForm({ ...shiftEmployeeForm, employeeName: e.target.value })}
                    className="flex-1 px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Employee...</option>
                    {EMPLOYEES.map(emp => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssignEmployeeToShift(shiftEmployeeForm.shiftId, shiftEmployeeForm.employeeName)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all"
                  >
                    Assign
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shifts List */}
          <div className="grid md:grid-cols-2 gap-6">
            {shifts.map(shift => (
              <div key={shift.id} className={`p-6 rounded-2xl border-2 ${shift.color} shadow-md`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{shift.name}</h3>
                    <p className="text-sm font-semibold text-gray-600 mt-1">
                      {shift.startTime} — {shift.endTime}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditShift(shift)}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors text-gray-700 font-bold"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteShift(shift.id)}
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors text-red-600 font-bold"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 mb-3">
                  {(() => {
                    const [startH, startM] = shift.startTime.split(':').map(Number)
                    const [endH, endM] = shift.endTime.split(':').map(Number)
                    let duration = endH - startH + (endM - startM) / 60
                    if (duration < 0) duration += 24
                    return `Duration: ${Math.floor(duration)}h ${Math.round((duration % 1) * 60)}m`
                  })()}
                </div>
                
                {/* Assigned Employees */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-xs font-bold text-gray-600 uppercase mb-2">👥 Assigned Employees ({(shift.assignedEmployees || []).length})</p>
                  {(shift.assignedEmployees && shift.assignedEmployees.length > 0) ? (
                    <div className="space-y-2">
                      {shift.assignedEmployees.map(emp => (
                        <div key={emp} className="flex items-center justify-between bg-white/50 p-2 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">{emp}</span>
                          <button
                            onClick={() => handleRemoveEmployeeFromShift(shift.id, emp)}
                            className="text-xs px-2 py-1 bg-red-200 hover:bg-red-300 text-red-700 font-bold rounded transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No employees assigned to this shift</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== HISTORY TAB ==================== */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <h2 className="text-2xl font-black text-gray-900">📊 Attendance History</h2>
            <p className="text-sm text-gray-600 mt-2">Last 50 attendance records</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">In / Out</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {historyRecords.length > 0 ? (
                  historyRecords.map(record => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{record.date}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{record.employeeName}</div>
                        <div className="text-xs text-gray-500">{record.employeeId}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">{record.shift}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        {record.clockIn} / {record.clockOut || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{record.workingHours}h</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-semibold">
                      No history records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OVERTIME TAB */}
      {activeTab === 'overtime' && (
        <div className="space-y-6">
          {/* Add Overtime Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-black text-gray-900">⚡ Record Overtime</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Employee</label>
                <select
                  value={overtimeForm.employeeName}
                  onChange={(e) => setOvertimeForm({ ...overtimeForm, employeeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Employee</option>
                  {filteredRecords.map(r => (
                    <option key={r.employeeName} value={r.employeeName}>{r.employeeName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Overtime Hours</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={overtimeForm.overtimeHours}
                  onChange={(e) => setOvertimeForm({ ...overtimeForm, overtimeHours: e.target.value })}
                  placeholder="e.g., 1.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Overtime Type</label>
                <select
                  value={overtimeForm.overtimeType}
                  onChange={(e) => setOvertimeForm({ ...overtimeForm, overtimeType: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Regular">Regular</option>
                  <option value="Weekend">Weekend</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hourly Rate (AED)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={overtimeForm.rate}
                  onChange={(e) => setOvertimeForm({ ...overtimeForm, rate: e.target.value })}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason</label>
                <input
                  type="text"
                  value={overtimeForm.reason}
                  onChange={(e) => setOvertimeForm({ ...overtimeForm, reason: e.target.value })}
                  placeholder="e.g., Project deadline, Client request"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Related Job (Optional)</label>
                <input
                  type="text"
                  value={overtimeForm.jobTitle}
                  onChange={(e) => setOvertimeForm({ ...overtimeForm, jobTitle: e.target.value })}
                  placeholder="e.g., Office Deep Cleaning - Downtown Tower"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                onClick={handleAddOvertime}
                className="md:col-span-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" /> Add Overtime Record
              </button>
            </div>
          </div>

          {/* Overtime Records */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-black text-gray-900">📋 Overtime Records</h2>
              <p className="text-sm text-gray-600 mt-2">Total Overtime Hours: {overtimeRecords.reduce((sum, o) => sum + o.overtimeHours, 0).toFixed(1)}h | Total Amount: AED {overtimeRecords.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}</p>
            </div>

            <div className="space-y-4 p-6">
              {overtimeRecords.length > 0 ? (
                overtimeRecords.map(ot => (
                  <div key={ot.id} className={`border-2 rounded-xl p-4 transition-all ${ot.approved ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{ot.employeeName}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          📅 {ot.date} | ⚡ {ot.overtimeHours}h | Type: {ot.overtimeType}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">💼 {ot.reason}</p>
                        {ot.jobTitle && (
                          <p className="text-xs text-gray-600 mt-1">🏢 Related Job: {ot.jobTitle}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-gray-900">AED {ot.totalAmount.toLocaleString()}</div>
                        <p className="text-xs text-gray-600">{ot.overtimeHours}h @ AED {ot.rate}/h</p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {ot.approved ? (
                        <span className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1">
                          <Check className="h-4 w-4" /> Approved by {ot.approvedBy}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApproveOvertime(ot.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteOvertime(ot.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 font-semibold">
                  No overtime records yet. Add one above!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Record Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Edit Attendance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Employee</label>
                <select
                  value={recordForm.employeeName}
                  onChange={(e) => setRecordForm({ ...recordForm, employeeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {EMPLOYEES.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Shift</label>
                <select
                  value={recordForm.shiftId}
                  onChange={(e) => setRecordForm({ ...recordForm, shiftId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {shifts.map(shift => (
                    <option key={shift.id} value={shift.id}>
                      {shift.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Clock In</label>
                  <input
                    type="time"
                    value={recordForm.clockIn}
                    onChange={(e) => setRecordForm({ ...recordForm, clockIn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Clock Out</label>
                  <input
                    type="time"
                    value={recordForm.clockOut}
                    onChange={(e) => setRecordForm({ ...recordForm, clockOut: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select
                  value={recordForm.status}
                  onChange={(e) => setRecordForm({ ...recordForm, status: e.target.value as AttendanceStatus })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Half-day">Half-day</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdateRecord}
                  className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingRecord(null)}
                  className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
