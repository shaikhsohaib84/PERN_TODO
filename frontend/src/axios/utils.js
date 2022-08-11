import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

// axios.interceptors.response.use((res) => {
//     if(res.status === 302){ return window.location.href = '/logout' }
//     return res
// }, (err) => {
//     return Promise.reject(err)
// })

const object = {
    withCredentials: true
}

export const GET = async (url) => {
    return await axios.get(`${url}`, object)
}

export const POST = async (url, data) => {
    return await axios.post(`${url}`, data)
}

export const PUT = async (url, data) => {
    return await axios.put(`${url}`, data, object)
}

export const DELETE = async (url) => {
    return await axios.delete(`${url}`, object)
}