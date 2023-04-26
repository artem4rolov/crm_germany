import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      return await apiClient.get("/sanctum/csrf-cookie").then((response) => {
        // console.log(response);
        if (response.status === 204) {
          apiClient
            .post("/login", {
              email: email,
              password: password,
            })
            .then((response) => {
              return response;
            });
        }
        return response.status;
      });

      // заносим токен авторизации в localStorage
      // localStorage.setItem("userToken", data.token);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
