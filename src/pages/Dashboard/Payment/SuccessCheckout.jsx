import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SuccessCheckout() {
  return (
    <ContainerSuccess>
      <ion-icon name="checkmark-circle"></ion-icon>
      <div>
        <span>Pagamento Confirmado!</span>
        <Link to="/dashboard/hotel">
          {' '}
          <h3>Prossiga para escolha de hospedagem e atividades</h3>
        </Link>
      </div>
    </ContainerSuccess>
  );
}

const ContainerSuccess = styled.div`
  margin-top: 10px;
  display: flex;
  ion-icon {
    color: #36B853;
    font-size: 40px;

    width: 44px;
    height: 44px;
    flex-shrink: 0;

    margin-right: 8px;
  }
  div{
    margin-top: 5px;
    h3 {
      color: #454545;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    span {
      color: #454545;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  
`;
