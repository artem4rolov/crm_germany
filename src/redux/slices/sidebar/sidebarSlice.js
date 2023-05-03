import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterRegion: null, // ВЫБРАННЫЙ фильтр регионов
  filterDate: "01.05.2023-31.05.2023", // фильтр дат
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setFilterRegionHoliday: (state, { payload }) => {
      // если выбран Alle - делаем запрос без фильтров по регионам
      if (payload == ["Alle"]) {
        return (state.filterRegion = null);
      }
      state.filterRegion = payload;
    },
    setFilterDateDAY: (state, { payload }) => {
      state.filterDate = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setFilterRegionHoliday, setFilterDateDAY } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
