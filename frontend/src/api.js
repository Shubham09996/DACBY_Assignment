// Base URL for all API requests
// In development, Vite proxies '/api' to the backend.
// In production, VITE_API_URL can be set (e.g., 'https://your-backend.com')
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, options);
};

// --- Stories API ---

export const fetchStoriesApi = () => apiFetch('/api/stories');

export const toggleBookmarkApi = (storyId, token) => 
  apiFetch(`/api/stories/${storyId}/bookmark`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

// --- Auth API ---

export const loginUserApi = (email, password) => 
  apiFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

export const registerUserApi = (name, email, password) => 
  apiFetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

export const forgotPasswordApi = (email) => 
  apiFetch('/api/auth/forgotpassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

export const resetPasswordApi = (token, password) => 
  apiFetch(`/api/auth/resetpassword/${token}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
