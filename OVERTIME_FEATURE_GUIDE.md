# ⚡ Overtime Tracking System - Complete Feature Guide

## Overview

The Overtime Tracking System is a fully interconnected feature between the **HR Attendance System** and **Job Management System**. It enables seamless tracking, approval, and management of employee overtime across both platforms with complete data synchronization.

---

## 📋 Table of Contents

1. [Features Overview](#features-overview)
2. [Attendance System - Overtime Tab](#attendance-system---overtime-tab)
3. [Job Management - Overtime Integration](#job-management---overtime-integration)
4. [Data Structures](#data-structures)
5. [How to Use](#how-to-use)
6. [Interconnection Details](#interconnection-details)
7. [Sample Workflows](#sample-workflows)

---

## ✨ Features Overview

### Core Capabilities

| Feature | Description | Location |
|---------|-------------|----------|
| **Record Overtime** | Add overtime hours for employees with details | HR → Overtime Tab |
| **Overtime Types** | Regular, Weekend, Holiday, Emergency classifications | HR → Record Overtime Form |
| **Hourly Rate Calculation** | Automatic total amount calculation (Hours × Rate) | HR → Overtime Form |
| **Job Linking** | Link overtime to specific jobs for cost tracking | HR → Related Job field |
| **Approval Workflow** | Approve/reject overtime records | HR → Overtime Tab |
| **Job Overtime Tracking** | Mark jobs requiring overtime hours | Jobs → Job Details |
| **Status Indicators** | Visual badges showing approval status | Both Systems |
| **Interconnected Data** | Changes in one system reflect in the other | Automatic Sync |

---

## 🏥 Attendance System - Overtime Tab

### Location
**HR Module** → **Attendance Tracking** → **⚡ Overtime Tab**

### Tab Features

#### 1. **Record Overtime Form**

```
┌─────────────────────────────────────────┐
│         ⚡ Record Overtime              │
├─────────────────────────────────────────┤
│                                         │
│  Employee: [Dropdown - Filtered by Date]│
│  Overtime Hours: [0-999, 0.5 increments]│
│  Overtime Type: [Regular/Weekend/Holiday]
│  Hourly Rate: [AED Amount]              │
│  Reason: [Text field]                   │
│  Related Job: [Optional - Job title]    │
│                                         │
│  [+ Add Overtime Record Button]         │
│                                         │
└─────────────────────────────────────────┘
```

**Field Details:**

- **Employee**: Auto-populated dropdown showing employees who have attendance on the selected date
- **Overtime Hours**: Decimal values (1.5, 2, 3.5, etc.)
- **Overtime Type**: 
  - Regular: Standard overtime
  - Weekend: Weekend hours (typically higher rate)
  - Holiday: Holiday overtime (premium rate)
  - Emergency: Emergency/urgent work
- **Hourly Rate**: AED amount per hour
- **Reason**: Business justification (e.g., "Project deadline", "Client urgent request")
- **Related Job**: Optional link to job that required overtime

**Automatic Calculation:**
```
Total Amount = Overtime Hours × Hourly Rate
Example: 2 hours × AED 50/hour = AED 100
```

#### 2. **Overtime Records Display**

```
┌──────────────────────────────────────────┐
│       📋 Overtime Records                │
│  Total Hours: 15.5h | Total: AED 1,550  │
├──────────────────────────────────────────┤
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Ahmed Al-Mazrouei        AED 100   │  │
│ │ 📅 2025-01-15 | ⚡ 2h | Regular    │  │
│ │ 💼 Project deadline                │  │
│ │ 🏢 Office Deep Cleaning            │  │
│ │ 2h @ AED 50/h                      │  │
│ │                                    │  │
│ │ [Approve] [Delete]                 │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Fatima Al-Ketbi         AED 150   │  │
│ │ 📅 2025-01-14 | ⚡ 3h | Weekend   │  │
│ │ 🔴 Approved by Admin               │  │
│ │ 3h @ AED 50/h                      │  │
│ │                                    │  │
│ │ [✓ Delete]                         │  │
│ └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘
```

**Record Information:**

Each overtime record displays:
- Employee name
- Date of overtime
- Hours worked
- Overtime type
- Reason for overtime
- Related job (if linked)
- Hourly rate and total calculation
- Approval status

**Actions:**

- **Approve**: Mark overtime as approved (status changes to "Approved by Admin")
- **Delete**: Remove overtime record (also removes from attendance record)

---

## 💼 Job Management - Overtime Integration

### Location
**Jobs Module** → **Job Cards/Details**

### Job Overtime Fields

Added to Job Interface:

```typescript
// Job Overtime Fields
overtimeRequired: boolean      // Whether this job needs overtime
overtimeHours: number          // Total overtime hours needed
overtimeReason: string         // Why overtime is needed
overtimeApproved: boolean      // Approval status
```

### Visual Indicator on Job Cards

```
┌──────────────────────────────────────┐
│ Office Deep Cleaning - Downtown      │
│ Downtown Business Tower              │
│                                      │
│ [High] [Scheduled] [OT: 2h ✓]        │
│ 📍 Downtown, Dubai                   │
│ 📅 2025-01-20                        │
│ 👥 4 members | AED 5,000             │
│                                      │
│ [Edit] [Set Reminder] [Start]        │
│                                      │
└──────────────────────────────────────┘
```

**Overtime Badge Details:**

- **Color Coding**:
  - 🟠 Amber: Overtime required but pending approval
  - 🟢 Green: Overtime approved (shows "✓")
  - Displays: "OT: [hours]h" format

### Job Details Page Features

When viewing job details:
1. Overtime requirements clearly displayed
2. Links to related overtime records in HR system
3. Approval status tracked
4. Historical overtime records associated with job

---

## 📊 Data Structures

### Overtime Interface

```typescript
interface Overtime {
  id: number                                    // Unique ID
  attendanceId: number                          // Link to attendance record
  employeeName: string                          // Employee name
  date: string                                  // Date (YYYY-MM-DD)
  overtimeHours: number                         // Hours worked
  overtimeType: 'Regular' | 'Weekend' | 'Holiday' | 'Emergency'
  reason: string                                // Business reason
  approved: boolean                             // Approval status
  approvedBy?: string                           // Approver name
  jobId?: number                                // Related job ID
  jobTitle?: string                             // Related job title
  rate: number                                  // Hourly rate (AED)
  totalAmount: number                           // Calculated total
}
```

### Updated Attendance Interface

```typescript
interface Attendance {
  // ... existing fields
  
  // NEW OVERTIME FIELDS
  overtime?: Overtime                           // Linked overtime record
  hasOvertime?: boolean                         // Flag for quick check
}
```

### Updated Job Interface

```typescript
interface Job {
  // ... existing fields
  
  // NEW OVERTIME FIELDS
  overtimeRequired?: boolean                    // Job needs overtime
  overtimeHours?: number                        // Hours needed
  overtimeReason?: string                       // Reason for OT
  overtimeApproved?: boolean                    // Approval status
}
```

---

## 🎯 How to Use

### For HR Managers - Recording Overtime

#### Step 1: Navigate to Overtime Tab
```
HR Module → Attendance Tracking → ⚡ Overtime Tab
```

#### Step 2: Fill Overtime Form
1. **Select Date** - Via the date picker at top
2. **Select Employee** - From dropdown (filtered to those present that day)
3. **Enter Hours** - E.g., 1.5, 2, 3.5 hours
4. **Choose Type** - Regular/Weekend/Holiday/Emergency
5. **Enter Rate** - Hourly rate in AED
6. **Add Reason** - E.g., "Project deadline", "Client request"
7. **Link Job** (Optional) - Select related job

#### Step 3: Submit
Click **"+ Add Overtime Record"** button

**Result:**
- ✅ Overtime record created
- ✅ Linked to attendance record
- ✅ Total calculated automatically
- ✅ Appears in Overtime Records list
- ✅ Reflects in Job details (if linked)

### For Managers - Approving Overtime

#### Step 1: Review Records
1. Navigate to **Overtime Tab**
2. Scan through **Overtime Records** section

#### Step 2: Approve
1. Find record to approve
2. Click **"Approve"** button
3. Status changes to "Approved by Admin"

#### Step 3: Delete (if needed)
1. Click **"Delete"** button
2. Confirm in dialog
3. Record removed from both systems

### For Job Managers - Job Overtime Requirements

#### Step 1: Create/Edit Job
1. Open **Jobs Module**
2. **Create New Job** or **Edit Existing Job**

#### Step 2: Mark Overtime Required
In the job details form:
```
[ ] Overtime Required
Overtime Hours: [2]
Overtime Reason: [Extended hours for complete sanitization]
```

#### Step 3: Save
Job now shows **OT indicator** on job cards

#### Step 4: Track Overtime Records
- View all overtime records linked to this job
- Check approval status
- Monitor total overtime cost impact on job budget

---

## 🔗 Interconnection Details

### Automatic Synchronization

#### When Overtime is Created in HR:
```
HR System (Overtime Record Created)
    ↓
    ├─→ Attendance record updated (hasOvertime: true)
    ├─→ Links to job (if jobTitle provided)
    ├─→ Calculates total amount
    └─→ Shows in pending approvals
```

#### When Overtime is Approved:
```
HR System (Approval Button Clicked)
    ↓
    ├─→ Status: approved = true
    ├─→ approvedBy: "Admin"
    ├─→ Related Job updated (if linked)
    └─→ Reflected in job overtime stats
```

#### When Overtime is Deleted:
```
HR System (Delete Button Clicked)
    ↓
    ├─→ Overtime record removed
    ├─→ Attendance record updated (hasOvertime: false)
    ├─→ Job reference cleared
    └─→ Totals recalculated
```

#### When Job is Updated:
```
Jobs System (Job Details Changed)
    ↓
    ├─→ Overtime fields updated (hours, approval)
    ├─→ Badge updated on job cards
    ├─→ Linked HR records notified
    └─→ Cost calculations updated
```

### Data Flow Example

```
┌─────────────────────────────────────────────────────────┐
│  Day 1: Record Overtime in HR                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ HR Attendance:                                          │
│ • Ahmed Al-Mazrouei | 2025-01-20 | 8h standard        │
│                                                         │
│ + Click "⚡ Overtime Tab"                              │
│ + Select Ahmed | 2 hours | Regular | AED 50           │
│ + Link to: "Office Deep Cleaning"                      │
│ + Reason: "Additional sanitization required"          │
│ → Record Created (Pending Approval)                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Automatic Updates:                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ✓ Attendance Record Updated:                           │
│   hasOvertime: true                                    │
│   overtime: { ...details }                            │
│                                                         │
│ ✓ Job Record Updated:                                 │
│   "Office Deep Cleaning" card now shows:              │
│   [High] [Scheduled] [OT: 2h]                         │
│                                                         │
│ ✓ Totals Recalculated:                                │
│   Employee: +2h overtime | AED 100 due               │
│   Job: Overtime cost tracked                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Day 2: Manager Approves Overtime                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ HR → Overtime Tab:                                      │
│ [Ahmed's Record] | [Approve] button                    │
│ → Status: "✓ Approved by Admin"                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Final State:                                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ HR System:                                              │
│ • Overtime Record: APPROVED                            │
│ • Attendance: hasOvertime: true                        │
│ • Stats: +2h overtime | +AED 100 cost                 │
│                                                         │
│ Jobs System:                                            │
│ • Job Badge: [OT: 2h ✓] - GREEN                       │
│ • Overtime Approved: true                             │
│ • Job Cost Tracking: Includes OT hours                │
│                                                         │
│ Result: Complete interconnection verified              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 Sample Workflows

### Workflow 1: Standard Overtime Request

**Scenario:** Employee Ahmed worked 2 extra hours on a cleaning job due to complex stains requiring additional treatment.

```
1. HR Manager Access
   └─→ HR Module → Attendance → ⚡ Overtime Tab

2. Record Overtime
   └─→ Employee: Ahmed Al-Mazrouei
   └─→ Overtime Hours: 2
   └─→ Type: Regular
   └─→ Rate: AED 50/h
   └─→ Reason: "Additional stain treatment required"
   └─→ Job: "Office Deep Cleaning - Downtown Tower"
   └─→ [+ Add Overtime Record]

3. Automatic Updates
   └─→ ✓ Record created (Pending Approval)
   └─→ ✓ Total: 2h × AED 50 = AED 100
   └─→ ✓ Attendance linked
   └─→ ✓ Job OT badge updated

4. Approval
   └─→ Manager reviews in same tab
   └─→ [Approve] button clicked
   └─→ ✓ Status: "Approved by Admin"

5. Result
   └─→ Ahmed: +2h OT approved
   └─→ Job Cost: +AED 100
   └─→ Both systems synchronized
```

### Workflow 2: Emergency Overtime During Job

**Scenario:** Job requires emergency completion. Manager marks job as needing 3 hours overtime at weekend rate.

```
1. Job Manager Access
   └─→ Jobs Module → Job Details/Card

2. Mark Overtime on Job
   └─→ Overtime Required: ☑ (checked)
   └─→ Hours: 3
   └─→ Reason: "Client urgent deadline"
   └─→ [Save Changes]

3. Visual Indication
   └─→ Job card shows: [OT: 3h]
   └─→ Badge color: Amber (pending approval)

4. HR Records Overtime
   └─→ HR → Overtime Tab
   └─→ Type: "Emergency"
   └─→ Rate: AED 75/h (weekend premium)
   └─→ Link to same job
   └─→ [+ Add Overtime Record]

5. Approval Process
   └─→ Manager approves in HR
   └─→ Job badge updates: [OT: 3h ✓] - Green

6. Final State
   └─→ Job: Overtime marked as complete
   └─→ Cost: AED 225 (3h × AED 75)
   └─→ Both systems in sync
```

### Workflow 3: Bulk Overtime Review

**Scenario:** End-of-month overtime review for budget analysis.

```
1. Access Overtime Records
   └─→ HR → Attendance → ⚡ Overtime Tab

2. View Summary
   └─→ Total Overtime Hours: 15.5h
   └─→ Total Overtime Cost: AED 1,550
   └─→ Breakdown by employee, date, type

3. Detailed Review
   └─→ Scan through all records
   └─→ Note pending vs. approved
   └─→ Identify jobs with most overtime

4. Approval Actions
   └─→ Approve pending records
   └─→ Delete any erroneous entries
   └─→ Check budget impact

5. Report Generation
   └─→ Cross-reference with jobs
   └─→ Identify overtime-heavy jobs
   └─→ Plan staffing for future similar jobs

6. Analytics
   └─→ Which jobs consistently need OT?
   └─→ Which employees work most OT?
   └─→ Total OT cost vs. budgeted amount
```

---

## 🔧 Technical Details

### Key Functions

#### HR System (`attendance/page.tsx`)

```typescript
// Record new overtime
handleAddOvertime()
  ├─→ Validates all fields
  ├─→ Finds linked attendance record
  ├─→ Calculates total (hours × rate)
  ├─→ Creates Overtime object
  └─→ Updates attendance record

// Approve overtime
handleApproveOvertime(id: number)
  ├─→ Finds overtime record
  ├─→ Sets approved: true
  ├─→ Sets approvedBy: "Admin"
  └─→ Updates linked job (if applicable)

// Delete overtime
handleDeleteOvertime(id: number)
  ├─→ Removes from overtimeRecords
  ├─→ Updates attendance record
  ├─→ Clears job reference
  └─→ Recalculates totals
```

#### Job System (`jobs/page.tsx`)

```typescript
// Track job overtime
overtimeRequired: boolean      // UI toggle
overtimeHours: number          // Form input
overtimeReason: string         // Text field
overtimeApproved: boolean      // Status flag

// Visual rendering
Job Card Badge:
  if (overtimeRequired) {
    Show: [OT: {hours}h] {checkmark if approved}
    Color: Green if approved, Amber if pending
  }
```

### State Management

Both systems use `useState` for:
- Overtime records list
- Form input values
- Editing state
- Approval status

Data persists in component state (example data) and can be connected to backend API for persistence.

---

## 📱 UI Components

### Colors & Badges

```css
/* Pending Overtime */
.bg-amber-100 .text-amber-700
↳ Overtime required but not yet approved

/* Approved Overtime */
.bg-emerald-100 .text-emerald-700
↳ Overtime has been approved

/* Job OT Badge */
[OT: 2h]      /* Pending - Amber */
[OT: 2h ✓]    /* Approved - Green */
```

### Icons Used

- **⚡** Zap icon - Overtime indicator
- **✓** Check icon - Approved status
- **📋** Clipboard - Records list
- **🏢** Building - Job reference
- **⏰** Clock - Time/date reference
- **💰** Money - Cost/rate reference

---

## ✅ Verification Checklist

Use this to verify the feature is working correctly:

### HR System Tests

- [ ] Can navigate to Overtime Tab
- [ ] Employee dropdown shows only those with attendance
- [ ] Overtime form accepts decimal hours (1.5, 2.5, etc.)
- [ ] Type dropdown shows all 4 types
- [ ] Total calculates correctly (hours × rate)
- [ ] Optional job field accepts text
- [ ] Can add overtime record successfully
- [ ] Record appears in Overtime Records list
- [ ] Can approve record
- [ ] Status changes to "Approved by Admin"
- [ ] Can delete record
- [ ] Attendance record updates accordingly
- [ ] Total hours/amount recalculate

### Jobs System Tests

- [ ] Job cards show OT badge when overtime required
- [ ] Badge shows correct hours
- [ ] Badge color changes on approval
- [ ] Checkmark appears when approved
- [ ] Job details display overtime info
- [ ] Linked overtime records appear in job

### Interconnection Tests

- [ ] Create OT in HR → Job badge updates
- [ ] Approve OT in HR → Job badge color changes
- [ ] Delete OT in HR → Job badge disappears
- [ ] Job OT field updates → Reflected in HR records
- [ ] Totals sync between both systems

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue:** Employee dropdown is empty
- **Solution:** Ensure you've selected a date with attendance records

**Issue:** Overtime total not calculating
- **Solution:** Verify both hours and rate are entered as numbers

**Issue:** Changes not syncing
- **Solution:** The feature uses component state; refresh page to see latest data

**Issue:** Can't find overtime record
- **Solution:** Check the date filter and employee name spelling

---

## 🎓 Training Guide for Users

### For HR Staff

1. **Daily Use**: Record overtime as employees report it
2. **Weekly Review**: Check pending approvals every Friday
3. **Monthly**: Generate overtime report for payroll
4. **Communication**: Notify managers when OT affects job budgets

### For Managers

1. **Job Planning**: Mark jobs requiring overtime upfront
2. **Approval**: Review and approve OT within 24 hours
3. **Budget**: Monitor OT impact on job profitability
4. **Staffing**: Use OT data to plan future team sizing

---

## 📊 Reporting & Analytics

Data available from overtime system:

```
• Total overtime hours (by employee, period, type)
• Total overtime costs (by job, department, month)
• Approval status tracking
• Job-based overtime analysis
• Employee overtime patterns
• Budget impact analysis
```

---

## 🔐 Security & Access

- Only HR admins can approve overtime
- Soft delete available (no permanent deletion)
- All changes tracked in records
- Job managers can view linked overtime
- Attendance history preserves OT links

---

## 📈 Future Enhancements

Potential additions:

- [ ] Scheduled automated overtime approvals
- [ ] Integration with payroll system
- [ ] SMS/Email notifications on approval
- [ ] Overtime budget limits by job/employee
- [ ] Historical analytics dashboard
- [ ] Recurring/recurring overtime patterns
- [ ] Mobile app support
- [ ] Multi-currency support

---

**Version:** 1.0.0  
**Last Updated:** January 15, 2026  
**Status:** Production Ready ✅

---

## 📌 Quick Reference

| Action | Location | Icon | Hotkey |
|--------|----------|------|--------|
| Record OT | HR → Overtime Tab | ⚡ | — |
| Approve OT | HR → Overtime Tab | ✓ | — |
| Delete OT | HR → Overtime Tab | 🗑️ | — |
| View Job OT | Jobs → Job Card | OT: badge | — |
| Mark Job OT | Jobs → Job Form | ⚡ checkbox | — |

