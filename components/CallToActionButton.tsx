"use client"

import { Phone, Mail, ArrowRight } from 'lucide-react'
import { useContactInfo, formatPhoneDisplay, formatPhoneLink } from '@/lib/hooks/useContactInfo'

interface CallToActionButtonProps {
  variant?: 'phone' | 'email' | 'both'
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function CallToActionButton({
  variant = 'phone',
  fullWidth = false,
  size = 'md',
  showText = true
}: CallToActionButtonProps) {
  const { contactInfo, isLoading } = useContactInfo()

  const baseClasses = 'font-black uppercase tracking-widest hover:bg-pink-600 transition-all flex items-center gap-3 shadow-xl shadow-primary/30'
  
  const sizeClasses = {
    sm: 'px-6 py-3 rounded-xl font-medium text-[10px]',
    md: 'px-10 py-5 rounded-2xl text-xs',
    lg: 'px-12 py-6 rounded-3xl text-sm'
  }

  const widthClass = fullWidth ? 'w-full' : ''

  if (isLoading) {
    return <div className={`bg-gray-400 text-white ${sizeClasses[size]} ${baseClasses} ${widthClass} animate-pulse`} />
  }

  if (variant === 'phone') {
    return (
      <a 
        href={`tel:${formatPhoneLink(contactInfo.phone)}`} 
        className={`bg-primary text-white ${sizeClasses[size]} ${baseClasses} ${widthClass}`}
      >
        {showText && <>
          <Phone className="h-4 w-4" />
          <span>{formatPhoneDisplay(contactInfo.phone)}</span>
        </>}
      </a>
    )
  }

  if (variant === 'email') {
    return (
      <a 
        href={`mailto:${contactInfo.email}`} 
        className={`bg-white/10 text-white border border-white/20 ${sizeClasses[size]} ${baseClasses} ${widthClass} hover:bg-white hover:text-slate-900`}
      >
        {showText && <>
          <Mail className="h-4 w-4" />
          <span>Email Us</span>
        </>}
      </a>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      <a 
        href={`tel:${formatPhoneLink(contactInfo.phone)}`} 
        className={`bg-primary text-white ${sizeClasses[size]} ${baseClasses}`}
      >
        {showText && <>
          <Phone className="h-4 w-4" />
          <span>{formatPhoneDisplay(contactInfo.phone)}</span>
        </>}
      </a>
      <a 
        href={`mailto:${contactInfo.email}`} 
        className={`bg-white/10 text-white border border-white/20 ${sizeClasses[size]} ${baseClasses} hover:bg-white hover:text-slate-900`}
      >
        {showText && <>
          <Mail className="h-4 w-4" />
          <span>Email Us</span>
        </>}
      </a>
    </div>
  )
}
