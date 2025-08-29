// Main src exports - organized by category

// Core functionality
export * from "./core";

// Shared utilities and components
export * from "./shared";

// Legacy module exports (backward compatibility)
export * from "./modules";

// Re-export commonly used items with shorter paths
export { http } from "./core/http/client";
export { cn, formatCurrency, formatDate } from "./shared/lib/utils";
export { API_PATH } from "./core/config/api.path";

// Legacy exports for backward compatibility
export { useAuthStore } from "./modules/auth";
export { useQueueStore } from "./modules/queue";
export {
    useQueue,
    useStaffQueue,
    useCitizenQueue
} from "./modules/queue";
export { useAuth } from "./modules/auth";
