import api from './api.js';

export async function getPlaces(token) {
  const response = await api.get('/places', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
