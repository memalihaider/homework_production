'use client'

import { useState } from 'react'
import { Quotation } from '../lib/quotations-data'
import { 
  Search, Filter, MoreVertical, Eye, Edit, Trash2, Mail, 
  Download, CheckCircle, Clock, XCircle, AlertCircle
} from 'lucide-react'

interface Props {
  quotations: Quotation[]
  onEdit: (q: Quotation) => void
  onDelete: (id: number) => void
}

export default function QuotationList({ quotations, onEdit, onDelete }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = quotations.filter(q => {
    const matchesSearch = 
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 border border-gray-300 rounded shadow-none">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search quotes, clients, companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black appearance-none bg-white font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-bold uppercase tracking-tight hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Advanced
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-300 rounded overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="px-4 py-3 text-[10px] uppercase font-bold text-gray-500">Quote Info</th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold text-gray-500">Client / Company</th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold text-gray-500">Amount</th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold text-gray-500 text-center">Date</th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold text-gray-500 text-center">Status</th>
                <th className="px-4 py-3 text-[10px] uppercase font-bold text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="font-bold text-[13px] text-black mb-0.5">{q.quoteNumber}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">V{q.version}</span>
                       <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">L.M: {q.lastModified}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-[13px] text-black mb-0.5">{q.client}</p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1.5 font-medium truncate max-w-[200px]">
                      {q.company}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="font-bold text-[13px] text-black mb-0.5">
                      {q.amount.toLocaleString()} {q.currency}
                    </p>
                    {q.discount && q.discount > 0 && (
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-tight">
                        -{q.discount}{q.discountType === 'percentage' ? '%' : ' ' + q.currency} Off
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <p className="text-[11px] font-bold text-gray-700">{q.date}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Valid Until {q.validUntil}</p>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      q.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                      q.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                      q.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      q.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {q.status === 'Accepted' && <CheckCircle className="w-2.5 h-2.5" />}
                      {q.status === 'Sent' && <Clock className="w-2.5 h-2.5" />}
                      {q.status === 'Rejected' && <XCircle className="w-2.5 h-2.5" />}
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button title="View Preview" className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit(q)}
                        title="Edit" className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors" title="Send Quotation">
                        <Mail className="w-4 h-4" />
                      </button>
                      <div className="w-px h-4 bg-gray-200 mx-1"></div>
                      <button 
                         onClick={() => onDelete(q.id)}
                         title="Delete" className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
  )
}
