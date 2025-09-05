'use client'

import { DataTable } from "@/components/table/BaseTable"
import { columns, Services } from "./columns"
import { servicesAPI } from "../api/system.services.api";
import { usePolling } from "@/hooks/usePolling";

export function createMockDataServices(count: number): Services[] {
  const services: Services[] = [];

  for (let i = 1; i <= count; i++) {
    services.push({
      id: String(i),
      name: `Dịch vụ ${i}`,
      code: `DV${i.toString().padStart(2, "0")}`,
      status: i % 2 === 0 ? "INACTIVE" : "ACTIVE", 
      description: `Mô tả dịch vụ ${i}`,
      createTime: new Date(2025, 0, i).toISOString(),
    });
  }

  return services;
}

export const serviceData = {
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getDataServices(): Promise<Services[]> {
        try {
            const res = await servicesAPI.getAllServices();
            return res.data;
        } catch {
            return createMockDataServices(20);
        }
    },
};


export default function Page() {
  const { data: services } = usePolling(serviceData.getDataServices, 5000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={services ?? []} />
    </div>
  )
}