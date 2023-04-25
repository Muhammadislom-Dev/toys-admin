import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    aboutLoading: false,
    aboutError: undefined,
    about: [],
    singleAbout: undefined,
    singleAboutLoading: false,
    singleAboutError: undefined,
};

const prefix = 'clients';
const companyPrefix = prefix;
const editCompanyPrefix = `${prefix}/edit`;
const createAboutPrefix = `${prefix}/create`;
const deleteCompanyPrefix = `${prefix}/delete`;
const getOneCompanyPrefix = `${prefix}/getOne`;

export const fetchAbout = createAsyncThunk(
    companyPrefix,
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('clients');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createAbout = createAsyncThunk(
    createAboutPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'clients',
                formData,
                withToken(true)
            );
            notify('About was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteAboutById = createAsyncThunk(
    deleteCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(`clients/${id}`, withToken());
            notify('About was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchAboutById = createAsyncThunk(
    getOneCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`clients/${id}`);
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateAboutById = createAsyncThunk(
    editCompanyPrefix,
    async ({ newData, id }, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `clients/${id}`,
                newData,
                withToken(true)
            );
            notify('About was updated successfully', 'success');
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
        builder.addCase(fetchAbout.pending, (state) => {
            state.aboutLoading = true;
            state.aboutError = undefined;
        });
        builder.addCase(fetchAbout.fulfilled, (state, action) => {
            state.aboutLoading = false;
            state.about = action.payload;
        });
        builder.addCase(fetchAbout.rejected, (state, action) => {
            state.aboutLoading = false;
            state.aboutError = action.payload;
        });
        builder.addCase(createAbout.pending, (state) => {
            state.singleAboutLoading = true;
            state.singleAboutError = undefined;
        });
        builder.addCase(createAbout.fulfilled, (state, action) => {
            state.singleAboutLoading = false;
            state.about = action.payload;
        });
        builder.addCase(createAbout.rejected, (state, action) => {
            state.singleAboutLoading = false;
            state.singleAboutError = action.payload;
        });
        builder.addCase(deleteAboutById.pending, (state) => {
            state.singleAboutLoading = true;
            state.singleAboutError = undefined;
        });
        builder.addCase(deleteAboutById.fulfilled, (state, action) => {
            state.singleAboutLoading = false;
            state.about = action.payload;
        });
        builder.addCase(deleteAboutById.rejected, (state, action) => {
            state.singleAboutLoading = false;
            state.singleAboutError = action.payload;
        });
        builder.addCase(updateAboutById.pending, (state) => {
            state.singleAboutLoading = true;
            state.singleAboutError = undefined;
        });
        builder.addCase(updateAboutById.fulfilled, (state, action) => {
            state.singleAboutLoading = false;
            state.about = action.payload;
        });
        builder.addCase(updateAboutById.rejected, (state, action) => {
            state.singleAboutLoading = false;
            state.singleAboutError = action.payload;
        });
        builder.addCase(fetchAboutById.pending, (state) => {
            state.aboutLoading = true;
            state.singleAboutError = undefined;
        });
        builder.addCase(fetchAboutById.fulfilled, (state, action) => {
            state.aboutLoading = false;
            state.singleAbout = action.payload;
        });
        builder.addCase(fetchAboutById.rejected, (state, action) => {
            state.aboutLoading = false;
            state.singleAboutError = action.payload;
        });
    },
});

export const aboutActions = companySlice.actions;
export const aboutReducer = companySlice.reducer;
