import api from './api';

export async function getTicketTypes(token) {
  const response = await api.get('/tickets/types', {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  // console.log(response.data);
  return response.data;
}

// export async function createTicket(body, token) {
//     try {
//         const response = await api.post('http://localhost:4000/tickets', body, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data;
//     } catch (err) {
//         console.error(err.data);
//     }
// }