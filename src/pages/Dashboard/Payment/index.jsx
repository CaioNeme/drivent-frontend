import { useEffect, useState } from "react";
import styled from "styled-components"
import useEnrollment from "../../../hooks/api/useEnrollment";
import useToken from "../../../hooks/useToken";
import useTicketTypes from "../../../hooks/api/useTickets";

export default function Payment() {
  const token = useToken();
  const [open, setOpen] = useState("none");
  const [open2, setOpen2] = useState("none");
  const [open3, setOpen3] = useState("block");
  const [open4, setOpen4] = useState("none");
  const [enrollment, setEnrollment] = useState("none");
  const [model, setModel] = useState("flex");
  const [selectHotel1, setSelectHotel1] = useState('#FFF');
  const [selectHotel2, setSelectHotel2] = useState('#FFF');
  const [selectModel1, setSelectModel1] = useState('#FFF');
  const [selectModel2, setSelectModel2] = useState('#FFF');
  const [hotel, setHotel] = useState(false);
  const [remote, setRemote] = useState(false);
  const [price, setPrice] = useState(0);
  const enrollmentContext = useEnrollment();
  let ticketId = 0;
  const { tickets } = useTicketTypes();
  // console.log(tickets);

  useEffect(() => {
    if (!enrollmentContext.enrollment) {
      setEnrollment("flex");
      setModel("none");
    } else {
      setEnrollment("none");
      setModel("block");
    }
  }, [enrollmentContext])

  function presencial() {
    if (selectModel1 === '#FFF') {
      setSelectModel2('#FFF')
      setSelectModel1('#FFEED2')
      setOpen('block')
      setOpen2('none')
      setRemote(false);
      setPrice(250);
    }
  }
  function online() {
    if (selectModel2 === '#FFF') {
      setSelectModel1('#FFF')
      setSelectModel2('#FFEED2')
      setOpen('none')
      setOpen2('block')
      setHotel(false);
      setRemote(true);
      setPrice(100);
    }
  }
  function withHotel() {
    if (selectHotel2 === '#FFF') {
      setSelectHotel1('#FFF')
      setSelectHotel2('#FFEED2')
      setOpen2('block')
      setHotel(true);
      setPrice(price + 350);
    }
  }
  function withOutHotel() {
    if (selectHotel1 === '#FFF') {
      setSelectHotel2('#FFF')
      setSelectHotel1('#FFEED2')
      setOpen2('block')
      setHotel(false);
      setPrice(250);
    }

  }
  function submitForPayment() {
    const ticket = {
      price: price,
      isRemote: remote,
      includesHotel: hotel,
    }

    if (ticket.isRemote) {
      ticketId = tickets[0].id
    } else if (ticket.includesHotel) {
      ticketId = tickets[2].id
    } else {
      ticketId = tickets[1].id
    }

    setOpen("none")
    setOpen2("none")
    setOpen3("none")
    setOpen4("block")

    console.log(ticketId)
    console.log(ticket)
  }

  //// Montar a logica de verificação	de enrollment
  //// colocar as variáveis de modalidades de ingresso
  ////  Soma de valores Feito
  //TODO Criar pagamento com o cartao de credito
  //TODO salvar dados do ingresso e navigate('/dashboard/hotel')

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
          <Conteiner >
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
          <Button onClick={() => submitForPayment()}>RESERVAR INGRESSO</Button>
        </div>
      </Model>
      <Cartao style={{ display: open4 }}>
        <p>Ingresso escolhido</p>
        <div>
          <h1>{remote ? 'Online' : 'Presencial'} + {hotel ? 'Com Hotel' : 'Sem hotel'}</h1>
          <p>R${price}</p>
        </div>
      </Cartao>

    </>
  )
}

//* Styled Components
const Title = styled.div`
  height: 40px;
  width: 338px;
  margin-bottom:5px;
  h1{
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
  color: #8E8E8E;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Conteiner = styled.div`
  display: flex;
  justify-content:flex-start;
  align-items: center;
`;
const Box = styled.div`
  width: 145px;
  height: 145px;
  margin:12px;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid #CECECE;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3{
    color: #454545;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  p{
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
  margin:17px;
  flex-shrink: 0;

  border-radius: 4px;
  border:none;
  background: #E0E0E0;
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
  width:100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  p{
    width:388px;

    color: #8E8E8E;
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
  p{
    margin-top: 20px;

    color: #8E8E8E;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  div{
    width: 290px;
    height: 108px;
    margin:17px;
    flex-shrink: 0;

    border-radius: 20px;
    background: #FFEED2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
      color: #454545;
      text-align: center;
      font-family: Roboto;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    p{
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
