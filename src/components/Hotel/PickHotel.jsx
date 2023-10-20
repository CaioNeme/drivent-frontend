import styled from 'styled-components';
import { Typography } from '@mui/material';
import HotelCard from './HotelCard.jsx';
import { useEffect, useState } from 'react';
import { getHotels } from '../../services/hotelApi.js';
import RoomCard from './RoomCard.jsx';
import useToken from '../../hooks/useToken.js';

export default function PickHotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const token = useToken();

  useEffect(() => {
    (async () => {
      const hotels = await getHotels(token);
      setHotelsList(hotels);
    })();
  }, []);

  return (
    <>
      <StyledTypography variant={'h6'}>Primeiro, escolha seu hotel</StyledTypography>
      <HotelCardContainer>
        {hotelsList.map((hotel) => {
          return (
            <HotelCard
              key={'Hotel ' + hotel.id}
              $hotel={hotel}
              $selected={selectedHotel}
              $selectHotel={setSelectedHotel}
              $setPickRooms={setRooms}
            />
          );
        })}
      </HotelCardContainer>
      <StyledTypography variant={'h6'}>Ótima pedida! Agora escolha seu quarto:</StyledTypography>
      <RoomsContainer>
        {rooms.map((room) => {
          return (
            <RoomCard key={'Room ' + room.id} $room={room} selected={selectedRoom} setSelected={setSelectedRoom} />
          );
        })}
      </RoomsContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  font-size: 20px;
  font-weight: 400;
  color: #8e8e8e;
`;

const HotelCardContainer = styled.div`
  width: fit-content;
  max-width: 100%;
  overflow-x: scroll;
  display: flex;
  align-items: center;

  padding-bottom: 15px;
  margin-bottom: 25px;

  > * {
    &:first-child {
      margin-left: 0px;
    }
  }
  > * {
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const RoomsContainer = styled.div`
  width: 860px;

  margin-top: 15px;

  display: grid;
  grid-template-columns: repeat(4, 200px);
  row-gap: 10px;
  column-gap: 20px;
`;
