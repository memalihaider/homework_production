# CLIENT PORTAL - QUICK REFERENCE

## 🚀 QUICK START

### Access the Portal
```
Base URL: /app/client/
Main Entry: /client/dashboard
```

### Navigation Menu (From Sidebar)
```
1. Dashboard         → /client/dashboard
2. My Profile        → /client/profile
3. My Bookings       → /client/bookings
4. Invoices          → /client/invoices
5. Support           → /client/support
```

---

## 📄 DOCUMENTATION FILES

### File 1: CLIENT_PORTAL_FLOW.md
**Contents**: Complete feature breakdown
- Page-by-page feature list
- Advanced features (rescheduling, tracking, recommendations, loyalty)
- Data isolation & security
- Experience personalization
- Upsell timing intelligence

**Use When**: Understanding full feature capabilities

---

### File 2: CLIENT_PORTAL_VISUAL_GUIDE.md
**Contents**: UI/UX design patterns
- Complete sitemap
- Component architecture
- Responsive breakpoints
- User interaction flows
- Data display examples
- Color scheme & status indicators

**Use When**: Designing or implementing UI changes

---

### File 3: CLIENT_PORTAL_IMPLEMENTATION_GUIDE.md
**Contents**: Developer reference
- Feature completion status
- Backend API endpoints to create
- Integration checklist
- Security implementation
- Testing scenarios
- Deployment checklist

**Use When**: Setting up development or deployment

---

### File 4: CLIENT_PORTAL_PROJECT_SUMMARY.md
**Contents**: Executive overview
- Project deliverables
- Architecture diagram
- Technology stack
- Sample data
- Implementation timeline
- Performance targets

**Use When**: Project management or stakeholder updates

---

## 📦 FILES CREATED

### React Components (5 Pages)
```
✅ /app/client/dashboard/page.tsx       (Existing)
✅ /app/client/bookings/page.tsx        (350+ lines)
✅ /app/client/invoices/page.tsx        (350+ lines)
✅ /app/client/support/page.tsx         (350+ lines)
✅ /app/client/profile/page.tsx         (350+ lines)
```

### Layout Files (4 Files)
```
✅ /app/client/bookings/layout.tsx
✅ /app/client/invoices/layout.tsx
✅ /app/client/support/layout.tsx
✅ /app/client/profile/layout.tsx
```

### Documentation (4 Files)
```
✅ CLIENT_PORTAL_FLOW.md
✅ CLIENT_PORTAL_VISUAL_GUIDE.md
✅ CLIENT_PORTAL_IMPLEMENTATION_GUIDE.md
✅ CLIENT_PORTAL_PROJECT_SUMMARY.md
```

---

## 🎯 FEATURE CHECKLIST

### My Bookings Page
```
✅ Display 12 bookings with status
✅ Status filtering (All, Upcoming, Completed, Cancelled)
✅ Quick stats (Total, Completed, Upcoming, Cancelled)
✅ Reschedule button with modal
✅ Date/time picker for rescheduling
✅ View Details button
✅ Rate Service (5-star)
✅ Cancel booking
✅ Real-time tracking info
```

### Invoices Page
```
✅ Financial summary (4 stat cards)
✅ Invoice list (5 sample invoices)
✅ Status filtering (All, Paid, Pending, Overdue)
✅ Color-coded status badges
✅ Download button per invoice
✅ Payment methods section
✅ Billing information (editable)
✅ Add payment method
```

### Support Page
```
✅ Contact options (Phone, Email, Chat)
✅ Support tickets list (3 samples)
✅ Ticket status and priority
✅ Message threads
✅ FAQ accordion (6 items)
✅ FAQ search/filter by category
✅ Create new ticket form
✅ Category dropdown
```

### My Profile Page
```
✅ Profile picture upload
✅ Personal info (First, Last, Email, Phone)
✅ Address info (editable)
✅ Service preferences
✅ Notification checkboxes
✅ Loyalty points display
✅ Member tier info
✅ Membership benefits
✅ Account settings (Password, Devices, Data, Delete)
✅ Edit/Save mode toggle
```

---

## 🔌 API INTEGRATION POINTS

### Bookings
```
GET  /api/bookings              - Fetch all bookings
PUT  /api/bookings/:id/reschedule - Reschedule booking
POST /api/bookings/:id/rating   - Submit rating
DELETE /api/bookings/:id        - Cancel booking
```

### Invoices
```
GET /api/invoices               - Fetch all invoices
POST /api/invoices/:id/payment  - Make payment
GET /api/invoices/:id/download  - Download PDF
```

### Support
```
GET  /api/support/tickets       - Fetch tickets
POST /api/support/tickets       - Create ticket
POST /api/support/tickets/:id/message - Add message
GET  /api/support/faq           - Fetch FAQ
```

### Profile
```
GET  /api/profile               - Fetch profile
PUT  /api/profile               - Update profile
POST /api/profile/avatar        - Upload avatar
GET  /api/profile/loyalty       - Get loyalty info
```

---

## 💾 SAMPLE DATA STRUCTURE

### Booking Object
```javascript
{
  id: "BK001",
  clientId: "CL001",
  serviceType: "Deep Cleaning",
  date: "2025-12-25",
  time: "10:00 AM",
  duration: "2 hours",
  location: "Downtown Dubai",
  teamName: "Ahmed's Team",
  price: 450,
  status: "Confirmed",  // Confirmed|Scheduled|Completed|Cancelled
  rating: null,
  comment: ""
}
```

