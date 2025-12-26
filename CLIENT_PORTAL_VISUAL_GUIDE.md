# CLIENT PORTAL - VISUAL FLOW & NAVIGATION GUIDE

## 🗺️ PORTAL SITEMAP

```
🏠 CLIENT PORTAL (Root: /app/client)
│
├── 📊 DASHBOARD (/dashboard)
│   └── Purpose: Welcome & Quick Overview
│       ├── Quick Stats (4 cards)
│       │   ├── Total Bookings: 12
│       │   ├── Upcoming: 2
│       │   ├── Total Spent: AED 15,600
│       │   └── Loyalty Points: 2,450
│       ├── Next Scheduled Booking
│       ├── Recent Invoices
│       └── Service Recommendations
│
├── 📅 MY BOOKINGS (/bookings) [NEW]
│   └── Purpose: Booking Management & Rescheduling
│       ├── Booking List (12 bookings)
│       │   ├── Status Filters (All, Upcoming, Completed, Cancelled)
│       │   ├── Quick Stats (4 stats cards)
│       │   └── Booking Cards with:
│       │       ├── Status Badge (Confirmed/Scheduled/Completed)
│       │       ├── Service Type & Date/Time
│       │       ├── Location & Team Assigned
│       │       └── Action Buttons:
│       │           ├── Reschedule (Modal with Date/Time Picker)
│       │           ├── View Details
│       │           ├── Rate Service (5-star)
│       │           └── Cancel Booking
│       ├── Real-Time Tracking Callout
│       │   └── "Your team is 15 minutes away"
│       └── Service History
│
├── 💰 INVOICES (/invoices) [NEW]
│   └── Purpose: Billing & Payment Management
│       ├── Financial Summary (4 stat cards)
│       │   ├── Total Value: AED 7,550
│       │   ├── Paid Amount: AED 3,950
│       │   ├── Pending: AED 1,500
│       │   └── Overdue: AED 2,100
│       ├── Invoice List (Table View)
│       │   ├── Filter Tabs (All, Paid, Pending, Overdue)
│       │   └── Columns: #, Service, Date, Due Date, Amount, Status, Actions
│       ├── Status-Colored Badges
│       │   ├── ✅ Paid (Green)
│       │   ├── ⏳ Pending (Blue)
│       │   └── ⚠️ Overdue (Red)
│       ├── Payment Methods
│       │   ├── Credit Card (Visa 4242) - Primary
│       │   ├── Bank Transfer - Secondary
│       │   └── Add Payment Method
│       └── Billing Information (Editable)
│
├── 🆘 SUPPORT (/support) [NEW]
│   └── Purpose: Customer Support & FAQ
│       ├── Contact Options (3 cards)
│       │   ├── 📞 Phone: +971 4 XXX XXXX
│       │   ├── ✉️ Email: support@homeware.ae
│       │   └── 💬 Live Chat (Start Chat Button)
│       ├── Support Tickets Tab
│       │   ├── Create New Ticket Button
│       │   └── Ticket List (3 examples)
│       │       ├── TK001: Deep Cleaning (Resolved)
│       │       ├── TK002: Cancellation (In Progress)
│       │       └── TK003: Payment Issue (Awaiting Response)
│       │       
│       │       Per Ticket:
│       │       ├── Subject & Category
│       │       ├── Status Badge (Resolved/In Progress/Awaiting)
│       │       ├── Priority Level (High/Normal/Low)
│       │       ├── Created & Updated Dates
│       │       └── Message Thread
│       │
│       ├── FAQ Tab
│       │   └── Expandable Accordion (6 items)
│       │       ├── 📌 Bookings: "How far in advance?"
│       │       ├── 💵 Pricing: "What factors affect pricing?"
│       │       ├── ❌ Cancellations: "Cancellation policy?"
│       │       ├── 🧹 Services: "Eco-friendly products?"
│       │       ├── 👥 Team: "Request same team?"
│       │       └── 💳 Payments: "Payment methods?"
│       │
│       └── New Ticket Form
│           ├── Category (Dropdown)
│           ├── Subject (Input)
│           ├── Message (Textarea)
│           └── Submit Button
│
└── 👤 MY PROFILE (/profile) [NEW]
    └── Purpose: Account Management & Preferences
        ├── Profile Picture Section
        │   ├── Avatar Display
        │   └── Upload Photo Button
        ├── Personal Information (Editable)
        │   ├── First Name
        │   ├── Last Name
        │   ├── Email Address
        │   └── Phone Number
        ├── Address Information (Editable)
        │   ├── Street Address
        │   ├── City
        │   ├── Area/District
        │   └── ZIP Code
        ├── Service Preferences (Editable)
        │   ├── Special Notes Textarea
        │   └── Checkboxes:
        │       ├── Receive service reminders
        │       ├── Receive promotional offers
        │       ├── Newsletter subscription
        │       └── SMS notifications
        ├── Loyalty & Rewards (3 info cards)
        │   ├── 🏅 Loyalty Points: 2,450
        │   ├── ⭐ Member Tier: Gold
        │   └── 💎 Membership: Premium
        └── Account Settings
            ├── Change Password
            ├── Connected Devices
            ├── Download My Data
            └── Delete Account

```

