export type Group = {
  id: string
  name: string
  description: string
  memberCount: number
  department: string
  status: "active" | "inactive"
  createdAt: string
  members: string[]
}