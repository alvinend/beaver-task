

export type User = {
  id: number
  name: string
  email: string
  password: string
}

export type Task = {
  id: number
  dueDate: string
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  comments: Comment[]

  assignee: User
  createdBy: User
}

export type Comment = {
  id: number
  content: string
  createdAt: string
  updatedAt: string

  createdBy: User
}