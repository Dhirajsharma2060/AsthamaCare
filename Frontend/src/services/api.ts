const API_URL = 'https://asthamacare-backend.onrender.com';
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
    const username = localStorage.getItem('username');
    const response = await fetch(`${API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        username
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
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
    });
    return response.json();
  },
  
  // Get user's results using username directly
  getResults: async (username: string) => {
    try {
      const response = await fetch(`${API_URL}/api/results?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  },
  
  checkSession: async () => {
    const username = localStorage.getItem('username');
    return username ? { isAuthenticated: true, username } : { isAuthenticated: false };
  }
};