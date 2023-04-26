import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sandbox.w-hoffmann.com",
  withCredentials: true,
});

export default apiClient;
