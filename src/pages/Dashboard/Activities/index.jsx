import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import useTicket from '../../../hooks/api/useTicket.js';

export default function Activities() {
  const [warning, setWarning] = useState('none');
  const [verifyPayment, setVerifyPayment] = useState('none');
  const [verifyModel, setVerifyModel] = useState('none');
  const [mainConteiner, setMainConteiner] = useState('none');
  const { ticket } = useTicket();

  useEffect(() => {
    if (!ticket) {
      setWarning('flex');
      setVerifyModel('none');
      setVerifyPayment('block');
    } else if (ticket.TicketType.isRemote) {
      setWarning('flex');
      setVerifyModel('block');
      setVerifyPayment('none');
    } else {
      setWarning('none');
      setVerifyPayment('none');
      setVerifyModel('none');
      setMainConteiner('block');
    }
  }, [ticket])

  return (
    <>
      <PageName>Escolha de atividades</PageName>
      <Warning style={{ display: warning }}>
        <p style={{ display: verifyPayment }}>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</p>
        <p style={{ display: verifyModel }}>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</p>
      </Warning>
      <MainConteiner style={{ display: mainConteiner }}>
        <h1>Primeiro, filtre pelo dia do evento:</h1>
        <Dias>
          <div><p>Domingo, 22/10</p></div>
          <div><p>Segunda, 23/10</p></div>
          <div><p>Terça, 24/10</p></div>
        </Dias>
        <HorariosConteiner>
          <Horarios>
            <h1>Auditório Principal</h1>
            <div>
              <Horario>
                <div>
                  <h2>Minecraft: montando o PC ideal</h2>
                  <h3>09:00 - 10:00</h3>
                </div>
                <Traco />
                <Vagas>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>esgotado</p>
                </Vagas>
              </Horario>
              <Horario>
                <div>
                  <h2>Minecraft: montando o PC ideal</h2>
                  <h3>09:00 - 10:00</h3>
                </div>
                <Traco />
                <Vagas>
                  <ion-icon name="enter-outline"></ion-icon>
                  <p>27 vagas</p>
                </Vagas>
              </Horario>
            </div>
          </Horarios>

          <Horarios>
            <h1>Auditório Principal</h1>
            <div>
              <Horario>
                <div>
                  <h2>Minecraft: montando o PC ideal</h2>
                  <h3>09:00 - 10:00</h3>
                </div>
                <Traco />
                <Vagas>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>esgotado</p>
                </Vagas>
              </Horario>
              <Horario>
                <div>
                  <h2>Minecraft: montando o PC ideal</h2>
                  <h3>09:00 - 10:00</h3>
                </div>
                <Traco />
                <Vagas>
                  <ion-icon name="enter-outline"></ion-icon>
                  <p>27 vagas</p>
                </Vagas>
              </Horario>
            </div>
          </Horarios>

          <Horarios>
            <h1>Auditório Principal</h1>
            <div>
              <Horario>
                <div>
                  <h2>Minecraft: montando o PC ideal</h2>
                  <h3>09:00 - 10:00</h3>
                </div>
                <Traco />
                <Vagas>
                  <ion-icon name="close-circle-outline"></ion-icon>
                  <p>esgotado</p>
                </Vagas>
              </Horario>
              <Horario>
                <div>
                  <h2>Minecraft: montando o PC ideal</h2>
                  <h3>09:00 - 10:00</h3>
                </div>
                <Traco />
                <Vagas>
                  <ion-icon name="enter-outline"></ion-icon>
                  <p>27 vagas</p>
                </Vagas>
              </Horario>
            </div>
          </Horarios>
        </HorariosConteiner>
      </MainConteiner>
    </>
  );
}

const PageName = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 34px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  p{
    width:462px;
    height:42px;
    color: #8E8E8E;
    text-align: center;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const MainConteiner = styled.div`
  h1{
    margin-top: 20px;
    color: #8E8E8E;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Dias = styled.div`
  display: flex;
  justify-content: flex-start;

  div{
    display: flex;
    align-items: center;
    justify-content: center;

    width: 131px;
    height: 37px;
    margin:10px;
    flex-shrink: 0;

    border-radius: 4px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);

    p{
      color: #000;
      text-align: center;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
const HorariosConteiner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  div{
    h1{
      color: #7B7B7B;
      text-align: center;
      font-family: Roboto;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
const Horarios = styled.div`
  border: 1px solid #D7D7D7;
  height: 400px;
  box-sizing: border-box;
`;
const Horario = styled.div`
  border: 1px solid #D7D7D7;
  width: 290px;
  height: 70px;
  margin:10px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 5px;
  background: #F1F1F1;
  div{
    h2{
      color: #343434;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    h3{
      color: #343434;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
const Traco = styled.div`
  width: 1px;
  height: 60px;
  background: #CFCFCF;
`;
const Vagas = styled.div`
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p{
    color: #078632;
    font-family: Roboto;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  ion-icon{
    display:inline-block;
    font-size:20px;
    color: #078632;
  }
`;
