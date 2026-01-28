'use client'

import { useMemo } from 'react'
import { Quotation } from '../lib/quotations-data'
import { FileText, CheckCircle, Clock, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react'

interface Props {
  quotations: Quotation[]
}

export default function QuotationDashboard({ quotations }: Props) {
  const stats = useMemo(() => {
    const total = quotations.length
    const accepted = quotations.filter(q => q.status === 'Accepted').length
    const sent = quotations.filter(q => q.status === 'Sent').length
    const draft = quotations.filter(q => q.status === 'Draft').length
    const totalValue = quotations.reduce((sum, q) => sum + q.amount, 0)
    const conversionRate = total > 0 ? (accepted / total) * 100 : 0

    return { total, accepted, sent, draft, totalValue, conversionRate }
  }, [quotations])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-gray-300 rounded p-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-black rounded">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Total</span>
          </div>
          <p className="text-xl font-bold text-black">{stats.total}</p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-500 rounded">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Accepted</span>
          </div>
          <p className="text-xl font-bold text-black">{stats.accepted}</p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500 rounded">
              <Clock className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Sent</span>
          </div>
          <p className="text-xl font-bold text-black">{stats.sent}</p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-gray-400 rounded">
              <Clock className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Draft</span>
          </div>
          <p className="text-xl font-bold text-black">{stats.draft}</p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-yellow-500 rounded">
              <DollarSign className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Total Value</span>
          </div>
          <p className="text-xl font-bold text-black">{(stats.totalValue / 1000).toFixed(1)}k</p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-purple-500 rounded">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Conversion</span>
          </div>
          <p className="text-xl font-bold text-black">{stats.conversionRate.toFixed(0)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-300 rounded p-4 shadow-none">
          <h3 className="text-[12px] uppercase font-bold text-black mb-4">Recent Quotations</h3>
          <div className="space-y-3">
            {quotations.slice(0, 4).map(q => (
              <div key={q.id} className="flex items-center justify-between p-2 border border-gray-100 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                <div>
                  <p className="text-[13px] font-bold text-black">{q.quoteNumber}</p>
                  <p className="text-[11px] text-gray-500">{q.client} • {q.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-black">{q.amount.toLocaleString()} {q.currency}</p>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    q.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                    q.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {q.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Placeholder */}
        <div className="bg-white border border-gray-300 rounded p-4 shadow-none flex flex-col justify-center items-center text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-3">
             <AlertTriangle className="w-8 h-8 text-gray-300 opacity-50" />
          </div>
          <h3 className="text-sm font-bold text-black mb-1">Analytics Insight</h3>
          <p className="text-xs text-gray-500 max-w-[280px]">
            Your acceptance rate is up by 12% compared to last month. Consider offering early payment discounts to increase liquidity.
          </p>
          <button className="mt-4 px-4 py-2 bg-black text-white text-[11px] uppercase font-bold rounded hover:bg-gray-800 transition-colors">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  )
}
