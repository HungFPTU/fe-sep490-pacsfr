'use client';

import { RouteGuard } from '@/modules/auth/components/authorization/RouteGuard';

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RouteGuard>
            {children}
        </RouteGuard>
    );
}
