'use client'

import { 
  Calendar, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageSquare, 
  Plus, 
  Star, 
  TrendingUp,
  ChevronRight,
  MapPin,
  CheckCircle2
} from 'lucide-react'

export default function ClientDashboard() {
  const upcomingBookings = [
    { id: 'J001', service: 'Deep Cleaning - Villa', date: 'Dec 22, 2025', time: '10:00 AM', status: 'Confirmed', location: 'Palm Jumeirah' },
    { id: 'J002', service: 'Regular Maintenance', date: 'Dec 29, 2025', time: '02:00 PM', status: 'Scheduled', location: 'Palm Jumeirah' }
  ]

  const recentInvoices = [
    { id: 'INV001', service: 'Deep Cleaning', amount: 'AED 1,200', date: 'Dec 15, 2025', status: 'Paid' },
    { id: 'INV002', service: 'Regular Cleaning', amount: 'AED 800', date: 'Dec 10, 2025', status: 'Paid' }
  ]

  const stats = [
    { label: 'Total Bookings', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Upcoming Services', value: '2', icon: Clock, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Total Spent', value: 'AED 15,600', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your home services.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
          <Plus className="h-5 w-5" />
          Book New Service
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-bold">Upcoming Bookings</h3>
            <a href="/client/bookings" className="text-sm text-blue-600 font-medium hover:underline">View All</a>
          </div>
          <div className="p-6 space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="group p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold group-hover:text-blue-600 transition-colors">{booking.service}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {booking.location}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {booking.time}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Invoices</h3>
            <a href="/client/invoices" className="text-sm text-blue-600 font-medium hover:underline">View All</a>
          </div>
          <div className="p-6 space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{invoice.service}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{invoice.amount}</p>
                  <div className="flex items-center justify-end gap-1 text-xs text-green-600 font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    {invoice.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Schedule Service', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', href: '/book-service' },
            { label: 'Contact Support', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', href: '/client/support' },
            { label: 'Billing History', icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', href: '/client/invoices' },
            { label: 'Leave Feedback', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', href: '/client/survey' },
          ].map((action, i) => (
            <a key={i} href={action.href} className="flex flex-col items-center justify-center p-6 rounded-2xl border bg-card hover:bg-muted/50 transition-all group">
              <div className={`p-4 rounded-2xl mb-3 ${action.bg} group-hover:scale-110 transition-transform`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <span className="text-sm font-bold">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}