const API_URL = 'http://localhost:5000'; // Change to your backend URL

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
    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        tiredness: data.tiredness ? 1 : 0,
        dry_cough: data.dry_cough ? 1 : 0,
        difficulty_breathing: data.difficulty_breathing ? 1 : 0,
        sore_throat: data.sore_throat ? 1 : 0,
        nasal_congestion: data.nasal_congestion ? 1 : 0,
        runny_nose: data.runny_nose ? 1 : 0,
        age: parseInt(data.age),
        gender: data.gender
      }),
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
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
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
      const response = await fetch('http://localhost:5000/api/check-session', {
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