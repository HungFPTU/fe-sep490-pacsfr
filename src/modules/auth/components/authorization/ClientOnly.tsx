/**
 * ClientOnly Component
 * 
 * Prevents hydration mismatch by only rendering children on client side
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
