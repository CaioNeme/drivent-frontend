import { useContext, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { getUserTicket } from '../../services/ticketApi.js';
import UserContext from '../../contexts/UserContext.jsx';
import { ErrorMsg } from './ErrorMsg.jsx';

export default function PickHotel() {
  const [ticket, setTicket] = useState(undefined);
  const [includesHotel, setIncludesHotel] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserTicket(userData.token);
        setTicket(response);
        const { TicketType } = response;
        if (TicketType.includesHotel && !TicketType.isRemote) setIncludesHotel(true);
        if (response.status === 'PAID') setIsPaid(true);
      } catch (err) {
        if (err.status === 404) setIncludesHotel(false);
      }
    })();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {!includesHotel && (
        <ErrorMsg>
          Sua modalidade de ingresso não inclui hospedagem
          <br /> Prossiga para a escolha de atividades
        </ErrorMsg>
      )}
      {includesHotel && !isPaid && (
        <ErrorMsg>
          Você precisa ter confirmado pagamento antes
          <br />
          de fazer a escolha de hospedagem
        </ErrorMsg>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
