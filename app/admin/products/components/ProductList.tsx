// /app/admin/products/components/ProductList.tsx
'use client'

import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Package, 
  Zap, 
  ChevronRight,
  ArrowUpDown,
  Archive
} from 'lucide-react'
import { ProductItem, Category } from '../lib/products-data'

interface ProductListProps {
  products: ProductItem[]
  categories: Category[]
  onEdit: (product: ProductItem) => void
  onDelete: (id: string) => void
}

export default function ProductList({ products, categories, onEdit, onDelete }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'ALL' | 'PRODUCT' | 'SERVICE'>('ALL')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const filteredItems = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = activeTab === 'ALL' || item.type === activeTab
    const matchesCategory = selectedCategory === 'ALL' || item.categoryId === selectedCategory
    return matchesSearch && matchesType && matchesCategory
  })

  return (
    <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
      {/* Filters Header */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
        <div className="flex bg-white border border-gray-200 p-1">
          {['ALL', 'PRODUCT', 'SERVICE'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 text-[10px] font-black tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-black text-white' 
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="SEARCH SKU OR NAME..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 text-xs font-bold focus:outline-none focus:border-black placeholder:text-gray-300 tracking-widest uppercase"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 text-xs font-bold focus:outline-none focus:border-black appearance-none pr-10 relative cursor-pointer uppercase tracking-widest"
          >
            <option value="ALL">ALL CATEGORIES</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-white">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stock / Unit</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pricing</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${item.type === 'PRODUCT' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                      {item.type === 'PRODUCT' ? <Package className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-black group-hover:underline underline-offset-4 cursor-pointer">{item.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black px-2 py-1 bg-gray-100 text-gray-600 uppercase tracking-widest">
                    {item.categoryName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.type === 'PRODUCT' ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black ${item.stock <= item.minStock ? 'text-red-600' : 'text-black'}`}>
                          {item.stock}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{item.unit}</span>
                      </div>
                      <div className="w-24 h-1 bg-gray-100 mt-1 overflow-hidden">
                        <div 
                          className={`h-full ${item.stock <= item.minStock ? 'bg-red-500' : 'bg-black'}`}
                          style={{ width: `${Math.min((item.stock / (item.minStock * 2 || 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Per {item.unit}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-black">AED {item.price.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Cost: AED {item.cost.toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(item)}
                      className="p-2 border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-2 border border-gray-200 hover:border-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredItems.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center">
            <Archive className="h-10 w-10 text-gray-200 mb-4" />
            <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">No matching records found</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/30">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Showing {filteredItems.length} of {products.length} items
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 text-[10px] font-bold hover:border-black uppercase">Prev</button>
          <button className="px-3 py-1 border border-black bg-black text-white text-[10px] font-bold uppercase">1</button>
          <button className="px-3 py-1 border border-gray-200 text-[10px] font-bold hover:border-black uppercase">Next</button>
        </div>
      </div>
    </div>
  )
}
