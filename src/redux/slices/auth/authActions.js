import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// бэкенд по адресу
const backendURL = "https://sandbox.w-hoffmann.com";
// const backendURL = "https://nice-pink-lapel.cyclic.app";

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      // указываем тип отправляемых данных пользоваетелем на сервер
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/login`,
        { email, password },
        config
      );
      // заносим токен авторизации в localStorage
      // localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
