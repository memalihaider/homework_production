// /app/admin/products/components/CategoryManager.tsx
'use client'

import React, { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Layers,
  ArrowRight
} from 'lucide-react'
import { Category } from '../lib/products-data'

interface CategoryManagerProps {
  categories: Category[]
  onSave: (category: Partial<Category>) => void
  onDelete: (id: string) => void
}

export default function CategoryManager({ categories, onSave, onDelete }: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    description: '',
    color: '#000000'
  })

  const resetForm = () => {
    setFormData({ name: '', description: '', color: '#000000' })
    setIsAdding(false)
    setEditingId(null)
  }

  const handleEdit = (cat: Category) => {
    setFormData(cat)
    setEditingId(cat.id)
    setIsAdding(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    resetForm()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-black text-white p-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            {editingId ? 'Edit category' : 'New category'}
          </h3>
          <p className="text-[10px] text-white/50 mb-6 uppercase tracking-widest leading-relaxed">
            Organize your inventory into meaningful segments for better reporting and quotation building.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 block">Category Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/10 border border-white/20 px-3 py-2 text-xs font-bold text-white outline-none focus:border-white transition-all uppercase tracking-widest"
                placeholder="E.G. EQUIPMENT"
              />
            </div>
            
            <div>
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 block">Description</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/10 border border-white/20 px-3 py-2 text-xs font-bold text-white outline-none focus:border-white transition-all"
                placeholder="Brief summary..."
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-white text-black py-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                {editingId ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                {editingId ? 'Update' : 'Create'}
              </button>
              {(isAdding || editingId) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="p-4 border border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">
            <Check className="h-3 w-3 text-green-500" />
            Pro Tip
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
            Categories with high volume items should be placed at the top for faster access in the builder.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Category Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Items</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-10" style={{ backgroundColor: cat.color || '#000' }} />
                      <div>
                        <p className="text-xs font-black text-black uppercase tracking-widest">{cat.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{cat.description || 'No description'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-black">{cat.itemCount || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2 border border-gray-100 hover:border-black transition-all"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => onDelete(cat.id)}
                        className="p-2 border border-gray-100 hover:border-red-600 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
