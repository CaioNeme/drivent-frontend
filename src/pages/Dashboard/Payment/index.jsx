import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useToken from '../../../hooks/useToken';
//import useTicketTypes from '../../../hooks/api/useTickets';
/* import useTicket from '../../../hooks/api/useTicket'; */
import { toast } from 'react-toastify';
/* import useTicketTypes from '../../../hooks/api/useTicketTypes'; */
import PaymentContext from '../../../contexts/PaymentContext';
import { useTicketType } from '../../../contexts/TicketTypeContext';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import axios from 'axios';
import SuccessCheckout from './SuccessCheckout';

export default function Payment() {
  const token = useToken();
  const [open, setOpen] = useState('none');
  const [open2, setOpen2] = useState('none');
  const [open3, setOpen3] = useState('block');
  const [open4, setOpen4] = useState('none');
  const [enrollment, setEnrollment] = useState('none');
  const [model, setModel] = useState('flex');
  const [selectHotel1, setSelectHotel1] = useState('#FFF');
  const [selectHotel2, setSelectHotel2] = useState('#FFF');
  const [selectModel1, setSelectModel1] = useState('#FFF');
  const [selectModel2, setSelectModel2] = useState('#FFF');
  const [hotel, setHotel] = useState(false);
  const [remote, setRemote] = useState(false);
  const [price, setPrice] = useState(0);
  const enrollmentContext = useEnrollment();
  const { setTicketType, ticketId, setTicketId } = useTicketType();

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [payment, setPayment] = useState(false);

  axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    if (!enrollmentContext.enrollment) {
      setEnrollment('flex');
      setModel('none');
    } else {
      setEnrollment('none');
      setModel('block');
    }
  }, [enrollmentContext]);

  function presencial() {
    if (selectModel1 === '#FFF') {
      setSelectModel2('#FFF');
      setSelectModel1('#FFEED2');
      setOpen('block');
      setOpen2('none');
      setRemote(false);
      setPrice(250);
    }
  }
  function online() {
    if (selectModel2 === '#FFF') {
      setSelectModel1('#FFF');
      setSelectModel2('#FFEED2');
      setOpen('none');
      setOpen2('block');
      setHotel(false);
      setRemote(true);
      setPrice(100);
    }
  }
  function withHotel() {
    if (selectHotel2 === '#FFF') {
      setSelectHotel1('#FFF');
      setSelectHotel2('#FFEED2');
      setOpen2('block');
      setHotel(true);
      setPrice(price + 350);
    }
  }
  function withOutHotel() {
    if (selectHotel1 === '#FFF') {
      setSelectHotel2('#FFF');
      setSelectHotel1('#FFEED2');
      setOpen2('block');
      setHotel(false);
      setPrice(250);
    }
  }

  const submitForPayment = async () => {
    const ticket = {
      price: price,
      isRemote: remote,
      includesHotel: hotel,
    };
    let id;
    if (ticket.isRemote) {
      id = 1;
      setTicketType(1);
    } else if (ticket.includesHotel) {
      setTicketType(3);
      id = 3;
    } else {
      setTicketType(2);
      id = 2;
    }
    try {
      const response = await axios.post(
        '/tickets',
        { ticketTypeId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast('Ticket criado');
      setOpen('none');
      setOpen2('none');
      setOpen3('none');
      setOpen4('block');
      setTicketId(response.data.id);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //// Montar a logica de verificação	de enrollment
  //// colocar as variáveis de modalidades de ingresso
  ////  Soma de valores Feito
  //TODO Criar pagamento com o cartao de credito
  //TODO salvar dados do ingresso e navigate('/dashboard/hotel')

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
        name: enrollment,
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
      console.log(response.data);
      setPayment(true);
      toast('Pagamento realizado com sucesso');
    } catch (error) {
      toast('Falha no pagamento, verifique os dados');
      console.log(error);
    }
  }
  return (
    <>
      <NotEnrollment style={{ display: enrollment }}>
        <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
      </NotEnrollment>
      <Model style={{ display: model }}>
        <Title>
          <h1>Ingresso e pagamento</h1>
        </Title>
        <div style={{ display: open3 }}>
          <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
          <Conteiner>
            <Box style={{ backgroundColor: selectModel1 }} onClick={() => presencial()}>
              <h3>Presencial</h3>
              <p>R$ 250</p>
            </Box>
            <Box style={{ backgroundColor: selectModel2 }} onClick={() => online()}>
              <h3>Online</h3>
              <p>R$ 100</p>
            </Box>
          </Conteiner>
        </div>
        <div style={{ display: open }}>
          <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
          <Conteiner>
            <Box style={{ backgroundColor: selectHotel1 }} onClick={() => withOutHotel()}>
              <h3>Sem Hotel</h3>
              <p> + R$ 0</p>
            </Box>
            <Box style={{ backgroundColor: selectHotel2 }} onClick={() => withHotel()}>
              <h3>Com Hotel</h3>
              <p> + R$ 350</p>
            </Box>
          </Conteiner>
        </div>
        <div style={{ display: open2 }}>
          <SubTitle>Fechado! O total ficou em R$ {price}. Agora é só confirmar:</SubTitle>
          <Button onClick={submitForPayment}>RESERVAR INGRESSO</Button>
        </div>
      </Model>
      <Cartao style={{ display: open4 }}>
        <p>Ingresso escolhido</p>
        <div>
          <h1>
            {remote ? 'Online' : 'Presencial'} + {hotel ? 'Com Hotel' : 'Sem hotel'}
          </h1>
          <p>R${price}</p>
        </div>
        <h2>Pagamento</h2>
      </Cartao>
      {payment !== true ? (
        <ContainerMain style={{ display: open4 }}>
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
                  maxLength="16"
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
        </ContainerMain>
      ) : (
        <SuccessCheckout style={{ display: open4 }} />
      )}
    </>
  );
}

//* Styled Components
const Title = styled.div`
  height: 40px;
  width: 338px;
  margin-bottom: 5px;
  h1 {
    color: #000;
    font-family: Roboto;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const SubTitle = styled.h2`
  margin-top: 32px;
  color: #8e8e8e;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Conteiner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Box = styled.div`
  width: 145px;
  height: 145px;
  margin: 12px;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid #cecece;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    color: #454545;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  p {
    color: #898989;
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Button = styled.button`
  width: 162px;
  height: 37px;
  margin: 17px;
  flex-shrink: 0;

  border-radius: 4px;
  border: none;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);

  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const NotEnrollment = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    width: 388px;

    color: #8e8e8e;
    text-align: center;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Model = styled.div`
  display: block;
`;
const Cartao = styled.div`
  p {
    margin-top: 20px;

    color: #8e8e8e;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  div {
    width: 290px;
    height: 108px;
    margin: 17px;
    flex-shrink: 0;

    border-radius: 20px;
    background: #ffeed2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: #454545;
      text-align: center;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    p {
      margin-top: 8px;

      color: #898989;
      text-align: center;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

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
