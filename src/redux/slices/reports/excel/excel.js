import { createSlice } from "@reduxjs/toolkit";
import { getContractsExcel } from "./excelActions";

const actualyYear = new Date().getFullYear();

const initialState = {
  filterDateExcel: `01.01.${actualyYear}-31.12.${actualyYear}`, // фильтр дат
  contractsExcel: [], // контракты
  loadingContracts: false, // загрузка
  error: null, // ошибка
};

const excelSlice = createSlice({
  name: "excel",
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
  extraReducers: (builder) => {
    builder
      // получить все праздники текущего года
      .addCase(getContractsExcel.pending, (state) => {
        state.loadingContracts = true;
        state.contractsExcel = null;
      })
      .addCase(getContractsExcel.fulfilled, (state, action) => {
        state.loadingContracts = false;
        state.contractsExcel = action.payload.data;
      })
      .addCase(getContractsExcel.rejected, (state, action) => {
        state.loadingContracts = false;
        state.contractsExcel = null;
        state.error = action.payload;
      });
  },
});

export const { setFilterDateExcel } = excelSlice.actions;
export default excelSlice.reducer;
