import type { PaginatedResponse, UpsertUserPayload, UserSummary, UsersQuery } from "@modules/users/types";
import { usersApi } from "@modules/users/api/users.api";

export const usersService = {
    async searchUsers(query: UsersQuery): Promise<PaginatedResponse<UserSummary>> {
        return usersApi.list(query);
    },

    async createUser(payload: UpsertUserPayload): Promise<UserSummary> {
        return usersApi.create(payload);
    },

    async updateUser(id: string, payload: UpsertUserPayload): Promise<UserSummary> {
        return usersApi.update(id, payload);
    },

    async deleteUser(id: string): Promise<void> {
        return usersApi.remove(id);
    },
};


