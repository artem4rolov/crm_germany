import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { userLogin } from "./authActions";

const initialState = {
  loading: false, // отображение загрузки
  userStatus: null, // пользователь
  error: null, // значение ошибки
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.user = null;
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
