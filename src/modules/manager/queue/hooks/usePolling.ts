'use client';

import React from "react";

export function usePolling<T>(fetcher: () => Promise<T>, intervalMs: number) {
    const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        let mounted = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timer: any;
        const run = async () => {
            try {
                const res = await fetcher();
                if (mounted) setData(res);
                setError(null);
            } catch (e) {
                if (mounted) setError((e as Error).message);
            } finally {
                if (mounted) timer = setTimeout(run, intervalMs);
            }
        };
        run();
        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
        };
    }, [fetcher, intervalMs]);
    return { data, error } as const;
}