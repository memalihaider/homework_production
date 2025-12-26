'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('admin@homeware.ae')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please enter both email and password')
        setIsLoading(false)
        return
      }

      // Demo authentication (replace with real API call)
      if (email === 'admin@homeware.ae' && password === 'Demo@123') {
        // Store credentials in localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem('homeware_admin_token', 'demo_token_12345')
          localStorage.setItem('homeware_admin_email', email)
          localStorage.setItem('homeware_admin_remember', 'true')
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Redirect to admin dashboard
        router.push('/admin/dashboard')
      } else {
        setError('Invalid email or password. Use admin@homeware.ae / Demo@123')
        setIsLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/login" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold mb-8 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          Back to Portal Selection
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-black text-2xl mb-4 shadow-lg shadow-blue-500/30">
              H
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your admin account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-bold mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold">Password</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium">Remember me for 30 days</span>
            </label>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In to Admin
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
            <span className="text-xs font-bold text-gray-500">OR</span>
            <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">Demo Credentials</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Email: <span className="font-mono font-bold">admin@homeware.ae</span><br />
              Password: <span className="font-mono font-bold">Demo@123</span>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            Need help? <a href="mailto:support@homeware.ae" className="font-bold text-blue-600 hover:text-blue-700">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  )
}
