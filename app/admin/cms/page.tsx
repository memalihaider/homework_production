'use client'

import { useState } from 'react'
import { 
  FileText, 
  Layout, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit3, 
  Trash2,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Folder
} from 'lucide-react'

export default function CMS() {
  const [activeTab, setActiveTab] = useState('pages')

  const pages = [
    { id: 1, title: 'Home', slug: '/', status: 'Published', lastModified: 'Dec 20, 2025', views: '12.4k' },
    { id: 2, title: 'About Us', slug: '/about', status: 'Published', lastModified: 'Dec 18, 2025', views: '3.2k' },
    { id: 3, title: 'Services', slug: '/services', status: 'Published', lastModified: 'Dec 19, 2025', views: '8.1k' },
    { id: 4, title: 'Pricing', slug: '/pricing', status: 'Draft', lastModified: 'Dec 21, 2025', views: '0' }
  ]

  const blogPosts = [
    { id: 1, title: 'The Importance of Regular Home Cleaning', status: 'Published', author: 'Admin', date: 'Dec 20, 2025', category: 'Tips' },
    { id: 2, title: 'Eco-Friendly Cleaning Products', status: 'Draft', author: 'Admin', date: 'Dec 15, 2025', category: 'Products' }
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage your website pages, blog posts, and media assets.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
          <Plus className="h-4 w-4" />
          Create New {activeTab === 'pages' ? 'Page' : activeTab === 'blog' ? 'Post' : 'Asset'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl w-fit">
        {[
          { id: 'pages', label: 'Pages', icon: Layout },
          { id: 'blog', label: 'Blog Posts', icon: FileText },
          { id: 'media', label: 'Media Library', icon: ImageIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-card text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`} 
            className="w-full pl-10 pr-4 py-2 bg-card border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-card border rounded-xl text-sm font-medium hover:bg-accent">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        {activeTab === 'pages' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Page Title</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Views</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Modified</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Globe className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-bold">{page.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{page.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        page.status === 'Published' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{page.views}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{page.lastModified}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg text-blue-600">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="group p-4 rounded-2xl border bg-muted/30 hover:bg-card hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded">
                    {post.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status}
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">AD</div>
                    <span className="text-xs text-muted-foreground">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-muted/50 cursor-pointer transition-colors">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Upload</span>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="group relative aspect-square rounded-2xl border overflow-hidden bg-muted/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}