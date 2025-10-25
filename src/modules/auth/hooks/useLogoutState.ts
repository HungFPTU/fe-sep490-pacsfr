/**
 * Logout State Hook
 * 
 * Handles logout state to prevent 403 flash during logout
 */

import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export function useLogoutState() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        // If user becomes unauthenticated, they might be logging out
        if (!isAuthenticated) {
            console.log('[useLogoutState] User became unauthenticated, setting logout state');
            setIsLoggingOut(true);

            // Reset logout state after a longer delay to prevent 403 flash
            const timer = setTimeout(() => {
                console.log('[useLogoutState] Resetting logout state');
                setIsLoggingOut(false);
            }, 500); // Increased to 500ms

            return () => clearTimeout(timer);
        } else {
            setIsLoggingOut(false);
            return undefined;
        }
    }, [isAuthenticated]);

    return { isLoggingOut };
}
