import { CheckCircle2, Users, Award, Leaf, Target, Eye, Heart, Sparkles, ShieldCheck, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1600" 
            alt="About Us" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">About <span className="text-primary">Homework UAE</span></h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            UAE's premier hygiene solution provider, dedicated to creating fresh, clean, and productive environments for homes and offices across the Emirates.
          </p>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="h-16 w-16 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the first choice to our employees, suppliers and customers in the region we operate, setting the gold standard for hygiene.
              </p>
            </div>
            <div className="group p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="h-16 w-16 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide reliable, flexible and consistent solution to our internal and external stakeholders in our hygiene business.
              </p>
            </div>
            <div className="group p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="h-16 w-16 rounded-2xl bg-pink-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900">Core Values</h3>
              <ul className="text-slate-600 space-y-3 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Honoring our words</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Reliability & Trust</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Long-term approach</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Why Choose Us</h2>
            <h3 className="text-4xl font-black text-slate-900 mb-6">What Makes Us Different</h3>
            <p className="text-slate-600 text-lg">
              Behind our commitment to excellence are key attributes that define who we are and what makes us the preferred choice in the UAE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={i} className="text-center p-12 bg-white rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500">
                <div className="h-20 w-20 rounded-3xl bg-pink-50 flex items-center justify-center text-primary mx-auto mb-8">
                  <item.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800" 
                alt="Our Commitment" 
                className="relative rounded-[3rem] shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-4xl shadow-2xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl">15+</div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Years of</div>
                    <div className="text-xs font-bold text-primary uppercase tracking-widest">Excellence</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em]">Our Commitment</h2>
              <h3 className="text-4xl font-black text-slate-900 leading-tight">Excellence in Every <span className="text-primary">Cleaning Task</span></h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                We don't just clean; we care. Our commitment to excellence is reflected in our rigorous training programs and our attention to the smallest details.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Experienced Team",
                  "Same cleaner for every visit",
                  "One-off or regular visits",
                  "Book & pay online",
                  "All in all service",
                  "Satisfaction Guaranteed"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-pink-50 flex items-center justify-center text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-slate-700 font-bold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
