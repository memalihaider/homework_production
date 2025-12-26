import { CheckCircle2, ArrowRight, Star, Shield, Clock, Users, Award, Leaf, Sparkles, ShieldCheck, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1600" 
            alt="Professional Cleaning" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-primary text-sm font-bold border border-pink-100 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>#1 RATED CLEANING SERVICE IN UAE</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
              UAE's Most <span className="text-primary">Trusted</span> & Professional Cleaners
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Experience pristine living and working spaces with our premium hygiene solutions. We bring professional standards to every corner of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/book-service"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary text-white px-10 text-lg font-bold shadow-xl shadow-primary/25 transition-all hover:bg-pink-700 hover:scale-105 active:scale-95"
              >
                BOOK ONLINE NOW
              </a>
              <a
                href="/services"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white border-2 border-slate-200 text-slate-900 px-10 text-lg font-bold transition-all hover:border-primary hover:text-primary"
              >
                OUR SERVICES
              </a>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-slate-500 font-medium">Trusted by 10,000+ Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Clients", value: "10k+", icon: Users },
              { label: "Cleanings Done", value: "25k+", icon: Sparkles },
              { label: "Expert Staff", value: "150+", icon: ShieldCheck },
              { label: "Service Areas", value: "7+", icon: Award },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 justify-center md:justify-start">
                <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Our Foundation</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-6">Excellence in Every Detail</h3>
            <p className="text-slate-600 text-lg">
              We are committed to providing reliable, flexible, and consistent hygiene solutions to our internal and external stakeholders.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-10 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the first choice to our employees, suppliers and customers in the region we operate, setting the gold standard for hygiene.
              </p>
            </div>
            <div className="group p-10 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide reliable, flexible and consistent solution to our internal and external stakeholders in our hygiene business.
              </p>
            </div>
            <div className="group p-10 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Core Values</h3>
              <ul className="text-slate-600 space-y-3 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Honoring our words</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Reliability & Trust</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Long-term approach</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Customer Centricity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">What We Do</h2>
              <h3 className="text-4xl font-black text-slate-900 mb-6">Premium Cleaning Services</h3>
              <p className="text-slate-600 text-lg">
                Homework aims to provide a fresh and clean environment – be it your home or office. Our teams use innovative techniques tailored to your unique needs.
              </p>
            </div>
            <a href="/services" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              VIEW ALL SERVICES <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Regular Residential",
                description: "UAE's Trusted Residential Cleaning - Experience Pristine Living Spaces",
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=600",
                tag: "Popular"
              },
              {
                title: "Villa Deep Cleaning",
                description: "Transform Your Villa with UAE's Expert Deep Cleaning Services",
                image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
                tag: "Premium"
              },
              {
                title: "Move in/out Cleaning",
                description: "Stress-Free Move In/Move Out Cleaning in UAE – Your Perfect Transition Partner",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
                tag: "Essential"
              },
              {
                title: "Kitchen Hood Cleaning",
                description: "Expert Kitchen Hood Cleaning in UAE – Safe and Hygienic Kitchens",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600",
                tag: "Technical"
              },
              {
                title: "AC Duct Cleaning",
                description: "Breathe Easy with UAE's Professional AC Duct Cleaning Services",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600",
                tag: "Health"
              },
              {
                title: "Regular Office cleaning",
                description: "Transform Your Office with UAE's Expert Office Deep Cleaning Services",
                image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600",
                tag: "Corporate"
              }
            ].map((service, i) => (
              <div key={i} className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                      {service.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{service.description}</p>
                  <a href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                    LEARN MORE <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 skew-x-12 translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Why Choose Us</h2>
              <h3 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">The Gold Standard in <br /><span className="text-primary">Professional Hygiene</span></h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Expert and Trusted Cleaners",
                    desc: "A certified cleaning company with professionally trained & background-verified cleaners.",
                    icon: Users
                  },
                  {
                    title: "Customer-centric Services",
                    desc: "Cleaning services that cater to your requirements with a great deal of attention to detail.",
                    icon: Award
                  },
                  {
                    title: "Eco-Friendly Products",
                    desc: "We use safe, non-toxic products that are effective yet gentle on your environment.",
                    icon: Leaf
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative bg-slate-800 rounded-4xl p-10 border border-white/10 shadow-2xl">
                <h4 className="text-2xl font-black mb-8">Our Commitment</h4>
                <div className="space-y-6">
                  {[
                    "Experienced & Certified Team",
                    "Same cleaner for every visit",
                    "Flexible scheduling options",
                    "Book, manage & pay online",
                    "100% Satisfaction Guarantee"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-slate-200 font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-10 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl">800</div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Call Us Toll Free</div>
                      <div className="text-xl font-black text-white">800 4663 9675</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Testimonials</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-6">What Our Clients Say</h3>
            <div className="flex justify-center gap-1 text-yellow-400 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
            <p className="text-slate-500 font-bold">4.9/5 Average Rating based on 2,500+ reviews</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The cleaning was perfect. I booked the deep cleaning service. Everything was over my expectations. It was super clean and my floor looks like new.",
                author: "Mathias Nothegger",
                role: "NOM TRAINING"
              },
              {
                text: "Homework is one of the finest cleaning services in UAE I have ever booked. They delivered an exceptional cleaning job with dedication and utmost professionalism.",
                author: "Mr. Amir Gaffry",
                role: "Business Owner"
              },
              {
                text: "Marcia, Mylen and Rosalie were professional and courteous and cleaned the house very well and paid attention to detail. Highly recommended!",
                author: "Johanna Chung",
                role: "Home Owner"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-4xl relative group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100">
                <div className="absolute -top-4 left-10 h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-black text-slate-900">{testimonial.author}</p>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready for a Spotless Home?</h2>
              <p className="text-xl text-pink-100 font-medium">
                Join thousands of satisfied customers in the UAE. Book your professional cleaning service in less than 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <a
                  href="/book-service"
                  className="inline-flex h-16 items-center justify-center rounded-full bg-white text-primary px-12 text-xl font-black shadow-xl transition-all hover:bg-slate-50 hover:scale-105 active:scale-95"
                >
                  BOOK NOW
                </a>
                <a
                  href="tel:80046639675"
                  className="inline-flex h-16 items-center justify-center rounded-full bg-pink-700 text-white px-12 text-xl font-black transition-all hover:bg-pink-800"
                >
                  CALL 800 4663 9675
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
