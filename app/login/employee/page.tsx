'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, ArrowLeft, Users } from 'lucide-react'

export default function EmployeeLogin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('john.doe@homeware.ae')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!email || !password) {
        setError('Please enter both email and password')
        setIsLoading(false)
        return
      }

      // Demo authentication for employees
      const validCredentials = [
        { email: 'john.doe@homeware.ae', password: 'Employee@123', name: 'John Doe', id: 'EMP001' },
        { email: 'sarah.smith@homeware.ae', password: 'Employee@123', name: 'Sarah Smith', id: 'EMP002' },
        { email: 'mike.johnson@homeware.ae', password: 'Employee@123', name: 'Mike Johnson', id: 'EMP003' },
        { email: 'lisa.brown@homeware.ae', password: 'Employee@123', name: 'Lisa Brown', id: 'EMP004' }
      ]

      const user = validCredentials.find(cred => cred.email === email && cred.password === password)

      if (user) {
        if (rememberMe) {
          localStorage.setItem('homeware_employee_token', `demo_token_${user.id}`)
          localStorage.setItem('homeware_employee_email', email)
          localStorage.setItem('homeware_employee_name', user.name)
          localStorage.setItem('homeware_employee_id', user.id)
          localStorage.setItem('homeware_employee_remember', 'true')
        }

        // Store user info in session storage for the session
        sessionStorage.setItem('homeware_employee_name', user.name)
        sessionStorage.setItem('homeware_employee_id', user.id)
        sessionStorage.setItem('homeware_employee_email', email)

        await new Promise((resolve) => setTimeout(resolve, 500))
        router.push('/employee/dashboard')
      } else {
        setError('Invalid email or password. Use demo credentials below.')
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
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Employee Portal</h1>
          <p className="text-slate-600">Access your employee dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your.email@homeware.ae"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-sm font-bold text-blue-900 mb-3">Demo Credentials</h3>
            <div className="space-y-2 text-xs text-blue-800">
              <div><strong>John Doe:</strong> john.doe@homeware.ae / Employee@123</div>
              <div><strong>Sarah Smith:</strong> sarah.smith@homeware.ae / Employee@123</div>
              <div><strong>Mike Johnson:</strong> mike.johnson@homeware.ae / Employee@123</div>
              <div><strong>Lisa Brown:</strong> lisa.brown@homeware.ae / Employee@123</div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Other login options
            </Link>
            <div className="text-xs text-slate-500">
              Need help? Contact HR at hr@homeware.ae
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}