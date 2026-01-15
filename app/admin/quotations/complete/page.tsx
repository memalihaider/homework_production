'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  Plus, Search, Filter, Download, Send, Trash2, Edit, Eye, X, Mail, Phone,
  FileText, DollarSign, Calendar, User, Building2, MapPin, Percent, Tag,
  ShoppingCart, Settings, FileCheck, Clock, Copy, MessageCircle, Save,
  ChevronDown, Check, AlertCircle, CheckCircle, Eye as EyeIcon,
  MoreVertical, Zap, Mail as MailIcon, MessageSquare, CreditCard, Bell,
  AlertTriangle, CheckCheck, Smartphone, Banknote
} from 'lucide-react'

interface Quotation {
  id: number
  quoteNumber: string
  clientId: number
  client: string
  company: string
  email: string
  phone: string
  location: string
  amount: number
  amountOriginal?: number
  discount?: number
  discountType?: 'percentage' | 'fixed'
  tax?: number
  taxRate?: number
  currency: string
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired' | 'Cancelled'
  date: string
  validUntil: string
  dueDate: string
  paymentMethods: string[]
  template: 'standard' | 'professional' | 'minimal' | 'detailed'
  services: QuotationService[]
  products: QuotationProduct[]
  notes?: string
  terms?: string
  paymentTerms?: string
  version: number
  lastModified: string
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected'
  sentVia?: string[]
  reminderSent?: boolean
  reminderSentDate?: string
}

interface QuotationService {
  id: number
  name: string
  quantity: number
  unitPrice: number
  total: number
  description?: string
}

interface QuotationProduct {
  id: number
  name: string
  quantity: number
  unitPrice: number
  total: number
  sku?: string
}

interface TemplateOption {
  id: string
  name: string
  description: string
  icon: any
}

// Mock data
const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 1,
    quoteNumber: '#QT-001-2025',
    clientId: 1,
    client: 'Ahmed Al-Mansouri',
    company: 'Dubai Properties LLC',
    email: 'ahmed@dubaiprop.ae',
    phone: '+971-50-1111111',
    location: 'Dubai Marina',
    amount: 25500,
    amountOriginal: 30000,
    discount: 15,
    discountType: 'percentage',
    taxRate: 5,
    currency: 'AED',
    status: 'Sent',
    date: '2025-01-10',
    validUntil: '2025-02-10',
    dueDate: '2025-02-10',
    paymentMethods: ['bank-transfer', 'credit-card'],
    template: 'professional',
    services: [
      { id: 1, name: 'Residential Cleaning', quantity: 1, unitPrice: 15000, total: 15000, description: 'Complete residential cleaning' },
      { id: 2, name: 'Deep Cleaning', quantity: 1, unitPrice: 15000, total: 15000, description: 'Deep cleaning service' }
    ],
    products: [
      { id: 1, name: 'Cleaning Supplies Kit', quantity: 2, unitPrice: 500, total: 1000, sku: 'KIT-001' }
    ],
    notes: 'Monthly cleaning services arrangement',
    version: 1,
    lastModified: '2025-01-10',
    approvalStatus: 'Approved',
    sentVia: ['email'],
    reminderSent: false
  },
  {
    id: 2,
    quoteNumber: '#QT-002-2025',
    clientId: 2,
    client: 'Layla Hassan',
    company: 'Paradise Hotels & Resorts',
    email: 'layla@paradisehotels.ae',
    phone: '+971-50-4444444',
    location: 'Palm Jumeirah',
    amount: 102000,
    amountOriginal: 102000,
    discount: 0,
    discountType: 'percentage',
    taxRate: 5,
    currency: 'AED',
    status: 'Accepted',
    date: '2025-01-12',
    validUntil: '2025-02-12',
    dueDate: '2025-02-12',
    paymentMethods: ['bank-transfer', 'installment'],
    template: 'detailed',
    services: [
      { id: 3, name: 'Hotel Maintenance', quantity: 12, unitPrice: 8500, total: 102000, description: 'Monthly maintenance contract' }
    ],
    products: [],
    notes: 'High-value hotel maintenance contract',
    version: 1,
    lastModified: '2025-01-12',
    approvalStatus: 'Approved',
    sentVia: ['email', 'whatsapp'],
    reminderSent: true,
    reminderSentDate: '2025-01-14'
  }
]

const TEMPLATES: TemplateOption[] = [
  { id: 'standard', name: 'Standard', description: 'Clean and simple', icon: FileText },
  { id: 'professional', name: 'Professional', description: 'Corporate look', icon: Building2 },
  { id: 'minimal', name: 'Minimal', description: 'Elegant simplicity', icon: Zap },
  { id: 'detailed', name: 'Detailed', description: 'Full information', icon: ShoppingCart }
]

