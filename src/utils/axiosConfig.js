import axios from 'axios';

// Create an instance of axios with default configuration
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Base URL for all requests
  withCredentials: true, // Enables sending cookies with requests
});

// Interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  (error) => {
    // Handle errors globally here
    return Promise.reject(error); // Pass the error to be handled by the caller
  }
);

export default axiosInstance; // Export the configured axios instance
