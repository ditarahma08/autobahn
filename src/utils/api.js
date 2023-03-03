import axios from 'axios';

const client = axios.create({
  baseURL: process.env.BASE_URL
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = client;

let authInterceptorID;

export const authenticateAPI = (token) => {
  authInterceptorID = client.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`;

    return config;
  });
};

export const unauthenticateAPI = () => {
  api.interceptors.request.eject(authInterceptorID);
};
