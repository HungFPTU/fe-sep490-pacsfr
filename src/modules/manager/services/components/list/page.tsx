'use client'

import { DataTable } from "@/shared/components/manager/table/BaseTable";
import { usePolling } from "../../hooks/usePolling";
import { serviceData } from "../../services/services.service";
import { columns } from "./columns";



export default function Page() {
  const { data: services } = usePolling(serviceData.getDataServices, 5000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={services ?? []} />
    </div>
  )
}