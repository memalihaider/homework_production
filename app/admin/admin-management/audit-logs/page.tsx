'use client'

import { useState, useMemo } from 'react'
import { 
  Search, 
  AlertTriangle, 
  AlertCircle, 
  Eye, 
  Download, 
  Filter, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  ExternalLink,
  X,
  ChevronDown,
  ArrowUpRight,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Fingerprint,
  Terminal,
  Database,
  Globe,
  User,
  Calendar,
  ArrowRight
} from 'lucide-react'

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUser, setFilterUser] = useState('all')
  const [filterAction, setFilterAction] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')
  const [dateFrom, setDateFrom] = useState('2025-02-01')
  const [dateTo, setDateTo] = useState('2025-02-18')
  const [selectedLog, setSelectedLog] = useState<any>(null)
  
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, userId: 'Ahmed (1)', action: 'ROLE_CREATED', resource: 'Roles', timestamp: '2025-02-18 14:30', ipAddress: '192.168.1.100', riskScore: 5, anomalyDetected: false, changeType: 'create', before: 'N/A', after: 'Custom Role: Project Manager' },
    { id: 2, userId: 'Fatima (2)', action: 'USER_ADDED', resource: 'Users', timestamp: '2025-02-18 13:15', ipAddress: '10.0.0.50', riskScore: 3, anomalyDetected: false, changeType: 'create', before: 'N/A', after: 'New user: noor@homeware.ae' },
    { id: 3, userId: 'Mohammed (3)', action: 'PERMISSION_GRANTED', resource: 'Permissions', timestamp: '2025-02-18 12:00', ipAddress: '192.168.1.105', riskScore: 45, anomalyDetected: true, changeType: 'update', before: 'Finance:View', after: 'Finance:Delete' },
    { id: 4, userId: 'Layla (4)', action: 'REPORT_EXPORTED', resource: 'Finance', timestamp: '2025-02-18 11:30', ipAddress: '192.168.1.110', riskScore: 25, anomalyDetected: false, changeType: 'export', before: 'Report ID: 5432', after: 'Exported to CSV' },
    { id: 5, userId: 'Khalid (5)', action: 'USER_DELETED', resource: 'Users', timestamp: '2025-02-18 10:15', ipAddress: '192.168.1.115', riskScore: 80, anomalyDetected: true, changeType: 'delete', before: 'User: omar@homeware.ae', after: 'Permanently removed' },
    { id: 6, userId: 'Ahmed (1)', action: 'CONFIG_CHANGED', resource: 'System', timestamp: '2025-02-18 09:45', ipAddress: '192.168.1.100', riskScore: 90, anomalyDetected: true, changeType: 'update', before: 'Session timeout: 30min', after: 'Session timeout: 120min' },
    { id: 7, userId: 'Noor (6)', action: 'MULTIPLE_FAILED_LOGINS', resource: 'Authentication', timestamp: '2025-02-18 08:30', ipAddress: '203.0.113.45', riskScore: 75, anomalyDetected: true, changeType: 'security', before: '2 failed attempts', after: '5 failed attempts (BLOCKED)' },
    { id: 8, userId: 'Unknown', action: 'UNAUTHORIZED_ACCESS_ATTEMPT', resource: 'Admin Panel', timestamp: '2025-02-17 22:15', ipAddress: '198.51.100.88', riskScore: 95, anomalyDetected: true, changeType: 'security', before: 'N/A', after: 'Blocked: Invalid credentials' },
    { id: 9, userId: 'Layla (4)', action: 'INVOICE_APPROVED', resource: 'Finance', timestamp: '2025-02-17 20:00', ipAddress: '192.168.1.110', riskScore: 15, anomalyDetected: false, changeType: 'update', before: 'Status: Pending', after: 'Status: Approved (AED 45,000)' },
    { id: 10, userId: 'Ahmed (1)', action: 'TEMP_ACCESS_GRANTED', resource: 'Permissions', timestamp: '2025-02-17 18:45', ipAddress: '192.168.1.100', riskScore: 20, anomalyDetected: false, changeType: 'update', before: 'No temp access', after: 'Finance:Export until 2025-02-25' },
    { id: 11, userId: 'Mohammed (3)', action: 'LOGIN', resource: 'Authentication', timestamp: '2025-02-17 17:30', ipAddress: '192.168.1.105', riskScore: 0, anomalyDetected: false, changeType: 'access', before: 'N/A', after: 'Successfully logged in' },
    { id: 12, userId: 'Unknown', action: 'SQL_INJECTION_ATTEMPT', resource: 'Database', timestamp: '2025-02-17 15:20', ipAddress: '192.0.2.45', riskScore: 100, anomalyDetected: true, changeType: 'security', before: 'N/A', after: 'Blocked and logged: Malicious query detected' },
  ])

  const getRiskLevel = (score: number) => {
    if (score <= 5) return 'Low'
    if (score <= 25) return 'Medium'
    if (score <= 50) return 'High'
    return 'Critical'
  }

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch = searchTerm === '' || 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesUser = filterUser === 'all' || log.userId.includes(filterUser)
      const matchesAction = filterAction === 'all' || log.action === filterAction
      const matchesRisk = filterRisk === 'all' || getRiskLevel(log.riskScore) === filterRisk

      return matchesSearch && matchesUser && matchesAction && matchesRisk
    })
  }, [searchTerm, filterUser, filterAction, filterRisk, auditLogs])

  const anomalyCount = auditLogs.filter(l => l.anomalyDetected).length
  const criticalCount = auditLogs.filter(l => l.riskScore >= 75).length
  const securityEventsCount = auditLogs.filter(l => l.changeType === 'security').length
  const avgRiskScore = Math.round(auditLogs.reduce((sum, l) => sum + l.riskScore, 0) / auditLogs.length)

  const users = Array.from(new Set(auditLogs.map(l => l.userId)))
  const actions = Array.from(new Set(auditLogs.map(l => l.action)))

  return (
    <div className="space-y-8 pb-10 bg-white text-black">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                <Terminal className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">System Forensics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Audit Logs</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Real-time activity monitoring and anomaly detection for system-wide operations.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="group relative flex items-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-black rounded-2xl font-black transition-all border border-gray-300">
              <Download className="h-5 w-5 text-blue-600" />
              Export Logs
            </button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-blue-50 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-indigo-50 blur-[100px]"></div>
      </div>

      {/* Security Alert Banner */}
      {(anomalyCount > 0 || criticalCount > 0) && (
        <div className="relative overflow-hidden bg-red-50 border border-red-200 rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center border border-red-200 animate-pulse">
              <ShieldAlert className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-red-800">Security Anomalies Detected</h3>
              <p className="text-red-700 text-sm font-medium">
                {anomalyCount} anomalies and {criticalCount} critical risk events require immediate review.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg">
            Review Incidents
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: auditLogs.length, color: 'blue', icon: Activity },
          { label: 'Avg Risk Score', value: avgRiskScore, color: 'emerald', icon: TrendingUp },
          { label: 'Anomalies', value: anomalyCount, color: 'amber', icon: AlertCircle },
          { label: 'Critical Events', value: criticalCount, color: 'rose', icon: ShieldAlert }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search logs by user, action, or resource..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none text-black placeholder:text-gray-500 transition-all"
            />
          </div>

          {/* Logs Timeline */}
          <div className="space-y-4">
            {filteredLogs.map((log, idx) => (
              <div 
                key={log.id} 
                onClick={() => setSelectedLog(log)}
                className={`group relative bg-white border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all cursor-pointer ${log.anomalyDetected ? 'border-red-200' : ''}`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${
                      log.riskScore > 75 ? 'bg-red-100 border-red-200 text-red-600' :
                      log.riskScore > 25 ? 'bg-amber-100 border-amber-200 text-amber-600' :
                      'bg-emerald-100 border-emerald-200 text-emerald-600'
                    }`}>
                      {log.riskScore > 75 ? <ShieldAlert className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                    </div>
                    <div className="w-px h-full bg-gray-200 group-last:hidden"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-black group-hover:text-blue-600 transition-colors">{log.action}</span>
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-black text-gray-600 uppercase tracking-widest border border-gray-200">
                          {log.resource}
                        </span>
                        {log.anomalyDetected && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-[10px] font-black text-red-600 uppercase tracking-widest border border-red-200">
                            <Zap className="h-3 w-3" /> Anomaly
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-500 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {log.timestamp}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-black">{log.userId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="h-4 w-4 text-indigo-600" />
                        <span>{log.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Activity className="h-4 w-4 text-emerald-600" />
                        <span>Risk: {log.riskScore}</span>
                      </div>
                      <div className="flex justify-end">
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                          Details <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-[32px] p-8 space-y-8 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                Refine Logs
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">User Identity</label>
                  <select 
                    value={filterUser} 
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  >
                    <option value="all" className="bg-white text-black">All Users</option>
                    {users.map(u => <option key={u} value={u} className="bg-white text-black">{u}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Action Type</label>
                  <select 
                    value={filterAction} 
                    onChange={(e) => setFilterAction(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  >
                    <option value="all" className="bg-white text-black">All Actions</option>
                    {actions.map(a => <option key={a} value={a} className="bg-white text-black">{a}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Risk Level</label>
                  <select 
                    value={filterRisk} 
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  >
                    <option value="all" className="bg-white text-black">All Risk Levels</option>
                    <option value="Low" className="bg-white text-emerald-600">Low Risk</option>
                    <option value="Medium" className="bg-white text-amber-600">Medium Risk</option>
                    <option value="High" className="bg-white text-orange-600">High Risk</option>
                    <option value="Critical" className="bg-white text-red-600">Critical Risk</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-lg font-black text-black mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Date Range
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">From</label>
                  <input 
                    type="date" 
                    value={dateFrom} 
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">To</label>
                  <input 
                    type="date" 
                    value={dateTo} 
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg">
              Apply Filters
            </button>
          </div>

          {/* Security Insights */}
          <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Security Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs font-bold text-gray-600">System Integrity</span>
                <span className="text-xs font-black text-emerald-600">OPTIMAL</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs font-bold text-gray-600">Last Scan</span>
                <span className="text-xs font-black text-black">2 mins ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs font-bold text-gray-600">Active Sessions</span>
                <span className="text-xs font-black text-blue-600">128</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-[32px] shadow-2xl w-full max-w-3xl overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${
                  selectedLog.riskScore > 75 ? 'bg-red-100 border-red-200 text-red-600' : 'bg-blue-100 border-blue-200 text-blue-600'
                }`}>
                  <Terminal className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black">Event Forensics</h2>
                  <p className="text-gray-500 text-sm font-medium mt-1">Log ID: #{selectedLog.id} • {selectedLog.timestamp}</p>
                </div>
              </div>
              <button onClick={() => setSelectedLog(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">User Identity</p>
                  <p className="text-lg font-black text-black">{selectedLog.userId}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">IP Address</p>
                  <p className="text-lg font-black text-black">{selectedLog.ipAddress}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Risk Score</p>
                  <p className={`text-lg font-black ${selectedLog.riskScore > 75 ? 'text-red-600' : 'text-emerald-600'}`}>{selectedLog.riskScore}/100</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-black text-gray-600 uppercase tracking-widest ml-1">Change Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3">Before State</p>
                    <code className="text-sm text-black font-mono break-all">{selectedLog.before}</code>
                  </div>
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">After State</p>
                    <code className="text-sm text-black font-mono break-all">{selectedLog.after}</code>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-4">
                <Fingerprint className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h5 className="text-sm font-black text-black">System Metadata</h5>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    This event was captured by the primary security gateway. 
                    The user agent was verified and the session token was valid at the time of execution. 
                    No concurrent sessions were detected for this identity.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 flex gap-4">
              <button
                onClick={() => setSelectedLog(null)}
                className="flex-1 px-6 py-4 bg-white hover:bg-gray-100 text-black rounded-2xl font-black uppercase tracking-widest transition-all border border-gray-200"
              >
                Close
              </button>
              <button
                className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
