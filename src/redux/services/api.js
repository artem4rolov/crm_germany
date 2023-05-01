import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const result = window.location.origin;

// настройка для запроса от бэка scrf токена ПЕРЕД каждым запросе на клиенте
const apiClient = axios.create({
  // withCredentials: true,
  headers: { Origin: result },
});

console.log(apiClient.request.headers);

export default apiClient;
