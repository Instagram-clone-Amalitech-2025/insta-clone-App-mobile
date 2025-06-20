import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://felnan.pythonanywhere.com/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
});

// ✅ Conditionally add headers depending on data type
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ Only set application/json if NOT sending FormData
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default api;
