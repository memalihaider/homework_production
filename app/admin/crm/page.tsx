'use client'

import { useState, useCallback, useMemo } from 'react'
import { 
  Plus, 
  Trash2, 
  X, 
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle2,
  Activity,
  Clock,
  GripVertical,
  Briefcase,
  Search,
  Filter,
  Kanban,
  Users,
  ArrowUpRight,
  ArrowRight,
  MoreVertical,
  Eye,
  UserPlus,
  Database,
  Sparkles,
  Brain,
  UserCheck,
  Zap
} from 'lucide-react'

interface Lead {
  id: number
  name: string
  company: string
  status: string
  value: number
  daysInStage: number
  priority: string
  email: string
  phone: string
  tier: string
  joinDate: string
  address: string
  industry: string
  source: string[]
  lastContact: string
  notes: string
  website: string
  employees: number
  annualRevenue: string
  secondaryContacts: Array<{ name: string; role: string; email: string; phone: string }>
  linkedin?: string
  twitter?: string
  instagram?: string
  budgetRange: string
  decisionTimeline: string
  painPoints: string
  goals: string
  competitors: string
  currentContract: {
    startDate: string
    endDate: string
    value: number
    services: string[]
  } | null
  serviceHistory: Array<{ date: string; service: string; value: number; rating: number }>
  preferredContactMethod: string
  preferredContactTime: string
  timezone: string
  language: string
  paymentTerms: string
  creditLimit: number
  outstandingBalance: number
  lastPaymentDate: string | null
  satisfactionScore: number | null
  responseTime: string
  contractRenewalProbability: number | null
  lifetimeValue: number
}

