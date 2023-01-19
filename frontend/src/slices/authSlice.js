import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/axios";

const initialState = {
  token: "",
  worker: null,
  loading: false,
  err: "",
};

export const login = createAsyncThunk("login", async (body) => {
  const res = await baseUrl.post("/auth/login", body);

  return res.data.user;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      AsyncStorage.removeItem("worker");
      state.token = "";
    },
    setWorker: (state, action) => {
      state.token = action.payload.token;
      state.worker = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.err = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.err = "";
      state.token = action.payload.token;
      state.worker = action.payload;
      AsyncStorage.setItem("worker", JSON.stringify(action.payload));
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

// export const {
//   loginStart,
//   loginFailure,
//   loginSuccess,
//   registerStart,
//   registerFailure,
//   registerSuccess,
// } = authSlice.actions;
export const { logout, setWorker } = authSlice.actions;
export default authSlice.reducer;
