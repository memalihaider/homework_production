'use client'

import { useState, Suspense } from 'react'
import {
  ArrowLeft,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Tag,
  DollarSign,
  ArrowRight,
  MessageSquare,
  Star,
  Zap,
  ClipboardCheck,
  Navigation,
  AlertTriangle,
  CheckSquare,
  MessageCircle,
  Calendar,
  Timer,
  ShieldCheck,
  Download,
  History,
  FileText,
  Plus,
  ChevronRight,
  Bell,
  TrendingUp,
  Activity,
  Cloud,
  Car,
  Wrench,
  Eye,
  Edit,
  Save,
  X,
  RefreshCw,
  BarChart3,
  Target,
  Award,
  ThumbsUp,
  ThumbsDown,
  Send,
  Phone,
  Mail,
  Building,
  Wifi,
  WifiOff,
  PlayCircle,
  Camera
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function JobDetailContent() {
  const params = useParams()
  const jobId = params?.id as string || '1'
  const [activeTab, setActiveTab] = useState<'overview' | 'pre-execution' | 'execution' | 'completion'>('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [notesText, setNotesText] = useState('')
  const [realTimeUpdates, setRealTimeUpdates] = useState<any[]>([])
  const [checklistItems, setChecklistItems] = useState([
    { item: 'Job requirements reviewed', status: true },
    { item: 'Client contact confirmed', status: true },
    { item: 'Site access arrangements', status: false },
    { item: 'Safety protocols reviewed', status: true },
    { item: 'Equipment requirements checked', status: false },
    { item: 'Team availability confirmed', status: true }
  ])

  const handleChecklistChange = (index: number) => {
    setChecklistItems(prev => prev.map((item, i) => 
      i === index ? { ...item, status: !item.status } : item
    ))
  }

  // Enhanced job data with AI insights and real-time tracking
  const job = {
    id: parseInt(jobId),
    title: 'Office Deep Cleaning - Downtown Tower',
    client: 'Downtown Business Tower',
    clientId: 1,
    status: 'Scheduled',
    priority: 'High',
    scheduledDate: '2025-01-20',
    scheduledTime: '08:00 - 16:00',
    location: 'Downtown, Dubai',
    estimatedDuration: '8 hours',
    teamRequired: 4,
    assignedTeam: [
      { id: 1, name: 'Ahmed Hassan', role: 'Team Lead', status: 'Confirmed', checkInTime: null, checkOutTime: null },
      { id: 2, name: 'Fatima Al-Mazrouei', role: 'Floor Specialist', status: 'Confirmed', checkInTime: null, checkOutTime: null },
      { id: 3, name: 'Mohammed Bin Ali', role: 'Window Specialist', status: 'Pending', checkInTime: null, checkOutTime: null }
    ],
    permits: [
      { name: 'Building Access Pass', status: 'Approved', expiryDate: '2025-01-25' },
      { name: 'Commercial Permit', status: 'Approved', expiryDate: '2025-01-22' }
    ],
    slaDeadline: '2025-01-20',
    daysUntilSLA: 2,
    riskLevel: 'medium',
    requiredSkills: ['Floor Cleaning', 'Window Cleaning', 'Safety Certification', 'Team Lead'],
    dependencies: ['Building access authorization', 'Equipment delivery'],
    budget: 5000,
    description: 'Complete office floor deep cleaning with window and cubicle sanitization',
    notes: 'Building manager is Ahmed. Access from rear entrance. Equipment storage in basement.',
    aiInsights: {
      riskPrediction: 'medium',
      estimatedCompletion: '7.5 hours',
      recommendedTeamSize: 4,
      weatherImpact: 'None',
      trafficDelay: '15 minutes',
      equipmentEfficiency: '95%'
    },
    progressMetrics: {
      checklistCompletion: 85,
      equipmentReadiness: 90,
      teamReadiness: 100,
      permitStatus: 100,
      overallReadiness: 92
    },
    realTimeData: {
      teamLocation: 'En Route',
      weatherConditions: 'Clear, 28°C',
      trafficStatus: 'Moderate',
      equipmentStatus: 'All Ready'
    },
    history: [
      { action: 'Created', user: 'Sales Team', timestamp: '2025-01-10 10:30', details: 'Job created from quotation', type: 'creation' },
      { action: 'Scheduled', user: 'Scheduling Team', timestamp: '2025-01-12 14:00', details: 'Date and time confirmed', type: 'scheduling' },
      { action: 'Team Assigned', user: 'HR Manager', timestamp: '2025-01-15 09:00', details: '3 team members assigned', type: 'assignment' },
      { action: 'Permits Approved', user: 'Compliance Officer', timestamp: '2025-01-18 16:00', details: 'All required permits obtained', type: 'compliance' }
    ],
    attachments: [
      { name: 'Building Layout', type: 'PDF', size: '2.4 MB', uploadedBy: 'Operations Manager', uploadDate: '2025-01-15' },
      { name: 'Safety Instructions', type: 'PDF', size: '1.1 MB', uploadedBy: 'Safety Officer', uploadDate: '2025-01-16' },
      { name: 'Client Requirements', type: 'DOC', size: '450 KB', uploadedBy: 'Sales Team', uploadDate: '2025-01-10' }
    ],
    notifications: [
      { id: 1, type: 'warning', message: 'Weather forecast shows possible rain - consider rescheduling', timestamp: '2025-01-19 08:00', read: false },
      { id: 2, type: 'info', message: 'Team check-in reminder: 08:00 tomorrow', timestamp: '2025-01-19 18:00', read: true },
      { id: 3, type: 'success', message: 'All permits approved and ready', timestamp: '2025-01-18 16:30', read: true }
    ]
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 space-y-8">
      {/* Enhanced Header with Real-time Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/jobs" className="p-2 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                job.status === 'Scheduled' ? 'bg-indigo-100 text-indigo-700' :
                job.status === 'In Progress' ? 'bg-green-100 text-green-700' :
                job.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {job.status}
              </span>
             
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {job.client}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Real-time Status Indicators */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-1">
              <Cloud className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">{job.realTimeData.weatherConditions}</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-medium text-gray-700">{job.realTimeData.trafficStatus}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wrench className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-gray-700">{job.realTimeData.equipmentStatus}</span>
            </div>
          </div>

         

          {/* Action Buttons */}
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl transition-all border border-gray-400"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Job</span>
          </button>
          <button
            onClick={() => setShowStatusModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Update Status</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-all border border-red-300">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Enhanced Quick Stats Bar with AI Insights */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Scheduled Date', value: job.scheduledDate, sub: job.scheduledTime, icon: Calendar, color: 'text-blue-600' },
          { label: 'Duration', value: job.estimatedDuration, sub: `AI: ${job.aiInsights.estimatedCompletion}`, icon: Timer, color: 'text-indigo-600' },
          { label: 'Budget', value: `AED ${job.budget.toLocaleString()}`, sub: 'Fixed Price', icon: DollarSign, color: 'text-emerald-600' },
          { label: 'SLA Deadline', value: job.slaDeadline, sub: `${job.daysUntilSLA} days left`, icon: ShieldCheck, color: job.daysUntilSLA <= 1 ? 'text-red-600' : 'text-amber-600' },
          { label: 'AI Risk Level', value: job.aiInsights.riskPrediction.toUpperCase(), sub: 'Medium Confidence', icon: job.aiInsights.riskPrediction === 'high' ? AlertTriangle : job.aiInsights.riskPrediction === 'medium' ? Clock : CheckCircle, color: job.aiInsights.riskPrediction === 'high' ? 'text-red-600' : job.aiInsights.riskPrediction === 'medium' ? 'text-yellow-600' : 'text-green-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-300 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* AI Insights & Progress Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Metrics */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Readiness Progress
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Overall Readiness', value: job.progressMetrics.overallReadiness, color: 'bg-blue-600' },
              { label: 'Checklist Completion', value: job.progressMetrics.checklistCompletion, color: 'bg-green-600' },
              { label: 'Equipment Ready', value: job.progressMetrics.equipmentReadiness, color: 'bg-purple-600' },
              { label: 'Team Confirmed', value: job.progressMetrics.teamReadiness, color: 'bg-indigo-600' },
              { label: 'Permits Approved', value: job.progressMetrics.permitStatus, color: 'bg-emerald-600' },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${metric.color} transition-all duration-500`} style={{ width: `${metric.value}%` }}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 w-8">{metric.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200">
              <Target className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-900">Optimal Team Size</div>
                <div className="text-sm text-gray-700">{job.aiInsights.recommendedTeamSize} members recommended</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200">
              <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-900">Efficiency Prediction</div>
                <div className="text-sm text-gray-700">{job.aiInsights.equipmentEfficiency} equipment efficiency</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200">
              <Clock className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-900">Time Optimization</div>
                <div className="text-sm text-gray-700">Expected completion: {job.aiInsights.estimatedCompletion}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Recent Notifications
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {job.notifications.slice(0, 4).map((notification) => (
              <div key={notification.id} className={`flex items-start gap-3 p-3 rounded-xl border ${
                notification.read ? 'bg-white border-gray-200' : 'bg-amber-100 border-amber-300'
              }`}>
                <div className={`p-1 rounded-lg ${
                  notification.type === 'warning' ? 'bg-red-100' :
                  notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {notification.type === 'warning' ? <AlertTriangle className="w-3 h-3 text-red-600" /> :
                   notification.type === 'success' ? <CheckCircle className="w-3 h-3 text-green-600" /> :
                   <Bell className="w-3 h-3 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-900">{notification.message}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{notification.timestamp}</div>
                </div>
                {!notification.read && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
              </div>
            ))}
          </div>
          <button className="w-full mt-3 text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors">
            View All Notifications →
          </button>
        </div>
      </div>

     
      {/* Enhanced Workflow Actions - Dynamic based on status */}
      {job.status === 'Scheduled' && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Pre-Execution Workflow
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-700">Progress: {job.progressMetrics.overallReadiness}%</span>
              <div className="w-24 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${job.progressMetrics.overallReadiness}%` }}></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              href={`/admin/jobs/${jobId}/pre-job-checklist`}
              className="group p-4 bg-blue-100 hover:bg-blue-200 border border-blue-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <ClipboardCheck className="w-6 h-6 text-blue-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-blue-900">Pre-Job Checklist</span>
              <div className="text-[10px] text-blue-700 mt-1">{job.progressMetrics.checklistCompletion}% Complete</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/assignment`}
              className="group p-4 bg-purple-100 hover:bg-purple-200 border border-purple-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <Users className="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-purple-900">Team Assignment</span>
              <div className="text-[10px] text-purple-700 mt-1">{job.progressMetrics.teamReadiness}% Ready</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/permit-tracker`}
              className="group p-4 bg-green-100 hover:bg-green-200 border border-green-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <ShieldCheck className="w-6 h-6 text-green-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-green-900">Permit Tracker</span>
              <div className="text-[10px] text-green-700 mt-1">{job.progressMetrics.permitStatus}% Approved</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/equipment-readiness`}
              className="group p-4 bg-orange-100 hover:bg-orange-200 border border-orange-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <Wrench className="w-6 h-6 text-orange-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-orange-900">Equipment</span>
              <div className="text-[10px] text-orange-700 mt-1">{job.progressMetrics.equipmentReadiness}% Ready</div>
            </Link>
            <button
              onClick={() => setShowStatusModal(true)}
              className="group p-4 bg-indigo-100 hover:bg-indigo-200 border border-indigo-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <ArrowRight className="w-6 h-6 text-indigo-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-indigo-900">Start Job</span>
              <div className="text-[10px] text-indigo-700 mt-1">Begin Execution</div>
            </button>
          </div>
        </div>
      )}

      {job.status === 'In Progress' && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Active Execution Workflow
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-green-800">LIVE TRACKING</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              href={`/admin/jobs/${jobId}/live-job-view`}
              className="group p-4 bg-green-100 hover:bg-green-200 border border-green-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <Eye className="w-6 h-6 text-green-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-green-900">Live View</span>
              <div className="text-[10px] text-green-700 mt-1">Real-time Monitoring</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/task-progress`}
              className="group p-4 bg-blue-100 hover:bg-blue-200 border border-blue-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <CheckSquare className="w-6 h-6 text-blue-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-blue-900">Task Progress</span>
              <div className="text-[10px] text-blue-700 mt-1">Track Completion</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/damage-check`}
              className="group p-4 bg-orange-100 hover:bg-orange-200 border border-orange-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <AlertTriangle className="w-6 h-6 text-orange-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-orange-900">Damage Check</span>
              <div className="text-[10px] text-orange-700 mt-1">Quality Control</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/incident-log`}
              className="group p-4 bg-red-100 hover:bg-red-200 border border-red-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <AlertCircle className="w-6 h-6 text-red-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-red-900">Incidents</span>
              <div className="text-[10px] text-red-700 mt-1">Report Issues</div>
            </Link>
            <button
              onClick={() => setShowStatusModal(true)}
              className="group p-4 bg-emerald-100 hover:bg-emerald-200 border border-emerald-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <CheckCircle className="w-6 h-6 text-emerald-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-emerald-900">Complete Job</span>
              <div className="text-[10px] text-emerald-700 mt-1">Finish Execution</div>
            </button>
          </div>
        </div>
      )}

      {job.status === 'Completed' && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Post-Completion Workflow
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full">
              <CheckCircle className="w-3 h-3 text-emerald-700" />
              <span className="text-xs font-bold text-emerald-800">JOB COMPLETED</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link
              href={`/admin/jobs/${jobId}/job-closure`}
              className="group p-4 bg-emerald-100 hover:bg-emerald-200 border border-emerald-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <CheckCircle className="w-6 h-6 text-emerald-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-emerald-900">Job Closure</span>
              <div className="text-[10px] text-emerald-700 mt-1">Final Documentation</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/feedback-collection`}
              className="group p-4 bg-indigo-100 hover:bg-indigo-200 border border-indigo-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <Star className="w-6 h-6 text-indigo-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-indigo-900">Client Feedback</span>
              <div className="text-[10px] text-indigo-700 mt-1">Collect Reviews</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/review-request`}
              className="group p-4 bg-purple-100 hover:bg-purple-200 border border-purple-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <MessageSquare className="w-6 h-6 text-purple-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-purple-900">Review Request</span>
              <div className="text-[10px] text-purple-700 mt-1">Request Approval</div>
            </Link>
            <Link
              href={`/admin/jobs/${jobId}/client-summary`}
              className="group p-4 bg-pink-100 hover:bg-pink-200 border border-pink-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <FileText className="w-6 h-6 text-pink-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-pink-900">Client Summary</span>
              <div className="text-[10px] text-pink-700 mt-1">Final Report</div>
            </Link>
            <Link
              href={`/admin/finance/invoice-generator?jobId=${jobId}`}
              className="group p-4 bg-blue-100 hover:bg-blue-200 border border-blue-400 rounded-xl text-center transition-all hover:scale-105"
            >
              <DollarSign className="w-6 h-6 text-blue-700 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-blue-900">Generate Invoice</span>
              <div className="text-[10px] text-blue-700 mt-1">Billing Process</div>
            </Link>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-2xl w-fit shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'pre-execution', label: 'Pre-Execution', icon: ClipboardCheck },
          { id: 'execution', label: 'Execution', icon: Navigation },
          { id: 'completion', label: 'Completion', icon: CheckSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'pre-execution' && (
            <div className="bg-white border border-gray-300 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Pre-Execution Phase</h3>
                <span className="text-xs font-bold text-blue-900 px-3 py-1 bg-blue-100 rounded-full">Preparation Stage</span>
              </div>

              {/* Pre-Execution Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5" />
                    Pre-Job Checklist
                  </h4>
                  <div className="space-y-3">
                    {checklistItems.map((check, i) => (
                      <label key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-blue-200">
                        <input
                          type="checkbox"
                          checked={check.status}
                          onChange={() => handleChecklistChange(i)}
                          className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-900">{check.item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Team Readiness
                  </h4>
                  <div className="space-y-4">
                    {job.assignedTeam.map((member, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-purple-200">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white ${
                          member.status === 'Confirmed' ? 'bg-green-600' : 'bg-yellow-600'
                        }`}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-600">{member.role}</div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          member.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Permits & Equipment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Permits & Access
                  </h4>
                  <div className="space-y-3">
                    {job.permits.map((permit, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{permit.name}</div>
                            <div className="text-xs text-gray-600">Expires: {permit.expiryDate}</div>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          permit.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {permit.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Equipment Status
                  </h4>
                  <div className="space-y-3">
                    {[
                      { item: 'Cleaning supplies', status: 'Ready', color: 'green' },
                      { item: 'Safety equipment', status: 'Ready', color: 'green' },
                      { item: 'Specialized tools', status: 'Pending', color: 'yellow' },
                      { item: 'Transportation', status: 'Ready', color: 'green' }
                    ].map((equipment, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-orange-200">
                        <span className="text-sm text-gray-900">{equipment.item}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${equipment.color}-100 text-${equipment.color}-700`}>
                          {equipment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pre-Execution Actions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-blue-900 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href={`/admin/jobs/${jobId}/pre-job-checklist`}
                    className="p-4 bg-blue-100 hover:bg-blue-200 border border-blue-400 rounded-xl text-center transition-all hover:scale-105"
                  >
                    <ClipboardCheck className="w-6 h-6 text-blue-700 mx-auto mb-2" />
                    <span className="text-xs font-bold text-blue-900">Complete Checklist</span>
                  </Link>
                  <Link
                    href={`/admin/jobs/${jobId}/assignment`}
                    className="p-4 bg-purple-100 hover:bg-purple-200 border border-purple-400 rounded-xl text-center transition-all hover:scale-105"
                  >
                    <Users className="w-6 h-6 text-purple-700 mx-auto mb-2" />
                    <span className="text-xs font-bold text-purple-900">Manage Team</span>
                  </Link>
                  <Link
                    href={`/admin/jobs/${jobId}/permit-tracker`}
                    className="p-4 bg-green-100 hover:bg-green-200 border border-green-400 rounded-xl text-center transition-all hover:scale-105"
                  >
                    <ShieldCheck className="w-6 h-6 text-green-700 mx-auto mb-2" />
                    <span className="text-xs font-bold text-green-900">Permit Tracker</span>
                  </Link>
                  <Link
                    href={`/admin/jobs/${jobId}/equipment-readiness`}
                    className="p-4 bg-orange-100 hover:bg-orange-200 border border-orange-400 rounded-xl text-center transition-all hover:scale-105"
                  >
                    <Wrench className="w-6 h-6 text-orange-700 mx-auto mb-2" />
                    <span className="text-xs font-bold text-orange-900">Equipment Check</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <>
              {/* Description & Notes */}
              <div className="bg-white border border-gray-300 rounded-3xl p-8 space-y-6 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Job Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>
                <div className="p-6 bg-indigo-50 border border-indigo-300 rounded-2xl">
                  <h4 className="text-sm font-bold text-indigo-900 mb-2">Operational Notes</h4>
                  <p className="text-sm text-gray-800">{job.notes}</p>
                </div>
              </div>

              {/* Requirements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-xs font-bold border border-blue-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Permits & Access</h3>
                  <div className="space-y-3">
                    {job.permits.map((permit, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-300">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{permit.name}</div>
                            <div className="text-xs text-gray-600">Expires: {permit.expiryDate}</div>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          permit.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {permit.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'execution' && (
            <div className="bg-white border border-gray-300 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">On-Site Execution</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-800">LIVE</span>
                  </div>
                  <span className="text-xs font-bold text-green-900 px-3 py-1 bg-green-100 rounded-full">In Progress</span>
                </div>
              </div>
              
              {/* Execution Progress */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckSquare className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-900">Task Progress</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 mb-2">75%</div>
                  <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-xs text-green-700">12 of 16 tasks completed</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-blue-900">Time Tracking</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 mb-2">4.5h</div>
                  <div className="text-xs text-blue-700 mb-2">Elapsed: 4h 30m</div>
                  <div className="text-xs text-blue-600">Estimated completion: 6.5h</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-bold text-orange-900">Live Updates</span>
                  </div>
                  <div className="text-xs text-orange-700 mb-2">Last update: 2 min ago</div>
                  <div className="text-xs text-orange-600">Team: On site, working efficiently</div>
                  <div className="text-xs text-orange-600">Weather: Clear, 28°C</div>
                </div>
              </div>

              {/* Current Tasks & Image Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Current Tasks</h4>
                  <div className="space-y-3">
                    {[
                      { task: 'Floor deep cleaning - Main area', status: 'completed', progress: 100 },
                      { task: 'Window exterior cleaning', status: 'in-progress', progress: 60 },
                      { task: 'Cubicle sanitization', status: 'pending', progress: 0 },
                      { task: 'Restroom deep clean', status: 'pending', progress: 0 }
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className={`w-4 h-4 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="flex-1 text-sm text-gray-900">{task.task}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all ${
                            task.status === 'completed' ? 'bg-green-500' :
                            task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                          }`} style={{ width: `${task.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Image Documentation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Before</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">In Progress</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">After</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Add Photo</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                    Upload Images
                  </button>
                </div>
              </div>

              {/* Execution Notes */}
              <div className="bg-white border border-gray-300 rounded-2xl p-6 mt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Execution Notes</h4>
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add real-time notes about job execution..."
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'completion' && (
            <div className="bg-white border border-gray-300 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Job Completion</h3>
                <span className="text-xs font-bold text-emerald-900 px-3 py-1 bg-emerald-100 rounded-full">Ready for Completion</span>
              </div>

              {/* Completion Checklist */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  Completion Checklist
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { item: 'All tasks completed', status: true },
                    { item: 'Quality inspection passed', status: true },
                    { item: 'Equipment returned to storage', status: false },
                    { item: 'Site cleaned and secured', status: false },
                    { item: 'Client sign-off obtained', status: false },
                    { item: 'Final documentation uploaded', status: false }
                  ].map((check, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-200">
                      <input
                        type="checkbox"
                        checked={check.status}
                        className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-900">{check.item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Final Documentation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Client Sign-Off</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">Downtown Business Tower</div>
                          <div className="text-xs text-gray-600">Client Representative</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">Signature required for job completion</div>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                        Request Signature
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-300 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Quality Assurance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm text-green-900">Quality Score</span>
                      <span className="text-sm font-bold text-green-900">95/100</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm text-blue-900">Client Satisfaction</span>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Actions */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-emerald-900 mb-4">Final Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-emerald-100 hover:bg-emerald-200 border border-emerald-400 rounded-xl text-center transition-all hover:scale-105">
                    <CheckCircle className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
                    <span className="text-sm font-bold text-emerald-900">Complete Job</span>
                  </button>
                  <button className="p-4 bg-blue-100 hover:bg-blue-200 border border-blue-400 rounded-xl text-center transition-all hover:scale-105">
                    <FileText className="w-6 h-6 text-blue-700 mx-auto mb-2" />
                    <span className="text-sm font-bold text-blue-900">Generate Report</span>
                  </button>
                  <Link
                    href={`/admin/finance/invoice-generator?jobId=${jobId}`}
                    className="p-4 bg-purple-100 hover:bg-purple-200 border border-purple-400 rounded-xl text-center transition-all hover:scale-105"
                  >
                    <DollarSign className="w-6 h-6 text-purple-700 mx-auto mb-2" />
                    <span className="text-sm font-bold text-purple-900">Create Invoice</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Team & History */}
        <div className="lg:col-span-4 space-y-6">
          {/* Enhanced Team Section with Real-time Status */}
          <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                Team Status
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600">{job.assignedTeam.filter(m => m.status === 'Confirmed').length}/{job.assignedTeam.length} Active</span>
                </div>
                <Link href={`/admin/jobs/${jobId}/assignment`} className="text-xs font-bold text-indigo-600 hover:underline">
                  Manage
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {job.assignedTeam.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-300 hover:bg-gray-100 transition-all">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white ${
                      member.status === 'Confirmed' ? 'bg-green-600' :
                      member.status === 'Pending' ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {member.status === 'Confirmed' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-sm font-bold text-gray-900">{member.name}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        member.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        member.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{member.role}</div>
                    {member.checkInTime && (
                      <div className="flex items-center gap-3 text-[10px] text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Check-in: {member.checkInTime}</span>
                        </div>
                        {member.checkOutTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Check-out: {member.checkOutTime}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {job.status === 'In Progress' && !member.checkInTime && (
                      <div className="text-[10px] text-amber-600 font-medium">Awaiting check-in at site</div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <button className="p-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                      <Phone className="w-3 h-3 text-gray-600" />
                    </button>
                    <button className="p-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                      <MessageCircle className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
              <Link
                href={`/admin/jobs/${jobId}/assignment`}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 text-sm font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Team Member
              </Link>
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Attachments</h3>
            <div className="space-y-3">
              {job.attachments.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">{file.name}</div>
                      <div className="text-[10px] text-gray-500">{file.size} • {file.type}</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white border border-gray-300 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <History className="w-4 h-4 text-gray-500" />
              Activity Log
            </h3>
            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-gray-300">
              {job.history.map((event, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-3 top-1.5 w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]" />
                  <div className="text-xs font-bold text-gray-900 mb-1">{event.action}</div>
                  <div className="text-[10px] text-gray-600 mb-1">{event.timestamp} • {event.user}</div>
                  <div className="text-[10px] text-gray-500 italic">{event.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Update Job Status</h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { status: 'Scheduled', label: 'Scheduled', color: 'bg-indigo-100 text-indigo-700', icon: Calendar },
                { status: 'In Progress', label: 'Start Job', color: 'bg-green-100 text-green-700', icon: PlayCircle },
                { status: 'Completed', label: 'Complete Job', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
                { status: 'Cancelled', label: 'Cancel Job', color: 'bg-red-100 text-red-700', icon: X }
              ].map((option) => (
                <button
                  key={option.status}
                  onClick={() => {
                    // Handle status update
                    setShowStatusModal(false)
                  }}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                    job.status === option.status
                      ? 'border-indigo-400 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${option.color.split(' ')[0]} ${option.color.split(' ')[1]}`}>
                    <option.icon className={`w-4 h-4 ${option.color.split(' ')[1]}`} />
                  </div>
                  <span className="font-bold text-gray-900">{option.label}</span>
                  {job.status === option.status && <CheckCircle className="w-4 h-4 text-indigo-600 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Notes</h3>
              <button
                onClick={() => setShowNotesModal(false)}
                className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Enter your notes here..."
                className="w-full h-32 p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle save notes
                    setShowNotesModal(false)
                    setNotesText('')
                  }}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <JobDetailContent />
    </Suspense>
  )
}