'use client'

import { Quotation } from '../lib/quotations-data'
import { FileCheck, AlertCircle, CheckCircle, XCircle, Info, ArrowRight } from 'lucide-react'

interface Props {
  quotations: Quotation[]
  onApprove: (id: number) => void
  onReject: (id: number) => void
}

export default function QuotationApproval({ quotations, onApprove, onReject }: Props) {
  const pendingApprovals = quotations.filter(q => q.status === 'Sent' || q.approvalStatus === 'Pending')

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-300 rounded p-4 shadow-none">
        <h3 className="text-[12px] uppercase font-bold text-black mb-1 flex items-center gap-2">
           <FileCheck className="w-4 h-4" />
           Approval Queue
        </h3>
        <p className="text-xs text-gray-500 mb-4 font-medium">Review and process internal quotation approvals before client delivery.</p>

        {pendingApprovals.length > 0 ? (
          <div className="space-y-3">
            {pendingApprovals.map((q) => (
              <div key={q.id} className="bg-white border border-gray-300 rounded overflow-hidden shadow-sm hover:border-black transition-all">
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-gray-50 rounded border border-gray-200">
                      <FileCheck className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-bold text-black">{q.quoteNumber}</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700">
                          Pending Review
                        </span>
                      </div>
                      <p className="text-[12px] font-bold text-gray-600">{q.client} • {q.company}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] uppercase font-bold text-gray-400">
                         <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Amount: {q.amount.toLocaleString()} {q.currency}</span>
                         <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Services: {q.services.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:self-center">
                    <button 
                      onClick={() => onApprove(q.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-[11px] uppercase font-bold rounded hover:bg-gray-800 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button 
                      onClick={() => onReject(q.id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 text-[11px] uppercase font-bold rounded hover:bg-red-50 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded text-gray-400">
                       <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-gray-50/30 border-2 border-dashed border-gray-100 rounded">
            <CheckCircle className="w-8 h-8 text-green-200 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-400">All caught up! No pending approvals.</p>
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50/50 border border-blue-100 rounded p-4 flex gap-3 items-start">
         <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
         <div>
            <p className="text-[12px] font-bold text-blue-900 mb-1 uppercase tracking-tight">System Policy</p>
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              Quotations with discounts exceeding 20% or totals over 50,000 AED require Manager-level approval. Approved documents will be automatically eligible for client distribution via verified communication channels.
            </p>
         </div>
      </div>
    </div>
  )
}
