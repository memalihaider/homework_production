// /app/admin/products/components/ProductBuilder.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { 
  X, 
  Save, 
  Package, 
  Zap, 
  Image as ImageIcon, 
  Plus,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react'
import { ProductItem, Category, UnitType } from '../lib/products-data'

interface ProductBuilderProps {
  product?: ProductItem | null
  categories: Category[]
  onSave: (product: Partial<ProductItem>) => void
  onCancel: () => void
}

const UNITS: UnitType[] = ['Litre', 'Kg', 'Unit', 'Pack', 'Box', 'Roll', 'Hour', 'SqFt']

export default function ProductBuilder({ product, categories, onSave, onCancel }: ProductBuilderProps) {
  const [formData, setFormData] = useState<Partial<ProductItem>>({
    name: '',
    sku: '',
    description: '',
    type: 'PRODUCT',
    price: 0,
    cost: 0,
    unit: 'Unit',
    stock: 0,
    minStock: 0,
    categoryId: categories[0]?.id || '',
    categoryName: categories[0]?.name || '',
    status: 'ACTIVE'
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'categoryId') {
      const cat = categories.find(c => c.id === value)
      setFormData(prev => ({ ...prev, categoryId: value, categoryName: cat?.name || '' }))
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: ['price', 'cost', 'stock', 'minStock'].includes(name) ? Number(value) : value 
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2 hover:bg-black hover:text-white transition-all border border-transparent hover:border-black">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-black uppercase tracking-tighter">
            {product ? 'Edit Item' : 'Create New Item'}
          </h2>
        </div>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 text-xs font-black uppercase hover:bg-gray-50 transition-all tracking-widest"
          >
            Cancel
          </button>
          <button 
            form="product-form"
            type="submit"
            className="px-6 py-2 bg-black text-white text-xs font-black uppercase hover:bg-gray-900 transition-all flex items-center gap-2 tracking-widest"
          >
            <Save className="h-4 w-4" />
            Save Item
          </button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Media & Type */}
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Item Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'PRODUCT' }))}
                  className={`flex flex-col items-center gap-2 p-4 border transition-all ${
                    formData.type === 'PRODUCT' 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <Package className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Physical Product</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'SERVICE' }))}
                  className={`flex flex-col items-center gap-2 p-4 border transition-all ${
                    formData.type === 'SERVICE' 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <Zap className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Service Fee</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Media</label>
              <div className="aspect-square border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center group hover:border-black transition-colors cursor-pointer bg-gray-50/50">
                <ImageIcon className="h-10 w-10 text-gray-300 group-hover:text-black mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">Drop Image Here</p>
                <p className="text-[10px] text-gray-300 mt-1 uppercase">OR CLICK TO BROWSE</p>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-100 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
              <div>
                <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest">Pricing Strategy</p>
                <p className="text-[10px] text-orange-600/80 mt-1">Ensure your markup covers shipping and handling overheads.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Item Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-bold uppercase tracking-widest"
                  placeholder="E.G. PROFESSIONAL CLEANING SOLUTION"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">SKU / Code</label>
                <input
                  required
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-bold uppercase tracking-widest"
                  placeholder="HW-CLN-001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Description</label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-bold"
                placeholder="PROPER APPLICATION AND MIXING RATIO..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-bold uppercase tracking-widest"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Unit Type</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-bold uppercase tracking-widest"
                >
                  {UNITS.map(unit => (
                    <option key={unit} value={unit}>{unit.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Unit Price (AED)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black">AED</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-black"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Unit Cost (AED)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400">AED</span>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-black"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Margin</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-100 text-sm font-black text-center">
                  {formData.price && formData.price > 0 
                    ? `${Math.round(((formData.price - (formData.cost || 0)) / formData.price) * 100)}%` 
                    : '0%'}
                </div>
              </div>
            </div>

            {formData.type === 'PRODUCT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Current Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-black"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Low Stock Alert Unit</label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none text-sm font-black"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
