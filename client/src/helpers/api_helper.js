import axios from "axios";

const API_URL = "/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  const accessToken = JSON.parse(localStorage.getItem("authToken"));
  let headers = { "x-auth-token": accessToken };
  return await axiosApi
    .get(url, { headers, ...config })
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export async function post(url, data, config = {}) {
  const accessToken = JSON.parse(localStorage.getItem("authToken"));
  let headers = { "x-auth-token": accessToken };
  return await axiosApi
    .post(url, { ...data }, { headers, ...config })
    .then((response) => response.data)
    .catch((error) => error.response.data);
}

export async function put(url, data, config = {}) {
  const accessToken = JSON.parse(localStorage.getItem("authToken"));
  let headers = { "x-auth-token": accessToken };
  return axiosApi
    .put(url, { ...data }, { headers, ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  const accessToken = JSON.parse(localStorage.getItem("authToken"));
  let headers = { "x-auth-token": accessToken };
  return await axiosApi
    .delete(url, { headers, ...config })
    .then((response) => response.data);
}
