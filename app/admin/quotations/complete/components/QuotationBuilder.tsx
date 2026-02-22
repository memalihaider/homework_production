// 'use client'

// import { useState, useMemo, useEffect } from 'react'
// import { 
//   Plus, Trash2, Save, Eye, Percent, DollarSign, 
//   User, Building2, MapPin, Mail, Phone, ShoppingCart, 
//   Settings, FileText, ChevronDown, Check, X
// } from 'lucide-react'
// import { db } from '@/lib/firebase'
// import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore'

// interface Client {
//   id: string;
//   name: string;
//   company: string;
//   email: string;
//   phone: string;
//   location: string;
//   status: string;
// }

// interface Lead {
//   id: string;
//   name: string;
//   company: string;
//   email: string;
//   phone: string;
//   address: string;
//   status: string;
// }

// interface Service {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   sku: string;
// }

// interface Props {
//   initialData?: any;
//   onSave?: (data: any) => void;
//   onCancel: () => void;
// }

// export default function QuotationBuilder({ initialData, onSave, onCancel }: Props) {
//   const [formData, setFormData] = useState<any>({
//     quoteNumber: `#QT-${Date.now().toString().slice(-4)}-${new Date().getFullYear()}`,
//     clientId: '',
//     client: '',
//     company: '',
//     email: '',
//     phone: '',
//     location: '',
//     date: new Date().toISOString().split('T')[0],
//     validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//     dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//     currency: 'AED',
//     taxRate: 5,
//     discount: 0,
//     discountType: 'percentage',
//     template: 'professional',
//     status: 'Draft',
//     services: [],
//     products: [],
//     notes: '',
//     terms: '',
//     paymentMethods: ['bank-transfer'],
//     ...initialData
//   })

//   const [loading, setLoading] = useState(false)
//   const [saveSuccess, setSaveSuccess] = useState(false)
//   const [clients, setClients] = useState<Client[]>([])
//   const [leads, setLeads] = useState<Lead[]>([])
//   const [services, setServices] = useState<Service[]>([])
//   const [loadingData, setLoadingData] = useState(true)

//   // Fetch real data from Firebase
//   useEffect(() => {
//     fetchAllData()
//   }, [])

//   const fetchAllData = async () => {
//     try {
//       setLoadingData(true)
      
//       // Fetch clients from 'clients' collection
//       const clientsSnapshot = await getDocs(collection(db, 'clients'))
//       const clientsData = clientsSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Client[]
//       setClients(clientsData)

//       // Fetch leads from 'leads' collection
//       const leadsSnapshot = await getDocs(collection(db, 'leads'))
//       const leadsData = leadsSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Lead[]
//       setLeads(leadsData)

//       // Fetch services from 'services' collection where type is 'SERVICE'
//       const servicesQuery = query(
//         collection(db, 'services'),
//         where('type', '==', 'SERVICE')
//       )
//       const servicesSnapshot = await getDocs(servicesQuery)
//       const servicesData = servicesSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       })) as Service[]
//       setServices(servicesData)

//     } catch (error) {
//       console.error('Error fetching data:', error)
//       alert('Error loading data from Firebase')
//     } finally {
//       setLoadingData(false)
//     }
//   }

//   // Combine clients and leads for dropdown
//   const allContacts = [
//     ...clients.map(client => ({
//       id: `client_${client.id}`,
//       name: client.name,
//       company: client.company,
//       email: client.email,
//       phone: client.phone,
//       location: client.location,
//       type: 'Client'
//     })),
//     ...leads.map(lead => ({
//       id: `lead_${lead.id}`,
//       name: lead.name,
//       company: lead.company,
//       email: lead.email,
//       phone: lead.phone,
//       location: lead.address || '',
//       type: 'Lead'
//     }))
//   ]

//   // Fix the calculation error
//   const calculations = useMemo(() => {
//     const servicesTotal = (formData.services || []).reduce((sum: number, s: any) => {
//       const total = s.total || 0;
//       return sum + (typeof total === 'number' ? total : 0);
//     }, 0);
    
//     const productsTotal = (formData.products || []).reduce((sum: number, p: any) => {
//       const total = p.total || 0;
//       return sum + (typeof total === 'number' ? total : 0);
//     }, 0);
    
//     const subtotal = servicesTotal + productsTotal;
    
//     let discountAmount = 0;
//     if (formData.discountType === 'percentage') {
//       discountAmount = (subtotal * (formData.discount || 0)) / 100;
//     } else {
//       discountAmount = formData.discount || 0;
//     }

//     const afterDiscount = Math.max(0, subtotal - discountAmount);
//     const taxAmount = (afterDiscount * (formData.taxRate || 0)) / 100;
//     const total = afterDiscount + taxAmount;

//     return { 
//       subtotal: subtotal || 0, 
//       discountAmount: discountAmount || 0, 
//       taxAmount: taxAmount || 0, 
//       total: total || 0 
//     };
//   }, [formData])

//   const saveToFirebase = async (quotationData: any) => {
//     setLoading(true)
//     setSaveSuccess(false)
    
//     try {
//       // Recalculate totals before saving
//       const servicesTotal = (quotationData.services || []).reduce((sum: number, s: any) => sum + (s.total || 0), 0)
//       const productsTotal = (quotationData.products || []).reduce((sum: number, p: any) => sum + (p.total || 0), 0)
//       const subtotal = servicesTotal + productsTotal
      
//       let discountAmount = 0
//       if (quotationData.discountType === 'percentage') {
//         discountAmount = (subtotal * (quotationData.discount || 0)) / 100
//       } else {
//         discountAmount = quotationData.discount || 0
//       }

//       const afterDiscount = subtotal - discountAmount
//       const taxAmount = (afterDiscount * (quotationData.taxRate || 0)) / 100
//       const total = afterDiscount + taxAmount

//       // Prepare data for Firebase
//       const firebaseData = {
//         // Basic info
//         quoteNumber: quotationData.quoteNumber,
//         clientId: quotationData.clientId,
//         client: quotationData.client,
//         company: quotationData.company,
//         email: quotationData.email,
//         phone: quotationData.phone,
//         location: quotationData.location,
        
//         // Dates
//         date: quotationData.date,
//         validUntil: quotationData.validUntil,
//         dueDate: quotationData.dueDate,
        
//         // Financial
//         currency: quotationData.currency,
//         taxRate: quotationData.taxRate,
//         discount: quotationData.discount,
//         discountType: quotationData.discountType,
        
//         // Calculations
//         subtotal: subtotal,
//         discountAmount: discountAmount,
//         taxAmount: taxAmount,
//         total: total,
        
//         // Other
//         template: quotationData.template,
//         status: quotationData.status,
//         notes: quotationData.notes,
//         terms: quotationData.terms,
//         paymentMethods: quotationData.paymentMethods,
        
//         // Services and Products
//         services: (quotationData.services || []).map((service: any) => ({
//           id: service.id,
//           name: service.name || '',
//           description: service.description || '',
//           quantity: service.quantity || 0,
//           unitPrice: service.unitPrice || 0,
//           total: service.total || 0
//         })),
        
