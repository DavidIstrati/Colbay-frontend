import axios from "axios"

const domain = "http://127.0.0.1:8000"

const getUser = (userId?: string, email?:string, password?:string) => {
    return axios.get(`${domain}/user`, { params: { userId, email, password }})
}

interface User {
    email: string
    password: string
    firstName: string
    lastName: string
    graduationYear?: string
}

const postUser = (body: User) => {
    return axios.post(`${domain}/user`, body)
}

export {
    getUser,
    postUser
}