# Portal Development - Quick Start Guide

## How to Complete Each Module

### Standard Module Template

Each module should follow this structure:

```typescript
'use client'

import { useState, useCallback, useMemo } from 'react'
import { Icon1, Icon2, Icon3 } from 'lucide-react'

interface DataItem {
  id: string
  // ... fields
}

export default function ModuleName() {
  // State Management
  const [items, setItems] = useState<DataItem[]>([...])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null)

  // Handler Functions (useCallback for optimization)
  const handleAdd = useCallback(() => {
    // Logic here
  }, [dependencies])

  const handleEdit = useCallback((id: string) => {
    // Logic here
  }, [dependencies])

  const handleDelete = useCallback((id: string) => {
    // Logic here
  }, [dependencies])

  // Filtering Logic (useMemo for optimization)
  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.includes(searchTerm)
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [items, searchTerm, filterStatus])

  // Render
  return (
    <div className="space-y-6">
      {/* Header */}
      {/* Stats */}
      {/* Search & Filter */}
      {/* List/Table */}
      {/* Modal */}
    </div>
  )
}
```

---

## Quick Copy-Paste Sections

### 1. Header Section
```tsx
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  <div>
    <h1 className="text-3xl font-bold">Module Name</h1>
    <p className="text-muted-foreground mt-1">Description here</p>
  </div>
  <button 
    onClick={() => setShowModal(true)}
    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg"
  >
    <Plus className="h-5 w-5" />
    New Item
  </button>
</div>
```

### 2. Stats Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {stats.map((stat, i) => (
    <div key={i} className="bg-card p-4 rounded-xl border">
      <p className="text-xs text-muted-foreground">{stat.label}</p>
      <p className="text-2xl font-bold">{stat.value}</p>
    </div>
  ))}
</div>
```

### 3. Search & Filter
```tsx
<div className="flex gap-4 flex-col md:flex-row">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="all">All Status</option>
    <option value="Active">Active</option>
  </select>
</div>
```

### 4. List Item Card
```tsx
<div className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
  <div className="p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(item.status)}`}>
        {item.status}
      </span>
    </div>
    
    {/* Actions */}
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => handleEdit(item.id)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted">
        Edit
      </button>
      <button onClick={() => handleDelete(item.id)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
        Delete
      </button>
    </div>
  </div>
</div>
```

### 5. Modal Template
```tsx
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-card rounded-2xl max-w-md w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Modal Title</h3>
        <button onClick={() => setShowModal(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        {/* Form fields */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}
```

---

## Handler Function Patterns

### Add Handler
```typescript
const handleAdd = useCallback(() => {
  // Validate form
  if (!formData.name || !formData.description) return

  // Create new item
  const newItem: DataItem = {
    id: `${items.length + 1}`,
    ...formData,
    createdDate: new Date().toLocaleDateString()
  }

  // Update state
  setItems(prev => [newItem, ...prev])
  
  // Reset form
  setFormData({ name: '', description: '' })
  setShowModal(false)
  
  // Notify user
  alert('Item created successfully!')
}, [formData, items.length])
```

### Edit Handler
```typescript
const handleEdit = useCallback((id: string, updatedData: any) => {
  setItems(prev => prev.map(item =>
    item.id === id ? { ...item, ...updatedData } : item
  ))
  alert('Item updated!')
}, [])
```

### Delete Handler
```typescript
const handleDelete = useCallback((id: string) => {
  if (confirm('Are you sure?')) {
    setItems(prev => prev.filter(item => item.id !== id))
    alert('Item deleted!')
  }
}, [])
```

### Search & Filter
```typescript
const filtered = useMemo(() => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesFilter
  })
}, [items, searchTerm, filterStatus])
```

---

## Color Utilities

### Status Colors
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30'
    case 'Pending': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
    case 'Inactive': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30'
    case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30'
    default: return 'bg-gray-100'
  }
}
```

---

## Module Checklist

For each module, ensure:

- [ ] Header with module name and description
- [ ] New item button with onClick handler
- [ ] 3-4 stats cards showing key metrics
- [ ] Search functionality with live filtering
- [ ] Filter dropdown for status/category
- [ ] List of items in card format
- [ ] Edit button with modal
- [ ] Delete button with confirmation
- [ ] Modal for creating/editing
- [ ] Form validation
- [ ] Error handling
- [ ] Success notifications
- [ ] Responsive design (mobile + desktop)
- [ ] Loading states (if needed)
- [ ] Empty state UI
- [ ] 8-15 handler functions
- [ ] TypeScript interfaces
- [ ] useCallback for optimization
- [ ] useMemo for filtering
- [ ] Proper icon usage from lucide-react
- [ ] Consistent styling with Tailwind

---

## Icons Available (Lucide React)

Common icons for different actions:

- **CRUD Operations:**
  - Plus (Create)
  - Edit2 (Edit)
  - Trash2 (Delete)
  - Check (Confirm)
  - X (Cancel)

- **Status:**
  - CheckCircle2 (Complete)
  - Clock (In Progress)
  - AlertCircle (Alert)
  - AlertTriangle (Warning)

- **Information:**
  - Eye (View)
  - FileText (Document)
  - Calendar (Date)
  - Clock (Time)
  - MapPin (Location)
  - Phone (Contact)
  - Mail (Email)
  - User (Person)

- **UI:**
  - Menu (Navigation)
  - Search (Search)
  - Filter (Filter)
  - ChevronRight (More)
  - Download (Download)
  - Upload (Upload)

---

## Testing Each Handler

Test each handler with this pattern:

```typescript
// Test handleAdd
// 1. Click "New Item" button
// 2. Fill form with valid data
// 3. Click "Save" button
// 4. Verify item appears in list
// 5. Verify success notification

// Test handleEdit
// 1. Click "Edit" button on an item
// 2. Modify form fields
// 3. Click "Save" button
// 4. Verify changes in list
// 5. Verify success notification

// Test handleDelete
// 1. Click "Delete" button
// 2. Confirm deletion
// 3. Verify item removed from list
// 4. Verify success notification

// Test Search
// 1. Enter search term
// 2. Verify list filters in real-time
// 3. Try multiple search terms
// 4. Verify empty state when no matches

// Test Filter
// 1. Select different filter values
// 2. Verify list updates
// 3. Combine search + filter
// 4. Verify correct items shown
```

---

## Performance Tips

1. **Use useCallback** for all event handlers to prevent unnecessary re-renders
2. **Use useMemo** for expensive calculations like filtering/searching
3. **Memoize components** if they get re-rendered often
4. **Lazy load** modals and heavy content
5. **Debounce** search input if connected to API

---

## Common Mistakes to Avoid

❌ Not using useCallback for handlers  
❌ Complex logic directly in JSX  
❌ Not validating form inputs  
❌ Missing TypeScript interfaces  
❌ Not confirming destructive actions  
❌ Poor error messages  
❌ Hardcoded strings (use constants)  
❌ Missing responsive design  
❌ Not showing loading states  

✅ Always use useCallback for handlers  
✅ Keep logic in separate functions  
✅ Validate all inputs  
✅ Define TypeScript interfaces  
✅ Confirm before delete  
✅ Show helpful error messages  
✅ Use localization/constants  
✅ Mobile-first responsive design  
✅ Show loading/error states  

---

## Next Modules to Build

1. **Client Invoices** - Use template above
2. **Client Support Tickets** - Use template above
3. **Employee Dashboard** - Welcome + metrics
4. **Employee Assignments** - Job list + status updates
5. **Finance Reports** - Charts + exports

Each should follow the same pattern for consistency.

---

**Happy Building! 🚀**
