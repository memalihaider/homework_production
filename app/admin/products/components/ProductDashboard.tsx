// /app/admin/products/components/ProductDashboard.tsx
'use client'

import React from 'react'
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Activity
} from 'lucide-react'
import { ProductItem, Category } from '../lib/products-data'

interface ProductDashboardProps {
  products: ProductItem[]
  categories: Category[]
}

export default function ProductDashboard({ products, categories }: ProductDashboardProps) {
  const totalProducts = products.length
  const lowStockProducts = products.filter(p => p.type === 'PRODUCT' && p.stock <= p.minStock)
  const totalValue = products.reduce((sum, p) => sum + (p.type === 'PRODUCT' ? p.price * p.stock : 0), 0)
  const totalCost = products.reduce((sum, p) => sum + (p.type === 'PRODUCT' ? p.cost * p.stock : 0), 0)
  const potentialProfit = totalValue - totalCost

  const stats = [
    {
      label: 'Inventory Assets',
      value: `AED ${totalValue.toLocaleString()}`,
      subValue: `${totalProducts} unique items`,
      icon: Package,
      trend: '+12%',
      trendUp: true
    },
    {
      label: 'Critical Stock',
      value: lowStockProducts.length.toString(),
      subValue: 'Requires restock',
      icon: AlertTriangle,
      trend: lowStockProducts.length > 5 ? 'High' : 'Normal',
      trendUp: lowStockProducts.length > 5
    },
    {
      label: 'Avg. Margin',
      value: totalValue > 0 ? `${Math.round((potentialProfit / totalValue) * 100)}%` : '0%',
      subValue: `AED ${potentialProfit.toLocaleString()} potential`,
      icon: TrendingUp,
      trend: '+2.4%',
      trendUp: true
    },
    {
      label: 'Categories',
      value: categories.length.toString(),
      subValue: 'Active segments',
      icon: Layers,
      trend: 'Optimal',
      trendUp: true
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 p-5 rounded-none hover:border-black transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
                {stat.trendUp ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : <ArrowDownRight className="h-3 w-3 ml-0.5" />}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-black">{stat.value}</h3>
              <p className="text-xs text-gray-400 mt-1">{stat.subValue}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Inventory Health
            </h3>
            <span className="text-[10px] font-bold bg-black text-white px-2 py-1">LIVE UPDATES</span>
          </div>
          
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 border border-gray-100 hover:border-gray-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-red-500" />
                    <div>
                      <p className="text-sm font-bold text-black">{p.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{p.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-red-600">{p.stock} / {p.minStock} {p.unit}</p>
                    <p className="text-[10px] text-gray-400 uppercase">Critical Level</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Package className="h-10 w-10 mb-2 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">All stock levels healthy</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black text-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-60">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-white/20 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                Export Inventory Report
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="w-full text-left p-3 border border-white/20 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                Bulk Price Adjustment
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="w-full text-left p-3 border border-white/20 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-wider flex justify-between items-center">
                Audit Log Access
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-400" />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Projected Value</p>
            </div>
            <h4 className="text-3xl font-black">AED {potentialProfit.toLocaleString()}</h4>
            <p className="text-[10px] opacity-40 mt-1 italic italic">Target based on current stock levels</p>
          </div>
        </div>
      </div>
    </div>
  )
}