### Invoice Object
```javascript
{
  id: "INV001",
  clientId: "CL001",
  serviceType: "Deep Cleaning",
  date: "2025-12-15",
  dueDate: "2025-12-20",
  amount: 450,
  status: "Paid",  // Paid|Pending|Overdue
  paymentMethod: "Visa 4242",
  paidDate: "2025-12-18"
}
```

### Support Ticket Object
```javascript
{
  id: "TK001",
  clientId: "CL001",
  subject: "Question about Deep Cleaning Service",
  category: "General Inquiry",  // General|Booking|Billing|Quality|Technical
  status: "Resolved",  // New|In Progress|Resolved|Closed|Awaiting Response
  priority: "Normal",  // Low|Normal|High
  created: "2025-12-20",
  updated: "2025-12-21",
  messages: [
    { author: "Client", time: "2025-12-20 9:15 AM", text: "..." },
    { author: "Support", time: "2025-12-20 10:30 AM", text: "..." }
  ]
}
```

### Profile Object
```javascript
{
  firstName: "Ahmed",
  lastName: "Al-Mansoori",
  email: "ahmed.mansoori@example.com",
  phone: "+971 50 XXX XXXX",
  address: "Downtown Dubai",
  city: "Dubai",
  area: "Al Fahidi",
  preferences: "Morning appointments preferred",
  loyaltyPoints: 2450,
  tierLevel: "Gold",  // Silver|Gold|Platinum
  membershipType: "Premium"
}
```

---

## 🎨 COLOR QUICK REFERENCE

### Status Colors
```
✅ Confirmed/Paid/Resolved    → Green (#10b981)
🔵 Scheduled/Pending          → Blue (#3b82f6)
⏳ Awaiting Response           → Amber (#f59e0b)
❌ Cancelled/Overdue           → Red (#ef4444)
⭕ In Progress                 → Purple (#a855f7)
```

### Loyalty Tiers
```
🥈 Silver   → AED 0-999      (5% discount)
🥇 Gold     → AED 1,000-4,999 (10% discount)
💎 Platinum → AED 5,000+      (15% discount + perks)
```

---

## 📱 RESPONSIVE SIZES

```
Mobile:     < 640px  (Single column)
Tablet:     640-1024px (2 columns)
Desktop:    > 1024px (Full layout, 3-4 columns)
```

---

## 🔐 SECURITY TIPS

✅ Always verify client ownership on backend
✅ Never expose other clients' data
✅ Mask sensitive data (cards, phones)
✅ Log all sensitive operations
✅ Use HTTPS for all connections
✅ Implement session timeouts
✅ Validate all inputs server-side
✅ Use prepared statements to prevent SQL injection

---

## 🧪 TEST SCENARIOS

### Critical Path Testing
```
1. Login → Dashboard → Bookings → Reschedule → Complete
2. Login → Invoices → Select Invoice → Pay → Confirm
3. Login → Support → Create Ticket → Track Status
4. Login → Profile → Edit → Save → Verify
5. Login → Different page → Logout → Redirect to login
```

---

## 🚀 PERFORMANCE CHECKLIST

```
⏱️  Page Load:           < 2 seconds
⏱️  Time to Interactive: < 3 seconds
⏱️  API Response:        < 500ms
⏱️  Image Load:          Optimized, lazy-loaded
⏱️  CSS/JS:              Minified, code-split
⏱️  Mobile Score:        90+
⏱️  Accessibility:       95+
```

---

## 📞 COMMON TASKS

### Add a New Booking Status
1. Edit booking data structure
2. Update status filter in My Bookings
3. Add color mapping in `getStatusColor()`
4. Update API to return new status
5. Test filtering

### Add a New Invoice Status
1. Edit invoice data structure
2. Update filter tabs in Invoices
3. Add color mapping in `getStatusColor()`
4. Update financial summary calculation
5. Test filtering

### Add FAQ Item
1. Add object to `faqs` array in Support page
2. Update category tags if needed
3. Test accordion expand/collapse
4. Verify search functionality (if added)

### Change Color Scheme
1. Update Tailwind color classes
2. Test on light and dark modes
3. Verify contrast ratios (WCAG)
4. Test on all pages

---

## 🆘 TROUBLESHOOTING

### Page Not Loading
```
1. Check URL route (/client/[page])
2. Verify layout.tsx exists
3. Check for console errors
4. Review API response
```

### Data Not Displaying
```
1. Verify API returns data
2. Check useState initialization
3. Look for filter state issues
4. Debug data structure mismatch
```

### Button Not Working
```
1. Check onClick handler
2. Verify state updates
3. Look for console errors
4. Test in different browser
```

### Mobile View Breaking
```
1. Check responsive classes
2. Verify grid/flex layout
3. Test padding/margins
4. Check text wrapping
```

---

## 📚 QUICK LINKS

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Guide](https://react.dev/reference/react)

---

## 📊 METRICS TO MONITOR

```
Active Users:         Number of daily active clients
Booking Completion:   % of bookings completed vs cancelled
Invoice Payment Time: Average days to pay invoice
Support Ticket SLA:   % resolved within target time
Portal Uptime:        Target 99.9%
Page Load Time:       Target < 2s
Mobile Traffic:       % of users on mobile
User Satisfaction:    NPS score target 70+
```

---

**Quick Reference Version**: 1.0
**Last Updated**: December 2025
**For Full Docs**: See CLIENT_PORTAL_*.md files
