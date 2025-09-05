import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";
import type { PaginatedResponse, UpsertUserPayload, UserSummary, UsersQuery } from "@modules/users/types";

function buildQuery(params: UsersQuery): string {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "all") return;
        query.set(key, String(value));
    });
    const s = query.toString();
    return s ? `?${s}` : "";
}

export const usersApi = {
    async list(query: UsersQuery = {}): Promise<PaginatedResponse<UserSummary>> {
        const q = buildQuery(query);
        const res = await http.get<PaginatedResponse<UserSummary>>(`${API_PATH.USERS.LIST}${q}`);
        return res.data;
    },

    async create(payload: UpsertUserPayload): Promise<UserSummary> {
        const res = await http.post<UserSummary, UpsertUserPayload>(API_PATH.USERS.CREATE, payload);
        return res.data;
    },

    async update(id: string, payload: UpsertUserPayload): Promise<UserSummary> {
        const res = await http.put<UserSummary, UpsertUserPayload>(API_PATH.USERS.UPDATE(id), payload);
        return res.data;
    },

    async remove(id: string): Promise<void> {
        await http.delete(API_PATH.USERS.DELETE(id));
    },

    async get(id: string): Promise<UserSummary> {
        const res = await http.get<UserSummary>(API_PATH.USERS.DETAIL(id));
        return res.data;
    },
};


