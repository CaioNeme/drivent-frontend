import styled, { keyframes } from 'styled-components';
import { Typography } from '@mui/material';
import HotelCard from './HotelCard.jsx';
import RoomCard from './RoomCard.jsx';
import { useEffect, useState } from 'react';
import useHotels from '../../hooks/api/useHotels.js';
import useHotelWithRooms from '../../hooks/api/useHotelWithRooms.js';

export default function PickHotel() {
  const { hotels } = useHotels();
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(-1);

  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [showRooms, setShowRooms] = useState(false);

  function handleShowRooms(resRooms) {
    setRooms(resRooms);
    setShowRooms(true);
    console.log(resRooms);
  }

  return (
    <FadeOutContainer>
      <FadeOutDiv />
      <StyledTypography variant={'h6'}>Primeiro, escolha seu hotel</StyledTypography>
      <HotelCardContainer>
        {hotels &&
          hotels.map((hotel) => {
            return (
              <HotelCard
                key={'Hotel ' + hotel.id}
                $hotel={hotel}
                $selected={selectedHotel}
                $selectHotel={setSelectedHotel}
                $setPickRooms={handleShowRooms}
                $selectRoom={setSelectedRoom}
              />
            );
          })}
      </HotelCardContainer>
      <FadeOutContainer show={showRooms.toString()}>
        <FadeOutDiv />
        <StyledTypography variant={'h6'}>Ótima pedida! Agora escolha seu quarto:</StyledTypography>
        <RoomsContainer>
          {showRooms &&
            rooms.map((room) => {
              return (
                <RoomCard key={'Room ' + room.id} $room={room} selected={selectedRoom} setSelected={setSelectedRoom} />
              );
            })}
        </RoomsContainer>
      </FadeOutContainer>
      <FadeOutContainer show={selectedRoom != -1 ? 'true' : 'false'}>
        <BookRoomButton>
          <StyledTypography variant={'h6'}>RESERVAR QUARTO</StyledTypography>
        </BookRoomButton>
        <FadeOutDiv />
      </FadeOutContainer>
    </FadeOutContainer>
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

const fadeout = keyframes`
  from{
    background-color: white;
  }to{
    background-color: transparent;
  }
`;

const FadeOutDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${fadeout} 1s ease-in-out;
  z-index: 2;
  pointer-events: none;
`;

const FadeOutContainer = styled.div`
  display: ${({ show = 'true' }) => (show === 'true' ? 'block' : 'none')};
  position: relative;
`;

const RoomsContainer = styled.div`
  width: 860px;

  margin-top: 15px;

  display: grid;
  grid-template-columns: repeat(4, 200px);
  row-gap: 10px;
  column-gap: 20px;
`;

const shadow = keyframes`
  from{
    box-shadow: none;
  }to{
    box-shadow: 0px 2px 10px 0px #00000040; 
  }
`;

const BookRoomButton = styled.button`
  width: 200px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  margin-top: 50px;
  margin-bottom: 100px;

  cursor: pointer;

  animation: ${shadow} 1s ease-in-out forwards;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    transform: scale(0.98);
  }

  > * {
    margin: 0px !important;
    font-size: 16px !important;
    font-weight: 400 !important;

    color: #000000 !important;
  }
`;