export default function UnifiedCRMDashboard() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: 'Ahmed Al-Mansouri',
      company: 'Dubai Properties LLC',
      status: 'Qualified',
      value: 75000,
      daysInStage: 3,
      priority: 'High',
      email: 'ahmed@dubaiprop.ae',
      phone: '+971-50-1111111',
      tier: 'Gold',
      joinDate: '2024-01-15',
      address: 'Business Bay, Dubai, UAE',
      industry: 'Real Estate',
      source: ['Website Inquiry'],
      lastContact: '2025-12-20',
      notes: 'Interested in premium cleaning services for their office complex. Multiple properties under management.',
      website: 'www.dubaiprop.ae',
      employees: 150,
      annualRevenue: '50M AED',
      // Enhanced contact information
      secondaryContacts: [
        { name: 'Sarah Al-Mansouri', role: 'Operations Manager', email: 'sarah@dubaiprop.ae', phone: '+971-50-1111112' }
      ],
      // Social media and online presence
      linkedin: 'linkedin.com/company/dubaiproperties',
      twitter: '@dubaiproperties',
      // Business intelligence
      budgetRange: '50K-100K AED/month',
      decisionTimeline: '2-3 months',
      painPoints: 'Inconsistent cleaning quality, high turnover of cleaning staff',
      goals: 'Improve tenant satisfaction, reduce maintenance costs',
      competitors: 'CleanCorp, ShineServices',
      // Contract and service details
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
      // Communication preferences
      preferredContactMethod: 'Email',
      preferredContactTime: '9:00 AM - 11:00 AM',
      timezone: 'GST (UTC+4)',
      language: 'English, Arabic',
      // Financial information
      paymentTerms: 'Net 30 days',
      creditLimit: 100000,
      outstandingBalance: 12500,
      lastPaymentDate: '2025-12-15',
      // Analytics and metrics
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
      daysInStage: 5,
      priority: 'Medium',
      email: 'fatima@alnoor.ae',
      phone: '+971-50-2222222',
      tier: 'Silver',
      joinDate: '2024-02-20',
      address: 'Jebel Ali Free Zone, Dubai, UAE',
      industry: 'Logistics & Transportation',
      source: ['LinkedIn'],
      lastContact: '2025-12-18',
      notes: 'Needs warehouse cleaning services, budget constraints mentioned. Large facility with multiple shifts.',
      website: 'www.alnoor.ae',
      employees: 75,
      annualRevenue: '25M AED',
      // Enhanced contact information
      secondaryContacts: [
        { name: 'Omar Al-Noor', role: 'Warehouse Manager', email: 'omar@alnoor.ae', phone: '+971-50-2222223' },
        { name: 'Layla Ahmed', role: 'HR Manager', email: 'layla@alnoor.ae', phone: '+971-50-2222224' }
      ],
      // Social media and online presence
      linkedin: 'linkedin.com/company/alnoorlogistics',
      // Business intelligence
      budgetRange: '30K-60K AED/month',
      decisionTimeline: '1-2 months',
      painPoints: 'Dust accumulation in warehouse, safety compliance issues',
      goals: 'Maintain clean work environment, comply with health regulations',
      competitors: 'LogiClean, WareHousePro',
      // Contract and service details
      currentContract: null,
      serviceHistory: [],
      // Communication preferences
      preferredContactMethod: 'WhatsApp',
      preferredContactTime: '2:00 PM - 4:00 PM',
      timezone: 'GST (UTC+4)',
      language: 'Arabic, English',
      // Financial information
      paymentTerms: 'Net 15 days',
      creditLimit: 50000,
      outstandingBalance: 0,
      lastPaymentDate: null,
      // Analytics and metrics
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
      daysInStage: 2,
      priority: 'High',
      email: 'layla@paradisehotels.ae',
      phone: '+971-50-3333333',
      tier: 'Gold',
      joinDate: '2024-03-10',
      address: 'Jumeirah Beach, Dubai, UAE',
      industry: 'Hospitality',
      source: ['Referral'],
      lastContact: '2025-12-22',
      notes: 'Very excited about our proposal, multiple properties to service. High-end hotel chain with luxury standards.',
      website: 'www.paradisehotels.ae',
      employees: 200,
      annualRevenue: '80M AED',
      // Enhanced contact information
      secondaryContacts: [
        { name: 'Ahmed Hassan', role: 'General Manager', email: 'ahmed.h@paradisehotels.ae', phone: '+971-50-3333334' },
        { name: 'Maria Rodriguez', role: 'Housekeeping Director', email: 'maria@paradisehotels.ae', phone: '+971-50-3333335' }
      ],
      // Social media and online presence
      linkedin: 'linkedin.com/company/paradisehotels',
      twitter: '@paradisehotels',
      instagram: '@paradisehotels',
      // Business intelligence
      budgetRange: '80K-150K AED/month',
      decisionTimeline: '3-4 weeks',
      painPoints: 'Guest complaints about room cleanliness, staff training needs',
      goals: 'Achieve 5-star cleanliness ratings, improve guest satisfaction scores',
      competitors: 'LuxuryClean, HotelShine',
      // Contract and service details
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
      // Communication preferences
      preferredContactMethod: 'Phone',
      preferredContactTime: '8:00 AM - 10:00 AM',
      timezone: 'GST (UTC+4)',
      language: 'English, Spanish, Arabic',
      // Financial information
      paymentTerms: 'Net 30 days',
      creditLimit: 200000,
      outstandingBalance: 25000,
      lastPaymentDate: '2025-12-01',
      // Analytics and metrics
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
      daysInStage: 1,
      priority: 'Medium',
      email: 'hassan@khanconsult.ae',
      phone: '+971-50-4444444',
      tier: 'Bronze',
      joinDate: '2024-04-05',
      address: 'Al Barsha, Dubai, UAE',
      industry: 'Consulting',
      source: ['Cold Call'],
      lastContact: '2025-12-15',
      notes: 'New client, exploring cleaning services for office. Small consulting firm with modern office space.',
      website: 'www.khanconsult.ae',
      employees: 25,
      annualRevenue: '8M AED',
      // Enhanced contact information
      secondaryContacts: [],
      // Social media and online presence
      linkedin: 'linkedin.com/in/hassankhan',
      // Business intelligence
      budgetRange: '15K-30K AED/month',
      decisionTimeline: '4-6 weeks',
      painPoints: 'Limited budget, need cost-effective solutions',
      goals: 'Maintain professional office appearance, improve employee productivity',
      competitors: 'OfficeClean, BizShine',
      // Contract and service details
      currentContract: null,
      serviceHistory: [],
      // Communication preferences
      preferredContactMethod: 'Email',
      preferredContactTime: '10:00 AM - 12:00 PM',
      timezone: 'GST (UTC+4)',
      language: 'English, Urdu',
      // Financial information
      paymentTerms: 'Net 30 days',
      creditLimit: 25000,
      outstandingBalance: 0,
      lastPaymentDate: null,
      // Analytics and metrics
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
      daysInStage: 8,
      priority: 'High',
      email: 'sara@alitrading.ae',
      phone: '+971-50-5555555',
      tier: 'Silver',
      joinDate: '2024-05-12',
      address: 'Deira, Dubai, UAE',
      industry: 'Trading & Commerce',
      source: ['Trade Show'],
      lastContact: '2025-12-21',
      notes: 'In negotiation phase, price sensitivity is key. Large showroom and warehouse space.',
      website: 'www.alitrading.ae',
      employees: 45,
      annualRevenue: '30M AED',
      // Enhanced contact information
      secondaryContacts: [
        { name: 'Ahmed Ali', role: 'Operations Director', email: 'ahmed@alitrading.ae', phone: '+971-50-5555556' }
      ],
      // Social media and online presence
      linkedin: 'linkedin.com/company/alitrading',
      // Business intelligence
      budgetRange: '60K-120K AED/month',
      decisionTimeline: '2-4 weeks',
      painPoints: 'Showroom dust, warehouse cleanliness affecting product quality',
      goals: 'Create professional showroom environment, maintain product quality standards',
      competitors: 'TradeClean, CommerceShine',
      // Contract and service details
      currentContract: null,
      serviceHistory: [
        { date: '2024-08-15', service: 'Showroom Deep Clean', value: 4200, rating: 4 }
      ],
      // Communication preferences
      preferredContactMethod: 'Email',
      preferredContactTime: '11:00 AM - 1:00 PM',
      timezone: 'GST (UTC+4)',
      language: 'Arabic, English',
      // Financial information
      paymentTerms: 'Net 21 days',
      creditLimit: 100000,
      outstandingBalance: 0,
      lastPaymentDate: null,
      // Analytics and metrics
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
      daysInStage: 0,
      priority: 'High',
      email: 'mo@hassangroup.ae',
      phone: '+971-50-6666666',
      tier: 'Platinum',
      joinDate: '2024-06-01',
      address: 'Dubai Marina, Dubai, UAE',
      industry: 'Construction',
      source: ['Existing Client'],
      lastContact: '2025-12-23',
      notes: 'Long-term client, excellent payment history. Large construction company with multiple sites.',
      website: 'www.hassangroup.ae',
      employees: 300,
      annualRevenue: '150M AED',
      // Enhanced contact information
      secondaryContacts: [
        { name: 'Fatima Hassan', role: 'Finance Director', email: 'fatima.h@hassangroup.ae', phone: '+971-50-6666667' },
        { name: 'Omar Hassan', role: 'Site Manager', email: 'omar.h@hassangroup.ae', phone: '+971-50-6666668' },
        { name: 'Layla Mahmoud', role: 'HR Manager', email: 'layla.m@hassangroup.ae', phone: '+971-50-6666669' }
      ],
      // Social media and online presence
      linkedin: 'linkedin.com/company/hassangroup',
      twitter: '@hassangroup',
      // Business intelligence
      budgetRange: '150K-250K AED/month',
      decisionTimeline: '1-2 months',
      painPoints: 'Construction site cleanliness, safety compliance, dust control',
      goals: 'Maintain safe work environment, comply with regulations, improve site productivity',
      competitors: 'BuildClean, SiteShine',
      // Contract and service details
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
      // Communication preferences
      preferredContactMethod: 'Phone',
      preferredContactTime: '7:00 AM - 9:00 AM',
      timezone: 'GST (UTC+4)',
      language: 'Arabic, English, Urdu',
      // Financial information
      paymentTerms: 'Net 15 days',
      creditLimit: 300000,
      outstandingBalance: 45000,
      lastPaymentDate: '2025-12-20',
      // Analytics and metrics
      satisfactionScore: 4.9,
      responseTime: '30 minutes',
      contractRenewalProbability: 98,
      lifetimeValue: 720000
    },
  ])

  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [showEnhancedDataForm, setShowEnhancedDataForm] = useState(false)
  const [draggedLead, setDraggedLead] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showAIPersonaModal, setShowAIPersonaModal] = useState(false)
  const [aiPersonaResults, setAiPersonaResults] = useState<any[]>([])
  const [isGeneratingPersonas, setIsGeneratingPersonas] = useState(false)
  const [formData, setFormData] = useState({ name: '', company: '', value: '', priority: 'Medium', email: '', phone: '', sources: [] as string[] })
  const [availableSources] = useState([
    'Social Media',
    'Google Ads',
    'Facebook Ads',
    'LinkedIn Ads',
    'Website Inquiry',
    'Referral',
    'Cold Call',
    'Trade Show',
    'Email Campaign',
    'Direct Mail',
    'Partnership',
    'SEO',
    'Content Marketing',
    'Other'
  ])
  const [enhancedData, setEnhancedData] = useState({
    selectedLeadId: null as number | null,
    address: '',
    industry: '',
    website: '',
    employees: '',
    annualRevenue: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    budgetRange: '',
    decisionTimeline: '',
    painPoints: '',
    goals: '',
    competitors: '',
    preferredContactMethod: 'Email',
    preferredContactTime: '',
    timezone: 'GST (UTC+4)',
    language: 'English',
    paymentTerms: 'Net 30 days',
    creditLimit: '',
    secondaryContacts: [] as Array<{ name: string; role: string; email: string; phone: string }>
  })

  const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won']

  const leadsByStage = useMemo(() => {
    return stages.map(stage => ({
      stage,
      leads: leads.filter(l => l.status === stage && (searchTerm === '' || l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase())) && (filterPriority === 'all' || l.priority === filterPriority)),
      total: leads.filter(l => l.status === stage && (searchTerm === '' || l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase())) && (filterPriority === 'all' || l.priority === filterPriority)).reduce((sum, l) => sum + l.value, 0),
      count: leads.filter(l => l.status === stage && (searchTerm === '' || l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase())) && (filterPriority === 'all' || l.priority === filterPriority)).length,
    }))
  }, [leads, searchTerm, filterPriority])

  const handleMoveStage = useCallback((lead: any, newStage: any) => {
    setLeads(leads.map(l => l.id === lead.id ? { ...l, status: newStage, daysInStage: 0 } : l))
  }, [leads])

  const handleDeleteLead = useCallback((leadId: any) => {
    setLeads(leads.filter(l => l.id !== leadId))
    setShowLeadModal(false)
  }, [leads])

  const handleAddNewLead = () => {
    if (formData.name && formData.company && formData.value) {
      const newLead = {
        id: Math.max(...leads.map(l => l.id), 0) + 1,
        name: formData.name,
        company: formData.company,
        status: 'New',
        value: parseInt(formData.value),
        daysInStage: 0,
        priority: formData.priority,
        email: formData.email,
        phone: formData.phone,
        tier: 'Bronze',
        joinDate: new Date().toISOString().split('T')[0],
        address: '',
        industry: '',
        source: formData.sources.length > 0 ? formData.sources : ['Manual Entry'],
        lastContact: new Date().toISOString().split('T')[0],
        notes: '',
        website: '',
        employees: 0,
        annualRevenue: '0 AED',
        secondaryContacts: [],
        linkedin: '',
        twitter: '',
        instagram: '',
        budgetRange: '',
        decisionTimeline: '',
        painPoints: '',
        goals: '',
        competitors: '',
        currentContract: null,
        serviceHistory: [],
        preferredContactMethod: 'Email',
        preferredContactTime: '',
        timezone: 'GST (UTC+4)',
        language: 'English',
        paymentTerms: 'Net 30 days',
        creditLimit: 0,
        outstandingBalance: 0,
        lastPaymentDate: null,
        satisfactionScore: null,
        responseTime: '',
        contractRenewalProbability: null,
        lifetimeValue: parseInt(formData.value)
      }
      setLeads([...leads, newLead])
      setFormData({ name: '', company: '', value: '', priority: 'Medium', email: '', phone: '', sources: [] })
      setShowNewForm(false)
    }
  }

  const handleDragStart = (e: any, lead: any) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: any, stageData: any) => {
    e.preventDefault()
    if (draggedLead && draggedLead.status !== stageData.stage) {
      handleMoveStage(draggedLead, stageData.stage)
    }
    setDraggedLead(null)
  }

  const handleDragEnd = () => {
    setDraggedLead(null)
  }

  const generateAIPersonas = async () => {
    setIsGeneratingPersonas(true)
    try {
      // Analyze existing leads to identify patterns and create new persona-based leads
      const existingPersonas = leads.map(lead => ({
        industry: lead.industry,
        companySize: lead.employees,
        budget: lead.budgetRange,
        painPoints: lead.painPoints,
        goals: lead.goals,
        location: lead.address
      }))

      // Simulate AI analysis - in real implementation, this would call an AI service
      const newPersonas = [
        {
          name: 'Sarah Chen',
          company: 'TechStart Solutions',
          title: 'Operations Manager',
          industry: 'Technology',
          employees: 45,
          budgetRange: '$5,000 - $10,000',
          painPoints: 'Inefficient cleaning processes, high turnover',
          goals: 'Improve workplace productivity, reduce operational costs',
          address: 'Downtown Business District',
          email: 'sarah.chen@techstart.com',
          phone: '+1 (555) 123-4567'
        },
        {
          name: 'Michael Rodriguez',
          company: 'GreenLeaf Realty',
          title: 'Property Manager',
          industry: 'Real Estate',
          employees: 12,
          budgetRange: '$2,000 - $5,000',
          painPoints: 'Maintaining property appeal, tenant satisfaction',
          goals: 'Enhance property value, improve tenant retention',
          address: 'Midtown Office Complex',
          email: 'michael@greenleafrealty.com',
          phone: '+1 (555) 987-6543'
        },
        {
          name: 'Dr. Emily Watson',
          company: 'Wellness Center Plus',
          title: 'Practice Manager',
          industry: 'Healthcare',
          employees: 28,
          budgetRange: '$3,000 - $7,000',
          painPoints: 'Maintaining sterile environment, patient comfort',
          goals: 'Ensure compliance, create welcoming atmosphere',
          address: 'Medical Plaza',
          email: 'emily.watson@wellnesscenter.com',
          phone: '+1 (555) 456-7890'
        }
      ]

      setAiPersonaResults(newPersonas)
      setShowAIPersonaModal(true)
    } catch (error) {
      console.error('Error generating AI personas:', error)
    } finally {
      setIsGeneratingPersonas(false)
    }
  }

  const createLeadFromPersona = (persona: any) => {
    const newLead: Lead = {
      id: Date.now(),
      name: persona.name,
      company: persona.company,
      email: persona.email,
      phone: persona.phone,
      status: 'New',
      value: 0,
      daysInStage: 0,
      priority: 'Medium',
      tier: 'Standard',
      joinDate: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: `AI-generated lead based on ${persona.industry} persona analysis`,
      industry: persona.industry,
      employees: persona.employees,
      budgetRange: persona.budgetRange,
      painPoints: persona.painPoints,
      goals: persona.goals,
      address: persona.address,
      website: '',
      annualRevenue: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      decisionTimeline: '',
      competitors: '',
      preferredContactMethod: 'Email',
      preferredContactTime: '',
      timezone: 'GST (UTC+4)',
      language: 'English',
      paymentTerms: 'Net 30 days',
      creditLimit: 0,
      outstandingBalance: 0,
      lastPaymentDate: null,
      satisfactionScore: null,
      responseTime: 'Within 24 hours',
      contractRenewalProbability: null,
      lifetimeValue: 0,
      source: ['AI Generated'],
      currentContract: null,
      serviceHistory: [],
      secondaryContacts: []
    }

    setLeads([...leads, newLead])
    setShowAIPersonaModal(false)
    setAiPersonaResults([])
  }

  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0)
  const avgDealSize = leads.length > 0 ? leads.reduce((sum, l) => sum + l.value, 0) / leads.length : 0
  const activeLead = leads.filter(l => l.status !== 'Won').length
  const wonDeals = leads.filter(l => l.status === 'Won').reduce((sum, l) => sum + l.value, 0)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return { bg: 'bg-red-100', text: 'text-red-900', badge: 'bg-red-50 text-red-700 border-red-300' }
      case 'Medium': return { bg: 'bg-amber-100', text: 'text-amber-900', badge: 'bg-amber-50 text-amber-700 border-amber-300' }
      default: return { bg: 'bg-green-100', text: 'text-green-900', badge: 'bg-green-50 text-green-700 border-green-300' }
    }
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-xl bg-white p-6 text-gray-900 shadow-lg border border-gray-300">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-300">
                <Kanban className="h-4 w-4 text-blue-700" />
              </div>
              <span className="text-blue-700 font-bold text-xs uppercase">CRM Management</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Lead & Pipeline Hub</h1>
            <p className="text-gray-600 mt-2 text-sm">Unified dashboard for leads and pipeline management</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowNewForm(true)} className="group relative flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              New Lead
            </button>
            <button onClick={() => setShowEnhancedDataForm(true)} className="group relative flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]">
              <Database className="h-4 w-4" />
              Add Client Data
            </button>
            <button 
              onClick={generateAIPersonas} 
              disabled={isGeneratingPersonas}
              className="group relative flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGeneratingPersonas ? (
                <Zap className="h-4 w-4 animate-pulse" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGeneratingPersonas ? 'Generating...' : 'AI Personas'}
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-blue-100 blur-[80px] opacity-30"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Pipeline', value: `AED ${(totalPipeline / 1000).toFixed(0)}K`, icon: DollarSign, color: 'blue' },
          { label: 'Active Leads', value: activeLead, icon: Target, color: 'purple' },
          { label: 'Avg Deal Size', value: `AED ${(avgDealSize / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'green' },
          { label: 'Won This Month', value: `AED ${(wonDeals / 1000).toFixed(0)}K`, icon: CheckCircle2, color: 'emerald' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className={`text-lg font-black mt-0.5 ${stat.color === 'blue' ? 'text-blue-700' : stat.color === 'purple' ? 'text-purple-700' : stat.color === 'green' ? 'text-green-700' : 'text-emerald-700'}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-700' : stat.color === 'purple' ? 'bg-purple-100 text-purple-700' : stat.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-emerald-100 text-emerald-700'}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search leads by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder:text-gray-500 transition-all"
          />
        </div>
        <select 
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all min-w-45"
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
      </div>

      {/* Pipeline Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Kanban className="h-5 w-5 text-blue-700" />
          <h2 className="text-xl font-black text-gray-900">Pipeline Board</h2>
          <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold">{leads.length} Leads</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-6 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {leadsByStage.map((stageData) => (
            <div key={stageData.stage} className="shrink-0 w-72 snap-start">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">{stageData.stage}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-[9px] font-bold text-gray-700">
                    {stageData.count}
                  </span>
                </div>
                <p className="text-[9px] font-bold text-blue-700 uppercase">
                  AED {(stageData.total / 1000).toFixed(0)}K
                </p>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stageData)}
                className="space-y-2 min-h-87.5 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 p-3 transition-all hover:border-blue-400 hover:bg-blue-50"
              >
                {stageData.leads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    onDragEnd={handleDragEnd}
                    onClick={() => { setSelectedLead(lead); setShowLeadModal(true) }}
                    className={`bg-white border-l-4 rounded-lg p-3 cursor-move hover:shadow-md transition-all group ${
                      draggedLead?.id === lead.id ? 'opacity-50 scale-95' : 'hover:border-l-blue-500'
                    } ${
                      lead.priority === 'High' ? 'border-l-red-500' :
                      lead.priority === 'Medium' ? 'border-l-amber-500' :
                      'border-l-green-500'
                    }`}
                    style={{ cursor: draggedLead?.id === lead.id ? 'grabbing' : 'grab' }}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-3.5 w-3.5 text-gray-300 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-xs group-hover:text-blue-600 truncate">
                          {lead.name.split(' ')[0]} {lead.name.split(' ')[1]?.charAt(0)}.
                        </h4>
                        <p className="text-[10px] text-gray-600 font-medium truncate mt-0.5">
                          {lead.company.substring(0, 20)}...
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                          <span className="text-xs font-bold text-blue-700">
                            AED {(lead.value / 1000).toFixed(0)}K
                          </span>
                          <span className="text-[9px] font-bold text-gray-500 flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {lead.daysInStage}d
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 ml-5">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border ${getPriorityColor(lead.priority).badge}`}>
                        {lead.priority}
                      </span>
                    </div>
                  </div>
                ))}
                
                {stageData.leads.length === 0 && (
                  <div className="h-24 flex flex-col items-center justify-center text-gray-400">
                    <Activity className="h-5 w-5 mb-2 opacity-40" />
                    <span className="text-[9px] font-bold uppercase opacity-50">No leads</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leads Table Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-green-700" />
          <h2 className="text-xl font-black text-gray-900">All Leads Directory</h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-300">
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Lead Name</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Company</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Status</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Deal Value</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Tier</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Source</th>
                <th className="px-4 py-3 text-left font-black text-gray-900 uppercase text-[10px] tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-bold text-gray-900 text-xs">{lead.name}</p>
                      <p className="text-[9px] text-gray-600 mt-0.5">{lead.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-700">{lead.company}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase border ${
                      lead.status === 'Won' ? 'bg-green-100 text-green-700 border-green-300' :
                      lead.status === 'Proposal' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                      lead.status === 'New' ? 'bg-gray-100 text-gray-700 border-gray-300' :
                      'bg-amber-100 text-amber-700 border-amber-300'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-blue-700 text-xs">AED {(lead.value / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase border ${getPriorityColor(lead.priority).badge}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase ${
                      lead.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                      lead.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                      lead.tier === 'Silver' ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {lead.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-32">
                      {lead.source && lead.source.length > 0 ? (
                        lead.source.slice(0, 2).map((src: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-800 text-[8px] font-bold rounded-full uppercase">
                            {src.length > 8 ? `${src.substring(0, 8)}...` : src}
                          </span>
                        ))
                      ) : (
                        <span className="text-[8px] text-gray-500 italic">-</span>
                      )}
                      {lead.source && lead.source.length > 2 && (
                        <span className="text-[8px] text-gray-500 font-medium">+{lead.source.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => { setSelectedLead(lead); setShowLeadModal(true) }}
                      className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-linear-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-300">
                  <Users className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">{selectedLead.name}</h2>
                  <p className="text-gray-600 text-xs font-medium mt-0.5 uppercase">{selectedLead.company}</p>
                </div>
              </div>
              <button onClick={() => setShowLeadModal(false)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-300">
                  <p className="text-[9px] font-bold text-blue-700 uppercase tracking-wider mb-1">Deal Value</p>
                  <p className="text-lg font-black text-blue-900">AED {(selectedLead.value / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-300">
                  <p className="text-[9px] font-bold text-purple-700 uppercase tracking-wider mb-1">Priority</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[9px] font-bold uppercase border ${getPriorityColor(selectedLead.priority).badge}`}>
                    {selectedLead.priority}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Pipeline Progress</p>
                  <span className="text-xs font-black text-gray-900">{selectedLead.status}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-500" 
                    style={{ width: `${((stages.indexOf(selectedLead.status) + 1) / stages.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-xs font-bold text-gray-900 truncate">{selectedLead.email}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Phone</p>
                  <p className="text-xs font-bold text-gray-900">{selectedLead.phone}</p>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-[9px] font-bold text-green-700 uppercase mb-2">Lead Sources</p>
                <div className="flex flex-wrap gap-1">
                  {selectedLead.source && selectedLead.source.length > 0 ? (
                    selectedLead.source.map((src: string, index: number) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-[9px] font-bold rounded-full uppercase">
                        {src}
                      </span>
                    ))
                  ) : (
                    <span className="text-[9px] text-green-600 italic">No sources specified</span>
                  )}
                </div>
              </div>

              {selectedLead.status !== stages[stages.length - 1] && (
                <select
                  defaultValue={selectedLead.status}
                  onChange={(e) => {
                    handleMoveStage(selectedLead, e.target.value)
                    setShowLeadModal(false)
                  }}
                  className="w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-lg text-xs text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {stages.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-300 flex gap-3">
              <button 
                onClick={() => setShowLeadModal(false)} 
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-bold text-sm uppercase transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDeleteLead(selectedLead.id)
                }}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold text-sm uppercase transition-all border border-red-300 flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {showNewForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-linear-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-300">
                  <Plus className="h-5 w-5 text-blue-700" />
                </div>
                <h2 className="text-lg font-black text-gray-900">New Lead</h2>
              </div>
              <button onClick={() => setShowNewForm(false)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Contact Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Company</label>
                <input
                  type="text"
                  placeholder="Enter company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Deal Value (AED)</label>
                <input
                  type="number"
                  placeholder="50000"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="email@company.ae"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="+971-50-1111111"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Lead Sources (Select Multiple)</label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                  {availableSources.map((source) => (
                    <label key={source} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                      <input
                        type="checkbox"
                        checked={formData.sources.includes(source)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, sources: [...formData.sources, source]})
                          } else {
                            setFormData({...formData, sources: formData.sources.filter(s => s !== source)})
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{source}</span>
                    </label>
                  ))}
                </div>
                {formData.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {formData.sources.map((source) => (
                      <span key={source} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {source}
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, sources: formData.sources.filter(s => s !== source)})}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 font-bold"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-300 flex gap-3">
              <button 
                onClick={() => setShowNewForm(false)} 
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-bold text-sm uppercase transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewLead}
                disabled={!formData.name || !formData.company || !formData.value}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-bold text-sm uppercase transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Client Data Form Modal */}
      {showEnhancedDataForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-300 bg-linear-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center border border-green-300">
                  <Database className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Add Enhanced Client Data</h3>
                  <p className="text-sm text-gray-600">Add comprehensive business intelligence and contact details</p>
                </div>
              </div>
              <button onClick={() => setShowEnhancedDataForm(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Lead Selection */}
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-700 uppercase block mb-3">Select Lead to Enhance</label>
                <select
                  value={enhancedData.selectedLeadId || ''}
                  onChange={(e) => {
                    const leadId = parseInt(e.target.value);
                    const selectedLead = leads.find(l => l.id === leadId);
                    if (selectedLead) {
                      setEnhancedData({
                        ...enhancedData,
                        selectedLeadId: leadId,
                        address: selectedLead.address || '',
                        industry: selectedLead.industry || '',
                        website: selectedLead.website || '',
                        employees: selectedLead.employees?.toString() || '',
                        annualRevenue: selectedLead.annualRevenue || '',
                        linkedin: selectedLead.linkedin || '',
                        twitter: selectedLead.twitter || '',
                        instagram: selectedLead.instagram || '',
                        budgetRange: selectedLead.budgetRange || '',
                        decisionTimeline: selectedLead.decisionTimeline || '',
                        painPoints: selectedLead.painPoints || '',
                        goals: selectedLead.goals || '',
                        competitors: selectedLead.competitors || '',
                        preferredContactMethod: selectedLead.preferredContactMethod || 'Email',
                        preferredContactTime: selectedLead.preferredContactTime || '',
                        timezone: selectedLead.timezone || 'GST (UTC+4)',
                        language: selectedLead.language || 'English',
                        paymentTerms: selectedLead.paymentTerms || 'Net 30 days',
                        creditLimit: selectedLead.creditLimit?.toString() || '',
                        secondaryContacts: selectedLead.secondaryContacts || []
                      });
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900 font-medium"
                >
                  <option value="">Choose a lead...</option>
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.name} - {lead.company}
                    </option>
                  ))}
                </select>
              </div>

              {enhancedData.selectedLeadId && (
                <div className="space-y-6">
                  {/* Business Information */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Business Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Address</label>
                        <input
                          type="text"
                          placeholder="Business Bay, Dubai, UAE"
                          value={enhancedData.address}
                          onChange={(e) => setEnhancedData({...enhancedData, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Industry</label>
                        <input
                          type="text"
                          placeholder="Real Estate, Construction, etc."
                          value={enhancedData.industry}
                          onChange={(e) => setEnhancedData({...enhancedData, industry: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Website</label>
                        <input
                          type="url"
                          placeholder="www.company.com"
                          value={enhancedData.website}
                          onChange={(e) => setEnhancedData({...enhancedData, website: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Employees</label>
                        <input
                          type="number"
                          placeholder="150"
                          value={enhancedData.employees}
                          onChange={(e) => setEnhancedData({...enhancedData, employees: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Annual Revenue</label>
                        <input
                          type="text"
                          placeholder="50M AED"
                          value={enhancedData.annualRevenue}
                          onChange={(e) => setEnhancedData({...enhancedData, annualRevenue: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Credit Limit</label>
                        <input
                          type="number"
                          placeholder="100000"
                          value={enhancedData.creditLimit}
                          onChange={(e) => setEnhancedData({...enhancedData, creditLimit: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media & Online Presence */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Social Media & Online Presence
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">LinkedIn</label>
                        <input
                          type="url"
                          placeholder="linkedin.com/company/name"
                          value={enhancedData.linkedin}
                          onChange={(e) => setEnhancedData({...enhancedData, linkedin: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Twitter</label>
                        <input
                          type="text"
                          placeholder="@companyname"
                          value={enhancedData.twitter}
                          onChange={(e) => setEnhancedData({...enhancedData, twitter: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Instagram</label>
                        <input
                          type="text"
                          placeholder="@companyname"
                          value={enhancedData.instagram}
                          onChange={(e) => setEnhancedData({...enhancedData, instagram: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Intelligence */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Business Intelligence
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Budget Range</label>
                        <input
                          type="text"
                          placeholder="50K-100K AED/month"
                          value={enhancedData.budgetRange}
                          onChange={(e) => setEnhancedData({...enhancedData, budgetRange: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Decision Timeline</label>
                        <input
                          type="text"
                          placeholder="2-3 months"
                          value={enhancedData.decisionTimeline}
                          onChange={(e) => setEnhancedData({...enhancedData, decisionTimeline: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Pain Points</label>
                        <textarea
                          placeholder="Describe the main challenges and pain points..."
                          value={enhancedData.painPoints}
                          onChange={(e) => setEnhancedData({...enhancedData, painPoints: e.target.value})}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Goals & Objectives</label>
                        <textarea
                          placeholder="What are their business goals and objectives..."
                          value={enhancedData.goals}
                          onChange={(e) => setEnhancedData({...enhancedData, goals: e.target.value})}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Competitors</label>
                        <input
                          type="text"
                          placeholder="CleanCorp, ShineServices, etc."
                          value={enhancedData.competitors}
                          onChange={(e) => setEnhancedData({...enhancedData, competitors: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Communication Preferences
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Preferred Contact Method</label>
                        <select
                          value={enhancedData.preferredContactMethod}
                          onChange={(e) => setEnhancedData({...enhancedData, preferredContactMethod: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-gray-900 font-medium"
                        >
                          <option value="Email">Email</option>
                          <option value="Phone">Phone</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="LinkedIn">LinkedIn</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Preferred Contact Time</label>
                        <input
                          type="text"
                          placeholder="9:00 AM - 11:00 AM"
                          value={enhancedData.preferredContactTime}
                          onChange={(e) => setEnhancedData({...enhancedData, preferredContactTime: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Timezone</label>
                        <input
                          type="text"
                          placeholder="GST (UTC+4)"
                          value={enhancedData.timezone}
                          onChange={(e) => setEnhancedData({...enhancedData, timezone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Language</label>
                        <input
                          type="text"
                          placeholder="English, Arabic"
                          value={enhancedData.language}
                          onChange={(e) => setEnhancedData({...enhancedData, language: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Payment Terms</label>
                        <select
                          value={enhancedData.paymentTerms}
                          onChange={(e) => setEnhancedData({...enhancedData, paymentTerms: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-gray-900 font-medium"
                        >
                          <option value="Net 15 days">Net 15 days</option>
                          <option value="Net 30 days">Net 30 days</option>
                          <option value="Net 45 days">Net 45 days</option>
                          <option value="Net 60 days">Net 60 days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-300 flex gap-3">
              <button
                onClick={() => setShowEnhancedDataForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-bold text-sm uppercase transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (enhancedData.selectedLeadId) {
                    setLeads(leads.map(lead =>
                      lead.id === enhancedData.selectedLeadId
                        ? {
                            ...lead,
                            address: enhancedData.address,
                            industry: enhancedData.industry,
                            website: enhancedData.website,
                            employees: parseInt(enhancedData.employees) || lead.employees,
                            annualRevenue: enhancedData.annualRevenue,
                            linkedin: enhancedData.linkedin,
                            twitter: enhancedData.twitter,
                            instagram: enhancedData.instagram,
                            budgetRange: enhancedData.budgetRange,
                            decisionTimeline: enhancedData.decisionTimeline,
                            painPoints: enhancedData.painPoints,
                            goals: enhancedData.goals,
                            competitors: enhancedData.competitors,
                            preferredContactMethod: enhancedData.preferredContactMethod,
                            preferredContactTime: enhancedData.preferredContactTime,
                            timezone: enhancedData.timezone,
                            language: enhancedData.language,
                            paymentTerms: enhancedData.paymentTerms,
                            creditLimit: parseInt(enhancedData.creditLimit) || lead.creditLimit,
                            secondaryContacts: enhancedData.secondaryContacts
                          }
                        : lead
                    ));
                    setShowEnhancedDataForm(false);
                    setEnhancedData({
                      selectedLeadId: null,
                      address: '',
                      industry: '',
                      website: '',
                      employees: '',
                      annualRevenue: '',
                      linkedin: '',
                      twitter: '',
                      instagram: '',
                      budgetRange: '',
                      decisionTimeline: '',
                      painPoints: '',
                      goals: '',
                      competitors: '',
                      preferredContactMethod: 'Email',
                      preferredContactTime: '',
                      timezone: 'GST (UTC+4)',
                      language: 'English',
                      paymentTerms: 'Net 30 days',
                      creditLimit: '',
                      secondaryContacts: []
                    });
                  }
                }}
                disabled={!enhancedData.selectedLeadId}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg font-bold text-sm uppercase transition-all flex items-center justify-center gap-2"
              >
                <Database className="h-4 w-4" />
                Update Client Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Persona Generation Modal */}
      {showAIPersonaModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-300 bg-linear-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-300">
                  <Sparkles className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900">AI Persona Leads</h2>
                  <p className="text-sm text-gray-600">Generated potential leads based on existing client analysis</p>
                </div>
              </div>
              <button onClick={() => setShowAIPersonaModal(false)} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {aiPersonaResults.length > 0 ? (
                <div className="grid gap-4">
                  {aiPersonaResults.map((persona, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-300">
                              <UserCheck className="h-4 w-4 text-purple-700" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{persona.name}</h3>
                              <p className="text-sm text-gray-600">{persona.title} at {persona.company}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="text-xs font-bold text-gray-700 uppercase">Industry</p>
                              <p className="text-sm text-gray-900">{persona.industry}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-700 uppercase">Company Size</p>
                              <p className="text-sm text-gray-900">{persona.employees} employees</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-700 uppercase">Budget Range</p>
                              <p className="text-sm text-gray-900">{persona.budgetRange}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-700 uppercase">Location</p>
                              <p className="text-sm text-gray-900">{persona.address}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-xs font-bold text-gray-700 uppercase">Pain Points</p>
                            <p className="text-sm text-gray-900">{persona.painPoints}</p>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-xs font-bold text-gray-700 uppercase">Goals</p>
                            <p className="text-sm text-gray-900">{persona.goals}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => createLeadFromPersona(persona)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 hover:scale-105"
                        >
                          <Plus className="h-4 w-4" />
                          Create Lead
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No AI-generated personas available</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-300 flex justify-end">
              <button 
                onClick={() => setShowAIPersonaModal(false)} 
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-bold text-sm uppercase transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
