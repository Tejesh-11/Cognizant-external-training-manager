import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for both trainer and coach login
export const userLoginLifeCycle = createAsyncThunk('user-login', async (userCred, thunkApi) => {
    try {

        let res = await axios.post('http://localhost:2000/user-api/login', userCred);
        if (res.data.message === 'login success') {
            sessionStorage.setItem('token', res.data.token);
            return { ...res.data, userType: userCred.userType };
        } else {
            return thunkApi.rejectWithValue(res.data.message);
        }
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

// Slice for both trainer and coach
export const loginSlice = createSlice({
    name: 'login',
    initialState: { currentUser: {}, loginStatus: false, errorMessage: '', isPending: false },
    reducers: {
        clearState:(state,action)=>{
            state.currentUser={};
            state.loginStatus=false;
            state.errorMessage='';
            state.isPending=false;
        }
    },
    extraReducers: (builder) => builder
        .addCase(userLoginLifeCycle.pending, (state) => {
            state.isPending = true;
        })
        .addCase(userLoginLifeCycle.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.loginStatus = true;
            state.errorMessage = '';
            state.isPending = false;
        })
        .addCase(userLoginLifeCycle.rejected, (state, action) => {
            state.currentUser = {};
            state.loginStatus = false;
            state.errorMessage = action.payload;
            state.isPending = false;
        }),
});

// Export actions
export const {clearState}=loginSlice.actions;

// Export reducer
export default loginSlice.reducer; 



