'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  MessageSquare,
  Mail,
  Phone,
  Trash2,
  X,
  Search,
  Copy,
  MessageCircle,
  ArrowUpRight,
  Activity,
  Zap,
  Smile,
  Meh,
  Frown,
  User,
  Building,
  Calendar,
  Eye,
  Plus,
  Send,
  Clock,
  Paperclip,
  Edit,
  CheckCircle,
  AlertCircle,
  Archive
} from 'lucide-react'

export default function CommunicationLog() {
  // Connected leads data (matching the CRM page structure)
  const [leads] = useState([
    {
      id: 1,
      name: 'Ahmed Al-Mansouri',
      company: 'Dubai Properties LLC',
      status: 'Qualified',
      value: 75000,
      email: 'ahmed@dubaiprop.ae',
      phone: '+971-50-1111111',
      address: 'Business Bay, Dubai, UAE',
      industry: 'Real Estate',
      source: 'Website Inquiry',
      lastContact: '2025-12-20',
      notes: 'Interested in premium cleaning services for their office complex. Multiple properties under management.',
      website: 'www.dubaiprop.ae',
      employees: 150,
      annualRevenue: '50M AED',
      secondaryContacts: [
        { name: 'Sarah Al-Mansouri', role: 'Operations Manager', email: 'sarah@dubaiprop.ae', phone: '+971-50-1111112' }
      ],
      linkedin: 'linkedin.com/company/dubaiproperties',
      twitter: '@dubaiproperties',
      budgetRange: '50K-100K AED/month',
      decisionTimeline: '2-3 months',
      painPoints: 'Inconsistent cleaning quality, high turnover of cleaning staff',
      goals: 'Improve tenant satisfaction, reduce maintenance costs',
      competitors: 'CleanCorp, ShineServices',
      currentContract: {
        startDate: '2024-02-01',
        endDate: '2025-01-31',
        value: 75000,
        services: ['Office Cleaning', 'Common Area Maintenance', 'Restroom Sanitization']
      },
      serviceHistory: [
        { date: '2024-06-15', service: 'Deep Cleaning', value: 2500, rating: 5 },
        { date: '2024-09-20', service: 'Emergency Cleaning', value: 1800, rating: 4 }
      ],
      preferredContactMethod: 'Email',
      preferredContactTime: '9:00 AM - 11:00 AM',
      timezone: 'GST (UTC+4)',
      language: 'English, Arabic',
      paymentTerms: 'Net 30 days',
      creditLimit: 100000,
      outstandingBalance: 12500,
      lastPaymentDate: '2025-12-15',
      satisfactionScore: 4.8,
      responseTime: '2 hours',
      contractRenewalProbability: 85,
      lifetimeValue: 225000
    },
    {
      id: 2,
      name: 'Fatima Al-Noor',
      company: 'Al Noor Logistics',
      status: 'Contacted',
      value: 45000,
      email: 'fatima@alnoor.ae',
      phone: '+971-50-2222222',
      address: 'Jebel Ali Free Zone, Dubai, UAE',
      industry: 'Logistics & Transportation',
      source: 'LinkedIn',
      lastContact: '2025-12-18',
      notes: 'Needs warehouse cleaning services, budget constraints mentioned. Large facility with multiple shifts.',
      website: 'www.alnoor.ae',
      employees: 75,
      annualRevenue: '25M AED',
      secondaryContacts: [
        { name: 'Omar Al-Noor', role: 'Warehouse Manager', email: 'omar@alnoor.ae', phone: '+971-50-2222223' },
        { name: 'Layla Ahmed', role: 'HR Manager', email: 'layla@alnoor.ae', phone: '+971-50-2222224' }
      ],
      linkedin: 'linkedin.com/company/alnoorlogistics',
      budgetRange: '30K-60K AED/month',
      decisionTimeline: '1-2 months',
      painPoints: 'Dust accumulation in warehouse, safety compliance issues',
      goals: 'Maintain clean work environment, comply with health regulations',
      competitors: 'LogiClean, WareHousePro',
      currentContract: null,
      serviceHistory: [],
      preferredContactMethod: 'WhatsApp',
      preferredContactTime: '2:00 PM - 4:00 PM',
      timezone: 'GST (UTC+4)',
      language: 'Arabic, English',
      paymentTerms: 'Net 15 days',
      creditLimit: 50000,
      outstandingBalance: 0,
      lastPaymentDate: null,
      satisfactionScore: null,
      responseTime: '4 hours',
      contractRenewalProbability: null,
      lifetimeValue: 45000
    },
    {
      id: 3,
      name: 'Layla Hassan',
      company: 'Paradise Hotels',
      status: 'Proposal',
      value: 120000,
      email: 'layla@paradisehotels.ae',
      phone: '+971-50-3333333',
      address: 'Jumeirah Beach, Dubai, UAE',
      industry: 'Hospitality',
      source: 'Referral',
      lastContact: '2025-12-22',
      notes: 'Very excited about our proposal, multiple properties to service. High-end hotel chain with luxury standards.',
      website: 'www.paradisehotels.ae',
      employees: 200,
      annualRevenue: '80M AED',
      secondaryContacts: [
        { name: 'Ahmed Hassan', role: 'General Manager', email: 'ahmed.h@paradisehotels.ae', phone: '+971-50-3333334' },
        { name: 'Maria Rodriguez', role: 'Housekeeping Director', email: 'maria@paradisehotels.ae', phone: '+971-50-3333335' }
      ],
      linkedin: 'linkedin.com/company/paradisehotels',
      twitter: '@paradisehotels',
      instagram: '@paradisehotels',
      budgetRange: '80K-150K AED/month',
      decisionTimeline: '3-4 weeks',
      painPoints: 'Guest complaints about room cleanliness, staff training needs',
      goals: 'Achieve 5-star cleanliness ratings, improve guest satisfaction scores',
      competitors: 'LuxuryClean, HotelShine',
      currentContract: {
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        value: 120000,
        services: ['Room Cleaning', 'Public Area Maintenance', 'Pool Area Cleaning', 'Spa Cleaning']
      },
      serviceHistory: [
        { date: '2024-07-10', service: 'Deep Cleaning Campaign', value: 8500, rating: 5 },
        { date: '2024-10-05', service: 'Emergency Deep Clean', value: 3200, rating: 5 }
      ],
      preferredContactMethod: 'Phone',
      preferredContactTime: '8:00 AM - 10:00 AM',
      timezone: 'GST (UTC+4)',
      language: 'English, Spanish, Arabic',
      paymentTerms: 'Net 30 days',
      creditLimit: 200000,
      outstandingBalance: 25000,
      lastPaymentDate: '2025-12-01',
      satisfactionScore: 4.9,
      responseTime: '1 hour',
      contractRenewalProbability: 95,
      lifetimeValue: 480000
    },
    {
      id: 4,
      name: 'Hassan Khan',
      company: 'Khan Consulting',
      status: 'New',
      value: 50000,
      email: 'hassan@khanconsult.ae',
      phone: '+971-50-4444444',
      address: 'Al Barsha, Dubai, UAE',
      industry: 'Consulting',
      source: 'Cold Call',
      lastContact: '2025-12-15',
      notes: 'New client, exploring cleaning services for office. Small consulting firm with modern office space.',
      website: 'www.khanconsult.ae',
      employees: 25,
      annualRevenue: '8M AED',
      secondaryContacts: [],
      linkedin: 'linkedin.com/in/hassankhan',
      budgetRange: '15K-30K AED/month',
      decisionTimeline: '4-6 weeks',
      painPoints: 'Limited budget, need cost-effective solutions',
      goals: 'Maintain professional office appearance, improve employee productivity',
      competitors: 'OfficeClean, BizShine',
      currentContract: null,
      serviceHistory: [],
      preferredContactMethod: 'Email',
      preferredContactTime: '10:00 AM - 12:00 PM',
      timezone: 'GST (UTC+4)',
      language: 'English, Urdu',
      paymentTerms: 'Net 30 days',
      creditLimit: 25000,
      outstandingBalance: 0,
      lastPaymentDate: null,
      satisfactionScore: null,
      responseTime: '6 hours',
      contractRenewalProbability: null,
      lifetimeValue: 50000
    },
    {
      id: 5,
      name: 'Sara Ali',
      company: 'Ali Trading',
      status: 'Negotiation',
      value: 95000,
      email: 'sara@alitrading.ae',
      phone: '+971-50-5555555',
      address: 'Deira, Dubai, UAE',
      industry: 'Trading & Commerce',
      source: 'Trade Show',
      lastContact: '2025-12-21',
      notes: 'In negotiation phase, price sensitivity is key. Large showroom and warehouse space.',
      website: 'www.alitrading.ae',
      employees: 45,
      annualRevenue: '30M AED',
      secondaryContacts: [
        { name: 'Ahmed Ali', role: 'Operations Director', email: 'ahmed@alitrading.ae', phone: '+971-50-5555556' }
      ],
      linkedin: 'linkedin.com/company/alitrading',
      budgetRange: '60K-120K AED/month',
      decisionTimeline: '2-4 weeks',
      painPoints: 'Showroom dust, warehouse cleanliness affecting product quality',
      goals: 'Create professional showroom environment, maintain product quality standards',
      competitors: 'TradeClean, CommerceShine',
      currentContract: null,
      serviceHistory: [
        { date: '2024-08-15', service: 'Showroom Deep Clean', value: 4200, rating: 4 }
      ],
      preferredContactMethod: 'Email',
      preferredContactTime: '11:00 AM - 1:00 PM',
      timezone: 'GST (UTC+4)',
      language: 'Arabic, English',
      paymentTerms: 'Net 21 days',
      creditLimit: 100000,
      outstandingBalance: 0,
      lastPaymentDate: null,
      satisfactionScore: 4.2,
      responseTime: '3 hours',
      contractRenewalProbability: 70,
      lifetimeValue: 95000
    },
    {
      id: 6,
      name: 'Mohammed Hassan',
      company: 'Hassan Group',
      status: 'Won',
      value: 180000,
      email: 'mo@hassangroup.ae',
      phone: '+971-50-6666666',
      address: 'Dubai Marina, Dubai, UAE',
      industry: 'Construction',
      source: 'Existing Client',
      lastContact: '2025-12-23',
      notes: 'Long-term client, excellent payment history. Large construction company with multiple sites.',
      website: 'www.hassangroup.ae',
      employees: 300,
      annualRevenue: '150M AED',
      secondaryContacts: [
        { name: 'Fatima Hassan', role: 'Finance Director', email: 'fatima.h@hassangroup.ae', phone: '+971-50-6666667' },
        { name: 'Omar Hassan', role: 'Site Manager', email: 'omar.h@hassangroup.ae', phone: '+971-50-6666668' },
        { name: 'Layla Mahmoud', role: 'HR Manager', email: 'layla.m@hassangroup.ae', phone: '+971-50-6666669' }
      ],
      linkedin: 'linkedin.com/company/hassangroup',
      twitter: '@hassangroup',
      budgetRange: '150K-250K AED/month',
      decisionTimeline: '1-2 months',
      painPoints: 'Construction site cleanliness, safety compliance, dust control',
      goals: 'Maintain safe work environment, comply with regulations, improve site productivity',
      competitors: 'BuildClean, SiteShine',
      currentContract: {
        startDate: '2024-07-01',
        endDate: '2025-06-30',
        value: 180000,
        services: ['Construction Site Cleaning', 'Office Cleaning', 'Equipment Cleaning', 'Waste Management']
      },
      serviceHistory: [
        { date: '2024-09-01', service: 'Monthly Site Cleaning', value: 15000, rating: 5 },
        { date: '2024-10-01', service: 'Monthly Site Cleaning', value: 15000, rating: 5 },
        { date: '2024-11-01', service: 'Monthly Site Cleaning', value: 15000, rating: 5 },
        { date: '2024-12-01', service: 'Monthly Site Cleaning', value: 15000, rating: 5 }
      ],
      preferredContactMethod: 'Phone',
      preferredContactTime: '7:00 AM - 9:00 AM',
      timezone: 'GST (UTC+4)',
      language: 'Arabic, English, Urdu',
      paymentTerms: 'Net 15 days',
      creditLimit: 300000,
      outstandingBalance: 45000,
      lastPaymentDate: '2025-12-20',
      satisfactionScore: 4.9,
      responseTime: '30 minutes',
      contractRenewalProbability: 98,
      lifetimeValue: 720000
    },
  ])

  const [communications, setCommunications] = useState([
    { id: 1, leadId: 1, lead: 'Ahmed Al-Mansouri', type: 'email', date: '2025-12-22', message: 'Interested in our premium cleaning package', sentiment: 'positive', status: 'sent', priority: 'high', scheduledDate: null, attachments: 0 },
    { id: 2, leadId: 2, lead: 'Fatima Al-Noor', type: 'call', date: '2025-12-22', message: 'Discussed project requirements for 3 hours', sentiment: 'neutral', status: 'completed', priority: 'normal', scheduledDate: '2025-12-25', attachments: 0 },
    { id: 3, leadId: 3, lead: 'Layla Hassan', type: 'email', date: '2025-12-21', message: 'Very excited about the proposal!', sentiment: 'positive', status: 'sent', priority: 'normal', scheduledDate: null, attachments: 1 },
    { id: 4, leadId: 4, lead: 'Mohamed Ibrahim', type: 'email', date: '2025-12-20', message: 'Budget constraints prevent moving forward', sentiment: 'negative', status: 'sent', priority: 'low', scheduledDate: null, attachments: 0 },
    { id: 5, leadId: 1, lead: 'Ahmed Al-Mansouri', type: 'whatsapp', date: '2025-12-20', message: 'Can we schedule a meeting next week?', sentiment: 'neutral', status: 'pending', priority: 'normal', scheduledDate: '2025-12-27', attachments: 0 },
  ])

  const [showTemplate, setShowTemplate] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterSentiment, setFilterSentiment] = useState('All')
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [showNewComm, setShowNewComm] = useState(false)
  const [showLeadHistory, setShowLeadHistory] = useState(false)
  const [selectedLeadForHistory, setSelectedLeadForHistory] = useState<any>(null)
  const [newCommData, setNewCommData] = useState({
    leadId: '',
    type: 'email',
    message: '',
    sentiment: 'neutral',
    scheduledDate: '',
    priority: 'normal',
    attachments: [] as File[]
  })

  const templates = {
    followUp: {
      email: "Hi {{name}},\n\nFollowing up on our previous conversation regarding the {{service}} proposal.\n\nWould you be available for a call this week to discuss next steps?\n\nBest regards,\nHomework UAE Sales Team",
      whatsapp: "Hi {{name}}! 👋 Following up on the proposal I shared earlier. Keen to discuss how we can help with your {{service}} needs. Available for a quick call? 📞"
    },
    proposal: {
      email: "Dear {{name}},\n\nPlease find attached the customized proposal for {{service}}.\n\nKey highlights:\n• Cost-effective solution\n• 24/7 support\n• Flexible scheduling\n\nLooking forward to your thoughts.\n\nBest regards,\nHomework UAE",
      whatsapp: "Hi {{name}}! 📋 Sent you the proposal for {{service}}. It covers everything we discussed. Let me know if you have any questions! 💼"
    }
  }

  const filteredComms = useMemo(() => {
    return communications.filter(c => {
      const matchesSearch = c.lead.toLowerCase().includes(searchTerm.toLowerCase()) || c.message.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'All' || c.type === filterType
      const matchesSentiment = filterSentiment === 'All' || c.sentiment === filterSentiment
      return matchesSearch && matchesType && matchesSentiment
    })
  }, [communications, searchTerm, filterType, filterSentiment])

  const stats = useMemo(() => ({
    total: communications.length,
    positive: communications.filter(c => c.sentiment === 'positive').length,
    neutral: communications.filter(c => c.sentiment === 'neutral').length,
    negative: communications.filter(c => c.sentiment === 'negative').length,
    email: communications.filter(c => c.type === 'email').length,
    whatsapp: communications.filter(c => c.type === 'whatsapp').length,
  }), [communications])

  const handleDeleteComm = useCallback((id: any) => {
    if (confirm('Delete this communication log?')) {
      setCommunications(communications.filter(c => c.id !== id))
    }
  }, [communications])

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full p-8 space-y-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Communications</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Communication Log</h1>
              <p className="text-gray-600 mt-2 text-lg">
                Track and manage all interactions with your leads
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewComm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Communication
              </button>
              <button
                onClick={() => setShowTemplate(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Zap className="h-4 w-4" />
                Templates
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setShowNewComm(true)}
              className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">New Communication</p>
                <p className="text-xs text-gray-600">Log interaction</p>
              </div>
            </button>

            <button
              onClick={() => setShowTemplate(true)}
              className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Use Templates</p>
                <p className="text-xs text-gray-600">Ready-to-use messages</p>
              </div>
            </button>

            <button
              onClick={() => {
                const pendingComms = communications.filter(c => c.status === 'pending')
                if (pendingComms.length > 0) {
                  alert(`You have ${pendingComms.length} pending communications to follow up on.`)
                } else {
                  alert('No pending communications found.')
                }
              }}
              className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Pending Follow-ups</p>
                <p className="text-xs text-gray-600">Check pending items</p>
              </div>
            </button>

            <button
              onClick={() => {
                const urgentComms = communications.filter(c => c.priority === 'urgent')
                if (urgentComms.length > 0) {
                  alert(`You have ${urgentComms.length} urgent communications requiring immediate attention.`)
                } else {
                  alert('No urgent communications found.')
                }
              }}
              className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Urgent Items</p>
                <p className="text-xs text-gray-600">High priority alerts</p>
              </div>
            </button>

            <button
              onClick={() => {
                const today = new Date().toISOString().split('T')[0]
                const todayComms = communications.filter(c => c.date === today)
                alert(`You had ${todayComms.length} communications today.`)
              }}
              className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Today's Activity</p>
                <p className="text-xs text-gray-600">View today stats</p>
              </div>
            </button>

            <button
              onClick={() => {
                const scheduled = communications.filter(c => c.scheduledDate && new Date(c.scheduledDate) > new Date())
                if (scheduled.length > 0) {
                  alert(`You have ${scheduled.length} scheduled follow-ups.`)
                } else {
                  alert('No scheduled follow-ups found.')
                }
              }}
              className="flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors group"
            >
              <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Scheduled Tasks</p>
                <p className="text-xs text-gray-600">Upcoming follow-ups</p>
              </div>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: 'Total Interactions', value: stats.total, color: 'blue', icon: Activity },
            { label: 'Positive Sentiment', value: stats.positive, color: 'green', icon: Smile },
            { label: 'Neutral Sentiment', value: stats.neutral, color: 'gray', icon: Meh },
            { label: 'Negative Sentiment', value: stats.negative, color: 'red', icon: Frown },
            { label: 'Email Volume', value: stats.email, color: 'indigo', icon: Mail },
            { label: 'WhatsApp Volume', value: stats.whatsapp, color: 'green', icon: MessageCircle }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search communications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder:text-gray-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-w-35"
            >
              <option value="All">All Channels</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="call">Voice Call</option>
            </select>
            <select
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-w-35"
            >
              <option value="All">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>

        {/* Communications List */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Lead</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Channel</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Message</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sentiment</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComms.map((comm) => {
                  const leadData = leads.find(l => l.id === comm.leadId)
                  return (
                    <tr key={comm.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-600">
                              {comm.lead.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{comm.lead}</p>
                            {leadData && (
                              <p className="text-sm text-gray-500">{leadData.company}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {comm.type === 'email' && <Mail className="h-4 w-4 text-indigo-600" />}
                          {comm.type === 'whatsapp' && <MessageCircle className="h-4 w-4 text-green-600" />}
                          {comm.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                          <span className="text-sm font-medium text-gray-900 capitalize">{comm.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700 max-w-xs truncate">{comm.message}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                          comm.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          comm.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {comm.sentiment === 'positive' && <Smile className="h-3 w-3" />}
                          {comm.sentiment === 'negative' && <Frown className="h-3 w-3" />}
                          {comm.sentiment === 'neutral' && <Meh className="h-3 w-3" />}
                          {comm.sentiment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          comm.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          comm.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          comm.priority === 'low' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {comm.priority || 'normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="h-4 w-4" />
                          {comm.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          comm.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          comm.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {comm.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {leadData && (
                            <button
                              onClick={() => {
                                setSelectedLeadForHistory(leadData)
                                setShowLeadHistory(true)
                              }}
                              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="View Lead Communication History"
                            >
                              <Clock className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedLead(leadData)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Lead Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteComm(comm.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Communication"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Modal */}
        {showTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Communication Templates</h2>
                    <p className="text-gray-600 text-sm mt-1">Ready-to-use templates for different scenarios</p>
                  </div>
                </div>
                <button onClick={() => setShowTemplate(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(templates).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{key.replace(/([A-Z])/g, ' $1')}</h4>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg text-gray-600 hover:text-blue-600 transition-colors">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white hover:bg-green-50 border border-gray-200 rounded-lg text-gray-600 hover:text-green-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700 font-mono leading-relaxed line-clamp-4">
                        {value.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(value.email);
                        alert('Template copied!');
                      }}
                      className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                    >
                      <Copy className="h-4 w-4" /> Copy Template
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-200">
                <button
                  onClick={() => setShowTemplate(false)}
                  className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Communication Form Modal */}
        {showNewComm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">New Communication</h2>
                    <p className="text-gray-600 text-sm mt-1">Log a new interaction with a lead</p>
                  </div>
                </div>
                <button onClick={() => setShowNewComm(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                if (newCommData.leadId && newCommData.message) {
                  const newComm = {
                    id: Math.max(...communications.map(c => c.id), 0) + 1,
                    leadId: parseInt(newCommData.leadId),
                    lead: leads.find(l => l.id === parseInt(newCommData.leadId))?.name || 'Unknown',
                    type: newCommData.type,
                    date: new Date().toISOString().split('T')[0],
                    message: newCommData.message,
                    sentiment: newCommData.sentiment,
                    status: 'sent',
                    priority: newCommData.priority,
                    scheduledDate: newCommData.scheduledDate || null,
                    attachments: newCommData.attachments.length
                  }
                  setCommunications([...communications, newComm])
                  setNewCommData({
                    leadId: '',
                    type: 'email',
                    message: '',
                    sentiment: 'neutral',
                    scheduledDate: '',
                    priority: 'normal',
                    attachments: []
                  })
                  setShowNewComm(false)
                }
              }} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Lead</label>
                    <select
                      value={newCommData.leadId}
                      onChange={(e) => setNewCommData({...newCommData, leadId: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium"
                      required
                    >
                      <option value="">Choose a lead...</option>
                      {leads.map((lead) => (
                        <option key={lead.id} value={lead.id}>
                          {lead.name} - {lead.company}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Communication Type</label>
                    <select
                      value={newCommData.type}
                      onChange={(e) => setNewCommData({...newCommData, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium"
                    >
                      <option value="email">📧 Email</option>
                      <option value="whatsapp">💬 WhatsApp</option>
                      <option value="call">📞 Phone Call</option>
                      <option value="meeting">👥 Meeting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={newCommData.message}
                    onChange={(e) => setNewCommData({...newCommData, message: e.target.value})}
                    placeholder="Enter the communication details..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sentiment</label>
                    <select
                      value={newCommData.sentiment}
                      onChange={(e) => setNewCommData({...newCommData, sentiment: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium"
                    >
                      <option value="positive">😊 Positive</option>
                      <option value="neutral">😐 Neutral</option>
                      <option value="negative">😞 Negative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select
                      value={newCommData.priority}
                      onChange={(e) => setNewCommData({...newCommData, priority: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900 font-medium"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule Follow-up</label>
                    <input
                      type="date"
                      value={newCommData.scheduledDate}
                      onChange={(e) => setNewCommData({...newCommData, scheduledDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setNewCommData({...newCommData, attachments: files})
                      }}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, JPG, PNG up to 10MB each
                      </p>
                    </label>
                  </div>
                  {newCommData.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {newCommData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                          <Paperclip className="h-3 w-3" />
                          {file.name}
                          <button
                            type="button"
                            onClick={() => {
                              const newAttachments = newCommData.attachments.filter((_, i) => i !== index)
                              setNewCommData({...newCommData, attachments: newAttachments})
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowNewComm(false)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Log Communication
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{selectedLead.company}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="text-gray-900 mt-1">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Phone</label>
                    <p className="text-gray-900 mt-1">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Deal Value</label>
                    <p className="text-gray-900 mt-1 font-semibold">AED {selectedLead.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                      selectedLead.status === 'Won' ? 'bg-green-100 text-green-800' :
                      selectedLead.status === 'Negotiation' ? 'bg-yellow-100 text-yellow-800' :
                      selectedLead.status === 'Proposal' ? 'bg-blue-100 text-blue-800' :
                      selectedLead.status === 'Qualified' ? 'bg-purple-100 text-purple-800' :
                      selectedLead.status === 'Contacted' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedLead.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Industry</label>
                    <p className="text-gray-900 mt-1">{selectedLead.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Source</label>
                    <p className="text-gray-900 mt-1">{selectedLead.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Website</label>
                    <p className="text-gray-900 mt-1">
                      <a href={`https://${selectedLead.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        {selectedLead.website}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Employees</label>
                    <p className="text-gray-900 mt-1">{selectedLead.employees}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Annual Revenue</label>
                    <p className="text-gray-900 mt-1">{selectedLead.annualRevenue}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Last Contact</label>
                    <p className="text-gray-900 mt-1">{selectedLead.lastContact}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Address</label>
                  <p className="text-gray-900 mt-1">{selectedLead.address}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Notes</label>
                  <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">{selectedLead.notes}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Communications</h3>
                  <div className="space-y-3">
                    {communications.filter(c => c.leadId === selectedLead.id).slice(0, 3).map((comm) => (
                      <div key={comm.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="shrink-0">
                          {comm.type === 'email' && <Mail className="h-4 w-4 text-indigo-600 mt-0.5" />}
                          {comm.type === 'whatsapp' && <MessageCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                          {comm.type === 'call' && <Phone className="h-4 w-4 text-blue-600 mt-0.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 truncate">{comm.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{comm.date} • {comm.status}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          comm.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          comm.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {comm.sentiment === 'positive' && <Smile className="h-3 w-3" />}
                          {comm.sentiment === 'negative' && <Frown className="h-3 w-3" />}
                          {comm.sentiment === 'neutral' && <Meh className="h-3 w-3" />}
                          {comm.sentiment}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-200">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Templates Modal */}
        {showTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Communication Templates</h2>
                <button
                  onClick={() => setShowTemplate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      category: 'Welcome Messages',
                      templates: [
                        {
                          title: 'New Client Welcome',
                          message: 'Welcome to our service! We\'re excited to work with you. Our team will be in touch shortly to discuss your requirements and get started.',
                          type: 'email',
                          priority: 'normal'
                        },
                        {
                          title: 'Service Introduction',
                          message: 'Thank you for choosing our services. We specialize in providing high-quality solutions tailored to your needs. Let\'s schedule a consultation.',
                          type: 'email',
                          priority: 'normal'
                        }
                      ]
                    },
                    {
                      category: 'Follow-up Messages',
                      templates: [
                        {
                          title: 'Quote Follow-up',
                          message: 'Following up on the quote we sent earlier. Do you have any questions about the pricing or services outlined?',
                          type: 'email',
                          priority: 'high'
                        },
                        {
                          title: 'Project Status Update',
                          message: 'Just wanted to provide an update on your project. Everything is progressing as planned. We\'ll keep you informed of any developments.',
                          type: 'email',
                          priority: 'normal'
                        }
                      ]
                    },
                    {
                      category: 'Urgent Communications',
                      templates: [
                        {
                          title: 'Urgent Issue Resolution',
                          message: 'We\'ve identified an urgent issue that needs immediate attention. Our team is working on a solution and will update you within the next hour.',
                          type: 'phone',
                          priority: 'urgent'
                        },
                        {
                          title: 'Schedule Change Notice',
                          message: 'Due to unforeseen circumstances, we need to reschedule your appointment. Please let us know your availability for alternative times.',
                          type: 'phone',
                          priority: 'high'
                        }
                      ]
                    },
                    {
                      category: 'Feedback & Surveys',
                      templates: [
                        {
                          title: 'Service Feedback Request',
                          message: 'We hope you\'re satisfied with our service. Your feedback helps us improve. Please take a moment to share your experience.',
                          type: 'email',
                          priority: 'normal'
                        },
                        {
                          title: 'Survey Invitation',
                          message: 'We\'d appreciate your feedback on our recent service. Please complete this short survey to help us serve you better.',
                          type: 'email',
                          priority: 'low'
                        }
                      ]
                    }
                  ].map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.templates.map((template, templateIndex) => (
                          <div key={templateIndex} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{template.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                  template.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                  template.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                  template.priority === 'low' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {template.priority}
                                </span>
                                <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                  {template.type}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{template.message}</p>
                            <button
                              onClick={() => {
                                setSelectedTemplate(template.message)
                                setShowTemplate(false)
                                setShowNewComm(true)
                              }}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              Use This Template
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lead Communication History Modal */}
        {showLeadHistory && selectedLeadForHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Communication History</h2>
                    <p className="text-gray-600 text-sm mt-1">{selectedLeadForHistory.name} - {selectedLeadForHistory.company}</p>
                  </div>
                </div>
                <button onClick={() => setShowLeadHistory(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Communication Stats for this Lead */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {(() => {
                    const leadComms = communications.filter(c => c.leadId === selectedLeadForHistory.id)
                    const stats = {
                      total: leadComms.length,
                      positive: leadComms.filter(c => c.sentiment === 'positive').length,
                      email: leadComms.filter(c => c.type === 'email').length,
                      whatsapp: leadComms.filter(c => c.type === 'whatsapp').length
                    }
                    return [
                      { label: 'Total Interactions', value: stats.total, icon: Activity, color: 'blue' },
                      { label: 'Positive Sentiment', value: stats.positive, icon: Smile, color: 'green' },
                      { label: 'Email Count', value: stats.email, icon: Mail, color: 'indigo' },
                      { label: 'WhatsApp Count', value: stats.whatsapp, icon: MessageCircle, color: 'green' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                            <stat.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  })()}
                </div>

                {/* Communication Timeline */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Communication Timeline
                  </h3>

                  {communications.filter(c => c.leadId === selectedLeadForHistory.id).length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No communications found for this lead</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {communications
                        .filter(c => c.leadId === selectedLeadForHistory.id)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((comm) => (
                        <div key={comm.id} className="flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              comm.type === 'email' ? 'bg-indigo-100 text-indigo-600' :
                              comm.type === 'whatsapp' ? 'bg-green-100 text-green-600' :
                              comm.type === 'call' ? 'bg-blue-100 text-blue-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              {comm.type === 'email' && <Mail className="h-5 w-5" />}
                              {comm.type === 'whatsapp' && <MessageCircle className="h-5 w-5" />}
                              {comm.type === 'call' && <Phone className="h-5 w-5" />}
                              {comm.type === 'meeting' && <User className="h-5 w-5" />}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900 capitalize">{comm.type}</span>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                  comm.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                                  comm.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {comm.sentiment === 'positive' && <Smile className="h-3 w-3" />}
                                  {comm.sentiment === 'negative' && <Frown className="h-3 w-3" />}
                                  {comm.sentiment === 'neutral' && <Meh className="h-3 w-3" />}
                                  {comm.sentiment}
                                </span>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                  comm.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                                  comm.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  comm.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {comm.status}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">{comm.date}</span>
                            </div>

                            <p className="text-gray-700 mb-2">{comm.message}</p>

                            {comm.priority && comm.priority !== 'normal' && (
                              <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className={`h-4 w-4 ${
                                  comm.priority === 'urgent' ? 'text-red-500' :
                                  comm.priority === 'high' ? 'text-orange-500' :
                                  'text-blue-500'
                                }`} />
                                <span className={`text-xs font-semibold uppercase ${
                                  comm.priority === 'urgent' ? 'text-red-700' :
                                  comm.priority === 'high' ? 'text-orange-700' :
                                  'text-blue-700'
                                }`}>
                                  {comm.priority} Priority
                                </span>
                              </div>
                            )}

                            {comm.scheduledDate && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                Follow-up scheduled: {comm.scheduledDate}
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 flex flex-col gap-2">
                            <button
                              onClick={() => handleDeleteComm(comm.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Communication"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                <button
                  onClick={() => {
                    setNewCommData({...newCommData, leadId: selectedLeadForHistory.id.toString()})
                    setShowNewComm(true)
                    setShowLeadHistory(false)
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Communication
                </button>
                <button
                  onClick={() => setShowLeadHistory(false)}
                  className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
