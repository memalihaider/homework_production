# PROJECT MANAGEMENT PORTAL - DEVELOPMENT GUIDE

**Status:** Ready for Development
**Modules to Build:** 2 (Projects, Tasks)
**Estimated Time:** 2-3 hours
**Code Target:** 1,000+ lines
**Handlers Target:** 19+ handlers

---

## MODULE SPECIFICATIONS

### MODULE 1: PROJECTS
**File:** `/app/project-management/projects/page.tsx`
**Size:** ~500 lines | **Handlers:** 10

#### Features:
1. Create Project
2. List all projects with pagination
3. Edit project details
4. Assign team members
5. Track project progress with percentage
6. Set project milestones
7. View project analytics/dashboard
8. Archive projects
9. Delete projects with confirmation
10. Filter by status (Active, Paused, Completed, Archived)
11. Search functionality
12. View project details modal

#### Data Structure:
```typescript
interface Project {
  id: string
  name: string
  description: string
  status: 'Active' | 'Paused' | 'Completed' | 'Archived'
  progress: number // 0-100
  startDate: string
  endDate: string
  manager: string
  team: string[] // Array of team member names
  budget: number
  spent: number
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  tasksCount: number
  completedTasks: number
  milestone?: string
}
```

#### Statistics Cards:
1. **Active Projects** - Count of projects with status 'Active'
2. **Completed Projects** - Count with status 'Completed'
3. **Team Members** - Total across all projects
4. **Overall Progress** - Average of all project progress

#### Key Handlers (10):
1. `handleCreateProject()` - Opens create modal
2. `handleSaveProject()` - Saves new project to list
3. `handleEditProject(projectId)` - Opens edit modal
4. `handleUpdateProject()` - Updates existing project
5. `handleViewProject(project)` - Opens detail view modal
6. `handleAssignTeam(projectId)` - Opens team assignment modal
7. `handleArchiveProject(projectId)` - Archives with confirmation
8. `handleDeleteProject(projectId)` - Deletes with confirmation
9. `handleFilterProjects()` - Filtering by status
10. `handleSearchProjects()` - Search by name/description

#### Filter Options:
- Status filter: All, Active, Paused, Completed, Archived
- Priority filter: All, Low, Medium, High, Critical
- Progress filter: Not Started, In Progress, Near Complete, Complete

#### Modals:
1. **Create/Edit Project Modal** - Form with fields for all project details
2. **Project Details Modal** - Shows all project information
3. **Team Assignment Modal** - Add/remove team members
4. **Project Analytics Modal** - Shows progress charts and metrics

---

### MODULE 2: TASKS
**File:** `/app/project-management/tasks/page.tsx`
**Size:** ~500 lines | **Handlers:** 9

#### Features:
1. Create Task with project association
2. List all tasks with project grouping
3. Assign task to team member
4. Update task status (To Do → In Progress → Review → Done)
5. Set task deadline and priority
6. Track task progress
7. Add task comments/notes
8. View task details modal
9. Filter by status, priority, project
10. Search functionality
11. Delete tasks with confirmation
12. Edit task details

#### Data Structure:
```typescript
interface Task {
  id: string
  title: string
  description: string
  projectId: string
  projectName: string
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  assignedTo: string // Team member name
  dueDate: string
  createdDate: string
  progress: number // 0-100
  dependencies?: string[] // Task IDs
  comments?: Comment[]
}

interface Comment {
  id: string
  author: string
  text: string
  date: string
}
```

#### Statistics Cards:
1. **Total Tasks** - Count of all tasks
2. **In Progress** - Count with status 'In Progress'
3. **Completed** - Count with status 'Done'
4. **Overdue** - Count where dueDate < today and status != 'Done'

#### Key Handlers (9):
1. `handleCreateTask()` - Opens create modal
2. `handleSaveTask()` - Saves new task
3. `handleEditTask(taskId)` - Opens edit modal
4. `handleUpdateTask()` - Updates existing task
5. `handleUpdateTaskStatus(taskId, newStatus)` - Changes task status
6. `handleAssignTask(taskId, assignee)` - Assigns to team member
7. `handleViewTask(task)` - Opens detail modal
8. `handleAddComment(taskId, comment)` - Adds comment to task
9. `handleDeleteTask(taskId)` - Deletes with confirmation

#### Filter Options:
- Status filter: All, To Do, In Progress, In Review, Done
- Priority filter: All, Low, Medium, High, Critical
- Project filter: All, then by project name
- Assignee filter: All, then by team member

#### Modals:
1. **Create/Edit Task Modal** - Form with all task fields
2. **Task Details Modal** - Full task information with comments
3. **Assign Task Modal** - Select assignee from team
4. **Add Comment Modal** - Add notes to task

