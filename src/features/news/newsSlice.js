import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    newsLoading: false,
    newsError: undefined,
    news: [],
    singleNews: undefined,
    singleNewsLoading: false,
    singleNewsError: undefined,
};

const prefix = 'news';
const workerPrefix = prefix;
const editWorkerPrefix = `${prefix}/edit`;
const createWorkerPrefix = `${prefix}/create`;
const deleteWorkerPrefix = `${prefix}/delete`;
const getOneWorkerPrefix = `${prefix}/getOne`;

export const fetchNews = createAsyncThunk(workerPrefix, async (_, thunkAPI) => {
    try {
        const { data } = await axios.get('news');
        return data;
    } catch (e) {
        const message = getErrorMessage(e);
        return thunkAPI.rejectWithValue(message);
    }
});

export const createNews = createAsyncThunk(
    createWorkerPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'news',
                formData,
                withToken(true)
            );
            notify('News was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteNewsById = createAsyncThunk(
    deleteWorkerPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(`news/${id}`, withToken());
            notify('News was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchNewsById = createAsyncThunk(
    getOneWorkerPrefix,
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`news/${id}`);
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateNewsById = createAsyncThunk(
    editWorkerPrefix,
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `news/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('News was updated successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateStatusNews = createAsyncThunk(
    editWorkerPrefix + '/status',
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `news/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('News was updated successfully', 'success');
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
        builder.addCase(fetchNews.pending, (state) => {
            state.newsLoading = true;
            state.newsError = undefined;
        });
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.newsLoading = false;
            state.news = action.payload;
        });
        builder.addCase(fetchNews.rejected, (state, action) => {
            state.newsLoading = false;
            state.newsError = action.payload;
        });
        builder.addCase(createNews.pending, (state) => {
            state.singleNewsLoading = true;
            state.singleNewsError = undefined;
        });
        builder.addCase(createNews.fulfilled, (state, action) => {
            state.singleNewsLoading = false;
            state.news = action.payload;
        });
        builder.addCase(createNews.rejected, (state, action) => {
            state.singleNewsLoading = false;
            state.singleNewsError = action.payload;
        });
        builder.addCase(deleteNewsById.pending, (state) => {
            state.singleNewsLoading = true;
            state.singleNewsError = undefined;
        });
        builder.addCase(deleteNewsById.fulfilled, (state, action) => {
            state.singleNewsLoading = false;
            state.news = action.payload;
        });
        builder.addCase(deleteNewsById.rejected, (state, action) => {
            state.singleNewsLoading = false;
            state.singleNewsError = action.payload;
        });
        builder.addCase(updateNewsById.pending, (state) => {
            state.singleNewsLoading = true;
            state.singleNewsError = undefined;
        });
        builder.addCase(updateNewsById.fulfilled, (state, action) => {
            state.singleNewsLoading = false;
            state.news = action.payload;
        });
        builder.addCase(updateNewsById.rejected, (state, action) => {
            state.singleNewsLoading = false;
            state.singleNewsError = action.payload;
        });
        builder.addCase(fetchNewsById.pending, (state) => {
            state.newsLoading = true;
            state.singleNewsError = undefined;
        });
        builder.addCase(fetchNewsById.fulfilled, (state, action) => {
            state.newsLoading = false;
            state.news = action.payload;
        });
        builder.addCase(fetchNewsById.rejected, (state, action) => {
            state.newsLoading = false;
            state.singleNewsError = action.payload;
        });
        builder.addCase(updateStatusNews.pending, (state) => {
            state.singleNewsError = undefined;
        });
        builder.addCase(updateStatusNews.fulfilled, (state, action) => {
            state.news = action.payload;
        });
        builder.addCase(updateStatusNews.rejected, (state, action) => {
            state.singleNewsError = action.payload;
        });
    },
});

export const newsActions = companySlice.actions;
export const newsReducer = companySlice.reducer;
