'use client'

import { useState, useMemo, useEffect } from 'react'
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
  Zap,
  X,
  Save,
  Bell,
  Phone,
  Video
} from 'lucide-react'

// Types
type Lead = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'hot' | 'warm' | 'cold'
  source: string
  lastContact: string
  nextFollowUp: string
  interest: string
  budget: string
  notes: string
  followUpHistory: FollowUpMessage[]
}

type Campaign = {
  id: string
  name: string
  type: string
  status: 'active' | 'scheduled' | 'completed' | 'paused'
  sent: number
  opened: number
  clicked: number
  converted: number
  budget: string
  startDate: string
  endDate: string
  targetAudience: string
  description: string
}

type ScheduledEmail = {
  id: string
  subject: string
  recipient: string
  recipientEmail: string
  scheduledTime: string
  status: 'scheduled' | 'sent' | 'failed'
  type: 'reminder' | 'promotional' | 'follow-up'
  message: string
}

type FollowUpMessage = {
  id: string
  date: string
  type: 'email' | 'phone' | 'meeting' | 'sms'
  subject: string
  message: string
  status: 'completed' | 'scheduled' | 'pending'
  sentBy: string
}

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'campaigns' | 'emails' | 'analytics' | 'followup'>('leads')
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [showEditLeadModal, setShowEditLeadModal] = useState(false)
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [showFollowUpModal, setShowFollowUpModal] = useState(false)
  const [showViewLeadModal, setShowViewLeadModal] = useState(false)
  const [showEditCampaignModal, setShowEditCampaignModal] = useState(false)
  const [showNewEmailModal, setShowNewEmailModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentLead, setCurrentLead] = useState<Lead | null>(null)
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null)
  const [currentEmail, setCurrentEmail] = useState<ScheduledEmail | null>(null)

  // State management for leads, campaigns, and emails
  const [leads, setLeads] = useState<Lead[]>([
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
      notes: 'Interested in kitchen renovation',
      followUpHistory: [
        {
          id: 'f1',
          date: '2025-12-20',
          type: 'email',
          subject: 'Initial contact',
          message: 'Sent initial quote for kitchen renovation',
          status: 'completed',
          sentBy: 'Admin User'
        }
      ]
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
      notes: 'Looking for luxury finishes',
      followUpHistory: [
        {
          id: 'f2',
          date: '2025-12-18',
          type: 'phone',
          subject: 'Discovery call',
          message: 'Discussed project requirements and timeline',
          status: 'completed',
          sentBy: 'Admin User'
        }
      ]
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
      notes: 'Needs commercial space renovation',
      followUpHistory: []
    }
  ])

  const [campaigns, setCampaigns] = useState<Campaign[]>([
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
      endDate: '2025-12-31',
      targetAudience: 'All Leads',
      description: 'Year-end promotional campaign offering 20% discount on all services'
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
      endDate: '2026-01-15',
      targetAudience: 'Hot Leads',
      description: 'New year campaign targeting high-value prospects'
    }
  ])

  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([
    {
      id: '1',
      subject: 'Follow-up: Kitchen Renovation Quote',
      recipient: 'Ahmed Al-Mazrouei',
      recipientEmail: 'ahmed.mazrouei@email.com',
      scheduledTime: '2025-12-28T10:00',
      status: 'scheduled',
      type: 'reminder',
      message: 'Hi Ahmed, Following up on our kitchen renovation quote. Would you like to schedule a consultation?'
    },
    {
      id: '2',
      subject: 'Holiday Special Offer - Limited Time',
      recipient: 'All Warm Leads',
      recipientEmail: 'warm-leads@group',
      scheduledTime: '2025-12-25T09:00',
      status: 'scheduled',
      type: 'promotional',
      message: 'Don\'t miss our holiday special! Get 20% off on all renovation projects.'
    }
  ])

  // Form states
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'cold' as 'hot' | 'warm' | 'cold',
    source: '',
    interest: '',
    budget: '',
    notes: '',
    nextFollowUp: ''
  })

  const [campaignForm, setCampaignForm] = useState({
    name: '',
    type: 'Email',
    targetAudience: 'All Leads',
    budget: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const [emailForm, setEmailForm] = useState({
    subject: '',
    recipient: '',
    recipientEmail: '',
    scheduledTime: '',
    type: 'follow-up' as 'reminder' | 'promotional' | 'follow-up',
    message: ''
  })

  const [followUpForm, setFollowUpForm] = useState({
    type: 'email' as 'email' | 'phone' | 'meeting' | 'sms',
    subject: '',
    message: '',
    scheduledDate: ''
  })

  // CRUD Operations for Leads
  const handleAddLead = () => {
    const newLead: Lead = {
      id: Date.now().toString(),
      ...leadForm,
      lastContact: new Date().toISOString().split('T')[0],
      followUpHistory: []
    }
    setLeads([...leads, newLead])
    setShowNewLeadModal(false)
    resetLeadForm()
  }

  const handleUpdateLead = () => {
    if (!currentLead) return
    setLeads(leads.map(lead => lead.id === currentLead.id ? { ...currentLead, ...leadForm } : lead))
    setShowEditLeadModal(false)
    setCurrentLead(null)
    resetLeadForm()
  }

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id))
    }
  }

  const handleViewLead = (lead: Lead) => {
    setCurrentLead(lead)
    setShowViewLeadModal(true)
  }

  const handleEditLead = (lead: Lead) => {
    setCurrentLead(lead)
    setLeadForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      status: lead.status,
      source: lead.source,
      interest: lead.interest,
      budget: lead.budget,
      notes: lead.notes,
      nextFollowUp: lead.nextFollowUp
    })
    setShowEditLeadModal(true)
  }

  const resetLeadForm = () => {
    setLeadForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'cold',
      source: '',
      interest: '',
      budget: '',
      notes: '',
      nextFollowUp: ''
    })
  }

  // CRUD Operations for Campaigns
  const handleAddCampaign = () => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      ...campaignForm,
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0
    }
    setCampaigns([...campaigns, newCampaign])
    setShowNewCampaignModal(false)
    resetCampaignForm()
  }

  const handleUpdateCampaign = () => {
    if (!currentCampaign) return
    setCampaigns(campaigns.map(campaign => 
      campaign.id === currentCampaign.id ? { ...campaign, ...campaignForm } : campaign
    ))
    setShowEditCampaignModal(false)
    setCurrentCampaign(null)
    resetCampaignForm()
  }

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id))
    }
  }

  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'paused' : campaign.status === 'paused' ? 'active' : 'active'
        }
      }
      return campaign
    }))
  }

  const resetCampaignForm = () => {
    setCampaignForm({
      name: '',
      type: 'Email',
      targetAudience: 'All Leads',
      budget: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }

  // CRUD Operations for Scheduled Emails
  const handleAddEmail = () => {
    const newEmail: ScheduledEmail = {
      id: Date.now().toString(),
      ...emailForm,
      status: 'scheduled'
    }
    setScheduledEmails([...scheduledEmails, newEmail])
    setShowNewEmailModal(false)
    resetEmailForm()
  }

  const handleDeleteEmail = (id: string) => {
    if (confirm('Are you sure you want to delete this scheduled email?')) {
      setScheduledEmails(scheduledEmails.filter(email => email.id !== id))
    }
  }

  const handleSendEmailNow = (id: string) => {
    setScheduledEmails(scheduledEmails.map(email => 
      email.id === id ? { ...email, status: 'sent' as 'sent' } : email
    ))
  }

  const resetEmailForm = () => {
    setEmailForm({
      subject: '',
      recipient: '',
      recipientEmail: '',
      scheduledTime: '',
      type: 'follow-up',
      message: ''
    })
  }

  // Follow-up System
  const handleAddFollowUp = () => {
    if (!currentLead) return
    
    const newFollowUp: FollowUpMessage = {
      id: Date.now().toString(),
      date: followUpForm.scheduledDate || new Date().toISOString().split('T')[0],
      type: followUpForm.type,
      subject: followUpForm.subject,
      message: followUpForm.message,
      status: followUpForm.scheduledDate ? 'scheduled' : 'completed',
      sentBy: 'Admin User'
    }

    setLeads(leads.map(lead => {
      if (lead.id === currentLead.id) {
        return {
          ...lead,
          followUpHistory: [...lead.followUpHistory, newFollowUp],
          lastContact: !followUpForm.scheduledDate ? new Date().toISOString().split('T')[0] : lead.lastContact
        }
      }
      return lead
    }))

    setShowFollowUpModal(false)
    resetFollowUpForm()
  }

  const resetFollowUpForm = () => {
    setFollowUpForm({
      type: 'email',
      subject: '',
      message: '',
      scheduledDate: ''
    })
  }

  // Auto-update lead status based on follow-up frequency (real-time simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      
      // Update scheduled emails to sent if time has passed
      setScheduledEmails(prev => prev.map(email => {
        const schedTime = new Date(email.scheduledTime)
        if (email.status === 'scheduled' && schedTime <= now) {
          return { ...email, status: 'sent' as 'sent' }
        }
        return email
      }))

      // Update campaign metrics (simulate real-time updates)
      setCampaigns(prev => prev.map(campaign => {
        if (campaign.status === 'active') {
          return {
            ...campaign,
            sent: campaign.sent + Math.floor(Math.random() * 5),
            opened: campaign.opened + Math.floor(Math.random() * 2),
            clicked: campaign.clicked + Math.floor(Math.random() * 1)
          }
        }
        return campaign
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const sampleLeads = []

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
            <button
              onClick={() => setShowNewLeadModal(true)}
              className="group relative flex items-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
              Add Lead
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
      <div className="flex bg-white border border-gray-300 rounded-2xl p-1 w-fit shadow-lg overflow-x-auto">
        {[
          { id: 'leads', label: 'Lead Management', icon: Users },
          { id: 'campaigns', label: 'Campaigns', icon: Target },
          { id: 'emails', label: 'Email Scheduler', icon: Mail },
          { id: 'followup', label: 'Follow-up System', icon: MessageSquare },
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
              onClick={() => {
                if (selectedLeads.length === 0) {
                  alert('Please select at least one lead')
                  return
                }
                setShowNewEmailModal(true)
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Send Email to Selected
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
                          <button 
                            onClick={() => handleViewLead(lead)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleEditLead(lead)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Lead"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentLead(lead)
                              setShowFollowUpModal(true)
                            }}
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            title="Add Follow-up"
                          >
                            <MessageSquare className="h-4 w-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
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
                    <button 
                      onClick={() => handleToggleCampaignStatus(campaign.id)}
                      className="p-3 hover:bg-amber-50 rounded-xl transition-colors"
                      title="Pause Campaign"
                    >
                      <Pause className="h-5 w-5 text-amber-600" />
                    </button>
                  )}
                  {(campaign.status === 'scheduled' || campaign.status === 'paused') && (
                    <button 
                      onClick={() => handleToggleCampaignStatus(campaign.id)}
                      className="p-3 hover:bg-green-50 rounded-xl transition-colors"
                      title="Start Campaign"
                    >
                      <Play className="h-5 w-5 text-green-600" />
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setCurrentCampaign(campaign)
                      setCampaignForm({
                        name: campaign.name,
                        type: campaign.type,
                        targetAudience: campaign.targetAudience,
                        budget: campaign.budget,
                        startDate: campaign.startDate,
                        endDate: campaign.endDate,
                        description: campaign.description
                      })
                      setShowEditCampaignModal(true)
                    }}
                    className="p-3 hover:bg-blue-50 rounded-xl transition-colors"
                    title="Edit Campaign"
                  >
                    <Settings className="h-5 w-5 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Campaign"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
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
              <button 
                onClick={() => {
                  resetEmailForm()
                  setShowNewEmailModal(true)
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
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
                      <button 
                        onClick={() => {
                          setCurrentEmail(email)
                          setEmailForm({
                            subject: email.subject,
                            recipient: email.recipient,
                            recipientEmail: email.recipientEmail,
                            scheduledTime: email.scheduledTime,
                            type: email.type,
                            message: email.message
                          })
                          setShowNewEmailModal(true)
                        }}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Edit Email"
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      {email.status === 'scheduled' && (
                        <button 
                          onClick={() => handleSendEmailNow(email.id)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Send Now"
                        >
                          <Send className="h-4 w-4 text-green-600" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteEmail(email.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Email"
                      >
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

      {/* Follow-up System */}
      {activeTab === 'followup' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-black">Follow-up Communication System</h2>
                <p className="text-gray-600 font-medium">Track and manage all follow-up communications with leads</p>
              </div>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="p-6 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-black font-black text-sm">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-black text-black">{lead.name}</h4>
                        <p className="text-gray-600 text-sm">{lead.email} • {lead.phone}</p>
                        <p className="text-gray-500 text-xs">Last Contact: {lead.lastContact} • Next: {lead.nextFollowUp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <button
                        onClick={() => {
                          setCurrentLead(lead)
                          setShowFollowUpModal(true)
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all"
                      >
                        <Plus className="h-4 w-4 inline mr-1" />
                        Add Follow-up
                      </button>
                    </div>
                  </div>

                  {lead.followUpHistory.length > 0 && (
                    <div className="p-6 space-y-3">
                      <h5 className="text-sm font-black text-gray-600 uppercase tracking-widest mb-3">Follow-up History</h5>
                      {lead.followUpHistory.map((followUp) => (
                        <div key={followUp.id} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            {followUp.type === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                            {followUp.type === 'phone' && <Phone className="h-5 w-5 text-green-600" />}
                            {followUp.type === 'meeting' && <Video className="h-5 w-5 text-purple-600" />}
                            {followUp.type === 'sms' && <MessageSquare className="h-5 w-5 text-amber-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h6 className="font-black text-black text-sm">{followUp.subject}</h6>
                              <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                followUp.status === 'completed' ? 'bg-green-100 text-green-800' :
                                followUp.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {followUp.status}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{followUp.message}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{followUp.date}</span>
                              <span>•</span>
                              <span className="capitalize">{followUp.type}</span>
                              <span>•</span>
                              <span>By {followUp.sentBy}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {lead.followUpHistory.length === 0 && (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 text-sm">No follow-up history yet. Click "Add Follow-up" to start tracking communications.</p>
                    </div>
                  )}
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

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">Add New Lead</h3>
              <button onClick={() => setShowNewLeadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                    placeholder="Enter full name..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                    placeholder="email@example.com"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                    placeholder="+971 50 xxx xxxx"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                    placeholder="Company name"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lead Status *</label>
                  <select
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({...leadForm, status: e.target.value as 'hot' | 'warm' | 'cold'})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cold">Cold Lead</option>
                    <option value="warm">Warm Lead</option>
                    <option value="hot">Hot Lead</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lead Source</label>
                  <input
                    type="text"
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({...leadForm, source: e.target.value})}
                    placeholder="e.g., Website, Referral"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Interest/Service</label>
                  <input
                    type="text"
                    value={leadForm.interest}
                    onChange={(e) => setLeadForm({...leadForm, interest: e.target.value})}
                    placeholder="e.g., Kitchen Renovation"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
                  <input
                    type="text"
                    value={leadForm.budget}
                    onChange={(e) => setLeadForm({...leadForm, budget: e.target.value})}
                    placeholder="e.g., AED 50,000 - 100,000"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Next Follow-up Date</label>
                <input
                  type="date"
                  value={leadForm.nextFollowUp}
                  onChange={(e) => setLeadForm({...leadForm, nextFollowUp: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({...leadForm, notes: e.target.value})}
                  placeholder="Additional notes about this lead..."
                  rows={3}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowNewLeadModal(false)
                    resetLeadForm()
                  }}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddLead}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Modal */}
      {showEditLeadModal && currentLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">Edit Lead</h3>
              <button onClick={() => setShowEditLeadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lead Status *</label>
                  <select
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({...leadForm, status: e.target.value as 'hot' | 'warm' | 'cold'})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cold">Cold Lead</option>
                    <option value="warm">Warm Lead</option>
                    <option value="hot">Hot Lead</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lead Source</label>
                  <input
                    type="text"
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({...leadForm, source: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Interest/Service</label>
                  <input
                    type="text"
                    value={leadForm.interest}
                    onChange={(e) => setLeadForm({...leadForm, interest: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Budget Range</label>
                  <input
                    type="text"
                    value={leadForm.budget}
                    onChange={(e) => setLeadForm({...leadForm, budget: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Next Follow-up Date</label>
                <input
                  type="date"
                  value={leadForm.nextFollowUp}
                  onChange={(e) => setLeadForm({...leadForm, nextFollowUp: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                <textarea
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({...leadForm, notes: e.target.value})}
                  rows={3}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowEditLeadModal(false)
                    setCurrentLead(null)
                    resetLeadForm()
                  }}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateLead}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  Update Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Lead Modal */}
      {showViewLeadModal && currentLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">Lead Details</h3>
              <button onClick={() => setShowViewLeadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b">
                <div className="h-16 w-16 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-black font-black text-lg">
                  {currentLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xl font-black text-black">{currentLead.name}</h4>
                  <p className="text-gray-600">{currentLead.company}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border mt-2 ${getStatusColor(currentLead.status)}`}>
                    {currentLead.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-black font-medium">{currentLead.email}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-black font-medium">{currentLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Source</p>
                  <p className="text-black font-medium">{currentLead.source}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Last Contact</p>
                  <p className="text-black font-medium">{currentLead.lastContact}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Next Follow-up</p>
                  <p className="text-black font-medium">{currentLead.nextFollowUp}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">Budget</p>
                  <p className="text-black font-medium">{currentLead.budget}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Interest</p>
                <p className="text-black font-medium">{currentLead.interest}</p>
              </div>

              <div>
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Notes</p>
                <p className="text-gray-700">{currentLead.notes || 'No notes available'}</p>
              </div>

              <div>
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-3">Follow-up History ({currentLead.followUpHistory.length})</p>
                {currentLead.followUpHistory.length > 0 ? (
                  <div className="space-y-3">
                    {currentLead.followUpHistory.map((followUp) => (
                      <div key={followUp.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-black text-black text-sm">{followUp.subject}</h6>
                          <span className="text-xs text-gray-500">{followUp.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{followUp.message}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500 capitalize">{followUp.type}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{followUp.sentBy}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No follow-up history yet</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowViewLeadModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowViewLeadModal(false)
                    handleEditLead(currentLead)
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Edit className="h-4 w-4 inline mr-2" />
                  Edit Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Follow-up Modal */}
      {showFollowUpModal && currentLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">Add Follow-up</h3>
              <button onClick={() => setShowFollowUpModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-bold text-gray-700">Lead: {currentLead.name}</p>
                <p className="text-xs text-gray-600">{currentLead.email}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Communication Type *</label>
                <select
                  value={followUpForm.type}
                  onChange={(e) => setFollowUpForm({...followUpForm, type: e.target.value as any})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  value={followUpForm.subject}
                  onChange={(e) => setFollowUpForm({...followUpForm, subject: e.target.value})}
                  placeholder="Brief description..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message/Notes *</label>
                <textarea
                  value={followUpForm.message}
                  onChange={(e) => setFollowUpForm({...followUpForm, message: e.target.value})}
                  placeholder="Detailed notes about this communication..."
                  rows={4}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Schedule for Later (Optional)</label>
                <input
                  type="date"
                  value={followUpForm.scheduledDate}
                  onChange={(e) => setFollowUpForm({...followUpForm, scheduledDate: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty if already completed</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowFollowUpModal(false)
                    resetFollowUpForm()
                  }}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddFollowUp}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  Save Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Reminder Modal - Removed, functionality moved to New Email Modal */}

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">Create New Campaign</h3>
              <button onClick={() => setShowNewCampaignModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                  placeholder="Enter campaign name..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Type *</label>
                <select 
                  value={campaignForm.type}
                  onChange={(e) => setCampaignForm({...campaignForm, type: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Email Campaign</option>
                  <option>SMS Campaign</option>
                  <option>Social Media Campaign</option>
                  <option>Multi-Channel Campaign</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience *</label>
                <select 
                  value={campaignForm.targetAudience}
                  onChange={(e) => setCampaignForm({...campaignForm, targetAudience: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Leads</option>
                  <option>Hot Leads Only</option>
                  <option>Warm Leads Only</option>
                  <option>Cold Leads Only</option>
                  <option>Custom Segment</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={campaignForm.startDate}
                    onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={campaignForm.endDate}
                    onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget (AED) *</label>
                <input
                  type="text"
                  value={campaignForm.budget}
                  onChange={(e) => setCampaignForm({...campaignForm, budget: e.target.value})}
                  placeholder="e.g., AED 5,000"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({...campaignForm, description: e.target.value})}
                  placeholder="Campaign objectives and details..."
                  rows={3}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowNewCampaignModal(false)
                    resetCampaignForm()
                  }}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddCampaign}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditCampaignModal && currentCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">Edit Campaign</h3>
              <button onClick={() => setShowEditCampaignModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Type *</label>
                <select 
                  value={campaignForm.type}
                  onChange={(e) => setCampaignForm({...campaignForm, type: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Email Campaign</option>
                  <option>SMS Campaign</option>
                  <option>Social Media Campaign</option>
                  <option>Multi-Channel Campaign</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience *</label>
                <select 
                  value={campaignForm.targetAudience}
                  onChange={(e) => setCampaignForm({...campaignForm, targetAudience: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Leads</option>
                  <option>Hot Leads Only</option>
                  <option>Warm Leads Only</option>
                  <option>Cold Leads Only</option>
                  <option>Custom Segment</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={campaignForm.startDate}
                    onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={campaignForm.endDate}
                    onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget (AED) *</label>
                <input
                  type="text"
                  value={campaignForm.budget}
                  onChange={(e) => setCampaignForm({...campaignForm, budget: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({...campaignForm, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowEditCampaignModal(false)
                    setCurrentCampaign(null)
                    resetCampaignForm()
                  }}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateCampaign}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Save className="h-4 w-4 inline mr-2" />
                  Update Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New/Edit Email Modal */}
      {showNewEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-black">{currentEmail ? 'Edit' : 'Schedule'} Email</h3>
              <button onClick={() => {
                setShowNewEmailModal(false)
                setCurrentEmail(null)
                resetEmailForm()
              }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedLeads.length > 0 && !currentEmail && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-bold text-blue-900">
                    <Bell className="h-4 w-4 inline mr-2" />
                    Sending to {selectedLeads.length} selected lead(s)
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Subject *</label>
                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                  placeholder="Enter email subject..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {!selectedLeads.length && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Recipient Name</label>
                    <input
                      type="text"
                      value={emailForm.recipient}
                      onChange={(e) => setEmailForm({...emailForm, recipient: e.target.value})}
                      placeholder="Lead name or segment"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Recipient Email *</label>
                    <input
                      type="email"
                      value={emailForm.recipientEmail}
                      onChange={(e) => setEmailForm({...emailForm, recipientEmail: e.target.value})}
                      placeholder="email@example.com"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Type *</label>
                <select
                  value={emailForm.type}
                  onChange={(e) => setEmailForm({...emailForm, type: e.target.value as any})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="follow-up">Follow-up</option>
                  <option value="reminder">Reminder</option>
                  <option value="promotional">Promotional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Schedule Date & Time *</label>
                <input
                  type="datetime-local"
                  value={emailForm.scheduledTime}
                  onChange={(e) => setEmailForm({...emailForm, scheduledTime: e.target.value})}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                <textarea
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                  placeholder="Email message content..."
                  rows={5}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowNewEmailModal(false)
                    setCurrentEmail(null)
                    resetEmailForm()
                  }}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddEmail}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  <Send className="h-4 w-4 inline mr-2" />
                  Schedule Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}