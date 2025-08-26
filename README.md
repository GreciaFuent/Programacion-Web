# Programacion-Web
HW-04

## CloudFront CDN
**CDN URL:** https://d7cqx9jtexngg.cloudfront.net/

## Hooks used

### 1) `useState`
**Where:** App.jsx (showForm, filter, and a single state object { tasks, nextId }), and in form components.  
**Why:**
- **showForm**: UI toggle for the task form.
- **filter**: current filter selection ("all" | "pending" | "completed").
- **state**: keeps the tasks and a monotonic nextId to avoid ID collisions.

---

### 2) `useEffect`
**Where:** App.jsx, for persisting and restoring state.  
**Why:**
- On **mount**, read from localStorage.
- On **every state change**, serialize and save to localStorage.

---

### 3) `useMemo`
**Where:**
- `App.jsx`: pendingCount, completedCount, and filteredTasks.
- `Task.jsx`: humanDate formatting.

---



