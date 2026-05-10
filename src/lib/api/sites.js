import apiClient from './client';

export const getSites = () =>
  apiClient.get('/sites');

export const createSite = (name) =>
  apiClient.post('/sites', { name });

export const getSite = (siteId) =>
  apiClient.get(`/sites/${siteId}`);

export const updateSite = (siteId, data) =>
  apiClient.put(`/sites/${siteId}`, data);

export const deleteSite = (siteId) =>
  apiClient.delete(`/sites/${siteId}`);

export const getMembers = (siteId) =>
  apiClient.get(`/sites/${siteId}/members`);

export const addMember = (siteId, email, role) =>
  apiClient.post(`/sites/${siteId}/members`, { email, role });

export const updateMember = (siteId, userId, role) =>
  apiClient.put(`/sites/${siteId}/members/${userId}`, { role });

export const removeMember = (siteId, userId) =>
  apiClient.delete(`/sites/${siteId}/members/${userId}`);