//         products: (quotationData.products || []).map((product: any) => ({
//           id: product.id,
//           name: product.name || '',
//           sku: product.sku || '',
//           quantity: product.quantity || 0,
//           unitPrice: product.unitPrice || 0,
//           total: product.total || 0
//         })),
        
//         // Metadata
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//         createdBy: 'user'
//       }

//       const docRef = await addDoc(collection(db, "quotations"), firebaseData)
      
//       console.log("Quotation saved with ID: ", docRef.id)
      
//       setSaveSuccess(true)
//       setTimeout(() => setSaveSuccess(false), 3000)
      
//       if (onSave) {
//         onSave({ ...firebaseData, firebaseId: docRef.id })
//       }
      
//       alert(`✅ Quotation saved successfully}`)
      
//       return docRef.id
      
//     } catch (error) {
//       console.error("Error saving quotation to Firebase: ", error)
//       alert("❌ Error saving quotation. Please try again.")
//       return null
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSave = async () => {
//     if (!formData.client || formData.client === '') {
//       alert('⚠️ Please select a client before saving.')
//       return
//     }

//     if (formData.services.length === 0 && formData.products.length === 0) {
//       alert('⚠️ Please add at least one service or product before saving.')
//       return
//     }

//     await saveToFirebase(formData)
//   }

//   const handleAddService = () => {
//     const newService = {
//       id: Date.now().toString(),
//       name: '',
//       quantity: 1,
//       unitPrice: 0,
//       total: 0,
//       description: ''
//     }
//     setFormData({ ...formData, services: [...formData.services, newService] })
//   }

//   const handleUpdateService = (id: string, field: string, value: any) => {
//     const updated = formData.services.map((s: any) => {
//       if (s.id === id) {
//         const up = { ...s, [field]: value }
//         if (field === 'quantity' || field === 'unitPrice') {
//           up.total = (up.quantity || 0) * (up.unitPrice || 0)
//         }
//         return up
//       }
//       return s
//     })
//     setFormData({ ...formData, services: updated })
//   }

//   const handleRemoveService = (id: string) => {
//     setFormData({ ...formData, services: formData.services.filter((s: any) => s.id !== id) })
//   }

//   const handleAddProduct = () => {
//     const newProduct = {
//       id: Date.now().toString(),
//       name: '',
//       quantity: 1,
//       unitPrice: 0,
//       total: 0,
//       sku: ''
//     }
//     setFormData({ ...formData, products: [...formData.products, newProduct] })
//   }

//   const handleUpdateProduct = (id: string, field: string, value: any) => {
//     const updated = formData.products.map((p: any) => {
//       if (p.id === id) {
//         const up = { ...p, [field]: value }
//         if (field === 'quantity' || field === 'unitPrice') {
//           up.total = (up.quantity || 0) * (up.unitPrice || 0)
//         }
//         return up
//       }
//       return p
//     })
//     setFormData({ ...formData, products: updated })
//   }

//   const handleRemoveProduct = (id: string) => {
//     setFormData({ ...formData, products: formData.products.filter((p: any) => p.id !== id) })
//   }

//   const selectContact = (contactId: string) => {
//     const contact = allContacts.find(c => c.id === contactId)
//     if (contact) {
//       setFormData({
//         ...formData,
//         clientId: contact.id,
//         client: contact.name,
//         company: contact.company,
//         email: contact.email,
//         phone: contact.phone,
//         location: contact.location
//       })
//     }
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-6">
//       {/* LEFT: FORM */}
//       <div className="flex-1 space-y-6">
//         {/* Header Section */}
//         <div className="bg-white border border-gray-300 rounded p-4 space-y-4 shadow-none">
//           <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
//              <h3 className="text-sm font-bold uppercase tracking-tight text-black flex items-center gap-2">
//                 <FileText className="w-4 h-4" />
//                 Quotation Information
//              </h3>
//              <div className="flex items-center gap-2">
//                <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
//                   {formData.quoteNumber}
//                </span>
//                {saveSuccess && (
//                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
//                     ✓ Saved 
//                  </span>
//                )}
//              </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
//                 {loadingData ? 'Loading Contacts...' : 'Select Client/Lead'}
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <select
//                   onChange={(e) => selectContact(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black bg-white font-medium"
//                   disabled={loadingData}
//                   value={formData.clientId || ''}
//                 >
//                   <option value="">Select Client or Lead...</option>
//                   {allContacts.map(contact => (
//                     <option key={contact.id} value={contact.id}>
//                       {contact.name} - {contact.company} ({contact.type})
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <p className="text-[10px] text-gray-400 mt-1">
//                 {clients.length} clients & {leads.length} leads loaded from Firebase
//               </p>
//             </div>
            
//             <div className="grid grid-cols-2 gap-3">
//               <div className="space-y-1">
//                 <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Issue Date</label>
//                 <input
//                   type="date"
//                   value={formData.date}
//                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Valid Until</label>
//                 <input
//                   type="date"
//                   value={formData.validUntil}
//                   onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/50 p-3 rounded border border-gray-100 italic">
//             <div className="space-y-1">
//                <label className="text-[9px] uppercase font-bold text-gray-400">Company</label>
//                <input
//                 type="text"
//                 placeholder="Company Name"
//                 value={formData.company}
//                 onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                 className="w-full bg-transparent border-none p-0 text-xs font-bold text-black focus:ring-0 placeholder:text-gray-300"
//               />
//             </div>
//             <div className="space-y-1">
//                <label className="text-[9px] uppercase font-bold text-gray-400">Email Address</label>
//                <input
//                 type="email"
//                 placeholder="client@email.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="w-full bg-transparent border-none p-0 text-xs font-bold text-black focus:ring-0 placeholder:text-gray-300"
//               />
//             </div>
//             <div className="space-y-1">
//                <label className="text-[9px] uppercase font-bold text-gray-400">Location / Area</label>
//                <input
//                 type="text"
//                 placeholder="Dubai Marina, UAE"
//                 value={formData.location}
//                 onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                 className="w-full bg-transparent border-none p-0 text-xs font-bold text-black focus:ring-0 placeholder:text-gray-300"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className="bg-white border border-gray-300 rounded p-4 space-y-4 shadow-none">
//           <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
//             <h3 className="text-sm font-bold uppercase tracking-tight text-black flex items-center gap-2">
//               <Settings className="w-4 h-4" />
//               Service Line Items
//             </h3>
//             <button 
//               onClick={handleAddService}
//               className="px-3 py-1 bg-black text-white text-[10px] uppercase font-bold rounded hover:bg-gray-800 transition-colors flex items-center gap-1.5"
//             >
//               <Plus className="w-3 h-3" />
//               Add Service
//             </button>
//           </div>

//           <div className="space-y-2">
//             {formData.services.map((service: any) => (
//               <div key={service.id} className="grid grid-cols-12 gap-2 items-start bg-white border border-gray-200 p-2 rounded relative group">
//                 <div className="col-span-4 space-y-1">
//                    <select 
//                     onChange={(e) => {
//                       const selectedService = services.find(s => s.name === e.target.value)
//                       if (selectedService) {
//                         handleUpdateService(service.id, 'unitPrice', selectedService.price)
//                       }
//                       handleUpdateService(service.id, 'name', e.target.value)
//                     }}
//                     className="w-full text-xs font-bold border-none p-1 focus:ring-0 bg-gray-50 rounded"
//                     value={service.name}
//                     disabled={loadingData}
//                    >
//                     <option value="">Choose Service...</option>
//                     {services.map(svc => (
//                       <option key={svc.id} value={svc.name}>
//                         {svc.name} - AED {svc.price}
//                       </option>
//                     ))}
//                    </select>
//                    <input 
//                     type="text"
//                     placeholder="Brief description..."
//                     className="w-full text-[10px] border-none p-1 focus:ring-0 text-gray-500 italic"
//                     value={service.description}
//                     onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
//                    />
//                 </div>
//                 <div className="col-span-2">
//                    <input 
//                     type="number" 
//                     placeholder="Qty" 
//                     className="w-full text-xs font-bold text-center border-none p-2 bg-gray-50 rounded focus:ring-0"
//                     value={service.quantity}
//                     onChange={(e) => handleUpdateService(service.id, 'quantity', Number(e.target.value) || 0)}
//                     min="1"
//                    />
//                 </div>
//                 <div className="col-span-3">
//                    <div className="relative">
//                       <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">AED</span>
//                       <input 
//                         type="number" 
//                         placeholder="Price" 
//                         className="w-full text-xs font-bold text-right border-none p-2 pl-9 bg-gray-50 rounded focus:ring-0"
//                         value={service.unitPrice}
//                         onChange={(e) => handleUpdateService(service.id, 'unitPrice', Number(e.target.value) || 0)}
//                         min="0"
//                         step="0.01"
//                       />
//                    </div>
//                 </div>
//                 <div className="col-span-2">
//                    <div className="p-2 text-right text-xs font-black text-black">
//                       {((service.total || 0).toLocaleString())}
//                    </div>
//                 </div>
//                 <div className="col-span-1 flex justify-center pt-1.5">
//                    <button 
//                     onClick={() => handleRemoveService(service.id)}
//                     className="p-1 text-gray-300 hover:text-red-500 transition-colors"
//                    >
//                      <Trash2 className="w-4 h-4" />
//                    </button>
//                 </div>
//               </div>
//             ))}
            
//             {formData.services.length === 0 && (
//               <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded text-gray-400 text-xs italic">
//                 {loadingData ? 'Loading services...' : 'No services added. Click "Add Service" to start building your quote.'}
//               </div>
//             )}
            
//             {!loadingData && services.length === 0 && (
//               <div className="text-center py-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-600 text-xs">
//                 No services found in Firebase. Please add services first.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Notes & Terms */}
//         <div className="bg-white border border-gray-300 rounded p-4 space-y-4 shadow-none">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-1.5">
//               <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Notes to Client</label>
//               <textarea 
//                 rows={3}
//                 placeholder="Personal message or important details..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-black resize-none"
//                 value={formData.notes}
//                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               />
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Terms & Conditions</label>
//               <textarea 
//                 rows={3}
//                 placeholder="Payment terms, validity, scope boundaries..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-black resize-none"
//                 value={formData.terms}
//                 onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT: SUMMARY & ACTIONS */}
//       <div className="w-full lg:w-[320px] space-y-4">
//         {/* TOTALS BOX */}
//         <div className="bg-black text-white rounded p-1 shadow-none">
//           <div className="bg-white border border-black rounded p-4 space-y-4">
//             <div className="flex justify-between items-center border-b border-gray-50 pb-3">
//                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pricing Summary</span>
//                <span className="text-[10px] font-medium text-black bg-gray-100 px-2 py-0.5 rounded uppercase">AED</span>
//             </div>

//             <div className="space-y-2.5">
//                <div className="flex justify-between text-xs font-bold text-gray-600">
//                   <span>Subtotal</span>
//                   <span>{calculations.subtotal.toLocaleString()}</span>
//                </div>
               
//                <div className="flex items-center gap-2">
//                   <div className="flex-1 space-y-1">
//                     <label className="text-[9px] uppercase font-black text-gray-400">Discount</label>
//                     <div className="flex gap-1">
//                       <input 
//                         type="number"
//                         className="w-full text-[13px] text-black font-black border border-gray-200 rounded px-2 py-1 focus:border-black focus:ring-0"
//                         value={formData.discount}
//                         onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) || 0 })}
//                         min="0"
//                       />
//                       <button 
//                         onClick={() => setFormData({ ...formData, discountType: formData.discountType === 'percentage' ? 'fixed' : 'percentage' })}
//                         className="px-2 border border-gray-200 rounded text-[10px] font-bold bg-gray-50"
//                       >
//                          {formData.discountType === 'percentage' ? '%' : 'FIX'}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex-1 space-y-1">
//                     <label className="text-[9px] uppercase font-black text-gray-400">Tax (%)</label>
//                     <input 
//                         type="number"
//                         className="w-full text-[13px] text-black font-black border border-gray-200 rounded px-2 py-1 focus:border-black focus:ring-0"
//                         value={formData.taxRate}
//                         onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) || 0 })}
//                         min="0"
//                         max="100"
//                       />
//                   </div>
//                </div>

//                <div className="pt-2 space-y-1">
//                   {calculations.discountAmount > 0 && (
//                     <div className="flex justify-between text-[11px] font-bold text-green-600">
//                       <span>Discount Apply</span>
//                       <span>-{calculations.discountAmount.toLocaleString()}</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between text-[11px] font-bold text-gray-400">
//                     <span>Tax Amount (VAT)</span>
//                     <span>+{calculations.taxAmount.toLocaleString()}</span>
//                   </div>
//                </div>

//                <div className="pt-4 border-t-2 border-black">
//                   <div className="flex justify-between items-end">
//                      <div>
//                         <p className="text-[9px] uppercase font-black text-black leading-none mb-1">Total Payable</p>
//                         <p className="text-2xl font-black text-black leading-none tracking-tighter">
//                           {calculations.total.toLocaleString()}
//                         </p>
//                      </div>
//                      <p className="text-[10px] font-bold text-gray-400">AED</p>
//                   </div>
//                </div>
//             </div>
//           </div>
//         </div>

//         {/* PRIMARY ACTIONS */}
//         <div className="space-y-2">
//            <button 
//             onClick={handleSave}
//             disabled={loading || loadingData}
//             className={`w-full flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all shadow-lg text-center ${
//               loading || loadingData
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-black text-white hover:bg-gray-800 shadow-black/10'
//             }`}
//            >
//               {loading ? (
//                 <>
//                   <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
//                   Saving to Firebase...
//                 </>
//               ) : loadingData ? (
//                 <>
//                   <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
//                   Loading Data...
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4" />
//                   Save Quotation
//                 </>
//               )}
//            </button>
           
//            <div className="grid grid-cols-2 gap-2">
//               <button 
//                 disabled={loadingData}
//                 className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 py-2 rounded text-[11px] font-bold uppercase tracking-tight hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                  <Eye className="w-3.5 h-3.5" />
//                  Preview
//               </button>
//               <button 
//                 onClick={onCancel}
//                 disabled={loading}
//                 className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded text-[11px] font-bold uppercase tracking-tight hover:bg-red-50 disabled:opacity-50"
//               >
//                  <X className="w-3.5 h-3.5" />
//                  Cancel
//               </button>
//            </div>
           
//            {saveSuccess && (
//              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-center">
//                <p className="text-[10px] font-bold text-green-700">
//                  ✓ Quotation saved to Firebase collection "quotations"!
//                </p>
//                <p className="text-[9px] text-green-600 mt-1">
//                  All data including calculations saved successfully
//                </p>
//              </div>
//            )}
           
//            {loadingData && (
//              <></>
//            )}
//         </div>
//       </div>
//     </div>
//   )
// }

// new code
'use client'

import { useState, useMemo, useEffect } from 'react'
import { 
  Plus, Trash2, Save, Eye, Percent, DollarSign, 
  User, Building2, MapPin, Mail, Phone, ShoppingCart, 
  Settings, FileText, ChevronDown, Check, X, Download
} from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, getDocs, query, where, getDoc, doc } from 'firebase/firestore'

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  sku: string;
}

