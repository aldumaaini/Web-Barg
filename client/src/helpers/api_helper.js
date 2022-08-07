import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
//pass new generated access token here

//apply base url for axios
const API_URL = "/api";

const axiosApi = axios.create({
  baseURL: API_URL,
  headers: { "x-auth-token": accessToken },
});

//axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}