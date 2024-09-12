import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3011/api', // Base URL for your API
  timeout: 10000, // Request timeout (10 seconds)
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Handle token if present
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Handle different content types dynamically
    if (config.data && config.data instanceof FormData) {
      // If the data is FormData, set the correct content type
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (config.data && typeof config.data === 'object') {
      // If the data is JSON, set the correct content type
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error: Could not connect to the server.');
      alert('Network Error: Could not connect to the server.');
      return Promise.reject(error);
    }

    // Handle specific HTTP status codes
    const status = error.response.status;

    if (status === 400) {
      // Handle 400 Bad Request
      console.error('Bad Request: The request was malformed or contained invalid parameters.');
      // Optionally show a user-friendly message
      // alert('Bad Request: Please check your input and try again.');
    } else if (status === 401) {
      console.error('Authentication Error: Unauthorized access.');
      // alert('Authentication Error: Please log in again.');
    } else if (status === 403) {
      console.error('Permission Error: Access denied.');
      // alert('Permission Error: You do not have permission to perform this action.');
    } else if (status === 404) {
      console.error('Error: Resource not found.');
      // alert('Error: The requested resource was not found.');
    } else if (status === 500) {
      console.error('Server Error: Something went wrong on the server.');
      // alert('Server Error: Please try again later.');
    } else if (!error.response) {
      console.error('Network Error: Could not connect to the server.');
      // alert('Network Error: Could not connect to the server.');
    } else {
      console.error(`Error: ${error.response?.statusText}`);
      // alert(`Error: ${error.response?.statusText}`);
    }

    return Promise.reject(error);
  }
);

// Function to make API calls with or without token
const apiRequest = (method, url, data = null, useToken = true, options = {}) => {
  const config = {
    method: method,
    url: url,
    data: data,
    ...options,
  };

  // If not using token, remove Authorization header
  if (!useToken) {
    delete config.headers?.Authorization;
  }

  return apiClient(config);
};

export default apiRequest;
