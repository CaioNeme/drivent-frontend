import styled from 'styled-components';
import { Typography } from '@mui/material';
import HotelCard from './HotelCard.jsx';
import { useState } from 'react';

export default function PickHotel() {
  const [selectedHotel, setSelectedHotel] = useState(0);

  return (
    <>
      <StyledTypography variant={'h6'}>Primeiro, escolha seu hotel</StyledTypography>
      <HotelCardContainer>
        <HotelCard $hotel={{ id: 1 }} $selected={selectedHotel} $selectHotel={setSelectedHotel} />
        <HotelCard $hotel={{ id: 2 }} $selected={selectedHotel} $selectHotel={setSelectedHotel} />
        <HotelCard $hotel={{ id: 3 }} $selected={selectedHotel} $selectHotel={setSelectedHotel} />
      </HotelCardContainer>
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
