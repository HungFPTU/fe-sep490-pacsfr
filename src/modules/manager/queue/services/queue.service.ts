import { queuesAPI } from "../api/system.queue.api";
import { Queue } from "../types";

export function createMockData(count: number): Queue[] {
  const queues: Queue[] = [];

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
      description: `Mô tả dịch vụ ${i}`,
      updateTime: new Date(2025, 0, i, 12, 0, 0).toISOString(),
    });
  }

  return queues;
}

export const queueData = {
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getData(): Promise<Queue[]> {
        try {
            const res = await queuesAPI.getAllQueuesStatus();
            return res.data;
        } catch {
            return createMockData(20);
        }
    },
};