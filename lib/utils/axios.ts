import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.90:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
  }
);