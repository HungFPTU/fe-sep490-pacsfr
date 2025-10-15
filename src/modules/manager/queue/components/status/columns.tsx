"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Queue } from "../../types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Queue>[] = [
  {
    accessorKey: "serviceName",
    header: "Tên dịch vụ",
  },
  {
    accessorKey: "counterName",
    header: "Tên quầy",
  },
  {
    accessorKey: "totalTicket",
    header: "Tổng số vé",
  },
  {
    accessorKey: "pendingTicket",
    header: "Số vé đang chờ",
  },
  {
    accessorKey: "currentTicket",
    header: "Số vé hiện tại",
  },
   {
    accessorKey: "completeTicket",
    header: "Số vé hoàn thành",
  },
   {
    accessorKey: "employeeName",
    header: "Tên nhân viên",
  },
  {
    accessorKey: "createTime",
    header: "Thời gian tạo",
  }
]