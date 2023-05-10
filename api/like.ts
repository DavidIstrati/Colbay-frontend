import axios from "axios";
import wrapper from "./wrapper";

const domain = "http://127.0.0.1:8000";

const getLike = wrapper(async (token: string, listingId: string) => {
  return await axios.get(`${domain}/like`, {
    params: { listingId },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

const getLikes = wrapper(async (token: string) => {
  return await axios.get(`${domain}/likes`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

interface Like {
  listingId: string;
}

const postLike = wrapper((body: Like, token: string) => {
  return axios.post(`${domain}/like`, body, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
});

export { getLike, getLikes, postLike };
