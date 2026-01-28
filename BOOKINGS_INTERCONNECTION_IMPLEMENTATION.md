# Bookings Data Interconnection Guide

## Overview
This guide outlines how to implement bidirectional data flows between the Bookings page and other admin system pages (Jobs, Finance, Team, Services, Customers).

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      BOOKINGS PAGE (Hub)                         │
│                    (Centralized booking data)                    │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
    ┌────┴────┐          ┌────┴─────┐      ┌──────┴──────┐
    │          │          │           │      │             │
    v          v          v           v      v             v
  JOBS     FINANCE      TEAM       SERVICES CUSTOMERS    REPORTS
 (Create  (Invoice &   (Staff      (Pricing  (Booking    (Analytics
  Jobs)   Payments)   Assign)       Links)    History)   & Metrics)
```

---

## 1. BOOKINGS ↔ JOBS Integration

### Current State
- Bookings page: Isolated, no link to jobs
- Jobs page: Does not reference source bookings

### Implementation Steps

#### Step 1.1: Add "Create Job" Button
**File**: `/app/admin/bookings/page.tsx`

```typescript
// In the actions column (after delete button), add:
{booking.status === 'confirmed' && !booking.jobId && (
  <button
    onClick={() => handleCreateJobFromBooking(booking)}
    className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-950/30 rounded-lg text-purple-600 transition-colors"
    title="Create Job from Booking"
  >
    <Briefcase className="h-4 w-4" />
  </button>
)}

// Add handler:
const handleCreateJobFromBooking = (booking: Booking) => {
  // 1. Create job data from booking
  const newJob = {
    id: `job_${Date.now()}`,
    title: `${booking.serviceName} - ${booking.clientName}`,
    description: `Booking #${booking.bookingNumber}\nAddress: ${booking.clientAddress}\nNotes: ${booking.notes || 'None'}`,
    category: booking.serviceName,
    location: booking.clientAddress,
    scheduledDate: booking.bookingDate,
    scheduledTime: booking.bookingTime,
    estimatedBudget: booking.estimatedPrice,
    clientName: booking.clientName,
    clientPhone: booking.clientPhone,
    clientEmail: booking.clientEmail,
    bookingId: booking.id,  // LINK BACK
    status: 'pending', // Jobs start as pending
    createdAt: new Date().toISOString()
  }
  
  // 2. Save to jobs (integration with jobs-data.ts)
  // updateBooking with jobId
  setBookings(bookings.map(b => 
    b.id === booking.id 
      ? { ...b, jobId: newJob.id, status: 'confirmed' }
      : b
  ))
  
  // 3. Navigate to jobs or show success toast
  // Router.push(`/admin/jobs/${newJob.id}`)
}
```

#### Step 1.2: Extend Booking Interface
**File**: `/lib/bookings-services-data.ts`

```typescript
export interface Booking {
  // ... existing fields ...
  jobId?: string           // NEW: Link to created job
  jobStatus?: string       // NEW: Denormalized job status for quick lookup
  createdFromWebForm?: boolean  // NEW: Track booking source
}
```

#### Step 1.3: Add Job Reference Display
**File**: `/app/admin/bookings/page.tsx`

```typescript
// In table, add a new column before Status:
<th className="px-4 py-2.5 text-left text-[11px] font-bold">Related Job</th>

// In table row:
<td className="px-4 py-2.5">
  {booking.jobId ? (
    <a 
      href={`/admin/jobs/${booking.jobId}`}
      className="text-xs text-blue-600 hover:underline font-medium"
    >
      {booking.jobStatus || 'View Job'} →
    </a>
  ) : (
    <span className="text-xs text-muted-foreground">—</span>
  )}
