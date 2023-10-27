import api from './api.js';

export async function getActivities(token) {
  const response = await api.get(`/activities/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
