import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    statisticsLoading: false,
    statisticsError: undefined,
    statistics: [],
    singleStatisticsLoading: false,
    singleStatisticsError: undefined,
};

const prefix = 'constants';
const companyPrefix = prefix;
const editCompanyPrefix = `${prefix}/edit`;
const createStatisticsPrefix = `${prefix}/create`;
const deleteCompanyPrefix = `${prefix}/delete`;
const getOneCompanyPrefix = `${prefix}/getOne`;

export const fetchStatistics = createAsyncThunk(
    companyPrefix,
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('constants');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createStatistics = createAsyncThunk(
    createStatisticsPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'constants',
                formData,
                withToken(true)
            );
            notify('Statistics was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteStatisticsById = createAsyncThunk(
    deleteCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(
                `constants/${id}`,
                withToken()
            );
            notify('Statistics was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchStatisticsById = createAsyncThunk(
    getOneCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`constants/${id}`);
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateStatisticsById = createAsyncThunk(
    editCompanyPrefix,
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `constants/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('Statistics was updated successfully', 'success');
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
        builder.addCase(fetchStatistics.pending, (state) => {
            state.statisticsLoading = true;
            state.statisticsError = undefined;
        });
        builder.addCase(fetchStatistics.fulfilled, (state, action) => {
            state.statisticsLoading = false;
            state.statistics = action.payload;
        });
        builder.addCase(fetchStatistics.rejected, (state, action) => {
            state.statisticsLoading = false;
            state.statisticsError = action.payload;
        });
        builder.addCase(createStatistics.pending, (state) => {
            state.singleStatisticsLoading = true;
            state.singleStatisticsError = undefined;
        });
        builder.addCase(createStatistics.fulfilled, (state, action) => {
            state.singleStatisticsLoading = false;
            state.statistics = action.payload;
        });
        builder.addCase(createStatistics.rejected, (state, action) => {
            state.singleStatisticsLoading = false;
            state.singleStatisticsError = action.payload;
        });
        builder.addCase(deleteStatisticsById.pending, (state) => {
            state.singleStatisticsLoading = true;
            state.singleStatisticsError = undefined;
        });
        builder.addCase(deleteStatisticsById.fulfilled, (state, action) => {
            state.singleStatisticsLoading = false;
            state.statistics = action.payload;
        });
        builder.addCase(deleteStatisticsById.rejected, (state, action) => {
            state.singleStatisticsLoading = false;
            state.singleStatisticsError = action.payload;
        });
        builder.addCase(updateStatisticsById.pending, (state) => {
            state.singleStatisticsLoading = true;
            state.singleStatisticsError = undefined;
        });
        builder.addCase(updateStatisticsById.fulfilled, (state, action) => {
            state.singleStatisticsLoading = false;
            state.statistics = action.payload;
        });
        builder.addCase(updateStatisticsById.rejected, (state, action) => {
            state.singleStatisticsLoading = false;
            state.singleStatisticsError = action.payload;
        });
        builder.addCase(fetchStatisticsById.pending, (state) => {
            state.statisticsLoading = true;
            state.singleStatisticsError = undefined;
        });
        builder.addCase(fetchStatisticsById.fulfilled, (state, action) => {
            state.statisticsLoading = false;
            state.statistics = action.payload;
        });
        builder.addCase(fetchStatisticsById.rejected, (state, action) => {
            state.statisticsLoading = false;
            state.singleStatisticsError = action.payload;
        });
    },
});

export const statisticsActions = companySlice.actions;
export const statisticsReducer = companySlice.reducer;
