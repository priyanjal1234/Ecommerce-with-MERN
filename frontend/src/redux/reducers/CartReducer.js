import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartNumber : 0,
    cartProducts: []
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartNumber: function(state,action) {
            state.cartNumber = action.payload
        },
        setIsNumVisible: function(state,action) {
            state.isNumVisible = action.payload
        },
        setCartProducts: function(state,action) {
            state.cartProducts = action.payload
        }
    }
})

export default CartSlice.reducer

export const { setCartNumber,setIsNumVisible,setCartProducts } = CartSlice.actions