import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RoomCard({ $room, selected, setSelected }) {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const aux = [];
    for (let i = 0; i < $room.capacity - $room.bookings; i++) {
      if (i === $room.capacity - $room.bookings - 1 && selected === $room.id)
        aux.push(<Occupied className="reserved" />);
      else aux.push(<Vaccancy />);
    }
    for (let i = 0; i < $room.bookings; i++) {
      aux.push(<Occupied />);
    }
    setIcons(aux);
  }, []);

  return (
    <Card disabled={$room.capacity - $room.bookings === 0 ? true : false}>
      <Name>{$room.name}</Name>
      <IconsContainer>{icons}</IconsContainer>
    </Card>
  );
}

const Card = styled.button`
  width: 200px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px;

  border-radius: 10px;
  background-color: transparent;
  outline: none;
  border: 1px solid #cecece;

  .reserved {
    color: #ff4791;
  }
`;

const Name = styled(Typography)`
  font-size: 20px !important;
  font-weight: 700 !important;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Vaccancy = styled(BsPerson)`
  font-size: 28px;
`;

const Occupied = styled(BsPersonFill)`
  font-size: 28px;
`;
