// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    auth: authReducer,
    posts: postReducer,
  },
});

export const RootState = (store) => store.getState();
export const AppDispatch = (store) => store.dispatch;
// This code sets up a Redux store using Redux Toolkit.
// It imports the user slice reducer and configures the store with it.