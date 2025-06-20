import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/posts/');
      console.log("Fetched posts:", response.data); // ✅ Add this
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // ✅ required for FormData
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ detail: 'No response received from the server.' });
      } else {
        return rejectWithValue({ detail: error.message || 'Unknown error' });
      }
    }
  }
);


// Add a comment
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, text }) => {
    const response = await api.post(`/api/posts/${postId}/add_comment/`, { text });
    return { postId, comment: response.data };
  }
);

// Toggle like
export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async (postId) => {
    const response = await api.post(`/api/posts/${postId}/toggle_like/`);
    return { postId, updatedPost: response.data };
  }
);
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
  state.items = action.payload;
},
    addPost: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH POSTS
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // CREATE POST
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // ADD COMMENT
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.items.find((p) => p.id === postId);
        if (post) {
          post.comments_count += 1;
          post.comments = post.comments || [];
          post.comments.push(comment);
        }
      })

      // TOGGLE LIKE
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, updatedPost } = action.payload;
        const index = state.items.findIndex((p) => p.id === postId);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...updatedPost,
          };
        }
      });
  },
});

export const { setPosts, addPost } = postSlice.actions;
export default postSlice.reducer;
