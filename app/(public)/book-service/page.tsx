'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Building2, 
  Sparkles, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react'

export default function BookService() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    propertyType: '',
    area: '',
    frequency: '',
    date: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your booking request. We will contact you soon!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600" 
            alt="Book Service" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Book Your <span className="text-primary">Service</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ready for a cleaner space? Fill out the form below and our team will get back to you within 2 hours.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 md:p-16">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Personal Info */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+971 50 000 0000"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-pink-50 flex items-center justify-center text-primary">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      Service Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Service Type</label>
                        <select
                          name="service"
                          required
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none"
                          onChange={handleChange}
                        >
                          <option value="">Select Service</option>
                          <option value="residential">Residential Cleaning</option>
                          <option value="commercial">Commercial Cleaning</option>
                          <option value="deep">Deep Cleaning</option>
                          <option value="ac-duct">AC Duct Cleaning</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Property Type</label>
                        <select
                          name="propertyType"
                          required
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none"
                          onChange={handleChange}
                        >
                          <option value="">Select Property Type</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="office">Office</option>
                          <option value="retail">Retail Space</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Preferred Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            required
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Frequency</label>
                        <select
                          name="frequency"
                          required
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none"
                          onChange={handleChange}
                        >
                          <option value="once">One-time Service</option>
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Additional Instructions</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Any specific requirements or instructions?"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button className="w-full px-12 py-6 bg-primary text-white rounded-2xl font-black text-xl hover:bg-pink-600 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group">
                    Confirm Booking Request <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-black mb-6">Why Book With Us?</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Verified Professionals", desc: "All our cleaners are background checked.", icon: ShieldCheck },
                    { title: "Instant Confirmation", desc: "Get a response within 2 hours.", icon: Zap },
                    { title: "Satisfaction Guaranteed", desc: "We clean until you are happy.", icon: CheckCircle2 }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-black text-lg">{item.title}</div>
                        <div className="text-slate-400 text-sm">{item.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-10 bg-pink-50 rounded-[2.5rem] border border-pink-100">
                <h3 className="text-2xl font-black text-slate-900 mb-4">Need Help?</h3>
                <p className="text-slate-600 mb-6 font-medium">
                  Our customer support team is available 24/7 to assist you with your booking.
                </p>
                <div className="space-y-4">
                  <a href="tel:+97141234567" className="flex items-center gap-4 text-slate-900 font-black hover:text-primary transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    +971 4 123 4567
                  </a>
                  <a href="mailto:info@homeworkuae.com" className="flex items-center gap-4 text-slate-900 font-black hover:text-primary transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    info@homeworkuae.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