---

## CODE PATTERNS TO USE

### Standard Handler Pattern:
```typescript
const handleAction = useCallback((params) => {
  // Validation
  if (validate) {
    // Action
    setState(newValue)
    alert('Success message')
  }
}, [dependencies])
```

### Status Color System:
```typescript
const getStatusColor = (status: string) => {
  switch(status) {
    case 'Done': return 'bg-green-100 text-green-700 dark:bg-green-900/30'
    case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
    case 'In Review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
    case 'To Do': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30'
    default: return 'bg-gray-100'
  }
}
```

### Priority Color System:
```typescript
const getPriorityColor = (priority: string) => {
  switch(priority) {
    case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30'
    case 'High': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
    case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
    case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/30'
    default: return 'bg-gray-100'
  }
}
```

### Filter Pattern:
```typescript
const filtered = useMemo(() => {
  return items.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })
}, [items, filterStatus, filterPriority, searchTerm])
```

### Progress Bar Pattern:
```typescript
<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
  <div
    className="bg-blue-600 h-3 rounded-full transition-all"
    style={{ width: `${progress}%` }}
  />
</div>
<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{progress}% complete</p>
```

### Modal Pattern:
```typescript
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
      {/* Modal Content */}
    </div>
  </div>
)}
```

---

## MOCK DATA EXAMPLES

### Projects Mock Data:
```typescript
const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    status: 'Active',
    progress: 65,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    manager: 'Sarah Johnson',
    team: ['John Smith', 'Emily Davis', 'Mike Chen'],
    budget: 50000,
    spent: 32500,
    priority: 'High',
    tasksCount: 12,
    completedTasks: 8,
    milestone: 'Beta Release'
  },
  // ... more projects
]
```

### Tasks Mock Data:
```typescript
const tasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockups',
    description: 'Create initial design mockups for new homepage',
    projectId: '1',
    projectName: 'Website Redesign',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'John Smith',
    dueDate: '2024-01-30',
    createdDate: '2024-01-15',
    progress: 75,
    comments: []
  },
  // ... more tasks
]
```

---

## BUILD CHECKLIST

### Projects Module:
- [ ] Create project state with mock data
- [ ] Build statistics cards (4 cards)
- [ ] Create project list display
- [ ] Add progress bars to each project
- [ ] Implement status color system
- [ ] Implement priority color system
- [ ] Create project detail modal
- [ ] Create add/edit project modal
- [ ] Create team assignment modal
- [ ] Add filter functionality
- [ ] Add search functionality
- [ ] Add delete with confirmation
- [ ] Add archive functionality
- [ ] Style responsive grid layout
- [ ] Test dark mode

### Tasks Module:
- [ ] Create task state with mock data
- [ ] Build statistics cards (4 cards)
- [ ] Create task list display (grouped by project optional)
- [ ] Add progress bars to each task
- [ ] Implement status color system
- [ ] Implement priority color system
- [ ] Create task detail modal
- [ ] Create add/edit task modal
- [ ] Create assign task modal
- [ ] Add comment functionality
- [ ] Add filter functionality
- [ ] Add search functionality
- [ ] Add delete with confirmation
- [ ] Style responsive layout
- [ ] Test dark mode

---

## ICONS TO USE

From lucide-react:
- **CheckCircle2** - For completed items
- **Circle** - For pending items
- **AlertCircle** - For overdue items
- **Calendar** - For dates
- **Users** - For team members
- **BarChart3** - For progress/analytics
- **Zap** - For priority/critical
- **MessageSquare** - For comments
- **Edit3** - For edit action
- **Trash2** - For delete action
- **Eye** - For view details
- **Plus** - For create new

---

## RESPONSIVE BREAKPOINTS

Mobile (<768px):
- Single column layout
- Full width cards
- Simplified modals

Tablet (768-1024px):
- 2 column grid for projects
- Side-by-side filters
- Full modals

Desktop (>1024px):
- 3 column grid for projects
- Horizontal layout options
- Large modals with scrolling

---

## NEXT STEPS AFTER BUILD

1. Mark todos as completed
2. Run through responsive design check
3. Verify dark mode on all pages
4. Test all filter combinations
5. Test all modal interactions
6. Create final completion summary
7. Plan testing phase

---

## DEVELOPMENT TIME ESTIMATE

- Projects Module: 1-1.5 hours
- Tasks Module: 1-1.5 hours
- Testing & Polish: 0.5 hours
- **Total: 2.5-3.5 hours**

Start with Projects module first, then Tasks module using similar patterns.
