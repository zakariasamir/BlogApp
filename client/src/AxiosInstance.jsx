// import axios from 'axios';

// // Create an Axios instance with default configuration
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000', // Your API base URL
// });

// // Add an interceptor to add the token to every outgoing request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Get the token from local storage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
