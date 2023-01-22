import axios from "axios"
import { User } from "./types"


const createUser = async ({
  name,
  email,
  password
}: {
  name: string
  email: string
  password: string
}) : Promise<[User | null, Error | null]> => {
  try {
    const res = await axios.post(
      "/api/users", {
        name, email, password
      }
    )
  
    const user: User = res.data.data
    console.log(user)
    return [user, null]
  } catch(e) {
    return [null, e as Error]
  }
}

const login = async({
  email,
  password
}: {
  email: string
  password: string
}) : Promise<[User | null, Error | null]> => {
  try {
  const res = await axios.get(`/api/users/login?email=${email}&password=${password}`)
  
    const user: User = res.data.data
    console.log(user)
    return [user, null]
  } catch(e) {
    return [null, e as Error]
  }
}

const getUser = async (id: number) : Promise<[User | null, Error | null]> => {
  try {
    const res = await axios.get(`/api/users/${id}`)

    const user: User = res.data.data
    console.log(user)
    return [user, null]
  } catch(e) {
    return [null, e as Error]
  }
}

const getAllUsers = async () : Promise<[User[] | null, Error | null]> => {
  try {
    const res = await axios.get(`/api/users`)

    const users: User[] = res.data.data
    console.log(users)
    return [users, null]
  } catch(e) {
    return [null, e as Error]
  }
}

export const userService = {
  createUser,
  login,
  getAllUsers,
  getUser
}