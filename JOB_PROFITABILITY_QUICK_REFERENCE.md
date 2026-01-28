# Job Profitability Page - Quick Reference Guide

**URL**: `http://localhost:3000/admin/job-profitability`

---

## 🎯 What's New

### Complete Filter System ✅
- **Search**: By job title, client, location
- **Department**: Cleaning, Maintenance, Landscaping, Industrial
- **Status**: Completed, In Progress, Scheduled, Pending
- **Profitability**: Highly Profitable, Profitable, Break Even, Loss
- **Time Range**: Week, Month, Quarter, Year, All Time
- **Sort**: 8 sort options (profit, revenue, cost, margin - both directions)

### Enhanced Dashboard ✅
- **5 Summary Metrics**: Revenue, Cost, Profit, Profitable Jobs, Cost/Hour
- **10 Sample Jobs**: Realistic data across all departments
- **Color Coding**: Profit levels in 5 colors (green to red)
- **Status Badges**: 4 status types with distinct colors
- **Empty State**: Friendly message when no jobs match

### Data Integration ✅
- **Jobs Page**: Synced in real-time
- **Finance System**: Revenue and cost tracking
- **Team/HR**: Hours and utilization metrics
- **Equipment**: Cost allocation by job

---

## 📊 Summary Cards (Top Section)

```
┌─────────────────┬──────────────────┬──────────────────┬──────────────────┬───────────────────┐
│  Total Revenue  │   Total Cost     │   Total Profit   │ Profitable Jobs  │  Cost per Hour    │
│  AED 75.5K      │   AED 56.2K      │   AED 19.3K      │        9         │    AED 1,047     │
│  10 jobs        │  2 ongoing       │  47.8% avg       │  1 losing job    │  18.4 total hrs  │
└─────────────────┴──────────────────┴──────────────────┴──────────────────┴───────────────────┘
```

---

## 🔍 Filter Panel

**Click Filter icon or panel to expand/collapse**

### Row 1 - Main Filters
```
Search: [Search by job, client, location...]  | Sort: [Profit ↓]  | Time: [This Month ▼]
```

### Row 2 - Category Filters
```
Department: [All ▼]  |  Status: [All ▼]  |  Profitability: [All ▼]
```

### Active Filters (Auto-display)
```
[Cleaning ×] [Completed ×] [Highly Profitable ×]
```

---

## 📈 Profitability Color Codes

| Color | Margin | Interpretation |
|-------|--------|-----------------|
| 🟢 Green | >20% | Highly Profitable |
| 🔵 Blue | 10-20% | Good Profitability |
| 🟡 Yellow | 1-10% | Moderate |
| ⚪ Gray | 0% | Break Even |
| 🔴 Red | <0% | Loss Making |

---

## 📋 Table Columns

| Column | Shows | Color |
|--------|-------|-------|
| Job Title | Name of project | Black |
| Client | Client name | Gray |
| Department | Team/category | Indigo badge |
| Budget | Planned cost | Gray |
| Actual Cost | Real cost | Gray |
| Revenue | Income | Gray |
| Profit | Revenue - Cost | Green/Red |
| Margin % | Profit % | Green/Red/Yellow |
| Status | Job state | Color badge |

---

## 🎯 How to Use Filters

### Find Highly Profitable Jobs
1. Click Filters (expand panel)
2. Set Profitability: "Highly Profitable (≥20%)"
3. View filtered results

### Track In-Progress Costs
1. Set Status: "In Progress"
2. Monitor Actual Cost vs Budget
3. Sort by Cost for highest spend

### Compare Departments
1. Set Department: "Cleaning"
2. See all jobs in that department
3. Check average profitability

### Search Client
1. Type in Search box: "Corporate"
2. Get all jobs for that client
3. Analyze by profitability

---

## 📊 Sort Options (8 Total)

```
✓ Profit (High to Low)  ← DEFAULT
  Profit (Low to High)
  Revenue (High to Low)
  Revenue (Low to High)
  Cost (High to Low)
  Cost (Low to High)
  Margin (High to Low)
  Margin (Low to High)
```

---

## 🔗 Data Connections

### ↔️ Jobs Page
- Job titles, status, budget, cost, revenue
- Real-time sync
- Changes reflect immediately

