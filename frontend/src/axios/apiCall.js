import { DELETE, GET, POST, PUT } from "./utils";

export const userLogin = async (object) => {
    try {
        const res = await POST('/auth/login', object)
        return res
    } catch (error) {
        return error?.response
    }
}

export const userSignUp = async (object={}) => {
    try {
        const res = await POST(`/auth/signup`, object)
        return res
    } catch (error) {
        return error?.response
    }
}

export const getAll= async (id) => {
    try {
        const res = await GET(`/todo/${id}`)
        return res
    } catch (error) {
        return error?.response
    }
}

export const updateTodo = async (id, object) => {
    try {
        const res = await PUT(`/${id}/`, object)
        return res
    } catch (error) {
        return error?.response
    }
}

export const createTodo = async (object) => {
    try {
        const res = await POST(`/todo/create-todo/`, object)
        return res
    } catch (error) {
        return error?.response
    }
}

export const removeTodo = async (id) => {
    try {
        const res = await DELETE(`/todo/delete-todo/${id}`)
        return res
    } catch (error) {
        return error?.response
    }
}

export const  userLogout = async (userId) => {
    try {
        const res = await GET(`/auth/logout/${userId}`)
        return res
    } catch (error) {
        return error?.response
    }
}