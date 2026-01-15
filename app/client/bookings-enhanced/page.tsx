'use client'

import { useState, useCallback } from 'react'
import {
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Phone,
  MessageSquare,
  Star,
  User,
  X,
  Trash2,
  Edit2,
  CheckCircle2
} from 'lucide-react'

interface Booking {
  id: string
  service: string
  date: string
  time: string
  status: 'Confirmed' | 'Scheduled' | 'Completed' | 'Cancelled'
  location: string
  address: string
  price: string
  team: string
  rating: number | null
  contactPerson?: string
  phone?: string
}

export default function ClientBookings() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'B001',
      service: 'Deep Cleaning - Villa',
      date: 'Dec 22, 2025',
      time: '10:00 AM',
      status: 'Confirmed',
      location: 'Palm Jumeirah',
      address: 'Villa 45, Palm Jumeirah, Dubai',
      price: 'AED 1,200',
      team: 'Ahmad & Sarah',
      rating: null,
      contactPerson: 'Ahmad Al-Mansouri',
      phone: '+971 50 123 4567'
    },
    {
      id: 'B002',
      service: 'Regular Maintenance',
      date: 'Dec 29, 2025',
      time: '02:00 PM',
      status: 'Scheduled',
      location: 'Palm Jumeirah',
      address: 'Villa 45, Palm Jumeirah, Dubai',
      price: 'AED 800',
      team: 'Pending Assignment',
      rating: null
    },
    {
      id: 'B003',
      service: 'Carpet Cleaning',
      date: 'Dec 15, 2025',
      time: '03:00 PM',
      status: 'Completed',
      location: 'Downtown Dubai',
      address: 'Apt 2401, Downtown Dubai',
      price: 'AED 450',
      team: 'Hassan & Omar',
      rating: 4.8
    },
    {
      id: 'B004',
      service: 'Window Cleaning',
      date: 'Dec 8, 2025',
      time: '09:00 AM',
      status: 'Completed',
      location: 'Marina',
      address: 'Marina Tower, Dubai',
      price: 'AED 600',
      team: 'Fatima & Noor',
      rating: 5.0
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [rescheduleForm, setRescheduleForm] = useState({ date: '', time: '' })
  const [ratingValue, setRatingValue] = useState(0)
  const [comment, setComment] = useState('')

  // Handle reschedule
  const handleOpenReschedule = useCallback((booking: Booking) => {
    setSelectedBooking(booking)
    setShowRescheduleModal(true)
  }, [])

  const handleSaveReschedule = useCallback(() => {
    if (!selectedBooking || !rescheduleForm.date || !rescheduleForm.time) return
    setBookings(prev => prev.map(b =>
      b.id === selectedBooking.id
        ? { ...b, date: rescheduleForm.date, time: rescheduleForm.time }
        : b
    ))
    setShowRescheduleModal(false)
    alert('Booking rescheduled successfully!')
  }, [selectedBooking, rescheduleForm])

  // Handle rating
  const handleOpenRating = useCallback((booking: Booking) => {
    setSelectedBooking(booking)
    setRatingValue(0)
    setComment('')
    setShowRatingModal(true)
  }, [])

  const handleSubmitRating = useCallback(() => {
    if (!selectedBooking || ratingValue === 0) return
    setBookings(prev => prev.map(b =>
      b.id === selectedBooking.id
        ? { ...b, rating: ratingValue }
        : b
    ))
    setShowRatingModal(false)
    alert('Thank you for your rating!')
  }, [selectedBooking, ratingValue])

  // Handle cancel
  const handleCancelBooking = useCallback((id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev.map(b =>
        b.id === id ? { ...b, status: 'Cancelled' } : b
      ))
    }
  }, [])

  // Filter bookings
  const filtered = bookings.filter(b => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus
    const matchesSearch = b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900/30'
      case 'Scheduled': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
      case 'Completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30'
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30'
      default: return 'bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage all your home service bookings</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg">
          <Plus className="h-5 w-5" />
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border">
          <p className="text-xs text-muted-foreground">Upcoming</p>
          <p className="text-2xl font-bold text-blue-600">{bookings.filter(b => ['Confirmed', 'Scheduled'].includes(b.status)).length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'Completed').length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border">
          <p className="text-xs text-muted-foreground">Total Spent</p>
          <p className="text-2xl font-bold">AED 3,650</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No bookings found</p>
          </div>
        ) : (
          filtered.map(booking => (
            <div key={booking.id} className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{booking.service}</h3>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {booking.address}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{booking.price}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {booking.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4" />
                      {booking.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="font-medium flex items-center gap-2 mt-1">
                      <User className="h-4 w-4" />
                      {booking.team}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-medium mt-1">
                      {booking.rating ? (
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {booking.rating}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not rated</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {(booking.status === 'Confirmed' || booking.status === 'Scheduled') && (
                    <button
                      onClick={() => handleOpenReschedule(booking)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Reschedule
                    </button>
                  )}
                  {booking.status === 'Completed' && !booking.rating && (
                    <button
                      onClick={() => handleOpenRating(booking)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Star className="h-4 w-4" />
                      Rate Service
                    </button>
                  )}
                  <button
                    onClick={() => alert('Contact team: ' + booking.phone)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Contact
                  </button>
                  {(booking.status === 'Confirmed' || booking.status === 'Scheduled') && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Reschedule Booking</h3>
              <button onClick={() => setShowRescheduleModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{selectedBooking.service}</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">New Date</label>
                <input
                  type="date"
                  value={rescheduleForm.date}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium">New Time</label>
                <input
                  type="time"
                  value={rescheduleForm.time}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, time: e.target.value })}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReschedule}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Rate Your Service</h3>
              <button onClick={() => setShowRatingModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-3">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => setRatingValue(num)}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          num <= ratingValue
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Comments (Optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRating}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
