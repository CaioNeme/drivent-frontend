import styled from 'styled-components';
import { Typography } from '@mui/material';
import { getHotelsWithRooms } from '../../services/hotelApi.js';
import { useEffect, useState } from 'react';
import useToken from '../../hooks/useToken.js';

export default function HotelCard({ $hotel, $selectHotel, $selected, $setPickRooms }) {
  const isSelected = $hotel.id === $selected ? 'true' : 'false';
  const token = useToken();
  const [rooms, setRooms] = useState([]);
  const [accomodations, setAcommodations] = useState('');
  const [roomsAvailable, setRoomsAvailable] = useState(0);

  function handleClick() {
    $selectHotel($hotel.id);
    $setPickRooms(rooms);
  }

  useEffect(() => {
    (async () => {
      let single = false;
      let double = false;
      let triple = false;
      let aux = [];
      let availableCount = 0;

      const hotelWithRooms = await getHotelsWithRooms($hotel.id, token);
      setRooms(hotelWithRooms.Rooms);

      console.log(hotelWithRooms.Rooms);

      hotelWithRooms.Rooms.forEach((room) => {
        availableCount += room.capacity - room.bookings;
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

      setRoomsAvailable(availableCount);

      if (single) aux.push('Single');
      if (double) aux.push('Double');
      if (triple) aux.push('Triple');

      if (aux.length === 1) setAcommodations(aux[0]);
      else if (aux.length > 0) {
        const last = aux.pop();
        setAcommodations(aux.join(', ') + ' e ' + last);
      }
    })();
  }, [$selected]);

  return (
    <Card $selected={isSelected} onClick={handleClick}>
      <Photo src={$hotel.image} />
      <Name variant="h2">{$hotel.name}</Name>
      <Info variant="h3">Tipos de acomodação:</Info>
      <Data variant="h6">{accomodations}</Data>
      <Info variant="h3">Vagas disponíveis:</Info>
      <Data variant="h6">{roomsAvailable}</Data>
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
