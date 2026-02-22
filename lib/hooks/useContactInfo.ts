import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export interface ContactInfo {
  phone: string
  email: string
  address: string
  whatsapp?: string
  companyName?: string
  website?: string
}

const DEFAULT_CONTACT: ContactInfo = {
  phone: '80046639675',
  email: 'services@homeworkuae.com',
  address: 'Al Quoz – Dubai – United Arab Emirates',
  whatsapp: '+971 50 717 7059',
  companyName: 'Homework UAE',
  website: 'https://homeworkuae.com'
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        // Try to fetch from branding settings first
        const brandingRef = doc(db, 'settings', 'branding')
        const brandingSnap = await getDoc(brandingRef)
        
        if (brandingSnap.exists()) {
          const brandingData = brandingSnap.data()
          const brandingContact: Partial<ContactInfo> = {
            phone: brandingData.contactPhone || DEFAULT_CONTACT.phone,
            email: brandingData.contactEmail || DEFAULT_CONTACT.email,
            address: brandingData.contactAddress || DEFAULT_CONTACT.address,
            companyName: brandingData.companyName || DEFAULT_CONTACT.companyName,
            website: brandingData.website || DEFAULT_CONTACT.website
          }
          
          // Then fetch whatsapp from profile settings
          try {
            const profileRef = doc(db, 'profile-setting', 'admin-settings')
            const profileSnap = await getDoc(profileRef)
            if (profileSnap.exists() && profileSnap.data().profile?.whatsapp) {
              brandingContact.whatsapp = profileSnap.data().profile.whatsapp
            }
          } catch (e) {
            console.warn('Could not fetch profile settings for whatsapp:', e)
          }
          
          setContactInfo({
            ...DEFAULT_CONTACT,
            ...brandingContact as ContactInfo
          })
        } else {
          // Fallback to profile settings if branding doesn't exist
          const profileRef = doc(db, 'profile-setting', 'admin-settings')
          const profileSnap = await getDoc(profileRef)
          
          if (profileSnap.exists() && profileSnap.data().profile) {
            const profileData = profileSnap.data().profile
            setContactInfo({
              phone: profileData.phone || DEFAULT_CONTACT.phone,
              email: profileData.email || DEFAULT_CONTACT.email,
              address: profileData.address || DEFAULT_CONTACT.address,
              whatsapp: profileData.whatsapp || DEFAULT_CONTACT.whatsapp,
              companyName: profileData.company || DEFAULT_CONTACT.companyName,
              website: DEFAULT_CONTACT.website
            })
          }
        }
      } catch (err) {
        console.error('Error fetching contact info:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch contact info')
        setContactInfo(DEFAULT_CONTACT)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  return { contactInfo, isLoading, error }
}

// Format phone number for display (xxxx xxxx xxxx)
export function formatPhoneDisplay(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as xxxxx xxxxx (e.g., 80046639675 -> 800 4663 9675)
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`
  } else if (cleaned.length >= 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
  }
  return phone
}

// Format phone for tel: links (remove spaces)
export function formatPhoneLink(phone: string): string {
  return phone.replace(/\s+/g, '')
}
