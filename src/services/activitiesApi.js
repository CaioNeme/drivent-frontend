import api from './api.js';

export async function getActivities(token, dayId, placeId) {
  const response = await api.get(`/activities/${dayId}/${placeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
