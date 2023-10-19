import styled from 'styled-components';
import { Typography } from '@mui/material';
import { getHotelsWithRooms } from '../../services/hotelApi.js';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext.jsx';

export default function HotelCard({ $hotel, $selectHotel, $selected, $setPickRooms }) {
  const isSelected = $hotel.id === $selected ? 'true' : 'false';
  const { userData } = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [accomodations, setAcommodations] = useState('');

  async function handleClick() {
    $selectHotel($hotel.id);
    $setPickRooms(rooms);
  }

  useEffect(() => {
    (async () => {
      let single = false;
      let double = false;
      let triple = false;
      let aux = [];

      const hotelWithRooms = await getHotelsWithRooms($hotel.id, userData.token);
      setRooms(hotelWithRooms.Rooms);

      hotelWithRooms.Rooms.forEach((room) => {
        switch (room.capacity) {
          case 1:
            single = true;
            break;
          case 2:
            double = true;
            break;
          case 3:
            triple = true;
            break;
        }
      });

      if (single) aux.push('Single');
      if (double) aux.push('Double');
      if (triple) aux.push('Triple');

      if (aux.length === 1) setAcommodations(aux[0]);
      else if (aux.length > 0) {
        const last = aux.pop();
        setAcommodations(aux.join(', ') + ' e ' + last);
      }
    })();
  }, []);

  return (
    <Card $selected={isSelected} onClick={async () => {}}>
      <Photo src={$hotel.image} />
      <Name variant="h2">{$hotel.name}</Name>
      <Info variant="h3">Tipos de acomodação:</Info>
      <Data variant="h6">{accomodations}</Data>
      <Info variant="h3">Vagas disponíveis:</Info>
      <Data variant="h6">103</Data>
    </Card>
  );
}

const Card = styled.div`
  width: 196px;
  height: 264px;

  border-radius: 10px;
  background-color: ${({ $selected }) => ($selected === 'true' ? '#ffeed2' : '#ebebeb')};

  margin: 0px 10px 0px 10px;
  padding: 15px;

  cursor: ${({ $selected }) => ($selected === 'true' ? 'default' : 'pointer')};
  user-select: none;

  &:hover {
    background-color: ${({ $selected }) => ($selected === 'true' ? '#ffeed2' : '#e2e2e2')};
  }
  &:active {
    transform: scale(0.99);
  }
`;

const Photo = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
`;

const Name = styled(Typography)`
  font-size: 20px !important;
  font-weight: 400 !important;
  color: #343434 !important;
  margin: 10px 0px 10px 0px !important;
`;

const Info = styled(Typography)`
  font-size: 12px !important;
  font-weight: 700 !important;
  color: #3c3c3c !important;
  margin-bottom: 2px !important;
`;

const Data = styled(Typography)`
  font-size: 12px !important;
  font-weight: 400 !important;
  line-height: 14px !important;
  margin-bottom: 15px !important;
`;
