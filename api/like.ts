import axios from "axios";

const domain = "http://127.0.0.1:8000";

const getLike = async (userId: string, listingId: string) => {
  return await axios.get(`${domain}/like`, { params: { userId, listingId } });
};

const getLikes = async (userId: string) => {
  return await axios.get(`${domain}/likes`, { params: { userId } });
};

interface Like {
  userId: string;
  listingId: string;
}

const postLike = (body: Like) => {
  return axios.post(`${domain}/like`, body);
};

export { getLike, getLikes, postLike };
