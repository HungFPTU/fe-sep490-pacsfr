"use client"

import { Account } from "@/modules/manager/account"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Tên quyền hạn",
  },
  {
    accessorKey: "code",
    header: "Mã quyền hạn",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "createTime",
    header: "Thời gian tạo",
  }
]