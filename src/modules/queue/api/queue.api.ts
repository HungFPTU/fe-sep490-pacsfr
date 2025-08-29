import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import type { Counter, QueueOverview, StaffQueueState } from "@modules/queue/types";

export const queueApi = {
    async getOverview() {
        return http.get<QueueOverview>(API_PATH.QUEUE.OVERVIEW);
    },
    async getCounters() {
        return http.get<Counter[]>(API_PATH.QUEUE.COUNTERS);
    },
    async getStaffCurrent(counterId: string) {
        const url = `${API_PATH.QUEUE.STAFF.CURRENT}?counterId=${encodeURIComponent(counterId)}`;
        return http.get<StaffQueueState>(url);
    },
    async next(counterId: string) {
        return http.post<StaffQueueState, { counterId: string }>(API_PATH.QUEUE.STAFF.NEXT, { counterId });
    },
    async complete(counterId: string) {
        return http.post<StaffQueueState, { counterId: string }>(API_PATH.QUEUE.STAFF.COMPLETE, { counterId });
    },
    async skip(counterId: string) {
        return http.post<StaffQueueState, { counterId: string }>(API_PATH.QUEUE.STAFF.SKIP, { counterId });
    },
};


