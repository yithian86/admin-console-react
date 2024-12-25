import apiClient from './apiClient';

export const BASE_URL = '/i18n';

export const fetchLanguages = async () => {
  return await apiClient.get(`${BASE_URL}/languages`);
};

export const updateLanguages = async (languages: unknown[]) => {
  return apiClient.put(`${BASE_URL}/languages`, languages);
}