'use client'

import { useState, useMemo, useCallback } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Copy, 
  X, 
  Search, 
  Shield, 
  Users, 
  Lock, 
  Zap, 
  ChevronDown, 
  Check,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  ArrowUpRight,
  Activity,
  MoreHorizontal,
  ChevronRight,
  Building2,
  Clock
} from 'lucide-react'

export default function RoleManager() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState<number | null>(null)
  const [showCloneModal, setShowCloneModal] = useState<number | null>(null)
  const [newRole, setNewRole] = useState({ name: '', description: '', level: 'user' })
  
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', description: 'Full system access with all permissions', level: 'super', createdDate: '2025-01-01', usersCount: 1, status: 'Active', color: 'rose' },
    { id: 2, name: 'Admin', description: 'Administrative access with limited super-admin features', level: 'admin', createdDate: '2025-01-05', usersCount: 3, status: 'Active', color: 'orange' },
    { id: 3, name: 'Manager', description: 'Team and project management capabilities', level: 'manager', createdDate: '2025-01-10', usersCount: 8, status: 'Active', color: 'blue' },
    { id: 4, name: 'Supervisor', description: 'Oversee team activities and reports', level: 'supervisor', createdDate: '2025-01-15', usersCount: 12, status: 'Active', color: 'emerald' },
    { id: 5, name: 'User', description: 'Standard user with basic access', level: 'user', createdDate: '2025-01-20', usersCount: 45, status: 'Active', color: 'slate' },
    { id: 6, name: 'Guest', description: 'Read-only access to specific modules', level: 'guest', createdDate: '2025-01-25', usersCount: 5, status: 'Active', color: 'slate' },
  ])

  const filteredRoles = useMemo(() => {
    return roles.filter(role => 
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, roles])

  const handleAddRole = useCallback(() => {
    if (newRole.name && newRole.description) {
      if (editingRole) {
        setRoles(roles.map(r => r.id === editingRole ? { ...r, name: newRole.name, description: newRole.description, level: newRole.level } : r))
        setEditingRole(null)
      } else {
        const role = {
          id: Math.max(...roles.map(r => r.id), 0) + 1,
          name: newRole.name,
          description: newRole.description,
          level: newRole.level,
          createdDate: new Date().toISOString().split('T')[0],
          usersCount: 0,
          status: 'Active',
          color: 'indigo'
        }
        setRoles([...roles, role])
      }
      setNewRole({ name: '', description: '', level: 'user' })
      setShowForm(false)
    }
  }, [newRole, editingRole, roles])

  const handleEditRole = useCallback((id: number) => {
    const role = roles.find(r => r.id === id)
    if (role) {
      setNewRole({ name: role.name, description: role.description, level: role.level })
      setEditingRole(id)
      setShowForm(true)
    }
  }, [roles])

  const handleCloneRole = useCallback((id: number) => {
    const role = roles.find(r => r.id === id)
    if (role) {
      const newId = Math.max(...roles.map(r => r.id), 0) + 1
      const { id: _oldId, ...roleData } = role
      const clonedRole = {
        id: newId,
        ...roleData,
        name: `${role.name} (Clone)`,
        usersCount: 0,
        createdDate: new Date().toISOString().split('T')[0]
      }
      setRoles([...roles, clonedRole])
      setShowCloneModal(null)
    }
  }, [roles])

  const handleDeleteRole = useCallback((id: number) => {
    if (id > 5) { // Prevent deleting system roles
      if (confirm('Are you sure you want to delete this custom role?')) {
        setRoles(roles.filter(r => r.id !== id))
      }
    }
  }, [roles])

  return (
    <div className="space-y-8 pb-10 bg-white text-black">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-200">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Role Governance</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Role Manager</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Define operational boundaries and permission sets for system identities.
            </p>
          </div>
          <button 
            onClick={() => { setShowForm(true); setEditingRole(null); setNewRole({ name: '', description: '', level: 'user' }) }}
            className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="h-5 w-5" />
            Create New Role
          </button>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-blue-50 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-indigo-50 blur-[100px]"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Roles', value: roles.length, color: 'blue', icon: Shield },
          { label: 'Active Users', value: roles.reduce((sum, r) => sum + r.usersCount, 0), color: 'emerald', icon: Users },
          { label: 'Custom Roles', value: roles.filter(r => r.id > 5).length, color: 'amber', icon: Zap },
          { label: 'System Roles', value: roles.filter(r => r.id <= 5).length, color: 'purple', icon: Lock }
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

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        <input 
          type="text" 
          placeholder="Search roles by name or description..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none text-black placeholder:text-gray-500 transition-all"
        />
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="group relative bg-white border border-gray-200 rounded-[32px] p-8 hover:bg-gray-50 transition-all overflow-hidden shadow-sm">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-2xl bg-${role.color}-100 flex items-center justify-center border border-${role.color}-200 text-${role.color}-600`}>
                    <Shield className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-black group-hover:text-blue-600 transition-colors">{role.name}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-${role.color}-100 text-${role.color}-600 border border-${role.color}-200 mt-1`}>
                      {role.level} level
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditRole(role.id)}
                    className="p-2.5 bg-gray-100 hover:bg-blue-100 border border-gray-200 rounded-xl transition-all text-gray-500 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setShowCloneModal(role.id)}
                    className="p-2.5 bg-gray-100 hover:bg-indigo-100 border border-gray-200 rounded-xl transition-all text-gray-500 hover:text-indigo-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {role.id > 5 && (
                    <button 
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-2.5 bg-gray-100 hover:bg-red-100 border border-gray-200 rounded-xl transition-all text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-8">
                {role.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Assigned Users</span>
                    <span className="text-lg font-black text-black flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      {role.usersCount}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Created On</span>
                    <span className="text-lg font-black text-black flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {role.createdDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-600">
                  <Activity className="h-3 w-3" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{role.status}</span>
                </div>
              </div>
            </div>

            {/* Clone Confirmation Overlay */}
            {showCloneModal === role.id && (
              <div className="absolute inset-0 z-20 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <Copy className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="text-xl font-black text-black mb-2">Clone Role?</h4>
                <p className="text-gray-600 text-sm mb-6">This will create a duplicate of <span className="text-indigo-600 font-bold">{role.name}</span> with all its permission sets.</p>
                <div className="flex gap-4 w-full max-w-xs">
                  <button 
                    onClick={() => setShowCloneModal(null)}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 rounded-xl font-black uppercase tracking-widest text-xs transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleCloneRole(role.id)}
                    className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Role Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-black text-black">{editingRole ? 'Edit Role Definition' : 'Create New Role'}</h2>
                <p className="text-gray-600 text-sm font-medium mt-1">Define access levels and operational scope.</p>
              </div>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Role Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Regional Manager"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Level</label>
                  <select 
                    value={newRole.level} 
                    onChange={(e) => setNewRole({...newRole, level: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  >
                    <option value="super" className="bg-white text-black">Super Admin</option>
                    <option value="admin" className="bg-white text-black">Admin</option>
                    <option value="manager" className="bg-white text-black">Manager</option>
                    <option value="supervisor" className="bg-white text-black">Supervisor</option>
                    <option value="user" className="bg-white text-black">User</option>
                    <option value="guest" className="bg-white text-black">Guest</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    placeholder="Describe the responsibilities and access scope of this role..."
                    value={newRole.description}
                    onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all h-32 resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-200 flex gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-4 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-2xl font-black uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 border border-blue-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
              >
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Info */}
      <div className="bg-white border border-gray-200 rounded-[32px] p-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center border border-blue-200 shrink-0">
          <ShieldCheck className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-black text-black">Role-Based Access Control (RBAC)</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            System roles are the foundation of our security architecture. 
            Modifying system-level roles (Super Admin to Supervisor) is restricted to prevent accidental lockout. 
            Custom roles can be created to match specific organizational structures. 
            All role modifications are logged and require administrative approval in production environments.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> Immutable System Roles
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
              <Fingerprint className="h-4 w-4" /> Multi-Factor Enforced
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
