import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import usePlace from '../../../hooks/api/usePlaces';
import Horario from './Horario';

export default function (props) {
  const { day, activities } = props;
  const { places } = usePlace();
  const [atividades1, setAtividades1] = useState([]);
  const [atividades2, setAtividades2] = useState([]);
  const [atividades3, setAtividades3] = useState([]);

  useEffect(() => {
    setAtividades1(activities.place1)
    setAtividades2(activities.place2)
    setAtividades3(activities.place3)
  }, [activities, day, places])


  return (
    <>
      {places ?
        <>
          <Horarios >
            <h1>{places[0].name}</h1>
            <div>
              <Horario activities={atividades1} day={day} />
            </div>
          </Horarios>
          <Horarios>
            <h1>{places[1].name}</h1>
            <div>
              <Horario activities={atividades2} day={day} />
            </div>
          </Horarios >
          <Horarios>
            <h1>{places[2].name}</h1>
            <div>
              <Horario activities={atividades3} day={day} />
            </div>
          </Horarios >
        </> : <p>Erro! Tente novamente mais tarde</p>
      }
    </>
  )
}

const Horarios = styled.div`
  border: 1px solid #D7D7D7;
  height: 400px;
  box-sizing: border-box;
`;
