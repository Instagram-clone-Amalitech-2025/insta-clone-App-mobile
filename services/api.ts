import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace this with your actual API base URL
const BASE_URL = 'https://felnan.pythonanywhere.com/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add auth token from AsyncStorage to each request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
