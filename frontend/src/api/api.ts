import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

// Fonction pour récupérer le token du localStorage
const getToken = () => localStorage.getItem('token');

// Configuration Axios avec le token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajout d'un `request interceptor` pour inclure le token automatiquement
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface RegisterUserData {
  pseudo: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData: LoginUserData) => {
  try {
    const response = await api.post('/login', userData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      window.location.href = "/chat";
    }
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
