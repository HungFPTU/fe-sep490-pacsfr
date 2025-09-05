'use client'

import { DataTable } from "@/components/table/BaseTable"
import { Acccount, columns } from "./columns"
import { accountsAPI } from "../api/system.account.api";
import { usePolling } from "@/hooks/usePolling";

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
      createTime: new Date(2025, 0, i).toISOString(),
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


export default function Page() {
  const { data: accounts } = usePolling(accountData.getDataAccounts, 2000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={accounts ?? []} />
    </div>
  )
}