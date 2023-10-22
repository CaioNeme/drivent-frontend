import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import ErrorMsg from './ErrorMsg.jsx';
import PickHotel from './PickHotel.jsx';
import useTicket from '../../hooks/api/useTicket.js';

export default function HotelIndex() {
  const { ticket, ticketLoading, getTicket, ticketError } = useTicket();

  const [includesHotel, setIncludesHotel] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  function handleError() {
    if (ticketError) toast('Não foi possível verificar seu ticket!');
  }

  function handleTicket() {
    if (ticket) {
      const type = ticket.TicketType;

      if (type.includesHotel && !type.isRemote) setIncludesHotel(true);
      else setIncludesHotel(false);
      if (ticket.status === 'PAID') setIsPaid(true);
      else setIsPaid(false);
    }
  }

  useEffect(handleTicket, [ticket]);
  useEffect(handleError, [ticketError]);

  useEffect(() => {
    if (location.pathname === '/dashboard/hotel') {
      (async () => {
        await getTicket();
      })();
    }
  }, [location.pathname]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {!ticketLoading && <ErrorMsg hotel={includesHotel} paid={isPaid} />}
      {!ticketLoading && includesHotel && isPaid && <PickHotel />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
