'use client'

import { DataTable } from "@/shared/components/manager/table/BaseTable";
import { columns } from "./columns";
import { usePolling } from "../../hooks/usePolling";
import { queueData } from "../../services/queue.service";


export default function Page() {
  const { data: queues } = usePolling(queueData.getData, 5000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={queues ?? []} />
    </div>
  )
}