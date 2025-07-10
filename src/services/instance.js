import axios from "axios";

const baseURL = "https://server-todo-o2lj.onrender.com/api/v1"; // Ensure this matches your backend

const instance = axios.create({
  baseURL,
  timeout: 5000, // Increased timeout from 1000ms
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor
instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNREFUSED") {
      console.error("Connection refused - is the backend running?");
    }
    return Promise.reject(error);
  }
);

export default instance;