import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react'
import Link from 'next/link'

export default function Blog() {
  const posts = [
    {
      title: "The Importance of Regular Home Cleaning",
      date: "Dec 20, 2025",
      author: "Sarah Johnson",
      category: "Home Care",
      excerpt: "Discover why maintaining a regular cleaning schedule is essential for your home's health and longevity. We explore the hidden benefits of a clean environment.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800",
      slug: "importance-regular-cleaning"
    },
    {
      title: "Eco-Friendly Cleaning Products: What You Need to Know",
      date: "Dec 15, 2025",
      author: "Michael Chen",
      category: "Sustainability",
      excerpt: "Learn about environmentally friendly cleaning options and their benefits for your home and the planet. Why switching to green products matters.",
      image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=800",
      slug: "eco-friendly-cleaning-products"
    },
    {
      title: "Commercial Cleaning Best Practices for Offices",
      date: "Dec 10, 2025",
      author: "David Smith",
      category: "Commercial",
      excerpt: "Tips for maintaining a clean and productive office environment. How professional cleaning can boost employee morale and productivity.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      slug: "commercial-cleaning-best-practices"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1600" 
            alt="Blog" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Blog & <span className="text-primary">Insights</span></h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Expert tips, industry news, and hygiene guides to help you maintain a healthier and cleaner environment.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {posts.map((post, index) => (
                <article key={index} className="group flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-2/5 h-64 overflow-hidden rounded-[2.5rem]">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="w-full md:w-3/5 space-y-4">
                    <div className="flex items-center gap-4 text-sm font-black text-primary uppercase tracking-widest">
                      <span className="px-3 py-1 bg-pink-50 rounded-lg">{post.category}</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {post.date}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-2 text-slate-900 font-black hover:text-primary transition-colors group/link"
                    >
                      Read Full Article <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-10">
              {/* Search */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6">Search Blog</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles..."
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xl font-black text-slate-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  {["Home Care", "Commercial", "Sustainability", "Health & Safety", "Tips & Tricks"].map((cat, i) => (
                    <a key={i} href="#" className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-primary hover:text-primary transition-all font-bold text-slate-700">
                      {cat}
                      <span className="h-6 w-6 rounded-lg bg-slate-100 text-slate-500 text-xs flex items-center justify-center font-black">12</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                <h3 className="text-xl font-black mb-4 relative z-10">Newsletter</h3>
                <p className="text-slate-400 mb-6 relative z-10">Get the latest hygiene tips and exclusive offers delivered to your inbox.</p>
                <form className="space-y-4 relative z-10">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-white placeholder:text-slate-500"
                  />
                  <button className="w-full py-4 bg-primary text-white rounded-2xl font-black hover:bg-pink-600 transition-all shadow-xl shadow-primary/20">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
