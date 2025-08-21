// Queue module exports
export { queueApi } from "./api/queue.api";
export { queueService } from "./services/queue.service";
export { useQueueStore } from "./stores/useQueueStore";

// Components
export { CitizenQueueBoard } from "./components/CitizenQueueBoard";
export { StaffQueuePanel } from "./components/StaffQueuePanel";

// Hooks - simple and clean
export { useQueue, useStaffQueue, useCitizenQueue } from "./hooks";

// Types
export type * from "./types";
