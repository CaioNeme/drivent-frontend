import api from './api';

export async function getTicketTypes(token) {
    try {
        const response = await api.get('http://localhost:4000/tickets/types', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error(err.data);
    }
}

export async function createTicket(body, token) {
    try {
        const response = await api.post('http://localhost:4000/tickets', body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error(err.data);
    }
}