import React from 'react';
import styled from "styled-components";
import usePlace from '../../../hooks/api/usePlaces';
import Horario from './Horario';

export default function (props) {
  const { day } = props;
  const { places } = usePlace();

  return (
    <>
      {places ? places.map((place) =>
        <Horarios key={place.id}>
          <h1>{place.name}</h1>
          <div>
            <Horario day={day} place={place.id} />
          </div>
        </Horarios>
      ) : "Estamos com problemas tente novamente mais tarde"}
    </>
  )
}

const Horarios = styled.div`
  border: 1px solid #D7D7D7;
  height: 400px;
  box-sizing: border-box;
`;
