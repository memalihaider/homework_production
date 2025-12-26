'use client'

import { useState, useMemo, useCallback } from 'react'
import { 
  Lock, 
  Unlock, 
  AlertCircle, 
  Clock, 
  Search, 
  Shield, 
  Eye, 
  Pencil, 
  Trash2, 
  Plus,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  ArrowUpRight,
  ChevronRight,
  X,
  Info,
  Activity,
  Zap
} from 'lucide-react'

export default function PermissionMatrix() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('Admin')
  const [showTempAccessForm, setShowTempAccessForm] = useState<string | null>(null)
  const [tempAccessDays, setTempAccessDays] = useState(7)
  
  const roles = ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'User', 'Guest']
  
  const permissions = [
    { resource: 'Users', action: 'View', risk: 'low', description: 'View user profiles and details' },
    { resource: 'Users', action: 'Create', risk: 'medium', description: 'Create new user accounts' },
    { resource: 'Users', action: 'Edit', risk: 'medium', description: 'Edit user information' },
    { resource: 'Users', action: 'Delete', risk: 'critical', description: 'Delete user accounts' },
    { resource: 'Roles', action: 'View', risk: 'low', description: 'View available roles' },
    { resource: 'Roles', action: 'Create', risk: 'high', description: 'Create new roles' },
    { resource: 'Roles', action: 'Edit', risk: 'high', description: 'Edit role configurations' },
    { resource: 'Roles', action: 'Delete', risk: 'critical', description: 'Delete roles' },
    { resource: 'Finance', action: 'View', risk: 'low', description: 'View financial reports' },
    { resource: 'Finance', action: 'Export', risk: 'medium', description: 'Export financial data' },
    { resource: 'Finance', action: 'Approve', risk: 'high', description: 'Approve invoices and payments' },
    { resource: 'Jobs', action: 'View', risk: 'low', description: 'View job details' },
    { resource: 'Jobs', action: 'Assign', risk: 'medium', description: 'Assign jobs to teams' },
    { resource: 'Jobs', action: 'Complete', risk: 'medium', description: 'Mark jobs as complete' },
    { resource: 'HR', action: 'View', risk: 'low', description: 'View HR information' },
    { resource: 'HR', action: 'Manage', risk: 'high', description: 'Manage payroll and attendance' },
    { resource: 'System', action: 'Configure', risk: 'critical', description: 'System settings and configuration' },
    { resource: 'Audit', action: 'View', risk: 'low', description: 'View audit logs' },
    { resource: 'Audit', action: 'Export', risk: 'high', description: 'Export audit logs' },
  ]

  const [matrix, setMatrix] = useState<Record<string, Record<string, { granted: boolean; tempUntil?: string }>>>({
    'Super Admin': Object.fromEntries(permissions.map(p => [`${p.resource}:${p.action}`, { granted: true }])),
    'Admin': Object.fromEntries(permissions.map(p => [`${p.resource}:${p.action}`, { granted: p.risk !== 'critical' }])),
    'Manager': Object.fromEntries(permissions.map(p => [`${p.resource}:${p.action}`, { granted: p.risk === 'low' || (p.resource === 'Jobs') }])),
    'Supervisor': Object.fromEntries(permissions.map(p => [`${p.resource}:${p.action}`, { granted: p.risk === 'low' }])),
    'User': Object.fromEntries(permissions.map(p => [`${p.resource}:${p.action}`, { granted: p.risk === 'low' && p.action === 'View' }])),
    'Guest': Object.fromEntries(permissions.map(p => [`${p.resource}:${p.action}`, { granted: false }])),
  })

  const riskConfig: Record<string, { color: string, icon: any }> = {
    critical: { color: 'rose', icon: ShieldAlert },
    high: { color: 'orange', icon: AlertCircle },
    medium: { color: 'amber', icon: Info },
    low: { color: 'emerald', icon: ShieldCheck }
  }

  const togglePermission = useCallback((role: string, permission: string) => {
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: { granted: !prev[role]?.[permission]?.granted }
      }
    }))
  }, [])

  const toggleTempAccess = useCallback((role: string, permission: string) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + tempAccessDays)
    
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: {
          ...prev[role]?.[permission],
          granted: true,
          tempUntil: expiryDate.toISOString().split('T')[0]
        }
      }
    }))
    setShowTempAccessForm(null)
  }, [tempAccessDays])

  const filteredPermissions = useMemo(() => permissions.filter(p => 
    p.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.action.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm])

  const grantedCount = (role: string) => 
    Object.values(matrix[role] || {}).filter(p => p.granted).length

  const criticalCount = (role: string) =>
    permissions.filter(p => p.risk === 'critical' && matrix[role]?.[`${p.resource}:${p.action}`]?.granted).length

  return (
    <div className="space-y-8 pb-10 bg-white text-black">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center border border-indigo-200">
                <Fingerprint className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Access Control</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Permission Matrix</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Configure granular access rights and temporary elevation protocols.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-gray-100 rounded-2xl border border-gray-200">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Active Role</p>
              <p className="text-xl font-black text-black">{selectedRole}</p>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-indigo-50 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-blue-50 blur-[100px]"></div>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-2 bg-white rounded-[24px] border border-gray-200 shadow-sm">
        {roles.map(role => (
          <button 
            key={role} 
            onClick={() => setSelectedRole(role)} 
            className={`flex-1 min-w-[120px] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              selectedRole === role 
                ? 'bg-indigo-600 text-white shadow-lg scale-[1.02]' 
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            {role}
            <span className={`px-2 py-0.5 rounded-md text-[10px] ${selectedRole === role ? 'bg-white/20' : 'bg-gray-200'}`}>
              {grantedCount(role)}
            </span>
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Granted', value: grantedCount(selectedRole), color: 'indigo', icon: ShieldCheck },
          { label: 'Low Risk', value: permissions.filter(p => p.risk === 'low' && matrix[selectedRole]?.[`${p.resource}:${p.action}`]?.granted).length, color: 'emerald', icon: ShieldCheck },
          { label: 'High Risk', value: permissions.filter(p => (p.risk === 'high' || p.risk === 'medium') && matrix[selectedRole]?.[`${p.resource}:${p.action}`]?.granted).length, color: 'orange', icon: AlertCircle },
          { label: 'Critical', value: criticalCount(selectedRole), color: 'rose', icon: ShieldAlert }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <Activity className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
        <input 
          type="text" 
          placeholder="Search permissions by resource or action..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 outline-none text-black placeholder:text-gray-500 transition-all"
        />
      </div>

      {/* Permissions Table */}
      <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Resource & Action</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Risk Level</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Temp Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPermissions.map((perm, idx) => {
                const permissionKey = `${perm.resource}:${perm.action}`
                const isGranted = matrix[selectedRole]?.[permissionKey]?.granted || false
                const tempUntil = matrix[selectedRole]?.[permissionKey]?.tempUntil
                const risk = riskConfig[perm.risk]
                
                return (
                  <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl bg-${risk.color}-100 flex items-center justify-center border border-${risk.color}-200 text-${risk.color}-600`}>
                          {/* Fallback if icon not found, but using resource name as text for now */}
                          <span className="text-[10px] font-black">{perm.resource.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-black font-black group-hover:text-indigo-600 transition-colors">{perm.resource}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{perm.action}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-gray-600 font-medium max-w-xs">{perm.description}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-${risk.color}-100 text-${risk.color}-600 border border-${risk.color}-200`}>
                        <risk.icon className="h-3 w-3" />
                        {perm.risk}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button 
                        onClick={() => togglePermission(selectedRole, permissionKey)}
                        className={`p-3 rounded-xl transition-all border ${
                          isGranted 
                            ? 'bg-emerald-100 border-emerald-200 text-emerald-600 shadow-lg' 
                            : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {isGranted ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {isGranted && (
                        <div className="flex justify-end">
                          {tempUntil ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-200 rounded-xl text-amber-600">
                              <Clock className="h-4 w-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Until {tempUntil}</span>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setShowTempAccessForm(permissionKey)}
                              className="p-2.5 bg-gray-100 hover:bg-indigo-100 border border-gray-200 rounded-xl transition-all text-gray-500 hover:text-indigo-600 group/btn"
                            >
                              <Zap className="h-4 w-4 group-hover/btn:fill-indigo-600" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Temp Access Modal */}
      {showTempAccessForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-200">
                <Zap className="h-10 w-10 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black text-black mb-2">Elevate Access</h2>
              <p className="text-gray-600 font-medium">Grant temporary permission for the <span className="text-indigo-600 font-bold">{showTempAccessForm}</span> action.</p>
            </div>
            <div className="px-8 pb-8 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Duration (Days)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="90" 
                  value={tempAccessDays} 
                  onChange={(e) => setTempAccessDays(parseInt(e.target.value))} 
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all" 
                />
              </div>
            </div>
            <div className="p-8 bg-gray-50 flex gap-4">
              <button
                onClick={() => setShowTempAccessForm(null)}
                className="flex-1 px-6 py-4 bg-white hover:bg-gray-100 text-black rounded-2xl font-black uppercase tracking-widest transition-all border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => toggleTempAccess(selectedRole, showTempAccessForm)}
                className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg"
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Protocol Info */}
      <div className="bg-white border border-gray-200 rounded-[32px] p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
        <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center border border-indigo-200 shrink-0">
          <Shield className="h-7 w-7 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-black text-black">Permission Governance</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            The permission matrix defines the operational boundaries for each system role. 
            Critical permissions (marked in rose) require multi-factor authentication and are restricted to Super Admin accounts by default. 
            Temporary access grants are cryptographically signed and automatically revoked by the system scheduler upon expiry.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Real-time Enforcement
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              <Activity className="h-4 w-4" /> Audit Logged
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
