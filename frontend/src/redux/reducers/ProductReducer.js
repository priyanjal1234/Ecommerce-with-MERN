import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts: [],
    filteredProducts: []
}

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAllProducts: function(state,action) {
            state.allProducts = action.payload
        },
        setFilteredProducts: function(state,action) {
            state.filteredProducts = action.payload
        }
    }
})

export default ProductSlice.reducer

export const { setAllProducts,setFilteredProducts } = ProductSlice.actions