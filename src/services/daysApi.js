import api from './api.js';

export async function getDays(token) {
  const response = await api.get('/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
