import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// настройка для запроса от бэка scrf токена ПЕРЕД каждым запросе на клиенте
const result = window.location.origin;
const apiClient = axios.create({
  withCredentials: true,
  headers: {
    origin: result,
  },
});

// apiClient.defaults.headers.origin = result;

// apiClient.request.headers.origin = "https://sandbox-postman.w-hoffmann.com";

export default apiClient;

// Отлавливаем ошибки при запросах с помощью axios interceptors
const refreshAuthLogic = async (failedRequest) => {
  // если статус ошибки 419 (устаревший токен)
  if (failedRequest.response.status === 419) {
    // получаем новый токен от сервера
    await axios.get("/sanctum/csrf-cookie");

    // повторяем запрос, который ранее был с ошибкой устаревшего токена, только на этот раз меняем его config (новый токен от сервера)
    return axios(failedRequest.response.config);
  }

  // если статус ошибки 401 (сессия авторищации истекла)
  if (failedRequest.response.status === 401) {
    return failedRequest;
  }

  return Promise.reject();
};

// Instantiate the interceptor
createAuthRefreshInterceptor(apiClient, refreshAuthLogic);
