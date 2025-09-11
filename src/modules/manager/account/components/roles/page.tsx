'use client'

import { DataTable } from "@/shared/components/manager/table/BaseTable";
import { usePolling } from "../../hooks/usePolling";
import { rolesData } from "../../services/account.service";
import { columns } from "./columns";

export default function Page() {
  const { data: roles } = usePolling(rolesData.getDataPermissions, 2000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={roles ?? []} />
    </div>
  )
}