</td>
```

### Booking → Jobs Data Mapping

```
Booking Field         → Job Field
─────────────────────────────────
bookingNumber         → jobCode/reference
clientName            → assignedTo/client
clientEmail           → clientEmail
clientPhone           → clientPhone
clientAddress         → jobLocation
bookingDate           → scheduledDate
bookingTime           → scheduledTime
serviceName           → jobTitle/category
estimatedPrice        → budget
duration              → estimatedDuration
notes                 → jobNotes
bookingId             → sourceBookingId (backlink)
```

---

## 2. BOOKINGS ↔ FINANCE Integration

### Current State
- Finance page: Standalone invoice/payment tracking
- Bookings page: No invoice linkage

### Implementation Steps

#### Step 2.1: Add Invoice Generation
**File**: `/app/admin/bookings/page.tsx`

```typescript
// In stats section, add:
<div className="bg-card border rounded-xl p-3">
  <p className="text-[10px] text-muted-foreground font-bold uppercase">Invoiceable</p>
  <p className="text-lg font-black text-blue-600">${invoiceableTotal.toLocaleString()}</p>
  <p className="text-[10px] text-muted-foreground mt-1">{invoiceableCount} completed</p>
</div>

// Calculate invoiceable (completed bookings without invoices):
const invoiceableCount = bookings.filter(b => b.status === 'completed' && !b.invoiceId).length
const invoiceableTotal = bookings
  .filter(b => b.status === 'completed' && !b.invoiceId)
  .reduce((sum, b) => sum + b.estimatedPrice, 0)
```

#### Step 2.2: Invoice Column in Table
**File**: `/app/admin/bookings/page.tsx`

```typescript
// Add column header:
<th className="px-4 py-2.5 text-center text-[11px] font-bold">Invoice</th>

// Add column in table row:
<td className="px-4 py-2.5 text-center">
  {booking.status === 'completed' && !booking.invoiceId && (
    <button
      onClick={() => handleGenerateInvoice(booking)}
      className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
    >
      Generate
    </button>
  )}
  {booking.invoiceId && (
    <a 
      href={`/admin/finance/invoices/${booking.invoiceId}`}
      className="text-xs text-blue-600 hover:underline"
    >
      {booking.invoiceNumber || 'INV-' + booking.id.slice(0, 6)}
    </a>
  )}
  {booking.status !== 'completed' && !booking.invoiceId && (
    <span className="text-xs text-muted-foreground">—</span>
  )}
</td>

// Add handler:
const handleGenerateInvoice = (booking: Booking) => {
  const invoiceId = `inv_${Date.now()}`
  const invoiceNumber = `INV-${new Date().getFullYear()}-${invoiceId.slice(-6)}`
  
  // Create invoice data
  const invoice = {
    id: invoiceId,
    invoiceNumber: invoiceNumber,
    bookingId: booking.id,
    clientName: booking.clientName,
    clientEmail: booking.clientEmail,
    clientPhone: booking.clientPhone,
    clientAddress: booking.clientAddress,
    serviceDescription: booking.serviceName,
    amount: booking.estimatedPrice,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending' // unpaid
  }
  
  // Save invoice and update booking
  setBookings(bookings.map(b =>
    b.id === booking.id
      ? { ...b, invoiceId: invoice.id, invoiceNumber: invoice.invoiceNumber }
      : b
  ))
  
  // Show toast: "Invoice generated successfully"
}
```

#### Step 2.3: Extend Booking Interface
**File**: `/lib/bookings-services-data.ts`

```typescript
export interface Booking {
  // ... existing fields ...
  invoiceId?: string        // NEW: Link to generated invoice
  invoiceNumber?: string    // NEW: Invoice reference number
  paymentStatus?: 'unpaid' | 'partial' | 'paid'  // NEW: Payment status
  paidAmount?: number       // NEW: Amount paid
  paidDate?: string        // NEW: Payment date
}
```

### Booking → Invoice Data Mapping

```
Booking Field         → Invoice Field
─────────────────────────────────
bookingId             → sourceBookingId
clientName            → invoiceClient
clientEmail           → clientEmail
estimatedPrice        → invoiceAmount
bookingDate           → serviceDate
serviceName           → serviceDescription
```

---

## 3. BOOKINGS ↔ TEAM Integration

### Current State
- Team page: Staff management, schedules
- Bookings page: No staff assignment

### Implementation Steps

#### Step 3.1: Staff Assignment Column
**File**: `/app/admin/bookings/page.tsx`

```typescript
// Add column header:
<th className="px-4 py-2.5 text-center text-[11px] font-bold">Assigned To</th>

