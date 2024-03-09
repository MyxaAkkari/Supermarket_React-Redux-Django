import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, addProduct, delProduct, updProduct } from './productsAPI';


const initialState = {
    products: [],
    pName: '',
    desc: '',
    price: 0,
    isLogged: false,
    refresh: false,
};

export const getProductsAsync = createAsyncThunk(
    'counter/getProducts',
    async () => {
        const response = await getProducts()
        return response.data
    }
)
export const addProductAsync = createAsyncThunk(
    'counter/addProduct',
    async (_, { getState }) => {
        const { pName, desc, price } = getState().products;
        const response = await addProduct(pName, desc, price);
        return response.data;
    }
)
export const delProductAsync = createAsyncThunk(
    'counter/delProduct',
    async (id) => {
        const response = await delProduct(id)
        return response.data
    }
)

export const updProductAsync = createAsyncThunk(
    'counter/updProduct',
    async (id, { getState }) => {
        const { pName, desc, price } = getState().products;
        const response = await updProduct(id, pName, desc, price);
        return response.data;
    }
)



export const productsSlice = createSlice({
    name: 'products',
    initialState,

    reducers: {
        setLogged: (state) => {
            state.isLogged = !state.isLogged;
        },
        setProductName: (state, action)=>{
            state.pName = action.payload
        },
        setProductDesc: (state, action)=>{
            state.desc = action.payload
        },
        setProductPrice: (state, action)=>{
            state.price = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(addProductAsync.fulfilled, (state) => {
                state.pName = ''
                state.desc = ''
                state.price = 0
                state.refresh = !state.refresh

            })
            .addCase(delProductAsync.fulfilled, (state) => {
                state.refresh = !state.refresh
            })
            .addCase(updProductAsync.fulfilled, (state) => {
                state.pName = ''
                state.desc = ''
                state.price = 0
                state.refresh = !state.refresh
            })

    }
});

export const { setLogged, setProductName, setProductDesc, setProductPrice } = productsSlice.actions;
export const selectRefresh = (state) => state.products.refresh;
export const selectProducts = (state) => state.products.products;
export const selectProductName = (state) => state.products.pName;
export const selectProductDesc = (state) => state.products.desc;
export const selectProductPrice = (state) => state.products.price;




export default productsSlice.reducer;
