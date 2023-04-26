import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../services/api";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const data = await apiClient
        .get("/sanctum/csrf-cookie")
        .then(async (response) => {
          console.log(response);
          await apiClient
            .post("/login", {
              email: email,
              password: password,
            })
            .then((response) => {
              console.log(response);
            });
        });
      // заносим токен авторизации в localStorage
      // localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
