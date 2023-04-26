import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

// вход
export const getToken = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      return await apiClient.get("/sanctum/csrf-cookie").then((response) => {
        // console.log(response);
        // apiClient
        //   .post("/login", {
        //     email: email,
        //     password: password,
        //   })
        //   .then((response) => {
        //     return response;
        //   });
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