---

## 🎨 COMPONENT ARCHITECTURE

### Navigation Menu (Client Layout Sidebar)
```
┌─────────────────────────────────┐
│ HOMEWARE CLIENT PORTAL          │
├─────────────────────────────────┤
│ 👤 Ahmed Al-Mansoori            │
│ Premium Member • 2,450 Points   │
├─────────────────────────────────┤
│ [🏠] Dashboard                  │
│ [📅] My Bookings                │
│ [💰] Invoices                   │
│ [🆘] Support                    │
│ [👤] My Profile                 │
├─────────────────────────────────┤
│ [🌙] Theme Toggle               │
│ [🚪] Logout                     │
└─────────────────────────────────┘
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Mobile (< 640px)
```
┌──────────────┐
│ HOMEWARE     │
├──────────────┤
│ [☰] Menu     │
├──────────────┤
│ Content      │
│ (Single Col) │
│              │
└──────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────┐
│ HOMEWARE PORTAL          │
├──────────────────────────┤
│ Menu | Content (2-col)   │
│      |                   │
│      | Stats Cards       │
│      | (2x2 grid)        │
│      |                   │
└──────────────────────────┘
```

### Desktop (> 1024px)
```
┌─────────────────────────────────────┐
│ HOMEWARE CLIENT PORTAL              │
├──────────┬──────────────────────────┤
│          │ Dashboard                │
│ Sidebar  │ • Quick Stats (4 cards)  │
│ Menu     │ • Next Booking Card      │
│          │ • Recent Invoices        │
│          │ • Recommendations        │
│          │                          │
└──────────┴──────────────────────────┘
```

---

## 🔄 USER INTERACTION FLOWS

### Booking Flow
```
Start Booking Process
         ↓
   [My Bookings]
         ↓
  View Booking List
    (Filters & Stats)
         ↓
  Select Booking
         ↓
  ┌─────────────────┐
  │ Choose Action   │
  ├─────────────────┤
  │ 1. Reschedule   │
  │ 2. View Details │
  │ 3. Rate Service │
  │ 4. Cancel       │
  └─────────────────┘
         ↓
   [Take Action]
         ↓
  Confirmation
         ↓
   Success Toast
```

### Rescheduling Flow
```
[Reschedule Button]
         ↓
  [Modal Opens]
  ┌─────────────────────┐
  │ Pick New Date       │
  │ [Calendar Picker]   │
  │                     │
  │ Pick New Time       │
  │ [Time Selector]     │
  │                     │
  │ [Confirm] [Cancel]  │
  └─────────────────────┘
         ↓
  Verify Availability
         ↓
  Check Team Schedule
         ↓
  [Success/Error] Toast
         ↓
  Update Booking Status
         ↓
  Send Confirmation SMS/Email
```

### Invoice Payment Flow
```
[View Invoices]
         ↓
  Select Invoice
         ↓
  [View/Download/Pay]
         ↓
  [Pay Button]
         ↓
  Select Payment Method
  • Use Saved Card
  • Add New Card
  • Bank Transfer
         ↓
  Enter Amount
         ↓
  Review & Confirm
         ↓
  Process Payment
         ↓
  Payment Confirmation
         ↓
  Update Invoice Status (Paid)
         ↓
  Send Receipt Email
```

### Support Ticket Flow
```
[Support Page]
    ↓
  ┌─────────────────┐
  │ Choose Option   │
  ├─────────────────┤
  │ • View Tickets  │
  │ • Create Ticket │
  │ • FAQ Search    │
  │ • Contact Info  │
  └─────────────────┘
    ↓
[View Existing Tickets]
    OR
[Create New Ticket]
    ↓
┌──────────────────────┐
│ Enter Information    │
├──────────────────────┤
│ Category: [Dropdown] │
│ Subject: [Input]     │
│ Message: [Textarea]  │
│                      │
│ [Submit]             │
└──────────────────────┘
    ↓
  Ticket Created
    ↓
  TK00X Created
  Status: "New"
    ↓
  Confirmation Email
    ↓
  Can Track Status
