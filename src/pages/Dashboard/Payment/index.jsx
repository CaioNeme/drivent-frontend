import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import styled from 'styled-components';

export default function Payment() {
  const { enrollment } = useEnrollment();

  useEffect(() => {}, [enrollment]);

  if (!enrollment) {
    return (
      <ErrorMsgContainer>
        Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
      </ErrorMsgContainer>
    );
  }

  return 'Pagamento: Em breve!';
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
