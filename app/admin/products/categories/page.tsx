'use client'

import { useState, useEffect } from 'react'
import { Plus, Archive, Edit, Trash2, X, Check } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  color: string
  image?: string
  createdAt: string
  serviceCount: number
  productCount: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    let saved = localStorage.getItem('homeware_product_categories')
    
    // Initialize with mock data if none exists
    if (!saved) {
      const mockCategories: Category[] = [
        {
          id: 1,
          name: 'Cleaning Services',
          description: 'Professional cleaning and maintenance services for residential and commercial properties',
          color: '#3B82F6',
          image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          serviceCount: 0,
          productCount: 0
        },
        {
          id: 2,
          name: 'Cleaning Products',
          description: 'High-quality cleaning supplies, chemicals, and equipment',
          color: '#10B981',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          serviceCount: 0,
          productCount: 0
        },
        {
          id: 3,
          name: 'Facility Maintenance',
          description: 'Comprehensive facility maintenance and repair services',
          color: '#F59E0B',
          image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          serviceCount: 0,
          productCount: 0
        },
        {
          id: 4,
          name: 'Safety & Security',
          description: 'Safety equipment, security systems, and protective gear',
          color: '#EF4444',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString(),
          serviceCount: 0,
          productCount: 0
        }
      ]
      localStorage.setItem('homeware_product_categories', JSON.stringify(mockCategories))
      saved = JSON.stringify(mockCategories)
    }

    if (saved) {
      const parsedCategories = JSON.parse(saved)
      // Update counts from services and products
      const services = JSON.parse(localStorage.getItem('homeware_product_services') || '[]')
      const products = JSON.parse(localStorage.getItem('homeware_product_products') || '[]')

      const updatedCategories = parsedCategories.map((cat: Category) => ({
        ...cat,
        serviceCount: services.filter((s: any) => s.categoryId === cat.id).length,
        productCount: products.filter((p: any) => p.categoryId === cat.id).length
      }))

      setCategories(updatedCategories)
    }
  }

  const saveCategories = (updatedCategories: Category[]) => {
    localStorage.setItem('homeware_product_categories', JSON.stringify(updatedCategories))
    setCategories(updatedCategories)
  }

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return

    const category: Category = {
      id: Date.now(),
      name: newCategory.name.trim(),
      description: newCategory.description.trim(),
      color: newCategory.color,
      createdAt: new Date().toISOString(),
      serviceCount: 0,
      productCount: 0
    }

    const updatedCategories = [...categories, category]
    saveCategories(updatedCategories)

    setNewCategory({ name: '', description: '', color: '#3B82F6' })
    setShowAddModal(false)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color
    })
  }

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory.name.trim()) return

    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id
        ? {
            ...cat,
            name: newCategory.name.trim(),
            description: newCategory.description.trim(),
            color: newCategory.color
          }
        : cat
    )

    saveCategories(updatedCategories)
    setEditingCategory(null)
    setNewCategory({ name: '', description: '', color: '#3B82F6' })
  }

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category? This will also remove all associated services and products.')) {
      const updatedCategories = categories.filter(cat => cat.id !== id)
      saveCategories(updatedCategories)

      // Remove associated services and products
      const services = JSON.parse(localStorage.getItem('homeware_product_services') || '[]')
      const products = JSON.parse(localStorage.getItem('homeware_product_products') || '[]')

      const filteredServices = services.filter((s: any) => s.categoryId !== id)
      const filteredProducts = products.filter((p: any) => p.categoryId !== id)

      localStorage.setItem('homeware_product_services', JSON.stringify(filteredServices))
      localStorage.setItem('homeware_product_products', JSON.stringify(filteredProducts))
    }
  }

  const colorOptions = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Categories</h1>
          <p className="text-slate-500">Organize your services and products into categories.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="h-5 w-5" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="font-black text-slate-900">{category.name}</h3>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                  title="Edit Category"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {category.image && (
              <div className="mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <p className="text-slate-600 text-sm mb-4">{category.description}</p>

            <div className="flex justify-between items-center text-xs text-slate-500">
              <div className="flex gap-4">
                <span>{category.serviceCount} services</span>
                <span>{category.productCount} products</span>
              </div>
              <span>{new Date(category.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}

        {/* Add Category Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
        >
          <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
            <Plus className="h-8 w-8 text-slate-400 mb-2" />
            <span className="font-black text-slate-900">Add Category</span>
            <span className="text-sm text-slate-500 mt-1">Create new category</span>
          </div>
        </button>
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <Archive className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">No categories created yet.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700"
          >
            Create First Category
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingCategory) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingCategory(null)
                  setNewCategory({ name: '', description: '', color: '#3B82F6' })
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-black text-slate-900">Category Name *</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g., Residential Cleaning"
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Brief description of this category..."
                  rows={3}
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Color</label>
                <div className="flex gap-2 mt-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewCategory({...newCategory, color})}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newCategory.color === color ? 'border-slate-900' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingCategory(null)
                    setNewCategory({ name: '', description: '', color: '#3B82F6' })
                  }}
                  className="flex-1 py-2 border-2 border-slate-200 text-slate-900 font-black rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="flex-1 py-2 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}