# LEAVE & ATTENDANCE IMPLEMENTATION STATUS

## ✅ COMPLETED

### 1. Module Structure
- ✅ **leave-request** module (Manager)
  - Types, API, Services, Hooks, Constants
  - Location: `src/modules/manager/leave-request/`
  
- ✅ **staff-workshift** module (Manager)
  - Types, API, Services, Hooks, Constants
  - Location: `src/modules/manager/staff-workshift/`

### 2. API Configuration
- ✅ Added API paths to `src/core/config/api.path.ts`:
  - `MANAGER.LEAVE_REQUEST.*`
  - `MANAGER.STAFF_WORKSHIFT.*`
  - `STAFF.LEAVE_REQUEST.*`
  - `STAFF.STAFF_WORKSHIFT.*`

### 3. Type Definitions
- ✅ LeaveRequest types with status (Pending, Approved, Rejected)
- ✅ StaffWorkShift types with status (Scheduled, Working, Completed)
- ✅ Request/Response types for all operations

### 4. React Query Hooks
- ✅ `useLeaveRequests` - Get all (Manager)
- ✅ `useMyLeaveRequests` - Get my requests (Staff)
- ✅ `useCreateLeaveRequest` - Create new request
- ✅ `useApproveLeaveRequest` - Approve with replacement
- ✅ `useRejectLeaveRequest` - Reject request
- ✅ `useAvailableReplacements` - Get available staff
- ✅ `useStaffWorkShifts` - Get all shifts
- ✅ `useMyWorkShifts` - Get my shifts (Staff)
- ✅ `useCheckIn` - Check-in to shift
- ✅ `useCheckOut` - Check-out from shift
- ✅ `useCreateStaffWorkShift` - Assign staff to shift

---

## 🚧 IN PROGRESS / TODO

### Staff UI Components (Priority 1)
📁 Location: `src/modules/staff/`

#### 1. Leave Request Components
- ⏳ **CreateLeaveRequestModal.ui.tsx**
  - Date range picker (from/to)
  - Reason textarea
  - Validation: max 48 days/year
  - Submit to API
  
- ⏳ **MyLeaveRequestsList.ui.tsx**
  - List view with status badges
  - Filter by status
  - Show replacement staff if approved
  - Show rejection reason if rejected

#### 2. Work Shift Components
- ⏳ **MyWorkShiftsPage.ui.tsx**
  - Today's shifts
  - Upcoming shifts
  - Check-in/Check-out buttons
  - Status indicators
  
- ⏳ **ShiftCard.ui.tsx**
  - Display shift info (date, time, type)
  - Check-in button (30 min before - start time)
  - Check-out button (when status = Working)
  - Timer/countdown display

### Manager UI Components (Priority 2)
📁 Location: `src/modules/manager/`

#### 1. Leave Request Management
- ⏳ **LeaveRequestsListPage.ui.tsx**
  - Table with filters (status, staff, date)
  - Pending requests highlighted
  - Actions: View, Approve, Reject
  
- ⏳ **LeaveRequestDetailModal.ui.tsx**
  - Full request details
  - Staff info
  - Affected shifts (if any)
  - Approve/Reject actions

- ⏳ **ApproveLeaveRequestModal.ui.tsx**
  - Show affected shifts
  - Select replacement staff (if needed)
  - Confirm approval
  
- ⏳ **RejectLeaveRequestModal.ui.tsx**
  - Rejection reason input
  - Confirm rejection

#### 2. Staff WorkShift Management
- ⏳ **StaffWorkShiftAssignmentPage.ui.tsx**
  - Select work shift
  - Select staff
  - Validation: max 10 shifts/week
  - Assign button
  
- ⏳ **StaffWorkShiftsList.ui.tsx**
  - View all assignments
  - Filter by staff, date, status
  - Check-in/out status display

### Routes & Navigation (Priority 3)
- ⏳ Add routes to `src/app/(private)/staff/`
  - `/staff/leave-requests` - My leave requests
  - `/staff/work-shifts` - My work shifts
  
- ⏳ Add routes to `src/app/(private)/manager/`
  - `/manager/leave-requests` - Manage all requests
  - `/manager/staff-workshifts` - Manage shift assignments

- ⏳ Update navigation menus
  - Staff sidebar: Add Leave & Shifts links
  - Manager sidebar: Add Leave Management & Shift Management

---

## 📋 IMPLEMENTATION GUIDE

### For Staff Components:

```typescript
// Example: CreateLeaveRequestModal.ui.tsx
import { useCreateLeaveRequest } from '@/modules/manager/leave-request';
import { useGlobalToast } from '@/core/patterns/SingletonHook';

// Use date picker for fromDate/toDate
// Validate: toDate >= fromDate
// Calculate days: (toDate - fromDate + 1)
// Check: total days <= 48
// Call: createMutation.mutateAsync({ staffId, fromDate, toDate, reason })
```

### For Manager Components:

```typescript
// Example: ApproveLeaveRequestModal.ui.tsx
import { useApproveLeaveRequest, useAvailableReplacements } from '@/modules/manager/leave-request';

// 1. Load available replacements
// 2. Show list to select
// 3. Call: approveMutation.mutateAsync({ leaveRequestId, replacementStaffId })
```

### For WorkShift Components:

```typescript
// Example: MyWorkShiftsPage.ui.tsx
import { useMyWorkShifts, useCheckIn, useCheckOut } from '@/modules/manager/staff-workshift';

// Filter today's shifts
// Check if within check-in window (30 min before start)
// Show appropriate button based on status:
// - Scheduled → Check-In button
// - Working → Check-Out button
// - Completed → Show completed badge
```

---

## 🎯 NEXT STEPS

1. **Create Staff UI Components** (Highest Priority)
   - Start with CreateLeaveRequestModal
   - Then MyLeaveRequestsList
   - Then MyWorkShiftsPage with Check-in/out

2. **Create Manager UI Components**
   - LeaveRequestsListPage
   - ApproveLeaveRequestModal
   - StaffWorkShiftAssignmentPage

3. **Add Routes**
   - Create page files in app directory
   - Update navigation

4. **Testing**
   - Test leave request flow end-to-end
   - Test check-in/out with time windows
   - Test approval with replacement

---

## 📝 NOTES

- All API endpoints follow the document: `docs/LEAVE_AND_ATTENDANCE_FLOW_GUIDE.md`
- Use existing patterns from service/submission-method modules
- Follow project guidelines in `.cursor/rules/cursor-rules.mdc`
- All UI text in Vietnamese
- Use TailwindCSS for styling
- Use BaseModal for modals
- Use React Query for data fetching

---

## 🔗 RELATED FILES

- API Paths: `src/core/config/api.path.ts`
- Leave Request Module: `src/modules/manager/leave-request/`
- Staff WorkShift Module: `src/modules/manager/staff-workshift/`
- Document: `docs/LEAVE_AND_ATTENDANCE_FLOW_GUIDE.md`
- Guidelines: `.cursor/rules/cursor-rules.mdc`

