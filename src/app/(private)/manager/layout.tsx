'use client';

import { AppSidebar, ManagerHeader, ManagerBreadcrumb } from "@/shared/components/manager"
import {
  SidebarInset,
  SidebarProvider
} from "@/shared/components/manager/ui/sidebar"
import { ProtectedRoute } from "@/modules/auth/components/authorization/ProtectedRoute"
import { UserRole } from "@/modules/auth/enums"

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.MANAGER]} redirectTo="/login">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Professional Header with Search, Notifications, User Menu */}
          <ManagerHeader />

          {/* Dynamic Breadcrumb Navigation */}
          <ManagerBreadcrumb />

          {/* Main Content Area */}
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-50/50">
            <div className="rounded-lg bg-white shadow-sm border border-slate-200 p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
