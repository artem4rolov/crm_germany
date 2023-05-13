import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { store } from "../store";
import { userLogout } from "../slices/auth/authActions";

// настройка для запроса от бэка scrf токена ПЕРЕД каждым запросе на клиенте
const apiClient = axios.create({
  withCredentials: true,
});

// Отлавливаем ошибки при запросах с помощью axios interceptors
const refreshAuthLogic = async (failedRequest) => {
  // если статус ошибки 419 (устаревший XSRF токен)
  if (failedRequest.response.status === 419) {
    // получаем новый токен от сервера
    await axios.get("/api/csrf-cookie");

    // повторяем запрос, который ранее был с ошибкой устаревшего токена, только на этот раз меняем его config (новый токен от сервера)
    return axios(failedRequest.response.config);
  }

  // если статус ошибки 401 (сессия авторизации истекла)
  if (failedRequest.response.status === 401) {
    const { dispatch } = store;
    dispatch(userLogout());
    // нужен редирект на страницу логина
    // но здесь необходимо поменять state.userStatus, поскольку он остается 200 (успешно), поэтому просто редирект не будет работать
    return Promise.reject();
    // console.log("Это статус 401, необходимо авторизоваться");
  }

  return Promise.reject();
};

// Instantiate the interceptor
createAuthRefreshInterceptor(apiClient, refreshAuthLogic, {
  statusCodes: [401, 419],
});

export default apiClient;
