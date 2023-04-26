import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { userLogin, userLogout } from "./authActions";

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
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.userStatus = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
