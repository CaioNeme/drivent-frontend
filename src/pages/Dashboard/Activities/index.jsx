import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import useTicket from '../../../hooks/api/useTicket.js';
import useDays from "../../../hooks/api/useDays.js";
import dayjs from "dayjs";
import Horarios from "./Horarios.jsx";

export default function Activities() {
  const { ticket } = useTicket();
  const { days } = useDays();
  const [warning, setWarning] = useState('none');
  const [verifyPayment, setVerifyPayment] = useState('none');
  const [verifyModel, setVerifyModel] = useState('none');
  const [mainConteiner, setMainConteiner] = useState('none');
  const [selectDay1, setSelectDay1] = useState('#E0E0E0');
  const [selectDay2, setSelectDay2] = useState('#E0E0E0');
  const [selectDay3, setSelectDay3] = useState('#E0E0E0');
  const [text, setText] = useState('block');
  const [showHorarios, setShowHorarios] = useState('none');
  const [day, setDay] = useState(0);

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
  }, [ticket, days, day]);

  function day1() {
    setSelectDay1("#FFD37D")
    setSelectDay2("#E0E0E0")
    setSelectDay3("#E0E0E0")
    setText("none")
    setShowHorarios("flex")
    setDay(1)
  }
  function day2() {
    setSelectDay1("#E0E0E0")
    setSelectDay2("#FFD37D")
    setSelectDay3("#E0E0E0")
    setText("none")
    setShowHorarios("flex")
    setDay(2)
  }
  function day3() {
    setSelectDay1("#E0E0E0")
    setSelectDay2("#E0E0E0")
    setSelectDay3("#FFD37D")
    setText("none")
    setShowHorarios("flex")
    setDay(3)
  }

  return (
    <>
      <PageName>Escolha de atividades</PageName>
      <Warning style={{ display: warning }}>
        <p style={{ display: verifyPayment }}>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</p>
        <p style={{ display: verifyModel }}>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</p>
      </Warning>
      <MainConteiner style={{ display: mainConteiner }}>
        <h1 style={{ display: text }}>Primeiro, filtre pelo dia do evento:</h1>
        <Dias>
          <div style={{ backgroundColor: selectDay1 }} onClick={day1}><p>{days ? dayjs(days[0].date).format('dddd') + ", " + dayjs(days[0].date).format('DD/MM') : ""}</p></div>
          <div style={{ backgroundColor: selectDay2 }} onClick={day2}><p>{days ? dayjs(days[1].date).format('dddd') + ", " + dayjs(days[1].date).format('DD/MM') : ""}</p></div>
          <div style={{ backgroundColor: selectDay3 }} onClick={day3}><p>{days ? dayjs(days[2].date).format('dddd') + ", " + dayjs(days[2].date).format('DD/MM') : ""}</p></div>
        </Dias>
        <HorariosConteiner style={{ display: showHorarios }}>
          {day === 1 ? <Horarios day={1} /> : day === 2 ? <Horarios day={2} /> : day === 3 ? <Horarios day={3} /> : "Erro interno por favor tente novamente mais tarde"}
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
