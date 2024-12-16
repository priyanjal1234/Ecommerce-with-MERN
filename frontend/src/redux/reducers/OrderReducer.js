import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    allOrders: null,
    currentOrder: null
}

export const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setTotalPrice: function(state,action) {
            state.totalPrice = action.payload
        },
        setAllOrders: function(state,action) {
            state.allOrders = action.payload
        },
        setCurrentOrder: function(state,action) {
            state.currentOrder = action.payload
        },
    }
})

export default OrderSlice.reducer

export const { setTotalPrice,setAllOrders,setCurrentOrder } = OrderSlice.actions