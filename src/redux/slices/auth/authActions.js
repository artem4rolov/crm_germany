import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      // делаем запрос за куками
      const tokenStatus = await apiClient.get("/sanctum/csrf-cookie");

      // если статус токена 204, разрешаем авторизацию
      if (tokenStatus.status === 204) {
        const user = await apiClient
          .post("/login", {
            email: email,
            password: password,
          })
          .then((response) => {
            return response;
          });
        return user.status;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// выход
export const userLogout = createAsyncThunk("auth/logout", async () => {
  try {
    await apiClient.post("/logout");
  } catch (error) {
    console.log(error);
  }
});

// вход
export const testAuth = createAsyncThunk("auth/testAuth", async () => {
  try {
    const data = await apiClient.get("/user/confirmed-password-status");
    return data;
  } catch (error) {
    return error;
  }
});
