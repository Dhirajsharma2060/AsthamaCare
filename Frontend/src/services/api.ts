const API_URL = 'https://asthamacare-backend.onrender.com';
// const API_URL = 'http://localhost:5000'; // For local development
export interface SymptomData {
  tiredness: boolean;
  dry_cough: boolean;
  difficulty_breathing: boolean;
  sore_throat: boolean;
  nasal_congestion: boolean;
  runny_nose: boolean;
  age: string;
  gender: string;
}

export interface AuthData {
  username: string;
  password: string;
  confirm_password?: string;
}

export const api = {
  // Prediction endpoint
  predict: async (data: SymptomData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      credentials: 'include', // Add this
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Authentication endpoints
  signup: async (data: AuthData) => {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data: AuthData) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // CRITICAL - Missing this in your login!
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  // Add this method to your api service
  checkSession: async () => {
    try {
      // Use the API_URL constant consistently:
      const response = await fetch(`${API_URL}/api/check-session`, {
        method: 'GET',
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      console.error('Check session error:', error);
      return { isAuthenticated: false };
    }
  },
};