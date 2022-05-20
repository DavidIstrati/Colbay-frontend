import axios from "axios"

const domain = "http://127.0.0.1:8000"

const getListing = async (listingId:string) => {
    return await axios.get(`${domain}/listing`, { params: {listingId }})
}

const getListings = async (userId: string) => {
    return await axios.get(`${domain}/listings`, { params: { userId }})
}

interface Listing {
    userId: string
    title: string
    description?: string
    image: string
    keywords?: [string]
    category: string
}

const postListing = async (body: Listing) => {
    return await axios.post(`${domain}/listing`, body)
}

const searchListings = async (term?: string, category?: string) => {
    return await axios.get(`${domain}/searchListings`, { params: { term, category }})
}

export {
    getListing,
    getListings,
    postListing,
    searchListings
}