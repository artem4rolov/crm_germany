import { createSlice } from "@reduxjs/toolkit";

const actualyYear = new Date().getFullYear();

const initialState = {
  filterDateYearSummary: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
};

const yearSummarySlice = createSlice({
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
    setFilterDateYearSummary: (state, { payload }) => {
      state.filterDateYearSummary = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setFilterDateYearSummary } = yearSummarySlice.actions;
export default yearSummarySlice.reducer;
