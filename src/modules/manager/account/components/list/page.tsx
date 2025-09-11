'use client'

import { columns } from "./columns"
import { usePolling } from "../../hooks/usePolling";
import { DataTable } from "@/shared/components/manager/table/BaseTable";
import { accountData } from "../../services/account.service";

export default function Page() {
  const { data: accounts } = usePolling(accountData.getDataAccounts, 2000);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={accounts ?? []} />
    </div>
  )
}