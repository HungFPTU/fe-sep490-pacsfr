import type { PaginatedResponse, UpsertUserPayload, UserSummary, UsersQuery, UserRole } from "@modules/users/types";

// Temporary in-memory mock to avoid real API calls during review
const mockUsersDb: UserSummary[] = (() => {
    const roles: UserRole[] = ["admin", "staff", "citizen"];
    const statuses: Array<UserSummary["status"]> = ["active", "inactive", "locked"];
    const list: UserSummary[] = [];
    for (let i = 1; i <= 25; i++) {
        const role = roles[i % roles.length];
        const status = statuses[i % statuses.length];
        const createdAt = new Date(Date.now() - i * 86400000).toISOString();
        list.push({
            id: String(i),
            fullName: `Người dùng ${i}`,
            email: `user${i}@example.com`,
            phone: `090${(100000 + i).toString().slice(0, 6)}`,
            role,
            status,
            createdAt,
            updatedAt: createdAt,
        });
    }
    return list;
})();

function applyFilters(items: UserSummary[], query: UsersQuery): UserSummary[] {
    const q = (query.search || "").toLowerCase();
    return items.filter((u) => {
        const matchSearch = !q ||
            u.fullName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            (u.phone ? u.phone.toLowerCase().includes(q) : false);

        const matchRole = !query.role || query.role === "all" || u.role === query.role;
        const matchStatus = !query.status || query.status === "all" || u.status === query.status;
        return matchSearch && matchRole && matchStatus;
    });
}

function paginate<T>(items: T[], page = 1, pageSize = 10): PaginatedResponse<T> {
    const start = (page - 1) * pageSize;
    const paged = items.slice(start, start + pageSize);
    return {
        items: paged,
        total: items.length,
        page,
        pageSize,
    };
}

export const usersService = {
    async searchUsers(query: UsersQuery): Promise<PaginatedResponse<UserSummary>> {
        const filtered = applyFilters(mockUsersDb, query);
        return paginate(filtered, query.page || 1, query.pageSize || 10);
    },

    async createUser(payload: UpsertUserPayload): Promise<UserSummary> {
        const id = String(mockUsersDb.length + 1);
        const now = new Date().toISOString();
        const user: UserSummary = { id, createdAt: now, updatedAt: now, status: payload.status || "active", ...payload };
        mockUsersDb.unshift(user);
        return user;
    },

    async updateUser(id: string, payload: UpsertUserPayload): Promise<UserSummary> {
        const idx = mockUsersDb.findIndex((u) => u.id === id);
        if (idx === -1) throw new Error("User not found");
        const updated: UserSummary = { ...mockUsersDb[idx], ...payload, updatedAt: new Date().toISOString() };
        mockUsersDb[idx] = updated;
        return updated;
    },

    async deleteUser(id: string): Promise<void> {
        const idx = mockUsersDb.findIndex((u) => u.id === id);
        if (idx !== -1) mockUsersDb.splice(idx, 1);
    },
};


