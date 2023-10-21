import styled from 'styled-components';
import { Typography } from '@mui/material';

export default function BookedHotelCard({ $hotel, $room }) {
  let accomodation = '';
  let people = 'Você';
  if (Number($room.bookings) - 1 > 0) people += ` e mais ${Number($room.bookings) - 1}`;
  switch ($room.capacity) {
    case 1:
      accomodation = 'Single';
      break;
    case 2:
      accomodation = 'Double';
      break;
    case 3:
      accomodation = 'Triple';
      break;
  }

  return (
    <Card>
      <Photo src={$hotel.image} />
      <Name variant="h2">{$hotel.name}</Name>
      <Info variant="h3">Quarto reservado</Info>
      <Data variant="h6">{`${$room.name} (${accomodation})`}</Data>
      <Info variant="h3">Pessosas no seu quarto</Info>
      <Data variant="h6">{people}</Data>
    </Card>
  );
}

const Card = styled.button`
  width: 200px;
  height: 264px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border: none;

  border-radius: 10px;
  background-color: #ffeed2;

  padding: 15px;

  user-select: none;
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
