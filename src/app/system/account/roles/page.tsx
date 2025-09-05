'use client'

import { DataTable } from "@/components/table/BaseTable"
import { Acccount, columns } from "./columns"
import { accountsAPI } from "../api/system.account.api";
import { usePolling } from "@/hooks/usePolling";

export function createMockData(count: number): any[] {
  const services: any[] = [];

  for (let i = 1; i <= count; i++) {
    services.push({
      id: String(i),
      name: `Quyền hạn ${i}`,
      code: `Role${i.toString().padStart(2, "0")}`,
      status: i % 2 === 0 ? "INACTIVE" : "ACTIVE",
      description: `Mô tả quyền hạn ${i}`,
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
    async getDataPermissions(): Promise<Acccount[]> {
        try {
            const res = await accountsAPI.getAllPermissions();
            return res.data;
        } catch {
            return createMockData(20);
        }
    },
};


export default function Page() {
  const { data: accounts } = usePolling(accountData.getDataPermissions, 2000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={accounts ?? []} />
    </div>
  )
}