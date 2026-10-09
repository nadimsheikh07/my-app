import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5172/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;

      // Don't touch auth state or redirect on the auth pages themselves —
      // a 401 there means "bad credentials", not "session expired".
      const isAuthPage =
        path.startsWith("/admin/signin") || path.startsWith("/admin/signup");

      if (isAuthPage) {
        return Promise.reject(error);
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("authUser");

      if (path.startsWith("/admin")) {
        window.location.href = "/admin/signin";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
