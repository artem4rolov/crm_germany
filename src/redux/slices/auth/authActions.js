import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const user = await apiClient.post("/login", {
        email: email,
        password: password,
      });

      return user.status;
    } catch (error) {
      return error.response.status;
    }
  }
);

// выход
export const userLogout = createAsyncThunk("auth/logout", async () => {
  try {
    await apiClient.post("/logout");
  } catch (error) {
    return error.status;
  }
});

// проверка действительности сессии на сервере (при перезагрузке страницы, чтобы не логиниться)
export const testAuth = createAsyncThunk("auth/testAuth", async () => {
  try {
    const data = await apiClient.get("/user/confirmed-password-status");

    return data.status;
  } catch (error) {
    return error.status;
  }
});
