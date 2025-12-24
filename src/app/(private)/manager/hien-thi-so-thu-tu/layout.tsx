'use client';

import { ProtectedRoute } from '@/modules/auth/components/authorization/ProtectedRoute';
import { UserRole } from '@/modules/auth/enums';

export default function CounterDisplayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={[UserRole.MANAGER]} redirectTo="/login">
            {/* No sidebar, no header - fullscreen display */}
            <div className="min-h-screen w-full">
                {children}
            </div>
        </ProtectedRoute>
    );
}
