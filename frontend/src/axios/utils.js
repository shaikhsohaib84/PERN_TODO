import axios from 'axios'
const baseURL = 'http://localhost:5000'

export const GET = (url) => {
    return axios.get(`${baseURL}${url}`)
}

export const POST = (url, data) => {
    return axios.post(`${baseURL}${url}`, data)
}

export const PUT = (url, data) => {
    return axios.put(`${baseURL}${url}`, data)
}

export const DELETE = (url) => {
    return axios.delete(`${baseURL}${url}`)
}