import React from "react";

/**
 * Singleton Hook Design Pattern
 * Ensures that only one instance of a hook's state exists across the entire application
 * Useful for global state management without external libraries
 */

interface SingletonHookOptions<T> {
    initialState: T;
    persist?: boolean;
    storageKey?: string;
}

interface SingletonHookInstance<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
    subscribers: Set<React.Dispatch<React.SetStateAction<T>>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const singletonInstances = new Map<string, SingletonHookInstance<any>>();

/**
 * Create a singleton hook
 * @param key - Unique key for the singleton instance
 * @param options - Configuration options
 */
export function createSingletonHook<T>(
    key: string,
    options: SingletonHookOptions<T>
) {
    return function useSingletonHook(): [T, React.Dispatch<React.SetStateAction<T>>] {
        // Get or create singleton instance
        if (!singletonInstances.has(key)) {
            let initialState = options.initialState;

            // Load from localStorage if persist is enabled
            if (options.persist && options.storageKey && typeof window !== "undefined") {
                try {
                    const stored = localStorage.getItem(options.storageKey);
                    if (stored) {
                        initialState = JSON.parse(stored);
                    }
                } catch (error) {
                    console.warn(`Failed to load persisted state for ${key}:`, error);
                }
            }

            singletonInstances.set(key, {
                state: initialState,
                setState: () => { }, // Will be set below
                subscribers: new Set(),
            });
        }

        const instance = singletonInstances.get(key)!;
        const [state, setState] = React.useState(instance.state);

        // Subscribe to state changes
        React.useEffect(() => {
            instance.subscribers.add(setState);

            return () => {
                instance.subscribers.delete(setState);
            };
        }, [instance]);

        // Create a wrapped setState that notifies all subscribers
        const wrappedSetState = React.useCallback(
            (newState: React.SetStateAction<T>) => {
                const nextState = typeof newState === "function"
                    ? (newState as (prevState: T) => T)(instance.state as T)
                    : newState;

                instance.state = nextState;

                // Persist to localStorage if enabled
                if (options.persist && options.storageKey && typeof window !== "undefined") {
                    try {
                        localStorage.setItem(options.storageKey, JSON.stringify(nextState));
                    } catch (error) {
                        console.warn(`Failed to persist state for ${key}:`, error);
                    }
                }

                // Notify all subscribers
                instance.subscribers.forEach(subscriber => {
                    subscriber(nextState);
                });
            },
            [instance]
        );

        // Update the singleton's setState reference
        instance.setState = wrappedSetState;

        return [state, wrappedSetState];
    };
}

/**
 * Create a singleton hook with methods (similar to Zustand)
 * @param key - Unique key for the singleton instance
 * @param createStore - Function that creates the store with methods
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSingletonStore<T extends Record<string, any>>(
    key: string,
    createStore: (
        set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
        get: () => T
    ) => T
) {
    return function useSingletonStore(): T {
        // Get or create singleton instance
        if (!singletonInstances.has(key)) {
            const set = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
                const instance = singletonInstances.get(key)!;
                const nextPartial = typeof partial === "function"
                    ? partial(instance.state)
                    : partial;

                const nextState = { ...instance.state, ...nextPartial };
                instance.state = nextState;

                // Notify all subscribers
                instance.subscribers.forEach(subscriber => {
                    subscriber(nextState);
                });
            };

            const get = () => {
                const instance = singletonInstances.get(key);
                return instance ? instance.state : {} as T;
            };

            const initialState = createStore(set, get);

            singletonInstances.set(key, {
                state: initialState,
                setState: () => { }, // Not used in this pattern
                subscribers: new Set(),
            });
        }

        const instance = singletonInstances.get(key)!;
        const [state, setState] = React.useState(instance.state);

        // Subscribe to state changes
        React.useEffect(() => {
            instance.subscribers.add(setState);

            return () => {
                instance.subscribers.delete(setState);
            };
        }, [instance]);

        return state;
    };
}

/**
 * Example singleton hooks for common use cases
 */

// Global loading state
export const useGlobalLoading = createSingletonHook("globalLoading", {
    initialState: { isLoading: false, message: "" },
    persist: false,
});

// Global toast notifications
type ToastType = {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
};

export const useGlobalToast = createSingletonStore("globalToast", (set) => ({
    toasts: [] as ToastType[],

    addToast: (toast: Omit<ToastType, "id">) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { ...toast, id }],
        }));

        // Auto remove after duration
        if (toast.duration !== 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t: ToastType) => t.id !== id),
                }));
            }, toast.duration || 5000);
        }
    },

    // Helper methods for common toast types
    success: (message: string, duration?: number) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type: "success" as const, duration }],
        }));

        if (duration !== 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t: ToastType) => t.id !== id),
                }));
            }, duration || 5000);
        }
    },

    error: (message: string, duration?: number) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type: "error" as const, duration }],
        }));

        if (duration !== 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t: ToastType) => t.id !== id),
                }));
            }, duration || 5000);
        }
    },

    warning: (message: string, duration?: number) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type: "warning" as const, duration }],
        }));

        if (duration !== 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t: ToastType) => t.id !== id),
                }));
            }, duration || 5000);
        }
    },

    info: (message: string, duration?: number) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type: "info" as const, duration }],
        }));

        if (duration !== 0) {
            setTimeout(() => {
                set((state) => ({
                    toasts: state.toasts.filter((t: ToastType) => t.id !== id),
                }));
            }, duration || 5000);
        }
    },

    removeToast: (id: string) => {
        set((state) => ({
            toasts: state.toasts.filter((t: ToastType) => t.id !== id),
        }));
    },

    clearToasts: () => {
        set({ toasts: [] });
    },
}));

// Global theme state
export const useGlobalTheme = createSingletonHook("globalTheme", {
    initialState: { theme: "light" as "light" | "dark" | "system" },
    persist: true,
    storageKey: "app-theme",
});

/**
 * Utility to reset a singleton instance
 * Useful for testing or when you need to completely reset state
 */
export function resetSingletonInstance(key: string) {
    singletonInstances.delete(key);
}
