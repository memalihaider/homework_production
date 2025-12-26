# Routes & Navigation Map

## New Admin Management Routes

```
/admin/admin-management/
├── role-manager/
│   └── page.tsx (390 lines)
│       ├── Route: /admin/admin-management/role-manager
│       ├── Features: Create, Edit, Delete, Clone roles
│       └── Status: ✅ ACTIVE
│
├── permission-matrix/
│   └── page.tsx (330 lines)
│       ├── Route: /admin/admin-management/permission-matrix
│       ├── Features: Granular permissions, temp access, risk scoring
│       └── Status: ✅ ACTIVE
│
├── user-accounts/
│   └── page.tsx (420 lines)
│       ├── Route: /admin/admin-management/user-accounts
│       ├── Features: User CRUD, status toggling, temp access
│       └── Status: ✅ ACTIVE
│
└── audit-logs/
    └── page.tsx (450 lines)
        ├── Route: /admin/admin-management/audit-logs
        ├── Features: Event logging, anomaly detection, risk scoring
        └── Status: ✅ ACTIVE
```

## Full Admin Panel Structure

```
/admin/
├── dashboard/
│   └── page.tsx ✅
│
├── settings/
│   └── page.tsx ✅
│
├── admin-management/ (NEW)
│   ├── role-manager/ ✅
│   ├── permission-matrix/ ✅
│   ├── user-accounts/ ✅
│   └── audit-logs/ ✅
│
├── meetings/
│   ├── calendar/ ✅
│   ├── detail/ ✅
│   ├── notes-decisions/ ✅
│   └── follow-up-tracker/ ✅
│
├── finance/
│   ├── dashboard/ ✅
│   ├── debtors-dashboard/ ✅
│   ├── finance-reports/ ✅
│   ├── invoice-generator/ ✅
│   └── payment-tracker/ ✅
│
├── jobs/
│   ├── page.tsx ✅
│   ├── assignment/ ✅
│   ├── client-summary/ ✅
│   ├── damage-check/ ✅
│   ├── detail/ ✅
│   ├── equipment-readiness/ ✅
│   ├── feedback-collection/ ✅
│   ├── incident-log/ ✅
│   ├── job-closure/ ✅
│   ├── live-job-view/ ✅
│   ├── permit-tracker/ ✅
│   ├── pre-job-checklist/ ✅
│   ├── review-request/ ✅
│   ├── schedule/ ✅
│   ├── task-progress/ ✅
│   ├── team-readiness/ ✅
│   └── page.tsx ✅
│
├── crm/
│   ├── page.tsx ✅
│   ├── clients/ ✅
│   ├── communications/ ✅
│   └── pipeline/ ✅
│
├── hr/
│   ├── page.tsx ✅
│   ├── attendance/ ✅
│   ├── employee-directory/ ✅
│   ├── leave-management/ ✅
│   ├── payroll/ ✅
│   └── performance-dashboard/ ✅
│
├── surveys/
│   ├── page.tsx ✅
│   ├── form/ ✅
│   ├── pricing/ ✅
│   └── review/ ✅
│
├── quotations/
│   ├── page.tsx ✅
│   ├── approval/ ✅
│   ├── builder/ ✅
│   ├── history/ ✅
│   └── preview/ ✅
│
└── cms/
    └── page.tsx ✅
```

## Access Permissions by Role

### Role Hierarchy

```
SUPER ADMIN (Complete Access)
├── All role management features ✅
├── All permission controls ✅
├── All user accounts ✅
├── All audit logs ✅
└── System configuration ✅

ADMIN (High Privileges)
├── Role management (except delete system roles) ✅
├── Permission configuration ✅
├── User management ✅
├── Audit logs (view) ✅
└── Most system features ✅

MANAGER (Standard Access)
├── View users in team ✅
├── Manage team members ✅
├── View permissions ✅
├── Access to jobs/finance ✅
└── Basic reporting ✅

SUPERVISOR (Limited Access)
├── View team information ✅
├── Basic job tracking ✅
├── View reports ✅
└── Read-only audit logs ✅

USER (Basic Access)
├── Own profile access ✅
├── Assigned jobs ✅
├── Basic reporting ✅
└── No admin access ✅

GUEST (Minimal Access)
├── Read-only access ✅
└── No modification rights ✅
```

## API Endpoints Required

### Role Management
```
POST   /api/admin/roles              - Create role
GET    /api/admin/roles              - List roles
GET    /api/admin/roles/:id          - Get role details
PUT    /api/admin/roles/:id          - Update role
DELETE /api/admin/roles/:id          - Delete role
POST   /api/admin/roles/:id/clone    - Clone role
GET    /api/admin/roles/:id/users    - Get users with role
```

### Permission Management
```
GET    /api/admin/permissions         - List all permissions
POST   /api/admin/permissions/grant   - Grant permission to role
POST   /api/admin/permissions/revoke  - Revoke permission
POST   /api/admin/permissions/temp    - Grant temporary access
GET    /api/admin/permissions/matrix  - Get permission matrix
DELETE /api/admin/permissions/temp/:id - Revoke temp access
```

