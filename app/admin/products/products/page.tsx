'use client'

import { useState, useEffect } from 'react'
import { Plus, Package, Edit, Trash2, X, Check, Archive } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  color: string
  createdAt: string
  serviceCount: number
  productCount: number
}

interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  categoryName: string
  price: number
  unit: string
  image?: string
  createdAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    categoryId: 0,
    price: 0,
    unit: 'item'
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const savedCategories = localStorage.getItem('homeware_product_categories')
    let savedProducts = localStorage.getItem('homeware_product_products')

    // Initialize with mock data if none exists
    if (!savedProducts) {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Professional Cleaning Solution',
          description: 'High-quality, eco-friendly cleaning solution effective against grease, dirt, and bacteria. Safe for all surfaces and environmentally conscious.',
          categoryId: 2,
          categoryName: 'Cleaning Products',
          price: 25,
          unit: 'liter',
          image: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Microfiber Cleaning Cloths',
          description: 'Premium microfiber cloths that trap dust and dirt effectively. Reusable, machine washable, and streak-free for all cleaning applications.',
          categoryId: 2,
          categoryName: 'Cleaning Products',
          price: 15,
          unit: 'pack',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Industrial Vacuum Cleaner',
          description: 'Heavy-duty vacuum cleaner with HEPA filtration for commercial and industrial cleaning. Powerful suction and large capacity.',
          categoryId: 2,
          categoryName: 'Cleaning Products',
          price: 450,
          unit: 'unit',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          name: 'Safety Gloves',
          description: 'Nitrile safety gloves providing excellent protection against chemicals and contaminants. Powder-free and latex-free for sensitive skin.',
          categoryId: 4,
          categoryName: 'Safety & Security',
          price: 8,
          unit: 'pair',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          name: 'Antimicrobial Spray',
          description: 'Hospital-grade antimicrobial spray effective against 99.9% of bacteria and viruses. Safe for use on all surfaces in medical facilities.',
          categoryId: 2,
          categoryName: 'Cleaning Products',
          price: 35,
          unit: 'liter',
          image: 'https://images.unsplash.com/photo-1585435557343-3b092031e2bb?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString()
        },
        {
          id: 6,
          name: 'Security Camera System',
          description: 'Wireless security camera system with 1080p HD recording, night vision, and mobile app control. Complete 4-camera kit with DVR.',
          categoryId: 4,
          categoryName: 'Safety & Security',
          price: 1200,
          unit: 'kit',
          image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
          createdAt: new Date().toISOString()
        }
      ]
      localStorage.setItem('homeware_product_products', JSON.stringify(mockProducts))
      savedProducts = JSON.stringify(mockProducts)
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    }

    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts)
      // Update category names
      const categoriesMap = savedCategories ? JSON.parse(savedCategories).reduce((map: any, cat: Category) => {
        map[cat.id] = cat.name
        return map
      }, {}) : {}

      const updatedProducts = parsedProducts.map((product: Product) => ({
        ...product,
        categoryName: categoriesMap[product.categoryId] || 'Unknown Category'
      }))

      setProducts(updatedProducts)
    }
  }

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('homeware_product_products', JSON.stringify(updatedProducts))
    setProducts(updatedProducts)
  }

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.categoryId) return

    const category = categories.find(cat => cat.id === newProduct.categoryId)
    const product: Product = {
      id: Date.now(),
      name: newProduct.name.trim(),
      description: newProduct.description.trim(),
      categoryId: newProduct.categoryId,
      categoryName: category?.name || 'Unknown Category',
      price: newProduct.price,
      unit: newProduct.unit,
      createdAt: new Date().toISOString()
    }

    const updatedProducts = [...products, product]
    saveProducts(updatedProducts)

    // Update category product count
    updateCategoryCounts()

    setNewProduct({ name: '', description: '', categoryId: 0, price: 0, unit: 'item' })
    setShowAddModal(false)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price,
      unit: product.unit
    })
  }

  const handleUpdateProduct = () => {
    if (!editingProduct || !newProduct.name.trim() || !newProduct.categoryId) return

    const category = categories.find(cat => cat.id === newProduct.categoryId)
    const updatedProducts = products.map(product =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: newProduct.name.trim(),
            description: newProduct.description.trim(),
            categoryId: newProduct.categoryId,
            categoryName: category?.name || 'Unknown Category',
            price: newProduct.price,
            unit: newProduct.unit
          }
        : product
    )

    saveProducts(updatedProducts)
    updateCategoryCounts()

    setEditingProduct(null)
    setNewProduct({ name: '', description: '', categoryId: 0, price: 0, unit: 'item' })
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id)
      saveProducts(updatedProducts)
      updateCategoryCounts()
    }
  }

  const updateCategoryCounts = () => {
    const savedCategories = localStorage.getItem('homeware_product_categories')
    if (savedCategories) {
      const categories = JSON.parse(savedCategories)
      const services = JSON.parse(localStorage.getItem('homeware_product_services') || '[]')

      const updatedCategories = categories.map((cat: Category) => ({
        ...cat,
        serviceCount: services.filter((s: any) => s.categoryId === cat.id).length,
        productCount: products.filter(p => p.categoryId === cat.id).length
      }))

      localStorage.setItem('homeware_product_categories', JSON.stringify(updatedCategories))
    }
  }

  const unitOptions = ['item', 'kg', 'liter', 'meter', 'sq ft', 'sq m', 'box', 'pack']

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Products</h1>
          <p className="text-slate-500">Manage products and materials within categories.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Image</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Unit</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Created</th>
                <th className="px-6 py-4 text-right text-xs font-black text-slate-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-black text-slate-900">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-slate-600 mt-1">{product.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                      {product.categoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900">
                    AED {product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    per {product.unit}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">No products created yet.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700"
            >
              Create First Product
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingProduct(null)
                  setNewProduct({ name: '', description: '', categoryId: 0, price: 0, unit: 'item' })
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-black text-slate-900">Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g., Cleaning Solution"
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Category *</label>
                <select
                  value={newProduct.categoryId}
                  onChange={(e) => setNewProduct({...newProduct, categoryId: parseInt(e.target.value)})}
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-black text-slate-900">Price *</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-black text-slate-900">Unit</label>
                  <select
                    value={newProduct.unit}
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-slate-900">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Brief description of this product..."
                  rows={3}
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingProduct(null)
                    setNewProduct({ name: '', description: '', categoryId: 0, price: 0, unit: 'item' })
                  }}
                  className="flex-1 py-2 border-2 border-slate-200 text-slate-900 font-black rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="flex-1 py-2 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700"
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}