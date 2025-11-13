'use client';

import { AppSidebar, StaffHeader, StaffBreadcrumb } from "@/shared/components/staff"
import {
    SidebarInset,
    SidebarProvider
} from "@/shared/components/manager/ui/sidebar"
import { ProtectedRoute } from "@/modules/auth/components/authorization/ProtectedRoute"
import { UserRole } from "@/modules/auth/enums"

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={[UserRole.STAFF]} redirectTo="/login">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {/* Professional Header with Search, Notifications, User Menu */}
                    <StaffHeader />

                    {/* Dynamic Breadcrumb Navigation */}
                    <StaffBreadcrumb />

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