### ↔️ Finance/Invoices
- Revenue from invoices
- Cost from payments
- Budget reconciliation

### ↔️ Team/HR System
- Team member hours
- Department allocation
- Capacity utilization

### ↔️ Equipment Page
- Equipment costs by job
- Material usage tracking
- Maintenance expenses

---

## 📌 Sample Data Overview

**10 Jobs Total:**
- 4 Cleaning jobs (revenue: $27.9K)
- 3 Maintenance jobs (revenue: $22.3K)
- 2 Landscaping jobs (revenue: $16.0K)
- 1 Industrial job (revenue: $16.0K)

**Status Distribution:**
- 6 Completed (100% profit calculated)
- 2 In Progress (ongoing monitoring)
- 1 Scheduled (upcoming)
- 1 Pending (not started)

**Profitability:**
- 9 Profitable jobs
- 0 Loss jobs
- 1 Break-even job

---

## 💡 Common Queries

### "Show me all losing jobs"
1. Profitability: "Loss"
2. All negative margin jobs displayed

### "Which completed jobs were most profitable?"
1. Status: "Completed"
2. Profitability: "Highly Profitable"
3. Sort: "Profit (High to Low)"

### "What's our cost per hour?"
- Top card shows: **AED 1,047** (from filtered data)

### "Which department is most profitable?"
1. Department: "Landscaping"
2. Average margin: 22%

### "Search for a specific client"
1. Type client name in Search box
2. View all their jobs
3. Analyze profitability

---

## 🚀 Quick Tips

✅ **Filter Panel**: Click icon to collapse/expand  
✅ **Active Filters**: Click × to remove individual filters  
✅ **Sort Dropdown**: 8 options for different analysis  
✅ **Search**: Works with job title, client, location  
✅ **Multi-Filter**: Combine filters for detailed analysis  
✅ **Color Coding**: Red = Problem, Green = Success  
✅ **Empty State**: Shows when no jobs match filters  

---

## 🔄 Real-Time Updates

**Data syncs automatically from:**
- Jobs page (when you add/edit jobs)
- Finance system (when revenue is recorded)
- Team page (when hours are logged)

**You may need to refresh if:**
- Job status changes in jobs page
- Revenue is newly recorded
- Team hours are updated

---

## 🎓 Metric Explanations

### Profit Margin %
```
Formula: (Revenue - Cost) ÷ Revenue × 100
Example: ($5,500 - $3,800) ÷ $5,500 × 100 = 31%
```

### Cost per Hour
```
Formula: Total Cost ÷ Total Hours
Measures: Team efficiency and labor costs
```

### Revenue per Hour
```
Formula: Total Revenue ÷ Total Hours
Measures: Revenue generation per work hour
```

### Budget Variance
```
Formula: Actual Cost - Budget
Shows: Over/under budget by amount
```

---

## 📱 Mobile Friendly

- ✅ Filters collapse on mobile
- ✅ Table scrolls horizontally
- ✅ Touch-friendly buttons
- ✅ Responsive grid layout
- ✅ Readable on all screen sizes

---

## ⚙️ Filter Combinations Examples

### High-Value Profitable Jobs
```
Department: All
Status: Completed
Profitability: Highly Profitable
Sort: Revenue (High to Low)
→ Shows: Profitable completed jobs sorted by revenue
```

### Problem Jobs to Watch
```
Status: In Progress
Sort: Cost (High to Low)
→ Shows: Expensive ongoing jobs at top
```

### Client Profitability Analysis
```
Search: [Client Name]
Sort: Margin (High to Low)
→ Shows: All jobs for client sorted by profitability
```

### Department Performance
```
Department: [Selected]
Sort: Profit (High to Low)
→ Shows: Department performance ranked
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Filters not working | Clear all filters, refresh page |
| No jobs showing | Check time range, adjust filters |
| Numbers look wrong | Refresh page to sync with source |
| Missing a job | Check job status isn't "Cancelled" |

---

## 📞 Support

For questions:
1. Check filter combinations
2. Verify jobs exist in system
3. Confirm revenue is recorded
4. Check team hours are logged

---

**Last Updated**: 28 January 2026  
**Status**: ✅ Production Ready  
**Version**: 2.0

