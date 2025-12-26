# QUICK REFERENCE - Admin Portal Navigation

## 🚀 Common Tasks & Navigation Paths

### Task: Start a New Job

**Path 1: Via CRM (Recommended)**
```
1. Go to CRM Leads → /admin/crm
2. Find client → Click card
3. Click "Create Quotation"
4. Fill quotation details
5. Send to client
6. Client approves → Job auto-created
7. Go to /admin/jobs to see new job
```

**Path 2: Direct**
```
1. Go to Job Board → /admin/jobs
2. Click "New Job" button
3. Fill job details
4. Submit
```

---

### Task: Assign Team to Job

**Quick Steps:**
```
1. Open Job Detail → /admin/jobs/detail?jobId={jobId}
2. Click "Assign Team" button
3. See available team from HR module
4. Check skills and availability
5. Select team members
6. Confirm assignment
```

---

### Task: Execute a Job

**Complete Workflow:**
```
1. Dashboard → /admin/dashboard
2. Click "Active Jobs" card
3. Select job from list
4. Open Job Detail
5. Click "Live View" button
6. Monitor real-time progress
7. Update task progress as needed
8. Document any damage
9. Report incidents if needed
```

---

### Task: Complete Job & Get Paid

**Complete Process:**
```
1. Open Job Detail
2. Click "Job Closure"
3. Complete quality inspection
4. Get client signature
5. System generates invoice automatically
6. Go to Finance → /admin/finance
7. View Invoice → /admin/finance/invoice-generator
8. Track payment → /admin/finance/payment-tracker
```

---

### Task: Get Customer Feedback

**Feedback Workflow:**
```
1. Job completed (in Closure step)
2. Click "Feedback Collection"
3. NPS scoring form
4. Sentiment analysis
5. Results feed to:
   - Surveys module → /admin/surveys
   - CRM client rating
   - Analytics dashboard
```

---

### Task: View Client History

**Access All Client Data:**
```
1. Go to CRM → /admin/crm
2. Click on Client card
3. View in Detail Modal:
   - Active Contracts
   - Payment history (via "View Invoices" button)
   - All jobs (via "View Jobs" button)
   - Previous quotations
```

---

## 📋 Module Navigation Map

### From Dashboard Hub
```
Dashboard (/admin/dashboard)
├── Active Jobs → /admin/jobs
├── CRM Leads → /admin/crm
├── Quotations → /admin/quotations
└── Pending Invoices → /admin/finance
```

### Jobs Workflow (Status-Based)
```
Job Detail (/admin/jobs/detail)
│
├─ Scheduled Status
│  ├── Pre-Job Checklist → /admin/jobs/pre-job-checklist
│  ├── Assign Team → /admin/jobs/assignment
│  ├── Permit Tracker → /admin/jobs/permit-tracker
│  └── Equipment → /admin/jobs/equipment-readiness
│
├─ In Progress Status
│  ├── Live View → /admin/jobs/live-job-view
│  ├── Task Progress → /admin/jobs/task-progress
│  ├── Damage Check → /admin/jobs/damage-check
│  └── Incidents → /admin/jobs/incident-log
│
└─ Completed Status
   ├── Job Closure → /admin/jobs/job-closure
   ├── Feedback → /admin/jobs/feedback-collection
   ├── Review → /admin/jobs/review-request
   └── Summary → /admin/jobs/client-summary
```

### CRM to Other Modules
```
Client Detail Modal
├── Create Quotation → /admin/quotations/builder?clientId={id}
├── View Jobs → /admin/jobs?clientId={id}
└── View Invoices → /admin/finance?clientId={id}
```

---

## 🔗 Direct URLs Reference

### Quick Links
| What | URL |
|------|-----|
| Dashboard | `/admin/dashboard` |
| Job Board | `/admin/jobs` |
| CRM | `/admin/crm` |
| Finance | `/admin/finance` |
| Quotations | `/admin/quotations` |
| Surveys | `/admin/surveys` |
| HR | `/admin/hr` |
| Meetings | `/admin/meetings` |

### Job Workflow (with jobId parameter)
| Action | URL |
|--------|-----|
| Job Detail | `/admin/jobs/detail?jobId=1` |
| Pre-Job Checklist | `/admin/jobs/pre-job-checklist?jobId=1` |
| Team Assignment | `/admin/jobs/assignment?jobId=1` |
| Permits | `/admin/jobs/permit-tracker?jobId=1` |
| Equipment | `/admin/jobs/equipment-readiness?jobId=1` |
| Live View | `/admin/jobs/live-job-view?jobId=1` |
| Task Progress | `/admin/jobs/task-progress?jobId=1` |
| Damage Check | `/admin/jobs/damage-check?jobId=1` |
| Incidents | `/admin/jobs/incident-log?jobId=1` |
| Closure | `/admin/jobs/job-closure?jobId=1` |
| Feedback | `/admin/jobs/feedback-collection?jobId=1` |
| Review | `/admin/jobs/review-request?jobId=1` |
| Summary | `/admin/jobs/client-summary?jobId=1` |

