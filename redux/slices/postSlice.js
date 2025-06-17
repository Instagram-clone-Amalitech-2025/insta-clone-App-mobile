import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.get('/posts');
  return response.data;
});


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // adds post to top
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.posts = action.payload;
          state.loading = false;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        });
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
