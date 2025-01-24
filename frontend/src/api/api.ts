import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // URL du backend

// Fonction pour récupérer le token du localStorage
const getToken = () => localStorage.getItem('token');

// Configuration Axios avec le token
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔥 Ajout d'un `request interceptor` pour inclure le token automatiquement
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Définition des types pour les utilisateurs
export interface RegisterUserData {
  pseudo: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

// ✅ Fonction pour l'inscription (utilise `api.post` au lieu de `axios.post`)
export const registerUser = async (userData: RegisterUserData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fonction pour la connexion (utilise `api.post` au lieu de `axios.post`)
export const loginUser = async (userData: LoginUserData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fonction pour récupérer les infos utilisateur (protégée avec JWT)
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile'); // Route protégée (exemple)
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