```

### Profile Update Flow
```
[My Profile Page]
         ↓
   [Edit Profile]
    Button Click
         ↓
  Form Becomes Editable
  (Inputs unlock)
         ↓
  Make Changes
  ├─ Update Personal Info
  ├─ Update Address
  ├─ Change Preferences
  └─ Modify Settings
         ↓
   [Save Changes]
         ↓
  Validate Inputs
         ↓
  Send Update to API
         ↓
  Success Toast
         ↓
  Form Locks Again
```

---

## 🎯 Data Display Examples

### Booking Card Example
```
┌────────────────────────────────────┐
│ 🗓️ Dec 25, 2025 | 10:00 AM - 12:00 PM │
├────────────────────────────────────┤
│ 🏠 Deep Cleaning Service           │
│ 📍 Downtown Dubai, Al Fahidi       │
│                                    │
│ 👥 Team: Ahmed's Team              │
│ 💰 AED 450                         │
│                                    │
│ Status: ✅ Confirmed               │
│                                    │
│ [Reschedule] [Details] [Rate] [X]  │
└────────────────────────────────────┘
```

### Invoice Card Example
```
┌──────────────────────────────────┐
│ INV003                           │
├──────────────────────────────────┤
│ Service:  Deep Cleaning          │
│ Date:     Dec 15, 2025           │
│ Due:      Dec 20, 2025           │
│ Amount:   AED 450                │
│ Status:   ⏳ Pending              │
│                                  │
│ [Download] [View] [Pay]          │
└──────────────────────────────────┘
```

### Support Ticket Card Example
```
┌──────────────────────────────────┐
│ TK001 - Question about Cleaning  │
├──────────────────────────────────┤
│ Category:  General Inquiry       │
│ Status:    ✅ Resolved            │
│ Priority:  🔵 Normal             │
│ Created:   Dec 20, 2025          │
│ Updated:   Dec 21, 2025          │
│                                  │
│ Last message: "Perfect! Thank... │
│                                  │
│ [View Conversation]              │
└──────────────────────────────────┘
```

---

## 🎨 COLOR SCHEME & STATUS INDICATORS

### Status Badges
```
✅ CONFIRMED    - Green (#10b981)
🔵 SCHEDULED    - Blue (#3b82f6)
⏳ PENDING       - Yellow (#f59e0b)
✔️ COMPLETED    - Green (#10b981)
❌ CANCELLED    - Gray (#6b7280)
🔴 OVERDUE      - Red (#ef4444)
🟣 IN PROGRESS  - Purple (#a855f7)
```

### Priority Indicators
```
🔴 HIGH    - Red (#dc2626)
🔵 NORMAL  - Blue (#2563eb)
🟢 LOW     - Green (#16a34a)
```

### Loyalty Tiers
```
⭐ Silver      - 0-999 points (5% discount)
🥇 Gold        - 1,000-4,999 points (10% discount)
💎 Platinum    - 5,000+ points (15% discount + perks)
```

---

## 📊 KEY METRICS & CALCULATIONS

### Booking Stats
```
Total Bookings:     12 total services booked
Upcoming:           2 confirmed for next 30 days
Completed:          8 successfully completed
Cancelled:          2 cancelled (2 refunded, 0 pending refund)
Average Rating:     4.5/5.0 stars
Avg Service Cost:   AED 1,300 per booking
```

### Financial Stats
```
Total Value:        AED 7,550 (all time)
Paid Amount:        AED 3,950 (52% of total)
Pending:            AED 1,500 (20% of total)
Overdue:            AED 2,100 (28% of total - needs attention)
```

### Loyalty Stats
```
Loyalty Points:     2,450 points
Current Tier:       Gold (next: Platinum at 5,000)
Points This Year:   1,200 points
Points Redeemed:    500 points
```

---

## 🔐 Data Isolation Rules

**CRITICAL:** Each client only sees their own:
```
✓ Their bookings (not other clients')
✓ Their invoices (not other clients')
✓ Their support tickets (not other clients')
✓ Their profile & preferences
✓ Their loyalty points & tier
✓ Their payment history

✗ Cannot see: Other clients' information
✗ Cannot access: Admin-only features
✗ Cannot modify: Other clients' data
```

---

## 🚀 PERFORMANCE TARGETS

- **Page Load Time**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Mobile First Score**: 90+
- **Accessibility Score**: 95+

---

## 📋 TESTING CHECKLIST

- [ ] All pages load without errors
- [ ] Navigation works on all devices
- [ ] Forms validate input correctly
- [ ] API calls return correct data
- [ ] Data isolation works (no cross-client leakage)
- [ ] Real-time features update without refresh
- [ ] Mobile responsiveness tested
- [ ] Dark mode works properly
- [ ] Accessibility keyboard navigation works
- [ ] Screen reader compatible
- [ ] Performance metrics met
- [ ] Security tests passed

---

**Version**: 1.0 | **Last Updated**: December 2025
