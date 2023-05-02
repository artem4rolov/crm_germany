import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// получаем источник, с которого будем делать запросы
const result = window.location.origin;

// настройка для запроса от бэка scrf токена ПЕРЕД каждым запросе на клиенте
const apiClient = axios.create({
  withCredentials: true,
});

// Отлавливаем ошибки при запросах с помощью axios interceptors
const refreshAuthLogic = async (failedRequest) => {
  // если статус ошибки 419 (устаревший XSRF токен)
  if (failedRequest.response.status === 419) {
    console.log(
      "Это статус 419, необходимо запросить от сервера новый XSRF токен"
    );
    // получаем новый токен от сервера
    await axios.get("/sanctum/csrf-cookie");

    // повторяем запрос, который ранее был с ошибкой устаревшего токена, только на этот раз меняем его config (новый токен от сервера)
    return axios(failedRequest.response.config);
  }

  // если статус ошибки 401 (сессия авторизации истекла)
  if (failedRequest.response.status === 401) {
    // нужен редирект на страницу логина
    await axios.get("/sanctum/csrf-cookie");
    return Promise.reject();
    // console.log("Это статус 401, необходимо авторизоваться");
  }

  return Promise.reject();
};

// Instantiate the interceptor
createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

export default apiClient;
