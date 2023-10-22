import styled from 'styled-components';

export default function ErrorMsg({ hotel, paid}) {
  if (!hotel) {
    return (
      <Error>
        Sua modalidade de ingresso não inclui hospedagem
        <br /> Prossiga para a escolha de atividades
      </Error>
    );
  }
  if (!paid)
    return (
      <Error>
        Você precisa ter confirmado pagamento antes
        <br />
        de fazer a escolha de hospedagem
      </Error>
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
