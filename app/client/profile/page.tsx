'use client'

import { useState } from 'react'
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Heart,
  Award,
  TrendingUp,
  Edit2,
  Save,
  Camera
} from 'lucide-react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'Ahmed',
    lastName: 'Al-Mansoori',
    email: 'ahmed.mansoori@example.com',
    phone: '+971 50 XXX XXXX',
    address: 'Downtown Dubai',
    city: 'Dubai',
    area: 'Al Fahidi',
    zipCode: '12345',
    preference: 'Morning appointments preferred'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // API call would go here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account information and preferences</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${
            isEditing 
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="h-5 w-5" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-5 w-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4">Profile Picture</h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
            <User className="h-12 w-12" />
          </div>
          <div className="flex-1">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center gap-2 transition-colors mb-2">
              <Camera className="h-5 w-5" />
              Upload Photo
            </button>
            <p className="text-sm text-muted-foreground">JPG or PNG, max 5MB</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold mb-2 block">First Name</label>
            <input 
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">Last Name</label>
            <input 
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Address Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-bold mb-2 block">Street Address</label>
            <input 
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">City</label>
            <input 
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">Area / District</label>
            <input 
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">ZIP Code</label>
            <input 
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Service Preferences */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-blue-600" />
          Service Preferences
        </h2>
        <div>
          <label className="text-sm font-bold mb-2 block">Special Notes & Preferences</label>
          <textarea 
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            disabled={!isEditing}
            rows={4}
            placeholder="Any special requests or preferences for our team..."
            className="w-full px-3 py-2 border rounded-lg bg-background disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              defaultChecked 
              disabled={!isEditing}
              className="w-4 h-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-sm">Receive service reminders</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              defaultChecked 
              disabled={!isEditing}
              className="w-4 h-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-sm">Receive promotional offers</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              defaultChecked 
              disabled={!isEditing}
              className="w-4 h-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-sm">Newsletter subscription</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              defaultChecked={false}
              disabled={!isEditing}
              className="w-4 h-4 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-sm">SMS notifications</span>
          </label>
        </div>
      </div>

      {/* Loyalty & Rewards Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-purple-600 text-white rounded-lg">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Loyalty Points</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">2,450</p>
          <p className="text-xs text-muted-foreground mt-1">Earn AED 1 per booking</p>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-green-600 text-white rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Member Tier</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">Gold</p>
          <p className="text-xs text-muted-foreground mt-1">Next tier: Platinum (5,000 pts)</p>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 text-white rounded-lg">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Membership</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">Premium</p>
          <p className="text-xs text-muted-foreground mt-1">10% discount on all services</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-card border rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4">Account Settings</h2>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 border rounded-lg hover:bg-muted transition-colors text-left font-bold">
            Change Password
          </button>
          <button className="w-full px-4 py-2 border rounded-lg hover:bg-muted transition-colors text-left font-bold">
            Connected Devices
          </button>
          <button className="w-full px-4 py-2 border rounded-lg hover:bg-muted transition-colors text-left font-bold">
            Download My Data
          </button>
          <button className="w-full px-4 py-2 border rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors text-left font-bold text-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}