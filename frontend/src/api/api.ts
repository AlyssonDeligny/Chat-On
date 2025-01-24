import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // URL du backend

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

// Fonction pour l'inscription
export const registerUser = async (userData: RegisterUserData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour la connexion
export const loginUser = async (userData: LoginUserData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};
