import styled from 'styled-components';

function NoHotels() {
  return (
    <Error>
      Sua modalidade de ingresso não inclui hospedagem
      <br /> Prossiga para a escolha de atividades
    </Error>
  );
}

function NotPaid() {
  return (
    <ErrorMsg>
      Você precisa ter confirmado pagamento antes
      <br />
      de fazer a escolha de hospedagem
    </ErrorMsg>
  );
}

const Error = styled.p`
  margin: auto;
  margin-top: 25%;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color: #8e8e8e;
`;

export const ErrorMsg = {
  NoHotels,
  NotPaid,
};
