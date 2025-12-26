'use client'

import { useState, useMemo } from 'react'
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Calendar, 
  Zap, 
  Filter, 
  Download, 
  BarChart3, 
  Brain,
  History,
  ArrowUpRight,
  Activity,
  Target,
  Fingerprint,
  ShieldCheck,
  ChevronRight,
  MoreHorizontal,
  ExternalLink,
  Search,
  LayoutGrid,
  CheckCircle2,
  X,
  Plus,
  Edit,
  Trash2,
  Save,
  User
} from 'lucide-react'

interface AttendanceRecord {
  id: number
  employee: string
  role: string
  clockIn: string | null
  clockOut: string | null
  duration: string
  status: string
  shiftType: string
  entryType: string
  date?: string
}

interface Shift {
  id: number
  name: string
  startTime: string
  endTime: string
  employees: number
  description: string
}

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2025-01-20')
  const [viewMode, setViewMode] = useState<'daily' | 'shifts' | 'manual' | 'history'>('daily')
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { id: 1, employee: 'Ahmed Al-Mazrouei', role: 'Operations Manager', clockIn: '08:00', clockOut: '17:30', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual' },
    { id: 2, employee: 'Fatima Al-Ketbi', role: 'HR Director', clockIn: '08:15', clockOut: '17:45', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual' },
    { id: 3, employee: 'Mohammed Bin Ali', role: 'Team Lead', clockIn: '06:00', clockOut: '14:30', duration: '8h 30m', status: 'Present', shiftType: 'Early Morning', entryType: 'Manual' },
    { id: 4, employee: 'Sara Al-Noor', role: 'Recruiter', clockIn: null, clockOut: null, duration: '0h', status: 'Absent', shiftType: 'Standard 9-5', entryType: 'Pending' },
    { id: 5, employee: 'Hassan Al-Mazrouei', role: 'Specialist', clockIn: '08:45', clockOut: null, duration: '~8h', status: 'Late', shiftType: 'Standard 9-5', entryType: 'Manual' },
    { id: 6, employee: 'Layla Al-Mansouri', role: 'Payroll Officer', clockIn: '08:00', clockOut: '17:00', duration: '9h', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual' },
    { id: 7, employee: 'Omar Khan', role: 'Specialist', clockIn: '06:30', clockOut: '15:00', duration: '8h 30m', status: 'Present', shiftType: 'Early Morning', entryType: 'Manual' },
    { id: 8, employee: 'Khalid Al-Shehhi', role: 'Specialist', clockIn: '14:00', clockOut: '22:30', duration: '8h 30m', status: 'Present', shiftType: 'Evening', entryType: 'Manual' },
  ])

  const [manualShifts, setManualShifts] = useState<Shift[]>([
    { id: 1, name: 'Early Morning', startTime: '06:00', endTime: '14:30', employees: 2, description: 'Peak morning cleaning demand' },
    { id: 2, name: 'Standard', startTime: '08:00', endTime: '17:00', employees: 4, description: 'Standard business hours' },
    { id: 3, name: 'Evening', startTime: '14:00', endTime: '22:30', employees: 1, description: 'Evening commercial cleaning' },
    { id: 4, name: 'Night', startTime: '22:00', endTime: '06:00', employees: 0, description: 'Night shift for special projects' },
  ])

  // Manual Entry Form State
  const [manualEntry, setManualEntry] = useState({
    employee: '',
    shift: '',
    clockIn: '',
    clockOut: '',
    status: 'Present',
    notes: ''
  })

  // Attendance History State
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([
    // Yesterday's records
    { id: 101, employee: 'Ahmed Al-Mazrouei', role: 'Operations Manager', clockIn: '08:00', clockOut: '17:30', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-19' },
    { id: 102, employee: 'Fatima Al-Ketbi', role: 'HR Director', clockIn: '08:15', clockOut: '17:45', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-19' },
    { id: 103, employee: 'Mohammed Bin Ali', role: 'Team Lead', clockIn: '06:00', clockOut: '14:30', duration: '8h 30m', status: 'Present', shiftType: 'Early Morning', entryType: 'Manual', date: '2025-01-19' },
    { id: 104, employee: 'Sara Al-Noor', role: 'Recruiter', clockIn: '08:30', clockOut: '17:00', duration: '8h 30m', status: 'Late', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-19' },
    
    // Two days ago
    { id: 201, employee: 'Ahmed Al-Mazrouei', role: 'Operations Manager', clockIn: '08:00', clockOut: '17:30', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-18' },
    { id: 202, employee: 'Fatima Al-Ketbi', role: 'HR Director', clockIn: null, clockOut: null, duration: '0h', status: 'Absent', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-18' },
    { id: 203, employee: 'Mohammed Bin Ali', role: 'Team Lead', clockIn: '06:00', clockOut: '14:30', duration: '8h 30m', status: 'Present', shiftType: 'Early Morning', entryType: 'Manual', date: '2025-01-18' },
    { id: 204, employee: 'Hassan Al-Mazrouei', role: 'Specialist', clockIn: '08:45', clockOut: '17:15', duration: '8h 30m', status: 'Late', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-18' },
    
    // Three days ago
    { id: 301, employee: 'Ahmed Al-Mazrouei', role: 'Operations Manager', clockIn: '08:00', clockOut: '17:30', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-17' },
    { id: 302, employee: 'Fatima Al-Ketbi', role: 'HR Director', clockIn: '08:15', clockOut: '17:45', duration: '9h 30m', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-17' },
    { id: 303, employee: 'Mohammed Bin Ali', role: 'Team Lead', clockIn: '06:00', clockOut: '14:30', duration: '8h 30m', status: 'Present', shiftType: 'Early Morning', entryType: 'Manual', date: '2025-01-17' },
    { id: 304, employee: 'Layla Al-Mansouri', role: 'Payroll Officer', clockIn: '08:00', clockOut: '17:00', duration: '9h', status: 'Present', shiftType: 'Standard 9-5', entryType: 'Manual', date: '2025-01-17' },
  ])

  // Attendance Management State
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null)
  const [recordForm, setRecordForm] = useState({
    employee: '',
    shift: '',
    clockIn: '',
    clockOut: '',
    status: 'Present',
    notes: ''
  })
  const [selectedRecords, setSelectedRecords] = useState<number[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterEmployee, setFilterEmployee] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Shift Management State
  const [editingShift, setEditingShift] = useState<Shift | null>(null)
  const [isAddingShift, setIsAddingShift] = useState(false)
  const [shiftForm, setShiftForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
    description: ''
  })

  // Functions for Attendance Management
  const calculateDuration = (clockIn: string, clockOut: string) => {
    if (!clockIn || !clockOut) return '0h'
    
    const [inHours, inMinutes] = clockIn.split(':').map(Number)
    const [outHours, outMinutes] = clockOut.split(':').map(Number)
    
    const inTotal = inHours * 60 + inMinutes
    const outTotal = outHours * 60 + outMinutes
    
    let duration = outTotal - inTotal
    if (duration < 0) duration += 24 * 60 // Handle overnight shifts
    
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    
    return `${hours}h ${minutes}m`
  }

  const handleAttendanceSubmit = () => {
    if (!manualEntry.employee || !manualEntry.shift) {
      alert('Please select an employee and shift')
      return
    }

    const duration = calculateDuration(manualEntry.clockIn, manualEntry.clockOut)
    
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      employee: manualEntry.employee,
      role: 'Employee', // This would come from employee data in real app
      clockIn: manualEntry.clockIn || null,
      clockOut: manualEntry.clockOut || null,
      duration,
      status: manualEntry.status,
      shiftType: manualEntry.shift,
      entryType: 'Manual'
    }

    setAttendanceRecords(prev => [...prev, newRecord])
    
    // Reset form
    setManualEntry({
      employee: '',
      shift: '',
      clockIn: '',
      clockOut: '',
      status: 'Present',
      notes: ''
    })

    alert('Attendance record added successfully!')
  }

  // Functions for Shift Management
  const handleAddShift = () => {
    if (!shiftForm.name || !shiftForm.startTime || !shiftForm.endTime) {
      alert('Please fill in all required fields')
      return
    }

    const newShift: Shift = {
      id: Date.now(),
      name: shiftForm.name,
      startTime: shiftForm.startTime,
      endTime: shiftForm.endTime,
      employees: 0,
      description: shiftForm.description
    }

    setManualShifts(prev => [...prev, newShift])
    setIsAddingShift(false)
    setShiftForm({ name: '', startTime: '', endTime: '', description: '' })
  }

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift)
    setShiftForm({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      description: shift.description
    })
  }

  const handleUpdateShift = () => {
    if (!editingShift) return

    setManualShifts(prev => prev.map(shift => 
      shift.id === editingShift.id 
        ? { ...shift, ...shiftForm }
        : shift
    ))
    
    setEditingShift(null)
    setShiftForm({ name: '', startTime: '', endTime: '', description: '' })
  }

  const handleDeleteShift = (shiftId: number) => {
    if (confirm('Are you sure you want to delete this shift?')) {
      setManualShifts(prev => prev.filter(shift => shift.id !== shiftId))
    }
  }

  const cancelShiftEdit = () => {
    setEditingShift(null)
    setIsAddingShift(false)
    setShiftForm({ name: '', startTime: '', endTime: '', description: '' })
  }

  // Attendance Management Functions
  const handleEditRecord = (record: AttendanceRecord) => {
    setEditingRecord(record)
    setRecordForm({
      employee: record.employee,
      shift: record.shiftType,
      clockIn: record.clockIn || '',
      clockOut: record.clockOut || '',
      status: record.status,
      notes: ''
    })
  }

  const handleUpdateRecord = () => {
    if (!editingRecord) return

    const duration = calculateDuration(recordForm.clockIn, recordForm.clockOut)
    
    setAttendanceRecords(prev => prev.map(record => 
      record.id === editingRecord.id 
        ? { ...record, ...recordForm, shiftType: recordForm.shift, duration, clockIn: recordForm.clockIn || null, clockOut: recordForm.clockOut || null }
        : record
    ))
    
    setEditingRecord(null)
    setRecordForm({ employee: '', shift: '', clockIn: '', clockOut: '', status: 'Present', notes: '' })
  }

  const handleDeleteRecord = (recordId: number) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      setAttendanceRecords(prev => prev.filter(record => record.id !== recordId))
    }
  }

  const handleBulkStatusUpdate = (status: string) => {
    if (selectedRecords.length === 0) return
    
    setAttendanceRecords(prev => prev.map(record => 
      selectedRecords.includes(record.id) 
        ? { ...record, status }
        : record
    ))
    setSelectedRecords([])
  }

  const handleSelectRecord = (recordId: number) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    )
  }

  const handleSelectAll = () => {
    const allRecordIds = filteredRecords.map(record => record.id)
    setSelectedRecords(prev => 
      prev.length === allRecordIds.length ? [] : allRecordIds
    )
  }

  // Filtered records for current view
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter(record => {
      const matchesStatus = filterStatus === 'all' || record.status === filterStatus
      const matchesEmployee = filterEmployee === 'all' || record.employee === filterEmployee
      const matchesSearch = searchTerm === '' || 
        record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.role.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesStatus && matchesEmployee && matchesSearch
    })
  }, [attendanceRecords, filterStatus, filterEmployee, searchTerm])

  // Get unique employees for filter
  const uniqueEmployees = useMemo(() => {
    return Array.from(new Set(attendanceRecords.map(record => record.employee)))
  }, [attendanceRecords])

  // Daily Attendance Stats
  const attendanceStats = useMemo(() => {
    const present = attendanceRecords.filter(r => r.status === 'Present').length
    const late = attendanceRecords.filter(r => r.status === 'Late').length
    const absent = attendanceRecords.filter(r => r.status === 'Absent').length
    const total = attendanceRecords.length
    const avgDuration = attendanceRecords.length > 0 
      ? attendanceRecords.reduce((sum, r) => {
          const [hours, minutes] = r.duration.split('h ').map(s => parseInt(s.replace('m', '')))
          return sum + hours * 60 + minutes
        }, 0) / attendanceRecords.length
      : 0
    const avgHours = Math.floor(avgDuration / 60)
    const avgMinutes = Math.round(avgDuration % 60)

    return [
      { label: 'Present', value: present.toString(), color: 'emerald', icon: CheckCircle2, trend: present > 0 ? 'Good attendance' : 'No records' },
      { label: 'Late Arrivals', value: late.toString(), color: 'amber', icon: Clock, trend: late > 0 ? `${late} late` : 'No late arrivals' },
      { label: 'Absent', value: absent.toString(), color: 'rose', icon: X, trend: absent > 0 ? `${absent} absent` : 'No absences' },
      { label: 'Avg Duration', value: `${avgHours}h ${avgMinutes}m`, color: 'blue', icon: Activity, trend: 'Above target' }
    ]
  }, [attendanceRecords])

  const shiftManagement = useMemo(() => {
    const totalShifts = manualShifts.length
    const activeShifts = manualShifts.filter(shift => shift.employees > 0).length
    const assignedEmployees = manualShifts.reduce((sum, shift) => sum + shift.employees, 0)
    const coveragePercent = Math.round((assignedEmployees / 8) * 100)
    
    return {
      totalShifts,
      activeShifts,
      totalEmployees: 8,
      assignedEmployees,
      coverage: `${coveragePercent}%`,
      notes: manualShifts.map(shift => `${shift.name} shift covers ${shift.description.toLowerCase()}`)
    }
  }, [manualShifts])

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-4xl bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-300">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center border border-rose-300">
                <Clock className="h-5 w-5 text-rose-600" />
              </div>
              <span className="text-rose-600 font-bold tracking-wider text-sm uppercase">Time & Attendance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Attendance Management</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Manual attendance tracking with flexible shift management and daily time recording.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98]">
              <Download className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-rose-100 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-purple-100 blur-[100px]"></div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex bg-gray-100 border border-gray-300 rounded-2xl p-1 w-fit">
        {[
          { id: 'daily', label: 'Daily Attendance', icon: Clock },
          { id: 'shifts', label: 'Manual Shifts', icon: Calendar },
          { id: 'manual', label: 'Manual Entry', icon: CheckCircle },
          { id: 'history', label: 'Attendance History', icon: History }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as any)}
            className="flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-rose-600 text-white shadow-lg shadow-rose-600/20"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Selector */}
      <div className="bg-white p-6 rounded-4xl border border-gray-300 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
            <Calendar className="h-6 w-6 text-rose-600" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Selected Date</p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-black font-black text-lg focus:outline-none w-full"
            />
          </div>
        </div>
        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
        <div className="flex items-center gap-4 flex-1">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
            <Search className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Quick Search</p>
            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-black font-black text-lg focus:outline-none w-full placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
        <div className="flex items-center gap-4">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Status</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
          <select 
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Employees</option>
            {uniqueEmployees.map(employee => (
              <option key={employee} value={employee}>{employee}</option>
            ))}
          </select>
        </div>
      </div>

      {/* DAILY ATTENDANCE */}
      {viewMode === 'daily' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {attendanceStats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-4xl border border-gray-300 group hover:border-rose-500/30 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-300">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">{stat.trend}</span>
                </div>
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                <p className="text-4xl font-black text-black mt-2 tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedRecords.length > 0 && (
            <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-rose-700">{selectedRecords.length} record(s) selected</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBulkStatusUpdate('Present')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all"
                >
                  Mark Present
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('Late')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-sm transition-all"
                >
                  Mark Late
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('Absent')}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm transition-all"
                >
                  Mark Absent
                </button>
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-300 rounded-4xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                      <input
                        type="checkbox"
                        checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                    </th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Employee</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Clock In/Out</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Duration</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Shift Type</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Entry Type</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6">
                        <input
                          type="checkbox"
                          checked={selectedRecords.includes(record.id)}
                          onChange={() => handleSelectRecord(record.id)}
                          className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                        />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center text-black font-black text-xs">
                            {record.employee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-black text-black text-sm group-hover:text-rose-600 transition-colors">{record.employee}</p>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-0.5">{record.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-black">{record.clockIn || '--:--'}</span>
                          <ArrowUpRight className="h-3 w-3 text-gray-600" />
                          <span className="text-sm font-black text-gray-600">{record.clockOut || '--:--'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-black">{record.duration}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-300 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                          {record.shiftType}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`flex items-center gap-2 ${record.entryType === 'Manual' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{record.entryType}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditRecord(record)}
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 border border-blue-300 transition-colors"
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteRecord(record.id)}
                            className="p-2 rounded-lg bg-rose-100 hover:bg-rose-200 border border-rose-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-rose-600" />
                          </button>
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border bg-emerald-100 text-emerald-700 border-emerald-300">
                            {record.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit Record Modal */}
          {editingRecord && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-4xl border border-gray-300 p-8 max-w-md w-full">
                <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
                  <Edit className="h-6 w-6 text-rose-600" />
                  Edit Attendance Record
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Employee</p>
                    <p className="text-sm font-black text-black bg-gray-50 px-4 py-3 rounded-xl border border-gray-300">
                      {editingRecord.employee}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Clock In</p>
                      <input
                        type="time"
                        value={recordForm.clockIn}
                        onChange={(e) => setRecordForm(prev => ({ ...prev, clockIn: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Clock Out</p>
                      <input
                        type="time"
                        value={recordForm.clockOut}
                        onChange={(e) => setRecordForm(prev => ({ ...prev, clockOut: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Shift</p>
                    <select 
                      value={recordForm.shift}
                      onChange={(e) => setRecordForm(prev => ({ ...prev, shift: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                    >
                      <option value="">Select Shift</option>
                      {manualShifts.map(shift => (
                        <option key={shift.id} value={shift.name}>{shift.name} ({shift.startTime}-{shift.endTime})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Status</p>
                    <select 
                      value={recordForm.status}
                      onChange={(e) => setRecordForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdateRecord}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all"
                    >
                      <Save className="h-4 w-4" />
                      Update Record
                    </button>
                    <button
                      onClick={() => setEditingRecord(null)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-xl font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* MANUAL SHIFT MANAGEMENT */}
      {viewMode === 'shifts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Shifts', value: shiftManagement.totalShifts.toString(), color: 'rose', icon: Calendar },
                { label: 'Active Shifts', value: shiftManagement.activeShifts.toString(), color: 'emerald', icon: CheckCircle },
                { label: 'Coverage', value: shiftManagement.coverage, color: 'blue', icon: Activity }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-4xl border border-gray-300">
                  <div className="p-4 rounded-2xl bg-rose-100 text-rose-600 border border-rose-300 w-fit mb-6">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-black text-black mt-2 tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-300 rounded-4xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-black flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-rose-600" />
                  Manual Shift Configuration
                </h3>
                <button 
                  onClick={() => setIsAddingShift(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm transition-all"
                >
                  <Plus className="h-4 w-4" />
                  Add Shift
                </button>
              </div>

              {/* Add/Edit Shift Form */}
              {(isAddingShift || editingShift) && (
                <div className="mb-8 p-6 bg-gray-50 border border-gray-300 rounded-2xl">
                  <h4 className="text-lg font-black text-black mb-4">
                    {isAddingShift ? 'Add New Shift' : 'Edit Shift'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Shift Name</p>
                      <input
                        type="text"
                        value={shiftForm.name}
                        onChange={(e) => setShiftForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Morning Shift"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Description</p>
                      <input
                        type="text"
                        value={shiftForm.description}
                        onChange={(e) => setShiftForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the shift"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Start Time</p>
                      <input
                        type="time"
                        value={shiftForm.startTime}
                        onChange={(e) => setShiftForm(prev => ({ ...prev, startTime: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">End Time</p>
                      <input
                        type="time"
                        value={shiftForm.endTime}
                        onChange={(e) => setShiftForm(prev => ({ ...prev, endTime: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={isAddingShift ? handleAddShift : handleUpdateShift}
                      className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all"
                    >
                      <Save className="h-4 w-4" />
                      {isAddingShift ? 'Add Shift' : 'Update Shift'}
                    </button>
                    <button
                      onClick={cancelShiftEdit}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-xl font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {manualShifts.map((shift) => (
                  <div key={shift.id} className="bg-gray-50 border border-gray-300 rounded-2xl p-6 group hover:border-rose-500/30 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h4 className="font-black text-black text-lg">{shift.name} Shift</h4>
                        <p className="text-sm text-gray-600 font-medium mt-1">{shift.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-2xl font-black text-rose-600">{shift.startTime} - {shift.endTime}</div>
                          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Schedule</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleEditShift(shift)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteShift(shift.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-gray-300">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Assigned</p>
                        <p className="text-black font-black">{shift.employees} Personnel</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-300">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</p>
                        <p className="font-black text-emerald-600">{shift.employees > 0 ? 'Active' : 'Inactive'}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-300">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Coverage</p>
                        <p className="text-black font-black">{Math.round((shift.employees / 8) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-gray-300 rounded-4xl p-8">
              <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-rose-600" />
                Shift Management Notes
              </h3>
              <div className="space-y-4">
                {shiftManagement.notes.map((note, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-xs font-black text-rose-600">
                      {idx + 1}
                    </div>
                    <p className="text-sm font-medium text-gray-600">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-4xl p-8">
              <h3 className="text-lg font-black text-black mb-6">Employee Coverage</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Total Employees</span>
                  <span className="text-sm font-black text-black">{shiftManagement.totalEmployees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Assigned to Shifts</span>
                  <span className="text-sm font-black text-emerald-600">{shiftManagement.assignedEmployees}</span>
                </div>
                <div className="h-px bg-gray-300"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-600">Coverage Rate</span>
                  <span className="text-lg font-black text-rose-600">{shiftManagement.coverage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ENTRY */}
      {viewMode === 'manual' && (
        <div className="space-y-8">
          <div className="space-y-8">
              {/* <div className="bg-white border border-gray-300 rounded-4xl p-8">
                <h3 className="text-xl font-black text-black mb-8 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-rose-600" />
                  Manual Attendance Entry
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Employee</p>
                      <select 
                        value={manualEntry.employee}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, employee: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      >
                        <option value="">Select Employee</option>
                        <option value="Ahmed Al-Mazrouei">Ahmed Al-Mazrouei</option>
                        <option value="Fatima Al-Ketbi">Fatima Al-Ketbi</option>
                        <option value="Mohammed Bin Ali">Mohammed Bin Ali</option>
                        <option value="Sara Al-Noor">Sara Al-Noor</option>
                        <option value="Hassan Al-Mazrouei">Hassan Al-Mazrouei</option>
                        <option value="Layla Al-Mansouri">Layla Al-Mansouri</option>
                        <option value="Omar Khan">Omar Khan</option>
                        <option value="Khalid Al-Shehhi">Khalid Al-Shehhi</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Shift</p>
                      <select 
                        value={manualEntry.shift}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, shift: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      >
                        <option value="">Select Shift</option>
                        {manualShifts.map(shift => (
                          <option key={shift.id} value={shift.name}>{shift.name} ({shift.startTime}-{shift.endTime})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Clock In</p>
                      <input 
                        type="time" 
                        value={manualEntry.clockIn}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, clockIn: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500" 
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Clock Out</p>
                      <input 
                        type="time" 
                        value={manualEntry.clockOut}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, clockOut: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500" 
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Status</p>
                      <select 
                        value={manualEntry.status}
                        onChange={(e) => setManualEntry(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                      >
                        <option value="Present">Present</option>
                        <option value="Late">Late</option>
                        <option value="Absent">Absent</option>
                        <option value="Leave">Leave</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Notes (Optional)</p>
                    <textarea 
                      value={manualEntry.notes}
                      onChange={(e) => setManualEntry(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add any additional notes..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:border-rose-500 resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleAttendanceSubmit}
                      className="flex-1 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-rose-500/20"
                    >
                      Record Attendance
                    </button>
                    <button 
                      onClick={() => setManualEntry({ employee: '', shift: '', clockIn: '', clockOut: '', status: 'Present', notes: '' })}
                      className="px-8 py-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-sm transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="space-y-8">
              {/* <div className="bg-white border border-gray-300 rounded-4xl p-8">
                <h3 className="text-lg font-black text-black mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3">
                    <Download className="h-4 w-4" />
                    Bulk Import
                  </button>
                  <button className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark All Present
                  </button>
                </div>
              </div> */}

              <div className="bg-white border border-gray-300 rounded-4xl p-8">
                <h3 className="text-lg font-black text-black mb-6">Entry Guidelines</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-3 w-3 text-emerald-600" />
                    </div>
                    <p className="text-sm text-gray-600">Record attendance within 24 hours of shift</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Clock className="h-3 w-3 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Use actual clock in/out times when available</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-3 w-3 text-amber-600" />
                    </div>
                    <p className="text-sm text-gray-600">Document reasons for absences or late arrivals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* ATTENDANCE HISTORY */}
      {viewMode === 'history' && (
        <div className="space-y-8">
          <div className="bg-white border border-gray-300 rounded-4xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-black flex items-center gap-3">
                <History className="h-6 w-6 text-rose-600" />
                Attendance History
              </h3>
              <div className="flex gap-3">
                <select 
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-rose-500"
                >
                  <option value="all">All Employees</option>
                  {uniqueEmployees.map(employee => (
                    <option key={employee} value={employee}>{employee}</option>
                  ))}
                </select>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-rose-500"
                >
                  <option value="all">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {/* Group records by date */}
              {Object.entries(
                attendanceHistory
                  .filter(record => {
                    const matchesEmployee = filterEmployee === 'all' || record.employee === filterEmployee
                    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
                    return matchesEmployee && matchesStatus
                  })
                  .reduce((groups, record) => {
                    const date = record.date || 'Unknown'
                    if (!groups[date]) groups[date] = []
                    groups[date].push(record)
                    return groups
                  }, {} as Record<string, AttendanceRecord[]>)
              )
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, records]) => (
                  <div key={date} className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="font-black text-black mb-4 flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-rose-600" />
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      <span className="text-sm font-medium text-gray-600">({records.length} records)</span>
                    </h4>
                    
                    <div className="space-y-3">
                      {records.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center text-black font-black text-xs">
                              {record.employee.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-black text-black text-sm">{record.employee}</p>
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{record.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm font-black text-black">{record.clockIn || '--:--'} - {record.clockOut || '--:--'}</p>
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Time</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-black text-black">{record.duration}</p>
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Duration</p>
                            </div>
                            <div className="text-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                record.status === 'Present' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                                record.status === 'Late' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                                'bg-rose-100 text-rose-700 border-rose-300'
                              }`}>
                                {record.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* end of commented history view */}
    </div>
  )
}
