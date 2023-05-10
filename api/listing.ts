import axios from "axios";
import wrapper from "./wrapper";

const domain = "http://127.0.0.1:8000";

const getListing = async (listingId: string) => {
  return await axios.get(`${domain}/listing`, { params: { listingId } });
};

const getListings = wrapper(async (page: number, token: string) => {
  return await axios.get(`${domain}/listings`, {
    params: { page: page },
    headers: { Authorization: "Bearer " + token },
  });
});

export interface CreateListing {
  title: string;
  description?: string;
  keywords?: string;
  category: string;
  price: string;
}

export interface Listing extends CreateListing {
  listingId: string;
}

interface ListingResp {
  data: Listing;
  userId: string;
}

interface UpdateListing {
  listingId: string;
  title?: string | null;
  description?: string | null;
  price?: string | null;
  image?: string | null;
  keywords?: string[] | null;
  category?: string | null;
}

const postListing = wrapper(async (
  body: CreateListing,
  token: string
): Promise<ListingResp> => {
  return await axios.post(`${domain}/listing`, body, {
    headers: { Authorization: "Bearer " + token },
  });
});

const patchListing = wrapper(async (
  body: UpdateListing,
  token: string
): Promise<ListingResp> => {
  return await axios.patch(`${domain}/listing`, body, {
    headers: { Authorization: "Bearer " + token },
  });
});

const patchMainImageListing = wrapper(async (
  formData: FormData,
  token: string
): Promise<ListingResp> => {
  return await axios.patch(`${domain}/listingMainImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
});

const patchSecondaryImageListing = wrapper(async (
  formData: FormData,
  token: string
): Promise<ListingResp> => {
  return await axios.patch(`${domain}/listingSecondaryImage`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
});

const searchListings = async (term?: string, category?: string) => {
  return await axios.get(`${domain}/searchListings`, {
    params: { term, category },
  });
};

export {
  getListing,
  getListings,
  postListing,
  searchListings,
  patchListing,
  patchMainImageListing,
  patchSecondaryImageListing,
};
