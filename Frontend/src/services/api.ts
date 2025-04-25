// Use environment variables or detection for API URL
const API_URL = import.meta.env.PROD 
  ? 'https://asthamacare-backend.onrender.com' 
  : 'http://localhost:5000';

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

// Helper function to ensure consistent credential handling
const fetchWithCredentials = async (url: string, options = {} as any) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

export const api = {
  // Prediction endpoint
  predict: async (data: SymptomData) => {
    const username = localStorage.getItem('username');
    const response = await fetchWithCredentials(`${API_URL}/api/predict`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        username
      }),
    });
    return response.json();
  },

  // Authentication endpoints
  signup: async (data: AuthData) => {
    const response = await fetchWithCredentials(`${API_URL}/api/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data: AuthData) => {
    const response = await fetchWithCredentials(`${API_URL}/api/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  },

  logout: async () => {
    const response = await fetchWithCredentials(`${API_URL}/api/logout`, {
      method: 'POST',
    });
    return response.json();
  },
  
  getResults: async (username: string) => {
    try {
      const response = await fetchWithCredentials(`${API_URL}/api/results?username=${username}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  },
  
  // Use proper session checking, not just localStorage
  checkSession: async () => {
    try {
      const response = await fetchWithCredentials(`${API_URL}/api/check-session`);
      return await response.json();
    } catch (error) {
      console.error('Check session error:', error);
      return { isAuthenticated: false };
    }
  }
};