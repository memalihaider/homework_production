'use client'

import Link from 'next/link'
import { Building2, Users, BarChart3, CheckSquare, User, ArrowRight } from 'lucide-react'

export default function Login() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
              H
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter leading-none">Homeware</h1>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase">Enterprise Portal</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-4">Choose your portal to access the system</p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Admin Portal */}
          <Link href="/login/admin">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:border-blue-500 transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900 rounded-xl group-hover:shadow-lg transition-all">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Admin Portal</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage the entire system, users, settings, and access advanced administrative features.
              </p>
              <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                Access Admin <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Client Portal */}
          <Link href="/login/client">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:border-green-500 transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-green-100 to-green-50 dark:from-green-950 dark:to-green-900 rounded-xl group-hover:shadow-lg transition-all">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Client Portal</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Book services, track invoices, manage your account, and access support.
              </p>
              <div className="flex items-center text-green-600 font-bold group-hover:translate-x-1 transition-transform">
                Access Portal <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Employee Portal */}
          <Link href="/login/employee">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-indigo-100 to-indigo-50 dark:from-indigo-950 dark:to-indigo-900 rounded-xl group-hover:shadow-lg transition-all">
                  <User className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold">Employee Portal</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Track tasks, view salary, bonuses, payroll, and manage your attendance records.
              </p>
              <div className="flex items-center text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                Access Portal <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Finance Portal */}
          <Link href="/login/finance">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:border-purple-500 transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900 rounded-xl group-hover:shadow-lg transition-all">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold">Finance Portal</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage finances, invoicing, payments, reports, and financial analytics.
              </p>
              <div className="flex items-center text-purple-600 font-bold group-hover:translate-x-1 transition-transform">
                Access Finance <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Project Management Portal */}
          <Link href="/login/project-management">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:border-orange-500 transition-all duration-300 cursor-pointer h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-linear-to-br from-orange-100 to-orange-50 dark:from-orange-950 dark:to-orange-900 rounded-xl group-hover:shadow-lg transition-all">
                  <CheckSquare className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold">Project Management</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Plan projects, track tasks, manage timelines, and coordinate team activities.
              </p>
              <div className="flex items-center text-orange-600 font-bold group-hover:translate-x-1 transition-transform">
                Access Projects <ArrowRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Need help? Contact support at <span className="font-bold text-gray-900 dark:text-white">support@homeware.ae</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © 2025 Homeware. All rights reserved. All data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  )
}
