'use client'

import { DataTable } from "@/components/table/BaseTable"
import { columns } from "./columns"
import { usePolling } from "@/hooks/usePolling";
import { queuesAPI } from "../api/system.queue.api";

export function createMockData(count: number): any[] {
  const queues: any[] = [];

  for (let i = 1; i <= count; i++) {
    queues.push({
      id: String(i),
      serviceName: `Dịch vụ ${i}`,
      counterName: `Quầy ${i}`,
      totalTicket: Math.floor(Math.random() * 100),
      pendingTicket: Math.floor(Math.random() * 50),
      currentTicket: Math.floor(Math.random() * 100).toString().padStart(2, "0"),
      completeTicket: Math.floor(Math.random() * 30),
      createTime: new Date(2025, 0, i).toISOString(),
      employeeName: `Nhân viên ${i}`,
    });
  }

  return queues;
}

export const data = {
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getData(): Promise<any[]> {
        try {
            const res = await queuesAPI.getAllQueuesStatus();
            return res.data;
        } catch {
            return createMockData(20);
        }
    },
};


export default function Page() {
  const { data: queues } = usePolling(data.getData, 5000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={queues ?? []} />
    </div>
  )
}