### CRM & Finance Integration
| Action | URL |
|--------|-----|
| Create Quote | `/admin/quotations/builder?clientId=1` |
| View Client Jobs | `/admin/jobs?clientId=1` |
| View Client Invoices | `/admin/finance?clientId=1` |

---

## ⚡ Time-Saving Tips

### Tip 1: Use Dashboard Cards
- Dashboard has quick links to all major sections
- Each card shows current metrics
- Saves 3-5 clicks per task

### Tip 2: Status-Based Workflow Buttons
- Job detail automatically shows relevant next steps
- No need to manually navigate to correct page
- Buttons guide you through complete job lifecycle

### Tip 3: Client Context Preservation
- When navigating from CRM client → jobs/invoices
- System knows which client you're working with
- No need to search or re-select client

### Tip 4: One-Click Quote to Job
- Create quote from client detail (1 click)
- Send quote to client
- Approval auto-creates job (0 clicks)
- Job appears in job board ready to work

### Tip 5: Pre-Filled Forms
- Quotation builder pre-fills client info from CRM
- Job detail already has client data
- Saves time and reduces errors

---

## 🎯 Workflow Checklists

### Complete Job Execution Checklist
```
□ Open Job from Dashboard
□ Review job details
□ Click "Pre-Job Checklist" for pre-execution phase
□ Verify equipment readiness
□ Check permits are in place
□ Assign team (click "Assign Team")
□ Confirm team has required skills
□ Start job → Click "Live View"
□ Monitor live progress
□ Update task completion
□ Document any damage issues
□ Report incidents if any
□ Close job → Click "Job Closure"
□ Get client signature
□ Invoice auto-generated
□ Collect feedback → Click "Feedback Collection"
□ Track payment in Finance
```

### Client to Invoice Workflow
```
□ Find client in CRM
□ Click "Create Quotation"
□ Fill quote details
□ Send to client
□ Client approves (in email/portal)
□ Job auto-created
□ Execute job (follow job execution checklist)
□ Complete Job Closure
□ Invoice auto-generated in Finance
□ Send invoice to client
□ Track payment → Payment Tracker
□ Reconcile when paid
```

---

## ❓ Troubleshooting

### Q: I can't find a job for a client
**A:** Go to CRM → Select client → Click "View Jobs"

### Q: What do I do after assigning a team?
**A:** The system will show "Live View" option when job status is "In Progress"

### Q: Where do I create an invoice?
**A:** Invoices auto-create when you complete a job. View in Finance module.

### Q: How do I track a payment?
**A:** Go to Finance → Payment Tracker. Shows all payments with status.

### Q: Can I create a quotation without a client?
**A:** Yes, but it's better to use CRM first. Pre-fills all client data.

### Q: What happens to feedback data?
**A:** Feedback links to:
- Client rating in CRM
- Survey analytics
- Performance dashboard

---

## 📞 Key Features

### 🔄 Real-Time Updates
- Live job tracking with GPS
- Team status updates
- Payment notifications

### 📊 Analytics Available
- Dashboard metrics
- Performance reports
- Financial analytics
- Client satisfaction scores

### 🔐 Admin Controls
- Role-based permissions
- Audit logs for all actions
- Team management
- Client management

### 📱 Mobile Friendly
- Responsive layouts
- Touch-optimized buttons
- Mobile navigation

---

## 🎓 Learning Path

**New User Onboarding:**
1. Day 1: Learn Dashboard navigation
2. Day 2: Create your first quotation
3. Day 3: Execute a complete job
4. Day 4: Track payments & feedback
5. Day 5: Review analytics & reports

**Power User Tips:**
- Use keyboard navigation for speed
- Remember common URL patterns
- Bookmark frequently used pages
- Use back button to return to previous context
- Watch for status-based action buttons

---

## 💡 Pro Tips

1. **Status is Your Guide**: Always look for colored action buttons matching current job status
2. **Use Context**: When you navigate FROM a module, it remembers your context
3. **Pre-filled Data**: Forms auto-fill when coming from related modules
4. **One Source of Truth**: All data synchronized across modules
5. **Audit Trail**: Every action is logged and traceable

---

**Last Updated**: 25 December 2025
**Version**: 1.0 - Production Ready

For detailed information, see: `APP_INTERCONNECTION_GUIDE.md`

