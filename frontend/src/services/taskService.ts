import axios from "axios"
import moment from "moment"
import { Task, Comment } from "./types"

const getAllTasks = async ({
  userId
}: {
  userId: string
}): Promise<[Task[], Error | null]> => {
  try {
    const tasks = await axios.get(`/api/tasks?userId=${userId}`)
    return [tasks.data.data, null]
  } catch (e) {
    return [[], e as Error]
  }
}

const createTask = async ({
  task
}: {
  task: Task
}): Promise<[Task | null, Error | null]> => {
  try {
    const res = await axios.post(`/api/tasks`, {
      title: task.title,
      description: task.description,
      status: task.status,
      due_date : task.dueDate ? moment(task.dueDate).unix() : "",
      assignee_user_id: task.assignee ? String(task.assignee.id) : "",
      created_by_user_id: String(task.createdBy.id)
    })

    const data = res.data.data
    const createdTask: Task = {
      id: data.id,
      dueDate: data.dueDate,
      title: data.title,
      description: data.description,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      assignee: res.data.assignee,
      createdBy: res.data.createdBy,
      comments: []
    }

    return [createdTask, null]
  } catch (e) {
    return [null, e as Error]
  }
}

const getTask = async ({
  taskId
}: {
  taskId: string
}): Promise<[Task | null, Error | null]> => {
  try {
    const task = await axios.get(`/api/tasks/${taskId}`)
    return [task.data.data, null]
  } catch (e) {
    return [null, e as Error]
  }
}

const updateTask = async ({
  task
}: {
  task: Task
}): Promise<[Task | null, Error | null]> => {
  try {
    const res = await axios.put(`/api/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: task.status,
      due_date : task.dueDate ? moment(task.dueDate).unix() : "",
      assignee_user_id: task.assignee ? String(task.assignee.id) : "",
      created_by_user_id: String(task.createdBy.id)
    })

    console.log(task.dueDate ? moment(task.dueDate).unix() : "")

    return [res.data.data, null]
  } catch (e) {
    return [null, e as Error]
  }
}

const postComment = async ({
  taskId,
  comment
}: {
  taskId: string
  comment: Comment
}): Promise<[Comment | null, Error | null]> => {
  try {
    const createdComment = await axios.post(`/api/tasks/${taskId}/comments`, {
      content: comment.content,
      created_by_user_id: comment.createdBy.id,
    })

    console.log(createdComment)

    return [createdComment.data.data, null]
  } catch (e) {
    return [null, e as Error]
  }
}

const deleteTask = async ({
  taskId
}: {
  taskId: string
}): Promise<[Task | null, Error | null]> => {
  try {
    const deletedTask = await axios.delete(`/api/tasks/${taskId}`)
    return [deletedTask.data.data, null]
  } catch (e) {
    return [null, e as Error]
  }
}

export const taskService = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  postComment,
  deleteTask
}