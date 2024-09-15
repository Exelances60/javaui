import axios from "axios";
import Cookies from "universal-cookie";

const axiosGraph = axios.create({
  baseURL: "https://fitnes-api-e6yv.onrender.com",
});

axiosGraph.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosGraph.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const cookies = new Cookies();
      cookies.remove("token");
      window.location.href = "/login";
    }
    if (error.response?.data) {
      return Promise.reject(error);
    }
    if (!error.response) {
      return Promise.reject({
        ...error,
        response: {
          data: {
            message: "Sunucu ile bağlantı kurulamadı",
          },
        },
      });
    }
  }
);

export default axiosGraph;
