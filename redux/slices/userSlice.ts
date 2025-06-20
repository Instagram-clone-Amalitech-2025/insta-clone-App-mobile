import { createSlice, createAsyncThunk, AsyncThunkAction, ThunkDispatch, UnknownAction, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store'; 
import api from '../../services/api'
interface UserProfile {
  username: string;
  id: number;
  profile_picture: string | null;
  full_name: string;
  bio: string;
  website: string;
  post_count: number;
  followers_count: number;
  following_count: number;
}

interface UserState {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

// Storage Helpers
const storage = {
  getToken: async () => await AsyncStorage.getItem('token'),
  setToken: async (token: string) => await AsyncStorage.setItem('token', token),
  removeToken: async () => await AsyncStorage.removeItem('token'),
};

// ========================= Thunks =========================

// Check login status
export const checkLoginStatus = createAsyncThunk(
  'user/checkLoginStatus',
  async (_, thunkAPI) => {
    try {
      const token = await storage.getToken();
      if (!token) throw new Error('No token found');

      const response = await api.get('/api/profiles/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { token, user: response.data };
    } catch (error) {
      console.warn('⚠️ checkLoginStatus failed:', error);
      return thunkAPI.rejectWithValue('Session expired or invalid token');
    }
  }
);


// Set token after login
export const setTokenAndUser = createAsyncThunk(
  'user/setTokenAndUser',
  async ({ token, user }: { token: string; user?: UserProfile }, thunkAPI) => {
    try {
      await storage.setToken(token);
      console.log('🔐 Saving token to AsyncStorage:', token);

      const profile =
        user ||
        (
          await api.get('/api/profiles/me/', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ).data;

      console.log('✅ User profile fetched:', profile); // ✅ Log added here

      return { token, user: profile };
    } catch (error: any) {
      console.error('❌ Error in setTokenAndUser:', error); // Optional: helpful for catching issues
      return thunkAPI.rejectWithValue('Invalid token');
    }
  }
);



// Fetch profile using token from state
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;

      // Try getting token from Redux state
      let token = state.user.token;

      // Fallback: Try reading token from AsyncStorage
      if (!token) {
  token = await AsyncStorage.getItem('token');
  if (!token) {
    console.warn('⚠️ No token found in storage or state');
    throw new Error('No token');
  }

  thunkAPI.dispatch(setToken(token)); // <-- Save token into Redux store
}



      // Make API request with token
      const response = await api.get('/api/profiles/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('❌ Profile fetch failed:', error);
      return thunkAPI.rejectWithValue('Failed to fetch profile');
    }
  }
);




// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedData: Partial<UserProfile> | FormData, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.user.token;

      if (!token) throw new Error('No token');

      const isFormData = updatedData instanceof FormData;

      const response = await api.put(
        '/api/profiles/me/',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // ✅ Only add if not FormData
          },
        }
      );

      console.log('✅ Profile updated successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Update failed:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue('Failed to update profile');
    }
  }
);




// Logout
export const logout = createAsyncThunk('user/logout', async () => {
  await storage.removeToken();
});

// ========================= Slice =========================

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(setTokenAndUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(setTokenAndUser.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});
export const { setToken } = userSlice.actions;


export default userSlice.reducer;
