import { ReactNode } from 'react'
import { Phone, Mail, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium">
          <div className="flex items-center gap-6">
            <a href="tel:80046639675" className="flex items-center gap-2 hover:text-pink-100 transition-colors">
              <Phone className="h-3 w-3" /> 80046639675
            </a>
            <a href="mailto:services@homeworkuae.com" className="flex items-center gap-2 hover:text-pink-100 transition-colors">
              <Mail className="h-3 w-3" /> services@homeworkuae.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-pink-100 transition-colors"><Facebook className="h-3.5 w-3.5" /></a>
            <a href="#" className="hover:text-pink-100 transition-colors"><Linkedin className="h-3.5 w-3.5" /></a>
            <a href="#" className="hover:text-pink-100 transition-colors"><MessageCircle className="h-3.5 w-3.5" /></a>
            <a href="#" className="hover:text-pink-100 transition-colors"><Instagram className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">H</div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">HOMEWORK</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary leading-none mt-1">UAE CLEANING</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold uppercase tracking-wide">
            <a href="/" className="text-slate-600 hover:text-primary transition-colors">Home</a>
            <a href="/about" className="text-slate-600 hover:text-primary transition-colors">About Us</a>
            <div className="relative group cursor-pointer">
              <a href="/services" className="text-slate-600 hover:text-primary transition-colors flex items-center gap-1">
                Services
              </a>
            </div>
            <a href="/blog" className="text-slate-600 hover:text-primary transition-colors">Blog</a>
            <a href="/contact" className="text-slate-600 hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="/book-service" 
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-pink-700 hover:shadow-primary/40 active:scale-95"
            >
              BOOK ONLINE
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">H</div>
                <span className="text-xl font-black tracking-tighter">HOMEWORK UAE</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                UAE's most trusted professional cleaning service. We provide premium hygiene solutions for homes and offices across the Emirates.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"><Instagram className="h-4 w-4" /></a>
                <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Our Services</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Latest News</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary">Services</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="/services" className="hover:text-white transition-colors">Residential Cleaning</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Villa Deep Cleaning</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Office Cleaning</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">AC Duct Cleaning</a></li>
                <li><a href="/services" className="hover:text-white transition-colors">Kitchen Hood Cleaning</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary">Contact Info</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-0.5" />
                  <span>80046639675</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <span>services@homeworkuae.com</span>
                </li>
                <li className="flex items-start gap-3 text-xs">
                  <MessageCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Al Quoz- Dubai - United Arab Emirates</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2024 Homework UAE Cleaning Services. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}