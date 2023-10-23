import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useTicketType() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketLoading,
    error: ticketError,
  } = useAsync(() => ticketApi.getTicketsTypes(token));

  // Função para criar um ticket
  const createTicket = (userId, ticketTypeId) => {
    return ticketApi.postTicket(token, userId, ticketTypeId);
  };

  return {
    tickets,
    ticketLoading,
    ticketError,
    createTicket,
  };
}

export function useTicket() {
  const token = useToken();
  
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket
  } = useAsync(() => ticketApi.getTicket(token));


  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket
  };
}