import axios from "axios"

const domain = "http://127.0.0.1:8000"

const getListing = (userId: string, listingId:string) => {
    return axios.get(`${domain}/listing`, { params: { userId, listingId }})
}

const getListings = (userId: string) => {
    return axios.get(`${domain}/listings`, { params: { userId }})
}

interface Listing {
    userId: string
    title: string
    description?: string
    image: string
    keywords?: [string]
    category: string
}

const postListing = (body: Listing) => {
    return axios.post(`${domain}/listing`, body)
}

const searchListings = (term?: string, category?: string) => {
    return axios.get(`${domain}/searchListings`, { params: { term, category }})
}

export {
    getListing,
    getListings,
    postListing,
    searchListings
}