interface Props {
  initialData?: any;
  onSave?: (data: any) => void;
  onCancel: () => void;
}

export default function QuotationBuilder({ initialData, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<any>({
    quoteNumber: `#QT-${Date.now().toString().slice(-4)}-${new Date().getFullYear()}`,
    clientId: '',
    client: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'AED',
    taxRate: 5,
    discount: 0,
    discountType: 'percentage',
    template: 'professional',
    status: 'Draft',
    services: [],
    products: [],
    notes: '',
    terms: '',
    paymentMethods: ['bank-transfer'],
    ...initialData
  })

  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [showCustomClient, setShowCustomClient] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [brandingSettings, setBrandingSettings] = useState<any>({
    companyName: '',
    logo: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    website: ''
  })
  const [customClient, setCustomClient] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: ''
  })

  // Fetch real data from Firebase
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoadingData(true)
      
      // Fetch clients from 'clients' collection
      const clientsSnapshot = await getDocs(collection(db, 'clients'))
      const clientsData = clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Client[]
      setClients(clientsData)

      // Fetch leads from 'leads' collection
      const leadsSnapshot = await getDocs(collection(db, 'leads'))
      const leadsData = leadsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[]
      setLeads(leadsData)

      // Fetch services from 'services' collection where type is 'SERVICE'
      const servicesQuery = query(
        collection(db, 'services'),
        where('type', '==', 'SERVICE')
      )
      const servicesSnapshot = await getDocs(servicesQuery)
      const servicesData = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[]
      setServices(servicesData)

      // Fetch branding settings from 'settings' collection
      const settingsDoc = await getDoc(doc(db, 'settings', 'branding'))
      if (settingsDoc.exists()) {
        setBrandingSettings(settingsDoc.data())
      }

    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error loading data from Firebase')
    } finally {
      setLoadingData(false)
    }
  }

  // Combine clients and leads for dropdown
  const allContacts = [
    ...clients.map(client => ({
      id: `client_${client.id}`,
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      location: client.location,
      type: 'Client'
    })),
    ...leads.map(lead => ({
      id: `lead_${lead.id}`,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      location: lead.address || '',
      type: 'Lead'
    }))
  ]

  // Fix the calculation error
  const calculations = useMemo(() => {
    const servicesTotal = (formData.services || []).reduce((sum: number, s: any) => {
      const total = s.total || 0;
      return sum + (typeof total === 'number' ? total : 0);
    }, 0);
    
    const productsTotal = (formData.products || []).reduce((sum: number, p: any) => {
      const total = p.total || 0;
      return sum + (typeof total === 'number' ? total : 0);
    }, 0);
    
    const subtotal = servicesTotal + productsTotal;
    
    let discountAmount = 0;
    if (formData.discountType === 'percentage') {
      discountAmount = (subtotal * (formData.discount || 0)) / 100;
    } else {
      discountAmount = formData.discount || 0;
    }

    const afterDiscount = Math.max(0, subtotal - discountAmount);
    const taxAmount = (afterDiscount * (formData.taxRate || 0)) / 100;
    const total = afterDiscount + taxAmount;

    return { 
      subtotal: subtotal || 0, 
      discountAmount: discountAmount || 0, 
      taxAmount: taxAmount || 0, 
      total: total || 0 
    };
  }, [formData])

  const saveToFirebase = async (quotationData: any) => {
    setLoading(true)
    setSaveSuccess(false)
    
    try {
      // Recalculate totals before saving
      const servicesTotal = (quotationData.services || []).reduce((sum: number, s: any) => sum + (s.total || 0), 0)
      const productsTotal = (quotationData.products || []).reduce((sum: number, p: any) => sum + (p.total || 0), 0)
      const subtotal = servicesTotal + productsTotal
      
      let discountAmount = 0
      if (quotationData.discountType === 'percentage') {
        discountAmount = (subtotal * (quotationData.discount || 0)) / 100
      } else {
        discountAmount = quotationData.discount || 0
      }

      const afterDiscount = subtotal - discountAmount
      const taxAmount = (afterDiscount * (quotationData.taxRate || 0)) / 100
      const total = afterDiscount + taxAmount

      // Prepare data for Firebase
      const firebaseData = {
        // Basic info
        quoteNumber: quotationData.quoteNumber,
        clientId: quotationData.clientId,
        client: quotationData.client,
        company: quotationData.company,
        email: quotationData.email,
        phone: quotationData.phone,
        location: quotationData.location,
        
        // Dates
        date: quotationData.date,
        validUntil: quotationData.validUntil,
        dueDate: quotationData.dueDate,
        
        // Financial
        currency: quotationData.currency,
        taxRate: quotationData.taxRate,
        discount: quotationData.discount,
        discountType: quotationData.discountType,
        
        // Calculations
        subtotal: subtotal,
        discountAmount: discountAmount,
        taxAmount: taxAmount,
        total: total,
        
        // Other
        template: quotationData.template,
        status: quotationData.status,
        notes: quotationData.notes,
        terms: quotationData.terms,
        paymentMethods: quotationData.paymentMethods,
        
        // Services and Products
        services: (quotationData.services || []).map((service: any) => ({
          id: service.id,
          name: service.name || '',
          description: service.description || '',
          quantity: service.quantity || 0,
          unitPrice: service.unitPrice || 0,
          total: service.total || 0
        })),
        
        products: (quotationData.products || []).map((product: any) => ({
          id: product.id,
          name: product.name || '',
          sku: product.sku || '',
          quantity: product.quantity || 0,
          unitPrice: product.unitPrice || 0,
          total: product.total || 0
        })),
        
        // Metadata
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'user'
      }

      const docRef = await addDoc(collection(db, "quotations"), firebaseData)
      
      console.log("Quotation saved with ID: ", docRef.id)
      
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
      
      if (onSave) {
        onSave({ ...firebaseData, firebaseId: docRef.id })
      }
      
      alert(`✅ Quotation saved successfully}`)
      
      return docRef.id
      
    } catch (error) {
      console.error("Error saving quotation to Firebase: ", error)
      alert("❌ Error saving quotation. Please try again.")
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.client || formData.client === '') {
      alert('⚠️ Please select a client before saving.')
      return
    }

    if (formData.services.length === 0 && formData.products.length === 0) {
      alert('⚠️ Please add at least one service or product before saving.')
      return
    }

    await saveToFirebase(formData)
  }

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
      description: ''
    }
    setFormData({ ...formData, services: [...formData.services, newService] })
  }

  const handleUpdateService = (id: string, field: string, value: any) => {
    const updated = formData.services.map((s: any) => {
      if (s.id === id) {
        const up = { ...s, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          up.total = (up.quantity || 0) * (up.unitPrice || 0)
        }
        return up
      }
      return s
    })
    setFormData({ ...formData, services: updated })
  }

  const handleRemoveService = (id: string) => {
    setFormData({ ...formData, services: formData.services.filter((s: any) => s.id !== id) })
  }

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
      sku: ''
    }
    setFormData({ ...formData, products: [...formData.products, newProduct] })
  }

  const handleUpdateProduct = (id: string, field: string, value: any) => {
    const updated = formData.products.map((p: any) => {
      if (p.id === id) {
        const up = { ...p, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          up.total = (up.quantity || 0) * (up.unitPrice || 0)
        }
        return up
      }
      return p
    })
    setFormData({ ...formData, products: updated })
  }

  const handleRemoveProduct = (id: string) => {
    setFormData({ ...formData, products: formData.products.filter((p: any) => p.id !== id) })
  }

  const selectContact = (contactId: string) => {
    const contact = allContacts.find(c => c.id === contactId)
    if (contact) {
      setFormData({
        ...formData,
        clientId: contact.id,
        client: contact.name,
        company: contact.company,
        email: contact.email,
        phone: contact.phone,
        location: contact.location
      })
      // Hide custom client form when selecting from dropdown
      setShowCustomClient(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      if (!formData.client) {
        alert('Please select a client before downloading')
        return
      }

      const { jsPDF } = await import('jspdf')
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      let yPosition = 15

      // Company Logo and Branding Header
      if (brandingSettings?.logo) {
        try {
          const logoImage = brandingSettings.logo
          pdf.addImage(logoImage, 'PNG', 20, yPosition, 25, 20)
          yPosition += 22
        } catch (e) {
          console.warn('Could not add logo:', e)
          yPosition += 5
        }
      } else {
        yPosition += 8
      }

      // Company Name and Contact Info
      if (brandingSettings?.companyName) {
        pdf.setFontSize(18)
        pdf.setTextColor(30, 58, 138) // Blue-900
        pdf.text(brandingSettings.companyName, 20, yPosition)
        yPosition += 8
      }

      // Contact Information
      if (brandingSettings?.contactEmail || brandingSettings?.contactPhone || brandingSettings?.contactAddress || brandingSettings?.website) {
        pdf.setFontSize(8)
        pdf.setTextColor(100, 100, 100)
        const contactItems = []
        if (brandingSettings?.contactEmail) contactItems.push(`Email: ${brandingSettings.contactEmail}`)
        if (brandingSettings?.contactPhone) contactItems.push(`Phone: ${brandingSettings.contactPhone}`)
        if (brandingSettings?.contactAddress) contactItems.push(`Address: ${brandingSettings.contactAddress}`)
        if (brandingSettings?.website) contactItems.push(`Website: ${brandingSettings.website}`)
        
        contactItems.forEach(item => {
          pdf.text(item, 20, yPosition)
          yPosition += 3
        })
        yPosition += 3
      }

      // Border line
      pdf.setDrawColor(37, 99, 235) // Blue-600
      pdf.setLineWidth(1.5)
      pdf.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 8

      // Title
      pdf.setFontSize(32)
      pdf.setTextColor(30, 58, 138) // Blue-900
      pdf.text('QUOTATION', 20, yPosition)
      yPosition += 12

      // Quote details header - 4 column grid
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      
      const colWidth = (pageWidth - 40) / 4
      const details = [
        { label: 'Quote #', value: formData.quoteNumber },
        { label: 'Date', value: new Date(formData.date).toLocaleDateString() },
        { label: 'Valid Until', value: new Date(formData.validUntil).toLocaleDateString() },
        { label: 'Currency', value: formData.currency }
      ]
      
      details.forEach((detail, idx) => {
        const x = 20 + (idx * colWidth)
        pdf.text(detail.label, x, yPosition, { maxWidth: colWidth - 2 })
        pdf.setTextColor(30, 58, 138)
        pdf.setFontSize(10)
        pdf.text(detail.value, x, yPosition + 5, { maxWidth: colWidth - 2 })
        pdf.setTextColor(100, 100, 100)
        pdf.setFontSize(8)
      })
      yPosition += 15

      // Separator line
      pdf.setDrawColor(220, 220, 220)
      pdf.setLineWidth(0.5)
      pdf.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 8

      // Bill To section
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text('BILL TO', 20, yPosition)
      yPosition += 4
      
      pdf.setFontSize(10)
      pdf.setTextColor(30, 58, 138)
      pdf.text(formData.client, 20, yPosition)
      yPosition += 5

      pdf.setFontSize(8)
      pdf.setTextColor(80, 80, 80)
      if (formData.company) {
        pdf.text(`${formData.company}`, 20, yPosition)
        yPosition += 3
      }
      if (formData.email) {
        pdf.text(`${formData.email}`, 20, yPosition)
        yPosition += 3
      }
      if (formData.phone) {
        pdf.text(`${formData.phone}`, 20, yPosition)
        yPosition += 3
      }
      if (formData.location) {
        pdf.text(`Location: ${formData.location}`, 20, yPosition)
        yPosition += 4
      }

      yPosition += 5

      // Services/Products table
      if (formData.services?.length > 0 || formData.products?.length > 0) {
        // Table header
        pdf.setFillColor(239, 246, 255) // Blue-50
        pdf.rect(20, yPosition, pageWidth - 40, 6, 'F')
        
        pdf.setFontSize(9)
        pdf.setTextColor(30, 58, 138)
        pdf.text('Description', 22, yPosition + 4)
        pdf.text('Qty', 130, yPosition + 4)
        pdf.text('Unit Price', 150, yPosition + 4)
        pdf.text('Total', pageWidth - 25, yPosition + 4, { align: 'right' })
        
        yPosition += 8

        // Table rows
        pdf.setFontSize(9)
        pdf.setTextColor(51, 51, 51)

        const items = [...(formData.services || []), ...(formData.products || [])]
        items.forEach((item: any) => {
          if (yPosition > 250) {
            pdf.addPage()
            yPosition = 20
          }

          const description = `${item.name}${item.description ? ` - ${item.description}` : ''}`
          pdf.text(description, 22, yPosition)
          pdf.text(String(item.quantity), 130, yPosition)
          pdf.text(`${item.unitPrice?.toLocaleString()}`, 150, yPosition)
          pdf.text(`${item.total?.toLocaleString()}`, pageWidth - 25, yPosition, { align: 'right' })
          
          yPosition += 5
        })

        yPosition += 5
      }

      // Summary section
      yPosition += 5
      const summaryX = pageWidth - 70
      
      pdf.setFontSize(9)
      pdf.setTextColor(51, 51, 51)
      pdf.text('Subtotal:', summaryX, yPosition)
      pdf.text(`${calculations.subtotal?.toLocaleString()} ${formData.currency}`, pageWidth - 20, yPosition, { align: 'right' })
      yPosition += 5

      if (calculations.discountAmount > 0) {
        pdf.setTextColor(34, 197, 94) // Green
        pdf.text(`Discount (-${formData.discount}${formData.discountType === 'percentage' ? '%' : ''})`, summaryX, yPosition)
        pdf.text(`${calculations.discountAmount?.toLocaleString()} ${formData.currency}`, pageWidth - 20, yPosition, { align: 'right' })
        yPosition += 5
      }

      pdf.setTextColor(51, 51, 51)
      pdf.text(`Tax (${formData.taxRate}%):`, summaryX, yPosition)
      pdf.text(`${calculations.taxAmount?.toLocaleString()} ${formData.currency}`, pageWidth - 20, yPosition, { align: 'right' })
      yPosition += 6

      // Total line
      pdf.setDrawColor(100, 100, 100)
      pdf.setLineWidth(0.5)
      pdf.line(summaryX, yPosition, pageWidth - 20, yPosition)
      yPosition += 5

      pdf.setFontSize(12)
      pdf.setTextColor(30, 58, 138)
      pdf.setFont(undefined, 'bold')
      pdf.text('TOTAL:', summaryX, yPosition)
      pdf.text(`${calculations.total?.toLocaleString()} ${formData.currency}`, pageWidth - 20, yPosition, { align: 'right' })

      // Save PDF
      pdf.save(`${formData.quoteNumber}.pdf`)
      alert('✅ PDF downloaded successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('❌ Error generating PDF. Please check console and try again.')
    }
  }

  const handleAddCustomClient = () => {
    if (!customClient.name.trim()) {
      alert('Please enter client name')
      return
    }
    
    // Set custom client to form
    setFormData({
      ...formData,
      clientId: `custom_${Date.now()}`,
      client: customClient.name,
      company: customClient.company,
      email: customClient.email,
      phone: customClient.phone,
      location: customClient.location
    })
    
    // Reset and close custom client form
    setCustomClient({
      name: '',
      company: '',
      email: '',
      phone: '',
      location: ''
    })
    setShowCustomClient(false)
    
    alert(`Custom client "${customClient.name}" added successfully!`)
  }

  const handleCancelCustomClient = () => {
    setCustomClient({
      name: '',
      company: '',
      email: '',
      phone: '',
      location: ''
    })
    setShowCustomClient(false)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: FORM */}
      <div className="flex-1 space-y-6">
        {/* Header Section */}
        <div className="bg-white border border-gray-300 rounded p-4 space-y-4 shadow-none">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
             <h3 className="text-sm font-bold uppercase tracking-tight text-blue-900 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Quotation Information
             </h3>
             <div className="flex items-center gap-2">
               <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                  {formData.quoteNumber}
               </span>
               {saveSuccess && (
                 <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    ✓ Saved 
                 </span>
               )}
             </div>
          </div>

          {/* Client Selection Section */}
          <div className="space-y-3">
            {/* Custom Client Button */}
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                {loadingData ? 'Loading Contacts...' : 'Select Client/Lead'}
              </label>
              <button
                onClick={() => setShowCustomClient(!showCustomClient)}
                className="flex items-center gap-1 px-3 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3 h-3" />
                {showCustomClient ? 'Cancel Custom Client' : 'Add Custom Client'}
              </button>
            </div>

            {/* Custom Client Form */}
            {showCustomClient && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">Add New Client Details</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Client Name *</label>
                    <input
                      type="text"
                      placeholder="Enter client name"
                      value={customClient.name}
                      onChange={(e) => setCustomClient({...customClient, name: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Company</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      value={customClient.company}
                      onChange={(e) => setCustomClient({...customClient, company: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Email</label>
                    <input
                      type="email"
                      placeholder="client@email.com"
                      value={customClient.email}
                      onChange={(e) => setCustomClient({...customClient, email: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={customClient.phone}
                      onChange={(e) => setCustomClient({...customClient, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Location</label>
                    <input
                      type="text"
                      placeholder="Dubai Marina, UAE"
                      value={customClient.location}
                      onChange={(e) => setCustomClient({...customClient, location: e.target.value})}
                      className="w-full px-3 py-2 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleAddCustomClient}
                    disabled={!customClient.name.trim()}
                    className={`px-4 py-2 rounded text-xs font-bold ${
                      customClient.name.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add Client to Quotation
                  </button>
                  <button
                    onClick={handleCancelCustomClient}
                    className="px-4 py-2 rounded text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-[10px] text-blue-600">
                  * Client name is required. Other fields are optional.
                </p>
              </div>
            )}

            {/* Client Selection Dropdown (only show when custom client form is hidden) */}
            {!showCustomClient && (
              <>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    onChange={(e) => selectContact(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black bg-white font-medium"
                    disabled={loadingData}
                    value={formData.clientId || ''}
                  >
                    <option value="">Select Client or Lead...</option>
                    {allContacts.map(contact => (
                      <option key={contact.id} value={contact.id}>
                        {contact.name} - {contact.company} ({contact.type})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] text-gray-400">
                  {clients.length} clients & {leads.length} leads loaded from Firebase
                </p>
              </>
            )}

            {/* Selected Client Info */}
            {formData.client && !showCustomClient && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">Selected Client:</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    formData.clientId?.startsWith('custom_') 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {formData.clientId?.startsWith('custom_') ? 'Custom Client' : 'Existing Client'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-gray-500">Name:</span>
                    <span className="ml-2 text-xs font-bold text-black">{formData.client}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500">Company:</span>
                    <span className="ml-2 text-xs font-bold text-black">{formData.company || 'N/A'}</span>
                  </div>
                  {formData.email && (
                    <div>
                      <span className="text-[11px] font-bold text-gray-500">Email:</span>
                      <span className="ml-2 text-xs font-bold text-black">{formData.email}</span>
                    </div>
                  )}
                  {formData.phone && (
                    <div>
                      <span className="text-[11px] font-bold text-gray-500">Phone:</span>
                      <span className="ml-2 text-xs font-bold text-black">{formData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Issue Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Valid Until</label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Client Details Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/50 p-3 rounded border border-gray-100 italic">
            <div className="space-y-1">
               <label className="text-[9px] uppercase font-bold text-gray-400">Company</label>
               <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-xs font-bold text-black focus:ring-0 placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-1">
               <label className="text-[9px] uppercase font-bold text-gray-400">Email Address</label>
               <input
                type="email"
                placeholder="client@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-xs font-bold text-black focus:ring-0 placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-1">
               <label className="text-[9px] uppercase font-bold text-gray-400">Location / Area</label>
               <input
                type="text"
                placeholder="Dubai Marina, UAE"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-transparent border-none p-0 text-xs font-bold text-black focus:ring-0 placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white border border-gray-300 rounded p-4 space-y-4 shadow-none">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
            <h3 className="text-sm font-bold uppercase tracking-tight text-blue-900 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Service Line Items
            </h3>
            <button 
              onClick={handleAddService}
              className="px-3 py-1 bg-blue-600 text-white text-[10px] uppercase font-bold rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3" />
              Add Service
            </button>
          </div>

          <div className="space-y-2">
            {formData.services.map((service: any) => (
              <div key={service.id} className="grid grid-cols-12 gap-2 items-start bg-white border border-gray-200 p-2 rounded relative group">
                <div className="col-span-4 space-y-1">
                   <select 
                    onChange={(e) => {
                      const selectedService = services.find(s => s.name === e.target.value)
                      if (selectedService) {
                        handleUpdateService(service.id, 'unitPrice', selectedService.price)
                      }
                      handleUpdateService(service.id, 'name', e.target.value)
                    }}
                    className="w-full text-xs font-bold border-none p-1 focus:ring-0 bg-gray-50 rounded"
                    value={service.name}
                    disabled={loadingData}
                   >
                    <option value="">Choose Service...</option>
                    {services.map(svc => (
                      <option key={svc.id} value={svc.name}>
                        {svc.name} - AED {svc.price}
                      </option>
                    ))}
                   </select>
                   <input 
                    type="text"
                    placeholder="Brief description..."
                    className="w-full text-[10px] border-none p-1 focus:ring-0 text-gray-500 italic"
                    value={service.description}
                    onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
                   />
                </div>
                <div className="col-span-2">
                   <input 
                    type="number" 
                    placeholder="Qty" 
                    className="w-full text-xs font-bold text-center border-none p-2 bg-gray-50 rounded focus:ring-0"
                    value={service.quantity}
                    onChange={(e) => handleUpdateService(service.id, 'quantity', Number(e.target.value) || 0)}
                    min="1"
                   />
                </div>
                <div className="col-span-3">
                   <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">AED</span>
                      <input 
                        type="number" 
                        placeholder="Price" 
                        className="w-full text-xs font-bold text-right border-none p-2 pl-9 bg-gray-50 rounded focus:ring-0"
                        value={service.unitPrice}
                        onChange={(e) => handleUpdateService(service.id, 'unitPrice', Number(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                      />
                   </div>
                </div>
                <div className="col-span-2">
                   <div className="p-2 text-right text-xs font-black text-black">
                      {((service.total || 0).toLocaleString())}
                   </div>
                </div>
                <div className="col-span-1 flex justify-center pt-1.5">
                   <button 
                    onClick={() => handleRemoveService(service.id)}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
            
            {formData.services.length === 0 && (
              <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded text-gray-400 text-xs italic">
                {loadingData ? 'Loading services...' : 'No services added. Click "Add Service" to start building your quote.'}
              </div>
            )}
            
            {!loadingData && services.length === 0 && (
              <div className="text-center py-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-600 text-xs">
                No services found in Firebase. Please add services first.
              </div>
            )}
          </div>
        </div>

        {/* Notes & Terms */}
        <div className="bg-white border border-gray-300 rounded p-4 space-y-4 shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Notes to Client</label>
              <textarea 
                rows={3}
                placeholder="Personal message or important details..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-black resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Terms & Conditions</label>
              <textarea 
                rows={3}
                placeholder="Payment terms, validity, scope boundaries..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-black resize-none"
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: SUMMARY & ACTIONS */}
      <div className="w-full lg:w-[320px] space-y-4">
        {/* TOTALS BOX */}
        <div className="bg-blue-600 text-white rounded p-1 shadow-none">
          <div className="bg-white border border-blue-600 rounded p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pricing Summary</span>
               <span className="text-[10px] font-medium text-blue-900 bg-gray-100 px-2 py-0.5 rounded uppercase">AED</span>
            </div>

            <div className="space-y-2.5">
               <div className="flex justify-between text-xs font-bold text-gray-600">
                  <span>Subtotal</span>
                  <span>{calculations.subtotal.toLocaleString()}</span>
               </div>
               
               <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="text-[9px] uppercase font-black text-gray-400">Discount</label>
                    <div className="flex gap-1">
                      <input 
                        type="number"
                        className="w-full text-[13px] text-blue-900 font-black border border-gray-200 rounded px-2 py-1 focus:border-blue-600 focus:ring-0"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) || 0 })}
                        min="0"
                      />
                      <button 
                        onClick={() => setFormData({ ...formData, discountType: formData.discountType === 'percentage' ? 'fixed' : 'percentage' })}
                        className="px-2 border border-gray-200 rounded text-[10px] font-bold bg-gray-50"
                      >
                         {formData.discountType === 'percentage' ? '%' : 'FIX'}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[9px] uppercase font-black text-gray-400">Tax (%)</label>
                    <input 
                        type="number"
                        className="w-full text-[13px] text-blue-900 font-black border border-gray-200 rounded px-2 py-1 focus:border-blue-600 focus:ring-0"
                        value={formData.taxRate}
                        onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) || 0 })}
                        min="0"
                        max="100"
                      />
                  </div>
               </div>

               <div className="pt-2 space-y-1">
                  {calculations.discountAmount > 0 && (
                    <div className="flex justify-between text-[11px] font-bold text-green-600">
                      <span>Discount Apply</span>
                      <span>-{calculations.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] font-bold text-gray-400">
                    <span>Tax Amount (VAT)</span>
                    <span>+{calculations.taxAmount.toLocaleString()}</span>
                  </div>
               </div>

               <div className="pt-4 border-t-2 border-blue-600">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[9px] uppercase font-black text-blue-900 leading-none mb-1">Total Payable</p>
                        <p className="text-2xl font-black text-blue-900 leading-none tracking-tighter">
                          {calculations.total.toLocaleString()}
                        </p>
                     </div>
                     <p className="text-[10px] font-bold text-gray-400">AED</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="space-y-2">
           <button 
            onClick={handleSave}
            disabled={loading || loadingData}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all shadow-lg text-center ${
              loading || loadingData
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/10'
            }`}
           >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Saving to Firebase...
                </>
              ) : loadingData ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Loading Data...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Quotation
                </>
              )}
           </button>
           
           <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setShowPreview(true)}
                disabled={loadingData || !formData.client}
                className="flex-1 flex items-center justify-center gap-2 border border-blue-300 text-blue-600 py-2 rounded text-[11px] font-bold uppercase tracking-tight hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <Eye className="w-3.5 h-3.5" />
                 Preview
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={loadingData || !formData.client}
                className="flex-1 flex items-center justify-center gap-2 border border-green-300 text-green-600 py-2 rounded text-[11px] font-bold uppercase tracking-tight hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <Download className="w-3.5 h-3.5" />
                 Download
              </button>
              <button 
                onClick={onCancel}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded text-[11px] font-bold uppercase tracking-tight hover:bg-red-50 disabled:opacity-50"
              >
                 <X className="w-3.5 h-3.5" />
                 Cancel
              </button>
           </div>
           
           {saveSuccess && (
             <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-center">
               <p className="text-[10px] font-bold text-green-700">
                 ✓ Quotation saved to Firebase collection "quotations"!
               </p>
               <p className="text-[9px] text-green-600 mt-1">
                 All data including calculations saved successfully
               </p>
             </div>
           )}
           
           {loadingData && (
             <></>
           )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header with Actions */}
            <div className="sticky top-0 bg-linear-to-r from-white to-blue-50 border-b border-gray-300 px-6 py-4 flex items-center justify-between shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-blue-900">Quotation Preview</h2>
                <p className="text-xs text-gray-500 mt-1">{formData.quoteNumber}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-bold"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body - Quotation Preview */}
            <div id="quotation-preview-content" className="p-12 bg-white">
              {/* Logo and Company Header - Professional Layout */}
              <div className="mb-12 pb-8 border-b-2 border-blue-600 flex items-start gap-8">
                {brandingSettings?.logo && (
                  <div className="shrink-0 pt-1">
                    <img 
                      src={brandingSettings.logo} 
                      alt="Company Logo" 
                      className="h-14 object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  {brandingSettings?.companyName && (
                    <h2 className="text-4xl font-black text-blue-900 mb-4">{brandingSettings.companyName}</h2>
                  )}
                  {(brandingSettings?.contactEmail || brandingSettings?.contactPhone || brandingSettings?.contactAddress || brandingSettings?.website) && (
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                      {brandingSettings?.contactEmail && (
                        <div className="flex items-center gap-2.5">
                          <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="leading-tight">{brandingSettings.contactEmail}</span>
                        </div>
                      )}
                      {brandingSettings?.contactPhone && (
                        <div className="flex items-center gap-2.5">
                          <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="leading-tight">{brandingSettings.contactPhone}</span>
                        </div>
                      )}
                      {brandingSettings?.contactAddress && (
                        <div className="flex items-start gap-2.5">
                          <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0\" />
                          <span className="leading-tight">{brandingSettings.contactAddress}</span>
                        </div>
                      )}
                      {brandingSettings?.website && (
                        <div className="flex items-center gap-2.5">
                          <Building2 className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="leading-tight">{brandingSettings.website}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quotation Title and Key Details */}
              <h1 className="text-5xl font-black text-blue-900 mb-8 tracking-tight">QUOTATION</h1>
              <div className="grid grid-cols-4 gap-6 mb-12 pb-8 border-b-2 border-gray-200">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Quote #</p>
                  <p className="text-lg font-bold text-blue-900">{formData.quoteNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Date</p>
                  <p className="text-lg font-bold text-blue-900">{new Date(formData.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Valid Until</p>
                  <p className="text-lg font-bold text-blue-900">{new Date(formData.validUntil).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Currency</p>
                  <p className="text-lg font-bold text-blue-900">{formData.currency}</p>
                </div>
              </div>

              {/* Client Information - Better Alignment */}
              <div className="grid grid-cols-2 gap-12 mb-10">
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wide">Bill To</p>
                  <div className="space-y-1.5">
                    <p className="text-lg font-bold text-blue-900">{formData.client}</p>
                    {formData.company && <p className="text-sm text-gray-700 font-medium">{formData.company}</p>}
                    {formData.email && <p className="text-sm text-gray-600">{formData.email}</p>}
                    {formData.phone && <p className="text-sm text-gray-600">{formData.phone}</p>}
                    {formData.location && <p className="text-sm text-gray-600">{formData.location}</p>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase mb-3 tracking-wide">Quotation Details</p>
                  <div className="space-y-1.5 text-sm">
                    <p><span className="font-bold text-gray-700">Tax Rate:</span> <span className="text-gray-600">{formData.taxRate}%</span></p>
                    {formData.discount > 0 && (
                      <p><span className="font-bold text-gray-700">Discount:</span> <span className="text-green-600 font-medium">{formData.discount} {formData.discountType === 'percentage' ? '%' : formData.currency}</span></p>
                    )}
                    <p><span className="font-bold text-gray-700">Status:</span> <span className="text-blue-600 font-medium">{formData.status}</span></p>
                  </div>
                </div>
              </div>

              {/* Services & Products Table */}
              {(formData.services?.length > 0 || formData.products?.length > 0) && (
                <div className="mb-8">
                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr className="bg-blue-50 border-b-2 border-blue-600">
                        <th className="text-left px-3 py-2 text-xs font-bold text-blue-900 uppercase">Item Description</th>
                        <th className="text-center px-3 py-2 text-xs font-bold text-blue-900 uppercase">Qty</th>
                        <th className="text-right px-3 py-2 text-xs font-bold text-blue-900 uppercase">Unit Price</th>
                        <th className="text-right px-3 py-2 text-xs font-bold text-blue-900 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.services?.map((service: any, idx: number) => (
                        <tr key={`service-${idx}`}>
                          <td className="px-3 py-3 text-sm text-gray-700">
                            <p className="font-bold">{service.name}</p>
                            {service.description && <p className="text-xs text-gray-500 mt-1">{service.description}</p>}
                          </td>
                          <td className="text-center px-3 py-3 text-sm text-gray-700">{service.quantity}</td>
                          <td className="text-right px-3 py-3 text-sm text-gray-700">{service.unitPrice?.toLocaleString()} {formData.currency}</td>
                          <td className="text-right px-3 py-3 text-sm font-bold text-blue-900">{service.total?.toLocaleString()} {formData.currency}</td>
                        </tr>
                      ))}
                      {formData.products?.map((product: any, idx: number) => (
                        <tr key={`product-${idx}`}>
                          <td className="px-3 py-3 text-sm text-gray-700">
                            <p className="font-bold">{product.name}</p>
                            {product.sku && <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>}
                          </td>
                          <td className="text-center px-3 py-3 text-sm text-gray-700">{product.quantity}</td>
                          <td className="text-right px-3 py-3 text-sm text-gray-700">{product.unitPrice?.toLocaleString()} {formData.currency}</td>
                          <td className="text-right px-3 py-3 text-sm font-bold text-blue-900">{product.total?.toLocaleString()} {formData.currency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Summary */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  {formData.notes && (
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Notes</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.notes}</p>
                    </div>
                  )}
                </div>
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold text-gray-600">Subtotal:</p>
                      <p className="text-sm font-bold text-gray-900">{calculations.subtotal?.toLocaleString()} {formData.currency}</p>
                    </div>
                    {calculations.discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <p className="text-sm font-bold">Discount:</p>
                        <p className="text-sm font-bold">-{calculations.discountAmount?.toLocaleString()} {formData.currency}</p>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <p className="text-sm font-bold text-gray-600">Tax ({formData.taxRate}%):</p>
                      <p className="text-sm font-bold text-gray-900">+{calculations.taxAmount?.toLocaleString()} {formData.currency}</p>
                    </div>
                    <div className="flex justify-between border-t-2 border-blue-600 pt-2 mt-2">
                      <p className="text-base font-black text-blue-900">Total:</p>
                      <p className="text-base font-black text-blue-900">{calculations.total?.toLocaleString()} {formData.currency}</p>
                    </div>
                  </div>
                </div>
              </div>

              {formData.terms && (
                <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-8">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Terms & Conditions</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.terms}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex gap-3 justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded hover:bg-gray-100 transition-colors text-sm uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}