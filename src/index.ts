// Main src exports - organized by category

// Core functionality
export * from "./core";

// Shared utilities and components
export * from "./shared";

// Feature modules
export * from "./modules";

// Re-export commonly used items with shorter paths
export { http } from "./core/http/client";
export { useAuthStore } from "./modules/auth";
export { useQueueStore } from "./modules/queue";
export { cn, formatCurrency, formatDate } from "./shared/lib/utils";
export { API_PATH } from "./shared/const/api.path";

// Convenient hook aliases
export {
    useQueue,
    useStaffQueue,
    useCitizenQueue
} from "./modules/queue";

// Auth hook aliases
export { useAuth } from "./modules/auth";