// Add column in table row:
<td className="px-4 py-2.5 text-center">
  {booking.status === 'in-progress' ? (
    <select
      value={booking.assignedStaffId || ''}
      onChange={(e) => handleAssignStaff(booking.id, e.target.value)}
      className="px-2 py-1 text-xs bg-muted rounded border outline-none"
    >
      <option value="">Unassigned</option>
      {availableStaff.map(staff => (
        <option key={staff.id} value={staff.id}>
          {staff.name}
        </option>
      ))}
    </select>
  ) : (
    <span className="text-xs text-muted-foreground">
      {booking.assignedStaffName || '—'}
    </span>
  )}
</td>

// Add handler:
const handleAssignStaff = (bookingId: string, staffId: string) => {
  const staff = availableStaff.find(s => s.id === staffId)
  setBookings(bookings.map(b =>
    b.id === bookingId
      ? { 
          ...b, 
          assignedStaffId: staffId,
          assignedStaffName: staff?.name || ''
        }
      : b
  ))
  // Notify team member of assignment
}
```

#### Step 3.2: Availability Check
**File**: `/app/admin/bookings/page.tsx`

```typescript
// Calculate available staff based on booking date/time
const getAvailableStaffForBooking = (booking: Booking) => {
  return availableStaff.filter(staff => {
    // Check if staff has conflicting bookings
    const hasConflict = bookings.some(b =>
      b.assignedStaffId === staff.id &&
      b.bookingDate === booking.bookingDate &&
      timeConflict(b.bookingTime, booking.bookingTime, b.duration, booking.duration)
    )
    return !hasConflict && staff.availableDates?.includes(booking.bookingDate)
  })
}
```

#### Step 3.3: Extend Booking Interface
**File**: `/lib/bookings-services-data.ts`

```typescript
export interface Booking {
  // ... existing fields ...
  assignedStaffId?: string      // NEW: Staff member assigned to booking
  assignedStaffName?: string    // NEW: Staff member name
  assignedAt?: string          // NEW: When assignment was made
}
```

---

## 4. BOOKINGS ↔ SERVICES Integration

### Current State
- Services are defined in bookings data
- No two-way reference

### Implementation Steps

#### Step 4.1: Clickable Service Names
**File**: `/app/admin/bookings/page.tsx`

```typescript
// In table row, change service name to link:
<td className="px-4 py-2.5">
  <a 
    href={`/admin/services/${booking.serviceId}`}
    className="text-sm font-bold text-blue-600 hover:underline"
  >
    {booking.serviceName}
  </a>
</td>
```

#### Step 4.2: Service Demand Statistics
**File**: `/app/admin/bookings/page.tsx`

```typescript
// Add computed stat:
const topServices = useMemo(() => {
  const serviceMap = new Map<string, number>()
  filteredAndSortedBookings.forEach(b => {
    serviceMap.set(b.serviceName, (serviceMap.get(b.serviceName) || 0) + 1)
  })
  return Array.from(serviceMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}, [filteredAndSortedBookings])

// Display in a new section:
<div className="bg-card border rounded-xl p-4">
  <h3 className="text-sm font-bold mb-3">Top Services</h3>
  <div className="space-y-1">
    {topServices.map(([service, count]) => (
      <div key={service} className="flex justify-between text-xs">
        <span className="font-medium">{service}</span>
        <span className="text-muted-foreground">{count} bookings</span>
      </div>
    ))}
  </div>
</div>
```

---

## 5. BOOKINGS ↔ CUSTOMERS Integration

### Current State
- Customer data embedded in bookings
- No customer profile page

### Implementation Steps

#### Step 5.1: Customer Link
**File**: `/app/admin/bookings/page.tsx`

```typescript
// In table, change client name to link:
<td className="px-4 py-2.5">
  <a 
    href={`/admin/customers/${booking.clientId || booking.clientEmail}`}
    className="text-sm font-bold text-blue-600 hover:underline"
  >
    {booking.clientName}
  </a>
  <p className="text-xs text-muted-foreground">{booking.clientAddress}</p>
</td>
```

#### Step 5.2: Customer History Badge
**File**: `/app/admin/bookings/page.tsx`

```typescript
// Add function to get customer stats:
const getCustomerStats = (clientEmail: string) => {
  const customerBookings = bookings.filter(b => b.clientEmail === clientEmail)
  return {
    totalBookings: customerBookings.length,
    totalSpent: customerBookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.estimatedPrice, 0),
    since: customerBookings[0]?.createdAt || new Date().toISOString()
  }
}