const AVAILABLE_CLIENTS = [
  { id: 1, name: 'Ahmed Al-Mansouri', company: 'Dubai Properties LLC', email: 'ahmed@dubaiprop.ae', phone: '+971-50-1111111' },
  { id: 2, name: 'Layla Hassan', company: 'Paradise Hotels & Resorts', email: 'layla@paradisehotels.ae', phone: '+971-50-4444444' },
  { id: 3, name: 'Fatima Al-Noor', company: 'Al Noor Logistics', email: 'fatima@alnoorlogistics.ae', phone: '+971-50-2222222' }
]

interface HistoryRecord {
  id: number
  quotationId: number
  quoteNumber: string
  type: 'created' | 'modified' | 'sent' | 'accepted' | 'rejected' | 'invoice_generated' | 'contract_generated'
  timestamp: string
  user: string
  details: string
  metadata?: any
}

interface Reminder {
  id: number
  documentId: number
  documentNumber: string
  documentType: 'quotation' | 'invoice' | 'contract'
  dueDate: string
  reminderDate: string
  reminderSent: boolean
  reminderSentDate?: string
  clientName: string
  amount: number
  status: 'overdue' | 'due-soon' | 'on-time'
  reminderMethod: 'email' | 'sms' | 'whatsapp'
}

const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦' },
  { id: 'credit-card', name: 'Credit Card', icon: '💳' },
  { id: 'cheque', name: 'Cheque', icon: '📄' },
  { id: 'cash', name: 'Cash', icon: '💵' },
  { id: 'online-payment', name: 'Online Payment', icon: '🌐' },
  { id: 'installment', name: 'Installment Plan', icon: '📊' }
]

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS)
  const [activeTab, setActiveTab] = useState<'builder' | 'list' | 'approval' | 'quotation-history' | 'generation-history' | 'invoice-history' | 'contract-history' | 'notifications'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [history, setHistory] = useState<HistoryRecord[]>([
    { id: 1, quotationId: 1, quoteNumber: '#QT-001-2025', type: 'created', timestamp: '2025-01-10 10:30 AM', user: 'Ahmed Al-Mazrouei', details: 'Quotation created for Ahmed Al-Mansouri', metadata: { amount: 25500, status: 'Draft' } },
    { id: 2, quotationId: 1, quoteNumber: '#QT-001-2025', type: 'modified', timestamp: '2025-01-10 11:45 AM', user: 'Ahmed Al-Mazrouei', details: 'Applied 15% discount and updated pricing', metadata: { discount: 15, originalAmount: 30000 } },
    { id: 3, quotationId: 1, quoteNumber: '#QT-001-2025', type: 'sent', timestamp: '2025-01-10 02:00 PM', user: 'Ahmed Al-Mazrouei', details: 'Quotation sent via Email', metadata: { method: 'email', recipient: 'ahmed@dubaiprop.ae' } },
    { id: 4, quotationId: 1, quoteNumber: '#QT-001-2025', type: 'invoice_generated', timestamp: '2025-01-12 09:15 AM', user: 'Fatima Al-Ketbi', details: 'Invoice #INV-001-2025 generated from quotation', metadata: { invoiceNumber: 'INV-001-2025', amount: 25500 } },
    { id: 5, quotationId: 1, quoteNumber: '#QT-001-2025', type: 'contract_generated', timestamp: '2025-01-12 10:30 AM', user: 'Fatima Al-Ketbi', details: 'Contract generated for execution', metadata: { contractNumber: 'CTR-001-2025', documentUrl: '/contracts/CTR-001-2025.pdf' } },
    { id: 6, quotationId: 2, quoteNumber: '#QT-002-2025', type: 'created', timestamp: '2025-01-12 08:00 AM', user: 'Hassan Al-Mazrouei', details: 'Quotation created for Paradise Hotels', metadata: { amount: 102000, status: 'Draft' } },
    { id: 7, quotationId: 2, quoteNumber: '#QT-002-2025', type: 'sent', timestamp: '2025-01-12 03:30 PM', user: 'Hassan Al-Mazrouei', details: 'Quotation sent via Email and WhatsApp', metadata: { methods: ['email', 'whatsapp'], recipient: 'layla@paradisehotels.ae' } },
    { id: 8, quotationId: 2, quoteNumber: '#QT-002-2025', type: 'accepted', timestamp: '2025-01-13 09:00 AM', user: 'System', details: 'Quotation accepted by client', metadata: { acceptanceDate: '2025-01-13', acceptedBy: 'Layla Hassan' } }
  ])
  const [showBuilder, setShowBuilder] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp' | null>(null)
  const [editingQuotationId, setEditingQuotationId] = useState<number | null>(null)

  const [builderForm, setBuilderForm] = useState<Partial<Quotation>>({
    template: 'professional',
    services: [],
    products: [],
    currency: 'AED',
    taxRate: 5,
    discount: 0,
    discountType: 'percentage',
    paymentMethods: ['bank-transfer']
  })
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, documentId: 1, documentNumber: '#QT-001-2025', documentType: 'quotation', dueDate: '2025-02-10', reminderDate: '2025-02-03', reminderSent: false, clientName: 'Ahmed Al-Mansouri', amount: 25500, status: 'due-soon', reminderMethod: 'email' },
    { id: 2, documentId: 2, documentNumber: '#QT-002-2025', documentType: 'quotation', dueDate: '2025-02-12', reminderDate: '2025-02-05', reminderSent: true, reminderSentDate: '2025-01-14', clientName: 'Layla Hassan', amount: 102000, status: 'on-time', reminderMethod: 'email' },
    { id: 3, documentId: 1, documentNumber: '#INV-001-2025', documentType: 'invoice', dueDate: '2025-02-12', reminderDate: '2025-02-05', reminderSent: false, clientName: 'Ahmed Al-Mansouri', amount: 25500, status: 'due-soon', reminderMethod: 'email' }
  ])

  // Filter quotations
  const filteredQuotations = useMemo(() => {
    return quotations.filter(q =>
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [quotations, searchTerm])

  // Statistics
  const stats = useMemo(() => ({
    total: quotations.length,
    draft: quotations.filter(q => q.status === 'Draft').length,
    sent: quotations.filter(q => q.status === 'Sent').length,
    accepted: quotations.filter(q => q.status === 'Accepted').length,
    totalValue: quotations.reduce((sum, q) => sum + q.amount, 0)
  }), [quotations])

  const handleEditQuotation = (quotation: Quotation) => {
    setEditingQuotationId(quotation.id)
    setBuilderForm({
      ...quotation,
      clientId: quotation.clientId
    })
    setActiveTab('builder')
  }

  const handleDeleteQuotation = (quotationId: number) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      setQuotations(quotations.filter(q => q.id !== quotationId))
      alert('Quotation deleted successfully!')
    }
  }

  const handleSaveQuotation = useCallback(() => {
    if (!builderForm.client || !builderForm.email) {
      alert('Please fill in client details')
      return
    }

    if (editingQuotationId) {
      // Update existing quotation
      const updated = quotations.map(q =>
        q.id === editingQuotationId
          ? {
              ...q,
              ...builderForm,
              client: builderForm.client || '',
              company: builderForm.company || '',
              email: builderForm.email || '',
              phone: builderForm.phone || '',
              location: builderForm.location || '',
              amount: calculateTotal(),
              amountOriginal: calculateSubtotal(),
              services: builderForm.services || [],
              products: builderForm.products || [],
              lastModified: new Date().toISOString().split('T')[0],
              version: q.version + 1
            }
          : q
      )
      setQuotations(updated)
      setEditingQuotationId(null)
      alert('Quotation updated successfully!')
    } else {
      // Create new quotation with automatic 30-day due date
      const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const newQuote: Quotation = {
        id: Math.max(...quotations.map(q => q.id), 0) + 1,
        quoteNumber: `#QT-${String(quotations.length + 1).padStart(3, '0')}-2025`,
        clientId: builderForm.clientId || 1,
        client: builderForm.client || '',
        company: builderForm.company || '',
        email: builderForm.email || '',
        phone: builderForm.phone || '',
        location: builderForm.location || '',
        amount: calculateTotal(),
        amountOriginal: calculateSubtotal(),
        discount: builderForm.discount || 0,
        discountType: builderForm.discountType || 'percentage',
        taxRate: builderForm.taxRate || 5,
        currency: builderForm.currency || 'AED',
        status: 'Draft',
        date: new Date().toISOString().split('T')[0],
        validUntil: dueDate,
        dueDate: dueDate,
        paymentMethods: builderForm.paymentMethods || ['bank-transfer'],
        template: builderForm.template as any || 'professional',
        services: builderForm.services || [],
        products: builderForm.products || [],
        notes: builderForm.notes,
        terms: builderForm.terms,
        paymentTerms: builderForm.paymentTerms,
        version: 1,
        lastModified: new Date().toISOString().split('T')[0],
        approvalStatus: 'Pending',
        reminderSent: false
      }

      setQuotations([...quotations, newQuote])
      alert('Quotation created successfully with 30-day payment due date!')
    }
    
    setShowBuilder(false)
    setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5, paymentMethods: ['bank-transfer'] })
  }, [builderForm, quotations, editingQuotationId])

  const calculateSubtotal = () => {
    const servicesTotal = (builderForm.services || []).reduce((sum, s) => sum + (s.total || 0), 0)
    const productsTotal = (builderForm.products || []).reduce((sum, p) => sum + (p.total || 0), 0)
    return servicesTotal + productsTotal
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    let discountAmount = 0
    if (builderForm.discountType === 'percentage') {
      discountAmount = (subtotal * (builderForm.discount || 0)) / 100
    } else {
      discountAmount = builderForm.discount || 0
    }
    const afterDiscount = subtotal - discountAmount
    const tax = (afterDiscount * (builderForm.taxRate || 5)) / 100
    return afterDiscount + tax
  }

  const handleSendQuotation = (method: 'email' | 'whatsapp') => {
    if (!selectedQuotation) return
    
    const updatedQuotes = quotations.map(q =>
      q.id === selectedQuotation.id
        ? {
            ...q,
            status: 'Sent' as const,
            sentVia: [...(q.sentVia || []), method]
          }
        : q
    )
    setQuotations(updatedQuotes)
    setShowSendModal(false)
    alert(`Quotation sent via ${method === 'email' ? 'Email' : 'WhatsApp'}!`)
  }

  const handleApproveQuotation = (quotationId: number) => {
    const updated = quotations.map(q =>
      q.id === quotationId ? { ...q, approvalStatus: 'Approved' as const } : q
    )
    setQuotations(updated)
    alert('Quotation approved!')
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Expired': 'bg-yellow-100 text-yellow-800',
      'Cancelled': 'bg-slate-100 text-slate-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getApprovalColor = (status?: string) => {
    const colors: Record<string, string> = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    }
    return colors[status || 'Pending'] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quotations Management</h1>
        <p className="text-sm text-gray-600 mt-1">Create, edit, and manage quotations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-gray-600 text-xs font-medium">Total</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-gray-600 text-xs font-medium">Draft</p>
          <p className="text-xl font-bold text-gray-500 mt-1">{stats.draft}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-gray-600 text-xs font-medium">Sent</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{stats.sent}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-gray-600 text-xs font-medium">Total Value</p>
          <p className="text-lg font-bold text-green-600 mt-1">AED {(stats.totalValue / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'builder'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Plus className="w-3 h-3 inline mr-1" />
            Builder
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'list'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-3 h-3 inline mr-1" />
            Quotations
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'approval'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Approvals
          </button>
          <button
            onClick={() => setActiveTab('quotation-history')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'quotation-history'
                ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-3 h-3 inline mr-1" />
            Quotation History
          </button>
          <button
            onClick={() => setActiveTab('generation-history')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'generation-history'
                ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Zap className="w-3 h-3 inline mr-1" />
            Generation
          </button>
          <button
            onClick={() => setActiveTab('invoice-history')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'invoice-history'
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileCheck className="w-3 h-3 inline mr-1" />
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('contract-history')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'contract-history'
                ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tag className="w-3 h-3 inline mr-1" />
            Contracts
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 font-medium text-sm text-center transition-colors whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'bg-red-50 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="w-3 h-3 inline mr-1" />
            Notifications
            {reminders.filter(r => !r.reminderSent).length > 0 && (
              <span className="flex ml-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 items-center justify-center">
                {reminders.filter(r => !r.reminderSent).length}
              </span>
            )}
          </button>
        </div>

        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">{editingQuotationId ? 'Edit Quotation' : 'Create Quotation'}</h2>
              {editingQuotationId && (
                <button
                  onClick={() => {
                    setEditingQuotationId(null)
                    setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5 })
                    setActiveTab('list')
                  }}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">Select Template</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setBuilderForm({ ...builderForm, template: template.id as any })}
                    className={`p-2 rounded border-2 transition-all text-center ${
                      builderForm.template === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 text-xs">{template.name}</p>
                    <p className="text-xs text-gray-600">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-gray-900 text-sm">Client Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="md:col-span-1">
                  <label className="block text-xs font-medium text-gray-900 mb-1">Client *</label>
                  <select
                    value={builderForm.clientId || ''}
                    onChange={(e) => {
                      const client = AVAILABLE_CLIENTS.find(c => c.id === parseInt(e.target.value))
                      if (client) {
                        setBuilderForm({
                          ...builderForm,
                          clientId: client.id,
                          client: client.name,
                          company: client.company,
                          email: client.email,
                          phone: client.phone
                        })
                      }
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select a client</option>
                    {AVAILABLE_CLIENTS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">Company</label>
                  <input
                    type="text"
                    value={builderForm.company || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, company: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    value={builderForm.email || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, email: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    disabled
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-gray-900 mb-1">Location</label>
                  <input
                    type="text"
                    value={builderForm.location || ''}
                    onChange={(e) => setBuilderForm({ ...builderForm, location: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-gray-900 text-sm">Services</h3>
              <button
                onClick={() => {
                  const newService: QuotationService = {
                    id: Math.random(),
                    name: '',
                    quantity: 1,
                    unitPrice: 0,
                    total: 0
                  }
                  setBuilderForm({
                    ...builderForm,
                    services: [...(builderForm.services || []), newService]
                  })
                }}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 font-medium"
              >
                <Plus className="w-3 h-3" />
                Add Service
              </button>
              <div className="space-y-2">
                {(builderForm.services || []).map((service, idx) => (
                  <div key={service.id} className="p-3 border border-gray-200 rounded bg-gray-50 space-y-2">
                    <div className="grid grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Service name"
                        value={service.name}
                        onChange={(e) => {
                          const updated = [...(builderForm.services || [])]
                          updated[idx].name = e.target.value
                          setBuilderForm({ ...builderForm, services: updated })
                        }}
                        className="col-span-2 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={service.quantity}
                        onChange={(e) => {
                          const updated = [...(builderForm.services || [])]
                          updated[idx].quantity = parseInt(e.target.value) || 0
                          updated[idx].total = updated[idx].quantity * updated[idx].unitPrice
                          setBuilderForm({ ...builderForm, services: updated })
                        }}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={service.unitPrice}
                        onChange={(e) => {
                          const updated = [...(builderForm.services || [])]
                          updated[idx].unitPrice = parseInt(e.target.value) || 0
                          updated[idx].total = updated[idx].quantity * updated[idx].unitPrice
                          setBuilderForm({ ...builderForm, services: updated })
                        }}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Total"
                        value={service.total}
                        disabled
                        className="px-2 py-1 border border-gray-300 rounded text-sm bg-gray-100"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const updated = (builderForm.services || []).filter((_, i) => i !== idx)
                        setBuilderForm({ ...builderForm, services: updated })
                      }}
                      className="text-red-600 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-gray-900 text-sm">Pricing</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">Discount</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={builderForm.discount || 0}
                      onChange={(e) => setBuilderForm({ ...builderForm, discount: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <select
                      value={builderForm.discountType || 'percentage'}
                      onChange={(e) => setBuilderForm({ ...builderForm, discountType: e.target.value as any })}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">AED</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1">Tax Rate %</label>
                  <input
                    type="number"
                    value={builderForm.taxRate || 5}
                    onChange={(e) => setBuilderForm({ ...builderForm, taxRate: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">AED {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  {(builderForm.discount || 0) > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount:</span>
                      <span>-AED {(calculateSubtotal() * (builderForm.discount || 0) / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-blue-200 mt-1">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-sm">AED {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-gray-900 text-sm">Payment Methods</h3>
              <p className="text-xs text-gray-600 mb-3">Select payment methods accepted for this quotation</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {PAYMENT_METHODS.map(method => (
                  <label key={method.id} className="flex items-center gap-2 p-2 border border-gray-300 rounded cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={(builderForm.paymentMethods || []).includes(method.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBuilderForm({
                            ...builderForm,
                            paymentMethods: [...(builderForm.paymentMethods || []), method.id]
                          })
                        } else {
                          setBuilderForm({
                            ...builderForm,
                            paymentMethods: (builderForm.paymentMethods || []).filter(m => m !== method.id)
                          })
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-xs font-medium text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>
              <div className="bg-green-50 p-3 rounded mt-3 border border-green-200">
                <p className="text-xs text-green-800 font-semibold">
                  💳 Selected: {(builderForm.paymentMethods || []).map(id => PAYMENT_METHODS.find(m => m.id === id)?.name).filter(Boolean).join(', ') || 'No payment methods selected'}
                </p>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-gray-900 text-sm">Additional Information</h3>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1">Notes</label>
                <textarea
                  value={builderForm.notes || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, notes: e.target.value })}
                  rows={2}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Additional notes..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1">Payment Terms</label>
                <textarea
                  value={builderForm.paymentTerms || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, paymentTerms: e.target.value })}
                  rows={2}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Payment terms..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-3 flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowBuilder(false)
                  setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5 })
                }}
                className="px-4 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 font-medium flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                Preview
              </button>
              <button
                onClick={handleSaveQuotation}
                className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                Save
              </button>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="p-6 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search quotations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <button
                onClick={() => {
                  setBuilderForm({ template: 'professional', services: [], products: [], currency: 'AED', taxRate: 5 })
                  setActiveTab('builder')
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                New Quote
              </button>
            </div>

            <div className="space-y-2">
              {filteredQuotations.length > 0 ? (
                filteredQuotations.map(quotation => (
                  <div key={quotation.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all hover:border-blue-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      {/* Quote Info */}
                      <div className="md:col-span-3">
                        <h3 className="font-bold text-gray-900 text-sm">{quotation.quoteNumber}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{quotation.client}</p>
                        <p className="text-xs text-gray-500">{quotation.company}</p>
                      </div>

                      {/* Amount & Dates */}
                      <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500">Amount</p>
                          <p className="font-semibold text-gray-900">AED {quotation.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold text-gray-900">{quotation.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Expires</p>
                          <p className="font-semibold text-gray-900">{quotation.validUntil}</p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="md:col-span-2 flex gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(quotation.status)}`}>
                          {quotation.status}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getApprovalColor(quotation.approvalStatus)}`}>
                          {quotation.approvalStatus}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-3 flex gap-2">
                        <button
                          onClick={() => setSelectedQuotation(quotation)}
                          className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium"
                        >
                          <EyeIcon className="w-3 h-3 inline mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuotation(quotation)
                            setShowSendModal(true)
                          }}
                          className="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium"
                        >
                          <Send className="w-3 h-3 inline mr-1" />
                          Send
                        </button>
                        <button
                          onClick={() => handleEditQuotation(quotation)}
                          className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 font-medium"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuotation(quotation.id)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-900 font-medium">No quotations found</p>
                  <p className="text-sm text-gray-600">Try adjusting your search or create a new quotation</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Approval Tab */}
        {activeTab === 'approval' && (
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Quotation Approvals</h2>
            <div className="space-y-2">
              {quotations.filter(q => q.approvalStatus === 'Pending').length > 0 ? (
                quotations
                  .filter(q => q.approvalStatus === 'Pending')
                  .map(quotation => (
                    <div key={quotation.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-3">
                          <h3 className="font-bold text-gray-900 text-sm">{quotation.quoteNumber}</h3>
                          <p className="text-xs text-gray-600">{quotation.client}</p>
                        </div>

                        <div className="md:col-span-4 grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-gray-600">Amount</p>
                            <p className="font-bold">AED {quotation.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Created</p>
                            <p className="font-semibold">{quotation.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Services</p>
                            <p className="font-semibold">{quotation.services.length}</p>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Pending Review
                          </span>
                        </div>

                        <div className="md:col-span-3 flex gap-2">
                          <button
                            onClick={() => handleApproveQuotation(quotation.id)}
                            className="flex-1 px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 font-medium flex items-center justify-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Approve
                          </button>
                          <button className="flex-1 px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-medium flex items-center justify-center gap-1">
                            <X className="w-3 h-3" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-300" />
                  <p className="text-gray-900 font-medium text-sm">All quotations approved!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quotation History Tab */}
        {activeTab === 'quotation-history' && (
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Quotation Activity History</h2>
            <div className="space-y-3">
              {history.filter(h => ['created', 'modified', 'sent', 'accepted', 'rejected'].includes(h.type)).length > 0 ? (
                history
                  .filter(h => ['created', 'modified', 'sent', 'accepted', 'rejected'].includes(h.type))
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(record => (
                    <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Quote Number</p>
                          <p className="font-bold text-gray-900">{record.quoteNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Activity Type</p>
                          <div className="flex gap-1 items-center mt-1">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                              record.type === 'created' ? 'bg-blue-100 text-blue-700' :
                              record.type === 'modified' ? 'bg-amber-100 text-amber-700' :
                              record.type === 'sent' ? 'bg-green-100 text-green-700' :
                              record.type === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Timestamp</p>
                          <p className="font-semibold text-gray-900 text-sm">{record.timestamp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Performed By</p>
                          <p className="font-semibold text-gray-900">{record.user}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Details</p>
                          <p className="text-sm text-gray-700">{record.details}</p>
                        </div>
                      </div>
                      {record.metadata && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600 font-semibold mb-2">Metadata:</p>
                          <pre className="bg-gray-50 p-2 rounded text-xs text-gray-600 overflow-auto">
                            {JSON.stringify(record.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-900 font-medium text-sm">No activity history found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generation History Tab */}
        {activeTab === 'generation-history' && (
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Quotation Generation History</h2>
            <div className="space-y-3">
              {history.filter(h => h.type === 'created' || h.type === 'modified').length > 0 ? (
                history
                  .filter(h => h.type === 'created' || h.type === 'modified')
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(record => (
                    <div key={record.id} className="bg-white border border-purple-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Quote Number</p>
                          <p className="font-bold text-gray-900">{record.quoteNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Generated By</p>
                          <p className="font-semibold text-gray-900">{record.user}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Date & Time</p>
                          <p className="font-semibold text-gray-900 text-sm">{record.timestamp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Action</p>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-100 text-purple-700 inline-block mt-1">
                            {record.type === 'created' ? '✨ Created' : '✏️ Modified'}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Description</p>
                          <p className="text-sm text-gray-700">{record.details}</p>
                        </div>
                      </div>
                      {record.metadata && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600 font-semibold mb-2">Generation Details:</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            {Object.entries(record.metadata).map(([key, value]) => (
                              <div key={key} className="bg-purple-50 p-2 rounded">
                                <p className="text-gray-600 text-xs font-semibold">{key}</p>
                                <p className="font-bold text-gray-900">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-900 font-medium text-sm">No generation history found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invoice History Tab */}
        {activeTab === 'invoice-history' && (
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Invoice Generation History</h2>
            <div className="space-y-3">
              {history.filter(h => h.type === 'invoice_generated').length > 0 ? (
                history
                  .filter(h => h.type === 'invoice_generated')
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(record => (
                    <div key={record.id} className="bg-white border border-orange-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Quote Number</p>
                          <p className="font-bold text-gray-900">{record.quoteNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Invoice Number</p>
                          <p className="font-bold text-orange-600">{record.metadata?.invoiceNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Generated On</p>
                          <p className="font-semibold text-gray-900 text-sm">{record.timestamp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Amount</p>
                          <p className="font-bold text-gray-900">AED {record.metadata?.amount?.toLocaleString() || '0'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Generated By</p>
                          <p className="font-semibold text-gray-900">{record.user}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                        <button className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 font-medium flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Download Invoice
                        </button>
                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Email Invoice
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <FileCheck className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-900 font-medium text-sm">No invoice records found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contract Builder History Tab */}
        {activeTab === 'contract-history' && (
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Contract Builder History</h2>
            <div className="space-y-3">
              {history.filter(h => h.type === 'contract_generated').length > 0 ? (
                history
                  .filter(h => h.type === 'contract_generated')
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(record => (
                    <div key={record.id} className="bg-white border border-red-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Quote Number</p>
                          <p className="font-bold text-gray-900">{record.quoteNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Contract Number</p>
                          <p className="font-bold text-red-600">{record.metadata?.contractNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Generated On</p>
                          <p className="font-semibold text-gray-900 text-sm">{record.timestamp}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700 inline-block mt-1">Ready for Execution</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold uppercase">Built By</p>
                          <p className="font-semibold text-gray-900">{record.user}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                        <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Download Contract
                        </button>
                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium flex items-center gap-1">
                          <Send className="w-3 h-3" />
                          Send for Signature
                        </button>
                        <button className="px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded hover:bg-amber-200 font-medium flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Preview
                        </button>
                        <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium flex items-center gap-1">
                          <Copy className="w-3 h-3" />
                          Duplicate
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <Tag className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-900 font-medium text-sm">No contract records found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notifications & Reminders Tab */}
        {activeTab === 'notifications' && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">📬 Payment Reminders & Notifications</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                  {reminders.filter(r => r.status === 'overdue').length} Overdue
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                  {reminders.filter(r => r.status === 'due-soon').length} Due Soon
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {reminders.length > 0 ? (
                reminders
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map(reminder => {
                    const isOverdue = new Date(reminder.dueDate) < new Date()
                    const isDueSoon = !isOverdue && (new Date(reminder.dueDate).getTime() - Date.now()) < 7 * 24 * 60 * 60 * 1000
                    
                    return (
                      <div
                        key={reminder.id}
                        className={`border-l-4 rounded-lg p-4 flex justify-between items-start ${
                          isOverdue
                            ? 'border-l-red-600 bg-red-50 border border-red-200'
                            : isDueSoon
                            ? 'border-l-amber-600 bg-amber-50 border border-amber-200'
                            : 'border-l-green-600 bg-green-50 border border-green-200'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-bold px-2 py-1 rounded ${
                              reminder.documentType === 'quotation' ? 'bg-blue-100 text-blue-700' :
                              reminder.documentType === 'invoice' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {reminder.documentType.toUpperCase()}
                            </span>
                            <h3 className="text-sm font-bold text-gray-900">{reminder.documentNumber}</h3>
                            {isOverdue && <AlertTriangle className="w-4 h-4 text-red-600" />}
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Client:</strong> {reminder.clientName}
                          </p>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Amount:</strong> AED {reminder.amount.toLocaleString()}
                          </p>
                          <div className="flex gap-3 text-xs text-gray-600">
                            <span>📅 Due: {reminder.dueDate}</span>
                            <span>⏰ Reminder: {reminder.reminderDate}</span>
                            <span className={`font-semibold ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-amber-600' : 'text-green-600'}`}>
                              {isOverdue ? '🔴 OVERDUE' : isDueSoon ? '🟡 DUE SOON' : '🟢 ON TIME'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={() => {
                              const updated = reminders.map(r =>
                                r.id === reminder.id
                                  ? { ...r, reminderSent: true, reminderSentDate: new Date().toISOString().split('T')[0] }
                                  : r
                              )
                              setReminders(updated)
                              alert(`Reminder sent via ${reminder.reminderMethod === 'email' ? '📧 Email' : reminder.reminderMethod === 'sms' ? '📱 SMS' : '💬 WhatsApp'}!`)
                            }}
                            disabled={reminder.reminderSent}
                            className={`px-3 py-1 text-xs rounded font-medium flex items-center gap-1 whitespace-nowrap ${
                              reminder.reminderSent
                                ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            <Send className="w-3 h-3" />
                            {reminder.reminderSent ? 'Sent' : 'Send Reminder'}
                          </button>
                          
                          <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Details
                          </button>

                          {reminder.reminderSent && reminder.reminderSentDate && (
                            <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-300 text-center">
                              ✓ Sent {reminder.reminderSentDate}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-900 font-medium text-sm">No reminders needed</p>
                  <p className="text-gray-600 text-xs mt-1">All quotations, invoices, and contracts are on schedule</p>
                </div>
              )}
            </div>

            {/* Reminder Settings */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-4">⚙️ Reminder Settings</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2">📧 Email Reminders</p>
                  <p className="text-xs text-blue-800 mb-3">Automatically send payment reminders 7 days before due date</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-xs text-blue-900 font-medium">Enabled</span>
                  </label>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-2">💬 SMS/WhatsApp Reminders</p>
                  <p className="text-xs text-green-800 mb-3">Send SMS/WhatsApp on due date and after</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-xs text-green-900 font-medium">Enabled</span>
                  </label>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm font-semibold text-orange-900 mb-2">🔔 Overdue Notifications</p>
                  <p className="text-xs text-orange-800 mb-3">Daily reminders for overdue payments</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-xs text-orange-900 font-medium">Enabled</span>
                  </label>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-2">📞 Escalation Reminders</p>
                  <p className="text-xs text-red-800 mb-3">Notify manager for overdue beyond 30 days</p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-xs text-red-900 font-medium">Enabled</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Send Modal */}
      {showSendModal && selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Send Quotation</h2>
              <button onClick={() => setShowSendModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Quote Number</p>
                <p className="font-bold text-gray-900">{selectedQuotation.quoteNumber}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleSendQuotation('email')}
                  className="w-full px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-semibold flex items-center justify-center gap-2 border-2 border-blue-300"
                >
                  <MailIcon className="w-5 h-5" />
                  Send via Email
                </button>
                <button
                  onClick={() => handleSendQuotation('whatsapp')}
                  className="w-full px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-semibold flex items-center justify-center gap-2 border-2 border-green-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </button>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
                <p className="font-semibold mb-1">📧 Email to: {selectedQuotation.email}</p>
                <p>📱 WhatsApp to: {selectedQuotation.phone}</p>
              </div>

              <button
                onClick={() => setShowSendModal(false)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center sticky top-0">
              <h2 className="text-xl font-bold">Quotation Preview</h2>
              <button onClick={() => setShowPreview(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="mb-8 pb-6 border-b-2 border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">QUOTATION</h1>
                <p className="text-lg text-blue-600 font-semibold">Quote #{`QT-${quotations.length + 1}-2025`}</p>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Bill To</p>
                  <p className="font-bold text-gray-900 text-lg">{builderForm.client}</p>
                  <p className="text-gray-600">{builderForm.company}</p>
                  <p className="text-gray-600">{builderForm.email}</p>
                  <p className="text-gray-600">{builderForm.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-semibold">Quote Details</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Date: </span>
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Valid Until: </span>
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Services Table */}
              {(builderForm.services || []).length > 0 && (
                <div className="mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-3 text-gray-900 font-semibold">Description</th>
                        <th className="text-center py-2 px-3 text-gray-900 font-semibold">Qty</th>
                        <th className="text-right py-2 px-3 text-gray-900 font-semibold">Unit Price</th>
                        <th className="text-right py-2 px-3 text-gray-900 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(builderForm.services || []).map(service => (
                        <tr key={service.id} className="border-b border-gray-200">
                          <td className="py-3 px-3 text-gray-700">{service.name}</td>
                          <td className="py-3 px-3 text-center text-gray-700">{service.quantity}</td>
                          <td className="py-3 px-3 text-right text-gray-700">AED {service.unitPrice.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right text-gray-900 font-semibold">AED {service.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-80 space-y-2">
                  <div className="flex justify-between text-gray-700 pb-2 border-b border-gray-200">
                    <span>Subtotal</span>
                    <span className="font-semibold">AED {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  {(builderForm.discount || 0) > 0 && (
                    <div className="flex justify-between text-red-600 pb-2 border-b border-gray-200">
                      <span>Discount ({builderForm.discountType === 'percentage' ? `${builderForm.discount}%` : `AED ${builderForm.discount}`})</span>
                      <span>-AED {((calculateSubtotal() * (builderForm.discount || 0)) / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700 pb-2 border-b border-gray-200">
                    <span>Tax ({builderForm.taxRate}%)</span>
                    <span>AED {(((calculateSubtotal() - ((calculateSubtotal() * (builderForm.discount || 0)) / 100)) * (builderForm.taxRate || 5)) / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>AED {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {builderForm.notes && (
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Notes</p>
                  <p className="text-gray-700">{builderForm.notes}</p>
                </div>
              )}

              {/* Payment Terms */}
              {builderForm.paymentTerms && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900 font-semibold mb-2">Payment Terms</p>
                  <p className="text-blue-800">{builderForm.paymentTerms}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
