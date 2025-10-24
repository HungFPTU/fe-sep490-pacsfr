"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Account } from "../../types"

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "fullName",
    header: "Tên nhân sự",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
  },
  {
    accessorKey: "staffCode",
    header: "Mã nhân sự",
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
  },
  {
    accessorKey: "roleType",
    header: "Vai trò",
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian tạo",
  }
]