import styled from 'styled-components';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RoomCard({ $room, selected, setSelected }) {
  const isSelected = selected === $room.id ? true : false;
  const isFull = $room.capacity - $room.bookings === 0 ? true : false;
  const vaccancies = $room.capacity - $room.bookings;
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const icons = [];

    for (let i = 0; i < vaccancies; i++) {
      if (i === vaccancies - 1 && isSelected)
        icons.push(<Occupied key={'Reserved ' + $room.id} className="reserved" />);
      else icons.push(<Vaccancy key={'Vaccancy ' + $room.id + i} />);
    }
    for (let i = 0; i < $room.bookings; i++) icons.push(<Occupied key={'Occupied ' + $room.id + i} />);

    setIcons(icons);
  }, [selected]);

  return (
    <Card className={isSelected && 'selected'} onClick={() => setSelected($room.id)} disabled={isFull || isSelected}>
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

  cursor: pointer;

  &:disabled {
    background-color: #e9e9e9;
    color: #8c8c8c;
    cursor: default;
    transform: none;
  }

  &.selected:disabled {
    background-color: #ffeed2 !important;
    color: black;
  }

  &:not(:disabled) {
    transform: scale(0.99);
  }

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
