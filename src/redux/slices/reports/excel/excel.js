import { createSlice } from "@reduxjs/toolkit";

const actualyYear = new Date().getFullYear();

const initialState = {
  filterDateExcel: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
};

const excelSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // setFilterRegionHoliday: (state, { payload }) => {
    //   // если выбран Alle - делаем запрос без фильтров по регионам
    //   if (payload == ["Alle"]) {
    //     return (state.filterRegion = null);
    //   }
    //   state.filterRegion = payload;
    // },
    setFilterDateExcel: (state, { payload }) => {
      state.filterDateExcel = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setFilterDateExcel } = excelSlice.actions;
export default excelSlice.reducer;
