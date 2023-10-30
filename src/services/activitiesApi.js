import api from './api.js';

export async function getActivities(token) {
  const response = await api.get(`/activities/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function enrollUserInActivity(body, token, activityId) {
  const response = await api.post(`/activities/${activityId}/enroll`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUserActivities(token) {
  const response = await api.get(`/activities/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}