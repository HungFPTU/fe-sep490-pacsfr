'use client'

import { usePolling } from "../../hooks/usePolling";
import { rolesData } from "../../services/account.service";

export default function Page() {
  const { data: roles } = usePolling(rolesData.getDataPermissions, 2000);

  return (
    <div className="container mx-auto py-10">
      {/*<DataTable columns={columns} data={roles ?? []} />*/}
    </div>
  )
}