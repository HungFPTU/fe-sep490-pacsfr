export type Services = {
  id: string
  name: string
  code: string
  status: "ACTIVE" | "INACTIVE" | "DISABLED"
  description: string
  createTime: string
}