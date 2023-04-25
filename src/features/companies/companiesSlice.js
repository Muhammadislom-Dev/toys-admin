import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    companiesLoading: false,
    companiesError: undefined,
    companies: [],
    singleCompany: undefined,
    singleCompanyLoading: false,
    singleCompanyError: undefined,
};

const prefix = 'categories';
const companyPrefix = prefix;
const editCompanyPrefix = `${prefix}/edit`;
const createCompanyPrefix = `${prefix}/create`;
const deleteCompanyPrefix = `${prefix}/delete`;
const getOneCompanyPrefix = `${prefix}/getOne`;

export const fetchCompanies = createAsyncThunk(
    companyPrefix,
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('categories');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createCompany = createAsyncThunk(
    createCompanyPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'categories',
                formData,
                withToken(true)
            );
            notify('Company was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCompanyById = createAsyncThunk(
    deleteCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(
                `categories/${id}`,
                withToken()
            );
            notify('Company was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchCompanyById = createAsyncThunk(
    getOneCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`categories/${id}`);
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateCompanyById = createAsyncThunk(
    editCompanyPrefix,
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `categories/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('Company was updated successfully', 'success');
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
        builder.addCase(fetchCompanies.pending, (state) => {
            state.companiesLoading = true;
            state.companiesError = undefined;
        });
        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.companiesLoading = false;
            state.companies = action.payload;
        });
        builder.addCase(fetchCompanies.rejected, (state, action) => {
            state.companiesLoading = false;
            state.companiesError = action.payload;
        });
        builder.addCase(createCompany.pending, (state) => {
            state.singleCompanyLoading = true;
            state.singleCompanyError = undefined;
        });
        builder.addCase(createCompany.fulfilled, (state, action) => {
            state.singleCompanyLoading = false;
            state.companies = action.payload;
        });
        builder.addCase(createCompany.rejected, (state, action) => {
            state.singleCompanyLoading = false;
            state.singleCompanyError = action.payload;
        });
        builder.addCase(deleteCompanyById.pending, (state) => {
            state.singleCompanyLoading = true;
            state.singleCompanyError = undefined;
        });
        builder.addCase(deleteCompanyById.fulfilled, (state, action) => {
            state.singleCompanyLoading = false;
            state.companies = action.payload;
        });
        builder.addCase(deleteCompanyById.rejected, (state, action) => {
            state.singleCompanyLoading = false;
            state.singleCompanyError = action.payload;
        });
        builder.addCase(updateCompanyById.pending, (state) => {
            state.singleCompanyLoading = true;
            state.singleCompanyError = undefined;
        });
        builder.addCase(updateCompanyById.fulfilled, (state, action) => {
            state.singleCompanyLoading = false;
            state.companies = action.payload;
        });
        builder.addCase(updateCompanyById.rejected, (state, action) => {
            state.singleCompanyLoading = false;
            state.singleCompanyError = action.payload;
        });
        builder.addCase(fetchCompanyById.pending, (state) => {
            state.companiesLoading = true;
            state.singleCompanyError = undefined;
        });
        builder.addCase(fetchCompanyById.fulfilled, (state, action) => {
            state.companiesLoading = false;
            state.singleCompany = action.payload;
        });
        builder.addCase(fetchCompanyById.rejected, (state, action) => {
            state.companiesLoading = false;
            state.singleCompanyError = action.payload;
        });
    },
});

export const companyActions = companySlice.actions;
export const companyReducer = companySlice.reducer;
