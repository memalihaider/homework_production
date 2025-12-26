'use client'

import { useState, useMemo } from 'react'
import {
  Mail,
  Calendar,
  Clock,
  Send,
  Users,
  TrendingUp,
  Target,
  MessageSquare,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Zap
} from 'lucide-react'

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'campaigns' | 'emails' | 'analytics'>('leads')
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Sample leads data
  const leads = [
    {
      id: '1',
      name: 'Ahmed Al-Mazrouei',
      email: 'ahmed.mazrouei@email.com',
      phone: '+971 50 123 4567',
      company: 'Mazrouei Construction',
      status: 'hot',
      source: 'Website',
      lastContact: '2025-12-20',
      nextFollowUp: '2025-12-28',
      interest: 'Home Renovation',
      budget: 'AED 150,000 - 200,000',
      notes: 'Interested in kitchen renovation'
    },
    {
      id: '2',
      name: 'Fatima Al-Ketbi',
      email: 'fatima.ketbi@email.com',
      phone: '+971 50 234 5678',
      company: 'Ketbi Properties',
      status: 'warm',
      source: 'Social Media',
      lastContact: '2025-12-18',
      nextFollowUp: '2025-12-26',
      interest: 'Full Home Makeover',
      budget: 'AED 300,000 - 500,000',
      notes: 'Looking for luxury finishes'
    },
    {
      id: '3',
      name: 'Mohammed Bin Ali',
      email: 'mohammed.binali@email.com',
      phone: '+971 50 345 6789',
      company: 'Bin Ali Enterprises',
      status: 'cold',
      source: 'Referral',
      lastContact: '2025-12-15',
      nextFollowUp: '2025-12-30',
      interest: 'Office Renovation',
      budget: 'AED 75,000 - 100,000',
      notes: 'Needs commercial space renovation'
    },
    {
      id: '4',
      name: 'Sara Al-Noor',
      email: 'sara.alnoor@email.com',
      phone: '+971 50 456 7890',
      company: 'Al-Noor Design',
      status: 'hot',
      source: 'Direct Call',
      lastContact: '2025-12-22',
      nextFollowUp: '2025-12-25',
      interest: 'Interior Design Consultation',
      budget: 'AED 50,000 - 75,000',
      notes: 'Wants complete design package'
    },
    {
      id: '5',
      name: 'Hassan Al-Mazrouei',
      email: 'hassan.mazrouei@email.com',
      phone: '+971 50 567 8901',
      company: 'Mazrouei Group',
      status: 'warm',
      source: 'Email Campaign',
      lastContact: '2025-12-19',
      nextFollowUp: '2025-12-27',
      interest: 'Villa Construction',
      budget: 'AED 1,000,000 - 2,000,000',
      notes: 'Planning new villa construction'
    }
  ]

  // Sample campaigns data
  const campaigns = [
    {
      id: '1',
      name: 'Holiday Special 2025',
      type: 'Email',
      status: 'active',
      sent: 1250,
      opened: 387,
      clicked: 89,
      converted: 12,
      budget: 'AED 5,000',
      startDate: '2025-12-01',
      endDate: '2025-12-31'
    },
    {
      id: '2',
      name: 'New Year Promotion',
      type: 'SMS',
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      budget: 'AED 3,000',
      startDate: '2025-12-28',
      endDate: '2026-01-15'
    },
    {
      id: '3',
      name: 'Luxury Home Showcase',
      type: 'Email',
      status: 'completed',
      sent: 2100,
      opened: 672,
      clicked: 156,
      converted: 28,
      budget: 'AED 8,000',
      startDate: '2025-11-15',
      endDate: '2025-12-15'
    }
  ]

  // Sample scheduled emails
  const scheduledEmails = [
    {
      id: '1',
      subject: 'Follow-up: Kitchen Renovation Quote',
      recipient: 'ahmed.mazrouei@email.com',
      scheduledTime: '2025-12-28 10:00',
      status: 'scheduled',
      type: 'reminder'
    },
    {
      id: '2',
      subject: 'Holiday Special Offer - Limited Time',
      recipient: 'All Warm Leads',
      scheduledTime: '2025-12-25 09:00',
      status: 'scheduled',
      type: 'promotional'
    },
    {
      id: '3',
      subject: 'Thank You for Your Interest',
      recipient: 'fatima.ketbi@email.com',
      scheduledTime: '2025-12-26 14:00',
      status: 'sent',
      type: 'follow-up'
    }
  ]

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [leads, searchTerm, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800 border-red-300'
      case 'warm': return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'cold': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'paused': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-300">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-300">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Marketing Hub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Marketing Dashboard</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Lead management, email campaigns, and automated marketing workflows.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowNewCampaignModal(true)}
              className="group relative flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
              New Campaign
            </button>
            <button className="group relative flex items-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]">
              <Mail className="h-5 w-5" />
              Send Email
            </button>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-blue-100 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-emerald-100 blur-[100px]"></div>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-300">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-green-600 font-bold text-sm">+12.5%</span>
          </div>
          <h3 className="text-2xl font-black text-black mb-1">{leads.length}</h3>
          <p className="text-gray-600 font-medium">Total Leads</p>
          <p className="text-gray-500 text-sm mt-2">Active prospects</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-300">
              <Mail className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-green-600 font-bold text-sm">+8.2%</span>
          </div>
          <h3 className="text-2xl font-black text-black mb-1">{scheduledEmails.filter(e => e.status === 'sent').length}</h3>
          <p className="text-gray-600 font-medium">Emails Sent</p>
          <p className="text-gray-500 text-sm mt-2">This month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-300">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-green-600 font-bold text-sm">+15.7%</span>
          </div>
          <h3 className="text-2xl font-black text-black mb-1">{campaigns.filter(c => c.status === 'active').length}</h3>
          <p className="text-gray-600 font-medium">Active Campaigns</p>
          <p className="text-gray-500 text-sm mt-2">Running now</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-300">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-green-600 font-bold text-sm">+22.1%</span>
          </div>
          <h3 className="text-2xl font-black text-black mb-1">34.2%</h3>
          <p className="text-gray-600 font-medium">Conversion Rate</p>
          <p className="text-gray-500 text-sm mt-2">Lead to customer</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white border border-gray-300 rounded-2xl p-1 w-fit shadow-lg">
        {[
          { id: 'leads', label: 'Lead Management', icon: Users },
          { id: 'campaigns', label: 'Campaigns', icon: Target },
          { id: 'emails', label: 'Email Scheduler', icon: Mail },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leads Management */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-300 flex flex-col md:flex-row items-center gap-6 shadow-lg">
            <div className="flex items-center gap-4 flex-1">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
                <Search className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Search Leads</p>
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-black font-black text-lg focus:outline-none w-full placeholder:text-gray-500"
                />
              </div>
            </div>
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
                <Filter className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Filter by Status</p>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-transparent text-black font-black text-sm focus:outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="hot">Hot Leads</option>
                  <option value="warm">Warm Leads</option>
                  <option value="cold">Cold Leads</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Schedule Reminder
            </button>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-[32px] border border-gray-300 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLeads(filteredLeads.map(lead => lead.id))
                          } else {
                            setSelectedLeads([])
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Lead</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Interest</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Budget</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Next Follow-up</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLeads([...selectedLeads, lead.id])
                            } else {
                              setSelectedLeads(selectedLeads.filter(id => id !== lead.id))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center text-black font-black text-xs">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-black text-black text-sm group-hover:text-blue-600 transition-colors">{lead.name}</p>
                            <p className="text-gray-600 text-xs">{lead.email}</p>
                            <p className="text-gray-500 text-xs">{lead.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-black">{lead.interest}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-black">{lead.budget}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-black">{lead.nextFollowUp}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white p-8 rounded-[32px] border border-gray-300 group hover:border-blue-500/30 transition-all shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-black">{campaign.name}</h3>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">{campaign.type} Campaign</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getCampaignStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Sent</p>
                  <p className="text-2xl font-black text-black">{campaign.sent.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Opened</p>
                  <p className="text-2xl font-black text-black">{campaign.opened.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">
                    {((campaign.opened / campaign.sent) * 100).toFixed(1)}% rate
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Clicked</p>
                  <p className="text-2xl font-black text-black">{campaign.clicked.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">
                    {((campaign.clicked / campaign.sent) * 100).toFixed(1)}% rate
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Converted</p>
                  <p className="text-2xl font-black text-black">{campaign.converted.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mt-1">
                    {((campaign.converted / campaign.sent) * 100).toFixed(1)}% rate
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget: {campaign.budget}</p>
                  <p className="text-sm font-medium text-gray-600">{campaign.startDate} - {campaign.endDate}</p>
                </div>
                <div className="flex gap-2">
                  {campaign.status === 'active' && (
                    <button className="p-3 hover:bg-amber-50 rounded-xl transition-colors">
                      <Pause className="h-5 w-5 text-amber-600" />
                    </button>
                  )}
                  {campaign.status === 'scheduled' && (
                    <button className="p-3 hover:bg-green-50 rounded-xl transition-colors">
                      <Play className="h-5 w-5 text-green-600" />
                    </button>
                  )}
                  <button className="p-3 hover:bg-blue-50 rounded-xl transition-colors">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Email Scheduler */}
      {activeTab === 'emails' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-black">Email Scheduler</h2>
                <p className="text-gray-600 font-medium">Schedule automated emails and reminders</p>
              </div>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Plus className="h-4 w-4 inline mr-2" />
                Schedule Email
              </button>
            </div>

            <div className="space-y-4">
              {scheduledEmails.map((email) => (
                <div key={email.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-300">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-black">{email.subject}</h4>
                      <p className="text-gray-600 text-sm">To: {email.recipient}</p>
                      <p className="text-gray-500 text-xs">Scheduled: {email.scheduledTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      email.status === 'sent' ? 'bg-emerald-100 text-emerald-800' :
                      email.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {email.status}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      email.type === 'reminder' ? 'bg-amber-100 text-amber-800' :
                      email.type === 'promotional' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {email.type}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-gray-300 shadow-lg">
            <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Campaign Performance
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-black text-emerald-800">Open Rate</p>
                    <p className="text-sm text-emerald-700">Average across campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-800">24.7%</p>
                  <p className="text-sm text-emerald-600">+5.2% from last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-black text-blue-800">Click Rate</p>
                    <p className="text-sm text-blue-700">Engagement metric</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-blue-800">8.3%</p>
                  <p className="text-sm text-blue-600">+2.1% from last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-black text-purple-800">Conversion Rate</p>
                    <p className="text-sm text-purple-700">Lead to customer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-purple-800">2.8%</p>
                  <p className="text-sm text-purple-600">+0.8% from last month</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-300 shadow-lg">
            <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
              <PieChart className="h-6 w-6 text-emerald-600" />
              Lead Sources
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-black text-blue-600">W</span>
                  </div>
                  <span className="font-medium text-black">Website</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="font-black text-black w-12 text-right">45%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <span className="text-xs font-black text-emerald-600">S</span>
                  </div>
                  <span className="font-medium text-black">Social Media</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  <span className="font-black text-black w-12 text-right">25%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <span className="text-xs font-black text-purple-600">R</span>
                  </div>
                  <span className="font-medium text-black">Referral</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <span className="font-black text-black w-12 text-right">20%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                    <span className="text-xs font-black text-amber-600">E</span>
                  </div>
                  <span className="font-medium text-black">Email Campaign</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{width: '10%'}}></div>
                  </div>
                  <span className="font-black text-black w-12 text-right">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Reminder Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-black text-black mb-6">Schedule Reminder Email</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Recipients</label>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">{selectedLeads.length} lead(s) selected</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Subject</label>
                <input
                  type="text"
                  placeholder="Enter email subject..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all">
                  Schedule Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full mx-4">
            <h3 className="text-2xl font-black text-black mb-6">Create New Campaign</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="Enter campaign name..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Type</label>
                <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Email Campaign</option>
                  <option>SMS Campaign</option>
                  <option>Social Media Campaign</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
                <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Leads</option>
                  <option>Hot Leads Only</option>
                  <option>Warm Leads Only</option>
                  <option>Custom Segment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget (AED)</label>
                <input
                  type="number"
                  placeholder="Enter budget..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowNewCampaignModal(false)}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all">
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}