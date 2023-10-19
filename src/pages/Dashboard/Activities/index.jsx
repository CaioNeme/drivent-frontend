import { useEffect } from 'react';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  useEffect(() => {
  }, [ticket]);

  if (ticket?.status !== 'PAID') {
    return (
      <ErrorMsgContainer>
        Você precisa ter confirmado pagamento antes <br /> de fazer a escolha de atividades
      </ErrorMsgContainer>
    );
  }

  return 'Atividades: Em breve!';
}

const ErrorMsgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e8e;
  text-align: center;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 100%;
  cursor: not-allowed;
`;
