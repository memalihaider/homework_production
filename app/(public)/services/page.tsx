import { 
  Home, 
  Building2, 
  Sparkles, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  Zap,
  Heart
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    title: "Residential Cleaning",
    description: "Comprehensive cleaning for your home, from apartments to villas. We ensure every corner sparkles.",
    icon: Home,
    features: ["Deep Cleaning", "Regular Maintenance", "Move-in/out Cleaning"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Commercial Cleaning",
    description: "Professional cleaning solutions for offices, retail spaces, and commercial buildings.",
    icon: Building2,
    features: ["Office Cleaning", "Retail Spaces", "Industrial Cleaning"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Deep Cleaning",
    description: "Intensive cleaning service targeting hidden dirt, allergens, and tough stains.",
    icon: Sparkles,
    features: ["Kitchen Sanitization", "Bathroom Deep Clean", "Floor Scrubbing"],
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800",
    color: "bg-pink-50 text-primary"
  },
  {
    title: "AC Duct Cleaning",
    description: "Improve air quality and efficiency with our professional AC duct cleaning services.",
    icon: Wind,
    features: ["Duct Inspection", "Dust Removal", "Sanitization"],
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800",
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    title: "Upholstery Cleaning",
    description: "Revitalize your sofas, carpets, and curtains with our specialized cleaning methods.",
    icon: Droplets,
    features: ["Sofa Cleaning", "Carpet Shampooing", "Curtain Steaming"],
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800",
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Disinfection Services",
    description: "Keep your environment safe with our hospital-grade disinfection and sanitization.",
    icon: ShieldCheck,
    features: ["Virus Protection", "Surface Sanitization", "Fogging Service"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    color: "bg-green-50 text-green-600"
  }
]

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1600" 
            alt="Our Services" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Our <span className="text-primary">Services</span></h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Professional hygiene solutions tailored to your needs. We bring excellence to every corner of your space.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <Link href="/book-service" className="w-full py-3 bg-primary text-white rounded-xl font-black text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Book Now
                    </Link>
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <div className={`h-14 w-14 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8 mt-auto">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/book-service" 
                    className="flex items-center gap-2 text-primary font-black group/link"
                  >
                    Learn More <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">How It Works</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-6">Simple 3-Step Process</h3>
            <p className="text-slate-600 text-lg">
              Booking a professional cleaning service has never been easier.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
            {[
              { step: "01", title: "Book Online", desc: "Select your service and preferred time slot in seconds.", icon: Clock },
              { step: "02", title: "We Clean", desc: "Our professional team arrives and performs the service.", icon: Zap },
              { step: "03", title: "Enjoy", desc: "Relax and enjoy your fresh, clean environment.", icon: Heart }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 text-center relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg shadow-xl">
                  {item.step}
                </div>
                <div className="h-16 w-16 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mx-auto mb-6 mt-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Ready to Experience the <span className="text-primary">Homework UAE</span> Difference?</h2>
              <p className="text-xl text-slate-300 mb-12">
                Join thousands of satisfied customers across the UAE. Book your professional cleaning service today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/book-service" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-pink-600 transition-all shadow-xl shadow-primary/20">
                  Book Online Now
                </Link>
                <Link href="/contact" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
