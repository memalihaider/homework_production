'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  FileText,
  LogOut,
  Settings,
  Bell,
  ChevronRight,
  BarChart3,
  Wallet,
  CreditCard,
  PieChart,
  Activity,
  Briefcase,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assignedDate: string
  project: string
  estimatedHours: number
  actualHours?: number
}

interface Attendance {
  id: number
  date: string
  checkIn: string
  checkOut?: string
  totalHours: number
  status: 'present' | 'absent' | 'late' | 'half-day'
  location: string
}

interface PayrollRecord {
  id: number
  month: string
  year: number
  basicSalary: number
  allowances: number
  bonuses: number
  deductions: number
  netSalary: number
  paymentDate: string
  status: 'paid' | 'pending' | 'processing'
}

interface Bonus {
  id: number
  title: string
  amount: number
  type: 'performance' | 'project' | 'annual' | 'special'
  date: string
  description: string
  status: 'earned' | 'pending' | 'paid'
}

export default function EmployeeDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'attendance' | 'payroll' | 'bonuses'>('overview')
  const [employee, setEmployee] = useState<any>(null)

  // Mock employee data based on login
  useEffect(() => {
    const employeeId = sessionStorage.getItem('homeware_employee_id') || localStorage.getItem('homeware_employee_id')
    const employeeName = sessionStorage.getItem('homeware_employee_name') || localStorage.getItem('homeware_employee_name')
    const employeeEmail = sessionStorage.getItem('homeware_employee_email') || localStorage.getItem('homeware_employee_email')

    if (!employeeId) {
      router.push('/login/employee')
      return
    }

    // Mock employee data
    const mockEmployees = {
      'EMP001': {
        id: 'EMP001',
        name: 'John Doe',
        email: 'john.doe@homeware.ae',
        position: 'Senior Cleaner',
        department: 'Operations',
        joinDate: '2023-01-15',
        manager: 'Sarah Johnson',
        phone: '+971 50 123 4567',
        location: 'Dubai Main Office',
        profileImage: '/api/placeholder/100/100',
        salary: {
          basic: 8500,
          allowances: 1200,
          total: 9700
        }
      },
      'EMP002': {
        id: 'EMP002',
        name: 'Sarah Smith',
        email: 'sarah.smith@homeware.ae',
        position: 'Team Lead',
        department: 'Operations',
        joinDate: '2022-08-20',
        manager: 'Mike Wilson',
        phone: '+971 50 987 6543',
        location: 'Dubai Main Office',
        profileImage: '/api/placeholder/100/100',
        salary: {
          basic: 12000,
          allowances: 1800,
          total: 13800
        }
      },
      'EMP003': {
        id: 'EMP003',
        name: 'Mike Johnson',
        email: 'mike.johnson@homeware.ae',
        position: 'Operations Manager',
        department: 'Operations',
        joinDate: '2021-03-10',
        manager: 'David Brown',
        phone: '+971 50 555 1234',
        location: 'Dubai Main Office',
        profileImage: '/api/placeholder/100/100',
        salary: {
          basic: 18000,
          allowances: 2500,
          total: 20500
        }
      },
      'EMP004': {
        id: 'EMP004',
        name: 'Lisa Brown',
        email: 'lisa.brown@homeware.ae',
        position: 'HR Coordinator',
        department: 'Human Resources',
        joinDate: '2023-06-01',
        manager: 'Emma Davis',
        phone: '+971 50 777 8888',
        location: 'Dubai Main Office',
        profileImage: '/api/placeholder/100/100',
        salary: {
          basic: 9500,
          allowances: 1400,
          total: 10900
        }
      }
    }

    setEmployee(mockEmployees[employeeId as keyof typeof mockEmployees])
  }, [router])

  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete office deep cleaning - Downtown Tower',
      description: 'Perform comprehensive cleaning of all floors and common areas',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-12-30',
      assignedDate: '2025-12-20',
      project: 'Downtown Tower Cleaning',
      estimatedHours: 8,
      actualHours: 6
    },
    {
      id: 2,
      title: 'Equipment maintenance check',
      description: 'Inspect and maintain all cleaning equipment',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-28',
      assignedDate: '2025-12-25',
      project: 'Equipment Maintenance',
      estimatedHours: 4
    },
    {
      id: 3,
      title: 'Safety training completion',
      description: 'Complete monthly safety and compliance training',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-12-20',
      assignedDate: '2025-12-15',
      project: 'Training & Development',
      estimatedHours: 2,
      actualHours: 2
    },
    {
      id: 4,
      title: 'Client feedback review',
      description: 'Review and respond to client feedback from recent jobs',
      status: 'overdue',
      priority: 'medium',
      dueDate: '2025-12-25',
      assignedDate: '2025-12-22',
      project: 'Customer Service',
      estimatedHours: 3
    }
  ])

  const [attendance] = useState<Attendance[]>([
    {
      id: 1,
      date: '2025-12-27',
      checkIn: '08:30',
      checkOut: '17:15',
      totalHours: 8.75,
      status: 'present',
      location: 'Dubai Main Office'
    },
    {
      id: 2,
      date: '2025-12-26',
      checkIn: '08:45',
      checkOut: '17:30',
      totalHours: 8.75,
      status: 'present',
      location: 'Dubai Main Office'
    },
    {
      id: 3,
      date: '2025-12-25',
      checkIn: '09:00',
      checkOut: '17:00',
      totalHours: 8,
      status: 'late',
      location: 'Dubai Main Office'
    },
    {
      id: 4,
      date: '2025-12-24',
      checkIn: '08:15',
      checkOut: '16:45',
      totalHours: 8.5,
      status: 'present',
      location: 'Dubai Main Office'
    },
    {
      id: 5,
      date: '2025-12-23',
      checkIn: '08:30',
      checkOut: '17:00',
      totalHours: 8.5,
      status: 'present',
      location: 'Dubai Main Office'
    }
  ])

  const [payrollRecords] = useState<PayrollRecord[]>([
    {
      id: 1,
      month: 'December',
      year: 2025,
      basicSalary: 8500,
      allowances: 1200,
      bonuses: 500,
      deductions: 425,
      netSalary: 9775,
      paymentDate: '2025-12-28',
      status: 'paid'
    },
    {
      id: 2,
      month: 'November',
      year: 2025,
      basicSalary: 8500,
      allowances: 1200,
      bonuses: 750,
      deductions: 425,
      netSalary: 10025,
      paymentDate: '2025-11-28',
      status: 'paid'
    },
    {
      id: 3,
      month: 'October',
      year: 2025,
      basicSalary: 8500,
      allowances: 1200,
      bonuses: 300,
      deductions: 425,
      netSalary: 9575,
      paymentDate: '2025-10-28',
      status: 'paid'
    }
  ])

  const [bonuses] = useState<Bonus[]>([
    {
      id: 1,
      title: 'Performance Bonus - Q4',
      amount: 500,
      type: 'performance',
      date: '2025-12-15',
      description: 'Outstanding performance in Q4 projects',
      status: 'paid'
    },
    {
      id: 2,
      title: 'Project Completion Bonus',
      amount: 750,
      type: 'project',
      date: '2025-11-30',
      description: 'Successfully completed Downtown Tower project ahead of schedule',
      status: 'paid'
    },
    {
      id: 3,
      title: 'Annual Bonus 2025',
      amount: 1200,
      type: 'annual',
      date: '2026-01-15',
      description: 'Annual performance bonus for 2025',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Safety Excellence Award',
      amount: 300,
      type: 'special',
      date: '2025-10-20',
      description: 'Perfect safety record for 6 months',
      status: 'paid'
    }
  ])

  const handleLogout = () => {
    // Clear all employee session data
    sessionStorage.removeItem('homeware_employee_name')
    sessionStorage.removeItem('homeware_employee_id')
    sessionStorage.removeItem('homeware_employee_email')
    localStorage.removeItem('homeware_employee_token')
    localStorage.removeItem('homeware_employee_email')
    localStorage.removeItem('homeware_employee_name')
    localStorage.removeItem('homeware_employee_id')
    localStorage.removeItem('homeware_employee_remember')
    router.push('/login/employee')
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading employee data...</p>
        </div>
      </div>
    )
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700'
      case 'late': return 'bg-yellow-100 text-yellow-700'
      case 'half-day': return 'bg-orange-100 text-orange-700'
      case 'absent': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-700'
      case 'project': return 'bg-green-100 text-green-700'
      case 'annual': return 'bg-purple-100 text-purple-700'
      case 'special': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => t.status === 'overdue').length
  }

  const attendanceStats = {
    thisMonth: attendance.filter(a => a.status === 'present').length,
    totalHours: attendance.reduce((sum, a) => sum + a.totalHours, 0),
    avgHours: attendance.reduce((sum, a) => sum + a.totalHours, 0) / attendance.length
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Employee Portal</h1>
                  <p className="text-xs text-slate-500">Welcome back, {employee.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900">{employee.name}</h3>
                <p className="text-sm text-slate-500">{employee.position}</p>
                <p className="text-xs text-slate-400">{employee.department}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'tasks', label: 'My Tasks', icon: CheckCircle },
                  { id: 'attendance', label: 'Attendance', icon: Clock },
                  { id: 'payroll', label: 'Payroll', icon: Wallet },
                  { id: 'bonuses', label: 'Bonuses', icon: Award }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-slate-900">{taskStats.completed}</div>
                    <div className="text-xs text-slate-500">Tasks Done</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{attendanceStats.thisMonth}</div>
                    <div className="text-xs text-slate-500">Days Present</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {employee.name}!</h2>
                  <p className="text-blue-100 mb-4">Here's your dashboard overview for today.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Active Tasks</span>
                      </div>
                      <div className="text-2xl font-bold">{taskStats.inProgress + taskStats.overdue}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Hours This Week</span>
                      </div>
                      <div className="text-2xl font-bold">{attendanceStats.totalHours.toFixed(1)}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-medium">Next Payroll</span>
                      </div>
                      <div className="text-2xl font-bold">Dec 28</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">My Tasks</h3>
                        <p className="text-xs text-slate-500">Track progress</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{taskStats.total}</div>
                    <div className="text-xs text-slate-500 mt-1">{taskStats.completed} completed</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('attendance')}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Attendance</h3>
                        <p className="text-xs text-slate-500">Time tracking</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{attendanceStats.thisMonth}</div>
                    <div className="text-xs text-slate-500 mt-1">days this month</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('payroll')}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <Wallet className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Payroll</h3>
                        <p className="text-xs text-slate-500">Salary details</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.total.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">monthly salary</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('bonuses')}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Bonuses</h3>
                        <p className="text-xs text-slate-500">Rewards earned</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {bonuses.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mt-1">earned this year</div>
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' :
                          task.status === 'overdue' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{task.title}</div>
                          <div className="text-sm text-slate-500">{task.project}</div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
                  <div className="flex gap-2">
                    <span className="text-sm text-slate-500">Total: {taskStats.total}</span>
                    <span className="text-sm text-green-600">• Completed: {taskStats.completed}</span>
                    <span className="text-sm text-blue-600">• In Progress: {taskStats.inProgress}</span>
                    <span className="text-sm text-red-600">• Overdue: {taskStats.overdue}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-2">{task.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {task.project}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {task.dueDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {task.estimatedHours}h estimated
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTaskStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {task.priority} priority
                          </span>
                        </div>
                      </div>

                      {task.actualHours && (
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="text-sm text-slate-600">
                            Progress: {task.actualHours}h / {task.estimatedHours}h completed
                          </div>
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Attendance Record</h2>
                  <div className="flex gap-4 text-sm">
                    <span className="text-slate-600">This Month: {attendanceStats.thisMonth} days</span>
                    <span className="text-slate-600">Total Hours: {attendanceStats.totalHours.toFixed(1)}h</span>
                    <span className="text-slate-600">Avg Daily: {attendanceStats.avgHours.toFixed(1)}h</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Check In</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Check Out</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Hours</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {attendance.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{record.date}</td>
                          <td className="px-6 py-4 text-slate-600">{record.checkIn}</td>
                          <td className="px-6 py-4 text-slate-600">{record.checkOut || '-'}</td>
                          <td className="px-6 py-4 font-medium text-slate-900">{record.totalHours.toFixed(2)}h</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getAttendanceStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{record.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payroll' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Payroll Information</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.total.toLocaleString()}</div>
                    <div className="text-sm text-slate-500">Monthly Salary</div>
                  </div>
                </div>

                {/* Salary Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Basic Salary</h3>
                        <p className="text-sm text-slate-500">Monthly base pay</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.basic.toLocaleString()}</div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Allowances</h3>
                        <p className="text-sm text-slate-500">Additional benefits</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.allowances.toLocaleString()}</div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Total Salary</h3>
                        <p className="text-sm text-slate-500">Gross monthly pay</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">AED {employee.salary.total.toLocaleString()}</div>
                  </div>
                </div>

                {/* Payroll History */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">Payroll History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Period</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Basic</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Allowances</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Bonuses</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Deductions</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Net Pay</th>
                          <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payrollRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-medium text-slate-900">{record.month} {record.year}</td>
                            <td className="px-6 py-4 text-slate-600">AED {record.basicSalary.toLocaleString()}</td>
                            <td className="px-6 py-4 text-slate-600">AED {record.allowances.toLocaleString()}</td>
                            <td className="px-6 py-4 text-green-600 font-medium">AED {record.bonuses.toLocaleString()}</td>
                            <td className="px-6 py-4 text-red-600">AED {record.deductions.toLocaleString()}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">AED {record.netSalary.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                record.status === 'paid' ? 'bg-green-100 text-green-700' :
                                record.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bonuses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">Bonuses & Rewards</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      AED {bonuses.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">Total earned this year</div>
                  </div>
                </div>

                {/* Bonus Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {bonuses.filter(b => b.type === 'performance').length}
                      </div>
                      <div className="text-sm text-slate-500">Performance Bonuses</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {bonuses.filter(b => b.type === 'project').length}
                      </div>
                      <div className="text-sm text-slate-500">Project Bonuses</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">
                        {bonuses.filter(b => b.type === 'annual').length}
                      </div>
                      <div className="text-sm text-slate-500">Annual Bonuses</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">
                        {bonuses.filter(b => b.status === 'pending').length}
                      </div>
                      <div className="text-sm text-slate-500">Pending Bonuses</div>
                    </div>
                  </div>
                </div>

                {/* Bonuses List */}
                <div className="space-y-4">
                  {bonuses.map((bonus) => (
                    <div key={bonus.id} className="bg-white border border-slate-200 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-2">{bonus.title}</h3>
                          <p className="text-slate-600 text-sm mb-3">{bonus.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {bonus.date}
                            </span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getBonusTypeColor(bonus.type)}`}>
                              {bonus.type}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            AED {bonus.amount.toLocaleString()}
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            bonus.status === 'paid' ? 'bg-green-100 text-green-700' :
                            bonus.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {bonus.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}