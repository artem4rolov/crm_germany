import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { testAuth, userLogin, userLogout } from "./authActions";

const initialState = {
  loading: false, // отображение загрузки
  userStatus: null, // пользователь
  error: null, // значение ошибки
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // авторизация
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.userStatus = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.userStatus = null;
        state.error = action.payload;
      })
      // выход
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.userStatus = null;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.userStatus = null;
        state.error = action.payload;
      })
      // проверка действительности сессии
      .addCase(testAuth.pending, (state) => {
        state.loading = true;
        state.userStatus = null;
        state.error = null;
      })
      .addCase(testAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
      })
      .addCase(testAuth.rejected, (state, action) => {
        state.loading = false;
        state.userStatus = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
