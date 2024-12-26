import apiClient from '../ac-api-client';

// The base URL for the i18n service
export const BASE_URL = '/i18n';

/**
 * @description Fetch languages from the server
 */
export const fetchLanguages = async () => {
  return await apiClient.get(`${BASE_URL}/languages`);
};

/**
 * @description Update languages on the server
 * @param languages - The languages to update
 */
export const updateLanguages = async (languages: unknown[]) => {
  return apiClient.put(`${BASE_URL}/languages`, languages);
}