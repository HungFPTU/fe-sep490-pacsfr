"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Services = {
  id: string
  name: string
  code: string
  status: "ACTIVE" | "INACTIVE" | "DISABLED"
  description: string
  createTime: string
}

export const columns: ColumnDef<Services>[] = [
  {
    accessorKey: "name",
    header: "Tên dịch vụ",
  },
  {
    accessorKey: "code",
    header: "Tên dịch vụ",
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