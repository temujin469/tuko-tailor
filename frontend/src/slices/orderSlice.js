import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/axios";

const initialState = {
  workers: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addWorker: (state, action) => {
      state.workers = [...state.workers, action.payload];
    },
    removeWorker: (state, action) => {
      state.workers = state.workers.filter((id) => id !== action.payload);
    },
  },
});

export const { addWorker, removeWorker } = orderSlice.actions;
export default orderSlice.reducer;
