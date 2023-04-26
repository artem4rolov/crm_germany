import axios from "axios";

// настройка для запроса от бэка scrf токена ПЕРЕД каждым запросе на клиенте
const apiClient = axios.create({
  baseURL: "https://sandbox.w-hoffmann.com",
  withCredentials: true,
});

export default apiClient;
