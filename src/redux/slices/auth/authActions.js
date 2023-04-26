import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      // делаем запрос за куками
      const tokenStatus = await apiClient.get("/sanctum/csrf-cookie");

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

      // заносим токен авторизации в localStorage
      // localStorage.setItem("userToken", data.token);
    } catch (error) {
      console.log(error);
    }
  }
);
