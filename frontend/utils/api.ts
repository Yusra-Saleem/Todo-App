// API utility functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

/**
 * Makes an API request with proper error handling and authentication
 */
export const makeApiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If the response status indicates an error, try to parse the error message
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.message || `API request failed: ${response.status}`);
    } catch (e) {
      // If we can't parse the error as JSON, throw a generic error
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
  }

  return response;
};

/**
 * Gets the authentication token from localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Sets the authentication token in localStorage
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

/**
 * Removes the authentication token from localStorage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};