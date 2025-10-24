import { useEffect, useState } from 'react';

interface LoadingState {
    [key: string]: boolean;
}

export function useHttpLoading() {
    const [loadingStates, setLoadingStates] = useState<LoadingState>({});

    useEffect(() => {
        const handleLoadingChange = (event: CustomEvent<{ key: string; loading: boolean }>) => {
            const { key, loading } = event.detail;
            setLoadingStates(prev => {
                const next = { ...prev };
                if (loading) {
                    next[key] = true;
                } else {
                    delete next[key];
                }
                return next;
            });
        };

        window.addEventListener('http-loading-change', handleLoadingChange as EventListener);

        return () => {
            window.removeEventListener('http-loading-change', handleLoadingChange as EventListener);
        };
    }, []);

    const isLoading = Object.keys(loadingStates).length > 0;

    return { isLoading, loadingStates };
}

