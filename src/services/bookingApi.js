import api from './api';

export async function postBooking(body, token) {
  const response = await api.post('/bookings', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function putBooking(body, token) {
  const response = await api.put('/bookings', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getBooking(token) {
  const response = await api.get('/bookings', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
