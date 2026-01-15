# Job Expense Manager - Quick Reference Guide

## Quick Navigation

### 📱 Access the Expense Manager
1. Go to **Jobs** page in admin panel
2. Click **Expense Manager** button (green button with $ icon)
3. Or navigate directly to `/admin/jobs/expense-manager`

---

## Three Main Tabs

### 1️⃣ **➕ Add Expense** 
Record new job-related expenses

| Field | Required | Notes |
|-------|----------|-------|
| Job | ✅ Yes | Select from dropdown |
| Expense Type | ✅ Yes | e.g., "Staff Labor" |
| Category | ✅ Yes | Labor, Materials, Equipment, Transport, Other |
| Amount | ✅ Yes | Enter number only (AED) |
| Date | Optional | Defaults to today |
| Approved By | Optional | Manager/supervisor name |
| Description | Optional | What the expense is for |
| Notes | Optional | Additional details |

**Quick Actions:**
- Click **"Add Expense Record"** to save
- Click **"Update Expense"** if editing
- Click **"Cancel"** to abort

---

### 2️⃣ **📋 View Expenses**
See all recorded expenses with filters

**Quick Filters:**
```
Filter by Job → Select job from dropdown
Filter by Category → Labor/Materials/Equipment/Transport/Other
Time Range → All Time / Today / This Week / This Month
Search → Type to find expenses
```

**Table Columns:**
- Date - When expense occurred
- Job - Job title and description
- Type - Expense type
- Category - Expense category
- Amount - Cost in AED
- Approved By - Approver name
- Actions - Edit/Delete buttons

**Statistics:**
- 📊 Total Expenses (sum of filtered)
- 🔢 Expense Count (number of records)
- 📈 Average Expense (mean amount)

---

### 3️⃣ **📊 Analytics**
Visualize and analyze expense data

**Charts Available:**
1. **Pie Chart** - Expenses by Category
2. **Line Chart** - Expenses Over Time (trends)
3. **Bar Chart** - Expense Distribution

**Budget Analysis Table:**
Shows for each job:
- Job title
- Budget (AED)
- Total expenses (AED)
- Remaining budget (AED)
- Revenue (AED)
- Profit/Loss (AED)
- Profit Margin (%)

**Color Codes:**
| Color | Margin % | Status |
|-------|----------|--------|
| 🟢 | ≥20% | Excellent |
| 🔵 | 10-20% | Good |
| 🟡 | 0-10% | Low |
| 🔴 | Negative | Loss |

---

## Common Tasks

### ➕ Add Expense
1. Click **"➕ Add Expense"** tab
2. Pick job → type name → choose category → enter amount
3. Click **"Add Expense Record"**
4. ✅ Done!

### ✏️ Edit Expense
1. Go to **"📋 View Expenses"** tab
2. Find expense → click pencil icon
3. Update fields → click **"Update Expense"**
4. ✅ Done!

### 🗑️ Delete Expense
1. Go to **"📋 View Expenses"** tab
2. Find expense → click trash icon
3. Confirm deletion
4. ✅ Done!

### 🔍 Find Specific Expense
1. Use **search box** (type job name or expense type)
2. Use **job filter** (select specific job)
3. Use **category filter** (Labor, Materials, etc.)
4. Use **time range** (Today, This Week, This Month)

### 📈 Check Job Profitability
1. Click **"📊 Analytics"** tab
2. Scroll to **"Job-wise Budget Analysis"** table
3. Check **"Profit/Loss"** column (green = profit, red = loss)
4. Check **"Margin %"** column (higher is better)

### 📊 View Spending Trends
1. Click **"📊 Analytics"** tab
2. Check **"Expenses Over Time"** line chart
3. Identify spending patterns (spikes = high-cost days)

---

## Expense Categories at a Glance

| Category | Examples | Budget Impact |
|----------|----------|----------------|
| **Labor** | Staff wages, hourly rates | Largest usually |
| **Materials** | Supplies, parts | Variable |
| **Equipment** | Rentals, tools | Medium |
| **Transport** | Fuel, parking, delivery | Small-Medium |
| **Other** | Permits, licenses | Small |

---

## Key Calculations

```
Budget Utilization = (Total Expenses ÷ Budget) × 100
Remaining Budget = Budget - Total Expenses
Profit/Loss = Revenue - Total Expenses
Profit Margin % = (Profit/Loss ÷ Revenue) × 100
```

---

## Daily/Weekly/Monthly Tracking

### 🔹 Daily
- View today's expenses only
- Monitor daily spending
- Use filter: **Time Range → Today**

### 🔹 Weekly
- View last 7 days
- Track weekly trends
- Use filter: **Time Range → This Week**

### 🔹 Monthly
- View last 30 days
- Budget vs actual analysis
- Use filter: **Time Range → This Month**

---

## Tips & Tricks

✅ **Best Practices:**
- Record expenses same day they occur
- Use descriptive expense names
- Always categorize correctly
- Get manager approval before large expenses
- Review analytics weekly
- Compare profit margins across jobs

⚠️ **Avoid:**
- Deleting old records without backup
- Using vague expense descriptions
- Forgetting to record small expenses
- Ignoring budget warnings
- Recording expenses in wrong category

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Can't find expense | Use search box or clear all filters |
| Budget seems wrong | Verify all expenses are recorded |
| Number looks odd | Check currency (should be AED) |
| Filter not working | Reload page and try again |
| Chart not showing | Ensure there's data in selected filters |

---

## Report Generation

### To Generate a Report:
1. Go to **"📊 Analytics"** tab
2. **Screenshot** the tables and charts
3. Or manually note the data from:
   - Job-wise Budget Analysis table
   - Total Expenses stat
   - Profit/Loss column

### Export Data:
- Currently: Manual export via screenshot
- Future: CSV/PDF export feature coming

---

## Approval Workflow

```
Employee Records Expense
            ↓
Enters Amount & Details
            ↓
Manager Reviews (Approved By field)
            ↓
Expense Stored in System
            ↓
Analytics Updated
```

---

## Monthly Checklist

Every month, you should:
- ☐ Review all job expenses
- ☐ Check profit/loss for each job
- ☐ Verify budget utilization
- ☐ Archive completed job records
- ☐ Update next month's budgets
- ☐ Share profit reports with management

---

## Quick Numbers Reference

**Expense Range (Sample):**
- Small expense: AED 100-500
- Medium expense: AED 500-2,000
- Large expense: AED 2,000+

**Good Profit Margins:**
- Service jobs: 25-35%
- Maintenance: 20-30%
- Supply jobs: 15-25%
- Equipment rental: 30-40%

---

## Support

**Questions?**
- Check the **Full Documentation** file
- Review sample scenarios in docs
- Contact admin team

---

**Last Updated:** January 2025 | **Version:** 1.0
