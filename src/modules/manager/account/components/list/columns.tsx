"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Acccount } from "../../types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
    accessorKey: "createdAt",
    header: "Thời gian tạo",
  }
]