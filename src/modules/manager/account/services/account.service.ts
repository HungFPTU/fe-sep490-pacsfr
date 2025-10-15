import { accountsAPI } from "../api/account.api";
import { Acccount } from "../types";

export function createMockDataServices(count: number): Acccount[] {
  const services: Acccount[] = [];

  for (let i = 1; i <= count; i++) {
    services.push({
      id: String(i),
      name: `Người dùng ${i}`,
      code: `ND${i.toString().padStart(2, "0")}`,
      status: i % 2 === 0 ? "INACTIVE" : "ACTIVE",
      roles: i % 3 === 0 ? "Admin" : "User",
      description: `Mô tả người dùng ${i}`,
      createdTime: new Date(2025, 0, i).toISOString(),
      updatedTime: new Date(2025, 0, i).toISOString(),
    });
  }

  return services;
}

export const accountData = {
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getDataAccounts(): Promise<Acccount[]> {
        try {
            const res = await accountsAPI.getAllAccounts();
            return res.data;
        } catch {
            return createMockDataServices(20);
        }
    },
};


export function createMockData(count: number): Acccount[] {
  const roles: Acccount[] = [];

  for (let i = 1; i <= count; i++) {
    roles.push({
      id: String(i),
      name: `Quyền hạn ${i}`,
      code: `Role${i.toString().padStart(2, "0")}`,
      status: i % 2 === 0 ? "INACTIVE" : "ACTIVE",
      roles: i % 3 === 0 ? "Admin" : "User",
      description: `Mô tả quyền hạn ${i}`,
      createdTime: new Date(2025, 0, i).toISOString(),
      updatedTime: new Date(2025, 0, i).toISOString(),
    });
  }

  return roles;
}

export const rolesData = {
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getDataPermissions(): Promise<Acccount[]> {
        try {
            const res = await accountsAPI.getAllPermissions();
            return res.data;
        } catch {
            return createMockData(20);
        }
    },
};
