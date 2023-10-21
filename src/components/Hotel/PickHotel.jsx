import styled, { keyframes } from 'styled-components';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import HotelCard from './HotelCard.jsx';
import RoomCard from './RoomCard.jsx';
import useHotels from '../../hooks/api/useHotels.js';
import useBooking from '../../hooks/api/useBooking.js';
import { toast } from 'react-toastify';
import useSaveBooking from '../../hooks/api/useSaveBooking.js';
import useEditBooking from '../../hooks/api/useEditBooking.js';
import useHotelWithRooms from '../../hooks/api/useHotelWithRooms.js';
import BookedHotelCard from './BookedHotelCard.jsx';

export default function PickHotel() {
  const { hotels, getHotels, hotelsLoading, hotelsError } = useHotels();
  const { booking, getBooking } = useBooking();
  const { saveBooking, saveBookingError } = useSaveBooking();
  const { editBooking, editBookingError } = useEditBooking();
  const { hotelWithRooms, getHotelWithRooms } = useHotelWithRooms();

  const [displayedRooms, setDisplayedRooms] = useState([]);
  const [displayBooking, setDisplayBooking] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [bookedRoom, setBookedRoom] = useState({});

  function handleHotelsError() {
    if (hotelsError) toast('Não foi possível receber os hotéis!');
  }

  function handleBookingError() {
    if (saveBookingError || editBookingError) toast('Não foi possível salvar a reserva!');
  }

  async function handleSubmit() {
    console.log(selectedRoom);
    if (booking) await editBooking({ roomId: selectedRoom.id }, booking.id);
    else await saveBooking({ roomId: selectedRoom.id });
    if (!saveBookingError && !editBookingError) {
      await getBooking();
      setDisplayBooking(true);
    }
  }

  useEffect(handleBookingError, [saveBookingError, editBookingError]);
  useEffect(handleHotelsError, [hotelsError]);
  useEffect(() => {
    (async () => {
      if (booking) {
        await getHotelWithRooms(booking.Room.hotelId);
        setDisplayBooking(true);
      } else setDisplayBooking(false);
    })();
  }, [booking]);
  useEffect(() => {
    if (hotelWithRooms) {
      setSelectedHotel(hotelWithRooms);
      setDisplayedRooms(hotelWithRooms.Rooms);
      hotelWithRooms.Rooms.forEach((room) => {
        if (room.id === booking.Room.id) {
          setBookedRoom(room);
          setSelectedRoom(room);
        }
      });
    }
  }, [hotelWithRooms]);
  useEffect(() => {
    if (location.pathname === '/dashboard/hotel') {
      (async () => {
        await getBooking();
        await getHotels();
      })();
    }
  }, [location.pathname]);

  if (displayBooking)
    return (
      <>
        <StyledTypography variant={'h6'}>Você já escolheu seu quarto:</StyledTypography>
        <BookedHotelCard $hotel={selectedHotel} $room={bookedRoom} />
        <BookRoomButton onClick={() => setDisplayBooking(false)}>
          <StyledTypography variant={'h6'}>TROCAR DE QUARTO</StyledTypography>
        </BookRoomButton>
      </>
    );
  else if (!hotelsLoading)
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
                  $displayRooms={setDisplayedRooms}
                  $setSelectedRoom={setSelectedRoom}
                  $selectedRoom={selectedRoom}
                />
              );
            })}
        </HotelCardContainer>
        <FadeOutContainer show={displayedRooms.length > 0 ? 'true' : 'false'}>
          <FadeOutDiv />
          <StyledTypography variant={'h6'}>Ótima pedida! Agora escolha seu quarto:</StyledTypography>
          <RoomsContainer>
            {displayedRooms.length > 0 &&
              displayedRooms.map((room) => {
                return (
                  <RoomCard
                    key={'Room ' + room.id}
                    $room={room}
                    selected={selectedRoom}
                    setSelected={setSelectedRoom}
                    bookedRoom={bookedRoom}
                    setBookedRoom={setBookedRoom}
                  />
                );
              })}
          </RoomsContainer>
        </FadeOutContainer>
        <FadeOutContainer show={selectedRoom ? 'true' : 'false'}>
          <BookRoomButton onClick={async () => await handleSubmit()}>
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

  &:disabled {
    background-color: #ccc;
    transform: none;
    cursor: default;
  }

  > * {
    margin: 0px !important;
    font-size: 16px !important;
    font-weight: 400 !important;

    color: #000000 !important;
  }
`;
