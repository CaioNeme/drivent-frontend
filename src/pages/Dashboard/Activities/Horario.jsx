import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import styled from 'styled-components';
import useActivities from '../../../hooks/api/useActivities';

export default function Horario(props) {
  const { day, place } = props;
  const { activities } = useActivities(day, place);
  console.log(activities)

  useEffect(() => {

  }, [day]);

  return (
    <>
      {activities ? activities.map((activity) =>
        <Conteiner key={activity.id}>
          <span>
            <h2>{activity.eventName}</h2>
            <h3>{dayjs(activity.startTime).format('HH:mm')} - {dayjs(activity.endTime).format('HH:mm')}</h3>
          </span>
          <Traco />
          <Vagas>
            {/* <ion-icon name="close-circle-outline" /> */}
            <ion-icon name="enter-outline" />
            <p>{activity.availableSlots}</p>
          </Vagas>
        </Conteiner>) : ""}
    </>
  )
}

const Conteiner = styled.div`
  position: relative;
  border: 1px solid #D7D7D7;
  width: 290px;
  height: 70px;
  margin:10px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 5px;
  background: #F1F1F1;
  span{
    position:absolute;
    top: 22px;
    left: 15px;
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
  position: absolute;
  top: 5px;
  right: 70px;
  width: 1px;
  height: 60px;
  background: #CFCFCF;
`;
const Vagas = styled.div`
  position: absolute;
  top: 14px;
  right: 25px;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p{
    color: #078632;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 5px;
  }

  ion-icon{
    display:inline-block;
    font-size:30px;
    color: #078632;
  }
`;