// Display in customer name column:
{(() => {
  const stats = getCustomerStats(booking.clientEmail)
  return (
    <div className="text-xs text-muted-foreground">
      <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
        {stats.totalBookings}x
      </span>
    </div>
  )
})()}
```

---

## 6. Analytics & Reporting

### New Metrics to Track

#### Conversion Funnel
```
Website Form Views
    ↓
Bookings Created
    ↓
Confirmed (60%?)
    ↓
In Progress (80%?)
    ↓
Completed (95%?)
    ↓
Invoiced (100%?)
    ↓
Paid (85%?)
```

#### Key Performance Indicators
```
- Booking → Job conversion rate
- Booking → Invoice success rate
- Average days from booking to completion
- Revenue per booking (actual vs estimated)
- Staff utilization rate (from bookings)
- Customer lifetime value
- Peak booking times/services
```

---

## Implementation Priority

### Phase 1 (Week 1): Core Jobs Integration
1. Add jobId field to Booking interface
2. "Create Job" button on confirmed bookings
3. Display related job link in table

### Phase 2 (Week 2): Finance Integration
1. Add invoiceId fields to Booking interface
2. "Generate Invoice" button on completed bookings
3. Invoice status display in table

### Phase 3 (Week 3): Team Integration
1. Add assignedStaffId to Booking interface
2. Staff assignment dropdown for in-progress bookings
3. Availability checking

### Phase 4 (Week 4): Analytics & Optimization
1. Service demand metrics
2. Customer analytics
3. Conversion funnel tracking
4. Performance optimization

---

## Data Flow Diagram

```
Website Form (public)
    ↓
Creates Booking (bookings page)
    ↓
Confirmed? → No → Pending/Cancelled
    ↓ Yes
Create Job (jobs page)
    ↓
Assign Staff (team page)
    ↓
In Progress → Completed
    ↓
Generate Invoice (finance page)
    ↓
Payment Tracking (finance page)
```

---

## API/Database Considerations

### Tables to Create/Update

```sql
-- Extend bookings table
ALTER TABLE bookings ADD COLUMN job_id VARCHAR(255) REFERENCES jobs(id);
ALTER TABLE bookings ADD COLUMN invoice_id VARCHAR(255) REFERENCES invoices(id);
ALTER TABLE bookings ADD COLUMN assigned_staff_id VARCHAR(255) REFERENCES staff(id);
ALTER TABLE bookings ADD COLUMN payment_status ENUM('unpaid', 'partial', 'paid');
ALTER TABLE bookings ADD COLUMN paid_amount DECIMAL(10, 2);
ALTER TABLE bookings ADD COLUMN paid_date DATE;

-- Create booking_job_links table (for tracking)
CREATE TABLE booking_job_links (
  id VARCHAR(255) PRIMARY KEY,
  booking_id VARCHAR(255) REFERENCES bookings(id),
  job_id VARCHAR(255) REFERENCES jobs(id),
  created_at TIMESTAMP,
  converted_status ENUM('pending', 'in_progress', 'completed', 'cancelled')
);
```

---

## Testing Checklist

- [ ] Create job from confirmed booking
- [ ] Job reflects booking data correctly
- [ ] Generate invoice from completed booking
- [ ] Invoice references booking correctly
- [ ] Assign staff to in-progress booking
- [ ] Availability checking works
- [ ] Service demand metrics display correctly
- [ ] Customer history badges show correct stats
- [ ] All links navigate to correct pages
- [ ] Data stays synchronized across pages

---

## Summary

This interconnection architecture transforms bookings from an isolated feature into a **central hub** for the entire business workflow:

1. **Bookings** capture customer requests
2. **Jobs** execute the booked services
3. **Finance** tracks payments
4. **Team** manages staff resources
5. **Services** define offerings
6. **Customers** become data-rich profiles

The compact redesigned bookings page provides the perfect interface for managing this interconnected system!
