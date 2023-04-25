import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../utils";
import axios from "axios";

const initialState = {
  loading: false,
  error: undefined,
  token: localStorage.getItem("token") || "",
  message: undefined,
};

export const login = createAsyncThunk("auth", async (options, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await axios.post(`auth/signin`, options);
    const userData = {
      phone_number: data.user.phone_number,
      token: data.tokens.accessToken.token,
    };
    localStorage.setItem("archa_admin_token", JSON.stringify(userData));
    return userData;
  } catch (e) {
    const message = getErrorMessage(e);
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
