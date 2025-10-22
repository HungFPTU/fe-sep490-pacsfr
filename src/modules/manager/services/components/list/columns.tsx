"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Services } from "../../types"

export const columns: ColumnDef<Services>[] = [
  {
    accessorKey: "serviceName",
    header: "Tên dịch vụ",
  },
  {
    accessorKey: "serviceType",
    header: "Loại dịch vụ",
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
  },
  {
    accessorKey: "isOnlineAvailable",
    header: "Hỗ trợ trực tuyến",
  },
  {
    accessorKey: "resultDocument",
    header: "Kết quả tài liệu",
  },
  {
    accessorKey: "feeAmount",
    header: "Phí dịch vụ",
  },{
    accessorKey: "processingTime",
    header: "Thời gian xử lý",
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