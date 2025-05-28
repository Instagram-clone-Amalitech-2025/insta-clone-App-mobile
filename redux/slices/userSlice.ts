import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  user: null | { username: string; email: string };
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true, // used to indicate restoring session
};

// Thunks for async logic
export const login = createAsyncThunk(
  'user/login',
  async (userData: { username: string; email: string }) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await AsyncStorage.removeItem('user');
  return null;
});

export const checkLoginStatus = createAsyncThunk('user/checkLoginStatus', async () => {
  const userData = await AsyncStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(checkLoginStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
