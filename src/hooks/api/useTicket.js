import useAsync from '../useAsync';

import * as ticketApi from '../../services/ticketApi.js';
import useToken from '../useToken.js';

export default function useTicket() {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getUserTicket(token), false);

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket,
  };
}
