import apiClient from './client';

export const login = (email, password) =>
  apiClient.post('/auth/login', { email, password });

export const register = (email, password) =>
  apiClient.post('/auth/register', { email, password });

export const refreshToken = () =>
  apiClient.post('/auth/refresh');

export const getUserMe = () =>
  apiClient.get('/users/me');