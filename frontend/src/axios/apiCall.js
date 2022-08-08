import { DELETE, GET, POST, PUT } from "./utils";

export const getAll= async () => {
    try {
        const res = await GET(`/`)
        return res
    } catch (error) {
        return error?.response
    }
}

export const updateTodo = async (id, object) => {
    try {
        const res = await PUT(`/update-todo/${id}/`, object)
        return res
    } catch (error) {
        return error?.response
    }
}

export const createTodo = async (object) => {
    try {
        const res = await POST(`/create-todo/`, object)
        return res
    } catch (error) {
        return error?.response
    }
}

export const removeTodo = async (id) => {
    try {
        const res = await DELETE(`/delete-todo/${id}`)
        return res
    } catch (error) {
        return error?.response
    }
}