import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // Setel secara global
});

const initialState = {
    user: null,
    baseURL: "http://localhost:5000",
    microPage: "unset",
    homepage: "unset",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    // Separate success states for different actions
    loginSuccess: false,
    logoutSuccess: false,
};

// Thunk untuk mendapatkan data pengguna
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await api.get("/api/shared/me");
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.msg || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }
});

// Thunk untuk logout pengguna
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
    try {
        await api.delete("/api/shared/logout");
        return null;
    } catch (error) {
        const message = error?.response?.data?.msg || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }
});

// Thunk untuk login pengguna
export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    try {
        const response = await api.post("/api/shared/login", user);

        // Extract user data from response
        const userData = response.data.user || response.data;
        console.log('Login response:', response.data);
        console.log('User data extracted:', userData);

        return userData;
    } catch (error) {
        const message = error?.response?.data?.msg || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }
});

// Thunk untuk register pengguna
export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        const response = await api.post("/api/shared/register", userData);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.msg || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }
});

// Slice Redux untuk otentikasi
export const authSlice = createSlice({
    name: "auth",
    initialState, reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.loginSuccess = false;
            state.logoutSuccess = false;
        },
        clearAuth: (state) => {
            return {
                ...initialState,
                user: null,
                isLoading: false,
                isSuccess: false,
                isError: false,
                message: "",
                loginSuccess: false,
                logoutSuccess: false,
            };
        },
        setMicroPage: (state, action) => {
            state.microPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loginSuccess = true;
                state.user = action.payload;
                console.log('Auth slice - User data stored:', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Get Me
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.logoutSuccess = true;
                state.user = null;
                console.log('Logout successful');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearAuth, setMicroPage } = authSlice.actions;

export default authSlice.reducer;