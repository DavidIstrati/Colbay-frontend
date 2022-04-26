import axios from "axios"

const domain = "http://127.0.0.1:8000"

const getLike = (userId: string, listingId:string) => {
    return axios.get(`${domain}/like`, { params: { userId, listingId }})
}

const getLikes = (userId: string) => {
    return axios.get(`${domain}/likes`, { params: { userId }})
}

interface Like {
    userId: string
    postId: string
}

const postLike = (body: Like) => {
    return axios.post(`${domain}/like`, body)
}

export {
    getLike,
    getLikes,
    postLike
}