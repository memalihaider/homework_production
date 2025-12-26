import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Globe,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1600" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Get in <span className="text-primary">Touch</span></h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions or ready to book? We're here to help you create a cleaner, healthier environment.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</div>
                      <div className="text-lg font-black text-slate-900">+971 4 123 4567</div>
                      <div className="text-slate-500 font-medium">Toll Free: 800 HOMEWORK</div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</div>
                      <div className="text-lg font-black text-slate-900">info@homeworkuae.com</div>
                      <div className="text-slate-500 font-medium">support@homeworkuae.com</div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Visit Us</div>
                      <div className="text-lg font-black text-slate-900">Business Bay, Dubai</div>
                      <div className="text-slate-500 font-medium">United Arab Emirates</div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Working Hours</div>
                      <div className="text-lg font-black text-slate-900">Mon - Sat: 8AM - 8PM</div>
                      <div className="text-slate-500 font-medium">Sunday: Closed</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-slate-200">
                  <div className="flex gap-4">
                    {[Instagram, Facebook, Twitter, Globe].map((Icon, i) => (
                      <a key={i} href="#" className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-10 md:p-16 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                <div className="max-w-2xl">
                  <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Send a Message</h2>
                  <h3 className="text-4xl font-black text-slate-900 mb-8">How Can We Help?</h3>
                  
                  <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+971 50 000 0000"
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Service Type</label>
                        <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium appearance-none">
                          <option>Residential Cleaning</option>
                          <option>Commercial Cleaning</option>
                          <option>Deep Cleaning</option>
                          <option>AC Duct Cleaning</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-wider">Your Message</label>
                      <textarea 
                        rows={6}
                        placeholder="Tell us about your requirements..."
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
                      ></textarea>
                    </div>

                    <button className="w-full md:w-auto px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-pink-600 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                      Send Message <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-125 bg-slate-100 relative">
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-slate-600 font-bold">Interactive Map Integration</p>
          </div>
        </div>
      </section>
    </div>
  )
}