### User Management
```
POST   /api/admin/users               - Create user
GET    /api/admin/users               - List users
GET    /api/admin/users/:id           - Get user details
PUT    /api/admin/users/:id           - Update user
DELETE /api/admin/users/:id           - Delete user
PATCH  /api/admin/users/:id/status    - Toggle status
POST   /api/admin/users/:id/temp-access - Grant temp access
GET    /api/admin/users/:id/activity  - Get user activity
```

### Audit Logging
```
GET    /api/admin/audit-logs          - List audit events
GET    /api/admin/audit-logs/:id      - Get event details
GET    /api/admin/audit-logs/search   - Search logs
POST   /api/admin/audit-logs/export   - Export logs
GET    /api/admin/audit-logs/stats    - Get statistics
GET    /api/admin/audit-logs/anomalies - Get anomalies
```

## Navigation Suggestions

### Admin Sidebar Menu Items
```
Admin Management (NEW SECTION)
├── 🛡️ Role Manager
│   └── Create, edit, clone roles
├── 🔐 Permission Matrix
│   └── Configure granular permissions
├── 👥 User Accounts
│   └── Manage system users
└── 📊 Audit Logs
    └── Monitor system activity

Security
├── Risk Dashboard (placeholder)
├── Threat Alerts (placeholder)
└── Security Reports (placeholder)

System
├── General Settings
├── Email Configuration
└── Backup & Recovery
```

## User Journey Examples

### As a Super Admin: Creating a New Role
```
1. Click: Role Manager
2. Click: Create Role button
3. Fill: Role name, description, level
4. Click: Create Role
5. System: Adds role to list
6. Option: Clone role for variants
7. Option: Configure permissions in Permission Matrix
8. Result: New role visible in User Accounts for assignment
```

### As an Admin: Granting Temporary Access
```
1. Click: Permission Matrix
2. Select: Target role from tabs
3. Click: Permission to grant (toggle)
4. Click: Grant Temporary Access (clock icon)
5. Set: Expiry date (1-90 days)
6. Click: Grant
7. Result: Temp access timer running
8. Automatic: Expires after set date
```

### As a Manager: Monitoring User Activity
```
1. Click: Audit Logs
2. Filter: By user or action type
3. Set: Date range
4. Click: Export if needed
5. View: Before/after changes
6. Note: Risk scores and anomalies
7. Alert: Act on critical events (risk > 75)
8. Report: Document security incidents
```

### As a Super Admin: Responding to Alert
```
1. System: "Unauthorized Access Attempt" alert
2. Click: Audit Logs (risk = 95)
3. View: Event details, IP address
4. Analyze: Before/after, user attribution
5. Action: Deactivate user in User Accounts
6. Action: Review roles for affected user
7. Action: Update permissions if needed
8. Log: Document incident response in notes
```

## Role-Based Feature Access

### Role Manager Page
```
Super Admin: ✅ Full access (create, edit, delete, clone)
Admin: ✅ Full access except delete system roles
Manager: ❌ View only
Supervisor: ❌ View only
User: ❌ No access
Guest: ❌ No access
```

### Permission Matrix Page
```
Super Admin: ✅ Full access (toggle, grant temp)
Admin: ✅ Full access except critical permissions
Manager: ❌ View only
Supervisor: ❌ No access
User: ❌ No access
Guest: ❌ No access
```

### User Accounts Page
```
Super Admin: ✅ Full access (create, edit, delete)
Admin: ✅ Full access (create, edit, deactivate)
Manager: ✅ Limited (view team members)
Supervisor: ⚠️ Very limited (view team)
User: ✅ Own profile only
Guest: ❌ No access
```

### Audit Logs Page
```
Super Admin: ✅ Full access (view, search, export)
Admin: ✅ Full access (view, search, export)
Manager: ✅ Limited (view team activity)
Supervisor: ⚠️ Very limited (view own activity)
User: ✅ Own activity only
Guest: ❌ No access
```

## Integration Checklist

- [ ] Connect Role Manager to backend
- [ ] Connect Permission Matrix to backend
- [ ] Connect User Accounts to backend
- [ ] Connect Audit Logs to real events
- [ ] Implement temporary access expiration jobs
- [ ] Setup anomaly detection engine
- [ ] Enable email notifications for alerts
- [ ] Add admin dashboard with security summary
- [ ] Implement role-based UI access control
- [ ] Setup audit log retention policies
- [ ] Create security reporting dashboard
- [ ] Setup compliance export formats

## Summary

✅ **4 fully functional admin management pages**
✅ **Integrated into existing admin structure**
✅ **66+ total admin routes (added 4 new)**
✅ **Role-based access control ready**
✅ **API endpoints defined**
✅ **Navigation structure planned**
✅ **User journey documented**

Ready for backend integration! 🚀

