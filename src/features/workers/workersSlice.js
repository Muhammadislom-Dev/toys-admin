import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    workersLoading: false,
    workersError: undefined,
    workers: [],
    singleWorker: undefined,
    singleWorkerLoading: false,
    singleWorkerError: undefined,
};

const prefix = 'sliders';
const workerPrefix = prefix;
const editWorkerPrefix = `${prefix}/edit`;
const createWorkerPrefix = `${prefix}/create`;
const deleteWorkerPrefix = `${prefix}/delete`;
const getOneWorkerPrefix = `${prefix}/getOne`;

export const fetchWorkers = createAsyncThunk(
    workerPrefix,
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('sliders');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createWorker = createAsyncThunk(
    createWorkerPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'sliders',
                formData,
                withToken(true)
            );
            notify('Worker was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteWorkerById = createAsyncThunk(
    deleteWorkerPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(
                `sliders/${id}`,
                withToken()
            );
            notify('Worker was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchWorkerById = createAsyncThunk(
    getOneWorkerPrefix,
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`sliders/${id}`);
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateWorkerById = createAsyncThunk(
    editWorkerPrefix,
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `sliders/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('Worker was updated successfully', 'success');
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
        builder.addCase(fetchWorkers.pending, (state) => {
            state.workersLoading = true;
            state.workersError = undefined;
        });
        builder.addCase(fetchWorkers.fulfilled, (state, action) => {
            state.workersLoading = false;
            state.workers = action.payload;
        });
        builder.addCase(fetchWorkers.rejected, (state, action) => {
            state.workersLoading = false;
            state.workersError = action.payload;
        });
        builder.addCase(createWorker.pending, (state) => {
            state.singleWorkerLoading = true;
            state.singleWorkerError = undefined;
        });
        builder.addCase(createWorker.fulfilled, (state, action) => {
            state.singleWorkerLoading = false;
            state.workers = action.payload;
        });
        builder.addCase(createWorker.rejected, (state, action) => {
            state.singleWorkerLoading = false;
            state.singleWorkerError = action.payload;
        });
        builder.addCase(deleteWorkerById.pending, (state) => {
            state.singleWorkerLoading = true;
            state.singleWorkerError = undefined;
        });
        builder.addCase(deleteWorkerById.fulfilled, (state, action) => {
            state.singleWorkerLoading = false;
            state.workers = action.payload;
        });
        builder.addCase(deleteWorkerById.rejected, (state, action) => {
            state.singleWorkerLoading = false;
            state.singleWorkerError = action.payload;
        });
        builder.addCase(updateWorkerById.pending, (state) => {
            state.singleWorkerLoading = true;
            state.singleWorkerError = undefined;
        });
        builder.addCase(updateWorkerById.fulfilled, (state, action) => {
            state.singleWorkerLoading = false;
            state.workers = action.payload;
        });
        builder.addCase(updateWorkerById.rejected, (state, action) => {
            state.singleWorkerLoading = false;
            state.singleWorkerError = action.payload;
        });
        builder.addCase(fetchWorkerById.pending, (state) => {
            state.workersLoading = true;
            state.singleWorkerError = undefined;
        });
        builder.addCase(fetchWorkerById.fulfilled, (state, action) => {
            state.workersLoading = false;
            state.workers = action.payload;
        });
        builder.addCase(fetchWorkerById.rejected, (state, action) => {
            state.workersLoading = false;
            state.singleWorkerError = action.payload;
        });
    },
});

export const workersActions = companySlice.actions;
export const workersReducer = companySlice.reducer;
