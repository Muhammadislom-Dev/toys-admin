import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  withToken,
  getErrorMessage,
  notify
  // redirectToLogin,
} from "../../utils";
import axios from "axios";

const initialState = {
  servicesLoading: false,
  servicesError: undefined,
  services: [],
  singleService: undefined,
  singleServiceLoading: false,
  singleServiceError: undefined
};

const prefix = "products";
const workerPrefix = prefix;
const editWorkerPrefix = `${prefix}/edit`;
const createWorkerPrefix = `${prefix}/create`;
const deleteWorkerPrefix = `${prefix}/delete`;
const getOneWorkerPrefix = `${prefix}/getOne`;

export const fetchServices = createAsyncThunk(
  workerPrefix,
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("products");
      return data;
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createService = createAsyncThunk(
  createWorkerPrefix,
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post("products", formData, withToken(true));
      notify("Service was created successfully", "success");
      return data;
    } catch (e) {
      const message = getErrorMessage(e);
      // redirectToLogin(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteServiceById = createAsyncThunk(
  deleteWorkerPrefix,
  async (id, thunkAPI) => {
    try {
      const { message } = await axios.delete(`products/${id}`, withToken());
      notify("Service was deleted  successfully", "success");
      return message;
    } catch (e) {
      const message = getErrorMessage(e);
      // redirectToLogin(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  getOneWorkerPrefix,
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`products/${id}`);
      return data;
    } catch (e) {
      const message = getErrorMessage(e);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateServiceById = createAsyncThunk(
  editWorkerPrefix,
  async (options, thunkAPI) => {
    try {
      console.log(options);
      const { message } = await axios.put(
        `products/${options.id}`,
        options.formData,
        withToken(true)
      );
      notify("Service was updated successfully", "success");
      return message;
    } catch (e) {
      const message = getErrorMessage(e);
      // redirectToLogin(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const companySlice = createSlice({
  name: prefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServices.pending, (state) => {
      state.servicesLoading = true;
      state.servicesError = undefined;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.servicesLoading = false;
      state.services = action.payload;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.servicesLoading = false;
      state.servicesError = action.payload;
    });
    builder.addCase(createService.pending, (state) => {
      state.singleServiceLoading = true;
      state.singleServiceError = undefined;
    });
    builder.addCase(createService.fulfilled, (state, action) => {
      state.singleServiceLoading = false;
      state.services = action.payload;
    });
    builder.addCase(createService.rejected, (state, action) => {
      state.singleServiceLoading = false;
      state.singleServiceError = action.payload;
    });
    builder.addCase(deleteServiceById.pending, (state) => {
      state.singleServiceLoading = true;
      state.singleServiceError = undefined;
    });
    builder.addCase(deleteServiceById.fulfilled, (state, action) => {
      state.singleServiceLoading = false;
      state.services = action.payload;
    });
    builder.addCase(deleteServiceById.rejected, (state, action) => {
      state.singleServiceLoading = false;
      state.singleServiceError = action.payload;
    });
    builder.addCase(updateServiceById.pending, (state) => {
      state.singleServiceLoading = true;
      state.singleServiceError = undefined;
    });
    builder.addCase(updateServiceById.fulfilled, (state, action) => {
      state.singleServiceLoading = false;
      state.services = action.payload;
    });
    builder.addCase(updateServiceById.rejected, (state, action) => {
      state.singleServiceLoading = false;
      state.singleServiceError = action.payload;
    });
    builder.addCase(fetchServiceById.pending, (state) => {
      state.servicesLoading = true;
      state.singleServiceError = undefined;
    });
    builder.addCase(fetchServiceById.fulfilled, (state, action) => {
      state.servicesLoading = false;
      state.services = action.payload;
    });
    builder.addCase(fetchServiceById.rejected, (state, action) => {
      state.servicesLoading = false;
      state.singleServiceError = action.payload;
    });
  }
});

export const servicesActions = companySlice.actions;
export const servicesReducer = companySlice.reducer;
