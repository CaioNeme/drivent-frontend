import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function Payment() {
  const navigate = useNavigate();
  const [open, setOpen] = useState("none");
  const [open2, setOpen2] = useState("none");
  const [selectHotel1, setSelectHotel1] = useState('#FFF');
  const [selectHotel2, setSelectHotel2] = useState('#FFF');
  const [selectModel1, setSelectModel1] = useState('#FFF');
  const [selectModel2, setSelectModel2] = useState('#FFF');
  const [hotel, setHotel] = useState(false);
  const [remote, setRemote] = useState(false);

  function presencial() {
    if (selectModel1 === '#FFF') {
      setSelectModel2('#FFF')
      setSelectModel1('#FFEED2')
      setOpen('block')
      setOpen2('none')
      setRemote(false);
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
    }
  }
  function withHotel() {
    if (selectHotel2 === '#FFF') {
      setSelectHotel1('#FFF')
      setSelectHotel2('#FFEED2')
      setOpen2('block')
      setHotel(true);
    }
  }
  function withOutHotel() {
    if (selectHotel1 === '#FFF') {
      setSelectHotel2('#FFF')
      setSelectHotel1('#FFEED2')
      setOpen2('block')
      setHotel(false);
    }
  }
  function submitForPayment() {
    const ticket = {
      name: "TODO",
      price: "TODO",
      isRemote: remote,
      includesHotel: hotel,
    }
    console.log(ticket)
  }


  //TODO Montar a logica de verificação	de enrollment
  //TODO colocar as variáveis de modalidades de ingresso
  //TODO Soma de valores
  //TODO Criar pagamento com o cartao de credito
  //TODO salvar dados do ingresso e navigate('/dashboard/hotel')

  return (
    <>
      <NotEnrollment style={{ display: "none" }}>
        <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
      </NotEnrollment>
      <div>
        <Title>
          <h1>Ingresso e pagamento</h1>
        </Title>
        <div>
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
          <SubTitle>Fechado! O total ficou em R$ 600. Agora é só confirmar:</SubTitle>
          <Button onClick={() => submitForPayment()}>RESERVAR INGRESSO</Button>
        </div>
      </div>
    </>
  )
}

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
