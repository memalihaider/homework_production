'use client'

import { Reminder } from '../lib/quotations-data'
import { Bell, Clock, AlertTriangle, CheckCircle, Mail, Smartphone, MessageSquare } from 'lucide-react'

interface Props {
  reminders: Reminder[]
}

export default function QuotationReminders({ reminders }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-300 rounded p-4 shadow-none">
        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
          <h3 className="text-[12px] uppercase font-bold text-black flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Active Reminders & Notifications
          </h3>
          <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
            {reminders.length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-black text-gray-400 mb-2 border-l-2 border-red-500 pl-2">Critical Actions</h4>
            {reminders.filter(r => r.status === 'overdue').map(r => (
              <div key={r.id} className="bg-red-50/30 border border-red-100 rounded p-3 flex justify-between items-center group">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[13px] font-bold text-black">{r.documentNumber}</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-600">{r.clientName}</p>
                  <p className="text-[10px] text-red-600 font-bold uppercase mt-1">Overdue Since: {r.dueDate}</p>
                </div>
                <button className="px-3 py-1.5 bg-red-600 text-white text-[10px] uppercase font-bold rounded shadow-sm hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100">
                  Resend Now
                </button>
              </div>
            ))}
            {reminders.filter(r => r.status === 'overdue').length === 0 && (
              <p className="text-[11px] text-gray-400 italic py-4">No critical reminders currently active.</p>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-black text-gray-400 mb-2 border-l-2 border-blue-500 pl-2">Scheduled Follow-ups</h4>
            {reminders.filter(r => r.status !== 'overdue').map(r => (
              <div key={r.id} className="bg-white border border-gray-300 rounded p-3 flex justify-between items-center group shadow-none">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[13px] font-bold text-black">{r.documentNumber}</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-600">{r.clientName}</p>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] text-gray-400 font-bold uppercase text-nowrap">Auto-Send: {r.reminderDate}</span>
                     <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 flex items-center gap-1 uppercase">
                       {r.reminderMethod === 'email' && <Mail className="w-2.5 h-2.5" />}
                       {r.reminderMethod === 'sms' && <Smartphone className="w-2.5 h-2.5" />}
                       {r.reminderMethod === 'whatsapp' && <MessageSquare className="w-2.5 h-2.5" />}
                       {r.reminderMethod}
                     </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {r.reminderSent ? (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase">
                      <CheckCircle className="w-3 h-3" /> Sent
                    </span>
                  ) : (
                    <button className="px-3 py-1.5 border border-gray-300 text-black text-[10px] uppercase font-bold rounded shadow-sm hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
                      Configure
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
