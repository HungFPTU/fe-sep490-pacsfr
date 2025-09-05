"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Acccount = {
  id: string
  name: string
  code: string
  status: "ACTIVE" | "INACTIVE" | "DISABLED"
  roles: "Admin" | "User"
  description: string
  createTime: string
}

export const columns: ColumnDef<Acccount>[] = [
  {
    accessorKey: "name",
    header: "Tên người dùng",
  },
  {
    accessorKey: "code",
    header: "Mã người dùng",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "roles",
    header: "Vai trò",
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