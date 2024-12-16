import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedin: false,
   
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoggedin: function(state,action) {
            state.isLoggedin = action.payload
        },
        
        setUser: function(state,action) {
            state.user = action.payload
        }
    }
})

export default UserSlice.reducer

export const { setLoggedin,setAdmin,setUser } = UserSlice.actions
