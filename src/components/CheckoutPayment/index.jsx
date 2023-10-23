import { Typography } from '@mui/material';
import styled from 'styled-components';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import React, { useContext, useState } from 'react';
import TicketCard from './TicketCard';
import SuccessCheckout from './SuccessCheckout';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { useTicketType } from '../../contexts/TicketTypeContext';
import EnrollmentContext from '../../contexts/EnrollmentContext';

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

export default function CheckoutPayment() {
  const { EnrollmentData } = useContext(EnrollmentContext);

  console.log(EnrollmentData, 'enrollment');
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const { userData } = useContext(UserContext);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const { ticketId } = useTicketType();
  const token = useToken();
  const [payment, setPayment] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  async function handleProccess(e) {
    e.preventDefault();
    const body = {
      ticketId: ticketId,
      cardData: {
        issuer: cardName,
        number: cardNumber,
        name: EnrollmentData.name,
        expirationDate: cardExpiry,
        cvv: cardCVC,
      },
    };

    console.log(body);
    try {
      const response = await axios.post('/payments/process', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayment(true);
      toast('Pagamento realizado com sucesso');
    } catch (error) {
      toast('Falha no pagamento, verifique os dados');
      console.log(error);
    }
  }
  return (
    <>
      <Typography marginBottom={3.4} variant="h4">
        Ingresso e Pagamento
      </Typography>
      <ContainerMain>
        <h2>Ingresso escolhido</h2>
        <TicketContainer>
          <TicketCard />
        </TicketContainer>
        <h2>Pagamento</h2>
        {payment !== true ? (
          <>
            <CreditCard>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
              <form onSubmit={handleProccess}>
                <div className="form-group">
                  <input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    className="form-control"
                    maxlength="16"
                    pattern="[\d| ]{16}"
                    required
                    value={state.number}
                    onChange={(e) => {
                      handleInputChange(e);
                      setCardNumber(e.target.value);
                    }}
                    onFocus={handleInputFocus}
                  />
                  <small>E.g.: 49..., 51..., 36..., 37...</small>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    value={state.name}
                    onChange={(e) => {
                      handleInputChange(e);
                      setCardName(e.target.value);
                    }}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="tel"
                      name="expiry"
                      placeholder="Valid thru"
                      className="form-expiry"
                      pattern="\d\d/\d\d"
                      maxLength="5"
                      required
                      value={state.expiry}
                      onChange={(e) => {
                        handleInputChange(e);
                        setCardExpiry(e.target.value);
                      }}
                      onFocus={handleInputFocus}
                    />

                    <input
                      type="tel"
                      name="cvc"
                      className="form-control"
                      placeholder="CVC"
                      maxLength="3"
                      pattern="\d{3,4}"
                      required
                      value={state.cvc}
                      onChange={(e) => {
                        handleInputChange(e);
                        setCardCVC(e.target.value);
                      }}
                      onFocus={handleInputFocus}
                    />
                  </div>
                </div>
              </form>
            </CreditCard>
            <button type="submit" onClick={handleProccess}>
              FINALIZAR PAGAMENTO
            </button>
          </>
        ) : (
          <SuccessCheckout />
        )}
      </ContainerMain>
    </>
  );
}

const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h2 {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23.44px;
    color: #8e8e8e;
  }
  button {
    width: 182px;
    height: 37px;
    border-radius: 4px;
    margin-top: 20px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreditCard = styled.div`
  display: flex;
  box-sizing: border-box;
  form {
    input {
      width: 300px;
      height: 35px;
      border-radius: 7px;
      border-color: grey;
    }
    small {
      color: #8e8e8e;
      font-size: 12px;
    }
    margin-left: 30px;
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      width: 300px;
    }
    .col-6 {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .form-expiry {
        width: 65%;
      }
      .form-control {
        width: 30%;
      }
    }
  }
`;
