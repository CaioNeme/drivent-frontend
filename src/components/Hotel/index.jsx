import { useContext, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { getUserTicket } from '../../services/ticketApi.js';
import UserContext from '../../contexts/UserContext.jsx';
import ErrorMsg from './ErrorMsg.jsx';
import PickHotel from './PickHotel.jsx';

export default function HotelIndex() {
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(undefined);
  const [includesHotel, setIncludesHotel] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getUserTicket(userData.token);
        setTicket(response);
        const { TicketType } = response;
        if (TicketType.includesHotel && !TicketType.isRemote) setIncludesHotel(true);
        if (response.status === 'PAID') setIsPaid(true);
      } catch (err) {
        if (err.status === 404) setIncludesHotel(false);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {!loading && <ErrorMsg hotel={includesHotel} paid={isPaid} />}
      {!loading && includesHotel && isPaid && <PickHotel />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
