'use client'

import { useState } from 'react'
import { 
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  Send,
  Clock,
  Check,
  AlertCircle,
  ChevronDown,
  Plus
} from 'lucide-react'

export default function Support() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)

  const supportTickets = [
    {
      id: 'TK001',
      subject: 'Question about Deep Cleaning Service',
      category: 'General Inquiry',
      status: 'Resolved',
      created: 'Dec 20, 2025',
      updated: 'Dec 21, 2025',
      priority: 'Normal',
      messages: [
        { author: 'You', time: 'Dec 20, 9:15 AM', message: 'What areas does the deep cleaning service cover?' },
        { author: 'Support Team', time: 'Dec 20, 10:30 AM', message: 'Our deep cleaning service covers all areas within Dubai including villas, apartments, and commercial spaces.' },
        { author: 'You', time: 'Dec 20, 11:00 AM', message: 'Perfect! Thank you for the clarification.' },
      ]
    },
    {
      id: 'TK002',
      subject: 'Booking Cancellation Request',
      category: 'Booking',
      status: 'In Progress',
      created: 'Dec 22, 2025',
      updated: 'Dec 23, 2025',
      priority: 'High',
      messages: [
        { author: 'You', time: 'Dec 22, 2:45 PM', message: 'I need to cancel my booking for Dec 25. Is there a cancellation fee?' },
        { author: 'Support Team', time: 'Dec 22, 3:20 PM', message: 'Thank you for reaching out. Cancellations made more than 24 hours before the service have no fees. Let me process this for you.' },
      ]
    },
    {
      id: 'TK003',
      subject: 'Payment Issue',
      category: 'Billing',
      status: 'Awaiting Your Response',
      created: 'Dec 21, 2025',
      updated: 'Dec 23, 2025',
      priority: 'High',
      messages: [
        { author: 'You', time: 'Dec 21, 1:00 PM', message: 'My payment for invoice INV003 keeps failing. Error code: 5001' },
        { author: 'Support Team', time: 'Dec 21, 1:45 PM', message: 'We\'re investigating this. Could you verify that your card details are up to date?' },
      ]
    }
  ]

  const faqs = [
    {
      id: 1,
      category: 'Bookings',
      question: 'How far in advance should I book a service?',
      answer: 'We recommend booking at least 2-3 days in advance to ensure availability. However, emergency bookings can be accommodated within 24 hours depending on team availability. For recurring services, you can book 30 days in advance.'
    },
    {
      id: 2,
      category: 'Pricing',
      question: 'What factors affect the pricing?',
      answer: 'Pricing depends on several factors: service type, area size, location accessibility, frequency of service, and any special requirements. You\'ll receive a detailed quote before confirming your booking.'
    },
    {
      id: 3,
      category: 'Cancellations',
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made more than 24 hours before service have no charge. Cancellations within 24 hours incur a 50% fee. Cancellations within 2 hours incur a 100% fee. Rescheduling is always free with at least 24 hours notice.'
    },
    {
      id: 4,
      category: 'Services',
      question: 'Do you use eco-friendly cleaning products?',
      answer: 'Yes! We offer both standard and eco-friendly cleaning options. Our eco-friendly products are hypoallergenic, non-toxic, and safe for children and pets. There\'s a small upcharge of AED 100-150 per service.'
    },
    {
      id: 5,
      category: 'Team',
      question: 'Can I request the same team for each service?',
      answer: 'Absolutely! Once you\'ve found a team you\'re comfortable with, you can request them for future bookings. We\'ll do our best to accommodate this request. This helps build continuity and ensures familiarity with your home.'
    },
    {
      id: 6,
      category: 'Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards (Visa, Mastercard, AmEx), bank transfers, and digital wallets. All payments are secure and encrypted. You can save multiple payment methods for convenience.'
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Resolved': return 'bg-green-100 text-green-700'
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Awaiting Your Response': return 'bg-yellow-100 text-yellow-700'
      case 'Closed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-600'
      case 'Normal': return 'text-blue-600'
      case 'Low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Support & Help</h1>
        <p className="text-muted-foreground mt-1">We're here to help. Contact us or find answers to common questions</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 text-white rounded-lg">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Call Us</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Available 8 AM - 10 PM daily</p>
          <p className="font-bold text-lg">+971 4 XXX XXXX</p>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-600 text-white rounded-lg">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Email Us</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Response within 2 hours</p>
          <p className="font-bold">support@homeware.ae</p>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-600 text-white rounded-lg">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Live Chat</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Average wait: 2 minutes</p>
          <button className="font-bold text-purple-600 hover:text-purple-700">Start Chat →</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex gap-2 border-b mb-6">
          <button 
            onClick={() => setSelectedTicket(null)}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
              selectedTicket === null 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Support Tickets
          </button>
          <button 
            onClick={() => setSelectedTicket('faq')}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
              selectedTicket === 'faq' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Support Tickets View */}
        {selectedTicket === null ? (
          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center gap-2 justify-center transition-colors mb-4">
              <Plus className="h-5 w-5" />
              Create New Ticket
            </button>

            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold">{ticket.subject}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{ticket.category} • {ticket.id}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{ticket.updated}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{ticket.messages[ticket.messages.length - 1]?.message.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        ) : (
          /* FAQ View */
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  className="w-full px-4 py-3 flex items-start justify-between gap-3 bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <div className="flex-1">
                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">{faq.category}</p>
                    <p className="font-bold">{faq.question}</p>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                    openFaqId === faq.id ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaqId === faq.id && (
                  <div className="px-4 py-3 bg-white dark:bg-gray-950 border-t">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Form for New Ticket */}
      {selectedTicket === null && (
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Or describe your issue below</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold mb-2 block">Category</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>General Inquiry</option>
                <option>Booking</option>
                <option>Billing</option>
                <option>Quality Issue</option>
                <option>Technical Issue</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold mb-2 block">Subject</label>
              <input 
                type="text" 
                placeholder="Brief subject of your issue"
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-bold mb-2 block">Message</label>
              <textarea 
                placeholder="Describe your issue in detail..."
                rows={5}
                className="w-full px-3 py-2 border rounded-lg bg-background resize-none"
              ></textarea>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors">
              Submit Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  )
}