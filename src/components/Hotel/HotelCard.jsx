import styled from 'styled-components';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useToken from '../../hooks/useToken.js';
import useHotelWithRooms from '../../hooks/api/useHotelWithRooms.js';

export default function HotelCard({ $hotel, $selectHotel, $selected, $selectRoom, $setPickRooms }) {
  const [isSelected, setIsSelected] = useState(false);
  const [accomodations, setAcommodations] = useState('');
  const [roomsAvailable, setRoomsAvailable] = useState(0);

  const { hotelWithRooms } = useHotelWithRooms($hotel.id);

  function handleClick() {
    $selectRoom(-1);
    $selectHotel($hotel.id);
    $setPickRooms(hotelWithRooms.Rooms);
  }

  function countVaccanciesAndSet(receivedRooms) {
    let single = false,
      double = false,
      triple = false,
      accomodationString = [],
      availableCount = 0;

    receivedRooms.forEach((room) => {
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

    if (single) accomodationString.push('Single');
    if (double) accomodationString.push('Double');
    if (triple) accomodationString.push('Triple');

    if (accomodationString.length === 1) setAcommodations(accomodationString[0]);
    else if (accomodationString.length > 0) {
      const last = accomodationString.pop();
      setAcommodations(accomodationString.join(', ') + ' e ' + last);
    }
  }

  useEffect(() => {
    if (hotelWithRooms) countVaccanciesAndSet(hotelWithRooms.Rooms);
  }, [hotelWithRooms]);

  useEffect(() => {
    if ($selected === $hotel.id) setIsSelected(true);
    else setIsSelected(false);
  }, [$selected]);

  return (
    <Card $selected={isSelected} onClick={handleClick} disabled={isSelected}>
      <Photo src={$hotel.image} />
      <Name variant="h2">{$hotel.name}</Name>
      <Info variant="h3">Tipos de acomodação:</Info>
      <Data variant="h6">{accomodations}</Data>
      <Info variant="h3">Vagas disponíveis:</Info>
      <Data variant="h6">{roomsAvailable}</Data>
    </Card>
  );
}

const Card = styled.button`
  width: 196px;
  height: 264px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border: none;

  border-radius: 10px;
  background-color: #ebebeb;

  margin: 0px 10px 0px 10px;
  padding: 15px;

  cursor: pointer;
  user-select: none;

  &:disabled {
    background-color: #ffeed2;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: #ccc;
  }
  &:active:not(:disabled) {
    transform: scale(0.99);
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 109px;
  border-radius: 5px;
  object-fit: cover;
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
