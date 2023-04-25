import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    withToken,
    getErrorMessage,
    notify,
    // redirectToLogin,
} from '../../utils';
import axios from 'axios';

const initialState = {
    productsLoading: false,
    productsError: undefined,
    products: [],
    singleProduct: undefined,
    singleProductLoading: false,
    singleProductError: undefined,
};

const prefix = 'products';
const productPrefix = prefix;
const editProductPrefix = `${prefix}/edit`;
const createProductPrefix = `${prefix}/create`;
const deleteProductPrefix = `${prefix}/delete`;
const getOneProductPrefix = `${prefix}/getOne`;

export const fetchProducts = createAsyncThunk(
    productPrefix,
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('products');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createProduct = createAsyncThunk(
    createProductPrefix,
    async (formData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                'products',
                formData,
                withToken(true)
            );
            notify('Product was created successfully', 'success');
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProductById = createAsyncThunk(
    deleteProductPrefix,
    async (id, thunkAPI) => {
        try {
            const { message } = await axios.delete(
                `products/${id}`,
                withToken()
            );
            notify('Product was deleted  successfully', 'success');
            return message;
        } catch (e) {
            const message = getErrorMessage(e);
            // redirectToLogin(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    getOneProductPrefix,
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

export const updateProductById = createAsyncThunk(
    editProductPrefix,
    async (options, thunkAPI) => {
        try {
            const { message } = await axios.put(
                `products/${options.id}`,
                options.formData,
                withToken(true)
            );
            notify('Product was updated successfully', 'success');
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
        builder.addCase(fetchProducts.pending, (state) => {
            state.productsLoading = true;
            state.productsError = undefined;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productsLoading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.productsLoading = false;
            state.productsError = action.payload;
        });
        builder.addCase(createProduct.pending, (state) => {
            state.singleProductLoading = true;
            state.singleProductError = undefined;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.singleProductLoading = false;
            state.products = action.payload;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.singleProductLoading = false;
            state.singleProductError = action.payload;
        });
        builder.addCase(deleteProductById.pending, (state) => {
            state.singleProductLoading = true;
            state.singleProductError = undefined;
        });
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            state.singleProductLoading = false;
            state.products = action.payload;
        });
        builder.addCase(deleteProductById.rejected, (state, action) => {
            state.singleProductLoading = false;
            state.singleProductError = action.payload;
        });
        builder.addCase(updateProductById.pending, (state) => {
            state.singleProductLoading = true;
            state.singleProductError = undefined;
        });
        builder.addCase(updateProductById.fulfilled, (state, action) => {
            state.singleProductLoading = false;
            state.products = action.payload;
        });
        builder.addCase(updateProductById.rejected, (state, action) => {
            state.singleProductLoading = false;
            state.singleProductError = action.payload;
        });
        builder.addCase(fetchProductById.pending, (state) => {
            state.productsLoading = true;
            state.singleProductError = undefined;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.productsLoading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.productsLoading = false;
            state.singleProductError = action.payload;
        });
    },
});

export const productActions = companySlice.actions;
export const productReducer = companySlice.reducer;
