import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api",
});

httpClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { httpClient };
