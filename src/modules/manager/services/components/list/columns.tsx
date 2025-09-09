"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Services } from "../../types"

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