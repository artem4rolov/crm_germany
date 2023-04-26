import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { getToken } from "./authActions";

const initialState = {
  loading: false, // отображение загрузки
  scrfTokenStatus: null, // пользователь
  error: null, // значение ошибки
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.scrfTokenStatus = null;
      state.error = null;
    },
    // обновляем каждые 15 минут (в Header.jsx) данные о пользователе, чтобы не сбрасывать аутентификацию
    // setCredentials: (state, { payload }) => {
    //   state.loading = false;
    //   state.login = payload.user???;
    //
    // },
  },
  extraReducers: (builder) => {
    builder
      // авторизация
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.scrfTokenStatus = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        state.scrfTokenStatus = action.payload;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        state.scrfTokenStatus = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
