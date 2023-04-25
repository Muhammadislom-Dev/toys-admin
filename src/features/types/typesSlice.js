import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    typesLoading: false,
    typesError: undefined,
    types: [],
    singleType: undefined,
    singleTypeLoading: false,
    singleTypeError: undefined,
};

const prefix = 'types';
const companyPrefix = prefix;
const editCompanyPrefix = `${prefix}/edit`;
const createCompanyPrefix = `${prefix}/create`;
const deleteCompanyPrefix = `${prefix}/delete`;
const getOneCompanyPrefix = `${prefix}/getOne`;

export const fetchTypes = createAsyncThunk(
    companyPrefix,
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('promotions');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createType = createAsyncThunk(
    createCompanyPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'promotions',
                formData,
                withToken(true)
            );
            notify('Discount was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteTypeById = createAsyncThunk(
    deleteCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(
                `promotions/${id}`,
                withToken()
            );
            notify('Discount was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchTypeById = createAsyncThunk(
    getOneCompanyPrefix,
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`promotions/${id}`);
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateTypeById = createAsyncThunk(
    editCompanyPrefix,
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `promotions/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('Discount was updated successfully', 'success');
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
        builder.addCase(fetchTypes.pending, (state) => {
            state.typesLoading = true;
            state.typesError = undefined;
        });
        builder.addCase(fetchTypes.fulfilled, (state, action) => {
            state.typesLoading = false;
            state.types = action.payload;
        });
        builder.addCase(fetchTypes.rejected, (state, action) => {
            state.typesLoading = false;
            state.typesError = action.payload;
        });
        builder.addCase(createType.pending, (state) => {
            state.singleTypeLoading = true;
            state.singleTypeError = undefined;
        });
        builder.addCase(createType.fulfilled, (state, action) => {
            state.singleTypeLoading = false;
            state.types = action.payload;
        });
        builder.addCase(createType.rejected, (state, action) => {
            state.singleTypeLoading = false;
            state.singleTypeError = action.payload;
        });
        builder.addCase(deleteTypeById.pending, (state) => {
            state.singleTypeLoading = true;
            state.singleTypeError = undefined;
        });
        builder.addCase(deleteTypeById.fulfilled, (state, action) => {
            state.singleTypeLoading = false;
            state.types = action.payload;
        });
        builder.addCase(deleteTypeById.rejected, (state, action) => {
            state.singleTypeLoading = false;
            state.singleTypeError = action.payload;
        });
        builder.addCase(updateTypeById.pending, (state) => {
            state.singleTypeLoading = true;
            state.singleTypeError = undefined;
        });
        builder.addCase(updateTypeById.fulfilled, (state, action) => {
            state.singleTypeLoading = false;
            state.types = action.payload;
        });
        builder.addCase(updateTypeById.rejected, (state, action) => {
            state.singleTypeLoading = false;
            state.singleTypeError = action.payload;
        });
        builder.addCase(fetchTypeById.pending, (state) => {
            state.typesLoading = true;
            state.singleTypeError = undefined;
        });
        builder.addCase(fetchTypeById.fulfilled, (state, action) => {
            state.typesLoading = false;
            state.types = action.payload;
        });
        builder.addCase(fetchTypeById.rejected, (state, action) => {
            state.typesLoading = false;
            state.singleTypeError = action.payload;
        });
    },
});

export const typeActions = companySlice.actions;
export const typeReducer = companySlice.reducer;
